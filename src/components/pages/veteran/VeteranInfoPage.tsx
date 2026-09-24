'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Phone, Shield } from 'lucide-react';
import { track } from '@/lib/analytics';

/* ------------------------------------------------------------------ */
/*  Shared compliance disclosure — must appear on every veteran page  */
/* ------------------------------------------------------------------ */

export const VETERAN_COMPLIANCE_DISCLOSURE =
  'Universal Consulting Service Group (UCSG) is an independent education consulting organization. ' +
  'UCSG is not affiliated with, endorsed by, or sponsored by the U.S. Department of Veterans Affairs (VA), ' +
  'the U.S. Department of Defense (DoD), or any branch of the U.S. Armed Forces. ' +
  'References to VA education benefits, the Post-9/11 GI Bill®, the Yellow Ribbon Program, and Veterans Readiness & Employment (VR&E) ' +
  'are for informational purposes only. The VA determines all benefit eligibility, entitlement, and payment decisions. ' +
  'UCSG does not determine, guarantee, or administer veterans education benefits of any kind. ' +
  'Use of "GI Bill®" is a registered trademark of the U.S. Department of Veterans Affairs; UCSG makes no claim of affiliation.';

export function ComplianceDisclosure({ className = '' }: { className?: string }) {
  return (
    <section className={`mx-auto max-w-4xl px-4 pb-14 sm:px-6 lg:px-8 ${className}`}>
      <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-2 text-[#061846]">
          <Shield className="h-4 w-4" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em]">Compliance &amp; Disclosure</span>
        </div>
        <p className="text-xs leading-relaxed text-[#6B7280]">{VETERAN_COMPLIANCE_DISCLOSURE}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared animation helper                                           */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ------------------------------------------------------------------ */
/*  VeteranInfoPage — shared hero + body + CTA + disclosure layout    */
/* ------------------------------------------------------------------ */

export interface VeteranInfoPageProps {
  /** Eyebrow text (small uppercase label above H1) */
  eyebrow: string;
  /** Main H1 headline (supports React node for accent color) */
  headline: React.ReactNode;
  /** Subheadline paragraph below H1 */
  subheadline?: React.ReactNode;
  /** Optional badge shown next to eyebrow (e.g., "FOR VETERANS") */
  heroBadge?: string;
  /** Body content for the page */
  children?: React.ReactNode;
  /** CTA button text */
  ctaText?: string;
  /** Where the CTA should navigate (default: opens veteran assessment) */
  ctaHref?: string;
  /** Optional secondary CTA label */
  secondaryCtaText?: string;
  /** Secondary CTA destination */
  secondaryCtaHref?: 'book-consultation' | 'contact' | 'home';
  /** Back button target. Defaults to /veterans hub. */
  onBack?: () => void;
  /** Optional page id for analytics */
  pageId?: string;
}

export default function VeteranInfoPage({
  eyebrow,
  headline,
  subheadline,
  heroBadge = 'FOR VETERANS & MILITARY-CONNECTED STUDENTS',
  children,
  ctaText = 'START MY VETERAN DEGREE ASSESSMENT',
  ctaHref = 'assessment',
  secondaryCtaText = 'TALK WITH A VETERAN EDUCATION ADVISOR',
  secondaryCtaHref = 'book-consultation',
  onBack,
  pageId,
}: VeteranInfoPageProps) {
  const handleBack = () => {
    if (onBack) return onBack();
    window.dispatchEvent(
      new CustomEvent('ucsg-navigate', { detail: { view: 'veterans' } })
    );
  };

  const handlePrimaryCta = () => {
    track.ctaClick({
      cta_type: 'assessment',
      cta_source: pageId ? `veteran_${pageId}_cta` : 'veteran_info_cta',
      cta_text: ctaText,
    });
    if (ctaHref === 'assessment') {
      window.dispatchEvent(
        new CustomEvent('ucsg-navigate', {
          detail: { view: 'veterans', id: 'assessment' },
        })
      );
    } else if (ctaHref === 'book-consultation') {
      window.dispatchEvent(
        new CustomEvent('ucsg-navigate', {
          detail: { view: 'veterans', id: 'book-consultation' },
        })
      );
    } else {
      window.dispatchEvent(
        new CustomEvent('ucsg-navigate', { detail: { view: 'contact' } })
      );
    }
  };

  const handleSecondaryCta = () => {
    track.ctaClick({
      cta_type: 'contact',
      cta_source: pageId ? `veteran_${pageId}_secondary_cta` : 'veteran_info_secondary_cta',
      cta_text: secondaryCtaText,
    });
    if (secondaryCtaHref === 'book-consultation') {
      window.dispatchEvent(
        new CustomEvent('ucsg-navigate', {
          detail: { view: 'veterans', id: 'book-consultation' },
        })
      );
    } else if (secondaryCtaHref === 'home') {
      window.dispatchEvent(
        new CustomEvent('ucsg-navigate', { detail: { view: 'home' } })
      );
    } else {
      window.dispatchEvent(
        new CustomEvent('ucsg-navigate', { detail: { view: 'contact' } })
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ─────────── Back Bar ─────────── */}
      <motion.div
        className="border-b border-gray-100 bg-gray-50/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#061846]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Veterans Hub
          </button>
        </div>
      </motion.div>

      {/* ─────────── Hero ─────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#061846] via-[#092B68] to-[#061846]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#D6A84B]/[0.08] blur-[100px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              className="mb-6 flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <div className="h-px w-8 bg-[#D6A84B]/50" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#D6A84B]">
                {heroBadge}
              </span>
              <div className="h-px w-8 bg-[#D6A84B]/50" />
            </motion.div>

            <motion.span
              className="mb-3 inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/60"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              {eyebrow}
            </motion.span>

            <motion.h1
              className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            >
              {headline}
            </motion.h1>

            {subheadline && (
              <motion.p
                className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                {subheadline}
              </motion.p>
            )}
          </div>
        </div>
      </section>

      {/* ─────────── Body content ─────────── */}
      <main className="pb-8">{children}</main>

      {/* ─────────── CTA Section ─────────── */}
      <section
        aria-label="Call to action"
        className="relative w-full overflow-hidden bg-gradient-to-b from-[#061846] to-[#092B68] py-16 sm:py-20 lg:py-24"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-[3] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0874F9]/[0.07] blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.p
            className="mb-3 text-sm font-medium uppercase tracking-widest text-[#D6A84B] sm:mb-4 sm:text-base"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
          >
            YOUR NEXT MISSION STARTS HERE
          </motion.p>

          <motion.h2
            className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={1}
          >
            Your Service Was One Chapter.
            <br className="hidden sm:block" /> Let&apos;s Plan What Comes Next.
          </motion.h2>

          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:mt-6 sm:text-lg"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={2}
          >
            Start with a no-pressure assessment of your goals, prior learning, and the
            degree paths that may fit your next chapter.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row sm:gap-5"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={3}
          >
            <button
              type="button"
              onClick={handlePrimaryCta}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#0874F9] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#0874F9]/25 transition-all duration-300 hover:bg-[#0660D4] hover:shadow-xl hover:shadow-[#0874F9]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061846] sm:w-auto sm:px-8"
            >
              {ctaText}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={handleSecondaryCta}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061846] sm:w-auto sm:px-8"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {secondaryCtaText}
            </button>
          </motion.div>

          <motion.p
            className="mt-6 text-xs text-white/40 sm:mt-8 sm:text-sm"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={4}
          >
            No enrollment commitment required.
          </motion.p>
        </div>
      </section>

      <ComplianceDisclosure />
    </div>
  );
}
