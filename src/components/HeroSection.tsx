'use client';

import Image from 'next/image';
import { MessageCircle, Phone, CheckCircle2, Users, Globe, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const trustBadges = [
  { icon: CheckCircle2, label: 'SEVP Certified' },
  { icon: Users, label: '5,000+ Students' },
  { icon: Globe, label: '20+ Countries' },
  { icon: Award, label: '99% Success' },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#006F8F] to-[#005A73]">
      {/* Floating decorative circles */}
      <motion.div
        className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-white/5"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -right-16 bottom-32 h-48 w-48 rounded-full bg-white/5"
        animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute right-1/4 top-10 h-32 w-32 rounded-full bg-white/[0.03]"
        animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle dot pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
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
        transition={{ duration: 1 }}
      >
        <div className="absolute -top-1/2 -right-1/4 h-[120%] w-[70%] rotate-[35deg] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 sm:pb-32 sm:pt-20 lg:px-8 lg:pb-40 lg:pt-32">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text Content */}
          <div>
            {/* Availability Badge */}
            <motion.div
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              Available 24/7 · Jackson Heights, NY
            </motion.div>

            {/* Trust element */}
            <motion.p
              className="mb-3 text-sm font-medium tracking-wide text-teal-100/80"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              Proudly serving students from Queens &amp; Jackson Heights
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              Your Future in the USA Starts with the
              <motion.span
                className="block mt-1 bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                Right University &amp; Guidance
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mt-6 text-base leading-relaxed text-teal-100 sm:text-lg"
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

            {/* CTA Buttons */}
            <motion.div
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  className="h-12 rounded-full bg-white px-8 text-base font-semibold text-[#006F8F] shadow-lg shadow-black/10 hover:bg-[#E0F4F8] hover:shadow-xl"
                  size="lg"
                  asChild
                >
                  <a href="tel:+13028935594">
                    <Phone className="mr-1.5 h-4 w-4" />
                    Call +1 (302) 893-5594
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  className="h-12 rounded-full border-2 border-white bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10"
                  size="lg"
                  variant="outline"
                  asChild
                >
                  <a href="https://wa.me/13028935594" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-1.5 h-4 w-4" />
                    WhatsApp 24/7
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Badges Row */}
            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 lg:justify-start"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
            >
              {trustBadges.map((badge) => {
                const BadgeIcon = badge.icon;
                return (
                  <div key={badge.label} className="flex items-center gap-1.5 text-xs font-medium text-teal-200/80">
                    <BadgeIcon className="h-3.5 w-3.5 text-teal-200/60" />
                    {badge.label}
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right: Hero Illustration */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Decorative background shape */}
              <div className="absolute -inset-4 rounded-3xl bg-white/[0.08] backdrop-blur-sm" />
              <div className="absolute -inset-2 rounded-2xl bg-white/[0.05]" />
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-sm">
                <Image
                  src="/images/hero-illustration.png"
                  alt="International students achieving success with UCSG guidance"
                  width={600}
                  height={400}
                  className="h-auto w-full object-cover"
                  unoptimized
                  loading="eager"
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#005A73]/60 to-transparent" />
              </div>
              {/* Floating stat card */}
              <motion.div
                className="absolute -bottom-6 -left-6 rounded-xl border border-white/20 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#006F8F]">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#1E2D3B]">5,000+</p>
                    <p className="text-[10px] font-medium text-[#6B7280]">Students Placed</p>
                  </div>
                </div>
              </motion.div>
              {/* Floating rate card */}
              <motion.div
                className="absolute -right-4 top-8 rounded-xl border border-white/20 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#059669]">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#1E2D3B]">99%</p>
                    <p className="text-[10px] font-medium text-[#6B7280]">Success Rate</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave SVG */}
      <div className="relative -mb-1">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="block w-full" preserveAspectRatio="none">
          <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" fill="white" />
          <path d="M0,80 C360,20 720,110 1080,50 C1260,20 1380,70 1440,80 L1440,120 L0,120 Z" fill="white" opacity="0.5" />
          <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60" fill="none" stroke="url(#tealFade)" strokeWidth="1.5" opacity="0.4" />
          <defs>
            <linearGradient id="tealFade" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="#006F8F" stopOpacity="0" />
              <stop offset="50%" stopColor="#006F8F" stopOpacity="1" />
              <stop offset="100%" stopColor="#006F8F" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
