'use client';

import Image from 'next/image';
import { Phone, ArrowRight, ShieldCheck, MapPin, Globe, GitCompareArrows } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { track } from '@/lib/analytics';

interface Props {
  onContactClick?: () => void;
}

/* Simple fade-up animation — content is always visible, just animates in */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const trustIndicators = [
  { icon: ShieldCheck, label: 'U.S. Army veteran-owned business' },
  { icon: MapPin, label: 'Jackson Heights, New York office' },
  { icon: Globe, label: 'Multilingual student support' },
  { icon: GitCompareArrows, label: 'Personalized program comparisons' },
];

export default function HeroSection({ onContactClick }: Props) {
  const handlePrimaryCta = () => {
    track.ctaClick({
      cta_type: 'apply',
      cta_source: 'hero',
      cta_text: 'Start 60-Second Assessment',
    });
    onContactClick?.();
  };

  const handleSecondaryCta = () => {
    track.ctaClick({
      cta_type: 'call',
      cta_source: 'hero',
      cta_text: 'Talk With a Counselor',
      cta_url: 'tel:+13028935594',
    });
  };

  return (
    <section
      className="ucsg-orbit-lines relative overflow-hidden bg-gradient-to-b from-[#061846] to-[#092B68]"
      aria-label="Hero"
    >
      {/* Faint logo watermark — subtle background element */}
      <div className="ucsg-watermark absolute right-[-10%] top-[5%] z-0 hidden lg:block">
        <Image
          src="/ucsg-logo.png"
          alt=""
          aria-hidden="true"
          width={500}
          height={500}
          className="h-auto w-[500px] object-contain"
          unoptimized
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ===== LEFT: Headline, Copy, CTAs, Trust ===== */}
          <div className="flex flex-col items-start">
            {/* Eyebrow */}
            <motion.p
              className="mb-4 text-sm font-medium uppercase tracking-widest text-[#D6A84B] sm:text-base"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              Personalized guidance for F-1 students in the USA
            </motion.p>

            {/* Headline */}
            <motion.h1
              className="font-heading text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-[2.75rem] lg:text-5xl"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              A Clearer Path to the{' '}
              <span className="bg-gradient-to-r from-white via-[#93C5FD] to-white bg-clip-text text-transparent">
                Right U.S. Graduate Program
              </span>
            </motion.h1>

            {/* Supporting copy */}
            <motion.p
              className="mt-6 max-w-lg text-base leading-relaxed text-blue-100/80 sm:text-lg sm:leading-relaxed"
              style={{ minWidth: '16px', fontSize: 'clamp(16px, 1.125rem, 1.125rem)' }}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              Compare transfer-friendly universities, hybrid graduate programs,
              estimated costs, locations, and academic requirements with
              personalized guidance from UCSG.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:w-auto sm:gap-4"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <Button
                size="lg"
                className="h-12 w-full rounded-lg bg-[#0874F9] px-6 text-base font-semibold text-white shadow-lg shadow-[#0874F9]/25 transition-colors hover:bg-[#0660D4] focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061846] sm:w-auto sm:px-8"
                onClick={handlePrimaryCta}
              >
                Start 60-Second Assessment
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 w-full rounded-lg border-white/25 bg-transparent px-6 text-base font-semibold text-white transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061846] sm:w-auto sm:px-8"
                onClick={handleSecondaryCta}
              >
                <a href="tel:+13028935594">
                  <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                  Talk With a Counselor
                </a>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="mt-10 flex flex-col gap-2.5"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              aria-label="Trust indicators"
            >
              {trustIndicators.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 text-sm text-blue-100/60 sm:text-base"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-[#D6A84B]" aria-hidden="true" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* ===== RIGHT: Hero Image ===== */}
          <motion.div
            className="relative mx-auto w-full max-w-md lg:max-w-none lg:mx-0"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/30 sm:aspect-[4/5] lg:aspect-[3/4]">
              <Image
                src="/images/ucsg-hero-students.webp"
                alt="Students on a university campus pursuing graduate studies in the United States"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center md:object-top"
                priority
                unoptimized
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
