'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Users,
  Shield,
  Globe,
  HeartPulse,
  Search,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Trophy,
  Target,
  TrendingUp,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedHeading } from '@/components/animations/TextReveal';
import { track } from '@/lib/analytics';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const pillars = [
  {
    icon: Users,
    title: 'Student Empowerment',
    description:
      'Providing F-1 students with clear, honest, and actionable guidance for their U.S. education journey.',
    color: '#0874F9',
    bg: '#0874F910',
    border: '#0874F925',
  },
  {
    icon: Shield,
    title: 'Institutional Integrity',
    description:
      'Maintaining the highest ethical standards in educational consulting and student advocacy.',
    color: '#061846',
    bg: '#06184610',
    border: '#06184625',
  },
  {
    icon: Globe,
    title: 'Global Access',
    description:
      'Bridging the gap between international students and accredited U.S. higher education institutions.',
    color: '#D6A84B',
    bg: '#D6A84B10',
    border: '#D6A84B25',
  },
  {
    icon: HeartPulse,
    title: 'Holistic Support',
    description:
      'Supporting every aspect from university selection through graduation and career readiness.',
    color: '#059669',
    bg: '#05966910',
    border: '#05966925',
  },
];

const timelineSteps = [
  {
    icon: Search,
    label: 'Discovery',
    description: 'Understanding your goals, background, and immigration status',
    color: '#0874F9',
  },
  {
    icon: ClipboardCheck,
    label: 'Assessment',
    description: 'Evaluating academic records, eligibility, and program fit',
    color: '#D6A84B',
  },
  {
    icon: FileText,
    label: 'Application',
    description: 'Guiding you through applications, essays, and documentation',
    color: '#061846',
  },
  {
    icon: GraduationCap,
    label: 'Enrollment',
    description: 'Securing admission and ensuring smooth I-20 transfer process',
    color: '#059669',
  },
  {
    icon: Trophy,
    label: 'Success',
    description: 'Ongoing support through CPT, graduation, and career readiness',
    color: '#D6A84B',
  },
];

const impactMetrics = [
  { icon: Users, value: 5000, suffix: '+', label: 'Students Empowered', color: '#0874F9' },
  { icon: Target, value: 98, suffix: '%', label: 'Successful Placements', color: '#D6A84B' },
  { icon: Globe, value: 45, suffix: '+', label: 'Partner Institutions', color: '#061846' },
  { icon: TrendingUp, value: 10, suffix: '+', label: 'Years of Impact', color: '#059669' },
];

/* ------------------------------------------------------------------ */
/*  Animated Counter                                                   */
/* ------------------------------------------------------------------ */
function AnimatedCounter({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  const formatted = count >= 1000 ? count.toLocaleString() : count;

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */
interface MissionPageProps {
  onBack: () => void;
}

export default function MissionPage({ onBack }: MissionPageProps) {
  const metricsRef = useRef(null);
  const isMetricsInView = useInView(metricsRef, { once: true, margin: '-60px' });

  const handleAssessmentClick = () => {
    track.ctaClick({
      cta_type: 'assessment',
      cta_source: 'mission_page_cta',
      cta_text: 'Start Free 60-Second Assessment',
    });
    window.dispatchEvent(new CustomEvent('ucsg-assessment', { detail: { open: 'assessment' } }));
  };

  const handlePhoneClick = () => {
    track.ctaClick({
      cta_type: 'phone',
      cta_source: 'mission_page_cta',
      cta_text: 'Talk With Our Team',
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ──────────────────────────────── Back Bar ──────────────────────────────── */}
      <motion.div
        className="border-b border-gray-100 bg-gray-50/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#061846]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </div>
      </motion.div>

      {/* ──────────────────────────────── Hero Banner ──────────────────────────────── */}
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
              transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="h-px w-8 bg-[#D6A84B]/50" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6A84B]">
                Our Purpose
              </span>
              <div className="h-px w-8 bg-[#D6A84B]/50" />
            </motion.div>

            <motion.h1
              className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Empowering International Students{' '}
              <span className="text-[#D6A84B]">with Clarity and Confidence</span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              Every student deserves a clear path to their American education dream.
              Our mission is to be the trusted guide that turns complexity into confidence.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────── Mission Statement ──────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.blockquote
            className="relative mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute -left-4 top-0 text-6xl leading-none text-[#D6A84B]/20 sm:-left-8 sm:text-8xl">
              &ldquo;
            </div>
            <p className="font-heading text-xl font-medium leading-relaxed text-[#061846] sm:text-2xl lg:text-3xl">
              To empower every international student with the clarity, confidence, and
              comprehensive support they need to successfully navigate their U.S. education
              journey — from first inquiry to career launch.
            </p>
            <div className="absolute -bottom-8 right-0 text-6xl leading-none text-[#D6A84B]/20 sm:-bottom-4 sm:right-[-2rem] sm:text-8xl">
              &rdquo;
            </div>
          </motion.blockquote>
        </div>
      </section>

      {/* ──────────────────────────────── Core Mission Pillars ──────────────────────────────── */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="WHAT DRIVES US"
            title="Core Mission Pillars"
            description="Four foundational commitments that guide every decision we make and every student we serve."
            badgeColor="#061846"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                >
                  <Card
                    className="group h-full border-transparent bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
                    style={{ borderColor: pillar.border }}
                  >
                    <CardContent className="p-6">
                      <div
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ backgroundColor: pillar.bg }}
                      >
                        <Icon
                          className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
                          style={{ color: pillar.color }}
                        />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-[#0F172A]">{pillar.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{pillar.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────── Mission in Action Timeline ──────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="OUR PROCESS"
            title="Mission in Action"
            description="A step-by-step roadmap showing how we turn our mission into measurable student outcomes."
            badgeColor="#D6A84B"
          />

          <div className="relative mt-12 lg:mt-16">
            {/* Connecting line (desktop) */}
            <div className="absolute top-6 left-0 right-0 hidden h-0.5 bg-gradient-to-r from-[#0874F9] via-[#D6A84B] via-[#061846] via-[#059669] to-[#D6A84B] opacity-20 lg:block" aria-hidden="true" />

            <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
              {timelineSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.label}
                    className="relative flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Step circle */}
                    <div className="relative z-10 mb-4">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white shadow-md"
                        style={{ borderColor: step.color }}
                      >
                        <Icon className="h-5 w-5" style={{ color: step.color }} />
                      </div>
                      {/* Step number */}
                      <span
                        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                        style={{ backgroundColor: step.color }}
                      >
                        {i + 1}
                      </span>
                    </div>
                    {/* Arrow between steps (desktop) */}
                    {i < timelineSteps.length - 1 && (
                      <div className="absolute top-6 right-0 hidden translate-x-1/2 text-[#D6A84B]/40 lg:block" aria-hidden="true">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                    <h3 className="font-heading text-base font-bold text-[#0F172A]">{step.label}</h3>
                    <p className="mt-1.5 max-w-[200px] text-xs leading-relaxed text-[#6B7280] sm:text-sm">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────── Impact Metrics ──────────────────────────────── */}
      <section ref={metricsRef} className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="BY THE NUMBERS"
            title="Our Impact"
            description="Real results driven by our unwavering commitment to student success."
            badgeColor="#0874F9"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {impactMetrics.map((metric, i) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <div className="relative overflow-hidden rounded-2xl border border-transparent bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
                    {/* Top accent line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                      style={{ backgroundColor: metric.color }}
                    />
                    <div
                      className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${metric.color}10` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: metric.color }} />
                    </div>
                    <p className="font-heading text-3xl font-bold" style={{ color: metric.color }}>
                      <AnimatedCounter
                        target={metric.value}
                        suffix={metric.suffix}
                        isInView={isMetricsInView}
                      />
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#6B7280]">{metric.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────── CTA Section ──────────────────────────────── */}
      <section
        aria-label="Call to action"
        className="relative w-full overflow-hidden bg-gradient-to-b from-[#061846] to-[#092B68] py-16 sm:py-20 lg:py-24"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-[3] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0874F9]/[0.07] blur-3xl"
          aria-hidden="true"
        />
        <div className="ucsg-orbit-lines pointer-events-none absolute inset-0 z-[2]" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
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

          <motion.h2
            className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={1}
          >
            Let Us Guide Your Journey
          </motion.h2>

          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:mt-6 sm:text-lg"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={2}
          >
            Whether you&apos;re exploring a university transfer, comparing graduate programs,
            or need help understanding your F-1 options, start with a free, no-obligation assessment.
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
              onClick={handleAssessmentClick}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#0874F9] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#0874F9]/25 transition-all duration-300 hover:bg-[#0660D4] hover:shadow-xl hover:shadow-[#0874F9]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061846] sm:w-auto sm:px-8"
            >
              Start Free 60-Second Assessment
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </button>

            <a
              href="tel:+13028935594"
              onClick={handlePhoneClick}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061846] sm:w-auto sm:px-8"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Talk With Our Team
            </a>
          </motion.div>

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

      {/* ──────────────────────────────── Disclaimer ──────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-[#6B7280]">
          UCSG is not a law firm. We provide guidance and connect students with accredited institutions.
          For legal advice, please consult a licensed immigration attorney.
        </p>
      </section>
    </div>
  );
}
