'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { track } from '@/lib/analytics';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const steps = [
  {
    number: 1,
    title: 'Student Situation Review',
    description:
      'We start by understanding your current academic standing, visa status, timeline, and goals.',
  },
  {
    number: 2,
    title: 'Verified Program Shortlist',
    description:
      'Based on your situation, we prepare a shortlist of verified programs with requirements, costs, and delivery formats.',
  },
  {
    number: 3,
    title: 'Application and School Coordination',
    description:
      'We help coordinate your application process with the university, ensuring documentation is complete and deadlines are met.',
  },
  {
    number: 4,
    title: 'Enrollment and Ongoing Student Support',
    description:
      'After enrollment, we remain available to support your transition and provide ongoing guidance.',
  },
];

export default function HowUCSGHelps() {
  const sectionRef = useRef<HTMLElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);
  const connectorInView = useInView(connectorRef, { once: true, amount: 0.3 });

  // Section view tracking
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            track.sectionView('how_ucsg_helps');
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="How UCSG helps"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* ── Full-section background image ── */}
      <Image
        src="/images/bg-how-ucsg-helps.png"
        alt=""
        role="presentation"
        fill
        className="pointer-events-none object-cover"
        aria-hidden="true"
      />

      {/* ── Light ice-blue overlay (88 % opacity) ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: 'rgba(237, 245, 255, 0.88)' }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          className="mb-10 text-center sm:mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#0874F9]">
            How UCSG Helps
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-[#061846] sm:text-3xl lg:text-4xl">
            A Guided Path for Your Next Steps
          </h2>
        </motion.div>

        {/* Decorative image banner — slightly smaller, more integrated */}
        <motion.div
          className="mb-10 sm:mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={1}
        >
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl shadow-lg shadow-[#061846]/10">
            <Image
              src="/images/ucsg-guided-path.webp"
              alt="Illustration of a student's guided path through university transfer"
              width={640}
              height={427}
              className="h-auto w-full object-cover"
              unoptimized
            />
          </div>
        </motion.div>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Desktop animated horizontal connector line (behind circles) */}
          <div
            ref={connectorRef}
            className="absolute top-6 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] hidden h-0.5 origin-left lg:block"
            aria-hidden="true"
          >
            <motion.div
              className="h-full w-full rounded-full bg-gradient-to-r from-[#0874F9]/40 via-[#0874F9]/25 to-[#0874F9]/40"
              initial={{ scaleX: 0 }}
              animate={connectorInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1] as const,
                delay: 0.4,
              }}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center lg:gap-0"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={index + 2}
              >
                {/* Mobile vertical line segment + circle */}
                <div className="relative flex shrink-0 flex-col items-center lg:mb-4">
                  {/* Vertical connector (mobile + tablet) */}
                  {index < steps.length - 1 && (
                    <div
                      className="absolute top-12 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-[#0874F9]/20 lg:hidden"
                      aria-hidden="true"
                    />
                  )}
                  {/* Numbered circle */}
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#0874F9] text-lg font-bold text-white shadow-md shadow-[#0874F9]/25">
                    {step.number}
                  </div>
                </div>

                {/* Text content */}
                <div className="flex-1 pb-4 lg:pb-0">
                  <h3 className="font-heading text-lg font-semibold leading-snug text-[#061846]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
