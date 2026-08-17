'use client';

import Image from 'next/image';

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export default function Logo({ variant = 'dark', size = 'md', showText = false }: LogoProps) {
  const sizes = {
    sm: { img: 36, text: 'text-sm' },
    md: { img: 44, text: 'text-base' },
    lg: { img: 56, text: 'text-lg' },
    xl: { img: 68, text: 'text-xl' },
  };

  const textColor = variant === 'light' ? 'text-white' : 'text-[#1E2D3B]';
  const subColor = variant === 'light' ? 'text-white/60' : 'text-[#6B7280]';

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'home' } }));
      }}
      className="flex items-center gap-2.5"
    >
      <Image
        src="/ucsg-logo.png"
        alt="UCSG Logo"
        width={sizes[size].img}
        height={sizes[size].img}
        className="shrink-0 object-contain"
        priority
      />
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-bold tracking-tight ${sizes[size].text} ${textColor}`}>
            UCSG
          </span>
          <span className={`text-[10px] font-medium tracking-wide ${subColor}`}>
            Universal Consulting Service Group
          </span>
        </div>
      )}
    </a>
  );
}
