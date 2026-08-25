'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

/* Brand Constants */
const NAVY = '#061846';
const GOLD = '#D6A84B';

/* Timing (seconds) */
const TOTAL_DURATION = 7.0;
const FADE_OUT_DURATION = 0.8;

/* City Points (normalised 0-1 coordinates) */
interface City {
  x: number;
  y: number;
  delay: number;
}

const CITIES: City[] = [
  { x: 0.16, y: 0.32, delay: 0.0 },
  { x: 0.22, y: 0.28, delay: 0.08 },
  { x: 0.26, y: 0.35, delay: 0.16 },
  { x: 0.20, y: 0.42, delay: 0.24 },
  { x: 0.18, y: 0.48, delay: 0.32 },
  { x: 0.24, y: 0.55, delay: 0.40 },
  { x: 0.14, y: 0.60, delay: 0.48 },
  { x: 0.48, y: 0.28, delay: 0.12 },
  { x: 0.52, y: 0.34, delay: 0.20 },
  { x: 0.54, y: 0.42, delay: 0.28 },
  { x: 0.50, y: 0.52, delay: 0.36 },
  { x: 0.56, y: 0.30, delay: 0.44 },
  { x: 0.46, y: 0.38, delay: 0.52 },
  { x: 0.44, y: 0.46, delay: 0.18 },
  { x: 0.72, y: 0.30, delay: 0.26 },
  { x: 0.76, y: 0.36, delay: 0.34 },
  { x: 0.80, y: 0.32, delay: 0.42 },
  { x: 0.78, y: 0.40, delay: 0.50 },
  { x: 0.82, y: 0.44, delay: 0.56 },
  { x: 0.85, y: 0.52, delay: 0.60 },
  { x: 0.70, y: 0.50, delay: 0.30 },
  { x: 0.74, y: 0.58, delay: 0.38 },
  { x: 0.68, y: 0.42, delay: 0.22 },
  { x: 0.88, y: 0.38, delay: 0.46 },
  { x: 0.38, y: 0.32, delay: 0.14 },
  { x: 0.42, y: 0.54, delay: 0.54 },
  { x: 0.30, y: 0.48, delay: 0.46 },
  { x: 0.34, y: 0.36, delay: 0.38 },
  { x: 0.62, y: 0.36, delay: 0.30 },
  { x: 0.58, y: 0.48, delay: 0.50 },
  { x: 0.66, y: 0.28, delay: 0.20 },
  { x: 0.40, y: 0.42, delay: 0.58 },
  { x: 0.50, y: 0.46, delay: 0.34 },
  { x: 0.28, y: 0.52, delay: 0.62 },
  { x: 0.86, y: 0.48, delay: 0.54 },
  { x: 0.12, y: 0.44, delay: 0.40 },
  { x: 0.36, y: 0.28, delay: 0.16 },
  { x: 0.60, y: 0.44, delay: 0.48 },
  { x: 0.48, y: 0.58, delay: 0.56 },
  { x: 0.64, y: 0.54, delay: 0.60 },
];

/* Connection arcs (index pairs) */
const CONNECTIONS: [number, number][] = [
  [0, 7],
  [1, 37],
  [7, 14],
  [8, 27],
  [14, 17],
  [15, 23],
  [20, 12],
  [3, 24],
  [10, 18],
  [6, 5],
  [22, 30],
  [28, 16],
];

/* Easing helpers */
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
function clamp01(t: number) {
  return Math.max(0, Math.min(1, t));
}

/* Quadratic bezier for arcs */
function quadBezier(
  p0: { x: number; y: number },
  cp: { x: number; y: number },
  p1: { x: number; y: number },
  t: number,
) {
  const mt = 1 - t;
  return {
    x: mt * mt * p0.x + 2 * mt * t * cp.x + t * t * p1.x,
    y: mt * mt * p0.y + 2 * mt * t * cp.y + t * t * p1.y,
  };
}

/* Arc control point (lifted above midpoint) */
function getArcControlPoint(
  a: { x: number; y: number },
  b: { x: number; y: number },
  idx: number,
) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const lift = len * 0.3 * (idx % 2 === 0 ? -1 : 1);
  return {
    x: mx + (-dy / (len || 1)) * lift,
    y: my + (dx / (len || 1)) * lift,
  };
}

/* Keyframe CSS string */
const KEYFRAME_CSS = `
@keyframes ucsg-gold-sweep {
  0% { background-position: 200% center; }
  100% { background-position: -200% center; }
}
@keyframes ucsg-gold-sweep-subtle {
  0% { background-position: 200% center; }
  100% { background-position: -200% center; }
}
@keyframes ucsg-highlight-travel {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}
@keyframes ucsg-ribbon-sweep {
  0% { background-position: -100% center; opacity: 0; }
  30% { opacity: 1; }
  70% { opacity: 1; }
  100% { background-position: 200% center; opacity: 0; }
}`;

/* Create particles outside component to avoid hook issues */
function createParticles() {
  return Array.from({ length: 55 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.0003,
    vy: (Math.random() - 0.5) * 0.0003,
    r: Math.random() * 1.2 + 0.4,
    alpha: Math.random() * 0.5 + 0.2,
    phase: Math.random() * Math.PI * 2,
  }));
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const completedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const particlesRef = useRef(createParticles());

  /* Inject keyframe styles once */
  useEffect(() => {
    if (styleRef.current) return;
    const el = document.createElement('style');
    el.textContent = KEYFRAME_CSS;
    document.head.appendChild(el);
    styleRef.current = el;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  /* Resize + animation loop */
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;

    function resize() {
      const rect = container.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = particlesRef.current;
    startTimeRef.current = performance.now();

    function loop(now: number) {
      const elapsed = (now - startTimeRef.current) / 1000;
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      /* Floating particles */
      const particleAlpha = clamp01(elapsed / 1.0);
      if (particleAlpha > 0) {
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > 1) p.vx *= -1;
          if (p.y < 0 || p.y > 1) p.vy *= -1;
          const flicker = 0.5 + 0.5 * Math.sin(elapsed * 2 + p.phase);
          ctx.beginPath();
          ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
          ctx.fillStyle =
            'rgba(214,168,75,' +
            (p.alpha * flicker * particleAlpha * 0.4).toFixed(3) +
            ')';
          ctx.fill();
        }
      }

      /* City lights */
      for (const city of CITIES) {
        const cityT = clamp01((elapsed - city.delay) / 0.6);
        if (cityT <= 0) continue;
        const eased = easeOutCubic(cityT);
        const px = city.x * w;
        const py = city.y * h;
        const baseR = 1.5 + (w / 1000) * 0.8;

        const grad = ctx.createRadialGradient(px, py, 0, px, py, baseR * 4);
        grad.addColorStop(0, 'rgba(214,168,75,' + (eased * 0.35).toFixed(3) + ')');
        grad.addColorStop(1, 'rgba(214,168,75,0)');
        ctx.beginPath();
        ctx.arc(px, py, baseR * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, baseR * eased, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(214,168,75,' + (eased * 0.9).toFixed(3) + ')';
        ctx.fill();
      }

      /* Connection arcs */
      CONNECTIONS.forEach((pair, idx) => {
        const arcStart = 1.0 + idx * 0.17;
        const arcT = clamp01((elapsed - arcStart) / 0.8);
        if (arcT <= 0) return;

        const a = CITIES[pair[0]];
        const b = CITIES[pair[1]];
        if (!a || !b) return;

        const pa = { x: a.x * w, y: a.y * h };
        const pb = { x: b.x * w, y: b.y * h };
        const cp = getArcControlPoint(pa, pb, idx);

        const easedT = easeInOutQuad(arcT);
        const steps = Math.floor(easedT * 40);

        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        for (let s = 1; s <= steps; s++) {
          const pt = quadBezier(pa, cp, pb, s / 40);
          ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = 'rgba(214,168,75,' + (easedT * 0.35).toFixed(3) + ')';
        ctx.lineWidth = 0.8 + (w / 2000) * 0.5;
        ctx.stroke();

        /* Traveling particle along the arc */
        const travelStart = arcStart + 0.2;
        const travelT = clamp01((elapsed - travelStart) / 1.2);
        if (travelT > 0 && travelT < 1) {
          const pt = quadBezier(pa, cp, pb, easeInOutQuad(travelT));
          const glow = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 6);
          glow.addColorStop(0, 'rgba(214,168,75,0.8)');
          glow.addColorStop(0.5, 'rgba(214,168,75,0.2)');
          glow.addColorStop(1, 'rgba(214,168,75,0)');
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,225,150,0.95)';
          ctx.fill();
        }
      });

      if (elapsed < TOTAL_DURATION + FADE_OUT_DURATION + 0.5) {
        rafRef.current = requestAnimationFrame(loop);
      }
    }
    rafRef.current = requestAnimationFrame(loop);

    const completeTimer = window.setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        try {
          sessionStorage.setItem('ucsg-loading-seen', '1');
        } catch {
          /* storage might be blocked */
        }
        onComplete();
      }
    }, (TOTAL_DURATION + FADE_OUT_DURATION) * 1000);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  /* Text animation variants */
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const fadeSlideUp = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const pillars = ['INSIGHT', 'STRATEGY', 'SOLUTIONS'];
  const brandWords = 'UNIVERSAL CONSULTING SERVICE GROUP'.split(' ');

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ backgroundColor: NAVY }}
    >
      {/* World map background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/world-map.png)',
          filter: 'brightness(0.4) contrast(1.2) sepia(0.3)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.18 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* Canvas overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ pointerEvents: 'none' }}
      />

      {/* Central content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4">
        {/* Phase 3: UCSG Logo */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.0,
            delay: 1.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Gold glow behind UCSG */}
          <div
            className="absolute inset-0 -z-10 scale-150 blur-3xl"
            style={{ background: 'radial-gradient(ellipse, rgba(214,168,75,0.18) 0%, transparent 70%)' }}
          />
          <span
            className="block text-center font-black tracking-[0.2em] sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              color: GOLD,
              textShadow:
                '0 0 30px rgba(214,168,75,0.35), 0 0 60px rgba(214,168,75,0.15), 0 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            <span
              className="relative inline-block"
              style={{
                background:
                  'linear-gradient(90deg, #D6A84B 0%, #D6A84B 35%, #FFE4A0 50%, #D6A84B 65%, #D6A84B 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'ucsg-gold-sweep 2.5s ease-in-out 1.5s forwards',
              }}
            >
              UCSG
            </span>
          </span>
        </motion.div>

        {/* Phase 4: Brand Name - word-by-word sweep */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 sm:mt-4 sm:gap-x-3 md:mt-5">
          {brandWords.map((word, i) => (
            <motion.span
              key={word + i}
              className="relative inline-block text-[9px] font-semibold uppercase tracking-[0.25em] sm:text-[11px] md:text-xs lg:text-sm"
              style={{ color: 'rgba(214,168,75,0.85)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 2.5 + i * 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span
                style={{
                  background:
                    'linear-gradient(90deg, rgba(214,168,75,0.85) 0%, rgba(214,168,75,0.85) 30%, rgba(255,228,160,1) 50%, rgba(214,168,75,0.85) 70%, rgba(214,168,75,0.85) 100%)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation:
                    'ucsg-gold-sweep-subtle 2.0s ease-in-out ' +
                    (2.5 + i * 0.18) +
                    's forwards',
                }}
              >
                {word}
              </span>
            </motion.span>
          ))}
        </div>

        {/* Phase 5: Brand Pillars */}
        <motion.div
          className="mt-4 flex flex-wrap items-center justify-center gap-x-2 sm:mt-5 sm:gap-x-3 md:mt-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          transition={{ delayChildren: 3.5 }}
        >
          {pillars.map((word, i) => (
            <motion.span
              key={word}
              variants={fadeSlideUp}
              transition={{
                duration: 0.55,
                delay: 3.5 + i * 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative text-[9px] font-medium uppercase tracking-[0.35em] sm:text-[10px] md:text-xs"
              style={{ color: 'rgba(214,168,75,0.7)' }}
            >
              {i > 0 && (
                <span
                  className="mx-1.5 inline-block sm:mx-2"
                  style={{ color: 'rgba(214,168,75,0.4)' }}
                >
                  {'\u2022'}
                </span>
              )}
              <span style={{ textShadow: '0 0 12px rgba(214,168,75,0.3)' }}>
                {word}
              </span>
            </motion.span>
          ))}
        </motion.div>

        {/* Phase 6: Tagline */}
        <motion.p
          className="relative mt-4 max-w-md text-center text-[8px] font-light uppercase tracking-[0.3em] sm:mt-5 sm:text-[10px] md:mt-6 md:text-xs"
          style={{ color: 'rgba(255,255,255,0.6)' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 4.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          YOUR PARTNER FOR A BETTER TOMORROW.
          <span
            className="absolute bottom-0 left-0 h-px w-full overflow-hidden"
            style={{ background: 'rgba(214,168,75,0.15)' }}
          >
            <span
              className="block h-full w-1/3"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(214,168,75,0.6), transparent)',
                animation: 'ucsg-highlight-travel 2.0s ease-in-out 4.6s forwards',
              }}
            />
          </span>
        </motion.p>

        {/* Phase 7: Slight brighten at 6.0s */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 6.0, ease: 'easeInOut' }}
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(214,168,75,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Gold ribbon sweep (Phase 7) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(214,168,75,0.12) 40%, rgba(255,228,160,0.18) 50%, rgba(214,168,75,0.12) 60%, transparent 100%)',
          backgroundSize: '250% 100%',
          animation: 'ucsg-ribbon-sweep 1.2s ease-in-out 6.5s forwards',
        }}
      />

      {/* Full-screen fade out (Phase 7 end) */}
      <AnimatePresence>
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: NAVY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: FADE_OUT_DURATION, delay: TOTAL_DURATION, ease: 'easeInOut' }}
        />
      </AnimatePresence>
    </div>
  );
}
