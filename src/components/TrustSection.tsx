'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Shield, Clock, CheckCircle, ArrowRight, ChevronDown } from 'lucide-react';

const BRAND_BLUE = '#002868';
const BRAND_RED = '#B31942';
const DARK_BG = '#0F172A';
const LIGHT_TEXT = '#F7F7F7';
const MUTED_TEXT = '#94A3B8';

const countries = [
  { code: 'in', name: 'India' },
  { code: 'cn', name: 'China' },
  { code: 'ng', name: 'Nigeria' },
  { code: 'bd', name: 'Bangladesh' },
  { code: 'pk', name: 'Pakistan' },
  { code: 'br', name: 'Brazil' },
  { code: 'ph', name: 'Philippines' },
  { code: 'vn', name: 'Vietnam' },
  { code: 'kr', name: 'South Korea' },
  { code: 'np', name: 'Nepal' },
  { code: 'gh', name: 'Ghana' },
  { code: 'ke', name: 'Kenya' },
  { code: 'co', name: 'Colombia' },
  { code: 'mx', name: 'Mexico' },
  { code: 'eg', name: 'Egypt' },
  { code: 'tr', name: 'Turkey' },
  { code: 'sa', name: 'Saudi Arabia' },
  { code: 'lk', name: 'Sri Lanka' },
  { code: 'jp', name: 'Japan' },
  { code: 'ae', name: 'UAE' },
  { code: 'et', name: 'Ethiopia' },
  { code: 'cm', name: 'Cameroon' },
  { code: 'mm', name: 'Myanmar' },
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
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#0A0F1A] via-[#0F172A] to-[#0A0F1A] py-16 md:py-24 lg:py-28"
    >
      {/* Decorative background elements */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full opacity-[0.06]"
        style={{ background: `radial-gradient(circle, ${BRAND_BLUE}, transparent 70%)` }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full opacity-[0.05]"
        style={{ background: `radial-gradient(circle, ${BRAND_RED}, transparent 70%)` }}
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
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-8 sm:px-12 sm:py-10">
            <div
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{ backgroundColor: `${BRAND_BLUE}20` }}
            >
              <GraduationCap className="h-9 w-9" style={{ color: BRAND_BLUE }} />
            </div>
            <p
              className="text-5xl font-extrabold leading-none tracking-tight sm:text-6xl md:text-7xl"
              style={{ color: LIGHT_TEXT }}
            >
              <span style={{ color: BRAND_BLUE }}>11</span>{' '}
              +
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
          </div>
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
            {/* Country flags grid */}
            <div className="flex flex-col items-center gap-5 md:items-start">
              <span className="bg-[#B31942]/10 border border-[#B31942]/20 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#B31942]">
                Global Reach
              </span>
              <h3
                className="text-3xl sm:text-4xl font-bold text-white"
              >
                Students Worldwide
              </h3>
              <p className="max-w-xs text-center text-sm md:text-left" style={{ color: MUTED_TEXT }}>
                Students from{' '}
                <span className="font-semibold" style={{ color: BRAND_BLUE }}>
                  23+ countries
                </span>{' '}
                trust UCSG
              </p>
              <div className="grid max-w-[280px] grid-cols-6 gap-2 sm:max-w-[320px] sm:grid-cols-6 sm:gap-2.5">
                {countries.map((c, i) => (
                  <motion.div
                    key={c.code}
                    className="group relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.5 + i * 0.04, duration: 0.35, ease: 'easeOut' }}
                    title={c.name}
                  >
                    <div
                      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-200 hover:scale-110 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(0,40,104,0.3)] sm:h-11 sm:w-11"
                    >
                      <img
                        src={`https://flagcdn.com/w80/${c.code}.png`}
                        alt={`${c.name} flag`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    {/* Tooltip on hover */}
                    <span
                      className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-2 py-0.5 text-[11px] font-medium opacity-0 transition-opacity group-hover:opacity-100"
                      style={{ backgroundColor: BRAND_BLUE, color: LIGHT_TEXT }}
                    >
                      {c.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* World map image */}
            <div className="relative w-full max-w-md flex-1 md:max-w-none">
              <div
                className="pointer-events-none absolute -inset-4 rounded-2xl opacity-30"
                style={{
                  background: `radial-gradient(ellipse at center, ${BRAND_BLUE}40, transparent 70%)`,
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
                  className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(0,40,104,0.15)]"
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  custom={idx + 3}
                  variants={scaleIn}
                >
                  {/* Accent line on top */}
                  <div
                    className="absolute left-6 top-0 h-[3px] w-10 rounded-b-full bg-gradient-to-r from-[#002868] to-[#B31942] transition-all duration-300 group-hover:w-16"
                  />
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#002868]/20 to-[#B31942]/10"
                  >
                    <Icon className="h-6 w-6 text-white" />
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
              <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: `${BRAND_BLUE}25` }}>
                <ArrowRight className="h-5 w-5" style={{ color: BRAND_BLUE }} />
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
                  background: `radial-gradient(ellipse at center, ${BRAND_BLUE}60, transparent 70%)`,
                }}
              />
              <div className="relative overflow-hidden rounded-2xl border-2" style={{ borderColor: `${BRAND_BLUE}40` }}>
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
                style={{ color: BRAND_BLUE }}
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
              <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: `${BRAND_BLUE}25` }}>
                <ArrowRight className="h-5 w-5" style={{ color: BRAND_BLUE }} />
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
              <ChevronDown className="h-6 w-6" style={{ color: BRAND_BLUE }} />
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
                  background: `radial-gradient(ellipse at center, ${BRAND_BLUE}60, transparent 70%)`,
                }}
              />
              <div className="relative overflow-hidden rounded-xl border-2" style={{ borderColor: `${BRAND_BLUE}40` }}>
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
                style={{ color: BRAND_BLUE }}
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
              <ChevronDown className="h-6 w-6" style={{ color: BRAND_BLUE }} />
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
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#002868] to-[#B31942] text-lg font-bold text-white shadow-[0_0_20px_rgba(0,40,104,0.3)]"
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
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#002868] to-[#B31942] text-base font-bold text-white shadow-[0_0_15px_rgba(0,40,104,0.3)]"
      >
        {stepNumber}
      </div>
      <p className="text-sm font-semibold" style={{ color: LIGHT_TEXT }}>
        {label}
      </p>
    </motion.div>
  );
}
