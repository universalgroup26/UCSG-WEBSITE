'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AnimatedHeading } from '@/components/animations/TextReveal';

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
      'My SEVIS was terminated and I was about to lose my status. UCSG connected me with a Day 1 CPT university within 48 hours. Their team handled everything from admission to I-20 issuance. I was able to continue working and eventually got my H-1B approved. Truly life-changing service.',
    avatar: '/images/avatar-1.png',
    rating: 5,
  },
  {
    id: 2,
    name: 'Li Wei C.',
    role: 'Data Analyst at Amazon',
    country: 'China',
    quote:
      'I needed to change my status from B1/B2 to F-1 quickly. UCSG guided me through the entire process, found me an affordable hybrid program, and made sure I could start working legally from day one. The 24/7 WhatsApp support was incredibly reassuring during a stressful time.',
    avatar: '/images/avatar-2.png',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emmanuel O.',
    role: 'IT Specialist at JPMorgan',
    country: 'Nigeria',
    quote:
      'After my STEM OPT was denied, I thought my journey in the US was over. UCSG found me a backup university with immediate Day 1 CPT, helped with the transfer, and I never missed a day of work. Joy and his team genuinely care about students. I recommend UCSG to everyone I know.',
    avatar: '/images/avatar-3.png',
    rating: 5,
  },
];

// ─── Constants ───────────────────────────────────────────────────────────────

const BRAND_BLUE = '#002868';
const AUTO_PLAY_INTERVAL_MS = 5000;

// ─── Sub-components ─────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-5 w-5',
            i < rating
              ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]'
              : 'text-gray-300'
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
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, rotateY: 3, rotateX: 2 }}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_30px_-4px_rgba(0,40,104,0.1)] transition-shadow duration-300 hover:shadow-[0_8px_40px_-4px_rgba(0,40,104,0.15)]">
        {/* Top gradient accent line */}
        <div className="bg-gradient-to-r from-[#002868] via-[#B31942] to-[#002868] h-1 rounded-t-2xl" />

        <div className="flex flex-1 flex-col p-8 sm:p-10">
          {/* Decorative quote watermark */}
          <Quote
            className="pointer-events-none absolute right-8 top-10 h-10 w-10 sm:right-10 sm:top-12"
            style={{ color: BRAND_BLUE, opacity: 0.1 }}
            aria-hidden="true"
          />

          <div className="mb-5 flex items-center justify-between">
            <StarRating rating={testimonial.rating} />
          </div>

          <blockquote className="mb-8 flex-1 text-base leading-relaxed text-[#334155] sm:text-lg">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>

          <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-4 ring-[#002868]/10 ring-offset-2 ring-offset-white">
              <Image
                src={testimonial.avatar}
                alt={`Photo of ${testimonial.name}`}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-900">
                {testimonial.name}
              </p>
              <p className="truncate text-xs text-gray-500">
                {testimonial.role}
              </p>
              <Badge
                className="mt-1.5 text-[10px] font-medium bg-[#002868]/5 border-[#002868]/10 text-[#002868]"
                variant="outline"
              >
                {testimonial.country}
              </Badge>
            </div>
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

  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [resetAutoPlay]);

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
      className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] py-20 sm:py-28 lg:py-32"
    >
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.07] blur-3xl"
        style={{ backgroundColor: BRAND_BLUE }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full opacity-[0.05] blur-3xl"
        style={{ backgroundColor: BRAND_BLUE }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedHeading
          badge="Student Success Stories"
          title="What Our Students Say"
          description="Real stories from international students who found their path with UCSG guidance."
          badgeColor="#B31942"
        />

        {/* Decorative floating quotes */}
        <motion.div
          className="pointer-events-none absolute left-[10%] top-[30%] text-[#002868]/[0.04]"
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -15 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Quote className="h-32 w-32" />
        </motion.div>
        <motion.div
          className="pointer-events-none absolute right-[8%] bottom-[25%] text-[#B31942]/[0.04]"
          initial={{ opacity: 0, scale: 0.5, rotate: 12 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 12 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Quote className="h-24 w-24" />
        </motion.div>

        {/* Desktop: 3-column grid */}
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

        {/* Mobile / Tablet: carousel */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentPage * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {TESTIMONIALS.map((testimonial) => (
                <div key={testimonial.id} className="w-full shrink-0 px-2 sm:px-4">
                  <TestimonialCard testimonial={testimonial} index={0} />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <motion.button
              type="button"
              onClick={handlePrev}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#002868] to-[#001B4D] text-white shadow-lg shadow-[#002868]/20 hover:shadow-[#002868]/40 transition-shadow duration-300"
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>

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
                      ? 'w-8 bg-gradient-to-r from-[#002868] to-[#B31942]'
                      : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  )}
                />
              ))}
            </div>

            <motion.button
              type="button"
              onClick={handleNext}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#002868] to-[#001B4D] text-white shadow-lg shadow-[#002868]/20 hover:shadow-[#002868]/40 transition-shadow duration-300"
              aria-label="Next testimonial"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
