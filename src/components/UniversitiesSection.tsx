'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Send } from 'lucide-react';
import type { UniversityData } from '@/lib/data/universities';
import { getUniversityById } from '@/lib/data/universities';
import CampusVisual from '@/components/CampusVisual';

interface Props {
  onUniversityClick?: (university: UniversityData) => void;
  onApplyClick?: (universityId?: string) => void;
}

const universities = [
  { id: 'trine', name: 'Trine University', shortName: 'Trine University', initials: 'TU', color: '#003366', logoPath: '/universities/trine.png' },
  { id: 'monroe', name: 'Monroe University', shortName: 'Monroe University', initials: 'MU', color: '#1B3A4B', logoPath: '/universities/monroe.png' },
  { id: 'saint-francis', name: 'Saint Francis University', shortName: 'Saint Francis University', initials: 'SFU', color: '#8B0000', logoPath: '/universities/saint-francis.png' },
  { id: 'tacoma-community', name: 'Tacoma Community College', shortName: 'Tacoma Community', initials: 'TCC', color: '#1A3C5E', logoPath: '/universities/tacoma-community.png' },
  { id: 'computer-system-institutes', name: 'Computer System Institutes', shortName: 'Computer System Institutes', initials: 'CSI', color: '#003366', logoPath: '/universities/csi.png' },
  { id: 'curry', name: 'Curry College', shortName: 'Curry College', initials: 'CC', color: '#003B5C', logoPath: '/universities/curry.png' },
  { id: 'dream-it', name: 'Dream IT', shortName: 'Dream IT', initials: 'DIT', color: '#2E86AB', logoPath: '/universities/dream-it.png' },
  { id: 'ny-language-center', name: 'NEW YORK Language Center', shortName: 'NY Language Center', initials: 'NYLC', color: '#B31942', logoPath: '/universities/nylc.png' },
  { id: 'international-american-university', name: 'International American University', shortName: 'Intl American Univ', initials: 'IAU', color: '#1A3A5C', logoPath: '/universities/iau.png' },
  { id: 'ny-general-consulting', name: 'NEW YORK General Consulting', shortName: 'NY General Consulting', initials: 'NYGC', color: '#002868', logoPath: '/universities/nygc.png' },
  { id: 'westcliff', name: 'Westcliff University', shortName: 'Westcliff University', initials: 'WU', color: '#1A3A5C', logoPath: '/universities/westcliff.png' },
];

const otherUniversities = [
  { id: 'computer-system-institutes', name: 'Computer System Institutes', shortName: 'Computer System Institutes', initials: 'CSI', color: '#003366', logoPath: '/universities/csi.png' },
  { id: 'curry', name: 'Curry College', shortName: 'Curry College', initials: 'CC', color: '#003B5C', logoPath: '/universities/curry.png' },
  { id: 'dream-it', name: 'Dream IT', shortName: 'Dream IT', initials: 'DIT', color: '#2E86AB', logoPath: '/universities/dream-it.png' },
  { id: 'ny-language-center', name: 'NEW YORK Language Center', shortName: 'NY Language Center', initials: 'NYLC', color: '#B31942', logoPath: '/universities/nylc.png' },
  { id: 'international-american-university', name: 'International American University', shortName: 'Intl American Univ', initials: 'IAU', color: '#1A3A5C', logoPath: '/universities/iau.png' },
  { id: 'ny-general-consulting', name: 'NEW YORK General Consulting', shortName: 'NY General Consulting', initials: 'NYGC', color: '#002868', logoPath: '/universities/nygc.png' },
  { id: 'westcliff', name: 'Westcliff University', shortName: 'Westcliff University', initials: 'WU', color: '#1A3A5C', logoPath: '/universities/westcliff.png' },
];

export default function UniversitiesSection({ onUniversityClick, onApplyClick }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

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
            Our Partner Universities
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#6B7280]">
            UCSG partners with SEVP-certified universities and training institutes offering CPT or Day 1 CPT programs. Click any logo to explore.
          </p>
        </motion.div>

        {/* Featured Universities */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-[#B31942]">Featured Universities</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {universities.slice(0, 4).map((uni, i) => (
              <motion.button
                key={uni.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  const data = getUniversityById(uni.id);
                  if (data) onUniversityClick?.(data);
                }}
                className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-[#BFDBFE] bg-white p-5 transition-all hover:border-[#002868]/40 hover:shadow-lg sm:p-6"
              >
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm sm:h-24 sm:w-24">
                  <Image
                    src={uni.logoPath}
                    alt={`${uni.name} logo`}
                    width={96}
                    height={96}
                    className="h-full w-full object-contain p-1.5 transition-transform group-hover:scale-110"
                    unoptimized
                  />
                </div>
                <span className="text-center text-xs font-semibold leading-tight text-[#0F172A] transition-colors group-hover:text-[#002868] sm:text-sm">
                  {uni.shortName}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); onApplyClick?.(uni.id); }}
                  className="w-full rounded-lg bg-gradient-to-r from-[#B31942] to-[#002868] px-3 py-2 text-xs font-bold text-white shadow-sm transition-all hover:shadow-md"
                >
                  <Send className="mr-1 inline h-3 w-3" />
                  Apply Now
                </button>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Partner Institutions */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-[#002868]">Partner Institutions</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 sm:gap-4">
            {otherUniversities.map((uni, i) => (
              <motion.button
                key={uni.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  const data = getUniversityById(uni.id);
                  if (data) onUniversityClick?.(data);
                }}
                className="group relative flex flex-col items-center justify-center gap-2 rounded-xl border border-[#BFDBFE] bg-white px-2 py-4 transition-all hover:border-[#002868]/40 hover:shadow-lg sm:px-3 sm:py-5"
              >
                <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm sm:h-14 sm:w-14">
                  <Image
                    src={uni.logoPath}
                    alt={`${uni.name} logo`}
                    width={56}
                    height={56}
                    className="h-full w-full object-contain p-1 transition-transform group-hover:scale-110"
                    unoptimized
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); onApplyClick?.(uni.id); }}
                    className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#B31942] text-white shadow-md transition-transform hover:scale-110"
                    aria-label={`Apply to ${uni.name}`}
                  >
                    <Send className="h-2.5 w-2.5" />
                  </button>
                </div>
                <span className="text-center text-[10px] font-medium leading-tight text-[#0F172A] transition-colors group-hover:text-[#002868] sm:text-[11px]">
                  {uni.shortName}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mx-auto mb-10 max-w-5xl lg:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <CampusVisual />
        </motion.div>

        <motion.p
          className="mt-10 text-center text-sm text-[#6B7280]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
        >
          All institutions are SEVP-certified and offer CPT or Day 1 CPT programs. Contact UCSG for personalized guidance.
        </motion.p>
      </div>
    </section>
  );
}
