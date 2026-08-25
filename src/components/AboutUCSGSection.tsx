'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Star,
  Phone,
  UserCheck,
  Shield,
  Eye,
  Heart,
  ArrowRight,
} from 'lucide-react';
import { track } from '@/lib/analytics';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const valueChips = [
  { icon: UserCheck, label: 'Service' },
  { icon: Shield, label: 'Integrity' },
  { icon: Eye, label: 'Clarity' },
  { icon: Heart, label: 'Student-First Support' },
];

/* ------------------------------------------------------------------ */
/*  Veteran Badge component                                            */
/* ------------------------------------------------------------------ */
function VeteranBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-[#D6A84B] px-3 py-1 text-xs font-semibold text-[#061846] ${className}`}
    >
      <Star className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true" />
      U.S. Army Veteran
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export default function AboutUCSGSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Section view tracking */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track.sectionView('founder_about');
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about-ucsg"
      ref={sectionRef}
      aria-label="Founder Message and About UCSG"
      className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-28"
    >
      {/* Subtle background pattern — very faint navy watermark */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 80% 20%, #061846 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Decorative blue swoosh/curve behind the image area */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-1/2"
        aria-hidden="true"
      >
        <svg
          className="absolute right-0 top-0 h-full w-full text-[#0874F9]/[0.04]"
          viewBox="0 0 600 800"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M600 0 C400 100 350 300 380 500 C410 700 500 800 600 800 Z" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* ============ LEFT: Text Content ============ */}
          <div className="flex flex-col gap-5 lg:gap-6">
            {/* Veteran badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
            >
              <VeteranBadge />
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="font-heading text-2xl font-bold leading-tight tracking-tight text-[#061846] sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15]"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
            >
              Service, Integrity and{' '}
              <span className="text-[#0874F9]">Student-First</span>{' '}
              Guidance
            </motion.h2>

            {/* Gold accent line */}
            <motion.div
              className="h-1 w-16 rounded-full bg-[#D6A84B]"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Quote / Founder message */}
            <motion.blockquote
              className="relative border-l-2 border-[#0874F9]/30 pl-5"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={2}
            >
              <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                &ldquo;When I served in the United States Army, I learned that
                leadership begins with responsibility, discipline and standing
                beside the people who depend on you. I built UCSG on those same
                values. Every student deserves clear information, honest guidance
                and a team that respects the importance of their educational
                journey.&rdquo;
              </p>
              <footer className="mt-4 flex flex-col gap-1">
                <p className="text-base font-bold text-[#061846]">
                  Joy Chowdhury
                </p>
                <p className="text-sm font-medium text-slate-500">
                  Founder and CEO, UCSG
                </p>
              </footer>
            </motion.blockquote>

            {/* About UCSG description */}
            <motion.p
              className="text-base leading-relaxed text-slate-500"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={3}
            >
              Based in Jackson Heights, New York, UCSG provides educational
              guidance, program research, application coordination and student
              support for F-1 students exploring university transfers and
              graduate-program options in the United States.
            </motion.p>

            {/* Value chips */}
            <motion.div
              className="flex flex-wrap gap-2.5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {valueChips.map((chip, i) => {
                const Icon = chip.icon;
                return (
                  <motion.span
                    key={chip.label}
                    className="inline-flex items-center gap-2 rounded-full border border-[#061846]/10 bg-[#EDF5FF] px-4 py-2 text-sm font-medium text-[#061846]"
                    variants={fadeUp}
                    custom={4 + i * 0.08}
                  >
                    <Icon
                      className="h-4 w-4 text-[#0874F9]"
                      aria-hidden="true"
                    />
                    {chip.label}
                  </motion.span>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="mt-2 flex flex-wrap gap-3"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={5}
            >
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-[#0874F9] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#0874F9]/20 transition-all duration-200 hover:bg-[#0660D4] hover:shadow-lg hover:shadow-[#0874F9]/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0874F9]"
                onClick={() => {
                  track.ctaClick({ cta_type: 'assessment', cta_source: 'founder_section', cta_text: 'Start Free Assessment' });
                  window.dispatchEvent(
                    new CustomEvent('ucsg-assessment', {
                      detail: { open: 'assessment' },
                    }),
                  );
                }}
              >
                Start Free Assessment
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <a
                href="tel:+13028935594"
                className="inline-flex items-center gap-2 rounded-lg border border-[#061846]/15 bg-transparent px-6 py-3 text-sm font-semibold text-[#061846] transition-all duration-200 hover:border-[#061846]/30 hover:bg-[#EDF5FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#061846]"
                onClick={() => track.ctaClick({ cta_type: 'call', cta_source: 'founder_section', cta_text: 'Talk With Our Team' })}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Talk With Our Team
              </a>
            </motion.div>

            {/* Disclaimer */}
            <motion.p
              className="mt-4 max-w-lg text-[11px] leading-snug text-slate-400"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={6}
            >
              UCSG is not a law firm and does not provide legal advice. For
              immigration-related decisions, students should consult with a
              qualified immigration attorney.
            </motion.p>
          </div>

          {/* ============ RIGHT: Founder Portrait ============ */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="relative">
              {/* Main portrait - Full Size */}
              <div
                className="relative w-full overflow-hidden rounded-2xl"
                style={{
                  boxShadow:
                    '0 20px 60px -12px rgba(6, 24, 70, 0.15), 0 8px 24px -8px rgba(6, 24, 70, 0.1)',
                }}
              >
                <Image
                  src="/images/founder-full.png"
                  alt="Joy Chowdhury, Founder and CEO of UCSG"
                  width={1672}
                  height={941}
                  className="h-auto w-full object-contain"
                  sizes="(max-width: 1024px) 90vw, 50vw"
                  priority
                />
              </div>

              {/* Decorative accent bar behind portrait */}
              <div
                className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-2xl bg-[#0874F9]/10"
                aria-hidden="true"
              />

              {/* Gold corner accent */}
              <div
                className="absolute -top-2 -left-2 h-16 w-16 rounded-tl-2xl border-l-2 border-t-2 border-[#D6A84B]"
                aria-hidden="true"
              />

              {/* Floating veteran badge on portrait */}
              <motion.div
                className="absolute bottom-5 right-5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <VeteranBadge />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
