'use client';

import { useRef, type CSSProperties } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { EASE } from './MotionProvider';

export interface ImageDepthRevealProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  /** Initial scale (e.g. 1.1 = zoomed in slightly). */
  startScale?: number;
  /** Initial translateZ (px) — gives the image depth on reveal. */
  startZ?: number;
  /** Initial rotateX (deg). */
  rotateX?: number;
  /** Explicit width (px) — leave undefined for fill layout. */
  width?: number;
  /** Explicit height (px) — leave undefined for fill layout. */
  height?: number;
  /** Responsive sizes attr for next/image (used with fill layout). */
  sizes?: string;
}

/**
 * ImageDepthReveal
 * ----------------
 * Wraps next/image in a 3D-perspective container that reveals the image
 * with scale + translateZ + rotateX when it scrolls into view.
 *
 * Initial: opacity 0, scale startScale, z startZ, rotateX (3D depth)
 * Visible: opacity 1, scale 1, z 0, rotateX 0
 *
 * Uses `next/image` with `fill` + `sizes` + `object-cover` for responsive
 * WebP/AVIF. Don't use raw <img>.
 *
 * Reduced motion: plain <Image> with no motion wrapper.
 *
 * All transforms applied via inline style — global `@media (scripting: none)`
 * safety net overrides them when JS is off.
 */
export default function ImageDepthReveal({
  src,
  alt,
  className,
  priority = false,
  startScale = 1.1,
  startZ = 80,
  rotateX = 0,
  width,
  height,
  sizes = '100vw',
}: ImageDepthRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();

  if (reduce) {
    // Plain Image with fill
    return (
      <div ref={ref} className={className}>
        <Image
          src={src}
          alt={alt}
          fill={width == null}
          width={width}
          height={height}
          sizes={sizes}
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }

  const wrapperStyle: CSSProperties = {
    transformStyle: 'preserve-3d',
    perspective: 1000,
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={wrapperStyle}
      initial={{ opacity: 0, scale: startScale, z: startZ, rotateX }}
      animate={
        inView
          ? { opacity: 1, scale: 1, z: 0, rotateX: 0 }
          : { opacity: 0, scale: startScale, z: startZ, rotateX }
      }
      transition={{ duration: 0.6, ease: EASE }}
    >
      <Image
        src={src}
        alt={alt}
        fill={width == null}
        width={width}
        height={height}
        sizes={sizes}
        className="object-cover"
        priority={priority}
      />
    </motion.div>
  );
}
