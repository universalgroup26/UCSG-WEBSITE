'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Heart,
  Users,
  MonitorSmartphone,
  Building2,
  Languages,
  Handshake,
  Lightbulb,
  HeartHandshake,
  ShieldCheck,
  Award,
  Star,
} from 'lucide-react';
import { CursorSpotlight, TextReveal, AnimatedHeading } from '@/components/animations/TextReveal';

const BRAND_BLUE = '#002868';
const DARK_BG = '#0F172A';
const DARK_CARD = '#1A2332';
const MUTED_TEXT = '#94A3B8';

/* ------------------------------------------------------------------ */
/*  ScrollReveal helper                                                */
/* ------------------------------------------------------------------ */
function ScrollReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const differentiators = [
  {
    icon: Heart,
    title: 'Students Always Come First',
    description:
      'We put our students happiness and success ahead of profit. Your goals drive everything we do.',
  },
  {
    icon: Users,
    title: 'Relationship Building',
    description:
      'We build strong, lasting relationships with both our institutional partners and our students and their families.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Custom CRM Technology',
    description:
      'We designed our own CRM tool to manage your case from end to end, ensuring a smooth transition from application to arrival.',
  },
  {
    icon: Building2,
    title: 'Onshore USA Office',
    description:
      'Our Jackson Heights, NY office ensures students receive ongoing support and aftercare upon arrival in the United States.',
  },
  {
    icon: Languages,
    title: 'Multilingual Counselors',
    description:
      'Fully trained multilingual counselors available online and onsite to guide you in your preferred language.',
  },
];

const missionCards = [
  {
    icon: Handshake,
    title: 'Institutional Partnerships',
    description:
      'Build an extensive network of institutional partnerships based on mutual benefits.',
  },
  {
    icon: Lightbulb,
    title: 'Continuous Innovation',
    description:
      'Continually develop new ideas and projects to improve and surpass our partners needs.',
  },
  {
    icon: HeartHandshake,
    title: 'Students & Families First',
    description:
      'Always put the students and their families first in every decision we make.',
  },
];

/* ------------------------------------------------------------------ */
/*  Section 1 – About UCSG (Founder Story)                            */
/* ------------------------------------------------------------------ */
function FounderStorySection() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-24">
      {/* Decorative accent */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-[0.04]"
        style={{ background: `radial-gradient(circle, ${BRAND_BLUE}, transparent 70%)` }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full opacity-[0.03]"
        style={{ background: `radial-gradient(circle, ${BRAND_BLUE}, transparent 70%)` }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text column */}
          <div className="flex flex-col gap-6">
            <ScrollReveal>
              <p
                className="text-sm font-semibold uppercase tracking-widest"
                style={{ color: BRAND_BLUE }}
              >
                About UCSG
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
                Founded by a Veteran, Driven by Students
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-base leading-relaxed text-gray-600">
                Founded in 2022 by Joy Chowdhury — a multilingual U.S. Army veteran,
                former student government president, and respected community leader —
                Universal Consulting Services Group (UCSG) is a trusted resource for
                international students pursuing their education in the United States.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-base leading-relaxed text-gray-600">
                With a proven track record of guiding thousands of students through
                their educational journey in the U.S., UCSG specializes in connecting
                students to affordable, well-ranked colleges and universities that offer
                hybrid programs, CPT/OPT opportunities, and real-world career pathways.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="text-base leading-relaxed text-gray-600">
                Our mission goes beyond information — we provide hands-on support,
                mentorship, and access to the resources students need to grow
                academically, personally, and professionally. At UCSG, we are committed
                to trust, transparency, and your success.
              </p>
            </ScrollReveal>

            {/* Veteran-Owned Business Highlight Badge */}
            <ScrollReveal delay={0.5}>
              <div className="mt-3 relative overflow-hidden rounded-2xl border-2 border-[#B31942]/30 bg-gradient-to-r from-[#002868]/[0.03] via-[#B31942]/[0.04] to-[#002868]/[0.03] p-6 shadow-[0_4px_24px_-4px_rgba(179,25,66,0.12)]">
                {/* Animated shimmer overlay */}
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)',
                  }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#B31942] to-[#002868] shadow-lg shadow-[#B31942]/25 ring-2 ring-white">
                    <ShieldCheck className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-lg font-extrabold tracking-wide text-[#0F172A] sm:text-xl">
                        U.S. Army Veteran-owned Business
                      </h4>
                      <Star className="h-5 w-5 shrink-0 fill-[#B31942] text-[#B31942]" />
                      <Award className="h-5 w-5 shrink-0 fill-[#002868] text-[#002868]" />
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="h-[2px] flex-1 max-w-[60px] rounded-full bg-gradient-to-r from-[#B31942] to-[#002868]" />
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#B31942]">
                        Certified & Verified
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
                      Founded and led by Joy Chowdhury, a U.S. Army veteran committed to serving international students with integrity, honor, and dedication.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Image column with parallax */}
          <ScrollReveal delay={0.2} className="flex justify-center lg:justify-end">
            <div className="relative h-72 w-full max-w-md sm:h-80 lg:h-[420px]">
              <ParallaxImage />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 2 – How Are We Different?                                 */
/* ------------------------------------------------------------------ */
function DifferentiatorsSection() {
  return (
    <section className="relative w-full bg-gray-50/70 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedHeading
          badge="Why UCSG"
          title="How Are We Different?"
          badgeColor="#002868"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item, i) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <motion.div
                  className="relative h-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_2px_20px_-4px_rgba(0,40,104,0.06)] transition-all duration-200"
                  whileHover={{ y: -6, shadow: '0 8px 30px -4px rgba(0,40,104,0.15)' }}
                  style={{ transformStyle: 'preserve-3d', perspective: '600px' }}
                >
                  {/* Gradient top border accent */}
                  <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-[#002868] to-[#B31942]" />
                  <motion.div
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${BRAND_BLUE}14` }}
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className="h-5 w-5" style={{ color: BRAND_BLUE }} />
                  </motion.div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500">
                    {item.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3 – Mission & Vision                                      */
/* ------------------------------------------------------------------ */
function MissionVisionSection() {
  return (
    <section
      className="relative w-full overflow-hidden py-16 md:py-24"
      style={{ backgroundColor: DARK_BG }}
    >
      {/* Cursor spotlight effect on dark section */}
      <CursorSpotlight />
      {/* Animated decorative glows */}
      <motion.div
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full"
        style={{ background: `radial-gradient(circle, ${BRAND_BLUE}, transparent 70%)` }}
        animate={{ opacity: [0.06, 0.1, 0.06], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full"
        style={{ background: `radial-gradient(circle, ${BRAND_BLUE}, transparent 70%)` }}
        animate={{ opacity: [0.05, 0.09, 0.05], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <motion.h2
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Our Mission & Vision
          </motion.h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {missionCards.map((item, i) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div
                  className="h-full rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.1]"
                >
                  <div
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${BRAND_BLUE}20` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: BRAND_BLUE }} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: MUTED_TEXT }}>
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ParallaxImage — parallax campus image                                 */
/* ------------------------------------------------------------------ */
function ParallaxImage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div ref={ref} className="absolute inset-0" style={{ y }}>
      {/* Rotating conic gradient border */}
      <motion.div
        className="absolute -inset-[2px] rounded-2xl"
        style={{
          background: `conic-gradient(from 0deg, ${BRAND_BLUE}, #B31942, ${BRAND_BLUE})`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
        <Image
          src="/images/campus.png"
          alt="University campus"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 90vw, 448px"
        />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Export                                                        */
/* ------------------------------------------------------------------ */
export default function AboutUCSGSection() {
  return (
    <>
      <FounderStorySection />
      <DifferentiatorsSection />
      <MissionVisionSection />
    </>
  );
}
