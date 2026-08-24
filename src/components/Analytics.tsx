'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { track } from '@/lib/analytics';

const GA_MEASUREMENT_ID = 'G-MHC25XBP3P';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

/**
 * Analytics provider — loads GA4 (gtag.js) + GTM, initializes dataLayer.
 * Place once in layout.tsx. No props needed.
 */
export default function Analytics() {
  // Initialize dataLayer + push gtag config on mount
  useEffect(() => {
    track.init();
  }, []);

  return (
    <>
      {/* ─── GA4 gtag.js (primary) ─── */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga4-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />

      {/* ─── GTM (optional, via env) ─── */}
      {GTM_ID && (
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      )}
    </>
  );
}
