'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X } from 'lucide-react';
import { track } from '@/lib/analytics';

/* ------------------------------------------------------------------ */
/*  Section navigation data                                           */
/* ------------------------------------------------------------------ */

interface NavItem {
  id: string;
  label: string;
  shortLabel: string;
}

const SECTIONS: NavItem[] = [
  { id: 'about-ucsg', label: 'Founder Message', shortLabel: 'Founder' },
  { id: 'situation-selector', label: 'Your Situation', shortLabel: 'Situation' },
  { id: 'personalized-guidance', label: 'Personalized Guidance', shortLabel: 'Guidance' },
  { id: 'how-ucsg-helps', label: 'How UCSG Helps', shortLabel: 'Process' },
  { id: 'featured-universities', label: 'Featured Universities', shortLabel: 'Universities' },
  { id: 'program-explorer', label: 'Program Explorer', shortLabel: 'Programs' },
  { id: 'f1-resource-center', label: 'F-1 Resources', shortLabel: 'Resources' },
  { id: 'what-students-expect', label: 'What to Expect', shortLabel: 'Expect' },
  { id: 'final-cta', label: 'Get Started', shortLabel: 'CTA' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SectionNavigation() {
  const [activeId, setActiveId] = useState<string>('');
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackedRef = useRef(false);

  /* Show nav after scrolling past hero (roughly 600px) */
  useEffect(() => {
    const onScroll = () => {
      const show = window.scrollY > 600;
      setVisible(show);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Track active section via IntersectionObserver */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    );

    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  /* Close expanded on outside click */
  useEffect(() => {
    if (!expanded) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [expanded]);

  /* Close on Escape */
  useEffect(() => {
    if (!expanded) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [expanded]);

  const scrollTo = useCallback((id: string, label: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      track.navClick({
        nav_type: 'section_nav',
        nav_target: id,
        nav_text: label,
      });
    }
    setExpanded(false);
  }, []);

  const activeSection = SECTIONS.find((s) => s.id === activeId);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-40 hidden md:block"
        >
          {/* Expanded panel */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="mb-3 w-56 overflow-hidden rounded-xl border border-[#061846]/10 bg-white p-2 shadow-xl shadow-[#061846]/10"
              >
                <div className="mb-1.5 px-2 pt-1">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#0874F9]">
                    Quick Navigation
                  </p>
                </div>
                <nav aria-label="Section quick navigation">
                  {SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollTo(section.id, section.label)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150 ${
                        activeId === section.id
                          ? 'bg-[#0874F9]/10 text-[#0874F9] font-medium'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-[#061846]'
                      }`}
                    >
                      <div
                        className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                          activeId === section.id ? 'bg-[#0874F9]' : 'bg-slate-300'
                        }`}
                      />
                      {section.label}
                    </button>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle button */}
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? 'Close section navigation' : 'Open section navigation'}
            aria-expanded={expanded}
            className={`flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2 ${
              expanded
                ? 'bg-[#061846] text-white'
                : 'bg-[#0874F9] text-white hover:bg-[#0660D4]'
            }`}
          >
            {expanded ? <X className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
          </button>

          {/* Active section indicator below button */}
          {!expanded && activeSection && (
            <motion.p
              key={activeSection.id}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-center text-[10px] font-medium text-[#061846]/60"
            >
              {activeSection.shortLabel}
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
