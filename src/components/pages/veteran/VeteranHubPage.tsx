'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowLeft,
  Phone,
  Shield,
  ShieldCheck,
  Award,
  Eye,
  HandHeart,
  GraduationCap,
  Briefcase,
  Trophy,
  Globe,
  FileText,
  Users,
  Calendar,
  ExternalLink,
  ChevronRight,
  Sparkles,
  BookOpen,
  Compass,
  AlertTriangle,
  Target,
  Search,
  ClipboardCheck,
  Scale,
  DollarSign,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedHeading } from '@/components/animations/TextReveal';
import { track } from '@/lib/analytics';
import { ComplianceDisclosure } from './VeteranInfoPage';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ------------------------------------------------------------------ */
/*  Section A — Veteran-Led Trust                                     */
/* ------------------------------------------------------------------ */

const veteranPillars = [
  {
    icon: Shield,
    title: 'Service',
    description:
      'A mission-first mindset instilled by military service. We treat every student engagement as a commitment — not a transaction.',
    color: '#061846',
  },
  {
    icon: ShieldCheck,
    title: 'Integrity',
    description:
      'Honest guidance even when it means telling you what you don\'t want to hear. No inflated promises, no marketing spin.',
    color: '#0874F9',
  },
  {
    icon: Eye,
    title: 'Clarity',
    description:
      'Education planning is full of jargon, acronyms, and disclaimers. We translate it into plain English so you can decide with confidence.',
    color: '#D6A84B',
  },
  {
    icon: HandHeart,
    title: 'Student-First',
    description:
      'Your goals come first — not a partner school\'s enrollment targets. We work for you, not for any institution.',
    color: '#059669',
  },
];

/* ------------------------------------------------------------------ */
/*  Section B — Where Are You In Your Journey?                         */
/* ------------------------------------------------------------------ */

const journeyCards = [
  {
    icon: GraduationCap,
    title: 'Finish My Bachelor\'s',
    description:
      'You have prior college credit, military training, or life experience. We help you map a path to degree completion.',
    ctaText: 'Explore Bachelor\'s Options',
    navigate: { view: 'veterans', id: 'bachelors-degree' },
    color: '#0874F9',
  },
  {
    icon: Briefcase,
    title: 'Master\'s or MBA',
    description:
      'Ready to advance your career or pivot into a new field. We help you compare MBA and specialized master\'s programs.',
    ctaText: 'Compare Graduate Programs',
    navigate: { view: 'veterans', id: 'masters-mba' },
    color: '#061846',
  },
  {
    icon: Globe,
    title: 'Flexible / Online / Hybrid',
    description:
      'Juggling work, family, or drill weekends? Online and hybrid formats may fit your life — but benefits can vary.',
    ctaText: 'Compare Flexible Programs',
    navigate: { view: 'veterans', id: 'online-hybrid-degrees' },
    color: '#0874F9',
  },
  {
    icon: ShieldCheck,
    title: 'Understand My Benefits',
    description:
      'Confused about VA education benefits? We point you to the official sources — the VA decides everything.',
    ctaText: 'See Education Resources',
    navigate: { view: 'veterans', id: 'education-benefits' },
    color: '#061846',
  },
  {
    icon: FileText,
    title: 'Military Transfer Credit',
    description:
      'Your JST and prior learning may shorten your degree — but only a registrar decides what counts.',
    ctaText: 'Understand Transfer Credit',
    navigate: { view: 'veterans', id: 'military-transfer-credit' },
    color: '#D6A84B',
  },
];

/* ------------------------------------------------------------------ */
/*  Section C — Degree Paths                                          */
/* ------------------------------------------------------------------ */

const degreePaths = [
  {
    icon: GraduationCap,
    title: 'Bachelor\'s Degree',
    tagline: 'Degree Completion',
    description:
      'Build on prior college credits and military training toward a regionally accredited bachelor\'s degree.',
    features: ['Credit transfer review', 'Degree-completion planning', 'Online / hybrid / on-campus'],
    navigate: { view: 'veterans', id: 'bachelors-degree' },
    color: '#0874F9',
    badge: 'Most Common',
  },
  {
    icon: Briefcase,
    title: 'Master\'s / MBA',
    tagline: 'Graduate Advancement',
    description:
      'Sharpen your leadership, deepen technical skill, or pivot into a new career lane with a master\'s degree.',
    features: ['MBA vs. specialized MS', 'Full-time / part-time / online', 'Career-outcome planning'],
    navigate: { view: 'veterans', id: 'masters-mba' },
    color: '#061846',
    badge: 'Career Pivot',
  },
  {
    icon: Globe,
    title: 'Online / Hybrid Degrees',
    tagline: 'Maximum Flexibility',
    description:
      'For working adults, parents, and reservists. Compare accredited online, hybrid, and cohort programs.',
    features: ['Asynchronous vs. synchronous', 'Working-professional formats', 'Benefit implications'],
    navigate: { view: 'veterans', id: 'online-hybrid-degrees' },
    color: '#0874F9',
    badge: 'Most Flexible',
  },
];

/* ------------------------------------------------------------------ */
/*  Section D — Education Benefits                                    */
/* ------------------------------------------------------------------ */

const benefitSources = [
  {
    icon: ShieldCheck,
    title: 'VA Education Benefits',
    description:
      'The official VA portal for all education benefit programs. The single source of truth for eligibility and entitlement.',
    href: 'https://www.va.gov/education',
    linkLabel: 'va.gov/education',
    color: '#061846',
  },
  {
    icon: Award,
    title: 'Yellow Ribbon Program',
    description:
      'A voluntary agreement between schools and the VA to help cover tuition that exceeds the in-state public-school cap.',
    href: 'https://www.va.gov/education/about-yellow-ribbon-program/',
    linkLabel: 'va.gov/yellow-ribbon',
    color: '#D6A84B',
  },
  {
    icon: HandHeart,
    title: 'Veterans Readiness & Employment (VR&E)',
    description:
      'For veterans with service-connected disabilities. Helps with education, training, and employment services.',
    href: 'https://www.va.gov/education/about-vocational-rehabilitation/',
    linkLabel: 'va.gov/vre',
    color: '#0874F9',
  },
];

/* ------------------------------------------------------------------ */
/*  Section F — Choosing a School                                     */
/* ------------------------------------------------------------------ */

const choosingSchool = [
  {
    icon: Compass,
    title: 'Degree Fit',
    description: 'Does the program\'s curriculum, outcomes, and culture actually align with your career goal?',
    color: '#0874F9',
  },
  {
    icon: ShieldCheck,
    title: 'Accreditation',
    description: 'Regional accreditation matters most. National accreditation can limit credit transfer.',
    color: '#061846',
  },
  {
    icon: Globe,
    title: 'Format',
    description: 'Online, hybrid, or on-campus — does it fit your work, family, and benefit-eligibility situation?',
    color: '#D6A84B',
  },
  {
    icon: DollarSign,
    title: 'Cost',
    description: 'Tuition, fees, books, and total cost of attendance — mapped against your available resources.',
    color: '#0874F9',
  },
  {
    icon: FileText,
    title: 'Transfer Policy',
    description: 'How much prior credit does the school accept? Ask for a pre-admission credit evaluation.',
    color: '#061846',
  },
  {
    icon: Users,
    title: 'Veteran Services',
    description: 'Does the school have a dedicated veterans office? A certifying official? A peer veteran community?',
    color: '#D6A84B',
  },
  {
    icon: Briefcase,
    title: 'Career Alignment',
    description: 'Where do graduates actually go? Ask for outcome data — not placement rate marketing claims.',
    color: '#0874F9',
  },
];

/* ------------------------------------------------------------------ */
/*  Section G — Planning Process                                      */
/* ------------------------------------------------------------------ */

const planningSteps = [
  {
    icon: Target,
    label: 'Tell Us Your Goal',
    description: 'Start with a free, no-obligation assessment of your goals and prior learning.',
    color: '#0874F9',
  },
  {
    icon: ClipboardCheck,
    label: 'Review Background',
    description: 'We help organize transcripts, JST, prior learning, and academic history.',
    color: '#061846',
  },
  {
    icon: Scale,
    label: 'Compare Programs',
    description: 'Compare accredited programs side-by-side across degree fit, format, cost, and outcomes.',
    color: '#D6A84B',
  },
  {
    icon: DollarSign,
    label: 'Understand Costs',
    description: 'Map total cost against your resources. Verify benefit eligibility with the VA.',
    color: '#0874F9',
  },
  {
    icon: Compass,
    label: 'Select Next Step',
    description: 'You decide which programs to pursue. We help you build a clear, prioritized list.',
    color: '#061846',
  },
  {
    icon: FileText,
    label: 'Application Support',
    description: 'We help organize applications and timelines — without writing essays for you.',
    color: '#D6A84B',
  },
];

/* ------------------------------------------------------------------ */
/*  Section H — Resource Center                                      */
/* ------------------------------------------------------------------ */

const resourceCategories = [
  'All Resources',
  'Benefits & GI Bill®',
  'Degree Planning',
  'Transfer Credit',
  'Online / Hybrid',
  'Career Planning',
];

const resourceArticles = [
  {
    category: 'Benefits & GI Bill®',
    title: 'Understanding VA Education Benefits: The Official Sources',
    description:
      'A clear guide to the VA.gov resources that determine your eligibility, entitlement, and benefit usage.',
    readTime: '6 min read',
    color: '#061846',
  },
  {
    category: 'Degree Planning',
    title: 'Choosing Between a Bachelor\'s or Master\'s Degree',
    description:
      'A framework for matching your career outcome to the right degree level — not just the next credential.',
    readTime: '8 min read',
    color: '#0874F9',
  },
  {
    category: 'Transfer Credit',
    title: 'How Military Training May Count Toward Your Degree',
    description:
      'How the Joint Services Transcript (JST) and prior learning assessments work — and what they don\'t guarantee.',
    readTime: '7 min read',
    color: '#D6A84B',
  },
  {
    category: 'Online / Hybrid',
    title: 'Online vs. Hybrid vs. On-Campus: What Fits Your Life?',
    description:
      'A comparison of format, cost, time-to-completion, and benefit implications across program structures.',
    readTime: '5 min read',
    color: '#059669',
  },
  {
    category: 'Career Planning',
    title: 'Matching Your Degree to a Civilian Career Outcome',
    description:
      'Practical frameworks for translating a degree choice into a specific role, industry, or function.',
    readTime: '9 min read',
    color: '#061846',
  },
  {
    category: 'Benefits & GI Bill®',
    title: 'Yellow Ribbon Program: What It Is and How It Works',
    description:
      'How the Yellow Ribbon Program helps cover tuition that exceeds the in-state public-school cap.',
    readTime: '4 min read',
    color: '#D6A84B',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

interface Props {
  onBack?: () => void;
}

export default function VeteranHubPage({ onBack }: Props) {
  /* ----------------------------- Handlers ----------------------------- */

  const handleBack = () => {
    if (onBack) return onBack();
    window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'home' } }));
  };

  const handleNavigate = (target: { view: string; id?: string }) => {
    track.navClick({
      nav_type: 'veteran_hub',
      nav_target: `${target.view}${target.id ? `/${target.id}` : ''}`,
    });
    window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: target }));
  };

  const handleAssessmentCta = (cta_source: string, cta_text: string) => {
    track.ctaClick({
      cta_type: 'assessment',
      cta_source,
      cta_text,
    });
    window.dispatchEvent(
      new CustomEvent('ucsg-navigate', {
        detail: { view: 'veterans', id: 'assessment' },
      })
    );
  };

  const handleBookConsultationCta = (cta_source: string, cta_text: string) => {
    track.ctaClick({
      cta_type: 'contact',
      cta_source,
      cta_text,
    });
    window.dispatchEvent(
      new CustomEvent('ucsg-navigate', {
        detail: { view: 'veterans', id: 'book-consultation' },
      })
    );
  };

  const handleExternalLink = (url: string, text: string) => {
    track.externalLink(url, text);
  };

  /* ----------------------------- Render ----------------------------- */

  return (
    <div className="min-h-screen bg-white">
      {/* ─────────── Back Bar ─────────── */}
      <motion.div
        className="border-b border-gray-100 bg-gray-50/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#061846]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </button>
        </div>
      </motion.div>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* HERO                                                              */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#061846] via-[#092B68] to-[#061846]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#D6A84B]/[0.08] blur-[120px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              className="mb-6 flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <div className="h-px w-8 bg-[#D6A84B]/50" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D6A84B]">
                FOR VETERANS &amp; MILITARY-CONNECTED STUDENTS
              </span>
              <div className="h-px w-8 bg-[#D6A84B]/50" />
            </motion.div>

            <motion.h1
              className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            >
              Your Next Mission Could{' '}
              <span className="text-[#D6A84B]">Start With Education.</span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              Whether you&apos;re finishing a degree, earning a master&apos;s, considering a
              doctorate, or simply understanding your benefits — we help you build a clear,
              honest, no-pressure plan.
            </motion.p>

            <motion.p
              className="mx-auto mt-3 text-sm font-medium uppercase tracking-wider text-[#D6A84B]/80"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              Bachelor&apos;s • Master&apos;s • MBA • Professional Programs
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row sm:gap-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              <button
                type="button"
                onClick={() =>
                  handleAssessmentCta('veteran_hero_primary', 'START MY VETERAN DEGREE ASSESSMENT')
                }
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#0874F9] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#0874F9]/25 transition-all duration-300 hover:bg-[#0660D4] hover:shadow-xl hover:shadow-[#0874F9]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061846] sm:w-auto sm:px-8"
              >
                START MY VETERAN DEGREE ASSESSMENT
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                onClick={() =>
                  handleBookConsultationCta(
                    'veteran_hero_secondary',
                    'TALK WITH A VETERAN EDUCATION ADVISOR'
                  )
                }
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061846] sm:w-auto sm:px-8"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                TALK WITH A VETERAN EDUCATION ADVISOR
              </button>
            </motion.div>

            <motion.p
              className="mt-6 text-xs text-white/50 sm:mt-8 sm:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              No enrollment commitment required.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* SECTION A — Veteran-Led Trust                                    */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="VETERAN-LED GUIDANCE"
            title="Guidance Built With a Veteran Perspective"
            description="UCSG was founded by Joy Chowdhury, U.S. Army Veteran. The discipline, integrity, and service-first mindset of military life shape every engagement we have with our students."
            badgeColor="#061846"
          />

          {/* Founder card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="mt-12 lg:mt-16"
          >
            <Card className="overflow-hidden border-[#061846]/15 bg-white shadow-md">
              <CardContent className="p-0">
                <div className="grid gap-0 lg:grid-cols-5">
                  {/* Founder image */}
                  <div className="relative lg:col-span-2">
                    <div className="relative h-64 w-full overflow-hidden lg:h-full lg:min-h-[360px]">
                      <Image
                        src="/images/founder.jpg"
                        alt="Joy Chowdhury — Founder and CEO of UCSG, U.S. Army Veteran"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-[#061846]/40 via-transparent to-transparent"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-1.5 shadow-lg">
                      <span className="text-xs font-bold text-[#061846]">U.S. Army Veteran</span>
                    </div>
                  </div>

                  {/* Founder message */}
                  <div className="lg:col-span-3 p-6 sm:p-8 lg:p-10">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#061846]">
                        <Shield className="h-5 w-5 text-white" aria-hidden="true" />
                      </div>
                      <span className="inline-block rounded-full bg-[#D6A84B]/10 px-3 py-0.5 text-[11px] font-bold uppercase tracking-widest text-[#D6A84B]">
                        Message from Our Founder
                      </span>
                    </div>
                    <p className="font-heading text-lg leading-relaxed text-[#061846] sm:text-xl">
                      <strong className="font-bold">
                        When I served in the United States Army, I learned that true leadership
                        means standing beside those you lead — not above them.
                      </strong>{' '}
                      That lesson became the foundation of UCSG. Every veteran, service member, and
                      military-connected student we serve carries a mission — and I take that mission
                      as seriously as I took my oath of service.
                    </p>

                    <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                      <div>
                        <p className="text-sm font-semibold text-[#061846]">Joy Chowdhury</p>
                        <p className="mt-0.5 text-xs text-[#6B7280]">Founder and CEO, UCSG</p>
                        <p className="mt-0.5 text-xs font-medium text-[#D6A84B]">U.S. Army Veteran</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pillars */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {veteranPillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="h-full border-transparent bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${pillar.color}10` }}
                      >
                        <Icon className="h-6 w-6" style={{ color: pillar.color }} />
                      </div>
                      <h3 className="font-heading text-base font-bold text-[#0F172A]">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                        {pillar.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* SECTION B — Where Are You In Your Journey?                       */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="START HERE"
            title="Where Are You In Your Journey?"
            description="Pick the card that sounds most like you. Each leads to a focused planning page — no commitment, no obligation."
            badgeColor="#0874F9"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {journeyCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                  whileHover={{ y: -4 }}
                >
                  <button
                    type="button"
                    onClick={() => handleNavigate(card.navigate)}
                    className="group block h-full w-full text-left"
                  >
                    <Card className="h-full border-transparent bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
                      <CardContent className="flex h-full flex-col p-6">
                        <div
                          className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                          style={{ backgroundColor: `${card.color}10` }}
                        >
                          <Icon className="h-6 w-6" style={{ color: card.color }} />
                        </div>
                        <h3 className="font-heading text-lg font-bold text-[#0F172A]">
                          {card.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7280]">
                          {card.description}
                        </p>
                        <div
                          className="mt-4 flex items-center gap-1.5 text-sm font-semibold"
                          style={{ color: card.color }}
                        >
                          {card.ctaText}
                          <ArrowRight
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* SECTION C — Degree Paths                                         */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="DEGREE PATHS"
            title="Four Paths, One Mission-First Approach"
            description="Choose a path below — each one breaks down what to consider, what to compare, and what we can (and can't) help with."
            badgeColor="#D6A84B"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {degreePaths.map((path, i) => {
              const Icon = path.icon;
              return (
                <motion.div
                  key={path.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                  whileHover={{ y: -6 }}
                >
                  <button
                    type="button"
                    onClick={() => handleNavigate(path.navigate)}
                    className="group block h-full w-full text-left"
                  >
                    <Card className="relative h-full overflow-hidden border-transparent bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
                      {/* Top accent bar */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1"
                        style={{ backgroundColor: path.color }}
                      />
                      <CardContent className="flex h-full flex-col p-6">
                        <div className="mb-3 flex items-start justify-between">
                          <div
                            className="flex h-12 w-12 items-center justify-center rounded-xl"
                            style={{ backgroundColor: `${path.color}10` }}
                          >
                            <Icon className="h-6 w-6" style={{ color: path.color }} />
                          </div>
                          <span
                            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                            style={{
                              backgroundColor: `${path.color}10`,
                              color: path.color,
                            }}
                          >
                            {path.badge}
                          </span>
                        </div>
                        <p
                          className="text-xs font-semibold uppercase tracking-wider"
                          style={{ color: path.color }}
                        >
                          {path.tagline}
                        </p>
                        <h3 className="mt-1 font-heading text-xl font-bold text-[#0F172A]">
                          {path.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                          {path.description}
                        </p>
                        <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                          {path.features.map((f) => (
                            <li key={f} className="flex items-start gap-2">
                              <span
                                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                                style={{ backgroundColor: path.color }}
                              />
                              <span className="text-xs leading-relaxed text-[#374151]">{f}</span>
                            </li>
                          ))}
                        </ul>
                        <div
                          className="mt-5 flex items-center gap-1.5 text-sm font-semibold"
                          style={{ color: path.color }}
                        >
                          Explore
                          <ArrowRight
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* SECTION D — Education Benefits                                   */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="OFFICIAL SOURCES FIRST"
            title="Understand the Resources Before Making a Decision"
            description="The U.S. Department of Veterans Affairs is the only authority on your benefit eligibility. We point you to the official sources — UCSG does not determine benefits."
            badgeColor="#061846"
          />

          <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3">
            {benefitSources.map((source, i) => {
              const Icon = source.icon;
              return (
                <motion.a
                  key={source.title}
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleExternalLink(source.href, source.title)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                  whileHover={{ y: -4 }}
                  className="block h-full"
                >
                  <Card className="h-full border-transparent bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
                    <CardContent className="flex h-full flex-col p-6">
                      <div
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${source.color}10` }}
                      >
                        <Icon className="h-6 w-6" style={{ color: source.color }} />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-[#0F172A]">
                        {source.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7280]">
                        {source.description}
                      </p>
                      <div
                        className="mt-4 flex items-center gap-1.5 text-sm font-semibold"
                        style={{ color: source.color }}
                      >
                        {source.linkLabel}
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.a>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-10 max-w-3xl"
          >
            <div className="rounded-xl border border-[#D6A84B]/30 bg-[#FFFBEB] p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#D6A84B]" aria-hidden="true" />
                <p className="text-xs leading-relaxed text-[#92400E]">
                  <strong className="font-semibold">Important:</strong> UCSG is not affiliated
                  with, endorsed by, or sponsored by the U.S. Department of Veterans Affairs, the
                  Department of Defense, or any branch of the U.S. Armed Forces. The VA determines
                  all benefit eligibility, entitlement, and payment decisions — UCSG does not.
                  Always verify your status with the VA before making enrollment decisions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* SECTION E — Military Experience & Transfer Credit                 */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <Badge className="mb-4 border-[#D6A84B]/30 bg-[#D6A84B]/10 text-[#D6A84B] hover:bg-[#D6A84B]/10">
                PRIOR LEARNING
              </Badge>
              <h2 className="font-heading text-3xl font-bold leading-tight text-[#061846] sm:text-4xl">
                Your Previous Experience May Matter
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#6B7280]">
                Military training, occupational experience, prior college coursework, and on-the-job
                learning can sometimes shorten your degree path — but only the receiving
                institution&apos;s registrar decides what actually transfers.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#6B7280]">
                We help you organize your{' '}
                <strong className="font-semibold text-[#061846]">Joint Services Transcript (JST)</strong>,
                request prior college transcripts, and ask each prospective school for a
                pre-admission credit evaluation in writing.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  'Request your JST through the official JST portal.',
                  'Request official transcripts from every prior college.',
                  'Ask for a pre-admission credit evaluation at each prospective school.',
                  'Confirm residency requirements (minimum credits at the institution).',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0874F9]" aria-hidden="true" />
                    <span className="text-sm leading-relaxed text-[#374151]">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => handleNavigate({ view: 'veterans', id: 'military-transfer-credit' })}
                className="mt-8 group flex items-center gap-2 rounded-lg bg-[#061846] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#092B68] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2"
              >
                Understand Transfer Credit
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <Card className="h-full border-[#D6A84B]/20 bg-white shadow-sm">
                <CardContent className="p-6 sm:p-8">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#061846]">
                      <BookOpen className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-[#061846]">
                      How Transfer Credit Actually Works
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#6B7280]">
                    Each regionally accredited institution sets its own transfer-credit policy.
                    Typical factors include:
                  </p>
                  <ul className="mt-4 space-y-3">
                    {[
                      'Regional vs. national accreditation of the prior institution',
                      'Course-level match (lower-division vs. upper-division)',
                      'Age of prior credit (some programs cap how old credits can be)',
                      'Residency requirements (typically 25–50% of degree)',
                      'Program-specific articulation agreements',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[#D6A84B]" aria-hidden="true" />
                        <span className="text-sm leading-relaxed text-[#374151]">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 rounded-lg bg-[#FFFBEB] p-4">
                    <div className="flex items-start gap-2.5">
                      <AlertTriangle
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#D6A84B]"
                        aria-hidden="true"
                      />
                      <p className="text-xs leading-relaxed text-[#92400E]">
                        UCSG never guarantees transfer credit. Final determinations are made by the
                        receiving institution&apos;s registrar — not by UCSG, and not by any
                        consultant.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* SECTION F — Choosing a School                                     */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="SCHOOL COMPARISON"
            title="A Framework for Choosing a School"
            description="Don't choose a school by name recognition alone. Use these seven factors to compare accredited programs side-by-side."
            badgeColor="#0874F9"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 xl:grid-cols-4">
            {choosingSchool.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="h-full border-transparent bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-5">
                      <div
                        className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${item.color}10` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: item.color }} />
                      </div>
                      <h3 className="font-heading text-base font-bold text-[#0F172A]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#6B7280]">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <button
              type="button"
              onClick={() => handleNavigate({ view: 'veterans', id: 'choosing-a-school' })}
              className="group flex items-center justify-center gap-2 rounded-lg bg-[#0874F9] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0874F9]/25 transition-all duration-300 hover:bg-[#0660D4] hover:shadow-xl mx-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Build My School Comparison
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* SECTION G — Planning Process                                     */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="OUR PROCESS"
            title="Veteran Degree Planning Process"
            description="A structured six-step process from &quot;I&apos;m considering a degree&quot; to a confident application decision."
            badgeColor="#061846"
          />

          <div className="relative mt-12 lg:mt-16">
            {/* Connecting line (desktop) */}
            <div className="absolute top-6 left-0 right-0 hidden h-0.5 bg-gradient-to-r from-[#0874F9] via-[#D6A84B] to-[#061846] opacity-20 lg:block" aria-hidden="true" />

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {planningSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.label}
                    className="relative flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                  >
                    <div className="relative z-10 mb-4">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white shadow-md"
                        style={{ borderColor: step.color }}
                      >
                        <Icon className="h-5 w-5" style={{ color: step.color }} />
                      </div>
                      <span
                        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                        style={{ backgroundColor: step.color }}
                      >
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="font-heading text-sm font-bold text-[#0F172A]">{step.label}</h3>
                    <p className="mt-1.5 max-w-[220px] text-xs leading-relaxed text-[#6B7280]">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* SECTION H — Veteran Education Resource Center                    */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="RESOURCES"
            title="Veteran Education Resource Center"
            description="Plain-English articles on benefits, degree planning, transfer credit, online formats, and career outcomes. Written for clarity — never for marketing."
            badgeColor="#D6A84B"
          />

          {/* Filter categories */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
          >
            {resourceCategories.map((cat, i) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleNavigate({ view: 'veterans', id: 'resources' })}
                className={
                  i === 0
                    ? 'rounded-full border border-[#0874F9] bg-[#0874F9] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#0660D4]'
                    : 'rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-[#6B7280] transition-colors hover:border-[#0874F9]/30 hover:text-[#0874F9]'
                }
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Article cards */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {resourceArticles.map((article, i) => {
              return (
                <motion.button
                  key={article.title}
                  type="button"
                  onClick={() => handleNavigate({ view: 'veterans', id: 'resources' })}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                  whileHover={{ y: -4 }}
                  className="block h-full text-left"
                >
                  <Card className="h-full border-transparent bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="mb-3 flex items-center justify-between">
                        <span
                          className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                          style={{ backgroundColor: `${article.color}10`, color: article.color }}
                        >
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[#6B7280]">
                          <Calendar className="h-3 w-3" aria-hidden="true" />
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="font-heading text-base font-bold text-[#0F172A]">
                        {article.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7280]">
                        {article.description}
                      </p>
                      <div
                        className="mt-4 flex items-center gap-1.5 text-sm font-semibold"
                        style={{ color: article.color }}
                      >
                        Read Article
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 text-center"
          >
            <button
              type="button"
              onClick={() => handleNavigate({ view: 'veterans', id: 'resources' })}
              className="group flex items-center justify-center gap-2 rounded-lg border border-[#061846]/20 bg-white px-6 py-3 text-sm font-semibold text-[#061846] transition-all duration-300 hover:border-[#061846]/40 hover:bg-slate-50 mx-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Browse All Resources
            </button>
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* SECTION I — Events                                                */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#061846] via-[#092B68] to-[#061846] p-8 shadow-xl sm:p-12 lg:p-16"
          >
            <div
              className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-[#D6A84B]/[0.08] blur-[100px]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute left-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-[#0874F9]/[0.08] blur-[100px]"
              aria-hidden="true"
            />

            <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <motion.span
                  className="inline-flex items-center gap-2 rounded-full border border-[#D6A84B]/30 bg-[#D6A84B]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#D6A84B]"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  UPCOMING WORKSHOP
                </motion.span>
                <h2 className="mt-5 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
                  Your Next Mission: Education
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/70">
                  A free, no-pressure virtual workshop for veterans, service members, and
                  military-connected students. We cover degree paths, transfer credit, benefit
                  verification, and how to build a degree plan that fits your life.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/60">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#D6A84B]" aria-hidden="true" />
                    Schedule posted on events page
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#D6A84B]" aria-hidden="true" />
                    Open to all veterans &amp; military-connected students
                  </span>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => handleNavigate({ view: 'veterans', id: 'events' })}
                    className="group flex items-center justify-center gap-2 rounded-lg bg-[#0874F9] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0874F9]/25 transition-all duration-300 hover:bg-[#0660D4] hover:shadow-xl sm:px-7"
                  >
                    Reserve My Spot
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigate({ view: 'veterans', id: 'events' })}
                    className="flex items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/5"
                  >
                    See Workshop Schedule
                  </button>
                </div>
              </div>

              {/* Right column: visual */}
              <div className="relative hidden lg:flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#D6A84B]/30 to-transparent blur-2xl" aria-hidden="true" />
                  <div className="relative grid grid-cols-2 gap-4">
                    {[
                      { icon: GraduationCap, label: 'Degree Paths' },
                      { icon: FileText, label: 'Transfer Credit' },
                      { icon: ShieldCheck, label: 'Benefits Verification' },
                      { icon: Compass, label: 'Planning Process' },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.label}
                          className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] p-5 text-center backdrop-blur-sm"
                        >
                          <Icon className="h-7 w-7 text-[#D6A84B]" aria-hidden="true" />
                          <span className="text-xs font-semibold text-white/80">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* SECTION J — Final CTA                                            */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section
        aria-label="Call to action"
        className="relative w-full overflow-hidden bg-gradient-to-b from-[#061846] to-[#092B68] py-16 sm:py-20 lg:py-24"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-[3] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0874F9]/[0.07] blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.p
            className="mb-3 text-sm font-medium uppercase tracking-widest text-[#D6A84B] sm:mb-4 sm:text-base"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
          >
            YOUR NEXT CHAPTER
          </motion.p>

          <motion.h2
            className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={1}
          >
            Your Service Was One Chapter.
            <br className="hidden sm:block" /> Let&apos;s Plan What Comes Next.
          </motion.h2>

          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:mt-6 sm:text-lg"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={2}
          >
            Start with a free, no-pressure assessment of your goals, prior learning, and degree-path
            options. Or talk with a veteran education advisor — no enrollment commitment required.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row sm:gap-5"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={3}
          >
            <button
              type="button"
              onClick={() =>
                handleAssessmentCta('veteran_final_cta_primary', 'START MY VETERAN DEGREE ASSESSMENT')
              }
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#0874F9] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#0874F9]/25 transition-all duration-300 hover:bg-[#0660D4] hover:shadow-xl hover:shadow-[#0874F9]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061846] sm:w-auto sm:px-8"
            >
              START MY VETERAN DEGREE ASSESSMENT
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={() =>
                handleBookConsultationCta(
                  'veteran_final_cta_secondary',
                  'TALK WITH A VETERAN EDUCATION ADVISOR'
                )
              }
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061846] sm:w-auto sm:px-8"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              TALK WITH A VETERAN EDUCATION ADVISOR
            </button>
          </motion.div>

          <motion.p
            className="mt-6 text-xs text-white/40 sm:mt-8 sm:text-sm"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={4}
          >
            No enrollment commitment required.
          </motion.p>
        </div>
      </section>

      {/* ─────────── Compliance Disclosure ─────────── */}
      <ComplianceDisclosure />
    </div>
  );
}
