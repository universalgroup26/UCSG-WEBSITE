'use client';

import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0070F3] to-[#0050C8]">
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-28 pt-20 sm:px-6 sm:pb-36 sm:pt-28 lg:px-8 lg:pb-40 lg:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Enroll in an Accredited Graduate Program with Integral CPT
          </h1>
          <p className="mt-6 text-base leading-relaxed text-blue-100 sm:text-lg">
            Expert support for international students navigating SEVIS
            termination, university transfers, and visa status challenges. Get
            24/7 assistance to secure your academic journey in the United States.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              className="h-12 rounded-full bg-white px-8 text-base font-semibold text-[#0070F3] shadow-lg hover:bg-blue-50"
              size="lg"
            >
              Apply Now
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
        </div>
      </div>

      {/* Decorative Wave SVG */}
      <div className="relative -mb-1">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
            fill="white"
          />
          <path
            d="M0,80 C360,20 720,110 1080,50 C1260,20 1380,70 1440,80 L1440,120 L0,120 Z"
            fill="white"
            opacity="0.5"
          />
        </svg>
      </div>
    </section>
  );
}
