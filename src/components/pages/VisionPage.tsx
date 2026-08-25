'use client';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Globe,
  Cpu,
  Users,
  Sparkles,
  CheckCircle2,
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
const futurePillars = [
  {
    icon: Globe,
    title: 'Expanding Access',
    description:
      'Growing our network to 100+ partner institutions across all 50 U.S. states, ensuring every student finds the perfect fit regardless of location.',
    color: '#0874F9',
    bg: '#0874F910',
  },
  {
    icon: Cpu,
    title: 'Technology-Driven Guidance',
    description:
      'AI-powered matching and real-time immigration compliance monitoring to deliver faster, smarter, and more personalized student guidance.',
    color: '#D6A84B',
    bg: '#D6A84B10',
  },
  {
    icon: Users,
    title: 'Community Building',
    description:
      'Creating a global alumni network connecting 50,000+ UCSG-supported professionals who mentor and uplift the next generation.',
    color: '#059669',
    bg: '#05966910',
  },
];

const roadmapItems = [
  {
    year: '2024',
    title: 'Foundation Strengthening',
    items: ['45+ active university partners', 'Streamlined F-1 transfer process', 'Launch of digital assessment tools'],
    color: '#061846',
    active: true,
  },
  {
    year: '2025',
    title: 'Technology Integration',
    items: ['AI-powered university matching', 'Real-time SEVIS compliance dashboard', 'Student portal 2.0 release'],
    color: '#0874F9',
    active: true,
  },
  {
    year: '2026',
    title: 'National Expansion',
    items: ['75+ partner institutions', 'Regional offices in key metro areas', 'Bilingual support in 10+ languages'],
    color: '#D6A84B',
    active: false,
  },
  {
    year: '2030',
    title: 'Full-Scale Vision',
    items: ['100+ partners in all 50 states', '50,000+ alumni network', 'Industry-leading student outcomes'],
    color: '#059669',
    active: false,
  },
];

const comparisonData = [
  { label: 'University Partners', current: 45, target: 100, unit: '+', color: '#0874F9' },
  { label: 'Students Served Annually', current: 500, target: 5000, unit: '+', color: '#D6A84B' },
  { label: 'States Covered', current: 15, target: 50, unit: '', color: '#061846' },
  { label: 'Alumni Network', current: 2000, target: 50000, unit: '+', color: '#059669' },
];

/* ------------------------------------------------------------------ */
/*  Animated Progress Bar                                               */
/* ------------------------------------------------------------------ */
function AnimatedProgressBar({
  label,
  current,
  target,
  unit,
  color,
  isInView,
}: {
  label: string;
  current: number;
  target: number;
  unit: string;
  color: string;
  isInView: boolean;
}) {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[#0F172A]">{label}</span>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-bold" style={{ color }}>
            {current >= 1000 ? `${(current / 1000).toFixed(current % 1000 === 0 ? 0 : 1)}K` : current}{unit}
          </span>
          <span className="text-[#6B7280]">/</span>
          <span className="text-[#6B7280]">
            {target >= 1000 ? `${(target / 1000).toFixed(target % 1000 === 0 ? 0 : 1)}K` : target}{unit}
          </span>
        </div>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-100">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */
interface VisionPageProps {
  onBack: () => void;
}

export default function VisionPage({ onBack }: VisionPageProps) {
  const handleAssessmentClick = () => {
    track.ctaClick({
      cta_type: 'assessment',
      cta_source: 'vision_page_cta',
      cta_text: 'Start Free 60-Second Assessment',
    });
    window.dispatchEvent(new CustomEvent('ucsg-assessment', { detail: { open: 'assessment' } }));
  };

  const handlePhoneClick = () => {
    track.ctaClick({
      cta_type: 'phone',
      cta_source: 'vision_page_cta',
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
                Looking Ahead
              </span>
              <div className="h-px w-8 bg-[#D6A84B]/50" />
            </motion.div>

            <motion.h1
              className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Shaping the Future of{' '}
              <span className="text-[#D6A84B]">International Education</span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              We envision a world where every international student has seamless access
              to U.S. higher education — powered by technology, guided by integrity,
              and sustained by community.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────── Vision Statement ──────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Sparkles className="mx-auto mb-4 h-8 w-8 text-[#D6A84B]" />
            <p className="font-heading text-xl font-medium leading-relaxed text-[#061846] sm:text-2xl lg:text-3xl">
              By 2030, UCSG will be the most trusted bridge between international
              students and American higher education — known for innovation,
              accessibility, and life-changing student outcomes.
            </p>
            <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-[#0874F9] to-[#D6A84B]" />
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────── Future Pillars ──────────────────────────────── */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="FUTURE STRATEGY"
            title="Three Pillars of Our Vision"
            description="The strategic ambitions that will define the next chapter of UCSG's growth and impact."
            badgeColor="#D6A84B"
          />

          <div className="mt-12 grid gap-8 sm:grid-cols-3 lg:mt-16">
            {futurePillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, scale: 1.02 }}
                >
                  <Card className="group h-full border-transparent bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
                    <CardContent className="flex flex-col items-center p-8 text-center">
                      <motion.div
                        className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
                        style={{ backgroundColor: pillar.bg }}
                        whileHover={{ rotate: [0, -6, 6, 0], scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Icon className="h-8 w-8" style={{ color: pillar.color }} />
                      </motion.div>
                      <h3 className="font-heading text-xl font-bold text-[#0F172A]">{pillar.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">{pillar.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────── Vision Roadmap ──────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="ROADMAP"
            title="Our Path Forward"
            description="A phased approach to realizing our 2030 vision, with clear milestones at every stage."
            badgeColor="#0874F9"
          />

          <div className="relative mt-12 lg:mt-16">
            {/* Vertical connecting line (desktop) */}
            <div className="absolute top-0 bottom-0 left-8 hidden w-0.5 bg-gradient-to-b from-[#061846] via-[#0874F9] via-[#D6A84B] to-[#059669] opacity-20 lg:block" aria-hidden="true" />

            <div className="space-y-8 lg:space-y-0">
              {roadmapItems.map((item, i) => (
                <motion.div
                  key={item.year}
                  className="relative flex gap-6 lg:gap-10"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Year marker (desktop) */}
                  <div className="hidden shrink-0 lg:flex lg:w-16 lg:flex-col lg:items-center">
                    <div
                      className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white font-heading text-sm font-bold shadow-md"
                      style={{ borderColor: item.color, color: item.color }}
                    >
                      {item.year.slice(-2)}
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="flex-1 pb-8 lg:pb-16">
                    {/* Mobile year badge */}
                    <Badge
                      className="mb-3 lg:hidden"
                      style={{
                        backgroundColor: `${item.color}10`,
                        color: item.color,
                        borderColor: `${item.color}30`,
                      }}
                      variant="outline"
                    >
                      {item.year}
                    </Badge>
                    <h3 className="font-heading text-lg font-bold text-[#0F172A] sm:text-xl">{item.title}</h3>
                    {item.active && (
                      <span className="mt-1 inline-block rounded-full bg-[#059669]/10 px-2.5 py-0.5 text-xs font-semibold text-[#059669]">
                        In Progress
                      </span>
                    )}
                    <ul className="mt-3 space-y-2">
                      {item.items.map((text) => (
                        <li key={text} className="flex items-start gap-2 text-sm text-[#6B7280]">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: item.color }} />
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────── Where We Are vs Where We're Going ──────────────────────────────── */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="PROGRESS TRACKER"
            title="Where We Are vs. Where We're Going"
            description="Transparency in our journey — see how far we've come and where we're headed."
            badgeColor="#061846"
          />

          <div className="mx-auto mt-12 max-w-3xl space-y-8 lg:mt-16">
            {comparisonData.map((item, i) => (
              <AnimatedProgressBar
                key={item.label}
                label={item.label}
                current={item.current}
                target={item.target}
                unit={item.unit}
                color={item.color}
                isInView={true}
              />
            ))}
          </div>

          {/* Legend */}
          <motion.div
            className="mx-auto mt-8 flex items-center justify-center gap-6 max-w-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 text-sm text-[#6B7280]">
              <div className="h-3 w-3 rounded-full bg-[#0874F9]" />
              Where We Are
            </div>
            <div className="flex items-center gap-2 text-sm text-[#6B7280]">
              <div className="h-3 w-3 rounded-full bg-gray-200" />
              Where We're Going
            </div>
          </motion.div>
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
            BE PART OF THE VISION
          </motion.p>

          <motion.h2
            className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={1}
          >
            Join Us in Shaping the Future
          </motion.h2>

          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:mt-6 sm:text-lg"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={2}
          >
            Whether you&apos;re a student seeking guidance, a university seeking partnerships,
            or a professional looking to make a difference — there&apos;s a place for you in our vision.
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
