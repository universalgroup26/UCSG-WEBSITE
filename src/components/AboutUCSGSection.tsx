'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Phone, UserCheck, Shield, Eye, Heart } from 'lucide-react';
import { track } from '@/lib/analytics';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const portraitReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0)',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const badgeEnter = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  Value chips data                                                   */
/* ------------------------------------------------------------------ */
const valueChips = [
  { icon: UserCheck, label: 'Service' },
  { icon: Shield, label: 'Integrity' },
  { icon: Eye, label: 'Clarity' },
  { icon: Heart, label: 'Student-First Support' },
];

/* ------------------------------------------------------------------ */
/*  Veteran Badge component                                            */
/* ------------------------------------------------------------------ */
function VeteranBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-[#D6A84B] px-3 py-1 text-xs font-semibold text-[#061846] ${className}`}
    >
      <Star className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true" />
      U.S. Army Veteran
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export default function AboutUCSGSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  /* Parallax — desktop only, limited to 30px */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0px', '30px']);

  /* Section view tracking */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track.sectionView('founder_about');
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about-ucsg"
      ref={sectionRef}
      aria-label="Founder Message and About UCSG"
      className="relative w-full overflow-hidden"
    >
      {/* ---------- Background image + overlay ---------- */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/images/ucsg-founder-veteran-bg.png"
          alt=""
          fill
          className="object-cover"
          unoptimized
          aria-hidden="true"
        />
      </div>
      <div className="absolute inset-0 hidden md:block">
        <motion.div
          ref={bgRef}
          style={{ y: bgY }}
          className="absolute inset-[-30px]"
        >
          <Image
            src="/images/ucsg-founder-veteran-bg.png"
            alt=""
            fill
            className="object-cover"
            unoptimized
            aria-hidden="true"
          />
        </motion.div>
      </div>
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(6, 24, 70, 0.88)' }}
        aria-hidden="true"
      />

      {/* ---------- Content ---------- */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ============ LEFT: Founder Portrait ============ */}
          <motion.div
            className="order-2 flex flex-col items-center lg:order-1 lg:items-start"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
          >
            <motion.div
              className="relative h-72 w-full max-w-sm overflow-hidden rounded-2xl shadow-xl sm:h-80 lg:h-[440px]"
              style={{
                border: '1px solid rgba(214, 168, 75, 0.3)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(214,168,75,0.15)',
              }}
              variants={portraitReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Image
                src="/images/founder.jpg"
                alt="Joy Chowdhury, Founder and CEO of UCSG"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Floating veteran badge on portrait */}
              <motion.div
                className="absolute bottom-4 left-4"
                variants={badgeEnter}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <VeteranBadge />
              </motion.div>
            </motion.div>

            {/* Portrait label */}
            <motion.div
              className="mt-4 text-center lg:text-left"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0.4}
            >
              <p className="text-lg font-semibold text-white">Joy Chowdhury</p>
              <p className="text-sm font-medium" style={{ color: '#D6A84B' }}>
                Founder and CEO, UCSG
              </p>
            </motion.div>
          </motion.div>

          {/* ============ RIGHT: Message + About ============ */}
          <div className="order-1 flex flex-col gap-6 lg:order-2">
            {/* Eyebrow */}
            <motion.p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: '#D6A84B' }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
            >
              U.S. Army Veteran-Owned Business
            </motion.p>

            {/* Heading */}
            <motion.h2
              className="font-heading text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0.08}
            >
              Service, Integrity and Student-First Guidance
            </motion.h2>

            {/* Gold accent line */}
            <motion.div
              className="h-1 rounded-full bg-[#D6A84B]"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Quote text — split into paragraphs for staggered fade-up */}
            <motion.p
              className="text-base leading-relaxed sm:text-lg"
              style={{ color: 'rgba(255, 255, 255, 0.8)' }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0.16}
            >
              When I served in the United States Army, I learned that leadership
              begins with responsibility, discipline and standing beside the people
              who depend on you. I built UCSG on those same values. Every student
              deserves clear information, honest guidance and a team that respects
              the importance of their educational journey.
            </motion.p>

            {/* Signature block */}
            <motion.div
              className="flex flex-col gap-1.5"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0.24}
            >
              <p className="text-base font-bold text-white">Joy Chowdhury</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Founder and CEO, UCSG
              </p>
              <VeteranBadge className="mt-1 w-fit" />
            </motion.div>

            {/* Pending approval note */}
            <motion.p
              className="text-[11px] leading-snug italic"
              style={{ color: 'rgba(255,255,255,0.35)' }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0.32}
            >
              (This statement is pending final approval from Joy Chowdhury before
              publication.)
            </motion.p>

            {/* About UCSG copy */}
            <motion.p
              className="text-sm leading-relaxed sm:text-base"
              style={{ color: 'rgba(255,255,255,0.7)' }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0.36}
            >
              Based in Jackson Heights, New York, UCSG provides educational
              guidance, program research, application coordination and student
              support for F-1 students exploring university transfers and
              graduate-program options in the United States.
            </motion.p>

            {/* Value chips */}
            <motion.div
              className="mt-2 flex flex-wrap gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {valueChips.map((chip, i) => {
                const Icon = chip.icon;
                return (
                  <motion.span
                    key={chip.label}
                    className="inline-flex items-center gap-2 rounded-full border border-[#D6A84B]/40 bg-[#D6A84B]/10 px-4 py-2 text-sm font-medium text-white"
                    variants={fadeUp}
                    custom={0.44 + i * 0.08}
                  >
                    <Icon
                      className="h-4 w-4"
                      style={{ color: '#D6A84B' }}
                      aria-hidden="true"
                    />
                    {chip.label}
                  </motion.span>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="mt-4 flex flex-wrap gap-3"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0.8}
            >
              <button
                type="button"
                className="rounded-lg bg-[#0874F9] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0662d6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0874F9]"
                onClick={() => {
                  track.ctaClick('founder_meet_ucsg');
                  window.dispatchEvent(
                    new CustomEvent('ucsg-navigate', {
                      detail: { view: 'home', id: 'about' },
                    })
                  );
                }}
              >
                Meet UCSG
              </button>

              <button
                type="button"
                className="rounded-lg border border-[#D6A84B]/60 bg-transparent px-6 py-3 text-sm font-semibold text-[#D6A84B] transition-colors duration-200 hover:bg-[#D6A84B]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6A84B]"
                onClick={() => {
                  track.ctaClick('founder_start_assessment');
                  window.dispatchEvent(
                    new CustomEvent('ucsg-assessment', {
                      detail: { open: 'assessment' },
                    })
                  );
                }}
              >
                Start Free Assessment
              </button>

              <a
                href="tel:+13028935594"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white/80 transition-colors duration-200 hover:border-white/40 hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                onClick={() => track.ctaClick('founder_talk_team')}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Talk With Our Team
              </a>
            </motion.div>

            {/* Disclaimer */}
            <motion.p
              className="mt-6 max-w-lg text-[11px] leading-snug"
              style={{ color: 'rgba(255,255,255,0.35)' }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0.88}
            >
              UCSG is not a law firm and does not provide legal advice. For
              immigration-related decisions, students should consult with a
              qualified immigration attorney.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
