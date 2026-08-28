'use client';

import Script from 'next/script';
import { useEffect } from 'react';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-K65M9LJW';
const UCSG_TRACKING_ID =
  process.env.NEXT_PUBLIC_UCSG_TRACKING_ID ||
  'tk_b6bec4688bdc473b85ae341de9f730fc';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    track: {
      init: () => void;
    };
  }
}

export default function Analytics() {
  useEffect(() => {
    try {
      window.track?.init();
    } catch {
      /* GHL not loaded yet */
    }
  }, []);

  return (
    <>
      {/* Google Consent Mode v2 defaults (MUST run before GTM) */}
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

      {/* GTM container – single tag manager for GA4, Meta Pixel, Clarity */}
      <Script
        id="gtm-script"
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        strategy="afterInteractive"
      />

      {/* GHL External Tracking (loaded directly, NOT inside GTM) */}
      <Script
        id="ghl-external-tracking"
        src="https://lead.universalconsultingservices.com/js/external-tracking.js"
        data-tracking-id={UCSG_TRACKING_ID}
        strategy="afterInteractive"
      />
    </>
  );
}
