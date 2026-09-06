'use client';

import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import AboutUCSGSection from '@/components/AboutUCSGSection';
import SituationSelector from '@/components/SituationSelector';
import PersonalizedGuidance from '@/components/PersonalizedGuidance';
import HowUCSGHelps from '@/components/HowUCSGHelps';
import FeaturedUniversities from '@/components/FeaturedUniversities';
import ProgramExplorer from '@/components/ProgramExplorer';
import F1ResourceCenter from '@/components/F1ResourceCenter';
import WhatStudentsExpect from '@/components/WhatStudentsExpect';
import FinalAssessmentCTA from '@/components/FinalAssessmentCTA';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function HomePage() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate">
      {/* 1. Animated Hero Slideshow */}
      <HeroSection onContactClick={() => window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'contact' } }))} />

      {/* 2. Founder Message and About UCSG */}
      <section id="about-ucsg">
        <AboutUCSGSection />
      </section>
      <div className="ucsg-section-divider" aria-hidden="true" />

      {/* 3. Situation Selector */}
      <section id="situation-selector">
        <SituationSelector />
      </section>
      <div className="ucsg-section-divider" aria-hidden="true" />

      {/* 4. Personalized Guidance */}
      <section id="personalized-guidance">
        <PersonalizedGuidance />
      </section>
      <div className="ucsg-section-divider" aria-hidden="true" />

      {/* 5. How UCSG Helps */}
      <section id="how-ucsg-helps">
        <HowUCSGHelps />
      </section>
      <div className="ucsg-section-divider" aria-hidden="true" />

      {/* 6. Featured Universities (Logo Rail) */}
      <FeaturedUniversities />
      <div className="ucsg-section-divider" aria-hidden="true" />

      {/* 7. Program Explorer */}
      <section id="program-explorer">
        <ProgramExplorer />
      </section>
      <div className="ucsg-section-divider" aria-hidden="true" />

      {/* 8. F-1 Resource Center */}
      <F1ResourceCenter />
      <div className="ucsg-section-divider" aria-hidden="true" />

      {/* 9. What Students Can Expect */}
      <section id="what-students-expect">
        <WhatStudentsExpect />
      </section>
      <div className="ucsg-section-divider" aria-hidden="true" />

      {/* 10. Final Assessment CTA */}
      <FinalAssessmentCTA />

      {/* Compliance Disclaimer */}
      <div className="mx-auto max-w-[1200px] px-4 py-12 text-center sm:px-6 lg:px-8">
        <p className="text-sm leading-relaxed text-gray-500">
          UCSG provides educational information and student-support services. Admission, scholarships, visa status, SEVIS transfer, CPT/OPT
          authorization and employment outcomes are not guaranteed. Students should confirm employment authorization with their Designated School Official and seek advice from a qualified immigration attorney when necessary.
        </p>
      </div>
    </motion.div>
  );
}
