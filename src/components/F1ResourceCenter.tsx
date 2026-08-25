'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowLeftRight,
  GitCompare,
  HelpCircle,
  Clock,
  Calculator,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  GraduationCap,
  DollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  category: string;
}

const allResources: ResourceCard[] = [
  {
    id: 'university-transfer-checklist',
    resourceId: 'university-transfers',
    icon: ArrowLeftRight,
    title: 'University Transfer Checklist',
    description: 'Step-by-step checklist for a smooth university transfer while maintaining F-1 status.',
    category: 'transfer',
  },
  {
    id: 'maintaining-f1-status',
    resourceId: 'sevis-reinstatement',
    icon: ShieldCheck,
    title: 'Maintaining F-1 Status During a Transfer',
    description: 'Key requirements and common pitfalls to avoid when transferring between SEVP-certified schools.',
    category: 'transfer',
  },
  {
    id: 'dso-questions',
    resourceId: 'change-of-status',
    icon: HelpCircle,
    title: 'Questions to Ask Your DSO',
    description: 'Prepare for your DSO meeting with this list of essential questions about your program and work authorization.',
    category: 'transfer',
  },
  {
    id: 'cpt-vs-opt',
    resourceId: 'day1-cpt',
    icon: GitCompare,
    title: 'CPT vs. OPT: Key Differences',
    description: 'Understand the distinctions between Curricular Practical Training and Optional Practical Training.',
    category: 'cpt-opt',
  },
  {
    id: 'opt-stem-opt-planning',
    resourceId: 'stem-opt',
    icon: Clock,
    title: 'OPT/STEM OPT Planning Checklist',
    description: 'Timeline and preparation guide for OPT application and STEM OPT extension.',
    category: 'cpt-opt',
  },
  {
    id: 'cpt-educational-resources',
    resourceId: 'day1-cpt',
    icon: BookOpen,
    title: 'CPT Educational Resources',
    description: 'Curricular Practical Training requirements, eligibility, and how to discuss CPT with your DSO.',
    category: 'cpt-opt',
  },
  {
    id: 'compare-program-cost',
    resourceId: 'university-transfers',
    icon: Calculator,
    title: 'How to Compare Total Program Cost',
    description: 'Beyond tuition — understand fees, living costs, and hidden expenses across programs.',
    category: 'planning',
  },
  {
    id: 'scholarship-funding',
    resourceId: 'university-transfers',
    icon: DollarSign,
    title: 'Scholarship and Funding Resources',
    description: 'Explore scholarship opportunities and funding options available to international graduate students.',
    category: 'planning',
  },
  {
    id: 'graduate-program-comparison',
    resourceId: 'day1-cpt',
    icon: GraduationCap,
    title: 'Graduate Program Comparison',
    description: "How to evaluate and compare Master's, PhD, and DBA programs across multiple universities.",
    category: 'planning',
  },
];

const categories = [
  { id: 'all', label: 'All Resources' },
  { id: 'transfer', label: 'Transfer Resources' },
  { id: 'cpt-opt', label: 'CPT & OPT Education' },
  { id: 'planning', label: 'Program & Cost Planning' },
];

export default function F1ResourceCenter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredResources =
    activeCategory === 'all'
      ? allResources
      : allResources.filter((r) => r.category === activeCategory);

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

  const handleViewAll = () => {
    track.ctaClick({
      cta_type: 'consultation',
      cta_source: 'resource_center',
      cta_text: 'View All Resources',
    });
    // Navigate to the first resource to show the resource page
    window.dispatchEvent(
      new CustomEvent('ucsg-navigate', {
        detail: { view: 'resource', id: 'university-transfers' },
      }),
    );
  };

  return (
    <section
      ref={sectionRef}
      aria-label="F-1 Resource Center"
      id="f1-resource-center"
    >
      {/* Background hero image section */}
      <div className="relative overflow-hidden bg-[#061846]">
        <div className="relative mx-auto flex min-h-[320px] max-w-[1200px] items-center px-4 py-16 sm:min-h-[360px] sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          {/* Background image */}
          <Image
            src="/images/ucsg-resource-center.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            unoptimized
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(6,24,70,.94) 0%, rgba(6,24,70,.78) 50%, rgba(6,24,70,.60) 100%)',
            }}
            aria-hidden="true"
          />
          {/* Content */}
          <div className="relative z-10 max-w-2xl">
            <motion.p
              className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#D6A84B]"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
            >
              F-1 Student Resource Center
            </motion.p>
            <motion.h2
              className="font-heading text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
            >
              Source-Backed Guides for Informed Decisions
            </motion.h2>
            <motion.p
              className="mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={2}
            >
              Resources created to help F-1 students prepare better questions and make
              informed educational decisions.
            </motion.p>
            <motion.div
              className="mt-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={3}
            >
              <Button
                onClick={handleViewAll}
                className="h-11 rounded-lg bg-[#0874F9] px-6 text-sm font-semibold text-white shadow-lg shadow-[#0874F9]/25 transition-colors hover:bg-[#0660D4]"
              >
                View All Resources
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Resource cards section */}
      <div className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        {/* Subtle background texture */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/bg-sevis.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-white/92" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          {/* Category filter tabs */}
          <div
            className="mb-10 flex flex-wrap items-center gap-2"
            role="tablist"
            aria-label="Resource categories"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors ' +
                  (activeCategory === cat.id
                    ? 'bg-[#061846] text-white'
                    : 'bg-[#EDF5FF] text-[#061846] hover:bg-[#0874F9]/10')
                }
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {filteredResources.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.button
                  key={card.id}
                  type="button"
                  className="group flex flex-col items-start rounded-lg border border-slate-200 bg-white p-6 text-left transition-all duration-200 hover:shadow-md hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2"
                  variants={fadeUp}
                  custom={idx}
                  onClick={() => handleCardClick(card)}
                >
                  <div className="mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0874F9]/10">
                    <Icon className="h-5 w-5 text-[#0874F9]" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-base font-semibold leading-snug text-[#061846]">
                    {card.title}
                  </h3>
                  <p className="mt-2 flex-1 text-base leading-relaxed text-slate-500">
                    {card.description}
                  </p>
                  <div className="mt-4 w-full border-t border-slate-100 pt-4">
                    <p className="text-xs text-slate-400">UCSG Editorial Team</p>
                    <p className="mt-1 text-xs text-slate-400">Last reviewed: August 2025</p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">
                      Sources:{' '}
                      <a
                        href="https://www.uscis.gov"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0874F9] hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          track.externalLink('https://www.uscis.gov', 'USCIS');
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
                          track.externalLink('https://studyinthestates.dhs.gov', 'Study in the States');
                        }}
                      >
                        Study in the States
                      </a>
                    </p>
                  </div>
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
      </div>
    </section>
  );
}
