'use client';

/* ===================================================================================
 *  VeteranBachelorsPage — Bachelor's & Degree Completion Options for Veterans
 *  Route: /veterans/bachelors-degree
 *  Design system: deep navy #071B35 · gold #D6A84B · cyan #39C5E8 · white/#F8FAFC
 *  Standalone page (does NOT use VeteranInfoPage wrapper — new design system).
 * =================================================================================== */

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Phone,
  MessageCircle,
  Mail,
  Shield,
  ChevronDown,
  CheckCircle2,
  type LucideIcon,
  Compass,
  GraduationCap,
  Globe,
  Building2,
  Landmark,
  DollarSign,
  BookOpen,
  Home as HomeIcon,
  Truck,
  Clock,
  FileText,
  HelpCircle,
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

const HERO_IMAGE = '/images/hero-veteran-campus.jpg?v=1';

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

/** 6 questions to ask admissions — checkmark list */
const admissionsQuestions: string[] = [
  'Do you accept the Joint Services Transcript (JST) for credit evaluation, and how is it reviewed?',
  'What is your institution\'s maximum transfer-credit cap, and does it vary by program?',
  'What is your residency requirement — the minimum number of credits I must complete here?',
  'Do you award credit for CLEP, DSST, or prior learning assessment (PLA) portfolios?',
  'How are credits evaluated for military occupations versus traditional classroom courses?',
  'Can I request a pre-admission credit evaluation before formally applying?',
];

/** 6 numbered steps for the degree-completion checklist */
const completionSteps: { title: string; description: string }[] = [
  {
    title: 'Request your JST and college transcripts',
    description:
      'Order your Joint Services Transcript through the official JST portal, and request official transcripts from every prior college or university you attended — even one or two courses can matter.',
  },
  {
    title: 'Identify degree-completion programs',
    description:
      'Look for regionally accredited institutions with explicit degree-completion pathways for non-traditional and military-connected students, and a major that fits your goals.',
  },
  {
    title: 'Compare transfer-credit policies',
    description:
      'Ask each institution for its transfer-credit policy in writing — caps, residency requirement, and how military and prior-learning credits are evaluated differ school to school.',
  },
  {
    title: 'Evaluate online, hybrid, and on-campus formats',
    description:
      'Compare program format against your schedule, learning style, and benefit eligibility. Each format has different implications for residency, engagement, and VA benefits.',
  },
  {
    title: 'Estimate total remaining cost',
    description:
      'Add tuition per credit, fees, books, and any housing or transportation costs against your available education resources — before any enrollment commitment.',
  },
  {
    title: 'Apply and enroll',
    description:
      'Once you know what transfers, what it costs, and how the program fits your life, apply with a clear, written plan — not a guess.',
  },
];

/** Three study-format cards with pros/cons */
const studyFormats: {
  icon: LucideIcon;
  title: string;
  description: string;
  pros: string[];
  cons: string[];
}[] = [
  {
    icon: Globe,
    title: 'Online',
    description:
      'Fully asynchronous or cohort-based remote coursework. Maximum flexibility for students balancing work, family, or drill weekends.',
    pros: [
      'Study on your own schedule',
      'No commute or relocation required',
      'Often the lowest total cost of attendance',
    ],
    cons: [
      'Requires strong self-discipline',
      'Less in-person networking',
      'Benefit eligibility may differ — verify with the VA',
    ],
  },
  {
    icon: Building2,
    title: 'Hybrid',
    description:
      'A blend of online and in-person sessions. Best for programs that require occasional labs, studios, clinicals, or proctored exams.',
    pros: [
      'Balances flexibility with structure',
      'Some in-person access to faculty and cohort',
      'Useful for clinical, lab, or studio programs',
    ],
    cons: [
      'Requires periodic campus attendance',
      'Schedule is less flexible than fully online',
      'Travel or lodging may be needed on class days',
    ],
  },
  {
    icon: Landmark,
    title: 'On-Campus',
    description:
      'Traditional in-seat learning. Strongest cohort, faculty access, and campus resources — but requires geographic relocation or commute.',
    pros: [
      'Strongest cohort and peer network',
      'Direct faculty and advisor access',
      'Full access to campus facilities and resources',
    ],
    cons: [
      'Fixed schedule — less flexible',
      'Requires commute or relocation',
      'Often the highest total cost of attendance',
    ],
  },
];

/** Cost factors for cost-planning section */
const costFactors: {
  icon: LucideIcon;
  label: string;
  description: string;
}[] = [
  {
    icon: DollarSign,
    label: 'Tuition per credit',
    description:
      'The base cost per credit hour. Multiply by remaining credits needed to complete the degree.',
  },
  {
    icon: FileText,
    label: 'Fees',
    description:
      'Technology, lab, registration, and graduation fees. Often billed per term — not per credit.',
  },
  {
    icon: BookOpen,
    label: 'Books & materials',
    description:
      'Required textbooks, access codes, and software. Some programs include materials; others bill separately.',
  },
  {
    icon: HomeIcon,
    label: 'Housing',
    description:
      'On-campus housing, off-campus rent, or housing allowance implications for your benefit eligibility.',
  },
  {
    icon: Truck,
    label: 'Transportation',
    description:
      'Commute, parking, or relocation costs — relevant for hybrid and on-campus programs.',
  },
  {
    icon: Clock,
    label: 'Opportunity cost',
    description:
      'Time spent in school is time not spent earning. Consider how program length and intensity affect your income.',
  },
];

/** 4 FAQ Q&As */
const faqs: { q: string; a: string }[] = [
  {
    q: 'Can I transfer my military training for college credit?',
    a: 'Each institution evaluates military training independently. Request your JST and ask admissions about their credit evaluation policy.',
  },
  {
    q: 'How long does degree completion take?',
    a: 'Completion time depends on your transfer credits, program structure, and enrollment status (full-time or part-time). Contact the institution for a personalized timeline.',
  },
  {
    q: 'Are online programs eligible for VA benefits?',
    a: 'Benefit eligibility depends on the program\'s approval status and your enrollment. Verify with the VA and the institution\'s School Certifying Official.',
  },
  {
    q: 'What if I don\'t have any prior college credits?',
    a: 'Many programs accept students with no prior college credit. Some institutions offer credit for military training and experience through JST evaluation.',
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

export default function VeteranBachelorsPage() {
  /* ── CTA handlers with analytics ── */
  const handleAssessmentCta = (source: string) => {
    track.ctaClick({
      cta_type: 'assessment',
      cta_source: source,
      cta_text: 'BUILD MY DEGREE COMPLETION PLAN',
    });
    navTo('assessment')();
  };

  const handleClosingAssessmentCta = () => {
    track.ctaClick({
      cta_type: 'assessment',
      cta_source: 'veteran_bachelors_closing_primary',
      cta_text: 'START FREE ASSESSMENT',
    });
    navTo('assessment')();
  };

  const handlePhoneCta = () => {
    track.ctaClick({
      cta_type: 'phone',
      cta_source: 'veteran_bachelors_closing_secondary',
      cta_text: 'TALK WITH AN ADVISOR',
      cta_url: PHONE_HREF,
    });
    // native tel: link will handle the navigation
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ════════════════════════════════════════════════════════════ */}
      {/*  1. Breadcrumb + 2. Hero (two-column: text left, image right)   */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: NAVY }}
        aria-labelledby="bachelors-hero-heading"
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
                Bachelor&apos;s &amp; Completion
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
                  BACHELOR&apos;S DEGREE COMPLETION
                </span>
              </div>

              <h1
                id="bachelors-hero-heading"
                className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
              >
                Bachelor&apos;s &amp; Degree Completion Options{' '}
                <span style={{ color: GOLD }}>for Veterans</span>
              </h1>

              <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">
                Finish what you started — or start fresh. Compare degree-completion pathways that
                may credit your military training, prior coursework, and professional experience.
              </p>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => handleAssessmentCta('veteran_bachelors_hero_primary')}
                  className="group inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold text-[#071B35] shadow-lg transition-all duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071B35] sm:text-base"
                  style={{
                    backgroundColor: GOLD,
                    color: NAVY,
                    // override focus ring color inline
                    ...( { '--tw-ring-color': CYAN } as React.CSSProperties),
                  }}
                >
                  BUILD MY DEGREE COMPLETION PLAN
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
                  WhatsApp
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
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={HERO_IMAGE}
                  alt="Graduation cap and compass on a college campus — symbolizing veteran degree completion planning"
                  className="h-full w-full object-cover aspect-[4/3] sm:aspect-[16/10]"
                  loading="eager"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  3. Previous Learning Guidance                                   */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-20 lg:py-24"
        aria-labelledby="bachelors-previous-learning-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="PRIOR LEARNING"
            title={
              <span id="bachelors-previous-learning-heading">
                Your Previous Learning May Count
              </span>
            }
            description="Your military training, prior college coursework, and professional experience may be eligible for college credit. Each institution evaluates prior learning independently — UCSG cannot guarantee that any specific credit will transfer."
            textColor="text-[#071B35]"
            descColor="text-gray-600"
          />

          <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-12">
            {/* Left: explanation + compliance callout */}
            <motion.div {...reveal}>
              <p className="text-base leading-relaxed text-gray-700">
                Before applying anywhere, gather the documentation that institutions use to evaluate
                prior learning:
              </p>

              <ul className="mt-5 space-y-3">
                {[
                  'Joint Services Transcript (JST) — the official transcript for Army, Coast Guard, Marine Corps, and Navy personnel, including ACE-recommended credit.',
                  'Official transcripts from every prior college or university attended — even one or two completed courses can matter.',
                  'CLEP and DSST (DANTES) exam scores — standardized tests that many colleges accept for credit.',
                  'Prior Learning Assessment (PLA) portfolios — documented professional or military experience evaluated for credit.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0"
                      style={{ color: CYAN }}
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Compliance callout — non-guarantee statement */}
              <div
                className="mt-6 rounded-r-lg p-4"
                style={{ backgroundColor: CLOUD, borderLeft: `4px solid ${CYAN}` }}
              >
                <p className="text-sm font-medium leading-relaxed text-[#071B35]">
                  Each institution sets its own transfer-credit policy. UCSG cannot guarantee that
                  credits will transfer.
                </p>
              </div>
            </motion.div>

            {/* Right: 6 questions to ask admissions */}
            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
                <div className="mb-4 flex items-center gap-2.5">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${CYAN}15` }}
                  >
                    <HelpCircle className="h-5 w-5" style={{ color: CYAN }} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#071B35]">
                    6 Questions to Ask Admissions
                  </h3>
                </div>

                <ul className="space-y-3">
                  {admissionsQuestions.map((q) => (
                    <li key={q} className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0"
                        style={{ color: CYAN }}
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed text-gray-700">{q}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={navTo('military-transfer-credit')}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline"
                  style={{ color: CYAN }}
                >
                  Military Transfer Credit Guide →
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  4. Degree-Completion Checklist                                  */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-20 lg:py-24"
        style={{ backgroundColor: CLOUD }}
        aria-labelledby="bachelors-checklist-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="THE PROCESS"
            title={
              <span id="bachelors-checklist-heading">Steps to Complete Your Bachelor&apos;s</span>
            }
            description="A structured path from where you are now to a confident enrollment decision — without making promises about transfer credit or completion time."
            textColor="text-[#071B35]"
            descColor="text-gray-600"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {completionSteps.map((step, i) => (
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
                      {step.title.split(' ')[0].replace('.', '')}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-bold text-[#071B35]">
                    {step.title.replace(/^\d+\.\s*/, '')}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Compliance note: no universal transfer-credit percentage or completion time */}
          <motion.div
            {...reveal}
            className="mx-auto mt-12 max-w-3xl rounded-r-lg p-4"
            style={{ backgroundColor: '#FFFFFF', borderLeft: `4px solid ${GOLD}` }}
          >
            <p className="text-sm leading-relaxed text-gray-600">
              <strong className="text-[#071B35]">Note:</strong> UCSG does not publish a universal
              transfer-credit percentage or estimated completion time. Both vary by institution,
              program, and the credits you bring. Contact the institution for a personalized
              evaluation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  5. Three Study-Format Cards                                    */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-20 lg:py-24"
        aria-labelledby="bachelors-format-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="CHOOSE YOUR FORMAT"
            title={<span id="bachelors-format-heading">Online, Hybrid, or On-Campus</span>}
            description="Each format fits a different lifestyle. Each also has different implications for how your benefits apply — verify with your DSO before deciding."
            textColor="text-[#071B35]"
            descColor="text-gray-600"
          />

          <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3">
            {studyFormats.map((fmt, i) => {
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

                    {/* Pros */}
                    <div className="mt-5">
                      <p
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: CYAN }}
                      >
                        Pros
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {fmt.pros.map((p) => (
                          <li key={p} className="flex items-start gap-2">
                            <CheckCircle2
                              className="mt-0.5 h-4 w-4 shrink-0"
                              style={{ color: CYAN }}
                              aria-hidden="true"
                            />
                            <span className="text-sm leading-relaxed text-gray-700">{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Cons */}
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Considerations
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {fmt.cons.map((c) => (
                          <li key={c} className="flex items-start gap-2">
                            <span
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ backgroundColor: GOLD }}
                              aria-hidden="true"
                            />
                            <span className="text-sm leading-relaxed text-gray-600">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Benefits note */}
          <motion.div
            {...reveal}
            className="mx-auto mt-10 max-w-2xl text-center"
          >
            <p className="text-sm leading-relaxed text-gray-600">
              <Shield
                className="mr-1.5 inline h-4 w-4 align-text-bottom"
                style={{ color: GOLD }}
                aria-hidden="true"
              />
              Benefits can be affected by program and enrollment circumstances. Verify with your
              DSO.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  6. Cost Planning Section                                        */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-20 lg:py-24"
        style={{ backgroundColor: CLOUD }}
        aria-labelledby="bachelors-cost-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="COST PLANNING"
            title={<span id="bachelors-cost-heading">Understand Total Degree Cost</span>}
            description="Tuition per credit is just one line. Add fees, books, housing, transportation, and opportunity cost to see the real picture — before any enrollment commitment."
            textColor="text-[#071B35]"
            descColor="text-gray-600"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
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
                  <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
                    <div className="mb-3 flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${CYAN}15` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: CYAN }} aria-hidden="true" />
                      </div>
                      <h3 className="font-heading text-base font-bold text-[#071B35]">
                        {factor.label}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">{factor.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Tuition rate compliance statement */}
          <motion.div
            {...reveal}
            className="mx-auto mt-10 max-w-3xl rounded-r-lg p-4"
            style={{ backgroundColor: '#FFFFFF', borderLeft: `4px solid ${CYAN}` }}
          >
            <p className="text-sm leading-relaxed text-gray-600">
              <strong className="text-[#071B35]">Tuition varies by institution.</strong>{' '}
              Contact institution for current tuition rates. UCSG does not publish tuition figures —
              they change frequently and depend on program, residency, and enrollment.
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
          <a href="/veterans/military-transfer-credit" className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 text-sm text-[#39C5E8] hover:border-[#39C5E8] hover:bg-[#F8FAFC]">Military & Transfer Credit →</a>
          <a href="/veterans/cost-planning" className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 text-sm text-[#39C5E8] hover:border-[#39C5E8] hover:bg-[#F8FAFC]">Education Cost Planning →</a>
          <a href="/veterans/choosing-a-school" className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 text-sm text-[#39C5E8] hover:border-[#39C5E8] hover:bg-[#F8FAFC]">Choosing the Right School →</a>
        </div>
      </section>

      {/*  7. FAQ (4 Q&As using <details>/<summary>)                      */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-20 lg:py-24"
        aria-labelledby="bachelors-faq-heading"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FREQUENTLY ASKED"
            title={<span id="bachelors-faq-heading">Bachelor&apos;s Completion FAQ</span>}
            description="Quick, plain-English answers to the questions veterans ask us most about completing a bachelor's degree."
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
        aria-labelledby="bachelors-closing-heading"
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
              id="bachelors-closing-heading"
              className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
            >
              Ready to Build Your Completion Plan?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              Start with a no-pressure assessment of your goals, prior learning, and the
              degree-completion pathways that may fit your next chapter — or talk with an advisor
              who understands military-connected students.
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
