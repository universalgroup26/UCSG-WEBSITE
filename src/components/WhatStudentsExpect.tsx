'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, FileText, Phone, ArrowRight } from 'lucide-react';
import { track } from '@/lib/analytics';

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const commitments = [
  {
    icon: MessageSquare,
    title: 'Clear Communication',
    description:
      'We explain your options in plain language, answer your questions directly, and keep you informed throughout the process.',
  },
  {
    icon: FileText,
    title: 'Documented Options',
    description:
      'You receive written program comparisons with verified requirements, estimated costs, and source links so you can review everything at your own pace.',
  },
  {
    icon: Phone,
    title: 'Responsive Support',
    description:
      'Reach our team by phone, WhatsApp, or email during business hours. We aim to respond to inquiries within one business day.',
  },
  {
    icon: ArrowRight,
    title: 'Transparent Next Steps',
    description:
      'At every stage, we outline what happens next, what we need from you, and what timelines to expect. No surprises.',
  },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */
export default function WhatStudentsExpect() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track.sectionView('what_students_expect');
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="expect-heading"
      className="w-full py-16 md:py-24"
      style={{ backgroundColor: '#061846' }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <motion.p
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: '#0874F9' }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            What Students Can Expect
          </motion.p>
          <motion.h2
            id="expect-heading"
            className="mt-3 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0.1}
          >
            Our Commitment to Every Student
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0.2}
          >
            When you work with UCSG, here is what you can expect at every step.
          </motion.p>
        </div>

        {/* 2x2 grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {commitments.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="rounded-lg border border-white/10 bg-white/10 p-6"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={(i + 3) * 0.1}
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ backgroundColor: '#0874F9' }}
                >
                  <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-base leading-relaxed text-white/70">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
