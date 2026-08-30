import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from '@/lib/db';

// ─── Configuration ─────────────────────────────────────────────────────

const GHL_API_KEY = process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || '';
const GHL_PIPELINE_ID = process.env.GHL_PIPELINE_ID || '';
const GHL_STAGE_ID = process.env.GHL_STAGE_ID || '';
// Use NEXT_PUBLIC_ prefixed var as fallback (Vercel exposes both to server)
const UCSG_TRACKING_ID = process.env.UCSG_TRACKING_ID || process.env.NEXT_PUBLIC_UCSG_TRACKING_ID || '';
const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const EMAIL_TO = process.env.EMAIL_TO || SMTP_USER;

// Cache for auto-discovered location ID
let cachedLocationId: string | null | undefined = undefined; // undefined = not tried yet

// ─── UTM Parameter Extraction ────────────────────────────────────────

/** Extract UTM params from request URL and Referer header */
function extractUTM(req: NextRequest): Record<string, string> {
  const utm: Record<string, string> = {};
  const url = new URL(req.url);
  const referer = req.headers.get('referer') || '';

  // From request URL query params
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id', 'gclid', 'fbclid'];
  for (const key of utmKeys) {
    const val = url.searchParams.get(key);
    if (val) utm[key] = val;
  }

  // From referer URL if not already captured
  if (referer && Object.keys(utm).length === 0) {
    try {
      const refUrl = new URL(referer);
      for (const key of utmKeys) {
        const val = refUrl.searchParams.get(key);
        if (val) utm[key] = val;
      }
    } catch {
      // ignore invalid referer
    }
  }

  return utm;
}

// ─── GoHighLevel Direct API Integration ────────────────────────────────

/**
 * Create or update a contact in GoHighLevel via the official API.
 * Includes UTM parameters as custom fields and intent/program tags.
 */
async function pushToGoHighLevel(data: {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  tags: string[];
  customFields: { id: string; value: string }[];
  utmCustomFields: { id: string; value: string }[];
  utm: Record<string, string>;
}) {
  if (!GHL_API_KEY) {
    console.warn('[GHL] ⚠️  NOT CONNECTED — GHL_API_KEY is not configured.');
    return null;
  }

  // Resolve location ID: env var → cached discovery → try discover once
  let locationId = GHL_LOCATION_ID;
  if (!locationId) {
    if (cachedLocationId === undefined) {
      // Try to auto-discover location ID via GHL business profile
      try {
        console.log('[GHL] Auto-discovering location ID...');
        const bizRes = await fetch('https://services.leadconnectorhq.com/businesses/', {
          headers: {
            'Authorization': `Bearer ${GHL_API_KEY}`,
            'Version': '2021-07-28',
            'Accept': 'application/json',
          },
        });
        if (bizRes.ok) {
          const bizData = await bizRes.json();
          const loc = bizData?.locations?.[0]?.id || bizData?.locationId || bizData?.id;
          if (loc) {
            cachedLocationId = loc;
            locationId = loc;
            console.log('[GHL] ✓ Auto-discovered location ID:', loc);
          } else {
            cachedLocationId = null;
            console.warn('[GHL] ⚠️  Could not auto-discover location ID from business profile. Response:', JSON.stringify(bizData).slice(0, 300));
          }
        } else {
          cachedLocationId = null;
          const errText = await bizRes.text().catch(() => 'unknown');
          console.warn('[GHL] ⚠️  Auto-discover failed (' + bizRes.status + '):', errText.slice(0, 200));
        }
      } catch (e) {
        cachedLocationId = null;
        console.warn('[GHL] ⚠️  Auto-discover error:', e);
      }
    } else if (cachedLocationId) {
      locationId = cachedLocationId;
    }
  }

  if (!locationId) {
    console.warn('[GHL] ⚠️  NOT CONNECTED — GHL_LOCATION_ID not configured and auto-discovery failed.');
    console.warn('[GHL] To fix: add GHL_LOCATION_ID to Vercel environment settings (Settings → Environment Variables).');
    return null;
  }

  try {
    // 1. Upsert contact
    const contactRes = await fetch(
      `https://services.leadconnectorhq.com/contacts/upsert?locationId=${locationId}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName || '',
          email: data.email,
          phone: data.phone || undefined,
          tags: data.tags,
          customFields: [
            ...data.customFields.filter(f => f.value),
            ...data.utmCustomFields,
          ],
        }),
      },
    );

    if (!contactRes.ok) {
      const errText = await contactRes.text();
      console.error(`[GHL] Contact upsert failed (${contactRes.status}):`, errText);
      return null;
    }

    const contactData = await contactRes.json();
    const contactId = contactData.contact?.id;

    // 2. Add to pipeline/stage if configured
    if (contactId && GHL_PIPELINE_ID && GHL_STAGE_ID) {
      try {
        const pipelineRes = await fetch(
          `https://services.leadconnectorhq.com/pipelines/${GHL_PIPELINE_ID}/stages/${GHL_STAGE_ID}/contacts`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${GHL_API_KEY}`,
              'Version': '2021-07-28',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({ contact_ids: [contactId] }),
          },
        );

        if (!pipelineRes.ok) {
          console.error(`[GHL] Pipeline add failed (${pipelineRes.status}):`, await pipelineRes.text());
        } else {
          console.log(`[GHL] Contact ${contactId} added to pipeline ${GHL_PIPELINE_ID}/${GHL_STAGE_ID}`);
        }
      } catch (pipelineErr) {
        console.error('[GHL] Pipeline error:', pipelineErr);
      }
    }

    console.log(`[GHL] Contact ${contactId} created/updated successfully`);
    return contactId;
  } catch (err) {
    console.error('[GHL] Direct API error:', err);
    return null;
  }
}

// ─── GHL External Tracking (server-side ping) ─────────────────────────

async function pingGHLTracking(leadData: {
  name: string;
  email: string;
  phone: string;
  service: string;
  source: string;
}) {
  if (!UCSG_TRACKING_ID) {
    console.warn('[GHL-Track] ⚠️  NOT CONNECTED — UCSG_TRACKING_ID not configured.');
    console.warn('[GHL-Track] Set UCSG_TRACKING_ID in Vercel env (same value as NEXT_PUBLIC_UCSG_TRACKING_ID).');
    return null;
  }

  // The GHL external tracking script (client-side) handles lead capture via goTrackLead().
  // This server-side function is a redundant fallback that pings the tracking webhook.
  // Primary lead flow: client goTrackLead() → GHL. This is a safety net only.
  try {
    const res = await fetch(`https://lead.universalconsultingservices.com/api/lead-capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        tracking_id: UCSG_TRACKING_ID,
        event: 'lead_capture',
        lead: {
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone,
          service_needed: leadData.service,
          source: leadData.source,
          submitted_at: new Date().toISOString(),
        },
      }),
    });
    if (res.ok) {
      const result = await res.json().catch(() => null);
      console.log('[GHL-Track] Lead pinged successfully:', result?.id || 'ok');
      return result;
    }
    console.warn('[GHL-Track] Endpoint returned', res.status, '— client-side goTrackLead() will handle the lead');
  } catch {
    // Silently fail — client-side tracking is the primary path
  }
  return null;
}

// ─── Meta Conversions API (Server-Side) ──────────────────────────────

/**
 * Fire a server-side Lead event to Meta Conversions API.
 * This deduplicates with the client-side fbq('track','Lead') using the same event_id.
 * Meta counts it as ONE conversion even though it arrives from two sources.
 */
async function fireMetaCAPI(data: {
  event_id?: string;
  event_source_url?: string;
  user_agent?: string;
  email?: string;
  phone?: string;
  name?: string;
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
}) {
  const pixelId = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID || '2582317282238910';
  const accessToken = process.env.META_ACCESS_TOKEN || '';

  if (!pixelId || !accessToken) {
    // Silently skip — META_ACCESS_TOKEN is only needed for CAPI
    return;
  }

  if (!data.event_id) {
    console.warn('[Meta CAPI] Skipped: no event_id for deduplication');
    return;
  }

  try {
    const event = {
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      event_id: data.event_id,
      event_source_url: data.event_source_url || 'https://www.universalconsultingservices.com',
      action_source: 'website',
      user_data: {
        client_user_agent: data.user_agent,
        em: data.email ? [data.email.toLowerCase().trim()] : undefined,
        ph: data.phone ? [data.phone.replace(/\D/g, '')] : undefined,
        fn: data.name ? [data.name.toLowerCase().trim()] : undefined,
      },
      custom_data: {
        value: data.value ?? 50,
        currency: data.currency || 'USD',
      },
    };

    // Remove undefined user_data fields
    const ud = event.user_data as Record<string, unknown>;
    Object.keys(ud).forEach(k => ud[k] === undefined && delete ud[k]);

    const res = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ data: [event], access_token: accessToken }),
    });

    if (res.ok) {
      const result = await res.json().catch(() => null);
      console.log('[Meta CAPI] ✓ Lead event sent (dedup:', data.event_id.slice(0, 8) + '...)');
    } else {
      const errText = await res.text().catch(() => 'unknown');
      console.warn('[Meta CAPI] Failed (' + res.status + '):', errText.slice(0, 200));
    }
  } catch (err) {
    console.warn('[Meta CAPI] Error:', err);
  }
}

// ─── Email Notification ──────────────────────────────────────────────

async function sendEmailNotification(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  source: string;
  whatsapp?: string;
  nationality?: string;
  utm: Record<string, string>;
}) {
  if (!SMTP_USER || !SMTP_PASS) {
    console.log('[Email] Skipping: SMTP credentials not configured');
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

  const utmInfo = Object.keys(data.utm).length > 0
    ? `<p style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 500;">UTM Data</p><p style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 12px; color: #334155;">${Object.entries(data.utm).map(([k, v]) => `${k}: ${v}`).join('<br>')}</p>`
    : '';

    const subject = `New Lead from ${data.name} — ${data.service || 'General Inquiry'}`;

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #061846 0%, #092B68 100%); padding: 24px 32px;">
          <h1 style="color: white; margin: 0; font-size: 20px; font-weight: 700;">New Lead — UCSG Website</h1>
          <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 13px;">${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}</p>
        </div>
        <div style="padding: 24px 32px; background: white;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 500; width: 120px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 500;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${data.email}" style="color: #0874F9; text-decoration: none; font-weight: 600;">${data.email}</a></td>
            </tr>
            ${data.phone ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 500;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;"><a href="tel:${data.phone}" style="color: #0874F9; text-decoration: none;">${data.phone}</a></td></tr>` : ''}
            ${data.whatsapp ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 500;">WhatsApp</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;"><a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" style="color: #25D366; text-decoration: none;">${data.whatsapp}</a></td></tr>` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 500;">Service</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;">${data.service || 'Not specified'}</td>
            </tr>
            ${data.nationality ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 500;">Nationality</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;">${data.nationality}</td></tr>` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 500;">Source</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;">${data.source}</td>
            </tr>
            ${utmInfo}
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-weight: 500; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; font-weight: 500; color: #334155; line-height: 1.6;">${data.message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
        </div>
        <div style="padding: 16px 32px; background: #f8f9fa; text-align: center;">
          <p style="margin: 0; font-size: 12px; color: #94a3b8;">UCSG — Universal Consulting Service Group</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"UCSG Website" <${SMTP_USER}>`,
      to: EMAIL_TO,
      replyTo: data.email,
      subject,
      html: htmlBody,
    });

    console.log('[Email] Notification sent successfully to', EMAIL_TO);
  } catch (err) {
    console.error('[Email] Failed to send notification:', err);
  }
}

// ─── Intent-based tag builder ────────────────────────────────────────

/** Build GHL tags based on the lead's intent and program interest */
function buildIntentTags(service: string, message: string): string[] {
  const tags: string[] = [];
  const lowerMsg = message.toLowerCase();
  const lowerService = (service || '').toLowerCase();

  // Intent tags from service field
  if (lowerService.includes('transfer')) tags.push('Intent: University Transfer');
  if (lowerService.includes('cpt')) tags.push('Intent: CPT Information');
  if (lowerService.includes('opt')) tags.push('Intent: OPT/STEM OPT');
  if (lowerService.includes('change of status') || lowerService.includes('cos')) tags.push('Intent: Change of Status');
  if (lowerService.includes('sevis') || lowerService.includes('reinstatement')) tags.push('Intent: SEVIS Reinstatement');
  if (lowerService.includes('assessment')) tags.push('Intent: Free Assessment');
  if (lowerService.includes('master')) tags.push('Program: Masters');
  if (lowerService.includes('phd') || lowerService.includes('doctoral')) tags.push('Program: PhD/Doctoral');
  if (lowerService.includes('dba')) tags.push('Program: DBA');
  if (lowerService.includes('stem')) tags.push('Interest: STEM Programs');
  if (lowerService.includes('hybrid')) tags.push('Interest: Hybrid Format');
  if (lowerService.includes('online')) tags.push('Interest: Online Format');

  // Extract intent from message body (for assessment form submissions)
  if (lowerMsg.includes('situation:')) {
    const situationMatch = lowerMsg.match(/f-1 situation:\s*(.+)/i);
    if (situationMatch) tags.push(`F1: ${situationMatch[1].trim()}`);
  }
  if (lowerMsg.includes('degree level:')) {
    const degreeMatch = lowerMsg.match(/degree level:\s*(.+)/i);
    if (degreeMatch) tags.push(`Degree: ${degreeMatch[1].trim()}`);
  }
  if (lowerMsg.includes('field of study:')) {
    const fieldMatch = lowerMsg.match(/field of study:\s*(.+)/i);
    if (fieldMatch) tags.push(`Field: ${fieldMatch[1].trim()}`);
  }
  if (lowerMsg.includes('budget range:')) {
    const budgetMatch = lowerMsg.match(/budget range:\s*(.+)/i);
    if (budgetMatch) tags.push(`Budget: ${budgetMatch[1].trim()}`);
  }

  return tags;
}

// ─── Idempotency Protection ──────────────────────────────────────────

/** Simple in-memory rate limiter: one submission per email per 60 seconds */
const submissionTimestamps = new Map<string, number>();
const IDEMPOTENCY_WINDOW_MS = 60_000;

function isDuplicateSubmission(email: string): boolean {
  const now = Date.now();
  const last = submissionTimestamps.get(email.toLowerCase().trim());
  if (last && now - last < IDEMPOTENCY_WINDOW_MS) {
    return true;
  }
  submissionTimestamps.set(email.toLowerCase().trim(), now);
  // Clean old entries every 100 submissions
  if (submissionTimestamps.size > 100) {
    const cutoff = now - IDEMPOTENCY_WINDOW_MS;
    for (const [key, ts] of submissionTimestamps.entries()) {
      if (ts < cutoff) submissionTimestamps.delete(key);
    }
  }
  return false;
}

// ─── Main Handler ──────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name, email, phone, message, service, whatsapp, nationality,
      englishLevel, source, situation, degreeLevel, fieldOfStudy,
      preferredLocation, preferredFormat, budgetRange, optEndDate,
      targetIntake, currentUniversity,
      // Client-side analytics event_id for Meta CAPI deduplication
      meta_event_id, meta_lead_value, meta_currency,
    } = body;

    // Extract UTM parameters
    const utm = extractUTM(req);

    // Basic validation
    if (!name || !name.trim() || !email || !email.trim() || !message || !message.trim()) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    // Idempotency: reject rapid duplicate submissions
    if (isDuplicateSubmission(email)) {
      return NextResponse.json({ success: true, id: 'duplicate', message: 'Submission already received.' });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone?.trim() || '';
    const trimmedService = service?.trim() || '';
    const trimmedMessage = message.trim();
    const formSource = source?.trim() || 'UCSG Website';

    // Split name into first/last name
    const nameParts = trimmedName.split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    // Build tags — base + intent + UTM source
    const tags: string[] = ['UCSG Website Lead', 'Contact Form'];
    if (trimmedService) tags.push(trimmedService);
    if (formSource && formSource !== 'UCSG Website') tags.push(`Source: ${formSource}`);
    if (nationality?.trim()) tags.push(`Nationality: ${nationality.trim()}`);
    if (utm.utm_source) tags.push(`UTM: ${utm.utm_source}`);
    if (utm.utm_campaign) tags.push(`Campaign: ${utm.utm_campaign}`);

    // Add intent-based tags
    const intentTags = buildIntentTags(trimmedService, trimmedMessage);
    tags.push(...intentTags);

    // Build custom fields for GHL
    // ⚠️ IMPORTANT: GoHighLevel requires NUMERIC custom field IDs (e.g. "0Pabc123"), not
    // string names. The values below use descriptive keys as placeholders — replace each
    // `GHL_FIELD_*` constant with the actual numeric ID from your GHL dashboard:
    //   Settings → Custom Fields → copy the Field ID for each field.
    // Until these are set, custom fields will be silently ignored by the GHL API.
    const ghlCustomFields: { id: string; value: string }[] = [
      { id: process.env.GHL_FIELD_WHATSAPP || 'whatsapp_number', value: whatsapp?.trim() || '' },
      { id: process.env.GHL_FIELD_NATIONALITY || 'nationality', value: nationality?.trim() || '' },
      { id: process.env.GHL_FIELD_ENGLISH_LEVEL || 'english_level', value: englishLevel?.trim() || '' },
      { id: process.env.GHL_FIELD_SERVICE || 'service_needed', value: trimmedService },
      { id: process.env.GHL_FIELD_MESSAGE || 'message', value: trimmedMessage },
      { id: process.env.GHL_FIELD_LAST_NAME || 'last_name', value: lastName },
      { id: process.env.GHL_FIELD_SOURCE || 'source', value: formSource },
      // Assessment-specific fields
      { id: process.env.GHL_FIELD_F1_SITUATION || 'f1_situation', value: situation?.trim() || '' },
      { id: process.env.GHL_FIELD_DEGREE_LEVEL || 'degree_level', value: degreeLevel?.trim() || '' },
      { id: process.env.GHL_FIELD_FIELD_OF_STUDY || 'field_of_study', value: fieldOfStudy?.trim() || '' },
      { id: process.env.GHL_FIELD_PREFERRED_LOCATION || 'preferred_location', value: preferredLocation?.trim() || '' },
      { id: process.env.GHL_FIELD_PREFERRED_FORMAT || 'preferred_format', value: preferredFormat?.trim() || '' },
      { id: process.env.GHL_FIELD_BUDGET_RANGE || 'budget_range', value: budgetRange?.trim() || '' },
      { id: process.env.GHL_FIELD_OPT_END_DATE || 'opt_end_date', value: optEndDate?.trim() || '' },
      { id: process.env.GHL_FIELD_TARGET_INTAKE || 'target_intake', value: targetIntake?.trim() || '' },
      { id: process.env.GHL_FIELD_CURRENT_UNIVERSITY || 'current_university', value: currentUniversity?.trim() || '' },
    ];

    // Also keep UTM as custom fields (GHL doesn't have built-in UTM fields)
    const utmCustomFields: { id: string; value: string }[] = [
      ...(utm.utm_source ? [{ id: 'utm_source', value: utm.utm_source }] : []),
      ...(utm.utm_medium ? [{ id: 'utm_medium', value: utm.utm_medium }] : []),
      ...(utm.utm_campaign ? [{ id: 'utm_campaign', value: utm.utm_campaign }] : []),
      ...(utm.utm_term ? [{ id: 'utm_term', value: utm.utm_term }] : []),
      ...(utm.utm_content ? [{ id: 'utm_content', value: utm.utm_content }] : []),
      ...(utm.gclid ? [{ id: 'gclid', value: utm.gclid }] : []),
      ...(utm.fbclid ? [{ id: 'fbclid', value: utm.fbclid }] : []),
    ];

    // ─── Push to all lead destinations (non-blocking, fire-and-forget) ───

    // 1. GoHighLevel Direct API (contact upsert + pipeline)
    pushToGoHighLevel({
      firstName,
      lastName: lastName || undefined,
      email: trimmedEmail,
      phone: trimmedPhone || undefined,
      tags,
      customFields: ghlCustomFields,
      utmCustomFields,
      utm,
    }).catch(() => {});

    // 2. GHL External Tracking webhook (client-side goTrackLead is primary)
    pingGHLTracking({
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      service: trimmedService,
      source: formSource,
    }).catch(() => {});

    // 3. Email notification to ucsgassist@gmail.com
    sendEmailNotification({
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      service: trimmedService,
      message: trimmedMessage,
      source: formSource,
      whatsapp: whatsapp?.trim() || undefined,
      nationality: nationality?.trim() || undefined,
      utm,
    }).catch(() => {});

    // 4. Meta Conversions API (server-side deduplication with client-side pixel)
    fireMetaCAPI({
      event_id: meta_event_id,
      event_source_url: req.headers.get('referer') || req.url,
      user_agent: req.headers.get('user-agent') || undefined,
      email: trimmedEmail,
      phone: trimmedPhone || undefined,
      name: trimmedName,
      value: meta_lead_value,
      currency: meta_currency,
      content_name: formSource,
      content_category: 'lead_generation',
    }).catch(() => {});

    // 5. Store in local database
    const submission = await db.contactSubmission.create({
      data: {
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone || null,
        whatsapp: whatsapp?.trim() || null,
        nationality: nationality?.trim() || null,
        englishLevel: englishLevel?.trim() || null,
        service: trimmedService || null,
        message: trimmedMessage,
      },
    });

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
