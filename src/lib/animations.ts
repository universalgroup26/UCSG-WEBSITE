'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useInView } from 'framer-motion';

/* ───────────────────────────────────────────────────────────────────────
   useCounterAnimation — animates a number from 0 to target when in view
   ─────────────────────────────────────────────────────────────────────── */
export function useCounterAnimation(
  target: number,
  options?: {
    duration?: number;
    delay?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
  }
) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const dur = (options?.duration ?? 2000) / 1000;
    const del = (options?.delay ?? 0) / 1000;
    const dec = options?.decimals ?? 0;
    const startTime = performance.now() / 1000 + del;

    let raf: number;
    const tick = () => {
      const now = performance.now() / 1000;
      const elapsed = Math.max(0, now - startTime);
      const progress = Math.min(elapsed / dur, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = eased * target;
      setDisplay(val.toFixed(dec));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, options?.duration, options?.delay, options?.decimals]);

  return {
    ref,
    text: `${options?.prefix ?? ''}${display}${options?.suffix ?? ''}`,
  };
}

/* ───────────────────────────────────────────────────────────────────────
   useTiltEffect — 3D perspective tilt on mouse move
   ─────────────────────────────────────────────────────────────────────── */
export function useTiltEffect(maxTilt: number = 8) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (0.5 - y) * maxTilt;
      const tiltY = (x - 0.5) * maxTilt;
      el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
      el.style.transition = 'transform 0.1s ease-out';
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    el.style.transition = 'transform 0.5s ease-out';
  }, []);

  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
}
