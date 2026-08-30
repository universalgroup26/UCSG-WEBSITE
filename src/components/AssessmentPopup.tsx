'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { track } from '@/lib/analytics';
import StudentAssessment from '@/components/StudentAssessment';
import PersistentAssessmentButton from '@/components/PersistentAssessmentButton';

interface Props {
  currentView?: string;
}

/* ------------------------------------------------------------------ */
/*  localStorage helpers                                                */
/* ------------------------------------------------------------------ */

const STORAGE_DISMISSED_TS = 'ucsg_popup_dismissed_timestamp';
const STORAGE_SESSION_DISMISSED = 'ucsg_popup_session_dismissed';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function isWithinSevenDayCooldown(): boolean {
  try {
    const ts = localStorage.getItem(STORAGE_DISMISSED_TS);
    if (!ts) return false;
    return Date.now() - parseInt(ts, 10) < SEVEN_DAYS_MS;
  } catch {
    return false;
  }
}

function markDismissed(): void {
  try {
    localStorage.setItem(STORAGE_DISMISSED_TS, String(Date.now()));
    sessionStorage.setItem(STORAGE_SESSION_DISMISSED, 'true');
  } catch {
    /* noop */
  }
}

function isSessionDismissed(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_SESSION_DISMISSED) === 'true';
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AssessmentPopup({ currentView }: Props) {
  const [popupOpen, setPopupOpen] = useState(false);
  const initiallyDismissed = useMemo(() => isSessionDismissed() || isWithinSevenDayCooldown(), []);
  const [showFab, setShowFab] = useState(initiallyDismissed);
  const hasTriggered = useRef(initiallyDismissed);
  const triggerSource = useRef<string>('');

  const openPopup = useCallback((source: string) => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;
    triggerSource.current = source;
    setPopupOpen(true);
    track.popupEvent({ event: 'popup_open', popup_trigger: source as 'scroll_60' | 'timeout' | 'exit_intent' });
  }, []);

  const handleClose = useCallback(() => {
    setPopupOpen(false);
    track.popupEvent({ event: 'popup_dismiss', popup_trigger: triggerSource.current as 'scroll_60' | 'timeout' | 'exit_intent' });
    markDismissed();
    setShowFab(true);
  }, []);

  const handleCloseAfterSubmit = useCallback(() => {
    // Close without marking as dismissed — user successfully submitted
    // so the popup should be able to auto-trigger again on future visits
    setPopupOpen(false);
    setShowFab(true);
  }, []);

  const handleFabOpen = useCallback(() => {
    setPopupOpen(true);
    track.popupEvent({ event: 'popup_open', popup_trigger: 'fab' });
  }, []);

  // --- Reset trigger on view change back to home (so popup can re-trigger) ---
  useEffect(() => {
    if (currentView === 'home') {
      // Don't reset if session already dismissed
      if (!isSessionDismissed() && !isWithinSevenDayCooldown()) {
        hasTriggered.current = false;
      }
    }
  }, [currentView]);

  // --- Timer: 45 seconds (waits for consent decision on first visit) ---
  useEffect(() => {
    if (hasTriggered.current || isSessionDismissed() || isWithinSevenDayCooldown()) return;
    if (currentView !== 'home' && currentView !== undefined) return;

    // On first visit, wait for cookie consent before showing assessment
    let consentGiven = false;
    try { consentGiven = !!localStorage.getItem('ucsg_consent_v2'); } catch { /* noop */ }

    if (!consentGiven) {
      const onConsent = () => {
        if (hasTriggered.current || isSessionDismissed() || isWithinSevenDayCooldown()) return;
        setTimeout(() => openPopup('timeout'), 1000);
        window.removeEventListener('ucsg-consent-decided', onConsent);
      };
      window.addEventListener('ucsg-consent-decided', onConsent);
      return () => window.removeEventListener('ucsg-consent-decided', onConsent);
    }

    const timer = setTimeout(() => {
      openPopup('timeout');
    }, 45000);
    return () => clearTimeout(timer);
  }, [currentView, openPopup]);

  // --- Scroll: 60% via IntersectionObserver ---
  useEffect(() => {
    if (hasTriggered.current || isSessionDismissed() || isWithinSevenDayCooldown()) return;
    if (currentView !== 'home' && currentView !== undefined) return;

    // Create a sentinel element at 60% of the document height
    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '70%';
    sentinel.style.width = '1px';
    sentinel.style.height = '1px';
    sentinel.style.pointerEvents = 'none';
    sentinel.setAttribute('aria-hidden', 'true');
    document.body.appendChild(sentinel);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          openPopup('scroll_70');
          observer.disconnect();
          sentinel.remove();
        }
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, [currentView, openPopup]);

  // --- Exit intent: mouseleave on desktop only ---
  useEffect(() => {
    if (hasTriggered.current || isSessionDismissed() || isWithinSevenDayCooldown()) return;
    if (currentView !== 'home' && currentView !== undefined) return;

    // Skip on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) return;

    const handler = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        openPopup('exit_intent');
      }
    };
    document.addEventListener('mouseleave', handler);
    return () => document.removeEventListener('mouseleave', handler);
  }, [currentView, openPopup]);

  // --- Listen for programmatic open (from situation cards, CTAs, etc.) ---
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.open === 'assessment') {
        // Close mobile nav sheet if open (dispatch close event to Sheet)
        document.querySelectorAll('[data-state="open"]').forEach(el => {
          if (el.closest('[data-slot="sheet-content"]')) {
            (el as HTMLElement).click();
          }
        });
        setPopupOpen(true);
        triggerSource.current = 'fab';
        track.popupEvent({ event: 'popup_open', popup_trigger: 'fab' });
      }
    };
    window.addEventListener('ucsg-assessment', handler);
    return () => window.removeEventListener('ucsg-assessment', handler);
  }, []);

  return (
    <>
      <StudentAssessment open={popupOpen} onClose={handleClose} onCloseAfterSubmit={handleCloseAfterSubmit} />

      {showFab && !popupOpen && <PersistentAssessmentButton onClick={handleFabOpen} />}
    </>
  );
}
