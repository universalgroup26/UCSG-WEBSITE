'use client';

/* ===================================================================================
 *  VeteranMastersPage — Master's & MBA Degree Planning for Veterans
 *  Route: /veterans/masters-mba
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
  type LucideIcon,
  GraduationCap,
  Briefcase,
  FileText,
  Clock,
  DollarSign,
  BookOpen,
  Compass,
  ClipboardList,
  CalendarClock,
} from 'lucide-react';
import { track } from '@/lib/analytics';
import { ComplianceDisclosure } from './VeteranInfoPage';
import AuthorByline from './AuthorByline';

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

const HERO_IMAGE = '/images/hero-veteran-campus.jpg';

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

/** MBA vs Specialized Master's comparison rows */
const comparisonRows: { aspect: string; mba: string; specialized: string }[] = [
  {
    aspect: 'Focus',
    mba: 'Broad business leadership & management curriculum',
    specialized: 'Deep technical focus in one discipline',
  },
  {
    aspect: 'Duration',
    mba: 'Varies by program and enrollment',
    specialized: 'Varies by program and enrollment',
  },
  {
    aspect: 'Prerequisites',
    mba: "Bachelor's degree; some programs prefer professional experience",
    specialized: "Bachelor's degree; field-specific prerequisites may apply",
  },
  {
    aspect: 'Career Outcomes',
    mba: 'Generalist leadership & management roles',
    specialized: 'Specialist or technical field pivot',
  },
  {
    aspect: 'Format Options',
    mba: 'Full-time, part-time, executive, online, hybrid',
    specialized: 'Full-time, part-time, online, hybrid',
  },
  {
    aspect: 'Typical Cost Range',
    mba: 'Varies widely by institution',
    specialized: 'Varies widely by institution',
  },
];

/** 6 numbered steps for the graduate admission checklist */
const admissionSteps: { title: string; description: string }[] = [
  {
    title: "Review bachelor's transcript requirements",
    description:
      "Confirm your regionally accredited bachelor's transcript meets the program's minimum GPA and any prerequisite coursework expectations before applying.",
  },
  {
    title: 'Check GRE/GMAT waiver policies',
    description:
      'Many programs waive standardized test requirements for veterans with professional experience. Always ask admissions — never assume.',
  },
  {
    title: 'Prepare letters of recommendation',
    description:
      'Identify 2–3 recommenders who can speak to your leadership, work ethic, or academic ability. Military supervisors and faculty are both valid choices.',
  },
  {
    title: 'Write a statement of purpose',
    description:
      'Your statement should connect your military leadership experience to your graduate goals. Be specific about the role or field you want next — not just the credential.',
  },
  {
    title: 'Submit resume/CV',
    description:
      'Treat your military experience as professional experience. Translate roles, responsibilities, and outcomes into civilian-readable language.',
  },
  {
    title: 'Meet application deadlines',
    description:
      'Graduate deadlines are often earlier and stricter than undergraduate. Track each program\u2019s priority, regular, and final deadlines separately.',
  },
];

/** Schedule cards: full-time vs part-time */
const scheduleCards: {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}[] = [
  {
    icon: Clock,
    title: 'Full-Time',
    description:
      'Maximum course load each term. Fastest path to completion, but demands the most weekly time and may limit work or family flexibility.',
    color: CYAN,
  },
  {
    icon: CalendarClock,
    title: 'Part-Time',
    description:
      'Reduced course load spread across more terms. Slower completion but more flexibility for working professionals, family obligations, or drill schedules.',
    color: GOLD,
  },
];

/** Cost factors for graduate study */
const costFactors: {
  icon: LucideIcon;
  label: string;
  description: string;
}[] = [
  {
    icon: DollarSign,
    label: 'Tuition per credit',
    description:
      'The base cost per credit hour. Multiply by total credits required for the degree to estimate tuition expense.',
  },
  {
    icon: FileText,
    label: 'Total credits',
    description:
      'Most graduate programs require between 30 and 60 credits. Total credits directly drive total tuition cost.',
  },
  {
    icon: Briefcase,
    label: 'Fees',
    description:
      'Technology, lab, registration, and graduation fees. Often billed per term rather than per credit.',
  },
  {
    icon: BookOpen,
    label: 'Books & materials',
    description:
      'Required textbooks, access codes, and software. Some programs include materials; most bill them separately.',
  },
];

/** 4 FAQ Q&As */
const faqs: { q: string; a: string }[] = [
  {
    q: 'Do I need the GMAT or GRE for admission?',
    a: "Many programs offer waivers, especially for veterans with professional experience. Check with each institution's admissions office.",
  },
  {
    q: 'Can my military experience count toward a master\u2019s degree?',
    a: 'Some programs evaluate military training for transfer credit. Request your JST and ask admissions about their credit evaluation policy.',
  },
  {
    q: 'What\u2019s the difference between an MBA and a specialized master\u2019s?',
    a: 'An MBA provides broad business leadership skills. A specialized master\u2019s (like MS in CS or Data Analytics) focuses on a specific field. Your career goals should guide the choice.',
  },
  {
    q: 'Are online master\u2019s programs eligible for VA benefits?',
    a: "Benefit eligibility depends on the program's approval status and your enrollment. Verify with the VA and the institution's School Certifying Official.",
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

export default function VeteranMastersPage() {
  /* ── CTA handlers with analytics ── */
  const handleAssessmentCta = (source: string) => {
    track.ctaClick({
      cta_type: 'assessment',
      cta_source: source,
      cta_text: 'COMPARE GRADUATE PROGRAMS',
    });
    navTo('assessment')();
  };

  const handleClosingAssessmentCta = () => {
    track.ctaClick({
      cta_type: 'assessment',
      cta_source: 'veteran_masters_closing_primary',
      cta_text: 'START FREE ASSESSMENT',
    });
    navTo('assessment')();
  };

  const handlePhoneCta = () => {
    track.ctaClick({
      cta_type: 'phone',
      cta_source: 'veteran_masters_closing_secondary',
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
        aria-labelledby="masters-hero-heading"
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
                Master&apos;s &amp; MBA
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
                <GraduationCap className="h-5 w-5" style={{ color: GOLD }} aria-hidden="true" />
                <span
                  className="text-xs font-semibold uppercase tracking-[0.22em]"
                  style={{ color: GOLD }}
                >
                  GRADUATE DEGREE PLANNING
                </span>
              </div>

              <h1
                id="masters-hero-heading"
                className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
              >
                Master&apos;s &amp; MBA Degree Planning{' '}
                <span style={{ color: GOLD }}>for Veterans</span>
              </h1>

              <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">
                Compare MBA and specialized master&apos;s programs. Understand admission
                requirements, format options, and how your military experience translates to
                graduate-level leadership.
              </p>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => handleAssessmentCta('veteran_masters_hero_primary')}
                  className="group inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold shadow-lg transition-all duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071B35] sm:text-base"
                  style={{
                    backgroundColor: GOLD,
                    color: NAVY,
                    ['--tw-ring-color' as string]: CYAN,
                  } as React.CSSProperties}
                >
                  COMPARE GRADUATE PROGRAMS
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
                  alt="Graduation cap and compass on a college campus — symbolizing graduate degree planning for veterans"
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
      {/*  Author byline                                                 */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <AuthorByline />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  3. MBA vs Specialized Master's Comparison Table                */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-20 lg:py-24"
        aria-labelledby="masters-comparison-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="KEY DECISION"
            title={
              <span id="masters-comparison-heading">
                MBA or Specialized Master&apos;s?
              </span>
            }
            description="Two paths serving different career outcomes. The right choice depends on whether you want broad leadership training or deep technical specialization."
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
                      MBA
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-4 font-heading text-sm font-semibold uppercase tracking-wider text-white sm:px-6 sm:text-base"
                    >
                      Specialized Master&apos;s (MS, MSCS, etc.)
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
                        {row.mba}
                      </td>
                      <td className="border-t border-gray-200 px-4 py-4 align-top leading-relaxed text-gray-700 sm:px-6">
                        {row.specialized}
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
            style={{ backgroundColor: CLOUD, borderLeft: `4px solid ${CYAN}` }}
          >
            <p className="text-sm leading-relaxed text-gray-600">
              <strong className="text-[#071B35]">Note:</strong> Program details vary by
              institution. Contact the school for current information on duration, prerequisites,
              format availability, and cost.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  4. Admission Checklist — "What You'll Need to Apply"           */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-20 lg:py-24"
        style={{ backgroundColor: CLOUD }}
        aria-labelledby="masters-admission-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="ADMISSION CHECKLIST"
            title={
              <span id="masters-admission-heading">What You&apos;ll Need to Apply</span>
            }
            description="Graduate admission is document-driven. Gather these materials before applying — and ask admissions about veteran-specific waivers."
            textColor="text-[#071B35]"
            descColor="text-gray-600"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {admissionSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
              >
                <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#39C5E8] text-base font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-bold text-[#071B35]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Application fee waiver note */}
          <motion.div
            {...reveal}
            className="mx-auto mt-10 max-w-3xl rounded-r-lg p-4"
            style={{ backgroundColor: '#FFFFFF', borderLeft: `4px solid ${GOLD}` }}
          >
            <p className="text-sm leading-relaxed text-gray-600">
              <ClipboardList
                className="mr-1.5 inline h-4 w-4 align-text-bottom"
                style={{ color: GOLD }}
                aria-hidden="true"
              />
              <strong className="text-[#071B35]">Tip:</strong> Some programs offer application fee
              waivers for veterans. Ask admissions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  5. Schedule & Cost Section — "Time and Investment"             */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-20 lg:py-24"
        aria-labelledby="masters-schedule-cost-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="TIME AND INVESTMENT"
            title={
              <span id="masters-schedule-cost-heading">
                Schedule &amp; Cost Considerations
              </span>
            }
            description="Tuition per credit is just one line. Add total credits, fees, and books to see the real picture — and verify how your VA education benefits may apply."
            textColor="text-[#071B35]"
            descColor="text-gray-600"
          />

          {/* Schedule cards: Full-Time vs Part-Time */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16">
            {scheduleCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                >
                  <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7">
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${card.color}15` }}
                      >
                        <Icon className="h-6 w-6" style={{ color: card.color }} aria-hidden="true" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-[#071B35]">{card.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">{card.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Cost factors grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {costFactors.map((factor, i) => {
              const Icon = factor.icon;
              return (
                <motion.div
                  key={factor.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                >
                  <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md">
                    <div
                      className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${CYAN}15` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: CYAN }} aria-hidden="true" />
                    </div>
                    <h3 className="font-heading text-sm font-bold text-[#071B35]">{factor.label}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-gray-600">
                      {factor.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Tuition / benefit compliance statement */}
          <motion.div
            {...reveal}
            className="mx-auto mt-10 max-w-3xl rounded-r-lg p-4"
            style={{ backgroundColor: CLOUD, borderLeft: `4px solid ${CYAN}` }}
          >
            <p className="text-sm leading-relaxed text-gray-600">
              <strong className="text-[#071B35]">Tuition varies by institution.</strong> Contact
              institution for current tuition rates. VA education benefits may help offset costs —
              verify with the VA before enrolling.
            </p>
          </motion.div>

          <motion.div {...reveal} className="mt-8 text-center">
            <button
              type="button"
              onClick={navTo('cost-planning')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline"
              style={{ color: CYAN }}
            >
              Cost Planning Guide →
            </button>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* Related Pages */}
      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="font-heading text-xl font-bold text-[#071B35]">Related Pages</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <a href="/veterans/online-hybrid-degrees" className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 text-sm text-[#39C5E8] hover:border-[#39C5E8] hover:bg-[#F8FAFC]">Online & Hybrid Options →</a>
          <a href="/veterans/program-comparison" className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 text-sm text-[#39C5E8] hover:border-[#39C5E8] hover:bg-[#F8FAFC]">Compare Programs →</a>
          <a href="/veterans/cost-planning" className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 text-sm text-[#39C5E8] hover:border-[#39C5E8] hover:bg-[#F8FAFC]">Education Cost Planning →</a>
        </div>
      </section>

      {/*  6. FAQ (4 Q&As using <details>/<summary>)                      */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-20 lg:py-24"
        style={{ backgroundColor: CLOUD }}
        aria-labelledby="masters-faq-heading"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FREQUENTLY ASKED"
            title={<span id="masters-faq-heading">Master&apos;s &amp; MBA FAQ</span>}
            description="Quick, plain-English answers to the questions veterans ask us most about graduate degree planning."
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
      {/*  7. Closing CTA                                                  */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
        style={{ backgroundColor: NAVY }}
        aria-labelledby="masters-closing-heading"
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
              <Compass className="h-5 w-5" style={{ color: GOLD }} aria-hidden="true" />
              <span
                className="text-xs font-semibold uppercase tracking-[0.22em]"
                style={{ color: GOLD }}
              >
                YOUR NEXT MISSION STARTS HERE
              </span>
            </div>

            <h2
              id="masters-closing-heading"
              className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
            >
              Ready to Compare Graduate Programs?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              Start with a no-pressure assessment of your goals, prior learning, and the
              graduate-degree pathways that fit your next chapter — or talk with an advisor who
              understands military-connected students.
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
      {/*  8. Compliance disclosure (shared component)                    */}
      {/* ════════════════════════════════════════════════════════════ */}
      <ComplianceDisclosure />
    </div>
  );
}
