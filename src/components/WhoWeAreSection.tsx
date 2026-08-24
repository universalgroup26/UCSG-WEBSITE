'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useInView, motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Star, Globe, ShieldCheck, Shield, Quote } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { track } from '@/lib/analytics';

/* ─── brand colors ─── */
const NAVY = '#002868';
const RED = '#B31942';

/* ─── background slideshow images ─── */
const BG_IMAGES = [
  '/images/whoware-bg-1.png',
  '/images/whoware-bg-2.png',
  '/images/whoware-bg-3.png',
];
const SLIDE_INTERVAL = 5000; // 5 seconds per slide

/* ─── counter hook ─── */
function useCounter(target: number, suffix = '', inView: boolean, duration = 1600) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let prev = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      if (current !== prev) {
        prev = current;
        setCount(current);
      }
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return `${count.toLocaleString()}${suffix}`;
}

/* ─── background slideshow (receives index from parent) ─── */
function BackgroundSlideshow({ current }: { current: number }) {
  return (
    <div className="absolute inset-0 z-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <Image
            src={BG_IMAGES[current]}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority={current === 0}
          />
        </motion.div>
      </AnimatePresence>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/55" />
      {/* Gradient fade at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}

/* ─── stat card ─── */
function StatCard({
  value,
  suffix,
  label,
  Icon,
  inView,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  inView: boolean;
  delay: number;
}) {
  const display = useCounter(value, suffix, inView);
  return (
    <ScrollReveal delay={delay}>
      <div className="group relative flex flex-col items-center rounded-2xl border border-white/20 bg-white/10 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 md:p-6">
        <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 bg-white/20">
          <Icon className="h-6 w-6 text-white" />
        </span>
        <span className="block text-3xl font-extrabold text-white md:text-4xl">
          {display}
        </span>
        <span className="mt-1 text-sm font-medium text-white/80">{label}</span>
      </div>
    </ScrollReveal>
  );
}

/* ─── stats data ─── */
const stats = [
  { value: 5000, suffix: '+', label: 'Students Placed', Icon: GraduationCap },
  { value: 99, suffix: '%', label: 'Success Rate', Icon: Star },
  { value: 20, suffix: '+', label: 'Countries Served', Icon: Globe },
  { value: 11, suffix: '+', label: 'Partner Universities', Icon: ShieldCheck },
];

/* ─── slide indicators ─── */
function SlideIndicators({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {BG_IMAGES.map((_, i) => (
        <span
          key={i}
          className={`block h-1.5 rounded-full transition-all duration-500 ${
            i === current ? 'w-8 bg-white' : 'w-1.5 bg-white/40'
          }`}
        />
      ))}
    </div>
  );
}

/* ─── main section ─── */
export default function WhoWeAreSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  // Single source of truth for slide index (shared by slideshow + indicators)
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (isInView) track.sectionView('who_we_are');
  }, [isInView]);

  // Single timer drives both the background images and the indicator dots
  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % BG_IMAGES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="who-we-are"
      ref={sectionRef}
      className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden py-16 md:py-24"
    >
      {/* Background Slideshow — synced via slideIndex prop */}
      <BackgroundSlideshow current={slideIndex} />

      {/* Content over slideshow */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ── Eyebrow ── */}
        <ScrollReveal className="flex items-center justify-center gap-3">
          <span className="h-px w-8 md:w-12 bg-white/60" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/90">
            WHO WE ARE
          </span>
          <span className="h-px w-8 md:w-12 bg-white/60" />
        </ScrollReveal>

        {/* ── Headline ── */}
        <ScrollReveal delay={0.1} className="mx-auto mt-6 max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
            Universal Consulting Service Group
          </h2>
        </ScrollReveal>

        {/* ── Sub-headline ── */}
        <ScrollReveal delay={0.15} className="mx-auto mt-4 max-w-2xl text-center">
          <p className="text-base leading-relaxed text-white/80 md:text-lg">
            Empowering international students with trusted guidance for U.S. university admissions,
            {' '}<strong className="font-bold text-white">Day 1 CPT programs</strong>,
            and visa success.
          </p>
        </ScrollReveal>

        {/* ── Founder Card ── */}
        <ScrollReveal delay={0.2} className="mt-12">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md md:p-10">
            {/* Shimmer overlay */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
              }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut' }}
            />

            <div className="relative z-0 flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
              {/* Left — Founder Image */}
              <div className="relative mx-auto w-full max-w-[220px] shrink-0 md:mx-0 md:max-w-[240px]">
                {/* Rotating border ring */}
                <motion.div
                  className="absolute -inset-[3px] rounded-2xl"
                  style={{
                    background: `conic-gradient(from 0deg, ${NAVY}, ${RED}, ${NAVY}, ${RED}, ${NAVY})`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                />
                <div className="relative h-60 w-full overflow-hidden rounded-2xl bg-gray-800 md:h-68">
                  <Image
                    src="/images/founder.jpg"
                    alt="Joy Chowdhury — Founder & CEO, Universal Consulting Service Group"
                    fill
                    className="object-cover object-top"
                    sizes="240px"
                    priority
                  />
                </div>
                {/* Name badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-5 py-1.5 shadow-lg ring-1 ring-white/20">
                  <span className="text-sm font-extrabold" style={{ color: NAVY }}>
                    Joy Chowdhury
                  </span>
                </div>
              </div>

              {/* Right — Founder Message */}
              <div className="flex-1 pt-4 md:pt-0">
                {/* Quote icon + Founder tag */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                    <Quote className="h-5 w-5 text-white" />
                  </div>
                  <span
                    className="inline-block rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-widest"
                    style={{ backgroundColor: RED, color: 'white' }}
                  >
                    Message from Our Founder
                  </span>
                </div>

                {/* The Message */}
                <div className="relative">
                  <span className="absolute -left-2 -top-3 text-6xl leading-none font-serif text-white/20">
                    &ldquo;
                  </span>
                  <p className="relative pl-6 text-base leading-[1.85] text-white/90 md:text-[17px]">
                    <strong className="font-bold text-white">
                      When I served in the United States Army, I learned that true leadership means
                      standing beside those you lead — not above them.
                    </strong>{' '}
                    That lesson became the foundation of UCSG. Every student who walks through our
                    doors carries a dream — and I take that dream as seriously as I took my oath of
                    service.
                  </p>
                </div>

                <div className="relative mt-5 pl-6">
                  <p className="text-base leading-[1.85] text-white/85 md:text-[17px]">
                    We are not just consultants. We are your advocates, your strategists, and your
                    partners in building a future in the United States. From your very first Day 1 CPT
                    opportunity to the moment you land your dream career —{' '}
                    <strong className="font-bold text-white">
                      we will be there, every single step of the way.
                    </strong>
                  </p>
                </div>

                <div className="relative mt-5 pl-6">
                  <p className="text-base leading-[1.85] text-white/85 md:text-[17px]">
                    With integrity as our compass and your success as our mission,{' '}
                    <strong className="font-bold text-white">
                      I personally promise you this: at UCSG, your American dream is in the safest
                      hands possible.
                    </strong>
                  </p>
                </div>

                {/* Closing quotation + signature */}
                <div className="mt-6 flex items-end justify-between gap-4 pl-6">
                  <span className="text-5xl leading-none font-serif text-white/20">
                    &rdquo;
                  </span>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      Joy Chowdhury
                    </p>
                    <p className="mt-0.5 text-xs text-white/70">
                      Founder & CEO, UCSG
                    </p>
                    <p className="mt-0.5 text-xs font-medium" style={{ color: RED }}>
                      U.S. Army Veteran
                    </p>
                  </div>
                </div>

                {/* Veteran-Owned Badge */}
                <div className="mt-6 pl-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm transition-shadow hover:bg-white/20">
                    <span
                      className="inline-flex h-7 w-7 items-center justify-center rounded-lg"
                      style={{ backgroundColor: NAVY }}
                    >
                      <Shield className="h-4 w-4 text-white" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: RED }}>
                        Veteran-owned
                      </span>
                      <span className="text-xs font-bold text-white">
                        U.S. Army Veteran
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Slide Indicators (synced with slideshow) ── */}
        <div className="mt-8">
          <SlideIndicators current={slideIndex} />
        </div>

        {/* ── Stats Grid ── */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-4 md:gap-6">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              Icon={stat.Icon}
              inView={isInView}
              delay={0.35 + i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
