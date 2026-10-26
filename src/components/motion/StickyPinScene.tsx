'use client';

import { useRef, useSyncExternalStore, type ReactNode } from 'react';
import { motion, useScroll, useReducedMotion, type MotionValue } from 'framer-motion';

export interface StickyPinSceneProps {
  /**
   * CSS height of the pinned region — the outer container has this height.
   * The inner motion.div is position: sticky; top:0; height:100vh.
   * Examples: '80vh', '100vh', '120vh'.
   */
  pinFor?: string;
  className?: string;
  /**
   * Either static children, or a render-prop that receives the
   * scrollYProgress MotionValue (0..1 over the pinned region) so children
   * can drive their own animations against scroll progress.
   */
  children?: ReactNode | ((scrollYProgress: MotionValue<number>) => ReactNode);
}

/**
 * useIsDesktop — subscribe to `(min-width: 1024px)` via useSyncExternalStore.
 * SSR returns false (no sticky-pin on SSR + first client render → no
 * hydration mismatch). Updates to the real value after mount.
 */
function subscribeDesktop(callback: () => void) {
  const mql = window.matchMedia('(min-width: 1024px)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}
function getDesktopSnapshot() {
  return window.matchMedia('(min-width: 1024px)').matches;
}
function getDesktopServerSnapshot() {
  return false;
}
function useIsDesktop() {
  return useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    getDesktopServerSnapshot,
  );
}

/**
 * StickyPinScene
 * ---------------
 * Outer div with `height: pinFor; position: relative`.
 * Inner motion.div with `position: sticky; top: 0; height: 100vh;
 * display: flex; align-items: center; overflow: hidden`.
 *
 * `useScroll({ target: outerRef, offset: ['start start', 'end end'] })`
 * gives scrollYProgress 0..1 across the outer container's full height —
 * so children can scrub their own animations (line draws, scale, opacity)
 * against scroll progress via the render-prop pattern.
 *
 * Gating:
 *   - prefers-reduced-motion: render <div>{children}</div> (no sticky).
 *   - mobile (<1024px): render children without sticky wrapper
 *     (sticky-pin on mobile causes scroll fatigue + jank).
 *
 * NOTE: Sticky pin repositions content visually but does NOT change DOM
 * order — screen readers still read content in document order.
 *
 * PERFORMANCE BUDGET: max 2 consecutive sticky pin scenes per page.
 */
export default function StickyPinScene({
  pinFor = '80vh',
  className,
  children,
}: StickyPinSceneProps) {
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const outerRef = useRef<HTMLDivElement>(null);

  // SSR + first client render: isDesktop=false → enabled=false (matches
  // server-rendered HTML — plain div, no sticky styles).
  const enabled = isDesktop && !reduce;

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });

  if (!enabled) {
    // Render children normally in flow — no sticky pin.
    // If children is a function, call it with the scrollYProgress MotionValue
    // (still a real MotionValue, just un-driven by sticky since there is none
    // — it will read 0, which is fine for static fallbacks).
    return (
      <div ref={outerRef} className={className}>
        {typeof children === 'function' ? children(scrollYProgress) : children}
      </div>
    );
  }

  return (
    <div
      ref={outerRef}
      className={className}
      style={{ height: pinFor, position: 'relative' }}
    >
      <motion.div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {typeof children === 'function' ? children(scrollYProgress) : children}
      </motion.div>
    </div>
  );
}
