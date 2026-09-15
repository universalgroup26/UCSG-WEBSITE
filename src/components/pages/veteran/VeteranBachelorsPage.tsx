'use client';

import { motion } from 'framer-motion';
import {
  GraduationCap,
  ClipboardList,
  Shield,
  Globe,
  Scale,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Building2,
  Calendar,
  Landmark,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedHeading } from '@/components/animations/TextReveal';
import { track } from '@/lib/analytics';
import VeteranInfoPage, { ComplianceDisclosure } from './VeteranInfoPage';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const considerations = [
  {
    icon: ClipboardList,
    title: 'Previous College Credits',
    description:
      'We help you request transcripts from every prior institution so a full credit inventory can be performed before any enrollment decision.',
    color: '#0874F9',
  },
  {
    icon: Shield,
    title: 'Military Learning Evaluation',
    description:
      'Your Joint Services Transcript (JST) and military training records may be reviewed by colleges that award prior learning credit. We help you request and organize these records.',
    color: '#061846',
  },
  {
    icon: GraduationCap,
    title: 'Degree-Completion Planning',
    description:
      'If you have prior college credit, we help you identify degree-completion pathways that may minimize redundant coursework while meeting residency requirements.',
    color: '#D6A84B',
  },
  {
    icon: Globe,
    title: 'Online / Hybrid / On-Campus',
    description:
      'Choose a format that fits your life — fully online, hybrid, or in-seat. Each format has different implications for benefits, residency, and engagement.',
    color: '#0874F9',
  },
  {
    icon: Scale,
    title: 'Program Comparison',
    description:
      'We compare degree requirements, transfer policies, and program outcomes across multiple accredited institutions so you can choose with confidence.',
    color: '#061846',
  },
  {
    icon: DollarSign,
    title: 'Cost Planning',
    description:
      'We help you map tuition, fees, and out-of-pocket costs against your available education resources — before any enrollment commitment.',
    color: '#D6A84B',
  },
];

const transferSteps = [
  {
    step: 1,
    title: 'Request All Prior Transcripts',
    description:
      'Contact every prior college, university, and Joint Services Transcript (JST) office. Request an official copy be sent to you and to any school you may apply to.',
  },
  {
    step: 2,
    title: 'Identify Degree-Completion Programs',
    description:
      'Look for regionally accredited institutions with explicit credit-transfer and degree-completion pathways for non-traditional and military-connected students.',
  },
  {
    step: 3,
    title: 'Request a Pre-Admission Credit Evaluation',
    description:
      'Many institutions offer a no-cost, no-obligation preliminary credit review. This is the single most valuable step before applying.',
  },
  {
    step: 4,
    title: 'Review Residency Requirements',
    description:
      'Every institution requires a minimum number of credits to be earned at that institution ("residency credits"). Know this number before you commit.',
  },
  {
    step: 5,
    title: 'Map Costs Against Your Resources',
    description:
      'Understand tuition per credit, fees, and the gap between total cost and your available education resources before signing an enrollment agreement.',
  },
  {
    step: 6,
    title: 'Apply With Confidence',
    description:
      'Once you know what transfers, what doesn\'t, what it costs, and how long it takes — you\'re ready to apply with a clear plan.',
  },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function VeteranBachelorsPage({ onBack }: { onBack?: () => void }) {
  const handleComparePrograms = () => {
    track.ctaClick({
      cta_type: 'assessment',
      cta_source: 'veteran_bachelors_compare_programs',
      cta_text: 'Compare Bachelor\'s Programs',
    });
    window.dispatchEvent(
      new CustomEvent('ucsg-navigate', {
        detail: { view: 'veterans', id: 'program-comparison' },
      })
    );
  };

  return (
    <VeteranInfoPage
      pageId="bachelors"
      eyebrow="BACHELOR'S DEGREE PATHS"
      headline={
        <>
          Bachelor&apos;s &amp; Degree Completion Options{' '}
          <span className="text-[#D6A84B]">for Veterans</span>
        </>
      }
      subheadline={
        <>
          You may already be closer to a bachelor&apos;s degree than you think. Prior college
          credits, military training, and on-the-job experience can sometimes shorten your path —
          but only a registrar makes the final call on what transfers.
        </>
      }
      ctaText="BUILD MY DEGREE COMPLETION PLAN"
      ctaHref="assessment"
      secondaryCtaText="TALK WITH A VETERAN EDUCATION ADVISOR"
      secondaryCtaHref="book-consultation"
      onBack={onBack}
    >
      {/* ─────────── Key Considerations ─────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="WHAT TO CONSIDER"
            title="Six Factors Before You Enroll"
            description="A bachelor's degree is a major commitment of time, money, and focus. These are the six factors we help you think through — before any application."
            badgeColor="#0874F9"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {considerations.map((item, i) => {
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

      {/* ─────────── Military Learning ─────────── */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <Badge className="mb-4 border-[#D6A84B]/30 bg-[#D6A84B]/10 text-[#D6A84B] hover:bg-[#D6A84B]/10">
                PRIOR LEARNING
              </Badge>
              <h2 className="font-heading text-3xl font-bold leading-tight text-[#061846] sm:text-4xl">
                Your Joint Services Transcript May Matter
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#6B7280]">
                The Joint Services Transcript (JST) is the official transcript for Army, Coast Guard,
                Marine Corps, and Navy personnel. It documents military training, occupations, and
                ACE-recommended college credit.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#6B7280]">
                Some colleges award credit for JST-validated learning and other prior learning
                assessments (CLEP, DSST, portfolio review). But credit award is always at the
                registrar&apos;s discretion — UCSG does not guarantee transfer credit.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  'Request your JST through the official JST portal (jst.doded.mil).',
                  'Review the American Council on Education (ACE) recommendations in your JST.',
                  'Ask each prospective school for its prior-learning-transfer policy in writing.',
                  'Confirm what counts toward your specific degree program — not just "total credits."',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0874F9]" />
                    <span className="text-sm leading-relaxed text-[#374151]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <Card className="h-full border-[#D6A84B]/20 bg-white shadow-sm">
                <CardContent className="p-6 sm:p-8">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#061846]">
                      <FileText className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-[#061846]">
                      Residency &amp; Transfer Limits
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#6B7280]">
                    Every regionally accredited college requires a minimum number of credits to be
                    earned at that institution (the &quot;residency requirement&quot;), typically
                    25–50% of the degree. Even with strong transfer credit, you will complete a
                    portion of your degree at your chosen school.
                  </p>
                  <div className="mt-5 rounded-lg bg-[#FFFBEB] p-4">
                    <div className="flex items-start gap-2.5">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#D6A84B]" aria-hidden="true" />
                      <p className="text-xs leading-relaxed text-[#92400E]">
                        UCSG never guarantees transfer credit. Final determinations are made by the
                        receiving institution&apos;s registrar — not by UCSG, and not by any
                        consultant.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────── Degree Completion Path ─────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="THE PROCESS"
            title="Degree Completion, Step-by-Step"
            description="A structured path from where you are now to a confident enrollment decision."
            badgeColor="#061846"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {transferSteps.map((step, i) => (
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

      {/* ─────────── Format Options ─────────── */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="CHOOSE YOUR FORMAT"
            title="Online, Hybrid, or On-Campus"
            description="Each format fits a different lifestyle. Each also has different implications for how your benefits apply — verify with the VA before deciding."
            badgeColor="#D6A84B"
          />

          <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3">
            {[
              {
                icon: Globe,
                title: 'Online',
                description:
                  'Maximum flexibility. Asynchronous coursework lets you study around work, family, or drill weekends. Requires self-discipline and reliable internet.',
                color: '#0874F9',
              },
              {
                icon: Building2,
                title: 'Hybrid',
                description:
                  'A blend of online and in-seat coursework. Good for programs where some in-person labs, studios, or clinicals are required.',
                color: '#061846',
              },
              {
                icon: Landmark,
                title: 'On-Campus',
                description:
                  'Traditional in-seat learning. Offers the strongest cohort and network, but requires geographic relocation or commute.',
                color: '#D6A84B',
              },
            ].map((item, i) => {
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

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-12 max-w-2xl text-center"
          >
            <p className="text-sm leading-relaxed text-[#6B7280]">
              <Calendar className="mr-1 inline h-4 w-4 text-[#D6A84B]" aria-hidden="true" />
              Benefits can be affected by program format, enrollment intensity, and your specific
              eligibility. Always verify your benefit status with the VA before enrollment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─────────── Mini CTA: Compare Programs ─────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h2
            className="font-heading text-2xl font-bold text-[#061846] sm:text-3xl lg:text-4xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Ready to Compare Bachelor&apos;s Programs?
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#6B7280]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We help you compare degree requirements, transfer policies, and costs across multiple
            accredited institutions — then map out a degree-completion plan that fits your goals.
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
              Compare Bachelor&apos;s Programs
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
