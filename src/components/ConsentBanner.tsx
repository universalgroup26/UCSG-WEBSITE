'use client';

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from 'react';
import { track } from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import { X, Shield, Settings } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const STORAGE_KEY = 'ucsg_consent_v2';

interface ConsentState {
  analytics: boolean;
  advertising: boolean;
  timestamp: number;
}

function readConsentFromStorage(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed.analytics !== 'boolean' || typeof parsed.advertising !== 'boolean') return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsentToStorage(state: ConsentState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* noop */
  }
}

function applyConsentToGTM(state: ConsentState): void {
  track.updateConsent({ analytics: state.analytics, advertising: state.advertising });
}

function notifyConsentDecision(): void {
  window.dispatchEvent(new CustomEvent('ucsg-consent-decided'));
}

// ── External store for consent (drives re-renders on localStorage change) ──
let storeListeners: (() => void)[] = [];
let cachedSnapshot: ConsentState | null = null;
let cachedRaw: string | null = null;

function subscribeStore(listener: () => void): () => void {
  storeListeners.push(listener);
  return () => { storeListeners = storeListeners.filter(l => l !== listener); };
}
function emitStoreChange(): void {
  cachedRaw = null; // Invalidate cache so next getSnapshot re-reads
  storeListeners.forEach(l => l());
}
function getSnapshot(): ConsentState | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedSnapshot; // Return cached reference
  cachedRaw = raw;
  cachedSnapshot = raw ? readConsentFromStorage() : null;
  return cachedSnapshot;
}
function getServerSnapshot(): null {
  return null;
}

export default function ConsentBanner() {
  const savedConsent = useSyncExternalStore(subscribeStore, getSnapshot, getServerSnapshot);
  const hasDecided = savedConsent !== null;

  // Manual show/hide state (for re-opening from footer, and dismissing)
  const [manuallyVisible, setManuallyVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editingState, setEditingState] = useState<ConsentState>({ analytics: false, advertising: false, timestamp: 0 });
  const appliedRef = useRef(false);

  // Apply saved consent to GTM once on mount (side-effect only, no setState)
  useEffect(() => {
    if (!appliedRef.current && savedConsent) {
      appliedRef.current = true;
      applyConsentToGTM(savedConsent);
    }
  }, [savedConsent]);

  // Banner visibility: show if (first visit + not dismissed) OR manually opened
  const visible = (!hasDecided && !dismissed) || manuallyVisible;

  const acceptAll = useCallback(() => {
    const state: ConsentState = { analytics: true, advertising: true, timestamp: Date.now() };
    writeConsentToStorage(state);
    applyConsentToGTM(state);
    emitStoreChange();
    setDismissed(true);
    setManuallyVisible(false);
    setShowSettings(false);
    notifyConsentDecision();
  }, []);

  const rejectNonEssential = useCallback(() => {
    const state: ConsentState = { analytics: false, advertising: false, timestamp: Date.now() };
    writeConsentToStorage(state);
    applyConsentToGTM(state);
    emitStoreChange();
    setDismissed(true);
    setManuallyVisible(false);
    setShowSettings(false);
    notifyConsentDecision();
  }, []);

  const openSettings = useCallback(() => {
    setEditingState(savedConsent || { analytics: false, advertising: false, timestamp: 0 });
    setShowSettings(true);
  }, [savedConsent]);

  const toggleAnalytics = useCallback(() => {
    setEditingState(s => ({ ...s, analytics: !s.analytics }));
  }, []);

  const toggleAdvertising = useCallback(() => {
    setEditingState(s => ({ ...s, advertising: !s.advertising }));
  }, []);

  const savePreferences = useCallback(() => {
    const state: ConsentState = { analytics: editingState.analytics, advertising: editingState.advertising, timestamp: Date.now() };
    writeConsentToStorage(state);
    applyConsentToGTM(state);
    emitStoreChange();
    setDismissed(true);
    setManuallyVisible(false);
    setShowSettings(false);
    notifyConsentDecision();
  }, [editingState]);

  // Re-open from footer link
  useEffect(() => {
    const handler = () => {
      const saved = readConsentFromStorage();
      if (saved) {
        setEditingState(saved);
      }
      setShowSettings(false);
      setDismissed(false);
      setManuallyVisible(true);
    };
    window.addEventListener('ucsg-consent-preferences', handler);
    return () => window.removeEventListener('ucsg-consent-preferences', handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="consent-banner"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] as const }}
          className="fixed bottom-0 left-0 right-0 z-[80] p-3 sm:p-4"
          role="dialog"
          aria-label="Cookie consent"
          aria-describedby="consent-desc"
        >
          <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)] sm:p-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#061846]/5">
                  <Shield className="h-4.5 w-4.5 text-[#061846]" />
                </div>
                <div id="consent-desc">
                  <p className="text-sm font-semibold text-gray-900 sm:text-base">
                    We value your privacy
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
                    We use analytics to improve your experience and advertising to reach students who may benefit from our services. You can choose which to allow.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={rejectNonEssential}
                className="shrink-0 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-3 rounded-xl bg-gray-50 p-4">
                    <label className="flex items-center justify-between gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-800">Analytics</span>
                        <p className="text-xs text-gray-500">Helps us understand how visitors use the site</p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={editingState.analytics}
                        onClick={toggleAnalytics}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                          editingState.analytics ? 'bg-[#0874F9]' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform ${
                            editingState.analytics ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </label>
                    <label className="flex items-center justify-between gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-800">Advertising</span>
                        <p className="text-xs text-gray-500">Enables Meta and Google Ads for reaching students</p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={editingState.advertising}
                        onClick={toggleAdvertising}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                          editingState.advertising ? 'bg-[#0874F9]' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform ${
                            editingState.advertising ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              {!showSettings && (
                <button
                  type="button"
                  onClick={openSettings}
                  className="order-first flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 sm:order-last"
                >
                  <Settings className="h-3.5 w-3.5" />
                  Manage preferences
                </button>
              )}
              {showSettings && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={savePreferences}
                  className="rounded-lg border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Save preferences
                </Button>
              )}
              <Button
                type="button"
                onClick={rejectNonEssential}
                variant="outline"
                className="rounded-lg border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Reject non-essential
              </Button>
              <Button
                type="button"
                onClick={acceptAll}
                className="rounded-lg bg-[#0874F9] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0660D4]"
              >
                Accept all
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
