'use client';

import { useState, useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import { track } from '@/lib/analytics';

interface Props {
  onClick: () => void;
}

export default function PersistentAssessmentButton({ onClick }: Props) {
  const [visible, setVisible] = useState(false);
  const [pulsing, setPulsing] = useState(true);

  // Animate in on mount
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // Stop pulse after 6 seconds
  useEffect(() => {
    const t = setTimeout(() => setPulsing(false), 6000);
    return () => clearTimeout(t);
  }, []);

  const handleClick = () => {
    track.ctaClick({
      cta_type: 'assessment_fab',
      cta_source: 'persistent_fab',
      cta_text: 'Free Assessment',
    });
    onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Open Free Student Assessment"
      className={
        'fixed bottom-6 right-6 z-40 flex items-center gap-2.5 ' +
        'bg-[#0874F9] text-white rounded-full pl-3.5 pr-4 py-3 ' +
        'shadow-lg shadow-[#0874F9]/30 hover:shadow-xl hover:shadow-[#0874F9]/40 ' +
        'transition-all duration-300 hover:scale-105 active:scale-95 ' +
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2 ' +
        // Mobile: icon-only, smaller
        'max-sm:px-3 max-sm:py-3 ' +
        (visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none')
      }
    >
      {/* Pulse ring */}
      {pulsing && (
        <span
          className="absolute inset-0 rounded-full bg-[#0874F9] animate-ping opacity-25"
          aria-hidden="true"
        />
      )}

      <GraduationCap className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span className="text-sm font-semibold whitespace-nowrap max-sm:hidden">
        Free Assessment
      </span>
    </button>
  );
}
