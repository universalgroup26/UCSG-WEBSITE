'use client';

import { MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

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
        <div className="absolute -top-1/2 -right-1/4 h-[120%] w-[70%] rotate-[35deg] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />\n      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-28 pt-20 sm:px-6 sm:pb-36 sm:pt-28 lg:px-8 lg:pb-40 lg:pt-36">
        <div className="mx-auto max-w-3xl text-center">
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
            className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]"
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
              transition={{ delay: 0.65, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
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
              >
                <MessageCircle className="mr-1.5 h-4 w-4" />
                WhatsApp 24/7
              </Button>
            </motion.div>
          </motion.div>

          {/* Services List */}
          <motion.p
            className="mt-5 text-sm text-teal-200/70"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5}
          >
            College Admission Assistance · University Transfer · CPT/OPT ·
            Change of Status · SEVIS Reinstatement
          </motion.p>
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
