'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useInView, motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, Star, Globe, ShieldCheck, Shield, Quote,
  Phone, MessageCircle, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/ScrollReveal';
import { track } from '@/lib/analytics';

const NAVY = '#002868';
const RED = '#B31942';

const BG_IMAGES = [
  '/images/whoware-bg-1.png',
  '/images/whoware-bg-2.png',
];
const SLIDE_INTERVAL = 6000;

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
      if (current !== prev) { prev = current; setCount(current); }
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return `${count.toLocaleString()}${suffix}`;
}

function BackgroundSlideshow({ current }: { current: number }) {
  return (
    <div className="absolute inset-0 z-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <Image
            src={BG_IMAGES[current]}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority={current === 0}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}

function StatCard({ value, suffix, label, Icon, inView, delay }: {
  value: number; suffix: string; label: string;
  Icon: React.ComponentType<{ className?: string }>; inView: boolean; delay: number;
}) {
  const display = useCounter(value, suffix, inView);
  return (
    <ScrollReveal delay={delay}>
      <div className="group relative flex flex-col items-center rounded-2xl border border-white/20 bg-white/10 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 md:p-6">
        <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-6 w-6 text-white" />
        </span>
        <span className="block text-3xl font-extrabold text-white md:text-4xl">{display}</span>
        <span className="mt-1 text-sm font-medium text-white/80">{label}</span>
      </div>
    </ScrollReveal>
  );
}

const stats = [
  { value: 5000, suffix: '+', label: 'Students Placed', Icon: GraduationCap },
  { value: 99, suffix: '%', label: 'Success Rate', Icon: Star },
  { value: 20, suffix: '+', label: 'Countries Served', Icon: Globe },
  { value: 11, suffix: '+', label: 'Partner Universities', Icon: ShieldCheck },
];

function SlideIndicators({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`block h-1.5 rounded-full transition-all duration-500 ${
            i === current ? 'w-8 bg-white' : 'w-1.5 bg-white/40'
          }`}
        />
      ))}
    </div>
  );
}

export default function WhoWeAreSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => { if (isInView) track.sectionView('who_we_are'); }, [isInView]);

  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((p) => (p + 1) % BG_IMAGES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  const handleContact = () => {
    track.ctaClick({ cta_type: 'consultation', cta_source: 'who_we_are', cta_text: 'Get Free Consultation' });
    window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'contact' } }));
  };

  return (
    <section
      id="who-we-are"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden py-16 md:py-24"
    >
      <BackgroundSlideshow current={slideIndex} />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <ScrollReveal className="flex items-center justify-center gap-3">
          <span className="h-px w-8 md:w-12 bg-white/60" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/90">
            WHO WE ARE
          </span>
          <span className="h-px w-8 md:w-12 bg-white/60" />
        </ScrollReveal>

        {/* Main Heading */}
        <ScrollReveal delay={0.1} className="mx-auto mt-6 max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
            Your Trusted Partner for{' '}
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              U.S. Education and Day 1 CPT
            </span>
          </h2>
        </ScrollReveal>

        {/* Sub-heading */}
        <ScrollReveal delay={0.15} className="mx-auto mt-4 max-w-2xl text-center">
          <p className="text-base leading-relaxed text-white/75 md:text-lg">
            Universal Consulting Service Group connects international students to
            affordable, accredited universities with hybrid programs,{' '}
            <strong className="font-bold text-white">real-world CPT/OPT experience</strong>,
            and a clear path to career success in America.
          </p>
        </ScrollReveal>

        {/* Founder Card */}
        <ScrollReveal delay={0.2} className="mt-12">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-white/[0.08] p-6 shadow-2xl backdrop-blur-md md:p-10">
            {/* Shimmer */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-10"
              style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut' }}
            />

            <div className="relative z-0 flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
              {/* Founder Image */}
              <div className="relative mx-auto w-full max-w-[200px] shrink-0 md:mx-0 md:max-w-[220px]">
                <motion.div
                  className="absolute -inset-[3px] rounded-2xl"
                  style={{ background: `conic-gradient(from 0deg, ${NAVY}, ${RED}, ${NAVY}, ${RED}, ${NAVY})` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                />
                <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-gray-800 md:h-64">
                  <Image
                    src="/images/founder.jpg"
                    alt="Joy Chowdhury - Founder and CEO, UCSG"
                    fill
                    className="object-cover object-top"
                    sizes="220px"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-5 py-1.5 shadow-lg ring-1 ring-white/20">
                  <span className="text-sm font-extrabold" style={{ color: NAVY }}>Joy Chowdhury</span>
                </div>
              </div>

              {/* Founder Message */}
              <div className="flex-1 pt-4 md:pt-0">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                    <Quote className="h-5 w-5 text-white" />
                  </div>
                  <span className="inline-block rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-widest" style={{ backgroundColor: RED, color: 'white' }}>
                    Message from Our Founder
                  </span>
                </div>

                <div className="relative">
                  <span className="absolute -left-2 -top-3 text-6xl leading-none font-serif text-white/20">&ldquo;</span>
                  <p className="relative pl-6 text-base leading-[1.85] text-white/90 md:text-[17px]">
                    <strong className="font-bold text-white">
                      When I served in the United States Army, I learned that true leadership means
                      standing beside those you lead - not above them.
                    </strong>{' '}
                    That lesson became the foundation of UCSG. Every student who walks through our
                    doors carries a dream - and I take that dream as seriously as I took my oath of service.
                  </p>
                </div>

                <div className="relative mt-5 pl-6">
                  <p className="text-base leading-[1.85] text-white/85 md:text-[17px]">
                    We are not just consultants. We are your advocates, your strategists, and your
                    partners in building a future in the United States. From your very first Day 1 CPT
                    opportunity to the moment you land your dream career -{' '}
                    <strong className="font-bold text-white">
                      we will be there, every single step of the way.
                    </strong>
                  </p>
                </div>

                <div className="relative mt-5 pl-6">
                  <p className="text-base leading-[1.85] text-white/85 md:text-[17px]">
                    With integrity as our compass and your success as our mission,{' '}
                    <strong className="font-bold text-white">
                      I personally promise you this: at UCSG, your American dream is in the safest
                      hands possible.
                    </strong>
                  </p>
                </div>

                {/* Signature and Veteran Badge */}
                <div className="mt-6 flex flex-col gap-4 pl-6 sm:flex-row sm:items-end sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-5xl leading-none font-serif text-white/20">&rdquo;</span>
                    <div>
                      <p className="text-sm font-semibold text-white">Joy Chowdhury</p>
                      <p className="mt-0.5 text-xs text-white/70">Founder and CEO, UCSG</p>
                      <p className="mt-0.5 text-xs font-medium" style={{ color: RED }}>U.S. Army Veteran</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg" style={{ backgroundColor: NAVY }}>
                      <Shield className="h-4 w-4 text-white" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: RED }}>Veteran-owned</span>
                      <span className="text-xs font-bold text-white">U.S. Army Veteran</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* CTA Buttons */}
        <ScrollReveal delay={0.3} className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            onClick={handleContact}
            className="h-13 w-full rounded-full border-2 border-[#B31942] bg-[#B31942] px-8 text-base font-semibold text-white shadow-[0_0_20px_rgba(179,25,66,0.3)] hover:bg-[#8B122F] hover:shadow-[0_0_30px_rgba(179,25,66,0.5)] sm:w-auto"
          >
            Get Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="h-13 w-full rounded-full border-2 border-white bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 sm:w-auto"
          >
            <a href="https://wa.me/13028935594" target="_blank" rel="noopener noreferrer" onClick={() => track.ctaClick({ cta_type: 'whatsapp', cta_source: 'who_we_are', cta_text: 'WhatsApp 24/7' })}>
              <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp 24/7
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="h-13 w-full rounded-full border-2 border-white bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 sm:w-auto"
          >
            <a href="tel:+13028935594" onClick={() => track.ctaClick({ cta_type: 'call', cta_source: 'who_we_are', cta_text: 'Call +1 (302) 893-5594' })}>
              <Phone className="mr-2 h-4 w-4" /> Call Us Now
            </a>
          </Button>
        </ScrollReveal>

        {/* Slide Indicators */}
        <div className="mt-8">
          <SlideIndicators current={slideIndex} total={BG_IMAGES.length} />
        </div>

        {/* Stats Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-4 md:gap-6">
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
