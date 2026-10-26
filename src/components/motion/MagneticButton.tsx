'use client';

import {
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';

export interface MagneticButtonProps {
  /** Magnetic field radius (px) around button center. */
  radius?: number;
  /** 0..1 — how far toward cursor the button pulls. */
  strength?: number;
  /** Disable the magnet (plain render). */
  disabled?: boolean;
  /** Render as a real <a href> for SEO + crawlability (recommended for CTAs). */
  href?: string;
  /** External link? auto-detected from href protocol if undefined. */
  external?: boolean;
  /** Click handler (use with a button OR anchor). */
  onClick?: () => void;
  /** ARIA label override. */
  ariaLabel?: string;
  className?: string;
  /**
   * Visual style variant. Mirrors the VeteranEducationSection CtaButton so
   * this drop-in preserves the existing UCSG look (gold primary / cyan
   * secondary / gold border outline).
   *
   * Use `custom` to opt out of variant styles entirely — the `className` prop
   * then fully controls the appearance (useful for the HeroSection's blue
   * shadcn Button patterns that don't fit the gold/cyan brand variants).
   */
  variant?: 'primary' | 'secondary' | 'gold' | 'navy' | 'ghost' | 'custom';
  children: ReactNode;
}

/**
 * MagneticButton
 * --------------
 * Wraps a real <a href> or <button> in a motion.div parent that translates
 * the child toward the cursor when within `radius`. Smoothed by useSpring so
 * the return to neutral is buttery.
 *
 * Auto-disable rules (the magnet turns off — element renders plain):
 *   - prefers-reduced-motion
 *   - touch / coarse pointer (no hover)
 *   - child is focused (keyboard users must not fight the magnet)
 *
 * Variant styles mirror the existing CtaButton pattern from
 * VeteranEducationSection.tsx so drop-in replacement preserves the brand.
 *
 * Renders a real <a href> when `href` is provided (crawlable for SEO).
 *
 * All transform applied via inline style — `@media (scripting: none)` safety
 * net overrides it when JS is off.
 */
export default function MagneticButton({
  radius = 120,
  strength = 0.3,
  disabled = false,
  href,
  external,
  onClick,
  ariaLabel,
  className,
  variant = 'primary',
  children,
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // useSyncExternalStore for `(hover: hover) and (pointer: fine)` — SSR returns
  // false (matches server HTML, no hydration mismatch). Updates to real value
  // after mount. No setState-in-effect → no lint rule violation.
  const hasHover = useSyncExternalStore(
    (cb: () => void) => {
      const mql = window.matchMedia('(hover: hover) and (pointer: fine)');
      mql.addEventListener('change', cb);
      return () => mql.removeEventListener('change', cb);
    },
    () => window.matchMedia('(hover: hover) and (pointer: fine)').matches,
    () => false,
  );

  // `enabled` is derived — no setState needed when `reduce` or `disabled` flips.
  const enabled = hasHover && !reduce && !disabled;

  const xTarget = useMotionValue(0);
  const yTarget = useMotionValue(0);
  const x = useSpring(xTarget, { stiffness: 200, damping: 15 });
  const y = useSpring(yTarget, { stiffness: 200, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || isFocused) return;
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > radius) {
      xTarget.set(0);
      yTarget.set(0);
      return;
    }
    xTarget.set(dx * strength);
    yTarget.set(dy * strength);
  };

  const handleMouseLeave = () => {
    xTarget.set(0);
    yTarget.set(0);
  };

  // Compute classes (mirror VeteranEducationSection CtaButton)
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.12em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 min-h-[44px]';
  const variantStyles: Record<NonNullable<MagneticButtonProps['variant']>, string> = {
    primary:
      'bg-[#D6A84B] text-[#071B35] hover:brightness-110 hover:shadow-lg hover:shadow-[#D6A84B]/25 focus-visible:ring-[#D6A84B]',
    secondary:
      'border border-[#39C5E8]/60 bg-transparent text-[#39C5E8] hover:border-[#39C5E8] hover:bg-[#39C5E8]/10 focus-visible:ring-[#39C5E8]',
    gold: 'border border-[#D6A84B] bg-transparent text-[#D6A84B] hover:bg-[#D6A84B]/10 focus-visible:ring-[#D6A84B]',
    navy: 'bg-[#071B35] text-white hover:bg-[#0B2545] focus-visible:ring-[#071B35]',
    ghost:
      'border border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white/60 focus-visible:ring-white/40',
    custom: '',
  };
  const classes = `${base} ${variantStyles[variant]} ${className ?? ''}`;

  const isExternalLink =
    external ??
    (!!href && (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')));

  // Plain render (reduced motion / touch / disabled / focused — render
  // the real element with no magnet wrapper).
  if (!enabled) {
    if (href) {
      return (
        <a
          href={href}
          aria-label={ariaLabel}
          onClick={onClick}
          {...(isExternalLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={onClick}
        className={classes}
      >
        {children}
      </button>
    );
  }

  // Magnetic wrapper render
  const inner = href ? (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      onClick={onClick}
      {...(isExternalLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={classes}
      onFocus={() => {
        setIsFocused(true);
        xTarget.set(0);
        yTarget.set(0);
      }}
      onBlur={() => setIsFocused(false)}
      style={{ x, y }}
    >
      {children}
    </motion.a>
  ) : (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={classes}
      onFocus={() => {
        setIsFocused(true);
        xTarget.set(0);
        yTarget.set(0);
      }}
      onBlur={() => setIsFocused(false)}
      style={{ x, y }}
    >
      {children}
    </motion.button>
  );

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
      style={{ perspective: 600 }}
    >
      {inner}
    </div>
  );
}
