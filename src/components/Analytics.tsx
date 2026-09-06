'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';

// ── Tracking IDs ──────────────────────────────────────────────────────
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-NLD3G98X';
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || 'G-MHC25XBP3P';
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || 'y7hrmh5gu4';
const UCSG_TRACKING_ID =
  process.env.NEXT_PUBLIC_UCSG_TRACKING_ID ||
  'tk_b6bec4688bdc473b85ae341de9f730fc';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '2582317282238910';
const META_APP_ID = process.env.NEXT_PUBLIC_META_APP_ID || '';

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
    fbAsyncInit?: () => void;
    __fbReady?: boolean;
    FB?: {
      init: (params: Record<string, unknown>) => void;
      getLoginStatus: (cb: (response: unknown) => void) => void;
      login: (cb: (response: unknown) => void, opts?: Record<string, unknown>) => void;
      logout?: (cb: (response: unknown) => void) => void;
      api: (path: string, cb?: (response: unknown) => void) => void;
      ui: (params: Record<string, unknown>, cb?: (response: unknown) => void) => void;
      XFBML?: { parse: (node?: HTMLElement) => void };
      AppEvents?: {
        logEvent: (name: string, params?: Record<string, unknown>) => void;
        logPageView: () => void;
        setUserIDs?: (ids: Record<string, string>) => void;
      };
    };
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
      {/* Region-specific: EEA/UK/CH users get denied-by-default (GDPR/UK GDPR), */}
      {/* rest of world gets granted-by-default (better ad attribution quality). */}
      {/* url_passthrough + ads_data_redaction improve EEA compliance + attribution. */}
      <script
        id="google-consent-defaults"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            // Default for ALL regions — denied (safe default)
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 1500,
              'url_passthrough': true,
              'ads_data_redaction': true
            });
            // Region-specific override — non-EEA users get granted by default
            gtag('consent', 'default', {
              'analytics_storage': 'granted',
              'ad_storage': 'granted',
              'ad_user_data': 'granted',
              'ad_personalization': 'granted',
              'region': ['US','CA','MX','BR','AR','CL','CO','PE','IN','BD','PK','LK','NP','BT','MV','AU','NZ','JP','KR','SG','MY','TH','PH','ID','VN','AE','SA','QA','KW','BH','OM','EG','NG','ZA','MA','DZ','TN','KE','GH','ET']
            });
          `,
        }}
      />

      {/* ── Meta Pixel Base Code (DIRECT — not through GTM) ───────── */}
      {/* Includes Advanced Matching (Automatic Advanced Matching enabled) */}
      {/* and external_id support per latest Meta SDK best practices. */}
      {/* fbq('init') with autoConfig:true enables Automatic Advanced Matching, */}
      {/* which sends hashed browser PII to improve event matching. */}
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
                fbq('init', '${META_PIXEL_ID}', {
                  em: undefined,
                  ph: undefined,
                  fn: undefined,
                  ln: undefined,
                  external_id: undefined
                }, {
                  eventID: 'PageView-' + Date.now()
                });
                fbq('consent', 'revoke');
                fbq('track', 'PageView', {}, { eventID: 'PageView-' + Date.now() });
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

      {/* ── Facebook JavaScript SDK ──────────────────────────────── */}
      {/* Provides FB.login(), FB.ui() (share dialog), FB.api() social features. */}
      {/* App ID 1735690574381075 (app "UCSG"), discovered via debug_token. */}
      {/* Loads the SDK; tracking remains gated by the Meta Pixel consent (fbq 'consent'). */}
      {/* fbAsyncInit is defined BEFORE sdk.js loads so the SDK calls it when ready. */}
      {META_APP_ID && (
        <script
          id="facebook-js-sdk"
          dangerouslySetInnerHTML={{
            __html: `
              window.fbAsyncInit = function() {
                try {
                  FB.init({
                    appId      : '${META_APP_ID}',
                    cookie     : true,   // enable cookies for server-side session access
                    xfbml      : true,   // parse social plugins (Like, Share)
                    version    : 'v26.0' // latest Graph API version
                  });
                  window.__fbReady = true;
                  console.log('[FB SDK] Initialized with app:', '${META_APP_ID}', '(v26.0)');
                  // Notify any listeners that the SDK is ready
                  window.dispatchEvent(new CustomEvent('ucsg-fb-ready', { detail: { appId: '${META_APP_ID}' } }));
                } catch (err) {
                  console.error('[FB SDK] FB.init failed:', err);
                  window.dispatchEvent(new CustomEvent('ucsg-fb-error', { detail: { stage: 'init', error: String(err) } }));
                }
              };
              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.async = true; js.defer = true;
                js.crossOrigin = 'anonymous';
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                js.onerror = function() {
                  console.warn('[FB SDK] sdk.js failed to load (ad blocker or network error)');
                  window.dispatchEvent(new CustomEvent('ucsg-fb-error', { detail: { stage: 'script-load' } }));
                };
                if (fjs && fjs.parentNode) {
                  fjs.parentNode.insertBefore(js, fjs);
                } else {
                  d.head.appendChild(js);
                }
              }(document, 'script', 'facebook-jssdk'));
            `,
          }}
        />
      )}

      {/* ── Google Tag Manager (GTM-NLD3G98X) ────────────────────── */}
      {/* GTM handles GA4, ads, and other tags via its container config */}
      <Script
        id="gtm-script"
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        strategy="afterInteractive"
      />

      {/* ── Google Analytics 4 (GA4) Direct gtag.js ──────────────── */}
      {/* Loaded ONLY if GTM is not present (prevents double page_view/event counts). */}
      {/* GTM container (GTM-NLD3G98X) is the canonical GA4 loader; this is a fallback. */}
      {GA4_ID && !GTM_ID && (
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
              console.log('[GA4] Initialized (no GTM fallback):', GA4_ID);
            }
          }}
        />
      )}
      {GA4_ID && GTM_ID && (
        <Script
          id="ga4-gtag-gated"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Only load direct gtag.js if GTM failed to load (no google_tag_manager)
              window.addEventListener('load', function() {
                if (!window.google_tag_manager && !window.__ga4FallbackLoaded) {
                  window.__ga4FallbackLoaded = true;
                  var s = document.createElement('script');
                  s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA4_ID}';
                  s.async = true;
                  s.onload = function() {
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA4_ID}', { send_page_view: true });
                    console.log('[GA4] Fallback initialized (GTM not detected):', '${GA4_ID}');
                  };
                  document.head.appendChild(s);
                }
              });
            `,
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
