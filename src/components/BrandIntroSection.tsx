'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { ShieldCheck, Star, GraduationCap, Globe, Award, CheckCircle2 } from 'lucide-react';

const WORDS = ['Universal', 'Consulting', 'Service', 'Group'];

const letterVariants = {
  hidden: { opacity: 0, y: 24, rotateX: -80 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.2 + i * 0.02,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
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
      delay: 0.9 + i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function BrandIntroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

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
      {/* Subtle radial glow */}
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

        {/* Animated letter-by-letter full name — uses normal text flow, no flex */}
        <div
          className="text-center"
          style={{ perspective: '800px' }}
        >
          {WORDS.map((word, wi) => (
            <span key={word} style={{ whiteSpace: 'nowrap' }}>
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
              {/* space between words */}
              {wi < WORDS.length - 1 && (
                <span className="inline-block w-3 sm:w-4 md:w-5" />
              )}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-[#475569] sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Empowering international students with trusted guidance for U.S. university admissions,{' '}
          <strong className="font-semibold text-[#0F172A]">Day 1 CPT programs</strong>, and visa success.
        </motion.p>

        {/* Veteran-owned + Founder card */}
        <motion.div
          className="mx-auto mt-10 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-[#002868]/10 bg-gradient-to-br from-[#002868]/[0.03] to-[#B31942]/[0.02] p-6 sm:p-8">
            {/* Inner accent line */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#002868] via-[#B31942] to-[#002868]" />

            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
              {/* Left: badges */}
              <div className="flex flex-row gap-3 sm:flex-col sm:gap-4">
                <div className="flex items-center gap-2 rounded-full border border-[#B31942]/20 bg-[#B31942]/[0.06] px-3.5 py-2">
                  <ShieldCheck className="h-4 w-4 text-[#B31942]" />
                  <span className="text-xs font-bold tracking-wide text-[#B31942]">
                    U.S. Army Veteran-owned
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[#002868]/15 bg-[#002868]/[0.04] px-3.5 py-2">
                  <CheckCircle2 className="h-4 w-4 text-[#002868]" />
                  <span className="text-xs font-bold tracking-wide text-[#002868]">
                    Certified &amp; Verified
                  </span>
                </div>
              </div>

              {/* Right: founder info */}
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <Award className="h-4 w-4 text-[#002868]/60" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#002868]/60">
                    Our Founder
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-[#334155] sm:text-base">
                  Founded and led by <strong className="font-semibold text-[#0F172A]">Joy Chowdhury</strong>,
                  a U.S. Army veteran committed to serving international students with{' '}
                  <strong className="font-semibold text-[#0F172A]">integrity, honor, and dedication</strong>.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

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
