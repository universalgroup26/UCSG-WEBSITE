'use client';

import { MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#006F8F] to-[#005A73]">
      {/* Subtle dot pattern overlay for visual depth */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Diagonal accent shimmer */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-1/2 -right-1/4 h-[120%] w-[70%] rotate-[35deg] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-28 pt-20 sm:px-6 sm:pb-36 sm:pt-28 lg:px-8 lg:pb-40 lg:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          {/* Availability Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-400" />
            Available 24/7 · Jackson Heights, NY
          </div>

          {/* Trust element */}
          <p className="mb-3 text-sm font-medium tracking-wide text-teal-100/80">
            Proudly serving students from Queens &amp; Jackson Heights
          </p>

          {/* Main Heading */}
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Your Future in the USA Starts with the
            <span className="block mt-1 bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent">
              Right University &amp; Guidance
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base leading-relaxed text-teal-100 sm:text-lg">
            UCSG — Universal Consulting Service Group connects international
            students to{' '}
            <strong className="font-semibold text-white">
              affordable, accredited universities
            </strong>{' '}
            offering hybrid programs,{' '}
            <strong className="font-semibold text-white">Day 1 CPT/OPT</strong>,
            and real-world experience. Your success is our mission.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              className="h-12 rounded-full bg-white px-8 text-base font-semibold text-[#006F8F] shadow-lg shadow-black/10 hover:bg-[#E0F4F8] hover:shadow-xl"
              size="lg"
              asChild
            >
              <a href="tel:+13028935594">
                <Phone className="mr-1.5 h-4 w-4" />
                Call +1 (302) 893-5594
              </a>
            </Button>
            <Button
              className="h-12 rounded-full border-2 border-white bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10"
              size="lg"
              variant="outline"
            >
              <MessageCircle className="mr-1.5 h-4 w-4" />
              WhatsApp 24/7
            </Button>
          </div>

          {/* Services List */}
          <p className="mt-5 text-sm text-teal-200/70">
            College Admission Assistance · University Transfer · CPT/OPT ·
            Change of Status · SEVIS Reinstatement
          </p>
        </div>
      </div>

      {/* Wave SVG matching teal gradient */}
      <div className="relative -mb-1">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full"
          preserveAspectRatio="none"
        >
          {/* Back wave — lighter teal */}
          <path
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
            fill="white"
          />
          {/* Front wave — darker teal, layered for depth */}
          <path
            d="M0,80 C360,20 720,110 1080,50 C1260,20 1380,70 1440,80 L1440,120 L0,120 Z"
            fill="white"
            opacity="0.5"
          />
          {/* Thin accent line along the top edge */}
          <path
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60"
            fill="none"
            stroke="url(#tealFade)"
            strokeWidth="1.5"
            opacity="0.4"
          />
          <defs>
            <linearGradient id="tealFade" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="#006F8F" stopOpacity="0" />
              <stop offset="50%" stopColor="#006F8F" stopOpacity="1" />
              <stop offset="100%" stopColor="#006F8F" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
