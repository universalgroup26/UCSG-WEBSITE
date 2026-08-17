'use client';

import {
  ArrowRight,
  GraduationCap,
  Building2,
  Shield,
  FileCheck,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: GraduationCap,
    title: 'University Transfers',
    resourceId: 'university-transfers',
    description:
      'If your SEVIS is terminated or you need a university transfer, we can connect you with SEVP-approved universities within 24\u201348 hours. Don\'t risk falling out of status \u2013 act now.',
    cta: 'Start University Transfer Today',
  },
  {
    icon: Building2,
    title: 'Day 1 CPT Universities',
    resourceId: 'day1-cpt',
    description:
      'Looking for universities that offer Day 1 CPT? We work with reliable institutions across the USA that allow you to study and work legally from day one.',
    cta: 'Explore Day 1 CPT Options',
  },
  {
    icon: Shield,
    title: 'Change of Status (to F1)',
    resourceId: 'change-of-status',
    description:
      "Whether you're on B1/B2, F2, H1, H4, J1/J2 or another status, we guide you through the Change of Status (COS) to F1 process. From I-20 issuance to university placement, we handle it all.",
    cta: 'Apply for Change of Status',
  },
  {
    icon: FileCheck,
    title: 'SEVIS Reinstatement',
    resourceId: 'sevis-reinstatement',
    description:
      'A terminated SEVIS record doesn\'t have to end your journey. We help prepare strong reinstatement requests with supporting documentation to improve your chances of approval.',
    cta: 'Request SEVIS Reinstatement Help',
  },
  {
    icon: RefreshCw,
    title: 'STEM OPT Denials',
    resourceId: 'stem-opt',
    description:
      'If your STEM OPT is denied, expiring, or you need a backup plan, UCSG provides emergency university admissions with Day 1 CPT so you can continue working legally in the USA.',
    cta: 'Get STEM OPT Backup Plan',
  },
];

interface Props {
  onResourceClick?: (resourceId: string) => void;
}

export default function ServicesSection({ onResourceClick }: Props) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl lg:text-[2.25rem]">
            Comprehensive Visa &amp; Status Solutions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#64748B] sm:text-lg">
            We provide fast, reliable support for every immigration challenge
            international students face
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:mt-16">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group flex flex-col rounded-2xl border border-[#BFDBFE] bg-[#F8FAFC] p-7 shadow-sm transition-shadow hover:shadow-md sm:p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#DBEAFE]">
                  <Icon className="h-6 w-6 text-[#0070F3]" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#111827]">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#64748B]">
                  {service.description}
                </p>
                <div className="mt-6">
                  <Button
                    variant="default"
                    onClick={() => onResourceClick?.(service.resourceId)}
                    className="w-full justify-start rounded-lg bg-[#0070F3] px-4 py-5 text-sm font-medium text-white hover:bg-[#0060D3]"
                  >
                    {service.cta}
                    <ArrowRight className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
