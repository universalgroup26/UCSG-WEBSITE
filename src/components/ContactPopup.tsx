'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
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
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  visible: { opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 60 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24, staggerChildren: 0.055, delayChildren: 0.12 },
  },
  exit: { opacity: 0, scale: 0.94, y: 24, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } },
};

const headerChild = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 350, damping: 22 } },
};

const fieldReveal = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 380, damping: 26 } },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function getSessionFlag(key: string): boolean {
  try { return sessionStorage.getItem(key) === 'true'; } catch { return false; }
}
function setSessionFlag(key: string) {
  try { sessionStorage.setItem(key, 'true'); } catch { /* noop */ }
}
function isPermanentlyDismissed(): boolean {
  try { return localStorage.getItem(STORAGE_KEY) === 'true'; } catch { return false; }
}

/* ------------------------------------------------------------------ */
/*  Shared label style                                                  */
/* ------------------------------------------------------------------ */
const labelBase = 'pointer-events-none absolute left-[18px] text-[15px] leading-none';

/* ------------------------------------------------------------------ */
/*  Floating Label Input                                                */
/* ------------------------------------------------------------------ */
function FloatingInput({
  label, type = 'text', required = false, value, onChange, icon: Icon,
}: {
  label: string; type?: string; required?: boolean; value: string;
  onChange: (v: string) => void; icon?: React.ComponentType<{ className?: string }>; name?: string;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <motion.div variants={fieldReveal} className="relative">
      <div className="relative">
        <input
          type={type} required={required} value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className={
            'peer h-[52px] w-full rounded-2xl border-[1.5px] bg-slate-50/80 pt-7 pb-1.5 px-4 text-[15px] text-slate-900 outline-none transition-all duration-300 ' +
            'placeholder-transparent ' +
            (focused
              ? 'border-[#002868] bg-white ring-[3px] ring-[#002868]/10'
              : 'border-slate-200 hover:border-slate-300 hover:bg-white')
          }
        />
        <motion.span
          className={labelBase + ' bg-white px-1.5 rounded-md'}
          animate={{
            top: isActive ? -8 : 17,
            scale: isActive ? 0.72 : 1,
            originX: 0,
            color: isActive && focused ? '#002868' : isActive ? '#64748b' : '#94a3b8',
          }}
          transition={{ type: 'spring', stiffness: 420, damping: 28 }}
          style={{ transformOrigin: '0% 50%' }}
        >
          {label}{required && <span className="ml-0.5 text-[#B31942]">*</span>}
        </motion.span>
        {Icon && (
          <motion.div
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
            animate={{ opacity: focused ? 0.7 : 0.25, scale: focused ? 1 : 0.85 }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="h-[18px] w-[18px] text-[#002868]/60" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating Textarea                                                   */
/* ------------------------------------------------------------------ */
function FloatingTextarea({ label, required = false, value, onChange }: {
  label: string; required?: boolean; value: string; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  }, []);

  return (
    <motion.div variants={fieldReveal} className="relative">
      <div className="relative">
        <textarea
          ref={textareaRef} required={required} rows={3} value={value}
          onChange={(e) => { onChange(e.target.value); adjustHeight(); }}
          onFocus={() => { setFocused(true); adjustHeight(); }}
          onBlur={() => setFocused(false)}
          className={
            'peer min-h-[80px] w-full resize-none rounded-2xl border-[1.5px] bg-slate-50/80 pt-7 pb-2.5 px-4 text-[15px] text-slate-900 outline-none transition-all duration-300 ' +
            'placeholder-transparent ' +
            (focused
              ? 'border-[#002868] bg-white ring-[3px] ring-[#002868]/10'
              : 'border-slate-200 hover:border-slate-300 hover:bg-white')
          }
        />
        <motion.span
          className={labelBase + ' bg-white px-1.5 rounded-md'}
          animate={{
            top: isActive ? -8 : 19,
            scale: isActive ? 0.72 : 1,
            originX: 0,
            color: isActive && focused ? '#002868' : isActive ? '#64748b' : '#94a3b8',
          }}
          transition={{ type: 'spring', stiffness: 420, damping: 28 }}
          style={{ transformOrigin: '0% 50%' }}
        >
          {label}{required && <span className="ml-0.5 text-[#B31942]">*</span>}
        </motion.span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Custom Floating Select                                              */
/* ------------------------------------------------------------------ */
function FloatingSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const isActive = focused || open || value.length > 0;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <motion.div ref={ref} variants={fieldReveal} className="relative z-10">
      <div className="relative">
        <button
          type="button" onClick={() => setOpen(!open)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className={
            'peer flex h-[52px] w-full items-center rounded-2xl border-[1.5px] px-4 text-left text-[15px] outline-none transition-all duration-300 ' +
            (value ? 'text-slate-900 pt-7 pb-1.5' : 'text-transparent pt-7 pb-1.5') + ' ' +
            (focused || open
              ? 'border-[#002868] bg-white ring-[3px] ring-[#002868]/10'
              : 'border-slate-200 bg-slate-50/80 hover:border-slate-300 hover:bg-white')
          }
        >
          <span className="select-none">{value || '\u00A0'}</span>
          <motion.div
            className="ml-auto shrink-0"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-[18px] w-[18px] text-slate-400" />
          </motion.div>
        </button>
        <motion.span
          className={labelBase + ' bg-white px-1.5 rounded-md'}
          animate={{
            top: isActive ? -8 : 17,
            scale: isActive ? 0.72 : 1,
            originX: 0,
            color: (focused || open) ? '#002868' : isActive ? '#64748b' : '#94a3b8',
          }}
          transition={{ type: 'spring', stiffness: 420, damping: 28 }}
          style={{ transformOrigin: '0% 50%' }}
        >
          Service needed
        </motion.span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="absolute left-0 right-0 top-full z-30 mt-1.5 overflow-hidden rounded-2xl border border-slate-100 bg-white py-1.5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15),0_8px_16px_-8px_rgba(0,0,0,0.08)]"
          >
            {services.map((s, i) => (
              <motion.button
                key={s} type="button"
                onClick={() => { onChange(s); setOpen(false); }}
                className={
                  'flex w-full items-center px-4 py-2.5 text-[14px] text-left transition-colors ' +
                  (value === s
                    ? 'bg-[#002868]/[0.06] font-medium text-[#002868]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900')
                }
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                {s}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated Header Orbs                                                */
/* ------------------------------------------------------------------ */
function AnimatedOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-white/[0.06]"
        animate={{ x: [0, 20, 0], y: [0, -15, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-[#B31942]/25"
        animate={{ x: [0, -15, 0], y: [0, 10, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-16 top-3 h-14 w-14 rounded-full bg-white/[0.04]"
        animate={{ x: [0, 10, 0], y: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
        initial={{ x: '-100%' }} animate={{ x: '200%' }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
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
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  useEffect(() => { const t = setTimeout(() => setPulsing(false), 8000); return () => clearTimeout(t); }, []);

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  }, [x, y]);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[60]"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.5, type: 'spring', stiffness: 280, damping: 22 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {pulsing && (
        <>
          <motion.span
            className="absolute inset-0 rounded-full bg-[#002868]"
            initial={{ scale: 1, opacity: 0.35 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.span
            className="absolute inset-0 rounded-full bg-[#002868]"
            initial={{ scale: 1, opacity: 0.25 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
          />
        </>
      )}
      <motion.span
        className="absolute h-2 w-2 rounded-full bg-[#B31942] shadow-[0_0_8px_rgba(179,25,66,0.6)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        style={{ top: '50%', left: '50%', marginLeft: -4, marginTop: -32, transformOrigin: '4px 32px' }}
      />
      <motion.div
        className="absolute -inset-1.5 rounded-full"
        animate={{
          boxShadow: hovered
            ? '0 0 24px 6px rgba(0,40,104,0.35), 0 0 48px 12px rgba(0,40,104,0.12)'
            : '0 0 0px 0px rgba(0,40,104,0)',
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.button
        onClick={onClick} onMouseMove={handleMouse}
        style={{ rotateX, rotateY, perspective: 400 }}
        className="relative flex h-[56px] w-[56px] items-center justify-center rounded-full bg-gradient-to-br from-[#0040A0] to-[#001540] text-white shadow-[0_8px_24px_-4px_rgba(0,40,104,0.4),0_4px_8px_-2px_rgba(0,40,104,0.2)] focus:outline-none"
        whileHover={{ scale: 1.12, y: -2 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Open contact form"
      >
        <motion.div animate={{ rotate: hovered ? 12 : 0 }} transition={{ type: 'spring', stiffness: 400, damping: 12 }}>
          <MessageCircle className="h-[24px] w-[24px]" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.85 }}
            transition={{ duration: 0.15 }}
            className="absolute right-full mr-3.5 whitespace-nowrap rounded-xl bg-slate-900 px-3.5 py-2 text-[13px] font-medium text-white shadow-[0_8px_24px_-4px_rgba(0,0,0,0.3)]"
          >
            Chat with us
            <span className="absolute -right-[5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 bg-slate-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Success Particles                                                   */
/* ------------------------------------------------------------------ */
function SuccessParticles() {
  const particles = useRef(
    Array.from({ length: 16 }, (_, i) => ({
      id: i,
      angle: (i / 16) * 360 + (Math.random() - 0.5) * 20,
      distance: 35 + Math.random() * 45,
      size: 3 + Math.random() * 5,
      color: ['#002868', '#B31942', '#059669', '#D97706'][i % 4],
      delay: i * 0.025,
    }))
  ).current;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {particles.map((p) => (
        <motion.div
          key={p.id} className="absolute rounded-full"
          style={{ width: p.size, height: p.size, backgroundColor: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
            y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
            opacity: 0, scale: 0.2,
          }}
          transition={{ duration: 0.8, delay: 0.25 + p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Contact Popup                                                 */
/* ------------------------------------------------------------------ */
interface ContactPopupProps { currentView?: string; }

export default function ContactPopup({ currentView = 'home' }: ContactPopupProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showDontAsk, setShowDontAsk] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const scrollTriggersRef = useRef({ mid: false, end: false });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });

  const update = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleOpen = useCallback(() => {
    setSubmitted(false);
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    setTurnstileToken(null);
    setOpen(true);
  }, []);

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
    try { localStorage.setItem(STORAGE_KEY, 'true'); } catch { /* noop */ }
    setOpen(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Verify Turnstile
    if (turnstileToken) {
      try {
        const res = await fetch('/api/turnstile/verify', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: turnstileToken }),
        });
        const data = await res.json();
        if (!data.success) return;
      } catch { /* graceful */ }
    }

    // Submit form data to backend
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) return;
    } catch { /* graceful */ }

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
            variants={overlayVariants} initial="hidden" animate="visible" exit="exit"
          >
            <motion.div
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl"
              onClick={handleClose}
            />
            <motion.div
              className="relative z-10 w-full max-w-[440px]"
              variants={cardVariants} initial="hidden" animate="visible" exit="exit"
            >
              {/* Gradient border glow */}
              <motion.div
                className="absolute -inset-[1.5px] rounded-[26px] bg-gradient-to-br from-[#002868]/50 via-[#B31942]/20 to-[#002868]/50 opacity-60"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Card */}
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_12px_24px_-8px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)]">
                {/* ===== HEADER ===== */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#060E1E] via-[#0A1B3D] to-[#07122A] px-8 pb-11 pt-8 text-white">
                  <AnimatedOrbs />
                  <motion.button
                    onClick={handleClose}
                    className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.08] text-white/50 backdrop-blur-sm transition-colors hover:bg-white/[0.15] hover:text-white/90"
                    whileHover={{ scale: 1.15, rotate: 90 }} whileTap={{ scale: 0.9 }}
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                  <div className="relative z-10">
                    <motion.div
                      className="mb-4 flex h-[48px] w-[48px] items-center justify-center rounded-2xl bg-white/[0.08] ring-1 ring-white/[0.12]"
                      variants={headerChild}
                    >
                      <GraduationCap className="h-6 w-6" />
                    </motion.div>
                    <motion.h3 className="text-[22px] font-extrabold leading-tight tracking-[-0.03em]" variants={headerChild}>
                      Get Free Consultation
                    </motion.h3>
                    <motion.div
                      className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-medium text-white/50"
                      variants={headerChild}
                    >
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />2-hour response</span>
                      <span className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" />Free assessment</span>
                      <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5" />5,000+ students</span>
                    </motion.div>
                  </div>
                  <div className="absolute -bottom-px left-0 right-0">
                    <svg viewBox="0 0 440 24" className="block w-full" preserveAspectRatio="none">
                      <path d="M0,24 L0,10 Q220,0 440,10 L440,24 Z" fill="white" />
                    </svg>
                  </div>
                </div>

                {/* ===== BODY ===== */}
                <div className="max-h-[72vh] overflow-y-auto px-8 py-6">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div key="success" className="relative flex flex-col items-center py-8 text-center"
                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, filter: 'blur(6px)' }} transition={{ duration: 0.45 }}
                      >
                        <SuccessParticles />
                        <motion.div
                          className="relative mb-5 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100/50 ring-1 ring-emerald-200/60"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.15 }}
                        >
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 14, delay: 0.35 }}>
                            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                          </motion.div>
                        </motion.div>
                        <motion.h4 className="text-[20px] font-bold tracking-[-0.02em] text-slate-900"
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        >Thank you!</motion.h4>
                        <motion.p className="mt-2 max-w-[280px] text-[14px] leading-relaxed text-slate-500"
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                        >We&apos;ll reach out within 2 hours via email and WhatsApp.</motion.p>
                        <motion.div className="mt-6 flex w-full gap-3"
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                        >
                          <Button onClick={() => setOpen(false)}
                            className="h-11 flex-1 rounded-xl bg-[#002868] text-[14px] font-semibold text-white hover:bg-[#001B4D]"
                          >Done</Button>
                          <Button variant="outline" onClick={() => {
                            setSubmitted(false);
                            setFormData({ name: '', email: '', phone: '', service: '', message: '' });
                            setTurnstileToken(null);
                          }} className="h-11 flex-1 rounded-xl border-slate-200 text-[14px] font-semibold"
                          >Send another</Button>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.form key="form" onSubmit={handleSubmit} className="space-y-4"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      >
                        <FloatingInput label="Full name" required value={formData.name} onChange={(v) => update('name', v)} icon={GraduationCap} />
                        <div className="grid grid-cols-2 gap-3">
                          <FloatingInput label="Email address" type="email" required value={formData.email} onChange={(v) => update('email', v)} />
                          <FloatingInput label="Phone number" type="tel" value={formData.phone} onChange={(v) => update('phone', v)} icon={Phone} />
                        </div>
                        <FloatingSelect value={formData.service} onChange={(v) => update('service', v)} />
                        <FloatingTextarea label="How can we help?" required value={formData.message} onChange={(v) => update('message', v)} />
                        <motion.div variants={fieldReveal} className="flex items-center gap-2 pt-0.5">
                          <ShieldCheck className="h-[14px] w-[14px] shrink-0 text-slate-400" />
                          <CloudflareTurnstile onVerify={setTurnstileToken} onError={() => setTurnstileToken(null)} onExpire={() => setTurnstileToken(null)} className="flex-1" size="compact" />
                        </motion.div>
                        <motion.div variants={fieldReveal}>
                          <motion.div className="relative overflow-hidden rounded-2xl" whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
                              initial={{ x: '-100%' }} animate={{ x: '200%' }}
                              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 2.5 }}
                            />
                            <Button type="submit"
                              className="relative h-[52px] w-full bg-gradient-to-r from-[#002868] via-[#003DA5] to-[#002868] bg-[length:200%_100%] text-[15px] font-bold tracking-wide text-white shadow-[0_8px_20px_-4px_rgba(0,40,104,0.35),0_4px_8px_-2px_rgba(0,40,104,0.2)] transition-shadow hover:shadow-[0_12px_28px_-4px_rgba(0,40,104,0.45),0_6px_12px_-2px_rgba(0,40,104,0.25)]"
                            >
                              <Send className="mr-2.5 h-[16px] w-[16px]" />
                              Get Free Consultation
                              <ArrowRight className="ml-2 h-[16px] w-[16px]" />
                            </Button>
                          </motion.div>
                        </motion.div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>

                {/* ===== FOOTER ===== */}
                <motion.div className="border-t border-slate-100/80 px-8 py-3.5"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-5">
                      <motion.a href="tel:+13028935594"
                        className="flex items-center gap-1.5 text-[13px] font-medium text-[#002868]/60 transition-colors hover:text-[#002868]"
                        whileHover={{ x: -2 }}
                      ><Phone className="h-3.5 w-3.5" />Call us</motion.a>
                      <motion.a href="https://wa.me/13028935594" target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[13px] font-medium text-[#25D366]/60 transition-colors hover:text-[#25D366]"
                        whileHover={{ x: -2 }}
                      ><MessageCircle className="h-3.5 w-3.5" />WhatsApp</motion.a>
                    </div>
                    <motion.button onClick={() => setShowDontAsk(!showDontAsk)}
                      className="text-[12px] font-medium text-slate-400 transition-colors hover:text-slate-600"
                      whileTap={{ scale: 0.95 }}
                    >Don&apos;t show again</motion.button>
                  </div>
                  <AnimatePresence>
                    {showDontAsk && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }} className="overflow-hidden"
                      >
                        <div className="mt-2.5 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100">
                          <span className="text-[13px] text-slate-500">Stop showing this popup?</span>
                          <Button variant="ghost" size="sm" onClick={handleDismissForever}
                            className="h-8 rounded-lg px-3.5 text-[13px] font-medium text-red-500 hover:bg-red-50 hover:text-red-600"
                          >Yes, dismiss</Button>
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
