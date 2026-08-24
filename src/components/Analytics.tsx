'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { track } from '@/lib/analytics';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

/**
 * Analytics provider — loads GTM and initializes dataLayer.
 * Place once in layout.tsx. No props needed.
 */
export default function Analytics() {
  // Initialize dataLayer on mount
  useEffect(() => {
    track.init();
  }, []);

  if (!GTM_ID) return null;

  return (
    <>
      {/* GTM — head script (sets dataLayer before GTM loads) */}
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
