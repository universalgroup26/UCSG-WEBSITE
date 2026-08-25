'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Phone, ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { track } from '@/lib/analytics';

/* ------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------ */

interface Props {
  onContactClick?: () => void;
}

interface Slide {
  eyebrow: string;
  headline: string;
  description: string;
  primaryCta: {
    label: string;
    type: 'assessment' | 'navigate' | 'link';
    navigateView?: string;
    navigateId?: string;
  };
  secondaryCta: {
    label: string;
    type: 'assessment' | 'navigate' | 'tel';
    tel?: string;
  };
  image: {
    src: string;
    alt: string;
    priority: boolean;
    unoptimized?: boolean;
  };
}

/* ------------------------------------------------------------------
 * Slide Data
 * ------------------------------------------------------------------ */

const slides: Slide[] = [
  {
    eyebrow: 'PERSONALIZED GUIDANCE FOR F-1 STUDENTS IN THE USA',
    headline: 'A Clearer Path to the Right U.S. Graduate Program',
    description:
      'Compare transfer-friendly universities, hybrid graduate programs, estimated costs, locations and academic requirements with personalized guidance from UCSG.',
    primaryCta: {
      label: 'Start 60-Second Assessment',
      type: 'assessment',
    },
    secondaryCta: {
      label: 'Talk With a Counselor',
      type: 'tel',
      tel: '+13028935594',
    },
    image: {
      src: '/images/ucsg-hero-slide1.png',
      alt: 'UCSG - Universal Consulting Service Group helping F-1 students find the right U.S. graduate program',
      priority: true,
      unoptimized: true,
    },
  },
  {
    eyebrow: 'UNIVERSITY TRANSFER SUPPORT',
    headline: 'Planning a University Transfer? Start With Clear Information.',
    description:
      'Understand program options, transfer requirements, estimated costs and the questions you should confirm with your current and prospective schools.',
    primaryCta: {
      label: 'Explore Transfer Support',
      type: 'assessment',
    },
    secondaryCta: {
      label: 'Request a Program Comparison',
      type: 'assessment',
    },
    image: {
      src: '/images/ucsg-hero-slide2.png',
      alt: 'Students collaborating with an advisor in a university library, discussing program transfer options with campus visible through the window',
      priority: false,
      unoptimized: true,
    },
  },
  {
    eyebrow: "MASTER\u2019S \u2022 PhD \u2022 DBA PROGRAM OPTIONS",
    headline: 'Compare Graduate Programs With Confidence',
    description:
      'Review program format, location, intake, estimated cost and academic requirements before deciding your next step.',
    primaryCta: {
      label: 'Compare Programs',
      type: 'navigate',
      navigateView: 'home',
      navigateId: 'programs',
    },
    secondaryCta: {
      label: 'Start Free Assessment',
      type: 'assessment',
    },
    image: {
      src: '/images/ucsg-hero-slide3.png',
      alt: 'Diverse team of professionals collaborating around a modern digital table in a contemporary office space at dusk',
      priority: false,
      unoptimized: true,
    },
  },
];

/* ------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------ */

const AUTOPLAY_INTERVAL = 7000;
const CROSSFADE_DURATION = 0.7;
const OVERLAY_DESKTOP =
  'linear-gradient(90deg, rgba(3,18,54,.96) 0%, rgba(4,28,73,.84) 38%, rgba(4,28,73,.38) 65%, rgba(4,28,73,.16) 100%)';
const OVERLAY_MOBILE =
  'linear-gradient(90deg, rgba(3,18,54,.98) 0%, rgba(4,28,73,.94) 50%, rgba(4,28,73,.82) 100%)';

/* ------------------------------------------------------------------
 * Component
 * ------------------------------------------------------------------ */

export default function HeroSection({ onContactClick }: Props) {
  /* ---- State ---- */
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(new Set([0]));
  const [manualChange, setManualChange] = useState(false);
  const [progress, setProgress] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const progressStartRef = useRef<number>(Date.now());
  const hasInteracted = useRef(false);
  const containerRef = useRef<HTMLElement>(null);

  /* ---- Reduced Motion ---- */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* ---- Visibility (pause when tab inactive) ---- */
  useEffect(() => {
    const handler = () => {
      setIsPaused(document.visibilityState !== 'visible');
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);

  /* ---- Autoplay ---- */
  useEffect(() => {
    if (prefersReducedMotion || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }

    progressStartRef.current = Date.now();
    setProgress(0);

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - progressStartRef.current;
      setProgress(Math.min(elapsed / AUTOPLAY_INTERVAL, 1));
    }, 50);

    timerRef.current = setInterval(() => {
      setDirection(1);
      setManualChange(false);
      setCurrent((prev) => (prev + 1) % slides.length);
      progressStartRef.current = Date.now();
      setProgress(0);
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPaused, prefersReducedMotion, current]);

  /* ---- Idle preloading ---- */
  useEffect(() => {
    if (prefersReducedMotion) return;

    const preloadSlide2 = () => {
      if (!loadedSlides.has(1)) {
        const img = new window.Image();
        img.src = slides[1].image.src;
        img.onload = () => {
          setLoadedSlides((prev) => {
            const next = new Set(prev);
            next.add(1);
            return next;
          });
        };
      }
    };

    const preloadOnIdle = () => {
      if (hasInteracted.current) {
        preloadSlide2();
        return;
      }
      const fallback = setTimeout(preloadSlide2, 3000);
      return () => clearTimeout(fallback);
    };

    const cleanup = preloadOnIdle();
    const onFirstInteraction = () => {
      if (!hasInteracted.current) {
        hasInteracted.current = true;
        preloadSlide2();
      }
    };

    window.addEventListener('pointerdown', onFirstInteraction, { once: true });
    window.addEventListener('touchstart', onFirstInteraction, { once: true });
    window.addEventListener('keydown', onFirstInteraction, { once: true });

    return () => {
      cleanup?.();
      window.removeEventListener('pointerdown', onFirstInteraction);
      window.removeEventListener('touchstart', onFirstInteraction);
      window.removeEventListener('keydown', onFirstInteraction);
    };
  }, [prefersReducedMotion, loadedSlides]);

  /* ---- Preload slide 3 after slide 2 loaded ---- */
  useEffect(() => {
    if (loadedSlides.has(2) || !loadedSlides.has(1)) return;
    const img = new window.Image();
    img.src = slides[2].image.src;
    img.onload = () => {
      setLoadedSlides((prev) => {
        const next = new Set(prev);
        next.add(2);
        return next;
      });
    };
  }, [loadedSlides]);

  /* ---- Navigation ---- */
  const goToSlide = useCallback(
    (index: number) => {
      if (index === current) return;
      setDirection(index > current ? 1 : -1);
      setManualChange(true);
      setCurrent(index);
      progressStartRef.current = Date.now();
      setProgress(0);
      track.sectionView(`hero_slide_${index}`);
    },
    [current],
  );

  const goNext = useCallback(() => {
    goToSlide((current + 1) % slides.length);
  }, [current, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide((current - 1 + slides.length) % slides.length);
  }, [current, goToSlide]);

  /* ---- CTA Handlers ---- */
  const handlePrimaryCta = useCallback(
    (slide: Slide) => {
      track.ctaClick({
        cta_type: 'apply',
        cta_source: 'hero',
        cta_text: slide.primaryCta.label,
      });
      switch (slide.primaryCta.type) {
        case 'assessment':
          window.dispatchEvent(
            new CustomEvent('ucsg-assessment', { detail: { open: 'assessment' } }),
          );
          break;
        case 'navigate':
          window.dispatchEvent(
            new CustomEvent('ucsg-navigate', {
              detail: {
                view: slide.primaryCta.navigateView,
                id: slide.primaryCta.navigateId,
              },
            }),
          );
          break;
      }
    },
    [],
  );

  const handleSecondaryCta = useCallback(
    (slide: Slide) => {
      track.ctaClick({
        cta_type: slide.secondaryCta.type === 'tel' ? 'call' : 'apply',
        cta_source: 'hero',
        cta_text: slide.secondaryCta.label,
        cta_url: slide.secondaryCta.type === 'tel' ? `tel:${slide.secondaryCta.tel}` : undefined,
      });
      switch (slide.secondaryCta.type) {
        case 'assessment':
          window.dispatchEvent(
            new CustomEvent('ucsg-assessment', { detail: { open: 'assessment' } }),
          );
          break;
        case 'tel':
          window.location.href = `tel:${slide.secondaryCta.tel}`;
          break;
        case 'navigate':
          onContactClick?.();
          break;
      }
    },
    [onContactClick],
  );

  /* ---- Touch / Swipe ---- */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback(() => {
    /* Just track movement — decision on touchEnd */
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      touchStartX.current = null;
      touchStartY.current = null;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0) goNext();
        else goPrev();
      }
    },
    [goNext, goPrev],
  );

  /* ---- Focus pause ---- */
  const handleFocusIn = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleFocusOut = useCallback(() => {
    setIsPaused(false);
  }, []);

  /* ---- Animation Variants ---- */
  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0 }),
    center: { opacity: 1 },
    exit: (dir: number) => ({ opacity: 0 }),
  };

  const copyVariants = {
    initial: { opacity: 0, y: 24 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
    },
  };

  const bgVariants = prefersReducedMotion
    ? {}
    : {
        initial: { scale: 1.04, x: -4 },
        animate: {
          scale: 1,
          x: 0,
          transition: { duration: 7, ease: 'linear' },
        },
      };

  /* ---- Reduced Motion: Show only slide 1, no slideshow ---- */
  if (prefersReducedMotion) {
    const slide = slides[0];
    return (
      <section
        className="relative min-h-[720px] md:min-h-[680px] lg:min-h-[760px] overflow-hidden"
        aria-label="Hero"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={slide.image.src}
            alt={slide.image.alt}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
            fetchPriority="high"
          />
          <div
            className="absolute inset-0 md:hidden"
            style={{ background: OVERLAY_MOBILE }}
          />
          <div
            className="absolute inset-0 hidden md:block"
            style={{ background: OVERLAY_DESKTOP }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex min-h-[720px] md:min-h-[680px] lg:min-h-[760px] items-center">
          <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-[60%] flex flex-col items-start">
              {/* Company Name */}
              <div className="mb-6">
                <h2 className="font-heading text-xl font-black tracking-tight text-white sm:text-2xl lg:text-[1.7rem]">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-[#D6A84B] bg-clip-text text-transparent">
                    Universal Consulting Service Group
                  </span>
                </h2>
                <div className="mt-2 h-[2px] w-16 rounded-full bg-gradient-to-r from-[#D6A84B] to-transparent" />
              </div>

              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#D6A84B] sm:text-base">
                {slide.eyebrow}
              </p>
              <h1 className="font-heading text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-[2.75rem] lg:text-5xl">
                {slide.headline}
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-blue-100/80 sm:text-lg">
                {slide.description}
              </p>
              <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:w-auto sm:gap-4">
                <Button
                  size="lg"
                  className="h-12 w-full rounded-lg bg-[#0874F9] px-6 text-base font-semibold text-white shadow-lg shadow-[#0874F9]/25 hover:bg-[#0660D4] focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061846] sm:w-auto sm:px-8"
                  onClick={() => handlePrimaryCta(slide)}
                >
                  {slide.primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="h-12 w-full rounded-lg border-white/25 bg-transparent px-6 text-base font-semibold text-white hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061846] sm:w-auto sm:px-8"
                  onClick={() => handleSecondaryCta(slide)}
                >
                  <a href={`tel:${slide.secondaryCta.tel}`}>
                    <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                    {slide.secondaryCta.label}
                  </a>
                </Button>
              </div>
              {/* Veteran Trust Badge */}
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#D6A84B]/25 bg-[#D6A84B]/[0.08] px-3 py-1.5">
                <ShieldCheck className="h-4 w-4 text-[#D6A84B]" aria-hidden="true" />
                <span className="text-xs font-medium tracking-wide text-[#D6A84B] sm:text-sm">
                  Founded and Led by a U.S. Army Veteran
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---- Active Slide ---- */
  const activeSlide = slides[current];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[720px] md:min-h-[680px] lg:min-h-[760px] overflow-hidden"
      aria-label="Hero slideshow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onFocus={handleFocusIn}
      onBlur={handleFocusOut}
    >
      {/* ===== Background Slides ===== */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: CROSSFADE_DURATION, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0"
            variants={bgVariants}
            initial="initial"
            animate="animate"
          >
            <Image
              src={activeSlide.image.src}
              alt={activeSlide.image.alt}
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority={activeSlide.image.priority}
              fetchPriority={activeSlide.image.priority ? 'high' : undefined}
              unoptimized={activeSlide.image.unoptimized}
            />
          </motion.div>

          {/* Navy overlay — heavier on mobile */}
          <div
            className="absolute inset-0 md:hidden"
            style={{ background: OVERLAY_MOBILE }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 hidden md:block"
            style={{ background: OVERLAY_DESKTOP }}
            aria-hidden="true"
          />
        </motion.div>
      </AnimatePresence>

      {/* ===== Content ===== */}
      <div className="relative z-10 flex min-h-[720px] md:min-h-[680px] lg:min-h-[760px] items-center">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={copyVariants}
              initial="initial"
              animate="animate"
              className="max-w-[60%] flex flex-col items-start"
            >
              {/* Company Name */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.05,
                }}
              >
                <h2 className="font-heading text-xl font-black tracking-tight text-white sm:text-2xl lg:text-[1.7rem]">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-[#D6A84B] bg-clip-text text-transparent">
                    Universal Consulting Service Group
                  </span>
                </h2>
                <div className="mt-2 h-[2px] w-16 rounded-full bg-gradient-to-r from-[#D6A84B] to-transparent" />
              </motion.div>

              {/* Eyebrow */}
              <motion.p
                className="mb-4 text-sm font-medium uppercase tracking-widest text-[#D6A84B] sm:text-base"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.15,
                }}
              >
                {activeSlide.eyebrow}
              </motion.p>

              {/* Headline */}
              <motion.h1
                className="font-heading text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-[2.75rem] lg:text-5xl"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.25,
                }}
              >
                {activeSlide.headline}
              </motion.h1>

              {/* Description */}
              <motion.p
                className="mt-6 max-w-lg text-base leading-relaxed text-blue-100/80 sm:text-lg"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.35,
                }}
              >
                {activeSlide.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:w-auto sm:gap-4"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.45,
                }}
              >
                <Button
                  size="lg"
                  className="h-12 w-full rounded-lg bg-[#0874F9] px-6 text-base font-semibold text-white shadow-lg shadow-[#0874F9]/25 hover:bg-[#0660D4] focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061846] sm:w-auto sm:px-8"
                  onClick={() => handlePrimaryCta(activeSlide)}
                >
                  {activeSlide.primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full rounded-lg border-white/25 bg-transparent px-6 text-base font-semibold text-white hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061846] sm:w-auto sm:px-8"
                  onClick={() => handleSecondaryCta(activeSlide)}
                >
                  {activeSlide.secondaryCta.type === 'tel' && (
                    <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                  )}
                  {activeSlide.secondaryCta.label}
                </Button>
              </motion.div>

              {/* Veteran Trust Badge */}
              <motion.div
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#D6A84B]/25 bg-[#D6A84B]/[0.08] px-3 py-1.5"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.55,
                }}
              >
                <ShieldCheck className="h-4 w-4 text-[#D6A84B]" aria-hidden="true" />
                <span className="text-xs font-medium tracking-wide text-[#D6A84B] sm:text-sm">
                  Founded and Led by a U.S. Army Veteran
                </span>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ===== Previous / Next Arrows ===== */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={goPrev}
        className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061846] sm:h-12 sm:w-12"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={goNext}
        className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061846] sm:h-12 sm:w-12"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* ===== Bottom Controls: Progress Bar + Dots ===== */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex flex-col items-center gap-3 px-4">
        {/* Progress Bar */}
        <div
          className="h-[3px] w-full max-w-[200px] overflow-hidden rounded-full bg-white/20"
          role="progressbar"
          aria-label={`Slide ${current + 1} of ${slides.length} — ${Math.round(progress * 100)}% elapsed`}
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <motion.div
            className="h-full rounded-full bg-[#D6A84B]"
            style={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.05, ease: 'linear' }}
          />
        </div>

        {/* Pagination Dots */}
        <div
          role="tablist"
          aria-label="Slideshow navigation"
          className="flex items-center gap-2"
        >
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === current}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => goToSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6A84B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061846] ${
                idx === current
                  ? 'w-8 bg-[#D6A84B]'
                  : 'w-2.5 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ===== aria-live region for manual slide changes ===== */}
      {manualChange && (
        <div aria-live="polite" className="sr-only">
          Slide {current + 1} of {slides.length}: {activeSlide.headline}
        </div>
      )}
    </section>
  );
}
