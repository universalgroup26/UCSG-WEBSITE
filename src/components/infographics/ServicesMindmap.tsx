'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  GraduationCap,
  Building2,
  Shield,
  FileCheck,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface ServiceBranch {
  icon: React.ElementType;
  title: string;
  color: string;
  bg: string;
  border: string;
  subItems: string[];
}

const serviceBranches: ServiceBranch[] = [
  {
    icon: GraduationCap,
    title: 'University Transfers',
    color: '#059669',
    bg: '#D1FAE5',
    border: '#6EE7B7',
    subItems: ['SEVIS Transfer', 'Emergency 24-48hr', 'Credit Evaluation'],
  },
  {
    icon: Building2,
    title: 'Day 1 CPT',
    color: '#002868',
    bg: '#EFF6FF',
    border: '#BFDBFE',
    subItems: ['Work from Day 1', '11+ Universities', 'Full/Part-time'],
  },
  {
    icon: Shield,
    title: 'Change of Status',
    color: '#7C3AED',
    bg: '#EDE9FE',
    border: '#C4B5FD',
    subItems: ['B1/B2 → F1', 'H4 → F1', 'J1/J2 → F1'],
  },
  {
    icon: FileCheck,
    title: 'SEVIS Reinstatement',
    color: '#DC2626',
    bg: '#FEE2E2',
    border: '#FCA5A5',
    subItems: ['I-539 Filing', 'Evidence Prep', '5-Month Window'],
  },
  {
    icon: RefreshCw,
    title: 'STEM OPT Support',
    color: '#D97706',
    bg: '#FEF3C7',
    border: '#FCD34D',
    subItems: ['24-Month Extension', 'RFE Response', 'Backup CPT Plan'],
  },
];

export default function ServicesMindmap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block rounded-full bg-[#EFF6FF] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#002868]">
            Service Map
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
            How UCSG Covers Every Angle
          </h2>
          <p className="mt-3 text-[#6B7280]">
            One consultation, complete coverage — every immigration challenge solved
          </p>
        </motion.div>

        <div className="hidden lg:block">
          <div className="relative mx-auto max-w-6xl">
            <motion.div
              className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            >
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#002868] to-[#001B4D] text-center shadow-2xl">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-blue-200">UNIVERSAL</p>
                  <p className="text-xl font-extrabold text-white">UCSG</p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6 py-4">
              <MindmapBranch branch={serviceBranches[0]} index={0} isInView={isInView} />
              <MindmapBranch branch={serviceBranches[1]} index={1} isInView={isInView} />
              <MindmapBranch branch={serviceBranches[2]} index={2} isInView={isInView} />
              <MindmapBranch branch={serviceBranches[3]} index={3} isInView={isInView} />
              <div className="col-span-2 flex justify-center">
                <MindmapBranch branch={serviceBranches[4]} index={4} isInView={isInView} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 lg:hidden">
          <motion.div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#002868] to-[#001B4D] shadow-xl"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
          >
            <p className="text-lg font-extrabold text-white">UCSG</p>
          </motion.div>

          <div className="mx-auto h-4 w-0.5 bg-[#BFDBFE]" />

          <div className="space-y-3">
            {serviceBranches.map((branch, i) => {
              const Icon = branch.icon;
              return (
                <motion.div
                  key={branch.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className="rounded-xl border p-4 sm:p-5"
                    style={{ borderColor: branch.border, backgroundColor: branch.bg }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: branch.color }}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-[#0F172A] sm:text-base">{branch.title}</h3>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {branch.subItems.map((item) => (
                            <span
                              key={item}
                              className="inline-flex items-center gap-1 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-medium text-[#0F172A] sm:text-xs"
                            >
                              <CheckCircle2 className="h-3 w-3" style={{ color: branch.color }} />
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function MindmapBranch({
  branch,
  index,
  isInView,
}: {
  branch: ServiceBranch;
  index: number;
  isInView: boolean;
}) {
  const Icon = branch.icon;
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.3 + index * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <div
        className="flex flex-col rounded-2xl border p-5 sm:p-6"
        style={{ borderColor: branch.border, backgroundColor: branch.bg }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-md"
            style={{ backgroundColor: branch.color }}
            whileHover={{ rotate: [0, -6, 6, 0], scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            <Icon className="h-6 w-6 text-white" />
          </motion.div>
          <div>
            <h3 className="text-base font-bold text-[#0F172A] sm:text-lg">{branch.title}</h3>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {branch.subItems.map((item, j) => (
            <motion.div
              key={item}
              className="flex items-center gap-2 rounded-lg bg-white/60 px-3 py-2"
              initial={{ opacity: 0, x: -8 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.12 + j * 0.08, duration: 0.3 }}
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: branch.color }} />
              <span className="text-sm font-medium text-[#0F172A]">{item}</span>
              <ArrowRight className="ml-auto h-3 w-3 text-[#6B7280] opacity-50" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
