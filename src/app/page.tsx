'use client';

import { useState, useCallback, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import UniversitiesSection from '@/components/UniversitiesSection';
import Footer from '@/components/Footer';
import UniversityPage from '@/components/pages/UniversityPage';
import ResourcePage from '@/components/pages/ResourcePage';
import { getUniversityById, type UniversityData } from '@/lib/data/universities';
import { getResourceById, type ResourceData } from '@/lib/data/resources';

type ViewType =
  | { type: 'home' }
  | { type: 'university'; university: UniversityData }
  | { type: 'resource'; resource: ResourceData };

export default function HomePage() {
  const [view, setView] = useState<ViewType>({ type: 'home' });

  const handleNavigate = useCallback((_view: string, id?: string) => {
    if (_view === 'home') {
      setView({ type: 'home' });
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

  // Listen for custom events from Logo component
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      handleNavigate(detail?.view || 'home', detail?.id);
    };
    window.addEventListener('ucsg-navigate', handler);
    return () => window.removeEventListener('ucsg-navigate', handler);
  }, [handleNavigate]);

  // Intercept browser back button
  useEffect(() => {
    const handler = () => {
      if (view.type !== 'home') {
        setView({ type: 'home' });
      }
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, [view.type]);

  const pushState = useCallback((v: ViewType) => {
    if (v.type === 'university') {
      history.pushState({ universityId: v.university.id }, '', `#/university/${v.university.id}`);
    } else if (v.type === 'resource') {
      history.pushState({ resourceId: v.resource.id }, '', `#/resource/${v.resource.id}`);
    } else {
      history.pushState({}, '', '/');
    }
  }, []);

  const goHome = useCallback(() => {
    setView({ type: 'home' });
    pushState({ type: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pushState]);

  const handleUniversityClick = useCallback((uni: UniversityData) => {
    setView({ type: 'university', university: uni });
    pushState({ type: 'university', university: uni });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pushState]);

  const handleResourceClick = useCallback((resourceId: string) => {
    const res = getResourceById(resourceId);
    if (res) {
      setView({ type: 'resource', resource: res });
      pushState({ type: 'resource', resource: res });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pushState]);

  const isDetailView = view.type !== 'home';

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header onNavigate={handleNavigate} />
      <main className="flex-1">
        {view.type === 'home' && (
          <>
            <HeroSection />
            <ServicesSection onResourceClick={handleResourceClick} />
            <UniversitiesSection onUniversityClick={handleUniversityClick} />
          </>
        )}
        {view.type === 'university' && (
          <UniversityPage university={view.university} onBack={goHome} />
        )}
        {view.type === 'resource' && (
          <ResourcePage resource={view.resource} onBack={goHome} />
        )}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}