'use client';

import { MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0070F3] to-[#0050C8]">
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-28 pt-20 sm:px-6 sm:pb-36 sm:pt-28 lg:px-8 lg:pb-40 lg:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
            Available 24/7 · Jackson Heights, NY
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Your Future in the USA Starts with the Right Guidance
          </h1>
          <p className="mt-6 text-base leading-relaxed text-blue-100 sm:text-lg">
            UCSG — Universal Consulting Service Group connects international students
            to affordable, accredited universities offering hybrid programs, Day 1 CPT,
            and real-world experience. Driven by students&apos; happiness.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              className="h-12 rounded-full bg-white px-8 text-base font-semibold text-[#0070F3] shadow-lg hover:bg-blue-50"
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
          <p className="mt-5 text-sm text-blue-200/70">
            College Admission · University Transfer · CPT/OPT · Change of Status · SEVIS Reinstatement
          </p>
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