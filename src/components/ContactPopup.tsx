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
  ArrowRight,
  Clock,
  Star,
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

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                  */
/* ------------------------------------------------------------------ */

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 40, rotateX: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 28,
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 20,
    rotateX: 3,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  },
};

const staggerChild = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 400, damping: 28 },
  },
};

const fieldItem = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 350, damping: 25 },
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function getSessionFlag(key: string): boolean {
  try { return sessionStorage.getItem(key) === 'true'; } catch { return false; }
}
function setSessionFlag(key: string) {
  try { sessionStorage.setItem(key, 'true'); } catch { /* ignore */ }
}
function isPermanentlyDismissed(): boolean {
  try { return localStorage.getItem(STORAGE_KEY) === 'true'; } catch { return false; }
}

/* ------------------------------------------------------------------ */
/*  Animated Gradient Orbs (header background)                         */
/* ------------------------------------------------------------------ */
function AnimatedOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/[0.07]"
        animate={{ x: [0, 15, 0], y: [0, -10, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-[#B31942]/20"
        animate={{ x: [0, -12, 0], y: [0, 12, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-12 top-4 h-16 w-16 rounded-full bg-white/[0.04]"
        animate={{ x: [0, 8, 0], y: [0, -8, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      {/* Shimmer line across header */}
      <motion.div
        className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Premium FAB                                                        */
/* ------------------------------------------------------------------ */
function FloatingButton({ onClick }: { onClick: () => void }) {
  const [pulsing, setPulsing] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPulsing(false), 8000);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[60]"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.5, type: 'spring', stiffness: 280, damping: 22 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Multi-ring pulse */}
      {pulsing && (
        <>
          <motion.span
            className="absolute inset-0 rounded-full bg-[#002868]"
            initial={{ scale: 1, opacity: 0.4 }}
            animate={{ scale: 2.0, opacity: 0 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.span
            className="absolute inset-0 rounded-full bg-[#002868]"
            initial={{ scale: 1, opacity: 0.3 }}
            animate={{ scale: 1.7, opacity: 0 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
          />
        </>
      )}

      {/* Orbiting dot */}
      <motion.span
        className="absolute h-2.5 w-2.5 rounded-full bg-[#B31942] shadow-lg shadow-[#B31942]/50"
        animate={{
          rotate: 360,
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        style={{
          top: '50%',
          left: '50%',
          marginLeft: -5,
          marginTop: -33,
          transformOrigin: '5px 33px',
        }}
      />

      {/* Glow ring on hover */}
      <motion.div
        className="absolute -inset-1 rounded-full"
        animate={{
          boxShadow: hovered
            ? '0 0 20px 4px rgba(0, 40, 104, 0.4), 0 0 40px 8px rgba(0, 40, 104, 0.15)'
            : '0 0 0px 0px rgba(0, 40, 104, 0)',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Main button */}
      <motion.button
        onClick={onClick}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#003DA5] to-[#001B4D] text-white shadow-xl shadow-[#002868]/30 focus:outline-none focus:ring-2 focus:ring-[#002868]/40"
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Open contact form"
      >
        <motion.div
          animate={{ rotate: hovered ? 15 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <MessageCircle className="h-6 w-6" />
        </motion.div>
      </motion.button>

      {/* Tooltip on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 8, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-[#0F172A] px-3 py-1.5 text-xs font-medium text-white shadow-lg"
          >
            Chat with us!
            <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-[#0F172A]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Success Particle Burst                                              */
/* ------------------------------------------------------------------ */
function SuccessParticles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i / 12) * 360,
    distance: 40 + Math.random() * 30,
    size: 3 + Math.random() * 4,
    color: i % 3 === 0 ? '#002868' : i % 3 === 1 ? '#B31942' : '#059669',
    delay: i * 0.03,
  }));

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, backgroundColor: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
            y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
            opacity: 0,
            scale: 0.3,
          }}
          transition={{ duration: 0.7, delay: 0.2 + p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated Submit Button                                              */
/* ------------------------------------------------------------------ */
function AnimatedSubmitButton() {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
      />
      <Button
        type="submit"
        className="relative h-12 w-full rounded-xl bg-gradient-to-r from-[#002868] via-[#003DA5] to-[#002868] bg-[length:200%_100%] text-sm font-bold tracking-wide text-white shadow-lg shadow-[#002868]/25 transition-all hover:shadow-xl hover:shadow-[#002868]/35"
      >
        <Send className="mr-2 h-4 w-4" />
        Get Free Consultation
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
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
  const [focusedField, setFocusedField] = useState<string | null>(null);
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

      if (pct >= 0.48 && pct <= 0.55 && !scrollTriggersRef.current.mid && !getSessionFlag(SESSION_SHOWN_MID)) {
        scrollTriggersRef.current.mid = true;
        setSessionFlag(SESSION_SHOWN_MID);
        handleOpen();
      }
      if (pct >= 0.88 && !scrollTriggersRef.current.end && !getSessionFlag(SESSION_SHOWN_END)) {
        scrollTriggersRef.current.end = true;
        setSessionFlag(SESSION_SHOWN_END);
        handleOpen();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleOpen]);

  const handleClose = useCallback(() => setOpen(false), []);

  const handleDismissForever = useCallback(() => {
    try { localStorage.setItem(STORAGE_KEY, 'true'); } catch { /* ignore */ }
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
      } catch { /* graceful */ }
    }
    setSubmitted(true);
  };

  if (isPermanentlyDismissed() || currentView === 'contact') return null;

  return (
    <>
      <FloatingButton onClick={handleOpen} />

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Backdrop with animated gradient border effect */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={handleClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Popup Card */}
            <motion.div
              className="relative z-10 w-full max-w-[420px] overflow-hidden"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ perspective: 1200 }}
            >
              {/* Animated border glow */}
              <motion.div
                className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-[#002868]/40 via-[#B31942]/20 to-[#002868]/40"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Inner card */}
              <div className="relative rounded-3xl bg-white shadow-2xl shadow-black/20">
                {/* ========== HEADER ========== */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#002868] to-[#0A1628] px-7 pb-10 pt-7 text-white">
                  <AnimatedOrbs />

                  {/* Close button */}
                  <motion.button
                    onClick={handleClose}
                    className="absolute right-3.5 top-3.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white hover:rotate-90"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>

                  <div className="relative z-10">
                    <motion.div
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm ring-1 ring-white/20"
                      variants={staggerChild}
                    >
                      <GraduationCap className="h-6 w-6" />
                    </motion.div>
                    <motion.h3
                      className="text-[22px] font-bold leading-tight tracking-tight"
                      variants={staggerChild}
                    >
                      Get Free Consultation
                    </motion.h3>
                    <motion.div
                      className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-white/60"
                      variants={staggerChild}
                    >
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        2-hour response
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5" />
                        Free assessment
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5" />
                        5,000+ students
                      </span>
                    </motion.div>
                  </div>

                  {/* Curved bottom edge */}
                  <div className="absolute -bottom-px left-0 right-0">
                    <svg viewBox="0 0 420 20" className="w-full" preserveAspectRatio="none">
                      <path d="M0,20 L0,8 Q210,0 420,8 L420,20 Z" fill="white" />
                    </svg>
                  </div>
                </div>

                {/* ========== BODY ========== */}
                <div className="max-h-[60vh] overflow-y-auto px-7 py-6">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        className="relative flex flex-col items-center py-6 text-center"
                        initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                        transition={{ duration: 0.4 }}
                      >
                        <SuccessParticles />
                        <motion.div
                          className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#059669]/10 to-[#059669]/5 ring-1 ring-[#059669]/20"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 250, damping: 18, delay: 0.15 }}
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.35 }}
                          >
                            <CheckCircle2 className="h-10 w-10 text-[#059669]" />
                          </motion.div>
                        </motion.div>
                        <motion.h4
                          className="text-xl font-bold text-[#0F172A]"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          Thank You!
                        </motion.h4>
                        <motion.p
                          className="mt-2 max-w-[280px] text-sm leading-relaxed text-[#6B7280]"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          We&apos;ve received your inquiry. Our team will reach out within 2 hours via email and WhatsApp.
                        </motion.p>
                        <motion.div
                          className="mt-6 flex w-full gap-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Button
                            onClick={() => setOpen(false)}
                            className="flex-1 rounded-xl bg-[#002868] text-white hover:bg-[#001B4D]"
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
                            className="flex-1 rounded-xl border-gray-200"
                          >
                            Send Another
                          </Button>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Full Name */}
                        <motion.div variants={fieldItem} className="group">
                          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
                            Full Name <span className="text-[#B31942]">*</span>
                          </label>
                          <div className="relative">
                            <Input
                              required
                              placeholder="Your full name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              onFocus={() => setFocusedField('name')}
                              onBlur={() => setFocusedField(null)}
                              className="h-11 rounded-xl border-gray-200 bg-gray-50/80 pr-10 text-sm transition-all duration-200 focus-visible:border-[#002868] focus-visible:bg-white focus-visible:ring-[#002868]/20 focus-visible:shadow-[0_0_0_3px_rgba(0,40,104,0.08)]"
                            />
                            <motion.div
                              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                              animate={{
                                scale: focusedField === 'name' ? 1 : 0.8,
                                opacity: focusedField === 'name' ? 1 : 0.3,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <GraduationCap className="h-4 w-4 text-[#002868]/40" />
                            </motion.div>
                          </div>
                        </motion.div>

                        {/* Email + Phone */}
                        <div className="grid grid-cols-2 gap-3">
                          <motion.div variants={fieldItem} className="group">
                            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
                              Email <span className="text-[#B31942]">*</span>
                            </label>
                            <Input
                              required
                              type="email"
                              placeholder="your@email.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              onFocus={() => setFocusedField('email')}
                              onBlur={() => setFocusedField(null)}
                              className="h-11 rounded-xl border-gray-200 bg-gray-50/80 text-sm transition-all duration-200 focus-visible:border-[#002868] focus-visible:bg-white focus-visible:ring-[#002868]/20 focus-visible:shadow-[0_0_0_3px_rgba(0,40,104,0.08)]"
                            />
                          </motion.div>
                          <motion.div variants={fieldItem} className="group">
                            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
                              Phone
                            </label>
                            <Input
                              type="tel"
                              placeholder="+1 (XXX) XXX-XXXX"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              onFocus={() => setFocusedField('phone')}
                              onBlur={() => setFocusedField(null)}
                              className="h-11 rounded-xl border-gray-200 bg-gray-50/80 text-sm transition-all duration-200 focus-visible:border-[#002868] focus-visible:bg-white focus-visible:ring-[#002868]/20 focus-visible:shadow-[0_0_0_3px_rgba(0,40,104,0.08)]"
                            />
                          </motion.div>
                        </div>

                        {/* Service dropdown */}
                        <motion.div variants={fieldItem} className="group">
                          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
                            Service Needed
                          </label>
                          <select
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50/80 px-4 text-sm text-[#0F172A] transition-all duration-200 focus:border-[#002868] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:shadow-[0_0_0_3px_rgba(0,40,104,0.08)]"
                          >
                            <option value="">Select a service...</option>
                            {services.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </motion.div>

                        {/* Message */}
                        <motion.div variants={fieldItem} className="group">
                          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
                            How can we help? <span className="text-[#B31942]">*</span>
                          </label>
                          <Textarea
                            required
                            rows={3}
                            placeholder="Briefly describe your situation..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            className="rounded-xl border-gray-200 bg-gray-50/80 text-sm transition-all duration-200 focus-visible:border-[#002868] focus-visible:bg-white focus-visible:ring-[#002868]/20 focus-visible:shadow-[0_0_0_3px_rgba(0,40,104,0.08)]"
                          />
                        </motion.div>

                        {/* Turnstile */}
                        <motion.div variants={fieldItem} className="flex items-center gap-2 pt-1">
                          <ShieldCheck className="h-4 w-4 shrink-0 text-[#002868]/50" />
                          <CloudflareTurnstile
                            onVerify={setTurnstileToken}
                            onError={() => setTurnstileToken(null)}
                            onExpire={() => setTurnstileToken(null)}
                            className="flex-1"
                            size="compact"
                          />
                        </motion.div>

                        {/* Submit */}
                        <motion.div variants={fieldItem}>
                          <AnimatedSubmitButton />
                        </motion.div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>

                {/* ========== FOOTER ========== */}
                <motion.div
                  className="border-t border-gray-100/80 bg-gray-50/50 px-7 py-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-4 text-xs font-medium text-[#9CA3AF]">
                      <motion.a
                        href="tel:+13028935594"
                        className="flex items-center gap-1.5 transition-colors hover:text-[#002868]"
                        whileHover={{ x: -2 }}
                      >
                        <Phone className="h-3.5 w-3.5" />
                        Call Us
                      </motion.a>
                      <motion.a
                        href="https://wa.me/13028935594"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 transition-colors hover:text-[#25D366]"
                        whileHover={{ x: -2 }}
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        WhatsApp
                      </motion.a>
                    </div>
                    <motion.button
                      onClick={() => setShowDontAsk(!showDontAsk)}
                      className="text-[11px] font-medium text-[#D1D5DB] transition-colors hover:text-[#6B7280]"
                      whileTap={{ scale: 0.95 }}
                    >
                      Don&apos;t show again
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {showDontAsk && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2.5 flex items-center justify-between rounded-xl bg-white px-4 py-2.5 shadow-sm ring-1 ring-gray-100">
                          <span className="text-xs text-[#6B7280]">Stop showing this popup?</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleDismissForever}
                            className="h-7 rounded-lg px-3 text-xs font-medium text-[#DC2626] hover:bg-red-50 hover:text-[#DC2626]"
                          >
                            Yes, dismiss
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
