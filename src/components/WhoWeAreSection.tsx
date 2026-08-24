'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { GraduationCap, Star, Globe, ShieldCheck, Shield, Check } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { track } from '@/lib/analytics';

/* ─── brand colors ─── */
const NAVY = '#002868';
const RED = '#B31942';

/* ─── counter hook ─── */
function useCounter(target: number, suffix = '', inView: boolean, duration = 1600) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let prev = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      if (current !== prev) {
        prev = current;
        setCount(current);
      }
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return `${count.toLocaleString()}${suffix}`;
}

/* ─── stat card (extracted to avoid re-mounting on parent render) ─── */
function StatCard({
  value,
  suffix,
  label,
  Icon,
  inView,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  inView: boolean;
  delay: number;
}) {
  const display = useCounter(value, suffix, inView);
  return (
    <ScrollReveal delay={delay}>
      <div className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-md md:p-6">
        <span
          className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ backgroundColor: NAVY }}
        >
          <Icon className="h-6 w-6 text-white" />
        </span>
        <span className="block text-3xl font-extrabold md:text-4xl" style={{ color: NAVY }}>
          {display}
        </span>
        <span className="mt-1 text-sm font-medium text-gray-500">{label}</span>
      </div>
    </ScrollReveal>
  );
}

/* ─── stats data ─── */
const stats = [
  { value: 5000, suffix: '+', label: 'Students Placed', Icon: GraduationCap },
  { value: 99, suffix: '%', label: 'Success Rate', Icon: Star },
  { value: 20, suffix: '+', label: 'Countries Served', Icon: Globe },
  { value: 11, suffix: '+', label: 'Partner Universities', Icon: ShieldCheck },
];

/* ─── main section ─── */
export default function WhoWeAreSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  useEffect(() => {
    if (isInView) track.sectionView('who_we_are');
  }, [isInView]);

  return (
    <section id="who-we-are" ref={sectionRef} className="relative bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ── Eyebrow ── */}
        <ScrollReveal className="flex items-center justify-center gap-3">
          <span className="h-px w-8 md:w-12" style={{ backgroundColor: NAVY }} />
          <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: NAVY }}>
            WHO WE ARE
          </span>
          <span className="h-px w-8 md:w-12" style={{ backgroundColor: NAVY }} />
        </ScrollReveal>

        {/* ── Headline ── */}
        <ScrollReveal delay={0.1} className="mx-auto mt-6 max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight md:text-4xl lg:text-5xl" style={{ color: NAVY }}>
            Universal Consulting Service Group
          </h2>
        </ScrollReveal>

        {/* ── Sub-headline ── */}
        <ScrollReveal delay={0.2} className="mx-auto mt-5 max-w-2xl text-center">
          <p className="text-base leading-relaxed text-gray-600 md:text-lg">
            Empowering international students with trusted guidance for U.S. university admissions,{' '}
            <strong className="font-bold" style={{ color: NAVY }}>
              Day 1 CPT programs
            </strong>
            , and visa success.
          </p>
        </ScrollReveal>

        {/* ── Trust &amp; Bio Card ── */}
        <ScrollReveal delay={0.3} className="mt-12">
          <div className="mx-auto max-w-4xl rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
              {/* Left: Trust Badges */}
              <div className="flex flex-row gap-4 md:w-1/3 md:flex-col md:gap-5">
                {/* Badge 1 — U.S. Army Veteran */}
                <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2.5 shadow-sm">
                  <span
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: NAVY }}
                  >
                    <Shield className="h-5 w-5 text-white" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: RED }}>
                      Veteran-owned
                    </span>
                    <span className="text-sm font-bold" style={{ color: NAVY }}>
                      U.S. Army Veteran
                    </span>
                  </div>
                </div>

                {/* Badge 2 — Certified & Verified */}
                <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2.5 shadow-sm">
                  <span
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: NAVY }}
                  >
                    <Check className="h-5 w-5 text-white" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: RED }}>
                      Trusted
                    </span>
                    <span className="text-sm font-bold" style={{ color: NAVY }}>
                      Certified &amp; Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Vertical divider (desktop) */}
              <div className="hidden w-px self-stretch bg-gray-200 md:block" />

              {/* Right: Founder Bio */}
              <div className="flex-1">
                <span
                  className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                  style={{ backgroundColor: RED, color: 'white' }}
                >
                  Our Founder
                </span>
                <p className="mt-4 text-base leading-relaxed text-gray-700">
                  Founded and led by{' '}
                  <strong className="font-bold" style={{ color: NAVY }}>
                    Joy Chowdhury
                  </strong>
                  , a U.S. Army veteran committed to serving international students with{' '}
                  <strong className="font-bold" style={{ color: NAVY }}>
                    integrity, honor, and dedication
                  </strong>
                  .
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Stats Grid ── */}
        <div className="mt-16 grid grid-cols-2 gap-4 md:mt-20 md:grid-cols-4 md:gap-6">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              Icon={stat.Icon}
              inView={isInView}
              delay={0.4 + i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
