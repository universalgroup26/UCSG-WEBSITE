'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Standard ease curve used across the site (matches existing [0.22,1,0.36,1] pattern).
 * Exported so any component can re-use the same easing.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * MotionProvider
 * --------------
 * Wraps the app in <MotionConfig reducedMotion="user"> so that framer-motion
 * itself honors the OS-level prefers-reduced-motion setting automatically.
 * No per-component useReducedMotion() calls are required for transforms to be
 * disabled — framer-motion handles it internally.
 *
 * Also establishes a default transition (EASE curve) so any motion child
 * without an explicit transition inherits it.
 *
 * Placement: INSIDE <GlobalShell> in src/app/layout.tsx so the shell's
 * own motion components benefit too.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: EASE }}>
      {children}
    </MotionConfig>
  );
}
