import { NextResponse } from 'next/server';

/**
 * Diagnostic endpoint: check ALL lead/analytics systems.
 * Returns a detailed report of what is and isn't configured.
 *
 * Usage: GET /api/lead-connector-status
 */
export async function GET() {
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';
  const metaServerPixelId = process.env.META_PIXEL_ID || '';
  const metaAccessToken = process.env.META_ACCESS_TOKEN || '';

  const checks = {
    timestamp: new Date().toISOString(),

    // Meta Pixel (Direct — fires Lead events with currency)
    metaPixel: {
      pixelId: metaPixelId,
      configured: !!metaPixelId,
      status: metaPixelId
        ? `Active — Pixel ${metaPixelId} loads directly with fbq('track','Lead',{value:50,currency:'USD'})`
        : 'NOT CONFIGURED — Meta Lead events have NO currency. Set NEXT_PUBLIC_META_PIXEL_ID in Vercel env.',
    },

    // Meta Conversions API (Server-Side)
    metaCapi: {
      pixelId: metaServerPixelId || metaPixelId,
      accessTokenConfigured: !!metaAccessToken,
      status: metaAccessToken && (metaServerPixelId || metaPixelId)
        ? 'Active — server-side deduplication with client Pixel enabled'
        : 'Not configured — set META_ACCESS_TOKEN in Vercel env (optional but recommended)',
    },

    // Client-side GHL External Tracking
    ghlExternalTracking: {
      scriptUrl: 'https://lead.universalconsultingservices.com/js/external-tracking.js',
      trackingId: process.env.NEXT_PUBLIC_UCSG_TRACKING_ID || '',
      trackingIdConfigured: !!process.env.NEXT_PUBLIC_UCSG_TRACKING_ID,
      status: process.env.NEXT_PUBLIC_UCSG_TRACKING_ID
        ? 'Configured — script loads on client, goTrackLead() available after init'
        : 'Not configured — set NEXT_PUBLIC_UCSG_TRACKING_ID in Vercel env',
    },

    // Server-side GHL Direct API
    ghlDirectApi: {
      apiKeyConfigured: !!process.env.GHL_API_KEY,
      apiKeyPrefix: process.env.GHL_API_KEY ? `${process.env.GHL_API_KEY.slice(0, 8)}...` : '',
      locationIdConfigured: !!process.env.GHL_LOCATION_ID,
      locationId: process.env.GHL_LOCATION_ID || '',
      pipelineIdConfigured: !!process.env.GHL_PIPELINE_ID,
      stageIdConfigured: !!process.env.GHL_STAGE_ID,
      status: process.env.GHL_API_KEY
        ? process.env.GHL_LOCATION_ID
          ? 'Connected — contact upsert + pipeline staging enabled'
          : 'Partially connected — API key set but no LOCATION_ID (will auto-discover)'
        : 'Not connected — set GHL_API_KEY in Vercel env',
    },

    // GTM
    gtm: {
      containerId: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-K65M9LJW',
      status: 'Active — GTM container loads on all pages',
    },

    // Email
    email: {
      configured: !!(process.env.SMTP_USER && process.env.SMTP_PASS),
      smtpHost: process.env.SMTP_HOST || '',
      status: process.env.SMTP_USER
        ? 'Active — email notifications enabled'
        : 'Not configured — set SMTP_HOST, SMTP_USER, SMTP_PASS in Vercel env',
    },
  };

  // Compute overall status
  const metaActive = !!metaPixelId;
  const ghlActive = checks.ghlExternalTracking.trackingIdConfigured;
  const criticalConnected = metaActive && ghlActive;

  return NextResponse.json({
    overall: criticalConnected && checks.ghlDirectApi.apiKeyConfigured && checks.email.configured
      ? 'fully_connected'
      : criticalConnected
        ? 'partially_connected'
        : 'not_connected',
    summary: metaActive
      ? 'Meta Pixel fires Lead events with currency: USD, value: 50. CAPI deduplication active.'
      : '⚠️ META PIXEL NOT CONFIGURED — Lead events missing currency for ads ROAS.',
    checks,
    actionsNeeded: [
      !metaPixelId
        ? '1. ⚠️ CRITICAL: Set NEXT_PUBLIC_META_PIXEL_ID in Vercel env (fixes Meta currency warning)'
        : null,
      !metaAccessToken
        ? '2. Set META_ACCESS_TOKEN in Vercel env (optional — enables server-side deduplication)'
        : null,
      !checks.ghlExternalTracking.trackingIdConfigured
        ? '3. Set NEXT_PUBLIC_UCSG_TRACKING_ID in Vercel env'
        : null,
      !checks.ghlDirectApi.apiKeyConfigured
        ? '4. Set GHL_API_KEY in Vercel env (GoHighLevel Settings → API)'
        : null,
      !checks.ghlDirectApi.locationIdConfigured
        ? '5. Set GHL_LOCATION_ID in Vercel env (GoHighLevel Locations)'
        : null,
      !checks.email.configured
        ? '6. Set SMTP_HOST, SMTP_USER, SMTP_PASS in Vercel env'
        : null,
    ].filter(Boolean),
  });
}
