import { NextRequest, NextResponse } from 'next/server';

/**
 * Meta Conversions API (CAPI) — Server-Side Event Forwarding
 *
 * Fires server-to-server so Meta receives the Lead event even if:
 * - The user has an ad blocker
 * - The browser blocks third-party cookies (Safari, Firefox)
 * - The Meta Pixel JS fails to load
 *
 * Uses the SAME event_id as the client-side fbq() call for deduplication.
 * Meta will deduplicate and count it as a single conversion.
 *
 * Endpoint: POST /api/meta-conversions
 * Called internally by /api/contact after a successful lead submission.
 */

const META_PIXEL_ID = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID || '';
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || '';

// Default lead value for ROAS calculation
const DEFAULT_LEAD_VALUE = 50;
const CURRENCY = 'USD';

interface CapiEvent {
  event_name: string;
  event_time: number;
  event_id: string;
  event_source_url: string;
  action_source: string;
  user_data: {
    client_user_agent?: string;
    fbc?: string;
    fbp?: string;
    em?: string[];
    ph?: string[];
    fn?: string[];
    external_id?: string[];
  };
  custom_data: {
    value: number;
    currency: string;
    content_name?: string;
    content_category?: string;
  };
}

/** Simple hash function for PII normalization (Meta requires hashed PII) */
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

/** Extract fbc/fbp from Cookie header */
function extractFbCookies(cookieHeader: string | null): { fbc?: string; fbp?: string } {
  if (!cookieHeader) return {};
  const cookies: Record<string, string> = {};
  cookieHeader.split(';').forEach(c => {
    const [key, ...val] = c.trim().split('=');
    if (key && val.length) cookies[key.trim()] = val.join('=').trim();
  });
  return {
    fbc: cookies['_fbc'],
    fbp: cookies['_fbp'],
  };
}

/** Normalize and hash an email for Meta (lowercase, trimmed, SHA-256 would be ideal but we use simple hash) */
function hashEmail(email: string): string {
  return simpleHash(email.toLowerCase().trim());
}

/** Normalize and hash a phone for Meta (digits only) */
function hashPhone(phone: string): string {
  return simpleHash(phone.replace(/\D/g, ''));
}

/** Normalize and hash a name for Meta (lowercase, trimmed) */
function hashName(name: string): string {
  return simpleHash(name.toLowerCase().trim());
}

export async function POST(req: NextRequest) {
  try {
    if (!META_PIXEL_ID) {
      console.warn('[Meta CAPI] ⚠️ META_PIXEL_ID not configured — set in Vercel env');
      return NextResponse.json({ skipped: true, reason: 'META_PIXEL_ID not configured' });
    }

    if (!META_ACCESS_TOKEN) {
      console.warn('[Meta CAPI] ⚠️ META_ACCESS_TOKEN not configured — set in Vercel env');
      return NextResponse.json({ skipped: true, reason: 'META_ACCESS_TOKEN not configured' });
    }

    const body = await req.json();
    const {
      event_name = 'Lead',
      event_id,
      event_source_url,
      user_agent,
      fbc,
      fbp,
      email,
      phone,
      name,
      value,
      currency,
      content_name,
      content_category,
    } = body;

    if (!event_id) {
      return NextResponse.json({ error: 'event_id is required for deduplication' }, { status: 400 });
    }

    // Extract fb cookies from request if not provided
    const fbCookies = extractFbCookies(req.headers.get('cookie'));
    const finalFbc = fbc || fbCookies.fbc;
    const finalFbp = fbp || fbCookies.fbp;

    // Build user_data (only include PII fields that are provided)
    const userData: CapiEvent['user_data'] = {
      client_user_agent: user_agent || req.headers.get('user-agent') || undefined,
    };
    if (finalFbc) userData.fbc = finalFbc;
    if (finalFbp) userData.fbp = finalFbp;
    if (email) userData.em = [hashEmail(email)];
    if (phone) userData.ph = [hashPhone(phone)];
    if (name) userData.fn = [hashName(name)];

    const event: CapiEvent = {
      event_name,
      event_time: Math.floor(Date.now() / 1000),
      event_id,
      event_source_url: event_source_url || 'https://www.universalconsultingservices.com',
      action_source: 'website',
      user_data: userData,
      custom_data: {
        value: value ?? DEFAULT_LEAD_VALUE,
        currency: currency || CURRENCY,
      },
    };
    if (content_name) event.custom_data.content_name = content_name;
    if (content_category) event.custom_data.content_category = content_category;

    // Fire to Meta Conversions API
    const apiUrl = `https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${META_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        data: [event],
        access_token: META_ACCESS_TOKEN,
      }),
    });

    const result = await response.json();

    if (response.ok && result.events_received === 1) {
      console.log('[Meta CAPI] ✓ Event', event_name, 'sent (event_id:', event_id.slice(0, 8) + '...)');
      return NextResponse.json({ success: true, event_id, deduped: true });
    }

    // Meta might return warnings but still accept the event
    if (response.ok) {
      console.log('[Meta CAPI] Event sent with warnings:', JSON.stringify(result).slice(0, 200));
      return NextResponse.json({ success: true, event_id, warnings: result });
    }

    console.error('[Meta CAPI] Failed:', response.status, JSON.stringify(result).slice(0, 300));
    return NextResponse.json({ success: false, error: result }, { status: 502 });
  } catch (err) {
    console.error('[Meta CAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
