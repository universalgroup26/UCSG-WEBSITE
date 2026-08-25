'use client';

import { useRef, useEffect } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { track } from '@/lib/analytics';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function FinalAssessmentCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            track.sectionView('final_cta');
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAssessmentClick = () => {
    track.ctaClick({
      cta_type: 'assessment',
      cta_source: 'final_cta',
      cta_text: 'Start Free 60-Second Assessment',
    });
    window.dispatchEvent(
      new CustomEvent('ucsg-assessment', { detail: { open: 'assessment' } }),
    );
  };

  const handlePhoneClick = () => {
    track.ctaClick({
      cta_type: 'phone',
      cta_source: 'final_cta',
      cta_text: 'Talk With Our Team',
    });
  };

  return (
    <section
      id="final-cta"
      ref={sectionRef}
      aria-label="Final call to action"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#061846] to-[#092B68] py-16 sm:py-20 lg:py-24"
    >
      {/* Decorative orbit lines */}
      <div className="ucsg-orbit-lines pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Subtle glow effect */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0874F9]/[0.07] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <motion.p
          className="mb-3 text-sm font-medium uppercase tracking-widest text-[#D6A84B] sm:mb-4 sm:text-base"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          READY TO TAKE THE NEXT STEP?
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={1}
        >
          Your Educational Journey Deserves Clear Guidance
        </motion.h2>

        {/* Description */}
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:mt-6 sm:text-lg"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={2}
        >
          Whether you're exploring a university transfer, comparing graduate
          programs, or need help understanding your F-1 options, start with a
          free, no-obligation assessment.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row sm:gap-5"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={3}
        >
          {/* Primary CTA — Assessment Modal */}
          <button
            type="button"
            onClick={handleAssessmentClick}
            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#0874F9] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#0874F9]/25 transition-all duration-300 hover:bg-[#0660D4] hover:shadow-xl hover:shadow-[#0874F9]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061846] sm:w-auto sm:px-8"
          >
            Start Free 60-Second Assessment
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>

          {/* Secondary CTA — Phone */}
          <a
            href="tel:+13028935594"
            onClick={handlePhoneClick}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061846] sm:w-auto sm:px-8"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Talk With Our Team
          </a>
        </motion.div>

        {/* Availability note */}
        <motion.p
          className="mt-6 text-xs text-white/40 sm:mt-8 sm:text-sm"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={4}
        >
          Available by phone, WhatsApp, or email during business hours.
        </motion.p>
      </div>
    </section>
  );
}
