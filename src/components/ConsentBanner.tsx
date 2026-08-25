'use client';

import { useState, useEffect, useCallback } from 'react';
import { track } from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import { X, Shield, Settings } from 'lucide-react';

const STORAGE_KEY = 'ucsg_consent_v2';

interface ConsentState {
  analytics: boolean;
  advertising: boolean;
  timestamp: number;
}

function loadConsent(): ConsentState | null {
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

function saveConsent(state: ConsentState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* noop */
  }
}

function applyConsent(state: ConsentState): void {
  track.updateConsent({ analytics: state.analytics, advertising: state.advertising });
}

export default function ConsentBanner() {
  const saved = loadConsent();
  const [visible, setVisible] = useState(!saved);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(saved?.analytics ?? false);
  const [advertising, setAdvertising] = useState(saved?.advertising ?? false);

  // Apply saved consent on mount
  useEffect(() => {
    const s = loadConsent();
    if (s) applyConsent(s);
  }, []);

  const acceptAll = useCallback(() => {
    const state = { analytics: true, advertising: true, timestamp: Date.now() };
    saveConsent(state);
    applyConsent(state);
    setVisible(false);
  }, []);

  const rejectNonEssential = useCallback(() => {
    const state = { analytics: false, advertising: false, timestamp: Date.now() };
    saveConsent(state);
    applyConsent(state);
    setVisible(false);
  }, []);

  const savePreferences = useCallback(() => {
    const state = { analytics, advertising, timestamp: Date.now() };
    saveConsent(state);
    applyConsent(state);
    setVisible(false);
  }, [analytics, advertising]);

  // Expose a way to re-open preferences from footer
  useEffect(() => {
    const handler = () => setVisible(true);
    window.addEventListener('ucsg-consent-preferences', handler);
    return () => window.removeEventListener('ucsg-consent-preferences', handler);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[200] p-3 sm:p-4"
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
            onClick={rejectNonEssential}
            className="shrink-0 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mt-4 space-y-3 rounded-xl bg-gray-50 p-4">
            <label className="flex items-center justify-between gap-4">
              <div>
                <span className="text-sm font-medium text-gray-800">Analytics</span>
                <p className="text-xs text-gray-500">Helps us understand how visitors use the site</p>
              </div>
              <button
                role="switch"
                aria-checked={analytics}
                onClick={() => setAnalytics(!analytics)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                  analytics ? 'bg-[#0874F9]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform ${
                    analytics ? 'translate-x-5' : 'translate-x-0'
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
                role="switch"
                aria-checked={advertising}
                onClick={() => setAdvertising(!advertising)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                  advertising ? 'bg-[#0874F9]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform ${
                    advertising ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </label>
        </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          {!showSettings && (
            <button
              onClick={() => setShowSettings(true)}
              className="order-first flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 sm:order-last"
            >
              <Settings className="h-3.5 w-3.5" />
              Manage preferences
            </button>
          )}
          {showSettings && (
            <Button
              variant="outline"
              onClick={savePreferences}
              className="rounded-lg border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Save preferences
            </Button>
          )}
          <Button
            onClick={rejectNonEssential}
            variant="outline"
            className="rounded-lg border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Reject non-essential
          </Button>
          <Button
            onClick={acceptAll}
            className="rounded-lg bg-[#0874F9] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0660D4]"
          >
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
}
