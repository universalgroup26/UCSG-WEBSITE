'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  Star,
  ArrowRight,
  Phone,
  GraduationCap,
  Building2,
  Shield,
  FileCheck,
  RefreshCw,
  Users,
  Trophy,
  Building,
  TrendingUp,
  Heart,
  Eye,
  UserCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AnimatedHeading } from '@/components/animations/TextReveal';
import { universities } from '@/lib/data/universities';
import { track } from '@/lib/analytics';

/* ------------------------------------------------------------------
 * About Page Slider Data
 * ------------------------------------------------------------------ */

const aboutSlides = [
  { src: '/images/about-slider-1.png', alt: 'UCSG team supporting international students' },
  { src: '/images/about-slider-2.png', alt: 'UCSG educational consulting services' },
  { src: '/images/about-slider-3.png', alt: 'UCSG guiding F-1 students to success' },
];

const ABOUT_AUTOPLAY_INTERVAL = 6000;
const ABOUT_CROSSFADE_DURATION = 0.8;
const ABOUT_OVERLAY_DESKTOP =
  'linear-gradient(90deg, rgba(3,18,54,.94) 0%, rgba(4,28,73,.82) 40%, rgba(4,28,73,.40) 70%, rgba(4,28,73,.18) 100%)';
const ABOUT_OVERLAY_MOBILE =
  'linear-gradient(90deg, rgba(3,18,54,.97) 0%, rgba(4,28,73,.92) 50%, rgba(4,28,73,.78) 100%)';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
interface ServiceBranch {
  icon: React.ElementType;
  title: string;
  color: string;
  bg: string;
  border: string;
  subItems: string[];
}

const serviceBranches: ServiceBranch[] = [
  {
    icon: GraduationCap,
    title: 'University Transfers',
    color: '#059669',
    bg: '#D1FAE5',
    border: '#6EE7B7',
    subItems: ['SEVIS Transfer', 'Emergency 24-48hr', 'Credit Evaluation'],
  },
  {
    icon: Building2,
    title: 'Day 1 CPT',
    color: '#002868',
    bg: '#EFF6FF',
    border: '#BFDBFE',
    subItems: ['Work from Day 1', '11+ Universities', 'Full/Part-time'],
  },
  {
    icon: Shield,
    title: 'Change of Status',
    color: '#7C3AED',
    bg: '#EDE9FE',
    border: '#C4B5FD',
    subItems: ['B1/B2 → F1', 'H4 → F1', 'J1/J2 → F1'],
  },
  {
    icon: FileCheck,
    title: 'STEM OPT',
    color: '#DC2626',
    bg: '#FEE2E2',
    border: '#FCA5A5',
    subItems: ['24-Month Extension', 'RFE Response', 'Backup CPT Plan'],
  },
  {
    icon: RefreshCw,
    title: 'Student Support',
    color: '#D97706',
    bg: '#FEF3C7',
    border: '#FCD34D',
    subItems: ['I-20 Extension', 'SEVIS Reinstatement', 'H-1B Guidance'],
  },
];

const stats = [
  { icon: Trophy, value: 10, suffix: '+', label: 'Years of Service', color: '#D6A84B' },
  { icon: Users, value: 5000, suffix: '+', label: 'Students Helped', color: '#0874F9' },
  { icon: Building, value: 45, suffix: '+', label: 'University Partners', color: '#059669' },
  { icon: TrendingUp, value: 98, suffix: '%', label: 'Satisfaction Rate', color: '#061846' },
];

const values = [
  {
    icon: UserCheck,
    title: 'Service',
    description:
      'Every interaction is guided by genuine care. We measure success by the outcomes our students achieve, not by the fees we collect.',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description:
      'Honest, transparent guidance you can trust. We present facts clearly and never overpromise results or misrepresent programs.',
  },
  {
    icon: Eye,
    title: 'Clarity',
    description:
      'Complex immigration pathways explained in plain language. We break down every step so you always know what comes next.',
  },
  {
    icon: Heart,
    title: 'Student-First Support',
    description:
      'Your goals drive every recommendation. From first consultation to graduation day, our team stands beside you at every stage.',
  },
];

/* ------------------------------------------------------------------ */
/*  Animated Counter                                                   */
/* ------------------------------------------------------------------ */
function AnimatedCounter({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  const formatted = count >= 1000 ? count.toLocaleString() : count;

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Veteran Badge                                                      */
/* ------------------------------------------------------------------ */
function VeteranBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-[#D6A84B] px-3 py-1 text-xs font-semibold text-[#061846] ${className}`}
    >
      <Star className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true" />
      U.S. Army Veteran
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  University Scrolling Rail                                           */
/* ------------------------------------------------------------------ */
const LOGO_CARD_WIDTH = 180;
const LOGO_CARD_GAP = 16;
const LOGO_SCROLL_SPEED = 0.5;

function UniversityScrollRail() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  const handlePause = useCallback(() => {
    setPaused(true);
    pausedRef.current = true;
  }, []);

  const handleResume = useCallback(() => {
    setPaused(false);
    pausedRef.current = false;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = scrollRef.current;
    if (!el) return;

    let lastTime = performance.now();

    const tick = (now: number) => {
      if (!pausedRef.current) {
        const delta = now - lastTime;
        const px = (LOGO_SCROLL_SPEED * delta) / 16;
        el.scrollLeft += px;

        const singleSetWidth = universities.length * (LOGO_CARD_WIDTH + LOGO_CARD_GAP);
        if (el.scrollLeft >= singleSetWidth) {
          el.scrollLeft -= singleSetWidth;
        }
        if (el.scrollLeft < 0) {
          el.scrollLeft += singleSetWidth;
        }
      }
      lastTime = now;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [prefersReducedMotion]);

  const doubled = [...universities, ...universities];

  return (
    <div className="group/rail relative">
      <div
        ref={scrollRef}
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
        onFocus={handlePause}
        onBlur={handleResume}
        className={
          'flex gap-4 overflow-hidden ' +
          '[mask-image:linear-gradient(to_right,transparent_0%,black_4%,black_96%,transparent_100%)]'
        }
        role="list"
        aria-label="Partner universities"
      >
        {doubled.map((uni, i) => (
          <div
            key={`${uni.id}-${i}`}
            role="listitem"
            className="flex-shrink-0"
            style={{ width: LOGO_CARD_WIDTH }}
          >
            <div className="flex h-28 w-[180px] flex-col items-center justify-center gap-2 rounded-xl border border-[#061846]/8 bg-white/80 p-4 transition-all duration-300 hover:border-[#D6A84B]/30 hover:shadow-md">
              <div className="flex h-12 w-full items-center justify-center">
                <Image
                  src={uni.logoPath}
                  alt={`${uni.shortName} logo`}
                  width={100}
                  height={40}
                  className="max-h-10 max-w-[100px] object-contain"
                  loading="lazy"
                />
              </div>
              <p className="text-center text-[12px] font-semibold leading-tight text-[#061846] line-clamp-2">
                {uni.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mindmap Branch (Desktop)                                            */
/* ------------------------------------------------------------------ */
function MindmapBranch({
  branch,
  index,
  isInView,
}: {
  branch: ServiceBranch;
  index: number;
  isInView: boolean;
}) {
  const Icon = branch.icon;
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.3 + index * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <div
        className="flex flex-col rounded-2xl border p-5 sm:p-6"
        style={{ borderColor: branch.border, backgroundColor: branch.bg }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-md"
            style={{ backgroundColor: branch.color }}
            whileHover={{ rotate: [0, -6, 6, 0], scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            <Icon className="h-6 w-6 text-white" />
          </motion.div>
          <h3 className="text-base font-bold text-[#0F172A] sm:text-lg">{branch.title}</h3>
        </div>
        <div className="mt-4 space-y-2">
          {branch.subItems.map((item, j) => (
            <motion.div
              key={item}
              className="flex items-center gap-2 rounded-lg bg-white/60 px-3 py-2"
              initial={{ opacity: 0, x: -8 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.12 + j * 0.08, duration: 0.3 }}
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: branch.color }} />
              <span className="text-sm font-medium text-[#0F172A]">{item}</span>
              <ArrowRight className="ml-auto h-3 w-3 text-[#6B7280] opacity-50" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  About Page Hero Slider Component                                  */
/* ------------------------------------------------------------------ */
function AboutHeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion] = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressStartRef = useRef<number>(Date.now());
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  /* ---- Visibility (pause when tab inactive) ---- */
  useEffect(() => {
    const handler = () => setIsPaused(document.visibilityState !== 'visible');
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
      setProgress(Math.min(elapsed / ABOUT_AUTOPLAY_INTERVAL, 1));
    }, 50);

    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % aboutSlides.length);
      progressStartRef.current = Date.now();
      setProgress(0);
    }, ABOUT_AUTOPLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPaused, prefersReducedMotion, current]);

  /* ---- Navigation ---- */
  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % aboutSlides.length);
    progressStartRef.current = Date.now();
    setProgress(0);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + aboutSlides.length) % aboutSlides.length);
    progressStartRef.current = Date.now();
    setProgress(0);
  }, []);

  /* ---- Touch / Swipe ---- */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
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

  /* ---- Animation Variants ---- */
  const slideVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const bgVariants = prefersReducedMotion
    ? {}
    : {
        initial: { scale: 1.05 },
        animate: {
          scale: 1,
          transition: { duration: 6, ease: 'easeOut' as const },
        },
      };

  /* ---- Reduced Motion: Show only first slide ---- */
  if (prefersReducedMotion) {
    const slide = aboutSlides[0];
    return (
      <section className="relative min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] overflow-hidden" aria-label="About hero">
        <div className="absolute inset-0">
          <Image src={slide.src} alt={slide.alt} fill sizes="100vw" className="object-cover object-center" priority />
          <div className="absolute inset-0 md:hidden" style={{ background: ABOUT_OVERLAY_MOBILE }} />
          <div className="absolute inset-0 hidden md:block" style={{ background: ABOUT_OVERLAY_DESKTOP }} />
        </div>
        <div className="relative z-10 flex min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 flex items-center justify-center gap-2">
                <div className="h-px w-8 bg-[#D6A84B]/50" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6A84B]">Our Story</span>
                <div className="h-px w-8 bg-[#D6A84B]/50" />
              </div>
              <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                About Universal Consulting <span className="text-[#D6A84B]">Service Group</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                Founded by a U.S. Army Veteran, UCSG provides trusted educational
                guidance for F-1 students navigating university transfers, CPT
                authorization, and immigration pathways.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---- Active Slide ---- */
  const activeSlide = aboutSlides[current];

  return (
    <section
      className="relative min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] overflow-hidden"
      aria-label="About hero slideshow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ===== Background Slides ===== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: ABOUT_CROSSFADE_DURATION, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <motion.div className="absolute inset-0" variants={bgVariants} initial="initial" animate="animate">
            <Image
              src={activeSlide.src}
              alt={activeSlide.alt}
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority={current === 0}
              unoptimized
            />
          </motion.div>

          {/* Navy overlay — heavier on mobile */}
          <div className="absolute inset-0 md:hidden" style={{ background: ABOUT_OVERLAY_MOBILE }} aria-hidden="true" />
          <div className="absolute inset-0 hidden md:block" style={{ background: ABOUT_OVERLAY_DESKTOP }} aria-hidden="true" />
        </motion.div>
      </AnimatePresence>

      {/* ===== Content ===== */}
      <div className="relative z-10 flex min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] items-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              className="mb-6 flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <div className="h-px w-8 bg-[#D6A84B]/50" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6A84B]">
                Our Story
              </span>
              <div className="h-px w-8 bg-[#D6A84B]/50" />
            </motion.div>

            <motion.h1
              className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            >
              About Universal Consulting{' '}
              <span className="text-[#D6A84B]">Service Group</span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              Founded by a U.S. Army Veteran, UCSG provides trusted educational
              guidance for F-1 students navigating university transfers, CPT
              authorization, and immigration pathways.
            </motion.p>
          </div>
        </div>
      </div>

      {/* ===== Navigation Arrows ===== */}
      <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-3 sm:px-6 pointer-events-none">
        <button
          onClick={goPrev}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 transition-all hover:bg-white/20 hover:text-white focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={goNext}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 transition-all hover:bg-white/20 hover:text-white focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* ===== Progress Bar ===== */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/10" aria-hidden="true">
        <motion.div
          className="h-full bg-[#D6A84B]"
          style={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.05 }}
        />
      </div>

      {/* ===== Dot Indicators ===== */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2" aria-label="Slide indicators">
        {aboutSlides.map((slide, i) => (
          <button
            key={slide.src}
            onClick={() => {
              setCurrent(i);
              progressStartRef.current = Date.now();
              setProgress(0);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-[#D6A84B]' : 'w-2 bg-white/40 hover:bg-white/60'}`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current ? 'true' : undefined}
          />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main About Page Component                                          */
/* ------------------------------------------------------------------ */
interface AboutPageProps {
  onBack: () => void;
}

export default function AboutPage({ onBack }: AboutPageProps) {
  const mindmapRef = useRef(null);
  const statsRef = useRef(null);
  const uniRef = useRef(null);
  const isMindmapInView = useInView(mindmapRef, { once: true, margin: '-80px' });
  const isStatsInView = useInView(statsRef, { once: true, margin: '-60px' });
  const isUniInView = useInView(uniRef, { once: true, amount: 0.2 });

  const handleAssessmentClick = () => {
    track.ctaClick({
      cta_type: 'assessment',
      cta_source: 'about_page_cta',
      cta_text: 'Start Free 60-Second Assessment',
    });
    window.dispatchEvent(
      new CustomEvent('ucsg-assessment', { detail: { open: 'assessment' } }),
    );
  };

  const handlePhoneClick = () => {
    track.ctaClick({
      cta_type: 'phone',
      cta_source: 'about_page_cta',
      cta_text: 'Talk With Our Team',
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ──────────────────────────────── Back Bar ──────────────────────────────── */}
      <motion.div
        className="border-b border-gray-100 bg-gray-50/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#061846]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </div>
      </motion.div>

      {/* ──────────────────────────────── Hero Slider ──────────────────────────────── */}
      <AboutHeroSlider />

      {/* ──────────────────────────────── Founder Section ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        {/* Decorative blue swoosh */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2" aria-hidden="true">
          <svg
            className="absolute right-0 top-0 h-full w-full text-[#0874F9]/[0.04]"
            viewBox="0 0 600 800"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M600 0 C400 100 350 300 380 500 C410 700 500 800 600 800 Z" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* LEFT: Founder Image — Full Width */}
            <motion.div
              className="relative flex justify-center lg:order-1 lg:justify-start"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <div className="relative w-full">
                <div
                  className="relative overflow-hidden rounded-2xl"
                  style={{
                    boxShadow:
                      '0 20px 60px -12px rgba(6, 24, 70, 0.15), 0 8px 24px -8px rgba(6, 24, 70, 0.1)',
                  }}
                >
                  <Image
                    src="/images/founder-full.png"
                    alt="Joy Chowdhury, U.S. Army Veteran, Founder & CEO of UCSG"
                    width={1672}
                    height={941}
                    className="h-auto w-full object-contain"
                    sizes="(max-width: 1024px) 90vw, 50vw"
                    priority
                  />
                </div>

                {/* Decorative accent bar behind portrait */}
                <div
                  className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-2xl bg-[#0874F9]/10"
                  aria-hidden="true"
                />

                {/* Gold corner accent */}
                <div
                  className="absolute -top-2 -left-2 h-16 w-16 rounded-tl-2xl border-l-2 border-t-2 border-[#D6A84B]"
                  aria-hidden="true"
                />

                {/* Floating veteran badge on portrait */}
                <motion.div
                  className="absolute bottom-5 right-5"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  <VeteranBadge />
                </motion.div>
              </div>
            </motion.div>

            {/* RIGHT: Text Content */}
            <div className="flex flex-col gap-5 lg:order-2 lg:gap-6">
              {/* Veteran badge */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0}>
                <VeteranBadge />
              </motion.div>

              {/* Name & Title */}
              <motion.h2
                className="font-heading text-2xl font-bold leading-tight tracking-tight text-[#061846] sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15]"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={1}
              >
                Joy Chowdhury
              </motion.h2>

              <motion.p
                className="text-lg font-medium text-[#0874F9]"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={1.5}
              >
                Founder &amp; CEO, Universal Consulting Service Group
              </motion.p>

              {/* Gold accent line */}
              <motion.div
                className="h-1 w-16 rounded-full bg-[#D6A84B]"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
              />

              {/* Founder Quote */}
              <motion.blockquote
                className="relative border-l-2 border-[#0874F9]/30 pl-5"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={2}
              >
                <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                  &ldquo;When I served in the United States Army, I learned that
                  leadership begins with responsibility, discipline and standing
                  beside the people who depend on you. I built UCSG on those same
                  values. Every student deserves clear information, honest guidance
                  and a team that respects the importance of their educational
                  journey.&rdquo;
                </p>
              </motion.blockquote>

              {/* About description */}
              <motion.p
                className="text-base leading-relaxed text-slate-500"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={3}
              >
                Based in Jackson Heights, New York, UCSG provides educational
                guidance, program research, application coordination and student
                support for F-1 students exploring university transfers and
                graduate-program options in the United States.
              </motion.p>

              {/* Value chips */}
              <motion.div
                className="flex flex-wrap gap-2.5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {values.map((v, i) => {
                  const Icon = v.icon;
                  return (
                    <motion.span
                      key={v.title}
                      className="inline-flex items-center gap-2 rounded-full border border-[#061846]/10 bg-[#EDF5FF] px-4 py-2 text-sm font-medium text-[#061846]"
                      variants={fadeUp}
                      custom={4 + i * 0.08}
                    >
                      <Icon className="h-4 w-4 text-[#0874F9]" aria-hidden="true" />
                      {v.title}
                    </motion.span>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────── Mindmap Section ──────────────────────────────── */}
      <section ref={mindmapRef} className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="Service Ecosystem"
            title="How UCSG Covers Every Angle"
            description="One consultation, complete coverage — every immigration challenge solved"
            badgeColor="#061846"
          />

          {/* Desktop mindmap layout */}
          <div className="hidden lg:block">
            <div className="relative mx-auto mt-12 max-w-6xl">
              {/* Center node */}
              <motion.div
                className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, opacity: 0 }}
                animate={isMindmapInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              >
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#061846] to-[#001B4D] text-center shadow-2xl">
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-blue-200">UNIVERSAL</p>
                    <p className="text-xl font-extrabold text-white">UCSG</p>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-6 py-4">
                <MindmapBranch branch={serviceBranches[0]} index={0} isInView={isMindmapInView} />
                <MindmapBranch branch={serviceBranches[1]} index={1} isInView={isMindmapInView} />
                <MindmapBranch branch={serviceBranches[2]} index={2} isInView={isMindmapInView} />
                <MindmapBranch branch={serviceBranches[3]} index={3} isInView={isMindmapInView} />
                <div className="col-span-2 flex justify-center">
                  <MindmapBranch branch={serviceBranches[4]} index={4} isInView={isMindmapInView} />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile mindmap layout */}
          <div className="mt-10 space-y-4 lg:hidden">
            <motion.div
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#061846] to-[#001B4D] shadow-xl"
              initial={{ scale: 0 }}
              animate={isMindmapInView ? { scale: 1 } : {}}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
            >
              <p className="text-lg font-extrabold text-white">UCSG</p>
            </motion.div>

            <div className="mx-auto h-4 w-0.5 bg-[#BFDBFE]" />

            <div className="space-y-3">
              {serviceBranches.map((branch, i) => {
                const Icon = branch.icon;
                return (
                  <motion.div
                    key={branch.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isMindmapInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                  >
                    <div
                      className="rounded-xl border p-4 sm:p-5"
                      style={{ borderColor: branch.border, backgroundColor: branch.bg }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                          style={{ backgroundColor: branch.color }}
                        >
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-bold text-[#0F172A] sm:text-base">{branch.title}</h3>
                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            {branch.subItems.map((item) => (
                              <span
                                key={item}
                                className="inline-flex items-center gap-1 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-medium text-[#0F172A] sm:text-xs"
                              >
                                <CheckCircle2 className="h-3 w-3" style={{ color: branch.color }} />
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────── Infographic / Stats Section ──────────────────────────────── */}
      <section ref={statsRef} className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        {/* Subtle background pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 80%, #061846 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="By the Numbers"
            title="Trusted by Thousands of Students"
            description="A decade of dedicated service helping international students achieve their American education goals"
            badgeColor="#D6A84B"
          />

          <motion.div
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  className="group relative rounded-2xl border border-[#061846]/8 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#D6A84B]/30"
                >
                  {/* Gold top accent line */}
                  <div
                    className="absolute left-1/2 top-0 h-1 w-12 -translate-x-1/2 rounded-b-full"
                    style={{ backgroundColor: stat.color }}
                  />

                  <div
                    className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${stat.color}10` }}
                  >
                    <Icon className="h-7 w-7" style={{ color: stat.color }} />
                  </div>

                  <p
                    className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl"
                    style={{ color: stat.color }}
                  >
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} isInView={isStatsInView} />
                  </p>

                  <p className="mt-2 text-sm font-medium text-[#6B7280]">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────── University Scrolling Marquee ──────────────────────────────── */}
      <section ref={uniRef} className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-10 text-center md:mb-14"
            initial={{ opacity: 0, y: 16 }}
            animate={isUniInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Badge
              className="mb-4 border-[#D6A84B]/30 bg-[#D6A84B]/10 text-[#D6A84B] hover:bg-[#D6A84B]/15"
            >
              Our Network
            </Badge>
            <h2 className="mt-3 font-heading text-2xl font-bold text-[#061846] sm:text-3xl md:text-4xl">
              Trusted by {universities.length}+ Partner Universities
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-[#6B7280]">
              Accredited institutions across the United States offering Day 1 CPT, STEM OPT, and flexible graduate programs.
            </p>
          </motion.div>

          <UniversityScrollRail />
        </div>
      </section>

      {/* ──────────────────────────────── Values Section ──────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="Our Values"
            title="What We Stand For"
            description="These core values guide every decision, every recommendation, and every student interaction at UCSG."
            badgeColor="#061846"
          />

          <motion.div
            className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl border border-[#061846]/8 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#0874F9]/20"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#061846]/5 transition-colors duration-300 group-hover:bg-[#0874F9]/10">
                    <Icon className="h-6 w-6 text-[#061846] transition-colors duration-300 group-hover:text-[#0874F9]" />
                  </div>

                  <h3 className="font-heading text-lg font-bold text-[#061846]">{value.title}</h3>

                  {/* Gold underline */}
                  <div className="mt-2 h-0.5 w-8 rounded-full bg-[#D6A84B] transition-all duration-300 group-hover:w-12" />

                  <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────── CTA Section (Footer-style) ──────────────────────────────── */}
      <section
        aria-label="Call to action"
        className="relative w-full overflow-hidden bg-gradient-to-b from-[#061846] to-[#092B68] py-16 sm:py-20 lg:py-24"
      >
        {/* Subtle glow effect */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-[3] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0874F9]/[0.07] blur-3xl"
          aria-hidden="true"
        />

        {/* Decorative orbit lines */}
        <div className="ucsg-orbit-lines pointer-events-none absolute inset-0 z-[2]" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          {/* Eyebrow */}
          <motion.p
            className="mb-3 text-sm font-medium uppercase tracking-widest text-[#D6A84B] sm:mb-4 sm:text-base"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
          >
            READY TO TAKE THE NEXT STEP?
          </motion.p>

          {/* Heading */}
          <motion.h2
            className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={1}
          >
            Ready to Start Your Journey?
          </motion.h2>

          {/* Description */}
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:mt-6 sm:text-lg"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={2}
          >
            Whether you&apos;re exploring a university transfer, comparing graduate
            programs, or need help understanding your F-1 options, start with a
            free, no-obligation assessment.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row sm:gap-5"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={3}
          >
            <button
              type="button"
              onClick={handleAssessmentClick}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#0874F9] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#0874F9]/25 transition-all duration-300 hover:bg-[#0660D4] hover:shadow-xl hover:shadow-[#0874F9]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061846] sm:w-auto sm:px-8"
            >
              Start Free 60-Second Assessment
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </button>

            <a
              href="tel:+13028935594"
              onClick={handlePhoneClick}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061846] sm:w-auto sm:px-8"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Talk With Our Team
            </a>
          </motion.div>

          {/* Availability note */}
          <motion.p
            className="mt-6 text-xs text-white/40 sm:mt-8 sm:text-sm"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={4}
          >
            Available by phone, WhatsApp, or email during business hours.
          </motion.p>
        </div>
      </section>

      {/* ──────────────────────────────── Disclaimer ──────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-[#6B7280]">
          UCSG is not a law firm. We provide guidance and connect students with accredited institutions.
          For legal advice, please consult a licensed immigration attorney.
        </p>
      </section>
    </div>
  );
}
