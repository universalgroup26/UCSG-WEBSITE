'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Shield, Clock, CheckCircle, ArrowRight, ChevronDown } from 'lucide-react';

const TEAL = '#002868';
const TEAL_LIGHT = '#3B82F6';
const DARK_BG = '#0F172A';
const DARK_CARD = '#1A2332';
const LIGHT_TEXT = '#F7F7F7';
const MUTED_TEXT = '#94A3B8';

const countries = [
  { emoji: '🇮🇳', name: 'India' },
  { emoji: '🇨🇳', name: 'China' },
  { emoji: '🇳🇬', name: 'Nigeria' },
  { emoji: '🇧🇩', name: 'Bangladesh' },
];

const credentials = [
  {
    icon: Shield,
    title: 'SEVP Certified',
    description:
      'All partner universities are SEVP-certified by the US Department of Homeland Security',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description:
      'Round-the-clock assistance via phone, WhatsApp, and email',
  },
  {
    icon: CheckCircle,
    title: '99% Success Rate',
    description:
      'Nearly all of our students achieve their immigration goals',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function TrustSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden py-16 md:py-24 lg:py-28"
      style={{ backgroundColor: DARK_BG }}
    >
      {/* Decorative background elements */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full opacity-[0.06]"
        style={{ background: `radial-gradient(circle, ${TEAL}, transparent 70%)` }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full opacity-[0.05]"
        style={{ background: `radial-gradient(circle, ${TEAL}, transparent 70%)` }}
      />
      {/* Subtle grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ──────────────────────────── 1. University Partners Count ──────────────────────────── */}
        <motion.div
          className="flex flex-col items-center text-center"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
          variants={fadeUp}
        >
          <div
            className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ backgroundColor: `${TEAL}20` }}
          >
            <GraduationCap className="h-9 w-9" style={{ color: TEAL_LIGHT }} />
          </div>
          <p
            className="text-5xl font-extrabold leading-none tracking-tight sm:text-6xl md:text-7xl"
            style={{ color: LIGHT_TEXT }}
          >
            <span style={{ color: TEAL_LIGHT }}>29</span>{' '}+
          </p>
          <p
            className="mt-3 text-lg font-semibold sm:text-xl"
            style={{ color: LIGHT_TEXT }}
          >
            Partner Universities
          </p>
          <p className="mt-1 text-sm" style={{ color: MUTED_TEXT }}>
            SEVP-Certified Institutions
          </p>
        </motion.div>

        {/* ──────────────────────────── 2. Global Reach ──────────────────────────── */}
        <motion.div
          className="mt-16 md:mt-20"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={1}
          variants={fadeUp}
        >
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-12">
            {/* Country badges */}
            <div className="flex flex-col items-center gap-5 md:items-start">
              <h3
                className="text-xl font-bold sm:text-2xl"
                style={{ color: LIGHT_TEXT }}
              >
                Global Reach
              </h3>
              <p className="max-w-xs text-center text-sm md:text-left" style={{ color: MUTED_TEXT }}>
                Students from{' '}
                <span className="font-semibold" style={{ color: TEAL_LIGHT }}>
                  20+ countries
                </span>{' '}
                trust UCSG
              </p>
              <div className="flex items-center gap-3">
                {countries.map((c) => (
                  <div
                    key={c.name}
                    className="group relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-transform duration-200 hover:scale-110 sm:h-14 sm:w-14"
                    style={{
                      borderColor: `${TEAL}50`,
                      backgroundColor: `${TEAL}15`,
                    }}
                    title={c.name}
                  >
                    <span className="text-2xl sm:text-3xl" role="img" aria-label={c.name}>
                      {c.emoji}
                    </span>
                    {/* Tooltip on hover */}
                    <span
                      className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-2 py-0.5 text-[11px] font-medium opacity-0 transition-opacity group-hover:opacity-100"
                      style={{ backgroundColor: TEAL, color: LIGHT_TEXT }}
                    >
                      {c.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* World map image */}
            <div className="relative w-full max-w-md flex-1 md:max-w-none">
              <div
                className="pointer-events-none absolute -inset-4 rounded-2xl opacity-30"
                style={{
                  background: `radial-gradient(ellipse at center, ${TEAL}40, transparent 70%)`,
                }}
              />
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/images/world-map.png"
                  alt="World map showing UCSG global reach"
                  width={600}
                  height={340}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ──────────────────────────── 3. Credentials Grid ──────────────────────────── */}
        <div className="mt-16 md:mt-20">
          <motion.h3
            className="mb-10 text-center text-xl font-bold sm:text-2xl"
            style={{ color: LIGHT_TEXT }}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
            variants={fadeUp}
          >
            Why Students Trust Us
          </motion.h3>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {credentials.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="group relative rounded-2xl border p-6 transition-colors duration-300"
                  style={{
                    borderColor: `${TEAL}30`,
                    backgroundColor: DARK_CARD,
                  }}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  custom={idx + 3}
                  variants={scaleIn}
                  whileHover={{
                    borderColor: `${TEAL}80`,
                    backgroundColor: `${TEAL}12`,
                  }}
                >
                  {/* Accent line on top */}
                  <div
                    className="absolute left-6 top-0 h-[3px] w-10 rounded-b-full transition-all duration-300 group-hover:w-16"
                    style={{ backgroundColor: TEAL }}
                  />
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${TEAL}20` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: TEAL_LIGHT }} />
                  </div>
                  <h4 className="mb-2 text-base font-bold" style={{ color: LIGHT_TEXT }}>
                    {item.title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: MUTED_TEXT }}>
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ──────────────────────────── 4. Process Visual ──────────────────────────── */}
        <motion.div
          className="mt-16 md:mt-20"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={7}
          variants={fadeUp}
        >
          <h3
            className="mb-10 text-center text-xl font-bold sm:text-2xl"
            style={{ color: LIGHT_TEXT }}
          >
            How It Works
          </h3>

          {/* Desktop: horizontal layout */}
          <div className="hidden items-center justify-center gap-4 md:flex lg:gap-6">
            {/* Step 1 */}
            <ProcessStep
              stepNumber={1}
              label="Contact Us"
              isInView={isInView}
              delay={8}
            />

            {/* Arrow → */}
            <motion.div
              className="flex flex-shrink-0 items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: `${TEAL}25` }}>
                <ArrowRight className="h-5 w-5" style={{ color: TEAL_LIGHT }} />
              </div>
            </motion.div>

            {/* Consultation image */}
            <motion.div
              className="relative flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div
                className="pointer-events-none absolute -inset-3 rounded-2xl opacity-20"
                style={{
                  background: `radial-gradient(ellipse at center, ${TEAL}60, transparent 70%)`,
                }}
              />
              <div className="relative overflow-hidden rounded-2xl border-2" style={{ borderColor: `${TEAL}40` }}>
                <Image
                  src="/images/consultation.png"
                  alt="Consultation with UCSG advisor"
                  width={260}
                  height={180}
                  className="h-auto w-full object-cover"
                  style={{ height: 'auto' }}
                  sizes="260px"
                />
              </div>
              <p
                className="mt-2 text-center text-sm font-medium"
                style={{ color: TEAL_LIGHT }}
              >
                Free Consultation
              </p>
            </motion.div>

            {/* Arrow → */}
            <motion.div
              className="flex flex-shrink-0 items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: `${TEAL}25` }}>
                <ArrowRight className="h-5 w-5" style={{ color: TEAL_LIGHT }} />
              </div>
            </motion.div>

            {/* Step 3 */}
            <ProcessStep
              stepNumber={3}
              label="Start Working"
              isInView={isInView}
              delay={9}
            />
          </div>

          {/* Mobile: vertical layout */}
          <div className="flex flex-col items-center gap-6 md:hidden">
            <ProcessStepMobile
              stepNumber={1}
              label="Contact Us"
              isInView={isInView}
              delay={8}
            />

            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <ChevronDown className="h-6 w-6" style={{ color: TEAL_LIGHT }} />
            </motion.div>

            <motion.div
              className="relative w-full max-w-xs"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div
                className="pointer-events-none absolute -inset-2 rounded-xl opacity-15"
                style={{
                  background: `radial-gradient(ellipse at center, ${TEAL}60, transparent 70%)`,
                }}
              />
              <div className="relative overflow-hidden rounded-xl border-2" style={{ borderColor: `${TEAL}40` }}>
                <Image
                  src="/images/consultation.png"
                  alt="Consultation with UCSG advisor"
                  width={320}
                  height={220}
                  className="h-auto w-full object-cover"
                  style={{ height: 'auto' }}
                  sizes="(max-width: 767px) 80vw, 320px"
                />
              </div>
              <p
                className="mt-2 text-center text-sm font-medium"
                style={{ color: TEAL_LIGHT }}
              >
                Free Consultation
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <ChevronDown className="h-6 w-6" style={{ color: TEAL_LIGHT }} />
            </motion.div>

            <ProcessStepMobile
              stepNumber={3}
              label="Start Working"
              isInView={isInView}
              delay={9}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───── Sub-components ───── */

interface StepProps {
  stepNumber: number;
  label: string;
  isInView: boolean;
  delay: number;
}

function ProcessStep({ stepNumber, label, isInView, delay }: StepProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 text-center"
      custom={delay}
      variants={scaleIn}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold"
        style={{ backgroundColor: TEAL, color: LIGHT_TEXT }}
      >
        {stepNumber}
      </div>
      <p className="text-sm font-semibold" style={{ color: LIGHT_TEXT }}>
        {label}
      </p>
    </motion.div>
  );
}

function ProcessStepMobile({ stepNumber, label, isInView, delay }: StepProps) {
  return (
    <motion.div
      className="flex items-center gap-3"
      custom={delay}
      variants={scaleIn}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-base font-bold"
        style={{ backgroundColor: TEAL, color: LIGHT_TEXT }}
      >
        {stepNumber}
      </div>
      <p className="text-sm font-semibold" style={{ color: LIGHT_TEXT }}>
        {label}
      </p>
    </motion.div>
  );
}
