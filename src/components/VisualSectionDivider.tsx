'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Props {
  variant?: 'dots' | 'wave-light' | 'gradient';
  color?: string;
}

export default function VisualSectionDivider({ variant = 'dots', color = '#006F8F' }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  if (variant === 'wave-light') {
    return (
      <div className="relative -mb-1">
        <svg viewBox="0 0 1440 60" fill="none" className="block w-full" preserveAspectRatio="none">
          <motion.path
            d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z"
            fill="white"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div ref={ref} className="relative h-px w-full bg-gray-100">
        <motion.div
          className="absolute left-1/2 top-1/2 h-px -translate-x-1/2 -translate-y-1/2"
          style={{ width: '60%', backgroundColor: color, opacity: 0.3 }}
          initial={{ width: '0%', opacity: 0 }}
          animate={isInView ? { width: '60%', opacity: 0.3 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 15 }}
        />
      </div>
    );
  }

  // Dots variant (default)
  return (
    <div ref={ref} className="flex items-center justify-center gap-1.5 py-6">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: color, opacity: 0.2 + i * 0.15 }}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 15 }}
        />
      ))}
    </div>
  );
}
