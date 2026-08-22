'use client';

import Image from 'next/image';
import { MessageCircle, Phone, CheckCircle2, Users, Globe, Award, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useCallback } from 'react';
import { FloatingParticles } from '@/components/animations/TextReveal';

interface Props {
  onContactClick?: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const trustBadges = [
  { icon: CheckCircle2, label: 'SEVP Certified' },
  { icon: Users, label: '5,000+ Students' },
  { icon: Globe, label: '20+ Countries' },
  { icon: Award, label: '99% Success' },
];

export default function HeroSection({ onContactClick }: Props) {
  return (
    <HeroParallaxWrapper>
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0A0F2C] via-[#002868] to-[#0B1A3E]">
      {/* ===== ANIMATED GRADIENT ORBS ===== */}
      <motion.div
        className="pointer-events-none absolute -left-20 -top-10 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(0,40,104,0.4),transparent_70%)]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [0.95, 1.08, 0.95] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -right-16 bottom-20 h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(179,25,66,0.15),transparent_70%)]"
        animate={{ x: [0, -35, 0], y: [0, 30, 0], scale: [1.05, 0.92, 1.05] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute right-1/4 top-16 h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,rgba(0,40,104,0.3),transparent_70%)]"
        animate={{ x: [0, 20, 0], y: [0, 25, 0], scale: [0.92, 1.1, 0.92] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <FloatingParticles count={25} />

      {/* Subtle dot pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Diagonal accent shimmer */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute -top-1/2 -right-1/4 h-[120%] w-[70%] rotate-[35deg] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-28 sm:px-6 sm:pt-24 sm:pb-36 lg:px-8 lg:pt-32 lg:pb-44">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ===== LEFT: TEXT CONTENT ===== */}
          <div>
            {/* SECTION BADGE */}
            <motion.div
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-blue-200 backdrop-blur-sm"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <Award className="h-3.5 w-3.5" />
              Your American Dream Starts Here
            </motion.div>

            {/* Availability Badge — smaller & subtler */}
            <motion.div
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1 text-xs font-medium text-blue-100/70 backdrop-blur-sm"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.5}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
              </span>
              Available 24/7 · Jackson Heights, NY
            </motion.div>

            {/* Trust element */}
            <motion.p
              className="mb-3 text-sm font-medium tracking-wide text-blue-100/70"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              Proudly serving students from Queens &amp; Jackson Heights
            </motion.p>

            {/* ===== MAIN HEADING WITH TEXT GLOW ===== */}
            <motion.div
              className="relative"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              {/* Blurred glow layer behind text */}
              <h1 className="absolute inset-0 text-5xl font-extrabold leading-[1.1] tracking-tight text-white/30 blur-2xl sm:text-6xl md:text-6xl lg:text-7xl select-none" aria-hidden="true">
                Your Future in the USA Starts with the Right University &amp; Guidance
              </h1>
              {/* Actual heading */}
              <h1 className="relative text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-6xl lg:text-7xl">
                Your Future in the USA Starts with the
                <motion.span
                  className="mt-2 block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  Right University &amp; Guidance
                </motion.span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="mt-8 max-w-xl text-base leading-relaxed text-blue-100/90 sm:text-lg"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              UCSG — Universal Consulting Service Group connects international
              students to{' '}
              <strong className="font-semibold text-white">affordable, accredited universities</strong>{' '}
              offering hybrid programs,{' '}
              <strong className="font-semibold text-white">Day 1 CPT/OPT</strong>,
              and real-world experience. Your success is our mission.
            </motion.p>

            {/* ===== CTA BUTTONS (Magnetic) ===== */}
            <motion.div
              className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 lg:justify-start"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              <MagneticButton href="tel:+13028935594" className="h-13 w-full rounded-full bg-white px-8 text-base font-semibold text-[#002868] shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:bg-[#EFF6FF] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] sm:w-auto">
                <Phone className="mr-2 h-4 w-4" />
                Call +1 (302) 893-5594
              </MagneticButton>
              <MagneticButton href="https://wa.me/13028935594" external className="h-13 w-full rounded-full border-2 border-white bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 sm:w-auto">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp 24/7
              </MagneticButton>
              <MagneticButton className="h-13 w-full rounded-full border-2 border-[#B31942] bg-[#B31942] px-8 text-base font-semibold text-white shadow-[0_0_20px_rgba(179,25,66,0.3)] hover:bg-[#8B122F] hover:shadow-[0_0_30px_rgba(179,25,66,0.5)] sm:w-auto" onClick={onContactClick}>
                Get Free Consultation
              </MagneticButton>
            </motion.div>

            {/* Trust Badges Row */}
            <motion.div
              className="mt-8 flex flex-col gap-3 lg:items-start"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
            >
              {/* Veteran-owned Badge — highlighted */}
              <motion.div
                className="inline-flex w-fit items-center gap-2 rounded-full border border-[#B31942]/40 bg-gradient-to-r from-[#B31942]/20 to-[#002868]/20 px-4 py-1.5 backdrop-blur-sm"
                whileHover={{ scale: 1.03 }}
              >
                <ShieldCheck className="h-4 w-4 text-[#FCA5A5]" />
                <span className="text-xs font-bold tracking-wide text-white">U.S. Army Veteran-owned Business</span>
              </motion.div>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {trustBadges.map((badge) => {
                  const BadgeIcon = badge.icon;
                  return (
                    <div key={badge.label} className="flex items-center gap-1.5 text-xs font-medium text-blue-200/70">
                      <BadgeIcon className="h-3.5 w-3.5 text-blue-200/50" />
                      {badge.label}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* ===== RIGHT: HERO ILLUSTRATION ===== */}
          <HeroImageWrapper>
            <div className="relative">
              {/* Rotating gradient border effect */}
              <motion.div
                className="absolute -inset-[3px] rounded-3xl bg-gradient-to-r from-[#002868] via-[#B31942] to-[#002868] opacity-60 blur-[1px]"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{ borderRadius: '1.5rem' }}
              />

              {/* Decorative background shape */}
              <div className="absolute -inset-4 rounded-3xl bg-white/[0.08] backdrop-blur-sm" />
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-sm">
                <Image
                  src="/images/hero-illustration.png"
                  alt="International students achieving success with UCSG guidance"
                  width={620}
                  height={420}
                  className="h-auto w-full object-cover"
                  unoptimized
                  loading="eager"
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0B1A3E]/60 to-transparent" />
              </div>

              {/* ===== FLOATING GLASS STAT CARD: Students (Parallax) ===== */}
              <ParallaxFloatCard
                className="absolute -bottom-8 -left-8 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 shadow-2xl backdrop-blur-xl"
                enterDelay={0.8}
                floatDelay={1.5}
              >
                {/* Inner glow border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5" />
                <div className="relative flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#002868] to-[#001B4D] shadow-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">5,000+</p>
                    <p className="text-[11px] font-medium text-blue-200/70">Students Placed</p>
                  </div>
                </div>
              </ParallaxFloatCard>

              {/* ===== FLOATING GLASS STAT CARD: Success Rate (Parallax) ===== */}
              <ParallaxFloatCard
                className="absolute -right-6 top-8 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 shadow-2xl backdrop-blur-xl"
                enterDelay={1}
                floatDelay={1.8}
                floatYRange={5}
              >
                {/* Inner glow border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5" />
                <div className="relative flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">99%</p>
                    <p className="text-[11px] font-medium text-blue-200/70">Success Rate</p>
                  </div>
                </div>
              </ParallaxFloatCard>

              {/* ===== FLOATING GLASS STAT CARD: Partner Universities (Parallax) ===== */}
              <ParallaxFloatCard
                className="absolute -bottom-4 -right-6 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 shadow-2xl backdrop-blur-xl"
                enterDelay={1.2}
                floatDelay={2.1}
                floatYRange={4}
                floatXRange={4}
              >
                {/* Inner glow border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5" />
                <div className="relative flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#B31942] to-[#8B122F] shadow-lg">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">11+</p>
                    <p className="text-[11px] font-medium text-blue-200/70">Partner Universities</p>
                  </div>
                </div>
              </ParallaxFloatCard>
            </div>
          </HeroImageWrapper>
        </div>
      </div>

      {/* ===== ANIMATED WAVE DIVIDER ===== */}
      <div className="relative -mb-1">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="block w-full" preserveAspectRatio="none">
          <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" fill="white" />
          <path d="M0,80 C360,20 720,110 1080,50 C1260,20 1380,70 1440,80 L1440,120 L0,120 Z" fill="white" opacity="0.5" />
          <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60" fill="none" stroke="url(#usaFadeVibrant)" strokeWidth="2" opacity="0.6" />
          <defs>
            <linearGradient id="usaFadeVibrant" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="#002868" stopOpacity="0" />
              <stop offset="20%" stopColor="#002868" stopOpacity="1" />
              <stop offset="50%" stopColor="#3B5FD9" stopOpacity="1" />
              <stop offset="75%" stopColor="#B31942" stopOpacity="1" />
              <stop offset="100%" stopColor="#B31942" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
    </HeroParallaxWrapper>
  );
}

/* ───────────────────────────────────────────────
   HeroParallaxWrapper — adds scroll-linked parallax to the hero
   ─────────────────────────────────────────────── */
function HeroParallaxWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.div ref={ref} style={{ opacity }}>
      <motion.div style={{ y: bgY }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ───────────────────────────────────────────────
   HeroImageWrapper — parallax image + staggered entrance
   ─────────────────────────────────────────────── */
function HeroImageWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <motion.div
      ref={ref}
      className="relative hidden lg:block"
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div style={{ y: imgY }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ───────────────────────────────────────────────
   ParallaxFloatCard — floating card with parallax offset + hover
   ─────────────────────────────────────────────── */
function ParallaxFloatCard({
  children,
  className,
  enterDelay = 0.8,
  floatDelay = 1.5,
  floatYRange = 6,
  floatXRange = 0,
}: {
  children: React.ReactNode;
  className: string;
  enterDelay?: number;
  floatDelay?: number;
  floatYRange?: number;
  floatXRange?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y: parallaxY }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: [0, -floatYRange, 0], x: floatXRange ? [0, floatXRange, 0] : 0 }}
      transition={{
        opacity: { delay: enterDelay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        y: { delay: floatDelay, duration: 4, repeat: Infinity, ease: 'easeInOut' },
        ...(floatXRange ? { x: { delay: floatDelay, duration: 4.5, repeat: Infinity, ease: 'easeInOut' } } : {}),
      }}
      whileHover={{ y: -4, scale: 1.05 }}
    >
      {children}
    </motion.div>
  );
}

/* ───────────────────────────────────────────────
   MagneticButton — follows cursor slightly on hover
   ─────────────────────────────────────────────── */
function MagneticButton({
  children,
  className,
  href,
  external,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
}) {
  const magRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = magRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    el.style.transition = 'transform 0.15s ease-out';
  }, []);
  const handleMouseLeave = useCallback(() => {
    const el = magRef.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
    el.style.transition = 'transform 0.4s ease-out';
  }, []);

  return (
    <motion.div
      ref={magRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      className="inline-flex"
    >
      <Button
        className={className}
        size="lg"
        variant={href === 'https://wa.me/13028935594' ? 'outline' : 'default'}
        asChild={!!href}
        onClick={onClick}
      >
        {href ? (
          <a
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        ) : (
          children
        )}
      </Button>
    </motion.div>
  );
}
