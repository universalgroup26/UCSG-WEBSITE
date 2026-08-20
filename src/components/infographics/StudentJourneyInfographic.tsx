'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MessageCircle,
  FileSearch,
  GraduationCap,
  FileText,
  Briefcase,
  BadgeCheck,
} from 'lucide-react';

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
    title: 'Path to H-1B',
    description: 'Build experience & transition to H-1B with employer',
    color: '#002868',
    bg: '#EFF6FF',
  },
];

export default function StudentJourneyInfographic() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-[#F8FAFC] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block rounded-full bg-[#EFF6FF] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#002868]">
            Your Journey
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
            From Consultation to Your First Paycheck
          </h2>
          <p className="mt-3 text-[#6B7280]">
            A proven 6-step pathway that has helped 5000+ international students
          </p>
        </motion.div>

        {/* Desktop: Horizontal flow with SVG connector */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* SVG connecting line */}
            <svg
              className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2"
              style={{ margin: '0 60px' }}
              preserveAspectRatio="none"
            >
              <motion.line
                x1="0" y1="1" x2="100%" y2="1"
                stroke="#BFDBFE"
                strokeWidth="2"
                strokeDasharray="8 4"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
              />
            </svg>

            <div className="grid grid-cols-6 gap-3">
              {journeySteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    className="relative flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Circle node */}
                    <motion.div
                      className="relative z-10 mb-4 flex h-20 w-20 items-center justify-center rounded-full shadow-lg"
                      style={{ backgroundColor: step.bg, boxShadow: `0 4px 20px ${step.color}20` }}
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                      <Icon className="h-9 w-9" style={{ color: step.color }} />
                      {/* Step number badge */}
                      <span
                        className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: step.color }}
                      >
                        {i + 1}
                      </span>
                    </motion.div>
                    <h3 className="text-sm font-bold text-[#0F172A]">{step.title}</h3>
                    <p className="mt-1 max-w-[150px] text-xs leading-relaxed text-[#6B7280]">{step.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: 2x3 grid with vertical connectors */}
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
                    {/* Icon circle */}
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
                    {/* Text content */}
                    <div className={`flex-1 ${isEven ? '' : 'sm:text-left'}`}>
                      <h3 className="text-sm font-bold text-[#0F172A] sm:text-base">{step.title}</h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#6B7280] sm:text-sm">{step.description}</p>
                    </div>
                  </div>
                  {/* Connector line */}
                  {i < journeySteps.length - 1 && (
                    <div className="ml-7 h-3 w-0.5 bg-[#BFDBFE] sm:ml-8" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom stats bar */}
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
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-[#BFDBFE] bg-white p-4 text-center shadow-sm sm:p-5"
            >
              <p className="text-xl font-bold sm:text-2xl lg:text-3xl" style={{ color: stat.color }}>
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-[#6B7280] sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
