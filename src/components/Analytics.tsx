'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { track } from '@/lib/analytics';

// Analytics tracking IDs (public-facing identifiers, safe to expose in client bundle)
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-MHC25XBP3P';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-K65M9LJW';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '2582317282238910';
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID || 'y7hrmh5gu4';
const UCSG_TRACKING_ID = process.env.NEXT_PUBLIC_UCSG_TRACKING_ID || 'tk_b6bec4688bdc473b85ae341de9f730fc';

/**
 * Analytics provider — loads GA4 + GTM + Meta Pixel + Clarity + UCSG Lead Tracking.
 * Place once in layout.tsx. No props needed.
 */
export default function Analytics() {
  // Initialize dataLayer
  useEffect(() => {
    track.init();
  }, []);

  return (
    <>
      {/* ─── GA4 gtag.js ─── */}
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
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />

      {/* ─── Meta Pixel (Facebook) ─── */}
      <Script
        id="meta-pixel-init"
        strategy="afterInteractive"
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

      {/* ─── Microsoft Clarity ─── */}
      <Script
        id="ms-clarity"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
          `,
        }}
      />

      {/* ─── UCSG Lead Tracking ─── */}
      <Script
        id="ucsg-external-tracking"
        src="https://lead.universalconsultingservices.com/js/external-tracking.js"
        data-tracking-id={UCSG_TRACKING_ID}
        strategy="afterInteractive"
      />

      {/* ─── Google Tag Manager ─── */}
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
    </>
  );
}
