'use client';

import Image from 'next/image';

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'dark', size = 'md' }: LogoProps) {
  const sizes = {
    sm: { width: 36, height: 36 },
    md: { width: 44, height: 44 },
    lg: { width: 56, height: 56 },
  };

  return (
    <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'home' } })); }}
      className="flex items-center gap-2">
      <Image
        src="/ucsg-logo.png"
        alt="UCSG Logo"
        width={sizes[size].width}
        height={sizes[size].height}
        className="object-contain"
        priority
      />
    </a>
  );
}
