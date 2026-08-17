'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Testimonial {
  id: number;
  name: string;
  role: string;
  country: string;
  quote: string;
  avatar: string;
  rating: number;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Raj P.',
    role: 'Software Engineer at Google',
    country: 'India',
    quote:
      'This platform completely transformed how I prepared for technical interviews. The structured curriculum and real-world projects gave me the confidence and skills to land my dream role at Google. I cannot recommend it enough.',
    avatar: '/images/avatar-1.png',
    rating: 5,
  },
  {
    id: 2,
    name: 'Li Wei C.',
    role: 'Data Analyst at Amazon',
    country: 'China',
    quote:
      'The data analytics track was incredibly thorough. From SQL to advanced visualization techniques, every module built on the last. The mentorship and community support were the differentiators that helped me succeed.',
    avatar: '/images/avatar-2.png',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emmanuel O.',
    role: 'IT Specialist at JPMorgan',
    country: 'Nigeria',
    quote:
      'Coming from a non-traditional background, I was worried about breaking into tech. This program met me where I was and guided me step by step. Now I am building enterprise solutions at one of the world\'s top financial institutions.',
    avatar: '/images/avatar-3.png',
    rating: 5,
  },
];

// ─── Constants ───────────────────────────────────────────────────────────────

const BRAND_TEAL = '#006F8F';
const AUTO_PLAY_INTERVAL_MS = 5000;

// ─── Sub-components ─────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-4 w-4',
            i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'
          )}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.div
      className="relative flex h-full"
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
    >
      {/* Card body */}
      <div className="flex h-full w-full flex-col rounded-2xl border border-gray-200/60 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg dark:border-gray-700/60 dark:bg-gray-950 sm:p-8">
        {/* Quote icon */}
        <div className="mb-4 flex items-center justify-between">
          <Quote
            className="h-8 w-8 shrink-0 opacity-20"
            style={{ color: BRAND_TEAL }}
            aria-hidden="true"
          />
          <StarRating rating={testimonial.rating} />
        </div>

        {/* Quote text */}
        <blockquote className="mb-6 flex-1 text-base leading-relaxed text-gray-700 dark:text-gray-300">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        {/* Author row */}
        <div className="flex items-center gap-4 border-t border-gray-100 pt-5 dark:border-gray-800">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-offset-2"
            style={{ ringColor: BRAND_TEAL }}
          >
            <Image
              src={testimonial.avatar}
              alt={`Photo of ${testimonial.name}`}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
              {testimonial.name}
            </p>
            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
              {testimonial.role}
            </p>
            <Badge
              className="mt-1 text-[10px] font-medium"
              style={{
                backgroundColor: `${BRAND_TEAL}18`,
                color: BRAND_TEAL,
                borderColor: `${BRAND_TEAL}30`,
              }}
              variant="outline"
            >
              {testimonial.country}
            </Badge>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = TESTIMONIALS.length;
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (page: number) => {
      setCurrentPage((prev) =>
        ((page % totalPages) + totalPages) % totalPages
      );
    },
    [totalPages]
  );

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, AUTO_PLAY_INTERVAL_MS);
  }, [totalPages]);

  // Auto‑play
  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [resetAutoPlay]);

  // User interaction resets the timer
  const handlePrev = useCallback(() => {
    goTo(currentPage - 1);
    resetAutoPlay();
  }, [currentPage, goTo, resetAutoPlay]);

  const handleNext = useCallback(() => {
    goTo(currentPage + 1);
    resetAutoPlay();
  }, [currentPage, goTo, resetAutoPlay]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      {/* ── Subtle background pattern ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundColor: BRAND_TEAL,
          backgroundImage:
            'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* ── Gradient accent blobs ── */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.07] blur-3xl"
        style={{ backgroundColor: BRAND_TEAL }}
        aria-hidden="true"
      />\n      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full opacity-[0.05] blur-3xl"
        style={{ backgroundColor: BRAND_TEAL }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
            style={{ backgroundColor: `${BRAND_TEAL}15` }}
          >
            <Quote className="h-6 w-6" style={{ color: BRAND_TEAL }} aria-hidden="true" />
          </div>
          <h2
            id="testimonials-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl"
          >
            What Our Students Say
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Real stories from graduates who transformed their careers through our programs.
          </p>
        </motion.div>

        {/* ── Desktop: 3‑column grid (always visible) ── */}
        <motion.div
          className="hidden gap-6 lg:grid lg:grid-cols-3"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </motion.div>

        {/* ── Mobile / Tablet: carousel (lg:hidden) ── */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentPage * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {TESTIMONIALS.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full shrink-0 px-2 sm:px-4">
                  <TestimonialCard testimonial={testimonial} index={0} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handlePrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial pages">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === currentPage}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => {
                    setCurrentPage(i);
                    resetAutoPlay();
                  }}
                  className={cn(
                    'h-2.5 rounded-full transition-all duration-300',
                    i === currentPage
                      ? 'w-8'
                      : 'w-2.5 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
                  )}
                  style={
                    i === currentPage
                      ? { backgroundColor: BRAND_TEAL }
                      : undefined
                  }
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
