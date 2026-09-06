'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';

// ── Tracking IDs ──────────────────────────────────────────────────────
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-M5DGD7Z2';
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || 'G-MHC25XBP3P';
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || 'y7hrmh5gu4';
const UCSG_TRACKING_ID =
  process.env.NEXT_PUBLIC_UCSG_TRACKING_ID ||
  'tk_b6bec4688bdc473b85ae341de9f730fc';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '2582317282238910';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
    clarity: (...args: unknown[]) => void;
    track: {
      init: () => void;
    };
    goTrackLead?: (data: Record<string, string>) => void;
    _ucsgq?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown[];
  }
}

export default function Analytics() {
  const ghlInitCalled = useRef(false);

  // ── GHL External Tracking init with polling retry ──────────────
  useEffect(() => {
    if (ghlInitCalled.current) return;

    if (typeof window.track?.init === 'function') {
      try {
        window.track.init();
        ghlInitCalled.current = true;
        console.log('[GHL] External tracking initialized');
      } catch {
        /* will retry */
      }
    }

    let attempts = 0;
    const maxAttempts = 20;
    const interval = setInterval(() => {
      attempts++;
      if (ghlInitCalled.current) {
        clearInterval(interval);
        return;
      }
      if (typeof window.track?.init === 'function') {
        try {
          window.track.init();
          ghlInitCalled.current = true;
          console.log('[GHL] External tracking initialized (attempt', attempts + ')');
          clearInterval(interval);
        } catch {
          /* will retry next interval */
        }
      }
      if (attempts >= maxAttempts) {
        console.warn('[GHL] External tracking script did not load within 10 seconds');
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ── Google Consent Mode v2 defaults (MUST run before GTM/gtag) ── */}
      <script
        id="google-consent-defaults"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
          `,
        }}
      />

      {/* ── Meta Pixel Base Code (DIRECT — not through GTM) ───────── */}
      {/* This ensures fbq('track','Lead',{value,currency:'USD'}) fires reliably */}
      {META_PIXEL_ID && (
        <>
          <script
            id="meta-pixel-init"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('consent', 'revoke');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}

      {/* ── Google Tag Manager (GTM-M5DGD7Z2) ────────────────────── */}
      {/* GTM handles GA4, ads, and other tags via its container config */}
      <Script
        id="gtm-script"
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        strategy="afterInteractive"
      />

      {/* ── Google Analytics 4 (GA4) Direct gtag.js ──────────────── */}
      {/* Fallback/redundancy: GA4 also fires directly via gtag.js. */}
      {/* GTM container should include GA4 config; this ensures events */}
      {/* are captured even if GTM tag is misconfigured. */}
      {GA4_ID && (
        <Script
          id="ga4-gtag"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
          strategy="afterInteractive"
          onLoad={() => {
            if (typeof window.gtag === 'function') {
              window.gtag('js', new Date());
              window.gtag('config', GA4_ID, {
                send_page_view: true,
              });
              console.log('[GA4] Initialized:', GA4_ID);
            }
          }}
        />
      )}

      {/* ── Microsoft Clarity ─────────────────────────────────────── */}
      {/* Session replay & heatmap analytics */}
      {CLARITY_ID && (
        <Script
          id="ms-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_ID}");
            `,
          }}
        />
      )}

      {/* ── GHL External Tracking (Lead Connector) ───────────────── */}
      <Script
        id="ghl-external-tracking"
        src="https://lead.universalconsultingservices.com/js/external-tracking.js"
        data-tracking-id={UCSG_TRACKING_ID}
        strategy="afterInteractive"
        onLoad={() => {
          if (!ghlInitCalled.current && typeof window.track?.init === 'function') {
            try {
              window.track.init();
              ghlInitCalled.current = true;
              console.log('[GHL] External tracking initialized (onLoad callback)');
            } catch {
              console.warn('[GHL] Script loaded but init() failed');
            }
          }
        }}
        onError={() => {
          console.error('[GHL] External tracking script FAILED to load');
        }}
      />
    </>
  );
}
