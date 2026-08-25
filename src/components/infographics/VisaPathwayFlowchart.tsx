'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Globe,
  Users,
  FileText,
  GraduationCap,
  Briefcase,
  Shield,
  CheckCircle2,
  Clock,
} from 'lucide-react';

const pathways = [
  {
    from: 'B1/B2 Visitor',
    color: '#002868',
    bg: '#EFF6FF',
    icon: Globe,
    steps: ['File I-539 with USCIS', 'Get I-20 from University', 'Show Non-Immigrant Intent', 'Wait 3-6 Months for Approval', 'Begin F-1 Studies + CPT'],
    timeline: '3-6 Months',
    difficulty: 'Medium',
  },
  {
    from: 'H4 Dependent',
    color: '#7C3AED',
    bg: '#EDE9FE',
    icon: Users,
    steps: ['Confirm H-1B Spouse Valid', 'File I-539', 'Get I-20', 'F-1 Approval → CPT Authorization'],
    timeline: '3-6 Months',
    difficulty: 'Medium',
  },
  {
    from: 'J1/J2 Exchange',
    color: '#D97706',
    bg: '#FEF3C7',
    icon: ArrowRight,
    steps: ['Check 2-Year Home Residency Rule', 'Get Waiver if Required', 'File I-539', 'Wait for Approval → F-1'],
    timeline: '4-8 Months',
    difficulty: 'Complex',
  },
  {
    from: 'F2 Dependent',
    color: '#059669',
    bg: '#D1FAE5',
    icon: Shield,
    steps: ['F-1 Spouse/Dependent', 'Apply for Own I-20', 'File I-539', 'Approval → Study + CPT'],
    timeline: '2-4 Months',
    difficulty: 'Easier',
  },
];

export default function VisaPathwayFlowchart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <span className="inline-block rounded-full bg-[#EDE9FE] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#7C3AED]">
            Pathway Map
          </span>
          <h2 className="mt-4 text-xl font-bold text-[#0F172A] sm:text-2xl">
            Your Visa to F-1 Conversion Paths
          </h2>
          <p className="mt-2 text-sm text-[#6B7280] sm:text-base">
            Multiple pathways, one destination — UCSG handles them all
          </p>
        </motion.div>

        {/* Flowchart: Current Status → Process → F-1 Status */}
        <div className="space-y-6">
          {pathways.map((path, i) => {
            const PathIcon = path.icon;
            return (
              <motion.div
                key={path.from}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                {/* Pathway Header */}
                <div
                  className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5"
                  style={{ backgroundColor: path.bg }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-md"
                      style={{ backgroundColor: path.color }}
                    >
                      <PathIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-[#0F172A] sm:text-lg">{path.from}</span>
                        <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-semibold sm:text-xs" style={{ color: path.color }}>
                          {path.difficulty}
                        </span>
                      </div>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-[#6B7280] sm:text-sm">
                        <Clock className="h-3 w-3" />
                        Estimated: {path.timeline}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Process Steps */}
                <div className="px-4 py-4 sm:px-6 sm:py-5">
                  <div className="flex flex-wrap items-center gap-2">
                    {path.steps.map((step, j) => (
                      <React.Fragment key={`${i}-${j}`}>
                        <motion.div
                          key={step}
                          className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs sm:text-sm"
                          style={{ borderColor: path.bg, color: '#0F172A' }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.3 + i * 0.1 + j * 0.08, duration: 0.3 }}
                          whileHover={{ scale: 1.03 }}
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: path.color }}>
                            {j + 1}
                          </span>
                          {step}
                        </motion.div>
                        {j < path.steps.length - 1 && (
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#BFDBFE]" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Destination: F-1 Status */}
        <motion.div
          className="mt-8 flex flex-col items-center sm:mt-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#BFDBFE]">
              <GraduationCap className="h-6 w-6 text-[#002868]" />
            </div>
            <ArrowRight className="h-5 w-5 -rotate-90 text-[#BFDBFE]" />
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#002868] to-[#001B4D] shadow-lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/30">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
            </div>
            <p className="mt-1 text-sm font-bold text-[#0F172A]">F-1 Status + CPT Work Authorization</p>
            <p className="text-xs text-[#6B7280]">Begin your career in the USA with legal work permission</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
