'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useInView, motion } from 'framer-motion';
import { GraduationCap, Star, Globe, ShieldCheck, Shield, Check, Quote, Award } from 'lucide-react';
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
      <div className="group relative flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 md:p-6">
        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-[#002868] to-[#B31942] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span
          className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
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
    <section id="who-we-are" ref={sectionRef} className="relative overflow-hidden bg-white py-16 md:py-24">
      {/* Subtle background accents */}
      <div
        className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full opacity-[0.03]"
        style={{ background: `radial-gradient(circle, ${NAVY}, transparent 70%)` }}
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full opacity-[0.03]"
        style={{ background: `radial-gradient(circle, ${RED}, transparent 70%)` }}
      />

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
        <ScrollReveal delay={0.2} className="mx-auto mt-4 max-w-2xl text-center">
          <p className="text-base leading-relaxed text-gray-600 md:text-lg">
            Empowering international students with trusted guidance for U.S. university admissions,{' '}
            <strong className="font-bold" style={{ color: NAVY }}>
              Day 1 CPT programs
            </strong>
            , and visa success.
          </p>
        </ScrollReveal>

        {/* ── Founder Card with Image & Message ── */}
        <ScrollReveal delay={0.25} className="mt-14">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white shadow-[0_4px_40px_-8px_rgba(0,40,104,0.1)]">
            {/* Animated shimmer overlay */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)',
              }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut' }}
            />

            <div className="relative z-0 flex flex-col gap-8 p-6 md:flex-row md:items-center md:gap-10 md:p-10">
              {/* Left — Founder Image */}
              <div className="relative mx-auto w-full max-w-[240px] shrink-0 md:mx-0 md:max-w-[260px]">
                {/* Rotating border ring */}
                <motion.div
                  className="absolute -inset-[3px] rounded-2xl"
                  style={{
                    background: `conic-gradient(from 0deg, ${NAVY}, ${RED}, ${NAVY}, ${RED}, ${NAVY})`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                />
                <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-gray-200 md:h-72">
                  <Image
                    src="/images/founder.jpg"
                    alt="Joy Chowdhury — Founder & CEO, Universal Consulting Service Group"
                    fill
                    className="object-cover object-top"
                    sizes="260px"
                    priority
                  />
                </div>
                {/* Name badge below image */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-5 py-1.5 shadow-lg ring-1 ring-gray-100">
                  <span className="text-sm font-extrabold" style={{ color: NAVY }}>
                    Joy Chowdhury
                  </span>
                </div>
              </div>

              {/* Right — Founder Message */}
              <div className="flex-1 pt-4 md:pt-0">
                {/* Quote icon + Founder tag */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${NAVY}12` }}>
                    <Quote className="h-5 w-5" style={{ color: NAVY }} />
                  </div>
                  <div>
                    <span
                      className="inline-block rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-widest"
                      style={{ backgroundColor: RED, color: 'white' }}
                    >
                      Message from Our Founder
                    </span>
                  </div>
                </div>

                {/* The Message */}
                <div className="relative">
                  <span className="absolute -left-2 -top-3 text-6xl leading-none font-serif" style={{ color: `${NAVY}15` }}>
                    &ldquo;
                  </span>
                  <p className="relative pl-6 text-base leading-[1.85] text-gray-700 md:text-[17px]">
                    <strong className="font-bold" style={{ color: NAVY }}>
                      When I served in the United States Army, I learned that true leadership means
                      standing beside those you lead — not above them.
                    </strong>{' '}
                    That lesson became the foundation of UCSG. Every student who walks through our
                    doors carries a dream — and I take that dream as seriously as I took my oath of
                    service.
                  </p>
                </div>

                <div className="relative mt-5 pl-6">
                  <p className="text-base leading-[1.85] text-gray-700 md:text-[17px]">
                    We are not just consultants. We are your advocates, your strategists, and your
                    partners in building a future in the United States. From your very first Day 1 CPT
                    opportunity to the moment you land your dream career —{' '}
                    <strong className="font-bold" style={{ color: NAVY }}>
                      we will be there, every single step of the way.
                    </strong>
                  </p>
                </div>

                <div className="relative mt-5 pl-6">
                  <p className="text-base leading-[1.85] text-gray-700 md:text-[17px]">
                    With integrity as our compass and your success as our mission,{' '}
                    <strong className="font-bold" style={{ color: NAVY }}>
                      I personally promise you this: at UCSG, your American dream is in the safest
                      hands possible.
                    </strong>
                  </p>
                </div>

                {/* Closing quotation + signature */}
                <div className="mt-6 flex items-end justify-between gap-4 pl-6">
                  <span className="text-5xl leading-none font-serif" style={{ color: `${NAVY}15` }}>
                    &rdquo;
                  </span>
                  <div className="text-right">
                    <p className="text-sm font-semibold" style={{ color: NAVY }}>
                      Joy Chowdhury
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      Founder & CEO, UCSG
                    </p>
                    <p className="mt-0.5 text-xs font-medium" style={{ color: RED }}>
                      U.S. Army Veteran
                    </p>
                  </div>
                </div>

                {/* Trust Badges Row */}
                <div className="mt-6 flex flex-wrap gap-3 pl-6">
                  <div className="flex items-center gap-2 rounded-full border border-gray-100 bg-white px-3.5 py-2 shadow-sm transition-shadow hover:shadow-md">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg" style={{ backgroundColor: NAVY }}>
                      <Shield className="h-4 w-4 text-white" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: RED }}>
                        Veteran-owned
                      </span>
                      <span className="text-xs font-bold" style={{ color: NAVY }}>
                        U.S. Army Veteran
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-gray-100 bg-white px-3.5 py-2 shadow-sm transition-shadow hover:shadow-md">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg" style={{ backgroundColor: NAVY }}>
                      <Check className="h-4 w-4 text-white" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: RED }}>
                        Trusted
                      </span>
                      <span className="text-xs font-bold" style={{ color: NAVY }}>
                        Certified & Verified
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-gray-100 bg-white px-3.5 py-2 shadow-sm transition-shadow hover:shadow-md">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg" style={{ backgroundColor: NAVY }}>
                      <Award className="h-4 w-4 text-white" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: RED }}>
                        Excellence
                      </span>
                      <span className="text-xs font-bold" style={{ color: NAVY }}>
                        SEVP Certified
                      </span>
                    </div>
                  </div>
                </div>
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
