'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  MessageCircle,
  FileSearch,
  GraduationCap,
  FileText,
  Briefcase,
  BadgeCheck,
} from 'lucide-react';
import { useCounterAnimation } from '@/lib/animations';
import { AnimatedHeading } from '@/components/animations/TextReveal';

const journeySteps = [
  {
    icon: MessageCircle,
    title: 'Free Consultation',
    description: 'Share your situation & goals with UCSG advisors',
    color: '#002868',
    bg: '#EFF6FF',
  },
  {
    icon: FileSearch,
    title: 'Eligibility Check',
    description: 'We assess your status, credits & best options',
    color: '#059669',
    bg: '#D1FAE5',
  },
  {
    icon: GraduationCap,
    title: 'University Admission',
    description: 'Get admitted to an accredited Day 1 CPT university',
    color: '#D97706',
    bg: '#FEF3C7',
  },
  {
    icon: FileText,
    title: 'I-20 & CPT Authorization',
    description: 'Receive your I-20 with work authorization from DSO',
    color: '#7C3AED',
    bg: '#EDE9FE',
  },
  {
    icon: Briefcase,
    title: 'Start Working Legally',
    description: 'Begin your job in your field of study from Day 1',
    color: '#DC2626',
    bg: '#FEE2E2',
  },
  {
    icon: BadgeCheck,
    title: 'OPT',
    description: 'Post-completion work authorization for up to 36 months',
    color: '#002868',
    bg: '#EFF6FF',
  },
];

const counterConfigs: Record<string, { target: number; prefix?: string; suffix?: string } | null> = {
  '5,000+': { target: 5000, suffix: ',+' },
  '99%': { target: 99, suffix: '%' },
  '11+': { target: 11, suffix: '+' },
  '24/7': null,
};

function StatCounter({ stat }: { stat: { value: string; label: string; color: string } }) {
  const config = counterConfigs[stat.value];
  const { ref, text } = useCounterAnimation(config?.target ?? 0, {
    suffix: config?.suffix,
    prefix: config?.prefix,
  });

  if (!config) {
    return (
      <p className="text-xl font-bold sm:text-2xl lg:text-3xl" style={{ color: stat.color }}>
        {stat.value}
      </p>
    );
  }

  return (
    <p className="text-xl font-bold sm:text-2xl lg:text-3xl" style={{ color: stat.color }}>
      <span ref={ref}>{text}</span>
    </p>
  );
}

export default function StudentJourneyInfographic() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-[#F8FAFC] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedHeading
          badge="Your Journey"
          title="From Consultation to Your First Paycheck"
          description="A proven 6-step pathway that has helped 5000+ international students"
          badgeColor="#002868"
        />

        {/* Desktop: Horizontal flow with SVG connector */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* SVG connecting line with gradient */}
            <svg
              className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2"
              style={{ margin: '0 60px' }}
              preserveAspectRatio="none"
            >
              <line x1="0" y1="1" x2="100%" y2="1" stroke="#E2E8F0" strokeWidth="2" />
              <motion.line
                x1="0" y1="1" x2="100%" y2="1"
                stroke="url(#journeyGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, delay: 0.3, ease: 'easeInOut' }}
              />
              <defs>
                <linearGradient id="journeyGrad" x1="0%" y1="0" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#002868" />
                  <stop offset="50%" stopColor="#B31942" />
                  <stop offset="100%" stopColor="#002868" />
                </linearGradient>
              </defs>
            </svg>

            <div className="grid grid-cols-6 gap-3">
              {journeySteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    className="relative flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ delay: 0.2 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Circle node */}
                    <div className="relative mb-4">
                      {/* Animated expanding ring on scroll */}
                      {isInView && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          animate={{ boxShadow: ['0 0 0 0 rgba(0,40,104,0.3)', '0 0 0 12px rgba(0,40,104,0)'] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                        />
                      )}
                      <motion.div
                        className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full shadow-lg"
                        style={{ backgroundColor: step.bg, boxShadow: `0 4px 20px ${step.color}20` }}
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      >
                        <Icon className="h-9 w-9" style={{ color: step.color }} />
                        {/* Step number badge */}
                        <motion.span
                          className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: step.color }}
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : { scale: 0 }}
                          transition={{ delay: 0.4 + i * 0.12, type: 'spring', stiffness: 400, damping: 15 }}
                        >
                          {i + 1}
                        </motion.span>
                      </motion.div>
                    </div>
                    <motion.h3
                      className="text-sm font-bold text-[#0F172A]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.12, duration: 0.4 }}
                    >
                      {step.title}
                    </motion.h3>
                    <motion.p
                      className="mt-1 max-w-[150px] text-xs leading-relaxed text-[#6B7280]"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.12, duration: 0.4 }}
                    >
                      {step.description}
                    </motion.p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: timeline with vertical connectors */}
        <div className="lg:hidden">
          <div className="space-y-0">
            {journeySteps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={`flex items-center gap-4 py-4 ${isEven ? 'flex-row' : 'flex-row-reverse sm:flex-row'}`}>
                    <div
                      className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full shadow-md sm:h-16 sm:w-16"
                      style={{ backgroundColor: step.bg }}
                    >
                      <Icon className="h-7 w-7 sm:h-8 sm:w-8" style={{ color: step.color }} />
                      <span
                        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white sm:h-6 sm:w-6 sm:text-xs"
                        style={{ backgroundColor: step.color }}
                      >
                        {i + 1}
                      </span>
                    </div>
                    <div className={`flex-1 ${isEven ? '' : 'sm:text-left'}`}>
                      <h3 className="text-sm font-bold text-[#0F172A] sm:text-base">{step.title}</h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#6B7280] sm:text-sm">{step.description}</p>
                    </div>
                  </div>
                  {i < journeySteps.length - 1 && (
                    <motion.div
                      className="ml-7 h-3 w-0.5 bg-[#BFDBFE] sm:ml-8"
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : {}}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
                      style={{ transformOrigin: 'top' }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom stats bar with enhanced animation */}
        <motion.div
          className="mt-12 grid grid-cols-2 gap-4 sm:mt-16 sm:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          {[
            { value: '5,000+', label: 'Students Helped', color: '#002868' },
            { value: '99%', label: 'Success Rate', color: '#059669' },
            { value: '11+', label: 'Partner Universities', color: '#D97706' },
            { value: '24/7', label: 'Support Available', color: '#7C3AED' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative overflow-hidden rounded-xl border border-[#BFDBFE] bg-white p-4 text-center shadow-sm sm:p-5"
              whileHover={{ y: -4, scale: 1.03, boxShadow: `0 8px 25px ${stat.color}15` }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Shine sweep overlay */}
              <motion.div
                className="pointer-events-none absolute inset-0"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: i * 0.5 }}
                style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)' }}
              />
              <StatCounter stat={stat} />
              <p className="mt-1 text-xs text-[#6B7280] sm:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
