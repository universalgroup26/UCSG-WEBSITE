'use client';

import { useRef } from 'react';
import {
  ArrowRight,
  GraduationCap,
  Building2,
  Shield,
  FileCheck,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useInView } from 'framer-motion';

const services = [
  { icon: GraduationCap, title: 'University Transfers', resourceId: 'university-transfers', description: "If your SEVIS is terminated or you need a university transfer, UCSG can connect you with SEVP-approved universities within 24\u201348 hours. Don't risk falling out of status \u2013 act now.", cta: 'Start University Transfer Today' },
  { icon: Building2, title: 'Day 1 CPT Universities', resourceId: 'day1-cpt', description: 'Looking for universities that offer Day 1 CPT? UCSG works with reliable institutions across the USA that allow you to study and work legally from day one.', cta: 'Explore Day 1 CPT Options' },
  { icon: Shield, title: 'Change of Status (to F1)', resourceId: 'change-of-status', description: "Whether you're on B1/B2, F2, H1, H4, J1/J2 or another status, UCSG guides you through the Change of Status (COS) to F1 process. From I-20 issuance to university placement, we handle it all.", cta: 'Apply for Change of Status' },
  { icon: FileCheck, title: 'SEVIS Reinstatement', resourceId: 'sevis-reinstatement', description: "A terminated SEVIS record doesn't have to end your journey. UCSG helps prepare strong reinstatement requests with supporting documentation to improve your chances of approval.", cta: 'Request SEVIS Reinstatement Help' },
  { icon: RefreshCw, title: 'STEM OPT Denials', resourceId: 'stem-opt', description: 'If your STEM OPT is denied, expiring, or you need a backup plan, UCSG provides emergency university admissions with Day 1 CPT so you can continue working legally in the USA.', cta: 'Get STEM OPT Backup Plan' },
];

interface Props {
  onResourceClick?: (resourceId: string) => void;
}

export default function ServicesSection({ onResourceClick }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-gradient-to-b from-white via-[#F8FAFC] to-white py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block bg-[#002868]/5 border border-[#002868]/10 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#002868]">
            Our Services
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
            Comprehensive Student Services
          </h2>
          <div className="mx-auto mt-5 h-1 w-[60px] rounded-full bg-gradient-to-r from-[#002868] to-[#B31942]" />
          <p className="mt-5 text-base leading-relaxed text-[#6B7280] sm:text-lg">
            UCSG provides fast, reliable support for every immigration and
            academic challenge international students face
          </p>
        </motion.div>

        {/* Services Grid - Unified 3-col layout, bottom row centered */}
        <div className="mt-14 grid gap-6 sm:gap-8 sm:mt-18 lg:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isBottomRow = i >= 3;
            return (
              <motion.div
                key={service.title}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100/80 bg-white p-7 shadow-[0_2px_20px_-4px_rgba(0,40,104,0.08)] transition-all duration-300 hover:border-[#002868]/20 hover:shadow-[0_8px_30px_-4px_rgba(0,40,104,0.15)] sm:p-8 ${isBottomRow ? 'sm:col-span-1 lg:col-span-1' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.01 }}
              >
                <div className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full bg-gradient-to-b from-[#002868] to-[#B31942] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <motion.div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#002868]/10 to-[#002868]/5"
                  whileHover={{ rotate: [0, -8, 8, -4, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon className="h-6 w-6 text-[#002868] transition-transform duration-300 group-hover:scale-110" />
                </motion.div>
                <h3 className="mt-5 text-lg font-semibold text-[#0F172A]">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7280]">
                  {service.description}
                </p>
                <div className="mt-6">
                  <Button
                    variant="default"
                    onClick={() => onResourceClick?.(service.resourceId)}
                    className="group/btn relative w-full justify-start overflow-hidden rounded-lg bg-gradient-to-r from-[#002868] to-[#001B4D] px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_4px_15px_rgba(0,40,104,0.3)]"
                  >
                    <span className="relative z-10">{service.cta}</span>
                    <ArrowRight className="relative z-10 ml-auto h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
