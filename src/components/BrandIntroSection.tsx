'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { ShieldCheck, Star, GraduationCap, Globe } from 'lucide-react';

const WORDS = ['Universal', 'Consulting', 'Service', 'Group'];

const letterVariants = {
  hidden: { opacity: 0, y: 20, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.3 + i * 0.025,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const wordVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

const statItems = [
  { icon: GraduationCap, value: '5,000+', label: 'Students Placed' },
  { icon: Star, value: '99%', label: 'Success Rate' },
  { icon: Globe, value: '20+', label: 'Countries Served' },
  { icon: ShieldCheck, value: '11+', label: 'Partner Universities' },
];

const statVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 1.0 + i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function BrandIntroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Pre-compute flat letter indices so they're stable across re-renders
  const letterData = useMemo(() => {
    const data: { word: string; char: string; globalIndex: number }[] = [];
    let gi = 0;
    for (const word of WORDS) {
      for (const char of word.split('')) {
        data.push({ word, char, globalIndex: gi++ });
      }
    }
    return data;
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white py-20 sm:py-28"
    >
      {/* Subtle radial glow behind text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[800px] rounded-full bg-gradient-to-br from-[#002868]/[0.04] via-[#B31942]/[0.03] to-transparent blur-3xl" />
      </div>

      {/* Decorative corner accents */}
      <div className="pointer-events-none absolute left-8 top-8 h-16 w-16 rounded-full border border-[#002868]/10" />
      <div className="pointer-events-none absolute right-8 bottom-8 h-16 w-16 rounded-full border border-[#B31942]/10" />
      <div className="pointer-events-none absolute left-12 top-12 h-8 w-8 rounded-full bg-[#002868]/[0.05]" />
      <div className="pointer-events-none absolute right-12 bottom-12 h-8 w-8 rounded-full bg-[#B31942]/[0.05]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Pre-label */}
        <motion.div
          className="mb-6 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="h-px max-w-[80px] flex-1 bg-gradient-to-r from-transparent to-[#002868]/30" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#002868]/60">
            Who We Are
          </span>
          <div className="h-px max-w-[80px] flex-1 bg-gradient-to-l from-transparent to-[#002868]/30" />
        </motion.div>

        {/* Animated word-by-word with letter reveals */}
        <div
          className="flex flex-wrap items-baseline justify-center gap-x-3 sm:gap-x-4 md:gap-x-5"
          style={{ perspective: '800px' }}
        >
          {WORDS.map((word, wi) => (
            <motion.span
              key={word}
              variants={wordVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="inline-flex shrink-0"
            >
              {letterData
                .filter((d) => d.word === word)
                .map((d) => (
                  <motion.span
                    key={d.globalIndex}
                    custom={d.globalIndex}
                    variants={letterVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="inline-block bg-gradient-to-br from-[#0F172A] via-[#002868] to-[#0F172A] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl"
                    style={{ transformOrigin: 'center bottom' }}
                  >
                    {d.char}
                  </motion.span>
                ))}
            </motion.span>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-[#475569] sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Empowering international students with trusted guidance for U.S. university admissions,{' '}
          <strong className="font-semibold text-[#0F172A]">Day 1 CPT programs</strong>, and visa success.
        </motion.p>

        {/* Stat cards */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {statItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                custom={i}
                variants={statVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50/50 p-5 text-center shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-[#002868]/[0.06] sm:p-6"
              >
                {/* Hover gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#002868]/[0.03] to-[#B31942]/[0.02] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#002868] to-[#001B4D] shadow-md shadow-[#002868]/20">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs font-medium tracking-wide text-[#64748B] sm:text-sm">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
