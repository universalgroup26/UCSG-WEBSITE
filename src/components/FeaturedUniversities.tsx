'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { universities, type UniversityData } from '@/lib/data/universities';
import { track } from '@/lib/analytics';

interface FeaturedUniversitiesProps {
  onUniversityClick?: (uni: UniversityData) => void;
}

const CARD_WIDTH = 172;
const CARD_GAP = 16;
const SCROLL_SPEED = 0.5;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

function UniversityCard({
  uni,
  onUniversityClick,
}: {
  uni: UniversityData;
  onUniversityClick?: (uni: UniversityData) => void;
}) {
  const handleClick = useCallback(() => {
    track.navClick({
      nav_type: 'body',
      nav_target: `university:${uni.id}`,
      nav_text: uni.name,
    });
    onUniversityClick?.(uni);
    window.dispatchEvent(
      new CustomEvent('ucsg-navigate', {
        detail: { view: 'university', id: uni.id },
      }),
    );
  }, [uni, onUniversityClick]);

  return (
    <motion.button
      type="button"
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={handleClick}
      aria-label={`View ${uni.name} in ${uni.location}`}
      className={
        'flex-shrink-0 w-[168px] rounded-xl border border-[#061846]/10 bg-white p-4 ' +
        'shadow-sm transition-shadow duration-200 hover:shadow-md ' +
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2 ' +
        'text-left cursor-pointer'
      }
    >
      <div className="flex h-12 w-full items-center justify-center">
        <Image
          src={uni.logoPath}
          alt={`${uni.shortName} logo`}
          width={120}
          height={48}
          className="h-12 w-auto object-contain"
          loading="lazy"
        />
      </div>
      <p className="mt-3 text-sm font-semibold leading-tight text-[#061846] line-clamp-2">
        {uni.name}
      </p>
      <p className="mt-1 text-xs text-[#061846]/50 leading-snug">
        {uni.location}
      </p>
    </motion.button>
  );
}

function ReducedMotionGrid({
  onUniversityClick,
}: {
  onUniversityClick?: (uni: UniversityData) => void;
}) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {universities.map((uni) => (
        <UniversityCard
          key={uni.id}
          uni={uni}
          onUniversityClick={onUniversityClick}
        />
      ))}
    </div>
  );
}

function AutoScrollRail({
  onUniversityClick,
}: {
  onUniversityClick?: (uni: UniversityData) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  const doubled = [...universities, ...universities];

  const handlePause = useCallback(() => {
    setPaused(true);
    pausedRef.current = true;
  }, []);

  const handleResume = useCallback(() => {
    setPaused(false);
    pausedRef.current = false;
  }, []);

  const scrollBy = useCallback((direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * (CARD_WIDTH + CARD_GAP) * 2, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let lastTime = performance.now();

    const tick = (now: number) => {
      if (!pausedRef.current) {
        const delta = now - lastTime;
        const px = (SCROLL_SPEED * delta) / 16;
        el.scrollLeft += px;

        const singleSetWidth =
          universities.length * (CARD_WIDTH + CARD_GAP);
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
  }, []);

  return (
    <div className="group/rail relative">
      {/* Left arrow */}
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        aria-label="Scroll featured institutions left"
        className={
          'absolute left-0 top-1/2 z-10 -translate-y-1/2 ' +
          'flex h-10 w-10 items-center justify-center rounded-full ' +
          'bg-white border border-[#061846]/10 shadow-lg ' +
          'text-[#061846] opacity-0 transition-opacity duration-200 ' +
          'group-hover/rail:opacity-100 focus-visible:opacity-100 ' +
          'hover:bg-[#EDF5FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874F9]'
        }
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Scrolling strip */}
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
        aria-label="Featured institutions in our network"
      >
        {doubled.map((uni, i) => (
          <div
            key={`${uni.id}-${i}`}
            role="listitem"
            className="flex-shrink-0"
            style={{ width: CARD_WIDTH }}
          >
            <UniversityCard
              uni={uni}
              onUniversityClick={onUniversityClick}
            />
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button
        type="button"
        onClick={() => scrollBy(1)}
        aria-label="Scroll featured institutions right"
        className={
          'absolute right-0 top-1/2 z-10 -translate-y-1/2 ' +
          'flex h-10 w-10 items-center justify-center rounded-full ' +
          'bg-white border border-[#061846]/10 shadow-lg ' +
          'text-[#061846] opacity-0 transition-opacity duration-200 ' +
          'group-hover/rail:opacity-100 focus-visible:opacity-100 ' +
          'hover:bg-[#EDF5FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874F9]'
        }
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {paused && (
        <span className="sr-only">Auto-scroll paused</span>
      )}
    </div>
  );
}

export default function FeaturedUniversities({
  onUniversityClick,
}: FeaturedUniversitiesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();
  const tracked = useRef(false);

  useEffect(() => {
    if (isInView && !tracked.current) {
      tracked.current = true;
      track.sectionView('featured_universities');
    }
  }, [isInView]);

  const handleViewAll = useCallback(() => {
    track.ctaClick({
      cta_type: 'program_details_requested',
      cta_source: 'featured_universities',
      cta_text: 'View All 45 Programs',
    });
    window.dispatchEvent(
      new CustomEvent('ucsg-navigate', {
        detail: { view: 'home', id: 'programs' },
      }),
    );
  }, []);

  return (
    <section
      id="featured-universities"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-16 md:py-20"
    >
      {/* Full-section background image */}
      <Image
        src="/images/bg-universities.png"
        alt=""
        role="presentation"
        fill
        className="object-cover"
        aria-hidden="true"
      />

      {/* White overlay (~90% opacity) */}
      <div
        className="absolute inset-0 bg-white/[0.90]"
        aria-hidden="true"
      />

      {/* Content layer above background */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-10 text-center md:mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0874F9]">
            Featured Institutions in Our Network
          </p>
          <h2 className="mt-3 font-heading text-2xl font-bold text-[#061846] sm:text-3xl md:text-4xl">
            Accredited Institutions in Our Network
          </h2>
        </motion.div>

        {/* Rail or Grid */}
        {prefersReducedMotion ? (
          <ReducedMotionGrid onUniversityClick={onUniversityClick} />
        ) : (
          <AutoScrollRail onUniversityClick={onUniversityClick} />
        )}

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
          className="mt-10 flex justify-center md:mt-14"
        >
          <button
            type="button"
            onClick={handleViewAll}
            className={
              'inline-flex items-center gap-2 rounded-full px-8 py-3 ' +
              'bg-[#0874F9] text-sm font-semibold text-white ' +
              'shadow-md shadow-[#0874F9]/20 transition-all duration-200 ' +
              'hover:bg-[#0658CC] hover:shadow-lg hover:shadow-[#0874F9]/30 ' +
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2 ' +
              'active:scale-[0.97]'
            }
          >
            View All 45 Programs
          </button>
        </motion.div>
      </div>
    </section>
  );
}
