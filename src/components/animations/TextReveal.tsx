'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

/* ───────────────────────────────────────────────────────────────────────
   TextReveal — word-by-word blur-to-clear reveal on scroll
   ─────────────────────────────────────────────────────────────────────── */
export function TextReveal({
  text,
  className = '',
  delay = 0,
  as: Tag = 'p',
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'span';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const words = text.split(' ');

  return (
    <Tag className={className}>
      <span ref={ref} className="inline-flex flex-wrap gap-x-[0.25em]">
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block"
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 12, filter: 'blur(6px)' }
            }
            transition={{
              duration: 0.5,
              delay: delay + i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}

/* ───────────────────────────────────────────────────────────────────────
   AnimatedHeading — section heading with line + blur reveal
   ─────────────────────────────────────────────────────────────────────── */
export function AnimatedHeading({
  badge,
  title,
  description,
  badgeColor = '#002868',
  align = 'center',
}: {
  badge?: string;
  title: string;
  description?: string;
  badgeColor?: string;
  align?: 'center' | 'left';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}>
      {badge && (
        <motion.span
          className="inline-block rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-widest"
          style={{
            backgroundColor: `${badgeColor}08`,
            borderColor: `${badgeColor}18`,
            color: badgeColor,
          }}
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={
            isInView
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 12, filter: 'blur(4px)' }
          }
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        className="mt-5 text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl"
        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
        animate={
          isInView
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: 20, filter: 'blur(6px)' }
        }
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>
      <motion.div
        className={`mt-5 h-1 w-[60px] rounded-full bg-gradient-to-r from-[#002868] to-[#B31942] ${align === 'center' ? 'mx-auto' : ''}`}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
      {description && (
        <motion.p
          className="mt-5 text-base leading-relaxed text-[#6B7280] sm:text-lg"
          initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
          animate={
            isInView
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 16, filter: 'blur(4px)' }
          }
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────────
   ParallaxElement — moves at a different speed on scroll
   ─────────────────────────────────────────────────────────────────────── */
export function ParallaxElement({
  children,
  speed = 0.3,
  className = '',
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

/* ───────────────────────────────────────────────────────────────────────
   SectionDivider — animated wave/curve/zigzag divider between sections
   ─────────────────────────────────────────────────────────────────────── */
export function SectionDivider({
  from = 'white',
  to = '#F8FAFC',
  variant = 'wave',
}: {
  from?: string;
  to?: string;
  variant?: 'wave' | 'curve' | 'zigzag';
}) {
  const gradId = `divGrad_${variant}_${Math.random().toString(36).slice(2, 8)}`;

  if (variant === 'curve') {
    return (
      <div className="relative h-16 w-full overflow-hidden" style={{ backgroundColor: from }}>
        <svg
          viewBox="0 0 1440 64"
          fill="none"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,24 1440,32 L1440,64 L0,64 Z"
            fill={to}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path
            d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,24 1440,32"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="#002868" stopOpacity="0" />
              <stop offset="30%" stopColor="#002868" stopOpacity="1" />
              <stop offset="70%" stopColor="#B31942" stopOpacity="1" />
              <stop offset="100%" stopColor="#B31942" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (variant === 'zigzag') {
    return (
      <div className="relative h-12 w-full overflow-hidden" style={{ backgroundColor: from }}>
        <svg viewBox="0 0 1440 48" fill="none" className="block w-full" preserveAspectRatio="none">
          <motion.path
            d="M0,24 L120,12 L240,36 L360,12 L480,36 L600,12 L720,36 L840,12 L960,36 L1080,12 L1200,36 L1320,12 L1440,24 L1440,48 L0,48 Z"
            fill={to}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      </div>
    );
  }

  // Default wave
  return (
    <div className="relative h-20 w-full overflow-hidden -mb-px" style={{ backgroundColor: from }}>
      <svg viewBox="0 0 1440 80" fill="none" className="block w-full" preserveAspectRatio="none">
        <motion.path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill={to}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1440" y2="0">
            <stop offset="0%" stopColor="#002868" stopOpacity="0" />
            <stop offset="25%" stopColor="#002868" stopOpacity="1" />
            <stop offset="75%" stopColor="#B31942" stopOpacity="1" />
            <stop offset="100%" stopColor="#B31942" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────────
   MarqueeBanner — infinite scrolling text strip
   ─────────────────────────────────────────────────────────────────────── */
export function MarqueeBanner({
  items,
  speed = 25,
  className = '',
}: {
  items: string[];
  speed?: number;
  className?: string;
}) {
  const doubled = [...items, ...items];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />

      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[#002868]/25 sm:text-base"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#B31942]/30" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────────
   CursorSpotlight — radial glow that follows mouse on dark sections
   ─────────────────────────────────────────────────────────────────────── */
export function CursorSpotlight({ className = '' }: { className?: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    el.addEventListener('mousemove', handleMove);
    return () => el.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div ref={containerRef} className={`pointer-events-none absolute inset-0 z-0 ${className}`}>
      <motion.div
        className="absolute h-[400px] w-[400px] rounded-full"
        style={{
          left: position.x - 200,
          top: position.y - 200,
          background: 'radial-gradient(circle, rgba(0,40,104,0.12) 0%, transparent 70%)',
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      />
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────────
   ClipPathReveal — section reveals with clip-path animation
   ─────────────────────────────────────────────────────────────────────── */
export function ClipPathReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      animate={
        isInView
          ? { clipPath: 'inset(0% 0% 0% 0%)' }
          : { clipPath: 'inset(100% 0% 0% 0%)' }
      }
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ───────────────────────────────────────────────────────────────────────
   FloatingParticles — subtle animated particles for hero
   ─────────────────────────────────────────────────────────────────────── */
export function FloatingParticles({ count = 20, className = '' }: { count?: number; className?: string }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className={`pointer-events-none absolute inset-0 z-0 ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 0, 15, 0],
            x: [0, 10, -5, 8, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity * 0.7, p.opacity * 1.2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
