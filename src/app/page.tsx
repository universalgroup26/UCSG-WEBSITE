'use client';

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import StudentJourneyInfographic from '@/components/infographics/StudentJourneyInfographic';
import ServicesSection from '@/components/ServicesSection';
import ServicesMindmap from '@/components/infographics/ServicesMindmap';
import AboutUCSGSection from '@/components/AboutUCSGSection';
import UniversitiesSection from '@/components/UniversitiesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import UniversityPage from '@/components/pages/UniversityPage';
import ResourcePage from '@/components/pages/ResourcePage';
import ContactPage from '@/components/pages/ContactPage';
import ScholarshipsPage from '@/components/pages/ScholarshipsPage';
import { getUniversityById, type UniversityData } from '@/lib/data/universities';
import { getResourceById, type ResourceData } from '@/lib/data/resources';

type ViewType =
  | { type: 'home' }
  | { type: 'university'; university: UniversityData }
  | { type: 'resource'; resource: ResourceData }
  | { type: 'contact' }
  | { type: 'scholarships' };

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

export default function HomePage() {
  const [view, setView] = useState<ViewType>({ type: 'home' });

  const handleNavigate = useCallback((_view: string, id?: string) => {
    if (_view === 'home') {
      setView({ type: 'home' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (_view === 'contact') {
      setView({ type: 'contact' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (_view === 'scholarships') {
      setView({ type: 'scholarships' });
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
    setView({ type: 'university', university: uni });
    history.pushState({ universityId: uni.id }, '', `#/university/${uni.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleResourceClick = useCallback((resourceId: string) => {
    const res = getResourceById(resourceId);
    if (res) {
      setView({ type: 'resource', resource: res });
      history.pushState({ resourceId: res.id }, '', `#/resource/${res.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleApplyClick = useCallback((_universityId?: string) => {
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
            <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <HeroSection onContactClick={goContact} />
              <StudentJourneyInfographic />
              <ServicesSection onResourceClick={handleResourceClick} />
              <ServicesMindmap />
              <AboutUCSGSection />
              <TestimonialsSection />
              <UniversitiesSection onUniversityClick={handleUniversityClick} onApplyClick={handleApplyClick} />
            </motion.div>
          )}
          {view.type === 'contact' && (
            <motion.div key="contact" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <ContactPage onBack={goHome} />
            </motion.div>
          )}
          {view.type === 'scholarships' && (
            <motion.div key="scholarships" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <ScholarshipsPage onBack={goHome} />
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
    </div>
  );
}
