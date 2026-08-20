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
    <section ref={ref} className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl lg:text-[2.25rem]">
            Comprehensive Student Services
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#6B7280] sm:text-lg">
            UCSG provides fast, reliable support for every immigration and
            academic challenge international students face
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:mt-16">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-[#F8FAFC] p-7 shadow-sm transition-shadow hover:shadow-md sm:p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
              >
                <motion.div
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#002868]/10"
                  whileHover={{ rotate: [0, -8, 8, -4, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon className="h-6 w-6 text-[#002868]" />
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
                    className="w-full justify-start rounded-lg bg-[#002868] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#001B4D]"
                  >
                    {service.cta}
                    <ArrowRight className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1" />
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
