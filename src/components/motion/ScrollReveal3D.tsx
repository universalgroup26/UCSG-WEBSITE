'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from './MotionProvider';

export interface ScrollReveal3DProps {
  /** Delay (seconds) before the reveal transition starts. */
  delay?: number;
  /** Initial rotateX in degrees. 0 = no 3D rotation. Default -8. */
  rotateX?: number;
  /** Initial translateZ in pixels. 0 = no depth. Default 40. */
  translateZ?: number;
  /** Initial Y offset in pixels. Default 30. */
  y?: number;
  /** Whether the reveal should only happen once. Default true. */
  once?: boolean;
  /** Viewport amount (0..1) before the reveal triggers. Default 0.3. */
  amount?: number;
  className?: string;
  children: ReactNode;
}

/**
 * ScrollReveal3D
 * --------------
 * Drop-in scroll-reveal primitive with optional 3D perspective.
 *
 * Initial state: opacity 0 + y + rotateX + translateZ (perspective).
 * Visible state: opacity 1 + y 0 + rotateX 0 + translateZ 0.
 *
 * This primitive is the BACKBONE of the entire 3D upgrade — it's a 1-line
 * swap for the duplicated `fadeUp` constants across the codebase that just
 * do opacity + y:24 → opacity:1 + y:0.
 *
 * Reduced motion (via <MotionConfig reducedMotion="user">) makes
 * framer-motion itself drop transforms. We additionally strip the initial
 * transforms when `useReducedMotion()` returns true so the very first paint
 * isn't tilted (avoids a flash before MotionConfig kicks in).
 *
 * All motion uses inline style — global `@media (scripting: none)` safety net
 * overrides opacity:0 → 1 when JS is disabled.
 */
export default function ScrollReveal3D({
  delay = 0,
  rotateX = -8,
  translateZ = 40,
  y = 30,
  once = true,
  amount = 0.3,
  className,
  children,
}: ScrollReveal3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const initial = reduce
    ? { opacity: 0 }
    : { opacity: 0, y, rotateX, z: translateZ, transformPerspective: 1000 };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        z: 0,
        transition: { duration: 0.5, ease: EASE, delay },
      }}
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}
