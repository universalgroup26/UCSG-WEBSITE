'use client';

/* ===================================================================================
 *  VeteranOnlineHybridPage — Flexible Degree Options for Veterans
 *  Route: /veterans/online-hybrid-degrees
 *  Design system: deep navy #071B35 · gold #D6A84B · cyan #39C5E8 · white/#F8FAFC
 *  Standalone page (does NOT use VeteranInfoPage wrapper — new design system).
 * =================================================================================== */

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowRight,
  Phone,
  MessageCircle,
  Mail,
  ChevronDown,
  CheckCircle2,
  type LucideIcon,
  Globe,
  Layers,
  Landmark,
  ShieldCheck,
  HelpCircle,
  Compass,
  GraduationCap,
} from 'lucide-react';
import { track } from '@/lib/analytics';
import { ComplianceDisclosure } from './VeteranInfoPage';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const NAVY = '#071B35';
const GOLD = '#D6A84B';
const CYAN = '#39C5E8';
const CLOUD = '#F8FAFC';

const PHONE_HREF = 'tel:+19175654788';
const PHONE_LABEL = '917-565-4788';
const WHATSAPP_HREF = 'https://wa.me/13478376354';
const EMAIL_HREF = 'mailto:info@universalconsultingservices.com';
const EMAIL_LABEL = 'info@universalconsultingservices.com';

const HERO_IMAGE = '/images/hero-veteran-future.jpg';

/* ------------------------------------------------------------------ */
/*  Navigation helpers (dispatch CustomEvent for GlobalShell router)   */
/* ------------------------------------------------------------------ */

function navTo(id?: string) {
  return () =>
    window.dispatchEvent(
      new CustomEvent('ucsg-navigate', {
        detail: id ? { view: 'veterans', id } : { view: 'veterans' },
      })
    );
}

function navHome() {
  return () =>
    window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'home' } }));
}

/* ------------------------------------------------------------------ */
/*  Reveal animation variants                                          */
/* ------------------------------------------------------------------ */

const reveal = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

/* ------------------------------------------------------------------ */
/*  Section data                                                       */
/* ------------------------------------------------------------------ */

/** Three online learning-format cards */
const learningFormats: {
  icon: LucideIcon;
  title: string;
  description: string;
  bestFor: string;
}[] = [
  {
    icon: Globe,
    title: 'Live Online (Synchronous)',
    description:
      'Real-time classes at scheduled times. You attend live sessions remotely and engage with faculty and classmates as a cohort.',
    bestFor: 'Best for students who want structure and real-time interaction without commuting.',
  },
  {
    icon: Layers,
    title: 'Asynchronous',
    description:
      'Complete coursework on your own schedule, with no scheduled class meetings. Assignments and discussions have set deadlines, but there are no fixed meeting times.',
    bestFor: 'Best for working professionals, parents, and students across multiple time zones.',
  },
  {
    icon: Landmark,
    title: 'Mixed / Hybrid Online',
    description:
      'Combines live and asynchronous components — some sessions meet in real time, while others are completed on your own schedule.',
    bestFor: 'Best for students who want some real-time engagement with maximum flexibility.',
  },
];

/** 6 questions to ask about hybrid programs */
const hybridQuestions: string[] = [
  'How often are on-campus sessions required?',
  'What is the duration of each campus visit?',
  'Are campus sessions scheduled around drill weekends?',
  'Is attendance recorded for VA reporting?',
  'What technology is required for online components?',
  'How are exams proctored?',
];

/** Online vs Hybrid vs On-Campus comparison rows */
const comparisonRows: {
  aspect: string;
  online: string;
  hybrid: string;
  oncampus: string;
}[] = [
  {
    aspect: 'Flexibility',
    online: 'Highest — study around your schedule',
    hybrid: 'Moderate — scheduled campus sessions',
    oncampus: 'Lowest — fixed class times',
  },
  {
    aspect: 'Networking',
    online: 'Varies by institution',
    hybrid: 'Varies by institution',
    oncampus: 'Varies by institution',
  },
  {
    aspect: 'Cost',
    online: 'Varies by institution',
    hybrid: 'Varies by institution',
    oncampus: 'Varies by institution',
  },
  {
    aspect: 'Schedule',
    online: 'Set your own pace within deadlines',
    hybrid: 'Mix of online + scheduled campus visits',
    oncampus: 'Fixed class schedule',
  },
  {
    aspect: 'Technology Required',
    online: 'Reliable internet + personal device',
    hybrid: 'Internet + on-campus access',
    oncampus: 'Standard classroom supplies',
  },
  {
    aspect: 'VA Benefit Compatibility',
    online: 'Depends on program approval & enrollment',
    hybrid: 'Depends on program approval & enrollment',
    oncampus: 'Depends on program approval & enrollment',
  },
  {
    aspect: 'Typical Program Length',
    online: 'Varies by program',
    hybrid: 'Varies by program',
    oncampus: 'Varies by program',
  },
];

/** 4 FAQ Q&As */
const faqs: { q: string; a: string }[] = [
  {
    q: 'Can I use my VA benefits for online programs?',
    a: "Benefit eligibility depends on the program's approval status. Verify with the VA and the institution.",
  },
  {
    q: 'What\u2019s the difference between synchronous and asynchronous?',
    a: 'Online programs typically use one of three formats: live (synchronous) classes meet in real time at scheduled times; asynchronous programs let you complete coursework on your own schedule with no scheduled meetings; and mixed (hybrid online) programs combine live and asynchronous components. Costs, networking opportunities, and structure vary by institution \u2014 confirm the specific format with admissions before enrolling.',
  },
  {
    q: 'Do hybrid programs require attendance on specific days?',
    a: 'Each program sets its own schedule. Ask about campus session frequency and whether they accommodate military obligations.',
  },
  {
    q: 'Will my housing allowance change based on program format?',
    a: 'Benefit amounts, including housing, are determined by the VA based on multiple factors. Do not assume a particular format will produce a particular amount. Verify with the VA.',
  },
];

/* ------------------------------------------------------------------ */
/*  Small inline presentational helpers                                */
/* ------------------------------------------------------------------ */

function SectionHeading({
  eyebrow,
  title,
  description,
  textColor = 'text-white',
  descColor = 'text-white/70',
  align = 'left',
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  textColor?: string;
  descColor?: string;
  align?: 'left' | 'center';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}
    >
      <div
        className={`mb-3 flex items-center gap-2 ${
          align === 'center' ? 'justify-center' : 'justify-start'
        }`}
      >
        <span className="h-px w-6" style={{ backgroundColor: GOLD }} aria-hidden="true" />
        <span
          className="text-xs font-semibold uppercase tracking-[0.22em]"
          style={{ color: GOLD }}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        className={`font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl ${textColor}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${descColor}`}>{description}</p>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function VeteranOnlineHybridPage() {
  /* ── CTA handlers with analytics ── */
  const handleAssessmentCta = (source: string) => {
    track.ctaClick({
      cta_type: 'assessment',
      cta_source: source,
      cta_text: 'COMPARE FLEXIBLE PROGRAMS',
    });
    navTo('assessment')();
  };

  const handleClosingAssessmentCta = () => {
    track.ctaClick({
      cta_type: 'assessment',
      cta_source: 'veteran_online_hybrid_closing_primary',
      cta_text: 'START FREE ASSESSMENT',
    });
    navTo('assessment')();
  };

  const handlePhoneCta = () => {
    track.ctaClick({
      cta_type: 'phone',
      cta_source: 'veteran_online_hybrid_closing_secondary',
      cta_text: 'TALK WITH AN ADVISOR',
      cta_url: PHONE_HREF,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ════════════════════════════════════════════════════════════ */}
      {/*  1. Breadcrumb + 2. Hero (two-column: text left, image right)   */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: NAVY }}
        aria-labelledby="online-hybrid-hero-heading"
      >
        {/* Soft decorative glow */}
        <div
          className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full blur-[120px]"
          style={{ backgroundColor: `${CYAN}10` }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-1/3 h-[360px] w-[360px] rounded-full blur-[120px]"
          style={{ backgroundColor: `${GOLD}0F` }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          {/* ── Breadcrumb ── */}
          <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex flex-wrap items-center gap-1.5 text-white/60 sm:gap-2.5">
              <li>
                <button
                  type="button"
                  onClick={navHome()}
                  className="font-medium transition-colors hover:text-white"
                >
                  Home
                </button>
              </li>
              <li aria-hidden="true" className="text-white/40">
                /
              </li>
              <li>
                <button
                  type="button"
                  onClick={navTo()}
                  className="font-medium transition-colors hover:text-white"
                >
                  Veteran Education
                </button>
              </li>
              <li aria-hidden="true" className="text-white/40">
                /
              </li>
              <li aria-current="page" className="font-medium" style={{ color: GOLD }}>
                Online &amp; Hybrid
              </li>
            </ol>
          </nav>
        </div>

        {/* ── Hero two-column grid ── */}
        <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left column — text */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              className="order-1"
              style={{ backgroundColor: NAVY }}
            >
              <div className="mb-5 flex items-center gap-2">
                <Compass className="h-5 w-5" style={{ color: GOLD }} aria-hidden="true" />
                <span
                  className="text-xs font-semibold uppercase tracking-[0.22em]"
                  style={{ color: GOLD }}
                >
                  FLEXIBLE DEGREE OPTIONS
                </span>
              </div>

              <h1
                id="online-hybrid-hero-heading"
                className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
              >
                Flexible Degree Options{' '}
                <span style={{ color: GOLD }}>for Veterans</span>
              </h1>

              <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">
                Compare online, hybrid, and on-campus formats. Understand what each delivery
                method means for your schedule, benefits, and career goals.
              </p>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => handleAssessmentCta('veteran_online_hybrid_hero_primary')}
                  className="group inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold shadow-lg transition-all duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071B35] sm:text-base"
                  style={{
                    backgroundColor: GOLD,
                    color: NAVY,
                    ['--tw-ring-color' as string]: CYAN,
                  } as React.CSSProperties}
                >
                  COMPARE FLEXIBLE PROGRAMS
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
              </div>

              {/* Inline contact quick-links under the CTA */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4" style={{ color: CYAN }} aria-hidden="true" />
                  {PHONE_LABEL}
                </a>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  <MessageCircle className="h-4 w-4" style={{ color: CYAN }} aria-hidden="true" />
                  Talk With Joy on WhatsApp
                </a>
                <a
                  href={EMAIL_HREF}
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4" style={{ color: CYAN }} aria-hidden="true" />
                  Email an advisor
                </a>
              </div>
            </motion.div>

            {/* Right column — image */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
              className="order-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl sm:aspect-[16/10]">
                <Image
                  src={HERO_IMAGE}
                  alt="Veteran students collaborating on a campus — symbolizing flexible degree options and building the future together"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  3. Learning-Format Cards (Online, Hybrid, On-Campus)          */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-20 lg:py-24"
        aria-labelledby="online-hybrid-formats-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="ONLINE LEARNING FORMATS"
            title={
              <span id="online-hybrid-formats-heading">Three Online Delivery Formats</span>
            }
            description="Online programs are typically delivered in one of three formats — live (synchronous), asynchronous, or mixed (hybrid online). Each fits a different lifestyle and has different implications for how your benefits apply. Verify with your School Certifying Official before deciding."
            textColor="text-[#071B35]"
            descColor="text-gray-600"
          />

          <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3">
            {learningFormats.map((fmt, i) => {
              const Icon = fmt.icon;
              return (
                <motion.div
                  key={fmt.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                >
                  <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
                    <div
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${CYAN}15` }}
                    >
                      <Icon className="h-6 w-6" style={{ color: CYAN }} aria-hidden="true" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-[#071B35]">{fmt.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{fmt.description}</p>
                    <p className="mt-4 border-t border-gray-100 pt-3 text-xs font-semibold leading-relaxed text-[#071B35]">
                      {fmt.bestFor}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Compliance note — do not label all online programs as self-paced */}
          <motion.div
            {...reveal}
            className="mx-auto mt-10 max-w-3xl rounded-r-lg p-4"
            style={{ backgroundColor: CLOUD, borderLeft: `4px solid ${CYAN}` }}
          >
            <p className="text-sm leading-relaxed text-gray-600">
              <strong className="text-[#071B35]">Note:</strong> Do not assign universal cost or
              networking advantages to any format. Costs vary by institution regardless of delivery
              method, and networking opportunities depend on program design — not on whether a
              program is online, hybrid, or on-campus. Ask admissions about the specific structure,
              cost, and engagement model of any program you are considering.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  4. Hybrid Attendance Checklist                                    */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-20 lg:py-24"
        style={{ backgroundColor: CLOUD }}
        aria-labelledby="online-hybrid-checklist-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="HYBRID PROGRAMS"
            title={
              <span id="online-hybrid-checklist-heading">
                Questions to Ask About Hybrid Programs
              </span>
            }
            description="Before enrolling in any hybrid program, ask admissions these six questions. The answers determine whether the format actually fits your life and your benefits."
            textColor="text-[#071B35]"
            descColor="text-gray-600"
          />

          <motion.div
            {...reveal}
            className="mx-auto mt-12 max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:mt-16 sm:p-7"
          >
            <div className="mb-4 flex items-center gap-2.5">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${CYAN}15` }}
              >
                <HelpCircle className="h-5 w-5" style={{ color: CYAN }} aria-hidden="true" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#071B35]">
                Ask admissions before you commit
              </h3>
            </div>

            <ul className="space-y-3">
              {hybridQuestions.map((q) => (
                <li key={q} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0"
                    style={{ color: CYAN }}
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed text-gray-700 sm:text-base">{q}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  5. Comparison Table — Online vs Hybrid vs On-Campus              */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-20 lg:py-24"
        aria-labelledby="online-hybrid-comparison-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="SIDE-BY-SIDE"
            title={
              <span id="online-hybrid-comparison-heading">
                Online vs Hybrid vs On-Campus
              </span>
            }
            description="A neutral comparison of the three formats across the factors that matter most — without claiming a universal cost or networking advantage for any format."
            textColor="text-[#071B35]"
            descColor="text-gray-600"
          />

          <motion.div
            {...reveal}
            className="mt-12 overflow-hidden rounded-xl border border-gray-200 shadow-sm lg:mt-16"
          >
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm sm:text-base">
                <thead>
                  <tr style={{ backgroundColor: NAVY }}>
                    <th
                      scope="col"
                      className="px-4 py-4 font-heading text-sm font-semibold uppercase tracking-wider text-white sm:px-6 sm:text-base"
                    >
                      Aspect
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-4 font-heading text-sm font-semibold uppercase tracking-wider text-white sm:px-6 sm:text-base"
                    >
                      Online
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-4 font-heading text-sm font-semibold uppercase tracking-wider text-white sm:px-6 sm:text-base"
                    >
                      Hybrid
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-4 font-heading text-sm font-semibold uppercase tracking-wider text-white sm:px-6 sm:text-base"
                    >
                      On-Campus
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.aspect}
                      className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}
                      style={i % 2 !== 0 ? { backgroundColor: CLOUD } : undefined}
                    >
                      <th
                        scope="row"
                        className="border-t border-gray-200 px-4 py-4 align-top font-heading text-sm font-semibold text-[#071B35] sm:px-6 sm:text-base"
                      >
                        {row.aspect}
                      </th>
                      <td className="border-t border-gray-200 px-4 py-4 align-top leading-relaxed text-gray-700 sm:px-6">
                        {row.online}
                      </td>
                      <td className="border-t border-gray-200 px-4 py-4 align-top leading-relaxed text-gray-700 sm:px-6">
                        {row.hybrid}
                      </td>
                      <td className="border-t border-gray-200 px-4 py-4 align-top leading-relaxed text-gray-700 sm:px-6">
                        {row.oncampus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Compliance note under table */}
          <motion.div
            {...reveal}
            className="mx-auto mt-6 max-w-3xl rounded-r-lg p-4"
            style={{ backgroundColor: CLOUD, borderLeft: `4px solid ${GOLD}` }}
          >
            <p className="text-sm leading-relaxed text-gray-600">
              <strong className="text-[#071B35]">Note:</strong> Benefits can be affected by program
              and enrollment circumstances. Do not claim a universal cost or networking advantage
              for any format — each program sets its own policies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  6. Benefit-Verification Panel                                    */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-20 lg:py-24"
        style={{ backgroundColor: CLOUD }}
        aria-labelledby="online-hybrid-verify-heading"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...reveal}
            className="rounded-r-xl p-6 sm:p-8"
            style={{ backgroundColor: '#FFFFFF', borderLeft: `4px solid ${CYAN}` }}
          >
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
              <div className="lg:col-span-1">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${CYAN}15` }}
                >
                  <ShieldCheck className="h-6 w-6" style={{ color: CYAN }} aria-hidden="true" />
                </div>
                <h3
                  id="online-hybrid-verify-heading"
                  className="mt-4 font-heading text-xl font-bold text-[#071B35]"
                >
                  Verify Your Benefits Before Choosing
                </h3>
              </div>
              <div className="lg:col-span-2">
                <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                  Your VA education benefits may be affected by the program format and your
                  enrollment status. Contact the VA or your School Certifying Official to verify
                  before enrolling.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  UCSG cannot determine, estimate, or guarantee benefit eligibility, entitlement
                  amounts, or coverage for any program format. Always verify your status directly
                  with the U.S. Department of Veterans Affairs.
                </p>

                <button
                  type="button"
                  onClick={navTo('education-benefits')}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline"
                  style={{ color: CYAN }}
                >
                  Education Benefits Guide →
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  7. FAQ (4 Q&As using <details>/<summary>)                      */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-20 lg:py-24"
        aria-labelledby="online-hybrid-faq-heading"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FREQUENTLY ASKED"
            title={<span id="online-hybrid-faq-heading">Online &amp; Hybrid FAQ</span>}
            description="Quick, plain-English answers to the questions veterans ask us most about flexible degree formats."
            textColor="text-[#071B35]"
            descColor="text-gray-600"
            align="center"
          />

          <div className="mt-10 space-y-4">
            {faqs.map((faq, i) => (
              <motion.details
                key={faq.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
              >
                <summary
                  className="flex cursor-pointer items-center justify-between gap-4 font-heading text-base font-semibold text-[#071B35] marker:hidden [&::-webkit-details-marker]:hidden sm:text-lg"
                  style={{ listStyle: 'none' }}
                >
                  {faq.q}
                  <ChevronDown
                    className="h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-180"
                    style={{ color: CYAN }}
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:mt-4 sm:text-base">
                  {faq.a}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  8. Closing CTA                                                  */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
        style={{ backgroundColor: NAVY }}
        aria-labelledby="online-hybrid-closing-heading"
      >
        {/* Decorative glows */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: `${CYAN}0A` }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 h-[320px] w-[320px] rounded-full blur-[100px]"
          style={{ backgroundColor: `${GOLD}0A` }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div {...reveal}>
            <div className="mb-4 flex items-center justify-center gap-2">
              <GraduationCap className="h-5 w-5" style={{ color: GOLD }} aria-hidden="true" />
              <span
                className="text-xs font-semibold uppercase tracking-[0.22em]"
                style={{ color: GOLD }}
              >
                YOUR NEXT MISSION STARTS HERE
              </span>
            </div>

            <h2
              id="online-hybrid-closing-heading"
              className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
            >
              Find Your Flexible Path
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              Start with a no-pressure assessment of your goals, schedule, and the format that
              fits your life — or talk with an advisor who understands military-connected
              students.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
              <button
                type="button"
                onClick={handleClosingAssessmentCta}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:w-auto"
                style={{
                  backgroundColor: GOLD,
                  color: NAVY,
                  ['--tw-ring-color' as string]: CYAN,
                } as React.CSSProperties}
              >
                START FREE ASSESSMENT
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>

              <a
                href={PHONE_HREF}
                onClick={handlePhoneCta}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 sm:w-auto"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                TALK WITH AN ADVISOR
              </a>
            </div>

            {/* Secondary contact rail */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" style={{ color: CYAN }} aria-hidden="true" />
                {PHONE_LABEL}
              </a>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <MessageCircle className="h-4 w-4" style={{ color: CYAN }} aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href={EMAIL_HREF}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4" style={{ color: CYAN }} aria-hidden="true" />
                {EMAIL_LABEL}
              </a>
            </div>

            <p className="mt-6 text-xs text-white/40">No enrollment commitment required.</p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  9. Compliance disclosure (shared component)                    */}
      {/* ════════════════════════════════════════════════════════════ */}
      <ComplianceDisclosure />
    </div>
  );
}
