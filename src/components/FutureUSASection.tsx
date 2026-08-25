'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    image: '/images/future-usa-bg-1.png',
    alt: 'Beautiful American university campus with students walking on pathways',
  },
  {
    image: '/images/future-usa-bg-2.png',
    alt: 'International students celebrating graduation success at US university',
  },
];

export default function FutureUSASection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  return (
    <section
      className="relative flex min-h-[520px] items-center justify-center overflow-hidden sm:min-h-[580px] lg:min-h-[620px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ===== BACKGROUND SLIDESHOW ===== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <Image
            src={slides[current].image}
            alt={slides[current].alt}
            fill
            className="object-cover"
            unoptimized
            priority={current === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* ===== DARK OVERLAY for text readability ===== */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#002868]/30 via-transparent to-[#B31942]/20" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        {/* Decorative top line */}
        <motion.div
          className="mx-auto mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#002868] via-white to-[#B31942]"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 80, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        />

        {/* Main Heading */}
        <motion.h2
          className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
        >
          Your Future in the USA Starts with the
          <span className="mt-2 block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Right University &amp; Guidance
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
        >
          We connect international students to affordable, accredited American universities
          offering hybrid programs, Day 1 CPT/OPT, and the real-world experience you need to succeed.
        </motion.p>

        {/* Decorative bottom line */}
        <motion.div
          className="mx-auto mt-8 h-1 w-20 rounded-full bg-gradient-to-r from-[#B31942] via-white to-[#002868]"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 80, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
        />
      </div>

      {/* ===== SLIDE NAVIGATION ARROWS ===== */}
      <div className="absolute inset-y-0 left-0 z-20 flex items-center pl-3 sm:pl-6">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-sm hover:bg-black/40 hover:text-white"
          onClick={prev}
          aria-label="Previous slide"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 z-20 flex items-center pr-3 sm:pr-6">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-sm hover:bg-black/40 hover:text-white"
          onClick={next}
          aria-label="Next slide"
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>

      {/* ===== SLIDE INDICATORS ===== */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              idx === current
                ? 'w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]'
                : 'w-2.5 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
