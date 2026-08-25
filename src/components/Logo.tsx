'use client';

import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showBadge?: boolean;
  /** Header-only mode: shows just UCSG with gradient, no subtitle */
  compact?: boolean;
}

export default function Logo({ variant = 'dark', size = 'md', showText = false, showBadge = true, compact = false }: LogoProps) {
  const sizes = {
    sm: { img: 36, title: 'text-base', sub: 'text-[9px]', badge: 'text-[8px]' },
    md: { img: 44, title: 'text-xl', sub: 'text-[10px]', badge: 'text-[9px]' },
    lg: { img: 52, title: 'text-lg', sub: 'text-[11px]', badge: 'text-[10px]' },
    xl: { img: 68, title: 'text-3xl', sub: 'text-sm', badge: 'text-xs' },
  };

  const textColor = variant === 'light' ? 'text-white' : 'text-[#0F172A]';
  const subColor = variant === 'light' ? 'text-white/70' : 'text-[#475569]';

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'home' } }));
      }}
      className="group flex items-center gap-2.5"
    >
      <div className="relative shrink-0">
        <Image
          src="/ucsg-logo.png"
          alt="UCSG Logo"
          width={sizes[size].img}
          height={sizes[size].img}
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>
      {compact ? (
        <motion.span
          className={`text-2xl font-black tracking-tight sm:text-3xl ${
            variant === 'light'
              ? 'bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-[#061846] via-[#0874F9] to-[#D6A84B] bg-clip-text text-transparent'
          }`}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02 }}
        >
          UCSG
        </motion.span>
      ) : showText ? (
        <div className="flex flex-col leading-none">
          <span className={`font-extrabold tracking-tight ${sizes[size].title} ${textColor}`}>
            UCSG
          </span>
          <span className={`mt-0.5 font-medium tracking-wide ${subColor}`}>
            Universal Consulting Service Group
          </span>
          {showBadge && (
            <span
              className={`mt-1 inline-flex w-fit items-center gap-1 rounded-full border border-[#D6A84B]/25 bg-[#D6A84B]/[0.06] px-1.5 py-px font-bold tracking-wide text-[#D6A84B] ${sizes[size].badge}`}
            >
              <ShieldCheck className="h-2.5 w-2.5" />
              U.S. Army Veteran-owned
            </span>
          )}
        </div>
      ) : null}
    </a>
  );
}
