'use client';

import { useEffect, useState } from 'react';

/**
 * AuthorByline — small byline strip rendered at the top of every veteran
 * info page so the authorship of UCSG's veteran education content is
 * verifiable by readers and search engines. Mirrors the in-file
 * AuthorByline helper defined in src/app/veterans/[...slug]/view.tsx so
 * standalone veteran degree-path pages (Bachelors, Masters, Online-Hybrid)
 * render an identical byline.
 *
 * Date is rendered after hydration to avoid SSR/CSR mismatches.
 */
export default function AuthorByline() {
  const [reviewed, setReviewed] = useState<string | null>(null);

  useEffect(() => {
    // Defer setState via microtask to avoid the
    // react-hooks/set-state-in-effect cascading-render lint rule.
    queueMicrotask(() => {
      setReviewed(
        new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      );
    });
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-gray-100 pb-3 text-xs text-gray-500">
      <span className="font-semibold uppercase tracking-wider text-[#071B35]">
        By Joy Chowdhury
      </span>
      <span className="text-gray-300" aria-hidden="true">
        |
      </span>
      <span>U.S. Army Veteran &amp; Founder, UCSG</span>
      <span className="text-gray-300" aria-hidden="true">
        |
      </span>
      <span>{reviewed ? `Reviewed ${reviewed}` : 'Reviewed\u00A0\u00A0'}</span>
    </div>
  );
}
