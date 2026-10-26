'use client';

import {
  useRef,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionStyle,
} from 'framer-motion';

export interface PerspectiveCardProps {
  /** Max tilt in degrees when cursor is at card edge. */
  maxTilt?: number;
  /** Hover scale factor. */
  scale?: number;
  /** Toggle cursor-following glow. */
  glow?: boolean;
  /** Glow color (hex). Defaults to UCSG cyan #39C5E8. */
  glowColor?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * useHasHover — subscribe to `(hover: hover) and (pointer: fine)` via
 * `useSyncExternalStore`. Returns false on SSR + first client render
 * (hydration-safe), then updates to the real value after mount.
 */
function subscribeHover(callback: () => void) {
  const mql = window.matchMedia('(hover: hover) and (pointer: fine)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}
function getHoverSnapshot() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}
function getHoverServerSnapshot() {
  return false;
}
function useHasHover() {
  return useSyncExternalStore(
    subscribeHover,
    getHoverSnapshot,
    getHoverServerSnapshot,
  );
}

/**
 * PerspectiveCard
 * ---------------
 * Wraps children in a 3D-perspective container that tilts toward the cursor
 * on mouse move, springs back to neutral on mouse leave.
 *
 *   rotateY = (cursorX / width  - 0.5) * maxTilt * 2
 *   rotateX = -(cursorY / height - 0.5) * maxTilt * 2
 *
 * Optional glow renders a radial-gradient overlay that tracks the cursor.
 *
 * Gating:
 *   - prefers-reduced-motion: plain <div>, no tilt, no glow.
 *   - touch / coarse pointer (no hover): plain <div>.
 *
 * All transforms applied via inline `style` so the global
 * `@media (scripting: none)` safety net can override them when JS is off.
 */
export default function PerspectiveCard({
  maxTilt = 8,
  scale = 1.02,
  glow = false,
  glowColor = '#39C5E8',
  className,
  style,
  children,
}: PerspectiveCardProps) {
  const reduce = useReducedMotion();
  const hasHover = useHasHover();
  const ref = useRef<HTMLDivElement>(null);

  // `enabled` is derived — no setState needed when `reduce` flips.
  // SSR + first client render: hasHover=false → enabled=false (matches
  // server-rendered HTML, no hydration mismatch).
  const enabled = hasHover && !reduce;

  // Raw cursor-derived target values (0 = neutral)
  const rotateYTarget = useMotionValue(0);
  const rotateXTarget = useMotionValue(0);
  const scaleTarget = useMotionValue(1);
  const glowXTarget = useMotionValue(0);
  const glowYTarget = useMotionValue(0);

  // Smoothed springs (so tilt returns to neutral smoothly on leave)
  const rotateY = useSpring(rotateYTarget, { stiffness: 200, damping: 25 });
  const rotateX = useSpring(rotateXTarget, { stiffness: 200, damping: 25 });
  const scaleVal = useSpring(scaleTarget, { stiffness: 200, damping: 25 });
  const glowX = useSpring(glowXTarget, { stiffness: 200, damping: 30 });
  const glowY = useSpring(glowYTarget, { stiffness: 200, damping: 30 });

  // Glow background derived from cursor position
  const glowBackground = useTransform(
    [glowX, glowY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx}px ${gy}px, ${glowColor}30, transparent 70%)`,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1
    rotateYTarget.set((x - 0.5) * maxTilt * 2);
    rotateXTarget.set(-(y - 0.5) * maxTilt * 2);
    scaleTarget.set(scale);
    glowXTarget.set(e.clientX - rect.left);
    glowYTarget.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    rotateYTarget.set(0);
    rotateXTarget.set(0);
    scaleTarget.set(1);
  };

  if (!enabled) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  const motionStyle: MotionStyle = {
    ...(style ?? {}),
    transformStyle: 'preserve-3d',
    perspective: 1000,
    rotateX,
    rotateY,
    scale: scaleVal,
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={motionStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {glow && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20"
          style={{ background: glowBackground }}
        />
      )}
      {children}
    </motion.div>
  );
}
