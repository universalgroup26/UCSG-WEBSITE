'use client';

import { motion } from 'framer-motion';
import {
  Microscope,
  Briefcase,
  Award,
  Clock,
  GraduationCap,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Compass,
  FileText,
  Users,
  Calendar,
  ScrollText,
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
    icon: Compass,
    title: 'Research vs. Applied',
    description:
      'A PhD prepares you to produce original research; a professional doctorate (EdD, DrPH, DNP) prepares you to apply research to practice. Choose based on the role you want next.',
    color: '#0874F9',
  },
  {
    icon: Clock,
    title: 'Time Commitment',
    description:
      'Doctoral programs typically take 3–7 years depending on discipline, format, and full-time vs. part-time enrollment. Know the realistic timeline before committing.',
    color: '#061846',
  },
  {
    icon: FileText,
    title: 'Admission Requirements',
    description:
      'Doctoral admission is competitive. Expect a master\'s (or strong bachelor\'s), writing sample, statement of research interest, recommendations, and often standardized tests.',
    color: '#D6A84B',
  },
  {
    icon: GraduationCap,
    title: 'Format & Residency',
    description:
      'Some programs require on-campus residency for coursework or qualifying exams. Online/hybrid doctoral programs exist but are discipline-specific.',
    color: '#0874F9',
  },
  {
    icon: Users,
    title: 'Faculty & Advisor Fit',
    description:
      'For research doctorates, your faculty advisor is the single most important relationship. Match your research interests to faculty before applying.',
    color: '#061846',
  },
  {
    icon: DollarSign,
    title: 'Funding & Cost',
    description:
      'Research PhDs often include tuition remission and a stipend; professional doctorates usually charge tuition. Map funding against your resources before applying.',
    color: '#D6A84B',
  },
];

const doctoralTypes = [
  {
    icon: Microscope,
    label: 'PhD (Doctor of Philosophy)',
    summary:
      'Research-focused. Produces original scholarship. Prepares for academic and research careers.',
    points: [
      'Original dissertation research',
      'Often funded with tuition remission + stipend',
      'Leads to academic / research / faculty roles',
      'Typical time-to-completion: 4–7 years',
    ],
    color: '#061846',
  },
  {
    icon: Briefcase,
    label: 'Professional Doctorate',
    summary:
      'Practice-focused. Applies research to a profession. Examples: EdD, DNP, DrPH, PsyD, OTD.',
    points: [
      'Capstone or applied project (not dissertation)',
      'Usually tuition-based (not funded)',
      'Leads to senior practitioner / leadership roles',
      'Typical time-to-completion: 3–5 years',
    ],
    color: '#0874F9',
  },
  {
    icon: Award,
    label: 'DBA (Doctor of Business Administration)',
    summary:
      'Applied research in business. Bridges scholarship and practice for senior leaders.',
    points: [
      'Applied research on real business problems',
      'Tuition-based; executive-format cohort common',
      'Leads to senior leadership / consulting / academic-adjunct roles',
      'Typical time-to-completion: 3–4 years',
    ],
    color: '#D6A84B',
  },
];

const doctoralSteps = [
  {
    step: 1,
    title: 'Define Your "Why"',
    description:
      'A doctorate is 3–7 years of focused work. Be specific about the role, research agenda, or career outcome you want — not just the title.',
  },
  {
    step: 2,
    title: 'Research vs. Applied',
    description:
      'Decide between a research PhD (produce original scholarship) or a professional doctorate (apply research to practice). The paths serve different outcomes.',
  },
  {
    step: 3,
    title: 'Identify Faculty & Programs',
    description:
      'For research doctorates, identify 5–10 faculty whose work aligns with your research interests. For professional doctorates, identify programs with strong applied track records.',
  },
  {
    step: 4,
    title: 'Audit Admission Requirements',
    description:
      'Most doctoral programs require a regionally accredited master\'s (some accept a strong bachelor\'s). Confirm prerequisites, test requirements, and writing samples.',
  },
  {
    step: 5,
    title: 'Map Funding & Cost',
    description:
      'Research PhDs may include tuition + stipend; professional doctorates are usually self-funded. Map total cost against your education resources before applying.',
  },
  {
    step: 6,
    title: 'Apply With a Research Statement',
    description:
      'We help organize applications, statements of research interest, writing samples, and recommendation timelines — without writing them for you.',
  },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function VeteranDoctoralPage({ onBack }: { onBack?: () => void }) {
  const handleExplore = () => {
    track.ctaClick({
      cta_type: 'assessment',
      cta_source: 'veteran_doctoral_explore',
      cta_text: 'Explore Doctoral Options',
    });
    window.dispatchEvent(
      new CustomEvent('ucsg-navigate', {
        detail: { view: 'veterans', id: 'program-comparison' },
      })
    );
  };

  return (
    <VeteranInfoPage
      pageId="doctoral"
      eyebrow="DOCTORAL DEGREE PATHS"
      headline={
        <>
          Doctoral &amp; Professional Degree Planning{' '}
          <span className="text-[#D6A84B]">for Veterans</span>
        </>
      }
      subheadline={
        <>
          A doctorate is the highest academic commitment you can make — 3 to 7 years of focused
          research or applied practice. The decision deserves a clear plan, not a leap.
        </>
      }
      ctaText="EXPLORE DOCTORAL OPTIONS"
      ctaHref="assessment"
      secondaryCtaText="TALK WITH A VETERAN EDUCATION ADVISOR"
      secondaryCtaHref="book-consultation"
      onBack={onBack}
    >
      {/* ─────────── Planning Factors ─────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="WHAT TO CONSIDER"
            title="Six Factors Before You Commit"
            description="A doctoral program is a multi-year, high-stakes commitment. These six factors deserve careful thought before any application."
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

      {/* ─────────── Doctoral Types ─────────── */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="KEY DECISION"
            title="PhD, Professional Doctorate, or DBA?"
            description="Three distinct paths with different outcomes. The right choice depends on whether you want to produce research or apply it to practice."
            badgeColor="#D6A84B"
          />

          <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3">
            {doctoralTypes.map((type, i) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.label}
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
                        style={{ backgroundColor: `${type.color}10` }}
                      >
                        <Icon className="h-6 w-6" style={{ color: type.color }} />
                      </div>
                      <h3 className="font-heading text-base font-bold text-[#0F172A]">
                        {type.label}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#6B7280]">{type.summary}</p>
                      <ul className="mt-4 space-y-2">
                        {type.points.map((point) => (
                          <li key={point} className="flex items-start gap-2">
                            <CheckCircle2
                              className="mt-0.5 h-4 w-4 shrink-0"
                              style={{ color: type.color }}
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

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-12 max-w-2xl text-center"
          >
            <p className="text-sm leading-relaxed text-[#6B7280]">
              <Calendar className="mr-1 inline h-4 w-4 text-[#D6A84B]" aria-hidden="true" />
              Time-to-completion figures are typical ranges. Actual time depends on program,
              discipline, enrollment intensity, and dissertation progress — never on a guarantee.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─────────── Doctoral Planning Steps ─────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="THE PROCESS"
            title="Doctoral Planning, Step-by-Step"
            description="A structured path from &quot;I&apos;m considering a doctorate&quot; to a confident application."
            badgeColor="#061846"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {doctoralSteps.map((step, i) => (
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

      {/* ─────────── Research vs Applied Callout ─────────── */}
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
                      <ScrollText className="h-6 w-6 text-[#D6A84B]" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-heading text-xl font-bold text-[#061846]">
                      The Application Is a Writing Sample
                    </h3>
                  </div>
                  <div className="lg:col-span-2">
                    <p className="text-sm leading-relaxed text-[#6B7280]">
                      Doctoral applications are evaluated on the strength of your statement of
                      research interest, writing sample, faculty fit, and prior academic record —
                      far more than test scores alone. UCSG helps you organize and strategize; we
                      do not write application essays on your behalf.
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
                      For research doctorates, your faculty advisor is the single most important
                      relationship. Identify faculty whose work aligns with yours before applying —
                      not after.
                    </p>
                    <div className="mt-5 rounded-lg bg-[#FFFBEB] p-4">
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#D6A84B]"
                          aria-hidden="true"
                        />
                        <p className="text-xs leading-relaxed text-[#92400E]">
                          Doctoral study has specific benefit-eligibility rules. Verify your
                          entitlement with the VA before enrolling — UCSG cannot determine doctoral
                          benefit coverage.
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
            Explore Doctoral &amp; Professional Paths
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#6B7280]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We help you compare doctoral programs, identify faculty fit, and plan a realistic
            application timeline — without writing essays for you.
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
              onClick={handleExplore}
              className="group flex items-center justify-center gap-2 rounded-lg bg-[#061846] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#092B68] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2 sm:px-7"
            >
              Explore Doctoral Options
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
