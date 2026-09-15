'use client';

import { motion } from 'framer-motion';
import {
  Target,
  ClipboardCheck,
  Scale,
  Clock,
  DollarSign,
  BadgeCheck,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Compass,
  AlertTriangle,
  Calendar,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedHeading } from '@/components/animations/TextReveal';
import { track } from '@/lib/analytics';
import VeteranInfoPage, { ComplianceDisclosure } from './VeteranInfoPage';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const planningFactors = [
  {
    icon: Target,
    title: 'Career Goals First',
    description:
      'A graduate degree is an investment in a specific career outcome. We help you articulate what you want to do next — then evaluate whether a master\'s or MBA is the right path.',
    color: '#0874F9',
  },
  {
    icon: ClipboardCheck,
    title: 'Graduate Admission',
    description:
      'Admission to master\'s-level programs typically requires a regionally accredited bachelor\'s, statement of purpose, resume, recommendations, and sometimes standardized test scores.',
    color: '#061846',
  },
  {
    icon: Scale,
    title: 'MBA vs. Specialized Master\'s',
    description:
      'An MBA offers broad leadership training; a specialized master\'s (MS in Finance, MS in Data Analytics, etc.) goes deeper in one field. We help you choose based on career goals.',
    color: '#D6A84B',
  },
  {
    icon: Compass,
    title: 'Format & Schedule',
    description:
      'Full-time, part-time, online, hybrid, executive — graduate programs come in many shapes. Choose one that fits your work, family, and benefit-eligibility situation.',
    color: '#0874F9',
  },
  {
    icon: Clock,
    title: 'Time to Completion',
    description:
      'Most master\'s degrees take 1–2 years full-time, 2–4 years part-time. Time-to-completion affects total cost and benefit usage — know the timeline before enrolling.',
    color: '#061846',
  },
  {
    icon: DollarSign,
    title: 'Cost Planning',
    description:
      'Map tuition, fees, and books against your available resources. Graduate tuition varies widely between public, private, and executive programs.',
    color: '#D6A84B',
  },
];

const mbaVsSpecialized = [
  {
    label: 'MBA',
    points: [
      'Broad management and leadership curriculum',
      'Cohort-based learning with peer networking',
      'Often requires 2–5 years of work experience',
      'Strong for generalist leadership paths',
    ],
    color: '#061846',
  },
  {
    label: 'Specialized Master\'s',
    points: [
      'Deep technical focus in one discipline',
      'May not require work experience',
      'Often shorter (1 year) than an MBA',
      'Strong for early-career or technical pivots',
    ],
    color: '#0874F9',
  },
];

const gradSteps = [
  {
    step: 1,
    title: 'Clarify Your Career Outcome',
    description:
      'A graduate degree is a means to an end. Define the role, industry, or function you\'re targeting — then evaluate programs that lead there.',
  },
  {
    step: 2,
    title: 'Audit Your Undergraduate Record',
    description:
      'Most programs require a regionally accredited bachelor\'s. Some require a minimum GPA, prerequisite coursework, or specific undergraduate preparation.',
  },
  {
    step: 3,
    title: 'Choose MBA vs. Specialized Master\'s',
    description:
      'We compare curriculum, cohort, format, and outcomes across MBA and specialized programs so you can choose the path that fits your goals.',
  },
  {
    step: 4,
    title: 'Compare Programs & Formats',
    description:
      'Full-time, part-time, online, hybrid, executive — each format fits a different life. We compare accredited programs side-by-side.',
  },
  {
    step: 5,
    title: 'Verify Benefit Eligibility',
    description:
      'Graduate-level study has different benefit rules. Verify your entitlement directly with the VA before enrollment — UCSG cannot determine benefits.',
  },
  {
    step: 6,
    title: 'Apply & Plan Enrollment',
    description:
      'Once you\'ve selected target programs, we help organize applications, statements of purpose, transcripts, and recommendation timelines.',
  },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function VeteranMastersPage({ onBack }: { onBack?: () => void }) {
  const handleComparePrograms = () => {
    track.ctaClick({
      cta_type: 'assessment',
      cta_source: 'veteran_masters_compare',
      cta_text: 'Compare Graduate Programs',
    });
    window.dispatchEvent(
      new CustomEvent('ucsg-navigate', {
        detail: { view: 'veterans', id: 'program-comparison' },
      })
    );
  };

  return (
    <VeteranInfoPage
      pageId="masters"
      eyebrow="GRADUATE DEGREE PATHS"
      headline={
        <>
          Master&apos;s &amp; MBA Degree Planning{' '}
          <span className="text-[#D6A84B]">for Veterans</span>
        </>
      }
      subheadline={
        <>
          A graduate degree can sharpen your leadership, deepen your technical skill, or open a new
          career lane. The right program depends on the outcome you want — not just the credential
          itself.
        </>
      }
      ctaText="COMPARE GRADUATE PROGRAMS"
      ctaHref="assessment"
      secondaryCtaText="TALK WITH A VETERAN EDUCATION ADVISOR"
      secondaryCtaHref="book-consultation"
      onBack={onBack}
    >
      {/* ─────────── Planning Factors ─────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="WHAT TO THINK THROUGH"
            title="Six Factors Before You Apply"
            description="A master's or MBA is a major investment. These are the six factors we help you think through before you submit an application."
            badgeColor="#0874F9"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {planningFactors.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="group h-full border-transparent bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${item.color}10` }}
                      >
                        <Icon
                          className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
                          style={{ color: item.color }}
                        />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-[#0F172A]">{item.title}</h3>
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

      {/* ─────────── MBA vs Specialized ─────────── */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="KEY DECISION"
            title="MBA or Specialized Master's?"
            description="These two paths serve different career outcomes. The right choice depends on whether you want broad leadership training or deep technical specialization."
            badgeColor="#D6A84B"
          />

          <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2">
            {mbaVsSpecialized.map((track_item, i) => (
              <motion.div
                key={track_item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <Card className="h-full border-transparent bg-white shadow-sm">
                  <CardContent className="p-6 sm:p-8">
                    <div className="mb-5 flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${track_item.color}10` }}
                      >
                        <GraduationCap
                          className="h-5 w-5"
                          style={{ color: track_item.color }}
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-[#0F172A]">
                        {track_item.label}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {track_item.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <CheckCircle2
                            className="mt-0.5 h-5 w-5 shrink-0"
                            style={{ color: track_item.color }}
                          />
                          <span className="text-sm leading-relaxed text-[#374151]">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-12 max-w-2xl text-center"
          >
            <p className="text-sm leading-relaxed text-[#6B7280]">
              <Calendar className="mr-1 inline h-4 w-4 text-[#D6A84B]" aria-hidden="true" />
              Some specialized master&apos;s programs accept students directly from undergraduate
              study. Most MBA programs prefer 2–5 years of professional experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─────────── Graduate Planning Steps ─────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="THE PROCESS"
            title="Graduate Planning, Step-by-Step"
            description="A clear path from &quot;I want a master&apos;s&quot; to a confident application decision."
            badgeColor="#061846"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {gradSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#0874F9]/30 hover:shadow-md">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0874F9] text-xs font-bold text-white">
                      {step.step}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                      Step {step.step}
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-bold text-[#061846]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Benefit Verification Callout ─────────── */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <Card className="border-[#D6A84B]/20 bg-white shadow-sm">
              <CardContent className="p-6 sm:p-10">
                <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                  <div className="lg:col-span-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D6A84B]/10">
                      <BadgeCheck className="h-6 w-6 text-[#D6A84B]" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-heading text-xl font-bold text-[#061846]">
                      Verify Your Benefit Eligibility
                    </h3>
                  </div>
                  <div className="lg:col-span-2">
                    <p className="text-sm leading-relaxed text-[#6B7280]">
                      Graduate-level education has different rules for benefit usage than
                      undergraduate study. Some benefit categories have annual or lifetime caps,
                      monthly-while-in-school requirements, or specific program-eligibility
                      restrictions.
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
                      Always verify your entitlement directly with the U.S. Department of Veterans
                      Affairs before enrolling. UCSG cannot determine, estimate, or guarantee
                      benefit eligibility, entitlement amounts, or coverage for any program.
                    </p>
                    <div className="mt-5 rounded-lg bg-[#FFFBEB] p-4">
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#D6A84B]"
                          aria-hidden="true"
                        />
                        <p className="text-xs leading-relaxed text-[#92400E]">
                          Benefit eligibility is determined solely by the VA. Verify your status
                          through the VA&apos;s eBenefits portal or by calling 1-888-442-4551.
                        </p>
                      </div>
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
            Compare Graduate Programs Side-by-Side
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#6B7280]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We help you compare MBA and specialized master&apos;s programs across cost, format,
            time-to-completion, and career outcomes — then map a path forward.
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
              onClick={handleComparePrograms}
              className="group flex items-center justify-center gap-2 rounded-lg bg-[#061846] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#092B68] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2 sm:px-7"
            >
              <Briefcase className="h-4 w-4" aria-hidden="true" />
              Compare Graduate Programs
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
