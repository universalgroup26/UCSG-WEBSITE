'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { track } from '@/lib/analytics';

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const checklistItems = [
  'Review your academic goals and current status',
  'Compare verified program requirements and total estimated costs',
  'Understand the questions to confirm with the university and DSO',
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function PersonalizedGuidance() {
  const sectionRef = useRef<HTMLElement>(null);

  // Section view tracking
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track.sectionView('personalized_guidance');
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
    <section
      ref={sectionRef}
      aria-label="Personalized guidance"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* ── Background image overlay ── */}
      <Image
        src="/images/bg-situation-selector.png"
        alt=""
        fill
        className="object-cover object-center"
        aria-hidden="true"
      />
      {/* Soft blue overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(237,245,255,0.92) 0%, rgba(237,245,255,0.85) 50%, rgba(237,245,255,0.92) 100%)',
        }}
      />

      {/* ── Subtle dot pattern ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #061846 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: Large portrait image — full height, rounded corners */}
          <motion.div
            className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl shadow-2xl shadow-[#061846]/10 lg:mx-0 lg:max-w-none"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
          >
            <Image
              src="/images/ucsg-personal-guidance.webp"
              alt="UCSG advisor providing personalized educational guidance to international students"
              width={768}
              height={1344}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full w-full object-cover"
            />
            {/* Subtle gradient on bottom of image for visual depth */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/4"
              style={{
                background:
                  'linear-gradient(to top, rgba(6,24,70,0.12), transparent)',
              }}
              aria-hidden="true"
            />
          </motion.div>

          {/* RIGHT: Text content — vertically centered */}
          <div className="flex flex-col justify-center">
            <motion.h2
              className="font-heading text-2xl font-bold tracking-tight text-[#061846] sm:text-3xl lg:text-[2.5rem] lg:leading-tight"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
            >
              Guidance Built Around{' '}
              <span className="text-[#0874F9]">Your Situation</span>
            </motion.h2>

            <motion.p
              className="mt-4 max-w-lg text-base leading-relaxed text-slate-600 lg:text-lg"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={2}
            >
              Every student's path is different. We start with where you are
              right now and build a plan that fits.
            </motion.p>

            <motion.ul
              className="mt-8 flex flex-col gap-5"
              role="list"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={3}
            >
              {checklistItems.map((item, idx) => (
                <motion.li
                  key={item}
                  className="flex items-start gap-3.5"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={4 + idx}
                >
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0874F9]/10"
                    aria-hidden="true"
                  >
                    <CheckCircle className="h-4 w-4 text-[#0874F9]" />
                  </span>
                  <span className="text-base leading-relaxed text-slate-700 lg:text-[1.05rem]">
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-10"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={7}
            >
              <Button
                size="lg"
                className="h-12 rounded-xl bg-[#0874F9] px-7 text-base font-semibold text-white shadow-lg shadow-[#0874F9]/25 transition-all hover:bg-[#0660D4] hover:shadow-xl hover:shadow-[#0874F9]/30 focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF5FF] sm:px-8"
                onClick={handleCtaClick}
              >
                Request My Program Comparison
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
