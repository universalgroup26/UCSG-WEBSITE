'use client';

import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';

export interface ScrollProgress3DProps {
  /** 'bar' = flat gradient bar; 'ribbon' = 3D ribbon that lifts away as you scroll. */
  variant?: 'bar' | 'ribbon';
  /** Bar height in px. */
  height?: number;
  className?: string;
}

/**
 * ScrollProgress3D
 * ----------------
 * Fixed-at-top scroll progress indicator driven by `useScroll()` (whole page)
 * + `useSpring` for smoothing.
 *
 * - 'bar': 3px gradient bar (navy → gold → cyan) scaling 0→1 across the top.
 * - 'ribbon': adds `perspective` + `transformOrigin: top` + a `rotateX`
 *   transform that lifts the bar away from the screen as scroll progresses
 *   (rotateX 35deg at 0% → 0deg at 100%).
 *
 * Reduced motion: plain flat bar (no 3D rotate).
 *
 * All transforms applied via inline style — global `@media (scripting: none)`
 * safety net overrides them when JS is off.
 */
export default function ScrollProgress3D({
  variant = 'ribbon',
  height = 3,
  className,
}: ScrollProgress3DProps) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const sxRaw = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  const scaleXStyle = useTransform(scrollYProgress, (v) => v);
  const ribbonRotate = useTransform(
    scrollYProgress,
    [0, 1],
    ['rotateX(35deg)', 'rotateX(0deg)'],
  );

  if (variant === 'bar' || reduce) {
    return (
      <motion.div
        aria-hidden="true"
        className={`fixed left-0 top-0 z-[60] origin-left ${className ?? ''}`}
        style={{
          height,
          scaleX: sxRaw,
          background:
            'linear-gradient(90deg, #071B35 0%, #D6A84B 50%, #39C5E8 100%)',
        }}
      />
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      className={`fixed left-0 right-0 top-0 z-[60] origin-top ${className ?? ''}`}
      style={{
        height,
        perspective: 800,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className="h-full w-full origin-left"
        style={{
          background:
            'linear-gradient(90deg, #071B35 0%, #D6A84B 50%, #39C5E8 100%)',
          scaleX: scaleXStyle,
          transform: ribbonRotate,
          transformOrigin: 'top',
        }}
      />
    </motion.div>
  );
}
