'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SituationSelector from '@/components/SituationSelector';
import PersonalizedGuidance from '@/components/PersonalizedGuidance';
import ProgramExplorer from '@/components/ProgramExplorer';
import HowUCSGHelps from '@/components/HowUCSGHelps';
import F1ResourceCenter from '@/components/F1ResourceCenter';
import AboutUCSGSection from '@/components/AboutUCSGSection';
import WhatStudentsExpect from '@/components/WhatStudentsExpect';
import UniversitiesSection from '@/components/UniversitiesSection';
import Footer from '@/components/Footer';
import AssessmentPopup from '@/components/AssessmentPopup';
import UniversityPage from '@/components/pages/UniversityPage';
import ResourcePage from '@/components/pages/ResourcePage';
import ContactPage from '@/components/pages/ContactPage';
import { getUniversityById, type UniversityData } from '@/lib/data/universities';
import { getResourceById, type ResourceData } from '@/lib/data/resources';
import { track } from '@/lib/analytics';

type ViewType =
  | { type: 'home' }
  | { type: 'university'; university: UniversityData }
  | { type: 'resource'; resource: ResourceData }
  | { type: 'contact' };

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

// Section IDs for scroll-to navigation
const SECTION_IDS = {
  programs: 'program-explorer',
  resources: 'f1-resource-center',
  about: 'about-ucsg',
} as const;

export default function HomePage() {
  const [view, setView] = useState<ViewType>({ type: 'home' });
  const homeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (view.type === 'home') track.pageView('Home');
    else if (view.type === 'contact') track.pageView('Contact');
    else if (view.type === 'university') track.universityView(view.university.id, view.university.name);
    else if (view.type === 'resource') track.resourceView(view.resource.id, view.resource.title);
  }, [view]);

  const handleNavigate = useCallback((_view: string, id?: string) => {
    const navTarget = id ? `${_view}:${id}` : _view;
    track.navClick({ nav_type: 'header', nav_target: navTarget });

    if (_view === 'home') {
      if (id && id in SECTION_IDS) {
        // Scroll to specific section on home page
        setView({ type: 'home' });
        setTimeout(() => {
          const el = document.getElementById(SECTION_IDS[id as keyof typeof SECTION_IDS]);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        setView({ type: 'home' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    if (_view === 'contact') {
      setView({ type: 'contact' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (_view === 'university' && id) {
      const uni = getUniversityById(id);
      if (uni) {
        setView({ type: 'university', university: uni });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    if (_view === 'resource' && id) {
      const res = getResourceById(id);
      if (res) {
        setView({ type: 'resource', resource: res });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  const goHome = useCallback(() => {
    setView({ type: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goContact = useCallback(() => {
    setView({ type: 'contact' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleUniversityClick = useCallback((uni: UniversityData) => {
    track.navClick({ nav_type: 'body', nav_target: `university:${uni.id}`, nav_text: uni.name });
    setView({ type: 'university', university: uni });
    history.pushState({ universityId: uni.id }, '', `#/university/${uni.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleResourceClick = useCallback((resourceId: string) => {
    const res = getResourceById(resourceId);
    if (res) {
      track.navClick({ nav_type: 'body', nav_target: `resource:${res.id}`, nav_text: res.title });
      setView({ type: 'resource', resource: res });
      history.pushState({ resourceId: res.id }, '', `#/resource/${res.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleApplyClick = useCallback((_universityId?: string) => {
    track.ctaClick({ cta_type: 'apply', cta_source: _universityId ? `university_page:${_universityId}` : 'body' });
    setView({ type: 'contact' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      handleNavigate(detail?.view || 'home', detail?.id);
    };
    window.addEventListener('ucsg-navigate', handler);
    return () => window.removeEventListener('ucsg-navigate', handler);
  }, [handleNavigate]);

  useEffect(() => {
    const handler = () => {
      if (view.type !== 'home') setView({ type: 'home' });
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, [view.type]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header onNavigate={handleNavigate} />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {view.type === 'home' && (
            <motion.div key="home" ref={homeRef} variants={pageVariants} initial="initial" animate="animate" exit="exit">
              {/* 1. Hero */}
              <HeroSection onContactClick={goContact} />

              {/* 2. Situation Selector */}
              <section id="situation-selector">
                <SituationSelector />
              </section>

              {/* 3. Personalized Guidance */}
              <section id="personalized-guidance">
                <PersonalizedGuidance />
              </section>

              {/* 4. How UCSG Helps */}
              <section id="how-ucsg-helps">
                <HowUCSGHelps />
              </section>

              {/* 5. Program Explorer */}
              <section id="program-explorer">
                <ProgramExplorer />
              </section>

              {/* 6. F-1 Resource Center */}
              <section id="f1-resource-center">
                <F1ResourceCenter />
              </section>

              {/* 7. About UCSG */}
              <section id="about-ucsg">
                <AboutUCSGSection />
              </section>

              {/* 8. What Students Can Expect */}
              <section id="what-students-expect">
                <WhatStudentsExpect />
              </section>

              {/* 9. Universities */}
              <section id="universities">
                <UniversitiesSection onUniversityClick={handleUniversityClick} onApplyClick={handleApplyClick} />
              </section>

              {/* 10. Compliance Disclaimer */}
              <div className="mx-auto max-w-[1200px] px-4 py-12 text-center sm:px-6 lg:px-8">
                <p className="text-sm leading-relaxed text-gray-500">
                  UCSG provides educational information and student-support services. Admission, scholarships, visa status, SEVIS transfer, CPT/OPT authorization and employment outcomes are not guaranteed. Students should confirm employment authorization with their Designated School Official and seek advice from a qualified immigration attorney when necessary.
                </p>
              </div>
            </motion.div>
          )}
          {view.type === 'contact' && (
            <motion.div key="contact" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <ContactPage onBack={goHome} />
            </motion.div>
          )}
          {view.type === 'university' && (
            <motion.div key={view.university.id} variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <UniversityPage university={view.university} onBack={goHome} onApplyClick={handleApplyClick} />
            </motion.div>
          )}
          {view.type === 'resource' && (
            <motion.div key={view.resource.id} variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <ResourcePage resource={view.resource} onBack={goHome} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer onNavigate={handleNavigate} onContactClick={goContact} />
      <AssessmentPopup currentView={view.type} />
    </div>
  );
}
