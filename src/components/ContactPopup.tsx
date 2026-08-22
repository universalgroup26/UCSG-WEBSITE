'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  CheckCircle2,
  MessageCircle,
  Phone,
  Sparkles,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import CloudflareTurnstile from '@/components/CloudflareTurnstile';

const services = [
  'Day 1 CPT University Admission',
  'University Transfers (Emergency)',
  'Change of Status (to F-1)',
  'SEVIS Reinstatement',
  'STEM OPT Support',
  'I-20 Extension',
  'H-1B Guidance',
  'Other',
];

const STORAGE_KEY = 'ucsg-popup-dismissed';
const SESSION_SHOWN_MID = 'ucsg-popup-mid-shown';
const SESSION_SHOWN_END = 'ucsg-popup-end-shown';

function getSessionFlag(key: string): boolean {
  try {
    return sessionStorage.getItem(key) === 'true';
  } catch {
    return false;
  }
}

function setSessionFlag(key: string) {
  try {
    sessionStorage.setItem(key, 'true');
  } catch {
    // ignore
  }
}

function isPermanentlyDismissed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/*  Floating Action Button (FAB)                                       */
/* ------------------------------------------------------------------ */
function FloatingButton({ onClick }: { onClick: () => void }) {
  const [pulsing, setPulsing] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setPulsing(false), 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#002868] text-white shadow-lg shadow-[#002868]/30 transition-colors hover:bg-[#001B4D] focus:outline-none focus:ring-2 focus:ring-[#002868]/40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Open contact form"
    >
      {/* Pulse ring */}
      {pulsing && (
        <motion.span
          className="absolute inset-0 rounded-full bg-[#002868]"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <MessageCircle className="h-6 w-6 relative z-10" />
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Contact Popup                                                 */
/* ------------------------------------------------------------------ */
interface ContactPopupProps {
  currentView?: string;
}

export default function ContactPopup({ currentView = 'home' }: ContactPopupProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showDontAsk, setShowDontAsk] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const scrollTriggersRef = useRef<{ mid: boolean; end: boolean }>({ mid: false, end: false });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleOpen = useCallback(() => {
    setSubmitted(false);
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    setTurnstileToken(null);
    setOpen(true);
  }, []);

  /* --- scroll listener ------------------------------------------------ */
  useEffect(() => {
    if (isPermanentlyDismissed()) return;

    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = scrollTop / docHeight;

      // Trigger at ~50%
      if (pct >= 0.48 && pct <= 0.55 && !scrollTriggersRef.current.mid && !getSessionFlag(SESSION_SHOWN_MID)) {
        scrollTriggersRef.current.mid = true;
        setSessionFlag(SESSION_SHOWN_MID);
        handleOpen();
      }

      // Trigger at ~90%
      if (pct >= 0.88 && !scrollTriggersRef.current.end && !getSessionFlag(SESSION_SHOWN_END)) {
        scrollTriggersRef.current.end = true;
        setSessionFlag(SESSION_SHOWN_END);
        handleOpen();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleDismissForever = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // ignore
    }
    setOpen(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (turnstileToken) {
      try {
        const res = await fetch('/api/turnstile/verify?XTransformPort=3000', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: turnstileToken }),
        });
        const data = await res.json();
        if (!data.success) return;
      } catch {
        // graceful degradation
      }
    }

    setSubmitted(true);
  };

  /* Don't render anything if permanently dismissed or on contact page */
  if (isPermanentlyDismissed() || currentView === 'contact') return null;

  return (
    <>
      {/* Floating Action Button */}
      <FloatingButton onClick={handleOpen} />

      {/* Popup Overlay + Form */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Popup Card */}
            <motion.div
              className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              {/* ---------- Header ---------- */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#002868] via-[#002868] to-[#0A1628] px-6 pb-8 pt-6 text-white">
                {/* Decorative elements */}
                <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/5" />
                <div className="pointer-events-none absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-white/5" />
                <div className="pointer-events-none absolute right-10 bottom-2 h-12 w-12 rounded-full bg-[#B31942]/20" />

                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-all hover:bg-white/20 hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="relative z-10">
                  <motion.div
                    className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm"
                    initial={{ rotate: -10, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <GraduationCap className="h-6 w-6" />
                  </motion.div>
                  <h3 className="text-xl font-bold leading-tight">Get Free Consultation</h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-white/70">
                    <Sparkles className="h-3.5 w-3.5" />
                    Response within 2 hours · Free assessment
                  </p>
                </div>
              </div>

              {/* ---------- Body ---------- */}
              <div className="max-h-[65vh] overflow-y-auto px-6 py-5">
                {submitted ? (
                  <motion.div
                    className="flex flex-col items-center py-8 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <motion.div
                      className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#059669]/10"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                    >
                      <CheckCircle2 className="h-8 w-8 text-[#059669]" />
                    </motion.div>
                    <h4 className="text-lg font-semibold text-[#0F172A]">Thank You!</h4>
                    <p className="mt-1.5 max-w-xs text-sm text-[#6B7280]">
                      We&apos;ve received your inquiry. Our team will reach out within 2 hours via email and WhatsApp.
                    </p>
                    <div className="mt-5 flex gap-3">
                      <Button
                        onClick={() => setOpen(false)}
                        className="rounded-xl bg-[#002868] text-white hover:bg-[#001B4D]"
                      >
                        Done
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: '', email: '', phone: '', service: '', message: '' });
                          setTurnstileToken(null);
                        }}
                        className="rounded-xl border-gray-200"
                      >
                        Send Another
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="mb-1 block text-xs font-medium text-[#374151]">
                        Full Name <span className="text-[#DC2626]">*</span>
                      </label>
                      <Input
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-10 rounded-lg border-gray-200 bg-gray-50/50 text-sm focus-visible:border-[#002868] focus-visible:ring-[#002868]/20"
                      />
                    </div>

                    {/* Email + Phone row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-[#374151]">
                          Email <span className="text-[#DC2626]">*</span>
                        </label>
                        <Input
                          required
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="h-10 rounded-lg border-gray-200 bg-gray-50/50 text-sm focus-visible:border-[#002868] focus-visible:ring-[#002868]/20"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-[#374151]">
                          Phone
                        </label>
                        <Input
                          type="tel"
                          placeholder="+1 (XXX) XXX-XXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="h-10 rounded-lg border-gray-200 bg-gray-50/50 text-sm focus-visible:border-[#002868] focus-visible:ring-[#002868]/20"
                        />
                      </div>
                    </div>

                    {/* Service dropdown */}
                    <div>
                      <label className="mb-1 block text-xs font-medium text-[#374151]">
                        Service Needed
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 text-sm text-[#0F172A] focus:border-[#002868] focus:outline-none focus:ring-2 focus:ring-[#002868]/20"
                      >
                        <option value="">Select a service...</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="mb-1 block text-xs font-medium text-[#374151]">
                        How can we help? <span className="text-[#DC2626]">*</span>
                      </label>
                      <Textarea
                        required
                        rows={3}
                        placeholder="Briefly describe your situation..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="rounded-lg border-gray-200 bg-gray-50/50 text-sm focus-visible:border-[#002868] focus-visible:ring-[#002868]/20"
                      />
                    </div>

                    {/* Turnstile */}
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 shrink-0 text-[#002868]/60" />
                      <CloudflareTurnstile
                        onVerify={setTurnstileToken}
                        onError={() => setTurnstileToken(null)}
                        onExpire={() => setTurnstileToken(null)}
                        className="flex-1"
                        size="compact"
                      />
                    </div>

                    {/* Submit */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        className="h-11 w-full rounded-xl bg-[#002868] text-sm font-semibold text-white hover:bg-[#001B4D]"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Get Free Consultation
                      </Button>
                    </motion.div>
                  </form>
                )}
              </div>

              {/* ---------- Footer ---------- */}
              <div className="border-t border-gray-100 px-6 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                    <a
                      href="tel:+13028935594"
                      className="flex items-center gap-1 transition-colors hover:text-[#002868]"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      Call Us
                    </a>
                    <a
                      href="https://wa.me/13028935594"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 transition-colors hover:text-[#25D366]"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      WhatsApp
                    </a>
                  </div>
                  <button
                    onClick={() => setShowDontAsk(!showDontAsk)}
                    className="text-xs text-[#9CA3AF] transition-colors hover:text-[#6B7280]"
                  >
                    Don&apos;t show again
                  </button>
                </div>

                <AnimatePresence>
                  {showDontAsk && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                        <span className="text-xs text-[#6B7280]">Stop showing this popup?</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleDismissForever}
                          className="h-7 px-3 text-xs text-[#DC2626] hover:bg-red-50 hover:text-[#DC2626]"
                        >
                          Yes, dismiss
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
