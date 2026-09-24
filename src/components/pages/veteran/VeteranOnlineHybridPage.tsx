'use client';

import { motion } from 'framer-motion';
import {
  Globe,
  Layers,
  Building2,
  Clock,
  Wifi,
  Users,
  Briefcase,
  ArrowRight,
  AlertTriangle,
  Calendar,
  GraduationCap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedHeading } from '@/components/animations/TextReveal';
import { track } from '@/lib/analytics';
import VeteranInfoPage, { ComplianceDisclosure } from './VeteranInfoPage';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const formats = [
  {
    icon: Globe,
    title: 'Fully Online',
    summary: 'Asynchronous coursework. Maximum flexibility around work, family, or drill.',
    considerations: [
      'Study anytime — no scheduled class meetings',
      'Requires strong self-discipline and reliable internet',
      'Often the lowest-cost option',
      'Limited in-person networking',
    ],
    color: '#0874F9',
  },
  {
    icon: Layers,
    title: 'Hybrid',
    summary: 'A blend of online and in-seat. Good for programs with labs, clinicals, or studios.',
    considerations: [
      'Some courses online, some in-seat',
      'Requires geographic proximity to campus',
      'Stronger cohort connection than fully online',
      'Mid-range cost',
    ],
    color: '#061846',
  },
  {
    icon: Building2,
    title: 'On-Campus',
    summary: 'Traditional in-seat learning. Strongest cohort, network, and access to faculty.',
    considerations: [
      'Scheduled class meetings on campus',
      'Requires relocation or commute',
      'Strongest peer network and campus resources',
      'Often highest cost (tuition + relocation)',
    ],
    color: '#D6A84B',
  },
];

const syncAsync = [
  {
    icon: Wifi,
    title: 'Asynchronous',
    description:
      'No required meeting times. You complete weekly work on your own schedule. Maximum flexibility — but requires the most self-motivation.',
    color: '#0874F9',
  },
  {
    icon: Clock,
    title: 'Synchronous',
    description:
      'Scheduled real-time virtual class meetings. Combines the structure of a traditional class with online convenience.',
    color: '#061846',
  },
  {
    icon: Users,
    title: 'Cohort-Based',
    description:
      'A group progresses through the program together. Strongest peer network and accountability, with the least flexibility.',
    color: '#D6A84B',
  },
];

const workingPro = [
  {
    icon: Briefcase,
    title: 'Working-Professional Format',
    description:
      'Designed for full-time employed adults. Evening / weekend / modular sessions. Tuition often higher per credit, but spread across 2–4 years.',
    color: '#0874F9',
  },
  {
    icon: Clock,
    title: 'Part-Time Enrollment',
    description:
      'Take 1–2 courses per term. Slower completion but more affordable per term. May affect benefit eligibility depending on enrollment intensity.',
    color: '#061846',
  },
  {
    icon: GraduationCap,
    title: 'Full-Time Enrollment',
    description:
      'Maximum course load. Fastest completion, often required for institutional scholarships and assistantships. Demands the most weekly time.',
    color: '#D6A84B',
  },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function VeteranOnlineHybridPage({ onBack }: { onBack?: () => void }) {
  const handleCompareFlexible = () => {
    track.ctaClick({
      cta_type: 'assessment',
      cta_source: 'veteran_online_hybrid_compare',
      cta_text: 'Compare Flexible Programs',
    });
    window.dispatchEvent(
      new CustomEvent('ucsg-navigate', {
        detail: { view: 'veterans', id: 'program-comparison' },
      })
    );
  };

  return (
    <VeteranInfoPage
      pageId="online-hybrid"
      eyebrow="FLEXIBLE DEGREE PATHS"
      headline={
        <>
          Flexible Degree Options <span className="text-[#D6A84B]">for Veterans</span>
        </>
      }
      subheadline={
        <>
          The right format depends on your work, family, location, and benefit-eligibility
          situation. Online, hybrid, and on-campus programs each fit a different life — there is no
          single &quot;best&quot; choice.
        </>
      }
      ctaText="COMPARE FLEXIBLE PROGRAMS"
      ctaHref="assessment"
      secondaryCtaText="TALK WITH A VETERAN EDUCATION ADVISOR"
      secondaryCtaHref="book-consultation"
      onBack={onBack}
    >
      {/* ─────────── Format Comparison ─────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="THREE CORE FORMATS"
            title="Online, Hybrid, or On-Campus"
            description="Each format serves a different lifestyle and produces a different student experience. Choose based on how you actually live and work."
            badgeColor="#0874F9"
          />

          <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3">
            {formats.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="h-full border-transparent bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${item.color}10` }}
                      >
                        <Icon className="h-6 w-6" style={{ color: item.color }} />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-[#0F172A]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{item.summary}</p>
                      <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                        {item.considerations.map((point) => (
                          <li key={point} className="flex items-start gap-2">
                            <span
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-xs leading-relaxed text-[#374151]">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────── Async vs Sync ─────────── */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="ONLINE PROGRAM TYPES"
            title="Asynchronous, Synchronous, or Cohort?"
            description="Online programs come in different structures. Each requires a different kind of discipline and produces a different peer community."
            badgeColor="#D6A84B"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {syncAsync.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="h-full border-transparent bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${item.color}10` }}
                      >
                        <Icon className="h-6 w-6" style={{ color: item.color }} />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-[#0F172A]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────── Working Professional ─────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="FOR WORKING ADULTS"
            title="Working-Professional & Part-Time Options"
            description="If you're juggling work, family, or drill weekends, these formats are designed for you. Each has trade-offs in time-to-completion and benefit-eligibility."
            badgeColor="#061846"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {workingPro.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="h-full border-transparent bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${item.color}10` }}
                      >
                        <Icon className="h-6 w-6" style={{ color: item.color }} />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-[#0F172A]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────── Benefit Implications Callout ─────────── */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <Card className="border-[#D6A84B]/30 bg-white shadow-sm">
              <CardContent className="p-6 sm:p-10">
                <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                  <div className="lg:col-span-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D6A84B]/10">
                      <AlertTriangle className="h-6 w-6 text-[#D6A84B]" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-heading text-xl font-bold text-[#061846]">
                      Benefits &amp; Format Are Linked
                    </h3>
                  </div>
                  <div className="lg:col-span-2">
                    <p className="text-sm leading-relaxed text-[#6B7280]">
                      Benefits can be affected by program format and enrollment circumstances —
                      including enrollment intensity (full-time vs. part-time), modality (online vs.
                      in-seat), program length, and your specific eligibility category.
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
                      UCSG cannot determine how your benefits apply to a specific program or format.
                      Always verify your coverage with the U.S. Department of Veterans Affairs before
                      enrolling.
                    </p>
                    <div className="mt-5 rounded-lg bg-[#FFFBEB] p-4">
                      <p className="text-xs leading-relaxed text-[#92400E]">
                        <Calendar className="mr-1 inline h-4 w-4" aria-hidden="true" />
                        Verify your benefit status directly with the VA at{' '}
                        <a
                          href="https://www.va.gov/education"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium underline hover:text-[#D6A84B]"
                          onClick={() =>
                            track.externalLink('https://www.va.gov/education', 'VA Education Benefits')
                          }
                        >
                          va.gov/education
                        </a>{' '}
                        or by calling 1-888-442-4551.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ─────────── Mini CTA ─────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h2
            className="font-heading text-2xl font-bold text-[#061846] sm:text-3xl lg:text-4xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Compare Flexible Programs Side-by-Side
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#6B7280]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We help you compare accredited online, hybrid, and on-campus programs across format,
            cost, time-to-completion, and transfer policy — then match them to your goals.
          </motion.p>
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              type="button"
              onClick={handleCompareFlexible}
              className="group flex items-center justify-center gap-2 rounded-lg bg-[#061846] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#092B68] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2 sm:px-7"
            >
              Compare Flexible Programs
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </motion.div>
        </div>
      </section>

      <ComplianceDisclosure className="-mt-8" />
    </VeteranInfoPage>
  );
}
