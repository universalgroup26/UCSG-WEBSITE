'use client';

import { useRef, useEffect, useCallback, type LucideIcon } from 'react';
import {
  ArrowLeftRight,
  GitCompare,
  HelpCircle,
  Clock,
  Calculator,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { track } from '@/lib/analytics';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

interface ResourceCard {
  id: string;
  resourceId: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const resources: ResourceCard[] = [
  {
    id: 'university-transfer-checklist',
    resourceId: 'university-transfers',
    icon: ArrowLeftRight,
    title: 'University Transfer Checklist',
    description:
      'Step-by-step checklist for a smooth university transfer while maintaining F-1 status.',
  },
  {
    id: 'cpt-vs-opt',
    resourceId: 'day1-cpt',
    icon: GitCompare,
    title: 'CPT vs. OPT: Key Differences',
    description:
      'Understand the distinctions between Curricular Practical Training and Optional Practical Training.',
  },
  {
    id: 'dso-questions',
    resourceId: 'change-of-status',
    icon: HelpCircle,
    title: 'Questions to Ask Your DSO',
    description:
      'Prepare for your DSO meeting with this list of essential questions about your program and work authorization.',
  },
  {
    id: 'opt-stem-opt-planning',
    resourceId: 'stem-opt',
    icon: Clock,
    title: 'OPT/STEM OPT Planning Checklist',
    description:
      'Timeline and preparation guide for OPT application and STEM OPT extension.',
  },
  {
    id: 'compare-program-cost',
    resourceId: 'university-transfers',
    icon: Calculator,
    title: 'How to Compare Total Program Cost',
    description:
      "Beyond tuition — understand fees, living costs, and hidden expenses across programs.",
  },
  {
    id: 'maintaining-f1-status',
    resourceId: 'sevis-reinstatement',
    icon: ShieldCheck,
    title: 'Maintaining F-1 Status During a Transfer',
    description:
      'Key requirements and common pitfalls to avoid when transferring between SEVP-certified schools.',
  },
];

export default function F1ResourceCenter() {
  const sectionRef = useRef<HTMLElement>(null);

  // Section view tracking
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            track.sectionView('f1_resource_center');
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCardClick = useCallback((card: ResourceCard) => {
    track.navClick({
      nav_type: 'body',
      nav_target: `resource:${card.resourceId}`,
      nav_text: card.title,
    });
    window.dispatchEvent(
      new CustomEvent('ucsg-navigate', {
        detail: { view: 'resource', id: card.resourceId },
      }),
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="F-1 Resource Center"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          className="mb-12 text-center sm:mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#0874F9]">
            F-1 Resource Center
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-[#061846] sm:text-3xl lg:text-4xl">
            Practical Resources for F-1 Students
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
            Source-backed guides to help you make informed decisions about your education
            and status.
          </p>
        </motion.div>

        {/* Cards grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {resources.map((card) => {
            const Icon = card.icon;
            return (
              <motion.button
                key={card.id}
                type="button"
                className="group flex flex-col items-start rounded-lg border border-slate-200 bg-white p-6 text-left transition-all duration-200 hover:shadow-md hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2"
                variants={fadeUp}
                onClick={() => handleCardClick(card)}
              >
                {/* Icon */}
                <div className="mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0874F9]/10">
                  <Icon
                    className="h-5 w-5 text-[#0874F9]"
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3 className="font-heading text-base font-semibold leading-snug text-[#061846]">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-base leading-relaxed text-slate-500">
                  {card.description}
                </p>

                {/* Meta info */}
                <div className="mt-auto pt-4 w-full border-t border-slate-100 mt-4">
                  <p className="text-xs text-slate-400">
                    UCSG Editorial Team
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Last reviewed: August 2025
                  </p>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    Sources:{' '}
                    <a
                      href="https://www.uscis.gov"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0874F9] hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        track.externalLink(
                          'https://www.uscis.gov',
                          'USCIS',
                        );
                      }}
                    >
                      USCIS
                    </a>
                    {', '}
                    <a
                      href="https://studyinthestates.dhs.gov"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0874F9] hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        track.externalLink(
                          'https://studyinthestates.dhs.gov',
                          'Study in the States',
                        );
                      }}
                    >
                      Study in the States
                    </a>
                  </p>
                </div>

                {/* Read more indicator */}
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#0874F9] transition-transform group-hover:translate-x-0.5">
                  Read guide
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          className="mt-12 text-center sm:mt-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={8}
        >
          <p className="mx-auto max-w-3xl text-xs leading-relaxed text-slate-400">
            UCSG provides educational information and student-support services.
            Admission, scholarships, visa status, SEVIS transfer, CPT/OPT
            authorization and employment outcomes are not guaranteed. Students
            should confirm employment authorization with their Designated School
            Official and seek advice from a qualified immigration attorney when
            necessary.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
