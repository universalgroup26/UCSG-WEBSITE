'use client';

import { ArrowLeftRight, Clock, GraduationCap, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { track } from '@/lib/analytics';

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
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-label="Situation selector">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
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
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {situations.map((situation, index) => {
            const Icon = situation.icon;
            return (
              <motion.button
                key={situation.id}
                type="button"
                className="group flex flex-col items-start rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#0874F9] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={index + 1}
                onClick={() => handleCardClick(situation.id, situation.title)}
              >
                <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0874F9]">
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
