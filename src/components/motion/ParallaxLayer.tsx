'use client';

import {
  useRef,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
  type MotionStyle,
} from 'framer-motion';

export interface ParallaxLayerProps {
  /**
   * Parallax speed.
   * - 0    = static (no offset)
   * - 0.3  = gentle parallax (recommended max)
   * - 1    = scroll-locked (appears pinned within layer)
   * - negative = moves opposite to scroll
   * Clamped to [-1, 1].
   */
  speed?: number;
  /** Axis of motion. y = vertical scroll-driven translation, x = horizontal. */
  axis?: 'y' | 'x';
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * useDesktopMatchMedia — subscribe to `(min-width: 1024px)` via
 * `useSyncExternalStore`. Returns false on SSR + first client render
 * (hydration-safe), then updates to the actual matchMedia value after
 * mount — no setState-in-effect, no hydration mismatch.
 */
function subscribe(callback: () => void) {
  const mql = window.matchMedia('(min-width: 1024px)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getSnapshot() {
  return window.matchMedia('(min-width: 1024px)').matches;
}

function getServerSnapshot() {
  return false; // SSR + first client render: disabled (no parallax on mobile
  // or SSR). Real value is read after mount via useSyncExternalStore.
}

function useIsDesktop() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * ParallaxLayer
 * -------------
 * Wraps children in a motion.div whose translation is driven by the element's
 * scroll progress through the viewport. Translation is spring-smoothed to
 * avoid jitter on fast scroll.
 *
 * Behavior:
 *   useScroll({ target: ref, offset: ['start end', 'end start'] })
 *     → s ∈ [0,1] as the element scrolls from below the viewport to above it.
 *   useTransform(s, [0, 1], [`${-speed*100}px`, `${speed*100}px`])
 *   useSpring(translation, { stiffness: 200, damping: 40 })
 *
 * Gating:
 *   - prefers-reduced-motion: plain <div>, no parallax.
 *   - mobile (< 1024px): plain <div>, no parallax (avoid jank).
 *
 * All motion is applied via inline `style` so the existing
 * `@media (scripting: none)` CSS safety net in globals.css overrides it
 * when JS is off.
 */
export default function ParallaxLayer({
  speed = 0.3,
  axis = 'y',
  className,
  style,
  children,
}: ParallaxLayerProps) {
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLDivElement>(null);

  // `enabled` is derived — no setState needed when `reduce` flips.
  // SSR + first client render: isDesktop=false → enabled=false (matches
  // server-rendered HTML, no hydration mismatch). After mount, isDesktop
  // updates to the real matchMedia value.
  const enabled = isDesktop && !reduce;

  // Clamp speed to [-1, 1] (per spec cap of 0.3 is enforced at call sites,
  // but we hard-clamp here as a safety net).
  const clampedSpeed = Math.max(-1, Math.min(1, speed));

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const px = clampedSpeed * 100;
  const raw: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 1],
    [-px, px],
  );
  const smoothed = useSpring(raw, { stiffness: 200, damping: 40 });

  // When disabled (mobile or reduced motion), render a plain div so the
  // underlying content stacks normally.
  if (!enabled) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  const motionStyle: MotionStyle = {
    ...(style ?? {}),
    ...(axis === 'y' ? { y: smoothed } : { x: smoothed }),
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={motionStyle}
    >
      {children}
    </motion.div>
  );
}
