'use client';

import Image from 'next/image';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

const checklistItems = [
  'Review your academic goals and current status',
  'Compare verified program requirements and total estimated costs',
  'Understand the questions to confirm with the university and DSO',
];

export default function PersonalizedGuidance() {
  const handleCtaClick = () => {
    track.ctaClick({
      cta_type: 'apply',
      cta_source: 'personalized_guidance',
      cta_text: 'Request My Program Comparison',
    });
    window.dispatchEvent(
      new CustomEvent('ucsg-navigate', {
        detail: { view: 'contact' },
      }),
    );
  };

  return (
    <section className="bg-[#EDF5FF] py-16 sm:py-20 lg:py-24" aria-label="Personalized guidance">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: Image */}
          <motion.div
            className="flex justify-center lg:justify-start"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
          >
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2 shadow-lg shadow-slate-900/5">
              <Image
                src="/images/ucsg-personal-guidance.webp"
                alt="UCSG advisor providing personalized educational guidance"
                width={180}
                height={180}
                className="h-[180px] w-[180px] rounded-xl object-cover"
                unoptimized
              />
            </div>
          </motion.div>

          {/* RIGHT: Content */}
          <motion.div
            className="flex flex-col items-start"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={1}
          >
            <h2 className="font-heading text-2xl font-bold tracking-tight text-[#061846] sm:text-3xl lg:text-4xl">
              Guidance Built Around Your Situation
            </h2>

            <ul className="mt-6 flex flex-col gap-4" role="list">
              {checklistItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#0874F9]"
                    aria-hidden="true"
                  />
                  <span className="text-base leading-relaxed text-slate-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              className="mt-8 h-12 rounded-lg bg-[#0874F9] px-6 text-base font-semibold text-white shadow-lg shadow-[#0874F9]/25 transition-colors hover:bg-[#0660D4] focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF5FF] sm:px-8"
              onClick={handleCtaClick}
            >
              Request My Program Comparison
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
