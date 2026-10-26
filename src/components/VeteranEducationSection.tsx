'use client';

/* ===================================================================================
 *  VeteranEducationSection
 *  Route: / (homepage, placed immediately after the hero, before F-1 content)
 *  Design system: deep navy #071B35 · gold #D6A84B · cyan #39C5E8 · white/#F8FAFC
 *
 *  Layout:
 *    1. Section intro (eyebrow + H2 + content + 2 CTAs)
 *    2. IMAGE 1 — full-width landscape with HTML text positioned over the dark
 *       navy space on the LEFT (image 1 has a large dark blue empty area on the
 *       left per VLM analysis). Mobile: image stacks above a solid navy text block.
 *    3. IMAGE 2 — alternating row 1: image LEFT, checklist RIGHT.
 *    4. Infographic — "Your Next Mission, Step by Step" with 4 numbered steps
 *       + connecting line. Desktop: 4 cols. Mobile: vertical sequence.
 *    5. IMAGE 3 — alternating row 2: image RIGHT, 3 degree-path cards LEFT.
 *    6. Closing CTA — H2 + content + 2 buttons + contact line + disclosure.
 *
 *  Motion:
 *    - Fade + slide headings upward ~14px as they enter the viewport.
 *    - Stagger infographic steps by ~90ms.
 *    - Animate the connecting line once when the infographic enters view.
 *    - Subtle 1.02 image scale on hover (clipped container).
 *    - Lift CTA buttons by ~2px on hover with a soft shadow.
 *    - prefers-reduced-motion: remove translations, scaling, line-drawing;
 *      display all content immediately.
 * =================================================================================== */

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Image from 'next/image';
import {
  Target,
  ClipboardList,
  Scale,
  ArrowRight,
  Phone,
  MessageCircle,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Design tokens                                                      */
/* ------------------------------------------------------------------ */
const NAVY = '#071B35';
const NAVY_DEEP = '#040E28';
const GOLD = '#D6A84B';
const CYAN = '#39C5E8';
const CLOUD = '#F8FAFC';

const CONTACT = {
  phoneLabel: '917-565-4788',
  phoneHref: 'tel:+19175654788',
  whatsappHref: 'https://wa.me/13478376354',
  whatsappLabel: '+1 347-837-6354',
};

const IMG_1 = '/images/veteran-education/from-service-to-campus.png';
const IMG_2 = '/images/veteran-education/field-compass-to-campus.png';
const IMG_3 = '/images/veteran-education/building-what-comes-next.png';

/* ------------------------------------------------------------------ */
/*  Motion variants                                                    */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

function useFadeUp() {
  const reduce = useReducedMotion();
  return {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: reduce ? 0 : i * 0.09,
        duration: reduce ? 0 : 0.5,
        ease: EASE,
      },
    }),
  } satisfies Variants;
}

function useLineDraw() {
  const reduce = useReducedMotion();
  return {
    hidden: reduce ? { scaleX: 1 } : { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: reduce ? 0 : 0.9, ease: EASE, delay: 0.15 },
    },
  } satisfies Variants;
}

function useLineDrawVertical() {
  const reduce = useReducedMotion();
  return {
    hidden: reduce ? { scaleY: 1 } : { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: reduce ? 0 : 0.9, ease: EASE, delay: 0.15 },
    },
  } satisfies Variants;
}

/* ------------------------------------------------------------------ */
/*  Reusable atoms                                                     */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#D6A84B]">
      {children}
    </p>
  );
}

/** CTA anchor — real <a href> for crawlability + accessibility.
 *  Lifts ~2px on hover with a soft shadow. Min 44px touch target. */
function CtaButton({
  href,
  children,
  variant = 'primary',
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'gold';
  ariaLabel?: string;
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.12em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 min-h-[44px]';
  const styles = {
    primary: 'bg-[#D6A84B] text-[#071B35] hover:brightness-110 hover:shadow-[#D6A84B]/25 focus-visible:ring-[#D6A84B]',
    secondary:
      'border border-[#39C5E8]/60 bg-transparent text-[#39C5E8] hover:border-[#39C5E8] hover:bg-[#39C5E8]/10 focus-visible:ring-[#39C5E8]',
    gold: 'border border-[#D6A84B] bg-transparent text-[#D6A84B] hover:bg-[#D6A84B]/10 focus-visible:ring-[#D6A84B]',
  };
  const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`${base} ${styles[variant]}`}
    >
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  1. Section intro                                                    */
/* ------------------------------------------------------------------ */

function SectionIntro() {
  const fadeUp = useFadeUp();
  return (
    <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
        <Eyebrow>VETERAN-LED EDUCATION GUIDANCE</Eyebrow>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        id="veteran-education-heading"
        className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-[#071B35] sm:text-4xl lg:text-5xl"
      >
        Your Service. Your Next Degree.
      </motion.h2>
      <motion.p
        variants={fadeUp}
        custom={2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-slate-600 sm:text-lg"
      >
        Explore degree paths, build on your previous learning, and prepare the right
        questions about your education benefits. UCSG helps veterans, transitioning
        service members, and military-connected students plan their next chapter.
      </motion.p>
      <motion.div
        variants={fadeUp}
        custom={3}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
      >
        <CtaButton href="/veterans/assessment" variant="primary">
          Start My Free Assessment
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </CtaButton>
        <CtaButton href="/veterans" variant="secondary">
          Explore Veteran Education
        </CtaButton>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  2. IMAGE 1 — full-width landscape with HTML text overlay on LEFT   */
/* ------------------------------------------------------------------ */

function ImageFeature1() {
  const fadeUp = useFadeUp();
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="group relative mx-auto mt-16 max-w-7xl overflow-hidden rounded-2xl px-4 sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-xl">
        {/* Image (full-width landscape). Width/height prevent layout shift. */}
        {/* Responsive aspect ratios: portrait on mobile (so the veteran +
            reflection + flag are large enough to read), landscape on desktop
            (where the text overlay needs the wide dark navy space on the left).
            object-position:right on mobile preserves the veteran (right side)
            while cropping the empty dark space (left). On lg+, switch back to
            object-center to show the full image with dark space for overlay. */}
        <div className="relative aspect-[4/5] w-full sm:aspect-[3/2] lg:aspect-[16/9]">
          <Image
            src={IMG_1}
            alt="A veteran in civilian attire walking past a university building; the glass reflection shows him in military uniform, with the American flag flying above the campus."
            fill
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover object-right lg:object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
          {/* Left-side dark navy gradient overlay for text legibility.
              The image already has dark navy space on the left; this gradient
              ensures the white text remains readable across viewports without
              covering the right side of the image (where the subject + reflection live). */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(7,27,53,0.96) 0%, rgba(7,27,53,0.92) 38%, rgba(7,27,53,0.45) 55%, rgba(7,27,53,0) 75%)',
            }}
            aria-hidden="true"
          />
        </div>

        {/* HTML text positioned over the dark navy space on the LEFT.
            On desktop, this is a left-aligned block covering ~45% of the image width.
            On mobile, the overlay is hidden and the same content is rendered in a
            solid navy block BENEATH the image (per spec: "If overlay text becomes
            crowded, move it into a solid navy area beneath the image."). */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <div className="flex h-full items-center">
            <div className="w-[55%] max-w-2xl pl-8 pr-6 lg:pl-12 lg:pr-8">
              <Eyebrow>FROM SERVICE TO CAMPUS</Eyebrow>
              <h3 className="mt-3 font-heading text-2xl font-bold leading-tight text-white sm:text-3xl">
                Turn Your Experience Into a Clear Education Plan.
              </h3>
              <p className="mt-4 font-sans text-sm leading-relaxed text-white/80 sm:text-base">
                Whether you are returning to college or exploring a new direction,
                start with your goals. Compare degree options, study schedules, and
                school requirements with veteran-led guidance.
              </p>
              <div className="pointer-events-auto mt-6">
                <CtaButton href="/veterans/degree-planning" variant="primary">
                  Plan My Next Step
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </CtaButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/tablet fallback: solid navy block beneath the image with the
          same heading + content + CTA. Visible on < lg screens. */}
      <div className="rounded-b-xl bg-[#071B35] px-6 py-8 lg:hidden">
        <Eyebrow>FROM SERVICE TO CAMPUS</Eyebrow>
        <h3 className="mt-3 font-heading text-2xl font-bold leading-tight text-white">
          Turn Your Experience Into a Clear Education Plan.
        </h3>
        <p className="mt-3 font-sans text-sm leading-relaxed text-white/80">
          Whether you are returning to college or exploring a new direction, start
          with your goals. Compare degree options, study schedules, and school
          requirements with veteran-led guidance.
        </p>
        <div className="mt-6">
          <CtaButton href="/veterans/degree-planning" variant="primary">
            Plan My Next Step
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </CtaButton>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  3. IMAGE 2 — alternating row 1: image LEFT, checklist RIGHT          */
/* ------------------------------------------------------------------ */

function Checklist() {
  const items = [
    'Review previous learning',
    'Compare remaining coursework',
    'Understand estimated costs',
  ];
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#39C5E8]/10 text-[#39C5E8]"
            aria-hidden="true"
          >
            <span className="text-xs font-bold">{i + 1}</span>
          </span>
          <span className="font-sans text-base text-slate-700">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function AlternatingRow1() {
  const fadeUp = useFadeUp();
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image LEFT on desktop, top on mobile */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="group relative overflow-hidden rounded-2xl"
          >
            {/* Responsive aspect ratios: square on mobile (preserves the
                compass + graduation cap + flag foreground without cropping the
                sides), landscape on desktop (fits the 2-col grid naturally). */}
            <div className="relative aspect-square w-full sm:aspect-[3/2] lg:aspect-[16/10]">
              <Image
                src={IMG_2}
                alt="A brass compass with a glowing blue needle, a graduation cap with gold tassel, and a leather-bound book rest on an American flag; a university campus is visible in the background."
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </div>
          </motion.div>

          {/* Content RIGHT on desktop, below on mobile */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <Eyebrow>YOUR NEXT MISSION</Eyebrow>
            <h3 className="mt-3 font-heading text-2xl font-bold leading-tight text-[#071B35] sm:text-3xl">
              Find Your Direction Before Choosing a School.
            </h3>
            <p className="mt-4 font-sans text-base leading-relaxed text-slate-600">
              Bring your previous coursework, military learning, and career interests
              into one practical plan. Understand what to ask about transfer credit,
              remaining requirements, and the cost of finishing.
            </p>
            <div className="mt-6">
              <Checklist />
            </div>
            <div className="mt-8">
              <CtaButton href="/veterans/military-transfer-credit" variant="primary">
                Explore Military &amp; Transfer Credit
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </CtaButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  4. Infographic — "Your Next Mission, Step by Step"                 */
/* ------------------------------------------------------------------ */

const INFO_STEPS = [
  {
    icon: Target,
    title: 'Share Your Goal',
    description: 'Tell us what you want to accomplish.',
  },
  {
    icon: ClipboardList,
    title: 'Review Your Background',
    description: 'Organize previous education and military-learning questions.',
  },
  {
    icon: Scale,
    title: 'Compare Your Options',
    description: 'Review requirements, schedules, and estimated costs.',
  },
  {
    icon: ArrowRight,
    title: 'Choose Your Next Step',
    description: 'Prepare for school conversations and applications.',
  },
];

function Infographic() {
  const fadeUp = useFadeUp();
  const lineDraw = useLineDraw();
  const lineDrawV = useLineDrawVertical();

  return (
    <section
      aria-labelledby="veteran-next-mission-heading"
      className="bg-[#071B35] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <Eyebrow>YOUR NEXT MISSION, STEP BY STEP</Eyebrow>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            id="veteran-next-mission-heading"
            className="mt-4 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl"
          >
            Your Next Mission, Step by Step
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-4 font-sans text-base leading-relaxed text-white/70"
          >
            A simple four-step framework to move from goal to action.
          </motion.p>
        </div>

        {/* Desktop: 4 connected steps in one row */}
        <div className="mt-16 hidden md:block">
          <div className="relative">
            {/* Connecting horizontal line — animates once when in view */}
            <div className="absolute left-0 right-0 top-[27px] flex justify-center" aria-hidden="true">
              <motion.div
                variants={lineDraw}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="h-0.5 w-full origin-left bg-gradient-to-r from-[#39C5E8]/30 via-[#D6A84B]/50 to-[#39C5E8]/30"
              />
            </div>

            <ol className="relative grid grid-cols-4 gap-8">
              {INFO_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.li
                    key={step.title}
                    variants={fadeUp}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#D6A84B] bg-[#071B35]">
                      <Icon className="h-6 w-6 text-[#39C5E8]" aria-hidden="true" />
                      <span
                        className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#D6A84B] text-xs font-bold text-[#071B35]"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-white/70">
                      {step.description}
                    </p>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Mobile: vertical sequence with clear reading order */}
        <div className="mt-12 md:hidden">
          <ol className="relative space-y-8 pl-8">
            {/* Connecting vertical line — animates once when in view */}
            <motion.div
              variants={lineDrawV}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="absolute left-7 top-2 bottom-2 w-0.5 origin-top bg-gradient-to-b from-[#39C5E8]/30 via-[#D6A84B]/50 to-[#39C5E8]/30"
              aria-hidden="true"
            />
            {INFO_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.title}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  className="relative flex items-start gap-4"
                >
                  <div className="relative z-10 -ml-12 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#D6A84B] bg-[#071B35]">
                    <Icon className="h-5 w-5 text-[#39C5E8]" aria-hidden="true" />
                    <span
                      className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#D6A84B] text-[10px] font-bold text-[#071B35]"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-heading text-base font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-white/70">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. IMAGE 3 — alternating row 2: image RIGHT, 3 degree cards LEFT   */
/* ------------------------------------------------------------------ */

function DegreePathCards() {
  const paths = [
    { label: "Bachelor's & Completion", href: '/veterans/bachelors-degree' },
    { label: "Master's & MBA", href: '/veterans/masters-mba' },
    { label: 'Online & Hybrid', href: '/veterans/online-hybrid-degrees' },
  ];
  return (
    <ul className="space-y-3">
      {paths.map((p) => (
        <li key={p.href}>
          <a
            href={p.href}
            className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#39C5E8] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39C5E8] focus-visible:ring-offset-2"
          >
            <span className="font-sans text-base font-semibold text-[#071B35]">
              {p.label}
            </span>
            <ArrowRight
              className="h-4 w-4 text-[#39C5E8] transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

function AlternatingRow2() {
  const fadeUp = useFadeUp();
  return (
    <section className="bg-[#F8FAFC] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Content LEFT on desktop, top on mobile (alternation happens via order on lg) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="order-1 lg:order-none"
          >
            <Eyebrow>BUILD WHAT COMES NEXT</Eyebrow>
            <h3 className="mt-3 font-heading text-2xl font-bold leading-tight text-[#071B35] sm:text-3xl">
              Choose a Degree That Fits Your Future.
            </h3>
            <p className="mt-4 font-sans text-base leading-relaxed text-slate-600">
              Explore bachelor&rsquo;s completion, master&rsquo;s and MBA pathways, and
              online or hybrid study options. Compare programs around your career
              goals, responsibilities, and preferred learning format.
            </p>
            <div className="mt-6">
              <DegreePathCards />
            </div>
            <div className="mt-8">
              <CtaButton href="/veterans/program-comparison" variant="primary">
                Compare My Degree Options
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </CtaButton>
            </div>
          </motion.div>

          {/* Image RIGHT on desktop, below on mobile */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="group relative order-2 overflow-hidden rounded-2xl lg:order-none"
          >
            {/* Responsive aspect ratios: square on mobile (preserves both
                people + the soldier silhouettes on the glass wall behind them
                without cropping the sides), landscape on desktop. */}
            <div className="relative aspect-square w-full sm:aspect-[3/2] lg:aspect-[16/10]">
              <Image
                src={IMG_3}
                alt="Two people stand side by side in a modern educational building with large windows and an American flag in the background; silhouettes of soldiers are visible on the glass wall behind them, suggesting the connection between military service and education."
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6. Closing CTA                                                     */
/* ------------------------------------------------------------------ */

function ClosingCta() {
  const fadeUp = useFadeUp();
  return (
    <section
      aria-labelledby="veteran-closing-heading"
      className="bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#071B35] to-[#0B2545] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20 text-center">
          {/* Subtle gold glow accent (decorative) */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#D6A84B]/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <Eyebrow>READY TO PLAN YOUR NEXT CHAPTER?</Eyebrow>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              id="veteran-closing-heading"
              className="mt-4 font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl"
            >
              Ready to Plan Your Next Chapter?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-white/80 sm:text-lg"
            >
              Start with your goals and get clearer next steps with Joy Chowdhury,
              U.S. Army veteran and UCSG founder.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            >
              <CtaButton href="/veterans/assessment" variant="primary">
                Start My Free Assessment
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </CtaButton>
              <CtaButton href="/veterans/book-consultation" variant="secondary">
                Talk With Joy
              </CtaButton>
            </motion.div>

            {/* Contact line — real <a href> for tel: and wa.me */}
            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70"
            >
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39C5E8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071B35] rounded"
              >
                <Phone className="h-4 w-4 text-[#39C5E8]" aria-hidden="true" />
                Call/Text: {CONTACT.phoneLabel}
              </a>
              <span className="text-white/30" aria-hidden="true">|</span>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39C5E8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071B35] rounded"
              >
                <MessageCircle className="h-4 w-4 text-[#39C5E8]" aria-hidden="true" />
                WhatsApp: {CONTACT.whatsappLabel}
              </a>
            </motion.div>

            <motion.p
              variants={fadeUp}
              custom={5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mx-auto mt-8 max-w-2xl text-xs leading-relaxed text-white/50"
            >
              UCSG provides independent education planning and initial intake
              support. Schools and VA determine admissions, transfer credit, and
              benefit eligibility.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                             */
/* ------------------------------------------------------------------ */

export default function VeteranEducationSection() {
  return (
    <section
      aria-labelledby="veteran-education-heading"
      className="bg-white py-20 sm:py-24 lg:py-28"
    >
      <SectionIntro />
      <ImageFeature1 />
      <AlternatingRow1 />
      <Infographic />
      <AlternatingRow2 />
      <ClosingCta />
    </section>
  );
}
