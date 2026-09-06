'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentPopup from '@/components/AssessmentPopup';
import BookingCalendar from '@/components/BookingCalendar';
import ContactPopup from '@/components/ContactPopup';
import SectionNavigation from '@/components/SectionNavigation';
import LoadingScreen from '@/components/LoadingScreen';
import { track } from '@/lib/analytics';

/**
 * GlobalShell — wraps all routes with the persistent global UI:
 * Header, Footer, assessment/booking/contact popups, consent-driven overlays,
 * section navigation (home only), and the first-visit loading screen.
 *
 * Also intercepts legacy `ucsg-navigate` CustomEvents (from components that
 * used SPA view-switching) and translates them to real Next.js router.push()
 * navigation, so existing components don't need to be rewritten.
 */
export default function GlobalShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [showBooking, setShowBooking] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const loadingInitRef = useRef(false);
  const pageViewFiredRef = useRef<string | null>(null);

  const isHome = pathname === '/';
  const currentView = isHome ? 'home' : 'other';

  useEffect(() => {
    if (loadingInitRef.current) return;
    loadingInitRef.current = true;
    track.init();
    if (!sessionStorage.getItem('ucsg-loading-seen')) {
      queueMicrotask(() => setShowLoading(true));
    }
  }, []);

  useEffect(() => {
    if (pageViewFiredRef.current === pathname) return;
    pageViewFiredRef.current = pathname;
    const title = document.title || 'UCSG';
    track.pageView(title);
  }, [pathname]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail) return;
      const { view, id } = detail;

      if (view === 'contact') {
        setShowBooking(true);
        return;
      }

      const routeMap: Record<string, string> = {
        home: '/',
        university: id ? `/university/${id}` : '/',
        resource: id ? `/resource/${id}` : '/',
        about: '/about',
        'about-mission': '/about/mission',
        'about-vision': '/about/vision',
        'about-career': '/about/career',
        privacy: '/privacy',
      };

      const targetPath = routeMap[view];
      if (targetPath && targetPath !== pathname) {
        router.push(targetPath);
      }
    };

    window.addEventListener('ucsg-navigate', handler);
    return () => window.removeEventListener('ucsg-navigate', handler);
  }, [router, pathname]);

  const handleLoadingComplete = useCallback(() => {
    setShowLoading(false);
    sessionStorage.setItem('ucsg-loading-seen', '1');
  }, []);

  const goContact = useCallback(() => setShowBooking(true), []);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <AnimatePresence>
        {showLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <Header />
      <main className="flex-1" id="main-content">
        {children}
      </main>
      <Footer onContactClick={goContact} />

      <AssessmentPopup currentView={currentView} />
      <BookingCalendar open={showBooking} onClose={() => setShowBooking(false)} />
      <ContactPopup />

      {isHome && <SectionNavigation />}
    </div>
  );
}
