'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  Heart,
  Users,
  MonitorSmartphone,
  Building2,
  Languages,
  Handshake,
  Lightbulb,
  HeartHandshake,
} from 'lucide-react';

const TEAL = '#002868';
const TEAL_DARK = '#0F172A';
const TEAL_CARD = '#1A2332';
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
        style={{ background: `radial-gradient(circle, ${TEAL}, transparent 70%)` }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full opacity-[0.03]"
        style={{ background: `radial-gradient(circle, ${TEAL}, transparent 70%)` }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text column */}
          <div className="flex flex-col gap-6">
            <ScrollReveal>
              <p
                className="text-sm font-semibold uppercase tracking-widest"
                style={{ color: TEAL }}
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
          </div>

          {/* Image column */}
          <ScrollReveal delay={0.2} className="flex justify-center lg:justify-end">
            <div
              className="relative h-72 w-full max-w-md overflow-hidden rounded-2xl sm:h-80 lg:h-[420px]"
            >
              {/* Teal border accent */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  padding: '3px',
                  background: `linear-gradient(135deg, ${TEAL}, ${TEAL}88, transparent 60%)`,
                }}
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
        <ScrollReveal>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How Are We Different?
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item, i) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1">
                  <div
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${TEAL}14` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: TEAL }} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500">
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
/*  Section 3 – Mission & Vision                                      */
/* ------------------------------------------------------------------ */
function MissionVisionSection() {
  return (
    <section
      className="relative w-full overflow-hidden py-16 md:py-24"
      style={{ backgroundColor: TEAL_DARK }}
    >
      {/* Decorative glows */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full opacity-[0.06]"
        style={{ background: `radial-gradient(circle, ${TEAL}, transparent 70%)` }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full opacity-[0.05]"
        style={{ background: `radial-gradient(circle, ${TEAL}, transparent 70%)` }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Our Mission & Vision
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {missionCards.map((item, i) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div
                  className="h-full rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1"
                  style={{
                    backgroundColor: TEAL_CARD,
                    border: `1px solid ${TEAL}30`,
                  }}
                >
                  <div
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${TEAL}20` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: TEAL }} />
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
