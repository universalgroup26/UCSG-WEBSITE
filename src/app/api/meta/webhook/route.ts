import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// ─── Configuration ─────────────────────────────────────────────────────
const VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN || '';
const PIXEL_ID = process.env.META_PIXEL_ID || '2582317282238910';

// Timeout for external API calls
const FETCH_TIMEOUT_MS = 10_000;

function fetchWithTimeout(url: string, init?: RequestInit, timeoutMs = FETCH_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...init, signal: controller.signal }).finally(() => clearTimeout(timer));
}

// ─── GET: Webhook Verification (Callback URL) ─────────────────────────
// Meta sends a GET request with hub.challenge when you configure the webhook.
// We must respond with the hub.challenge value to verify the callback URL.
// See: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  console.log('[Meta Webhook] Verification request:', { mode, token: token ? '***' : 'missing', challenge });

  // Verify the mode and token
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('[Meta Webhook] ✓ Callback URL verified');
    return new NextResponse(challenge, { status: 200 });
  }

  console.warn('[Meta Webhook] ✗ Verification failed — invalid mode or verify_token');
  return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
}

// ─── POST: Webhook Event Receiver ─────────────────────────────────────
// Meta sends POST requests when subscribed events occur (e.g., leadgen).
// See: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#receive-updates
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { object, entry } = body;

    // Validate this is a page webhook event
    if (object !== 'page') {
      console.warn('[Meta Webhook] Ignoring non-page event:', object);
      return NextResponse.json({ status: 'ignored' }, { status: 200 });
    }

    if (!entry || !Array.isArray(entry)) {
      console.warn('[Meta Webhook] Invalid entry format');
      return NextResponse.json({ status: 'invalid' }, { status: 400 });
    }

    // Process each entry
    for (const item of entry) {
      const pageId = item.id;
      const changes = item.changes || [];

      for (const change of changes) {
        const { field, value } = change;

        if (field === 'leadgen') {
          // Process lead ad submission
          await processLeadGenEvent(value, pageId);
        } else {
          console.log('[Meta Webhook] Unhandled field:', field);
        }
      }
    }

    // Must return 200 quickly to acknowledge receipt
    return NextResponse.json({ status: 'received' }, { status: 200 });
  } catch (err) {
    console.error('[Meta Webhook] Error processing event:', err);
    // Still return 200 to prevent Meta from retrying
    return NextResponse.json({ status: 'error' }, { status: 200 });
  }
}

// ─── Lead Gen Event Processor ─────────────────────────────────────────
async function processLeadGenEvent(value: Record<string, unknown>, pageId: string) {
  const leadgenId = value.leadgen_id as string;
  const adId = value.ad_id as string;
  const formId = value.form_id as string;
  const createdAt = value.created_time as string;

  console.log('[Meta Webhook] Lead Gen event:', {
    leadgenId,
    adId,
    formId,
    pageId,
    createdAt,
  });

  if (!leadgenId) {
    console.warn('[Meta Webhook] No leadgen_id — skipping');
    return;
  }

  // Fetch the full lead data from Meta Graph API
  try {
    const adsToken = process.env.META_ADS_APP_TOKEN || process.env.META_ACCESS_TOKEN || '';
    if (!adsToken) {
      console.warn('[Meta Webhook] No ads token available — cannot fetch lead data');
      return;
    }

    // Get lead data with field_data (the actual form answers)
    const leadRes = await fetchWithTimeout(
      `https://graph.facebook.com/v26.0/${leadgenId}?fields=field_data,created_time,ad_id,form_id&access_token=${adsToken}`
    );

    if (!leadRes.ok) {
      const errText = await leadRes.text().catch(() => 'unknown');
      console.warn('[Meta Webhook] Failed to fetch lead data:', leadRes.status, errText.slice(0, 200));
      return;
    }

    const leadData = await leadRes.json();
    const fieldData = leadData.field_data || [];

    // Extract name, email, phone from field_data
    let firstName = '';
    let lastName = '';
    let email = '';
    let phone = '';

    for (const field of fieldData) {
      const name = (field.name || '').toLowerCase();
      const val = (field.values || [])[0] || '';

      if (name.includes('first_name') || name === 'first name') firstName = val;
      else if (name.includes('last_name') || name === 'last name') lastName = val;
      else if (name.includes('email') || name === 'email') email = val;
      else if (name.includes('phone') || name.includes('mobile') || name === 'phone number') phone = val;
      else if (name.includes('full_name') || name === 'full name') {
        // Split full name into first/last
        const parts = val.trim().split(/\s+/);
        firstName = parts[0] || '';
        lastName = parts.slice(1).join(' ') || '';
      }
    }

    console.log('[Meta Webhook] Lead data:', { firstName, lastName, email, phone: phone ? '***' : 'missing' });

    // Store in database as a contact submission from Meta Lead Ads
    try {
      await db.contactSubmission.create({
        data: {
          name: `${firstName} ${lastName}`.trim() || 'Meta Lead Ad',
          email: email || 'no-email@meta-lead.local',
          phone: phone || undefined,
          service: 'Meta Lead Ad',
          message: `Meta Lead Ad submission — Ad ID: ${adId || 'N/A'}, Form ID: ${formId || 'N/A'}, Leadgen ID: ${leadgenId}`,
        },
      });
      console.log('[Meta Webhook] ✓ Lead saved to database');
    } catch (dbErr) {
      console.warn('[Meta Webhook] Failed to save lead to DB:', dbErr);
    }

    // Fire CAPI event for this lead (server-side attribution for Meta ads optimization)
    try {
      const crypto = globalThis.crypto;
      const hashSHA256 = async (str: string): Promise<string> => {
        const encoder = new TextEncoder();
        const buffer = await crypto.subtle.digest('SHA-256', encoder.encode(str));
        return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
      };

      const normalizePhone = (raw: string): string => {
        const digits = raw.replace(/\D/g, '');
        if (digits.length === 10) return '+1' + digits;
        if (digits.length === 11 && digits.startsWith('1')) return '+' + digits;
        if (digits.length > 0) return '+' + digits;
        return '';
      };

      const phoneE164 = phone ? normalizePhone(phone) : '';
      const eventId = `meta-webhook-${leadgenId}`;

      const [hashedEmail, hashedPhone, hashedFirstName, hashedLastName] = await Promise.all([
        email ? hashSHA256(email.toLowerCase().trim()) : null,
        phoneE164 ? hashSHA256(phoneE164) : null,
        firstName ? hashSHA256(firstName.toLowerCase().trim()) : null,
        lastName ? hashSHA256(lastName.toLowerCase().trim()) : null,
      ]);

      const userData: Record<string, unknown> = {};
      if (hashedEmail) userData.em = [hashedEmail];
      if (hashedPhone) userData.ph = [hashedPhone];
      if (hashedFirstName) userData.fn = [hashedFirstName];
      if (hashedLastName) userData.ln = [hashedLastName];

      const capiEvent = {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: 'https://www.universalconsultingservices.com',
        action_source: 'system_generated',
        user_data: userData,
        custom_data: {
          value: 50,
          currency: 'USD',
          content_name: 'Meta Lead Ad',
          content_category: 'lead_generation',
          event_source: 'crm',
          lead_event_source: 'Meta Lead Ads Webhook',
        },
      };

      const accessToken = process.env.META_ACCESS_TOKEN || '';
      if (accessToken) {
        const capiRes = await fetchWithTimeout(
          `https://graph.facebook.com/v26.0/${PIXEL_ID}/events`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: [capiEvent], access_token: accessToken }),
          }
        );

        if (capiRes.ok) {
          console.log('[Meta Webhook] ✓ CAPI Lead event sent for leadgen:', leadgenId);
        } else {
          const errText = await capiRes.text().catch(() => 'unknown');
          console.warn('[Meta Webhook] CAPI failed:', capiRes.status, errText.slice(0, 200));
        }
      }
    } catch (capiErr) {
      console.warn('[Meta Webhook] CAPI error:', capiErr);
    }

  } catch (fetchErr) {
    console.warn('[Meta Webhook] Error fetching lead data:', fetchErr);
  }
}
