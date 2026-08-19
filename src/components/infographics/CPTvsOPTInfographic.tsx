'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Clock, GraduationCap, FileText, Shield, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export default function CPTvsOPTInfographic() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const comparisonRows = [
    {
      feature: 'When Can You Start?',
      cpt: 'Day 1 of program',
      opt: 'After graduation',
      cptIcon: Clock,
      optIcon: GraduationCap,
    },
    {
      feature: 'Authorization Type',
      cpt: 'CPT (I-20)',
      opt: 'EAD Card (I-765)',
      cptIcon: FileText,
      optIcon: FileText,
    },
    {
      feature: 'Must Be Enrolled?',
      cpt: 'Yes, part-time OK',
      opt: 'No, post-completion',
      cptIcon: GraduationCap,
      optIcon: CheckCircle2,
    },
    {
      feature: 'Work Must Match Major?',
      cpt: 'Yes, always',
      opt: 'Yes, related field',
      cptIcon: Shield,
      optIcon: Shield,
    },
    {
      feature: 'Duration Limit',
      cpt: 'Per semester, renewable',
      opt: '12 months (+ 24 STEM)',
      cptIcon: Clock,
      optIcon: Clock,
    },
    {
      feature: 'Full-time Allowed?',
      cpt: 'Yes (if part-time study)',
      opt: 'Yes (post-completion)',
      cptIcon: CheckCircle2,
      optIcon: CheckCircle2,
    },
    {
      feature: '12+ Mo Full-time Impact',
      cpt: 'Loses OPT eligibility',
      opt: 'N/A',
      cptIcon: XCircle,
      optIcon: CheckCircle2,
    },
  ];

  return (
    <section ref={ref} className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {} }
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block rounded-full bg-[#FEF3C7] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#D97706]">
            Comparison
          </span>
          <h2 className="mt-4 text-xl font-bold text-[#0F172A] sm:text-2xl">
            CPT vs OPT — Side by Side
          </h2>
          <p className="mt-2 text-sm text-[#6B7280] sm:text-base">
            Understand the key differences to choose the right path
          </p>
        </motion.div>

        <motion.div
          className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {} }
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Header Row */}
          <div className="grid grid-cols-3 border-b border-gray-100 bg-[#0F172A]">
            <div className="px-4 py-4 text-sm font-semibold text-white/70 sm:px-6 sm:py-5">
              Feature
            </div>
            <div className="border-l border-white/10 px-4 py-4 text-center sm:px-6 sm:py-5">
              <div className="flex items-center justify-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#002868]">
                  <Briefcase className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-bold text-white sm:text-base">CPT</span>
              </div>
            </div>
            <div className="border-l border-white/10 px-4 py-4 text-center sm:px-6 sm:py-5">
              <div className="flex items-center justify-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7C3AED]">
                  <GraduationCap className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-bold text-white sm:text-base">OPT</span>
              </div>
            </div>
          </div>

          {/* Data Rows */}
          {comparisonRows.map((row, i) => {
            const CptIcon = row.cptIcon;
            const OptIcon = row.optIcon;
            return (
              <motion.div
                key={row.feature}
                className="grid grid-cols-3 border-b border-gray-50 last:border-b-0"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {} }
                transition={{ delay: 0.3 + i * 0.06, duration: 0.3 }}
                whileHover={{ backgroundColor: '#F9FAFB' }}
              >
                <div className="flex items-center gap-2 px-4 py-3.5 sm:px-6">
                  <span className="text-xs font-semibold text-[#0F172A] sm:text-sm">{row.feature}</span>
                </div>
                <div className="flex items-center justify-center gap-2 border-l border-gray-50 px-4 py-3.5 text-center sm:px-6">
                  <CptIcon className="h-3.5 w-3.5 shrink-0 text-[#002868] sm:h-4 sm:w-4" />
                  <span className="text-xs text-[#4B5563] sm:text-sm">{row.cpt}</span>
                </div>
                <div className="flex items-center justify-center gap-2 border-l border-gray-50 px-4 py-3.5 text-center sm:px-6">
                  <OptIcon className="h-3.5 w-3.5 shrink-0 text-[#7C3AED] sm:h-4 sm:w-4" />
                  <span className="text-xs text-[#4B5563] sm:text-sm">{row.opt}</span>
                </div>
              </motion.div>
            );
          })}

          {/* Bottom Verdict */}
          <motion.div
            className="grid grid-cols-3 border-t-2 border-gray-100 bg-[#F8FAFC]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {} }
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="flex items-center px-4 py-3 sm:px-6">
              <span className="text-xs font-bold text-[#0F172A] sm:text-sm">Best For</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 border-l border-gray-100 px-4 py-3 sm:px-6">
              <span className="rounded-full bg-[#EFF6FF] px-2.5 py-1 text-[10px] font-bold text-[#002868] sm:text-xs">Immediate Work</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 border-l border-gray-100 px-4 py-3 sm:px-6">
              <span className="rounded-full bg-[#EDE9FE] px-2.5 py-1 text-[10px] font-bold text-[#7C3AED] sm:text-xs">Post-Graduation</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom insight */}
        <motion.div
          className="mx-auto mt-6 flex max-w-3xl items-start gap-3 rounded-xl border border-[#EFF6FF] bg-[#F0FBFD] p-4 sm:mt-8 sm:p-5"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {} }
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#002868]">
            <ArrowRight className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0F172A]">UCSG Recommendation</p>
            <p className="mt-1 text-xs leading-relaxed text-[#6B7280] sm:text-sm">
              Use <strong className="text-[#002868]">Day 1 CPT</strong> while enrolled to gain experience and income, then transition to{' '}
              <strong className="text-[#7C3AED]">OPT</strong> after graduation for maximum work authorization (up to 36 months for STEM). UCSG helps you plan both phases.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
