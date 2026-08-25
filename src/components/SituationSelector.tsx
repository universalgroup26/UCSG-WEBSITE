'use client';

import Image from 'next/image';
import { ArrowLeftRight, Clock, GraduationCap, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { track } from '@/lib/analytics';
import { useEffect, useRef } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const situations = [
  {
    id: 'transfer' as const,
    icon: ArrowLeftRight,
    title: 'I need to transfer universities',
    description:
      'Already studying in the U.S. and exploring a transfer to a program that better fits your goals.',
  },
  {
    id: 'opt-ending' as const,
    icon: Clock,
    title: 'My OPT or STEM OPT is ending',
    description:
      'Your work authorization timeline is approaching and you need to understand your next options.',
  },
  {
    id: 'affordable-program' as const,
    icon: GraduationCap,
    title: 'I need an affordable graduate program',
    description:
      "Comparing hybrid and campus-based Master's, PhD, and DBA programs with transparent cost information.",
  },
  {
    id: 'compare-programs' as const,
    icon: BookOpen,
    title: "I want to compare Master's, PhD, or DBA options",
    description:
      'Review verified program details, delivery formats, and requirements across multiple universities.',
  },
] as const;

type SituationId = (typeof situations)[number]['id'];

function handleCardClick(id: SituationId, title: string) {
  track.ctaClick({
    cta_type: 'situation_card',
    cta_source: 'situation_selector',
    cta_text: title,
  });
  window.dispatchEvent(
    new CustomEvent('ucsg-navigate', {
      detail: { view: 'contact', id },
    }),
  );
}

export default function SituationSelector() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track.sectionView('situation_selector');
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
      aria-label="Situation selector"
    >
      {/* Background image */}
      <Image
        src="/images/bg-situation-selector.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none select-none object-cover"
        aria-hidden="true"
      />

      {/* White overlay — ~92% opacity */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)' }}
        aria-hidden="true"
      />

      {/* Content layer */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          className="mb-12 text-center sm:mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#0874F9]">
            What brings you here?
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-[#061846] sm:text-3xl lg:text-4xl">
            Tell Us Your Situation
          </h2>
          {/* Gold decorative line */}
          <div
            className="mx-auto mt-4 h-[2px] w-16 rounded-full"
            style={{ backgroundColor: '#D6A84B' }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {situations.map((situation, index) => {
            const Icon = situation.icon;
            return (
              <motion.button
                key={situation.id}
                type="button"
                className="group relative flex flex-col items-start overflow-hidden rounded-xl border border-slate-200/80 bg-white/80 p-6 text-left shadow-sm backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#0874F9]/40 hover:shadow-lg hover:shadow-[#0874F9]/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={index + 1}
                onClick={() => handleCardClick(situation.id, situation.title)}
              >
                {/* Subtle top accent bar on hover */}
                <span
                  className="absolute left-0 top-0 h-[3px] w-0 rounded-b-full bg-[#D6A84B] transition-all duration-300 ease-out group-hover:w-full"
                  aria-hidden="true"
                />
                <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0874F9] shadow-md shadow-[#0874F9]/20 transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-[#0874F9]/30">
                  <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-lg font-semibold leading-snug text-[#061846]">
                  {situation.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600">
                  {situation.description}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
