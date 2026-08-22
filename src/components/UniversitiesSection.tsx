'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, Variants } from 'framer-motion';
import { Send, MapPin, GraduationCap } from 'lucide-react';
import type { UniversityData } from '@/lib/data/universities';
import { universities } from '@/lib/data/universities';
import CampusVisual from '@/components/CampusVisual';

interface Props {
  onUniversityClick?: (university: UniversityData) => void;
  onApplyClick?: (universityId?: string) => void;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

export default function UniversitiesSection({ onUniversityClick, onApplyClick }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block rounded-full bg-[#002868]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#002868]">
            SEVP-Certified Partners
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl lg:text-[2.25rem]">
            Our Partner Universities
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#6B7280]">
            UCSG partners with {universities.length} SEVP-certified universities and training institutes offering CPT or Day 1 CPT programs. Click any card to explore.
          </p>
        </motion.div>

        {/* All Universities Grid - Same Style */}
        <motion.div
          className="mt-10"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-5">
            {universities.map((uni) => (
              <motion.div
                key={uni.id}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onUniversityClick?.(uni)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onUniversityClick?.(uni); }}
                className="group relative cursor-pointer flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#002868]/30 hover:shadow-xl hover:shadow-[#002868]/5 sm:p-5 lg:p-6"
              >
                {/* Glowing ring effect on hover */}
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: '0 0 30px rgba(0,40,104,0.15), inset 0 0 30px rgba(0,40,104,0.03)' }}
                />

                {/* Logo Container */}
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 group-hover:shadow-md sm:h-24 sm:w-24">
                  <Image
                    src={uni.logoPath}
                    alt={`${uni.name} logo`}
                    width={96}
                    height={96}
                    className="h-full w-full object-contain p-1.5 transition-transform duration-300 group-hover:scale-110"
                    unoptimized
                  />
                </div>

                {/* University Name */}
                <span className="text-center text-xs font-semibold leading-tight text-[#0F172A] transition-colors duration-200 group-hover:text-[#002868] sm:text-sm">
                  {uni.shortName}
                </span>

                {/* Location Badge */}
                <div className="flex items-center gap-1 text-[10px] text-[#6B7280] sm:text-xs">
                  <MapPin className="h-2.5 w-2.5" />
                  <span>{uni.location}</span>
                </div>

                {/* Apply Now Button */}
                <motion.button
                  onClick={(e) => { e.stopPropagation(); onApplyClick?.(uni.id); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full rounded-lg bg-gradient-to-r from-[#B31942] to-[#002868] px-3 py-2 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-110 sm:text-sm"
                >
                  <Send className="mr-1 inline h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  Apply Now
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Campus Visual */}
        <motion.div
          className="mx-auto mb-10 mt-14 max-w-5xl lg:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <CampusVisual />
        </motion.div>

        {/* Footer Note */}
        <motion.p
          className="mt-6 text-center text-sm text-[#6B7280]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          All institutions are SEVP-certified and offer CPT or Day 1 CPT programs. Contact UCSG for personalized guidance.
        </motion.p>
      </div>
    </section>
  );
}
