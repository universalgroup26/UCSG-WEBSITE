'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Shield,
  BookOpen,
  Users,
  Phone,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { track } from '@/lib/analytics';
import { ComplianceDisclosure } from './VeteranInfoPage';

/* ------------------------------------------------------------------ */
/*  Design tokens                                                      */
/*  Deep navy #071B35 | Gold #D6A84B | Cyan #39C5E8 | Cream #F8FAFC    */
/* ------------------------------------------------------------------ */

const CONTACT = {
  phone: '917-565-4788',
  phoneHref: 'tel:+19175654788',
  whatsapp: 'https://wa.me/13478376354',
  email: 'info@universalconsultingservices.com',
  emailHref: 'mailto:info@universalconsultingservices.com',
};

/* ------------------------------------------------------------------ */
/*  Navigation + analytics helpers                                     */
/* ------------------------------------------------------------------ */

function navigate(view: string, id?: string) {
  window.dispatchEvent(
    new CustomEvent('ucsg-navigate', { detail: id ? { view, id } : { view } })
  );
}

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const journeyCards = [
  {
    icon: GraduationCap,
    title: "I want to finish my bachelor's degree",
    description:
      "Complete an unfinished degree or start fresh with a bachelor's program that fits your timeline.",
    cta: "Explore bachelor's options",
    target: 'bachelors-degree',
  },
  {
    icon: BookOpen,
    title: "I already have a bachelor's and want a master's or MBA",
    description:
      "Compare master's, MBA and professional programs aligned with your career direction.",
    cta: "Compare master's & MBA",
    target: 'masters-mba',
  },
  {
    icon: Shield,
    title: 'I want to understand education-benefit resources',
    description:
      'Get clear, neutral information about VA education resources and how they may apply.',
    cta: 'Review benefit resources',
    target: 'education-benefits',
  },
  {
    icon: Users,
    title: 'I want to know how military experience may transfer',
    description:
      'Understand how your military training and experience may translate into academic credit.',
    cta: 'Check transfer credit',
    target: 'military-transfer-credit',
  },
] as const;

const planningChecklist = [
  { label: 'Program research', note: 'Degree paths, formats and fit.' },
  { label: 'Application coordination', note: 'Timelines, documents and steps.' },
  { label: 'Cost comparison', note: 'Tuition, fees and total investment.' },
  { label: 'Transfer credit questions', note: 'Prior learning and military credit.' },
  { label: 'Education benefit resources', note: 'Neutral, informational guidance.' },
  { label: 'School selection guidance', note: 'Shortlists aligned to your goals.' },
];

const founderPillars = [
  {
    icon: Shield,
    title: 'Service',
    description: 'A veteran-led perspective on every conversation.',
  },
  {
    icon: CheckCircle2,
    title: 'Integrity',
    description: 'Honest, no-pressure guidance with your interests first.',
  },
  {
    icon: BookOpen,
    title: 'Clarity',
    description: 'Plain-language explanations, not jargon.',
  },
  {
    icon: Users,
    title: 'Student-First Guidance',
    description: 'Your goals set the direction — not a school\u2019s quota.',
  },
];

const faqItems = [
  {
    question: 'Is UCSG affiliated with the VA or Department of Defense?',
    answer:
      'No. UCSG is an independent education consulting organization. We are not affiliated with or endorsed by the VA, DoD, or any branch of the U.S. Armed Forces.',
  },
  {
    question: 'Does the free assessment require any commitment?',
    answer:
      'No. The veteran degree assessment is free with no enrollment commitment. You can take the assessment and receive guidance without any obligation.',
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function VeteranHubPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ============================================================ */}
      {/* 1. Breadcrumb                                                */}
      {/* ============================================================ */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-slate-200 bg-white"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2.5 px-4 py-4 text-sm sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('home')}
            className="font-sans text-slate-500 transition-colors hover:text-[#39C5E8]"
          >
            Home
          </button>
          <span className="text-slate-300" aria-hidden="true">
            /
          </span>
          <span className="font-sans font-semibold text-[#071B35]">
            Veteran Education
          </span>
        </div>
      </nav>

      {/* ============================================================ */}
      {/* 2. Hero — two-column desktop (text LEFT, image RIGHT)        */}
      {/* ============================================================ */}
      <section
        className="relative bg-[#071B35]"
        aria-labelledby="veteran-hero-heading"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch lg:grid-cols-2">
          {/* Text column */}
          <div className="flex flex-col justify-center px-5 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-16 min-h-[320px] lg:min-h-[520px]">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#D6A84B]"
            >
              For Veterans &amp; Military-Connected Students
            </motion.p>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              id="veteran-hero-heading"
              className="mt-4 font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl"
            >
              Veteran Education Planning for Your Next Mission
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mt-5 max-w-xl font-sans text-base leading-relaxed text-slate-300 sm:text-lg"
            >
              Compare degree paths, prepare military-credit questions, and
              organize your next college decision with veteran-led guidance.
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="mt-4 font-sans text-sm font-semibold uppercase tracking-[0.15em] text-[#39C5E8]"
            >
              Bachelor&rsquo;s &bull; Master&rsquo;s &bull; MBA &bull; Professional
              Programs
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
            >
              <button
                onClick={() => {
                  track.ctaClick({
                    cta_type: 'assessment',
                    cta_source: 'veteran_hub',
                    cta_text: 'START MY VETERAN DEGREE ASSESSMENT',
                  });
                  navigate('veterans', 'assessment');
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D6A84B] px-7 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.12em] text-[#071B35] transition-all hover:brightness-110 hover:shadow-lg hover:shadow-[#D6A84B]/20"
              >
                Start My Free Assessment
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                onClick={() => {
                  track.ctaClick({
                    cta_type: 'consultation',
                    cta_source: 'veteran_hub',
                  });
                  navigate('veterans', 'book-consultation');
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#39C5E8]/60 bg-transparent px-7 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.12em] text-[#39C5E8] transition-all hover:border-[#39C5E8] hover:bg-[#39C5E8]/10"
              >
                Talk With Joy
              </button>
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              className="mt-4 font-sans text-xs text-slate-400"
            >
              No enrollment commitment required.
            </motion.p>
          </div>

          {/* Image column — hidden on mobile for clean text hero */}
          <div className="relative hidden min-h-[520px] overflow-hidden lg:block">
            <Image
              src="/images/hero-veteran-campus.jpg"
              alt="Veteran student on a university campus preparing for the next academic chapter"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
            {/* Soft left-edge gradient to blend with text column */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(7,27,53,0.55) 0%, rgba(7,27,53,0) 35%)',
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. Starting-Point Journey Cards                              */}
      {/* ============================================================ */}
      <section className="bg-white py-20 lg:py-28" aria-labelledby="journey-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#D6A84B]"
            >
              Where Are You In Your Journey?
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              custom={1}
              id="journey-heading"
              className="mt-3 font-heading text-3xl font-bold text-[#071B35] sm:text-4xl"
            >
              Explore Your Degree Paths
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              custom={2}
              className="mt-4 font-sans text-base leading-relaxed text-slate-600"
            >
              Every veteran&rsquo;s path is different. Choose the scenario that
              sounds most like yours and we&rsquo;ll take it from there.
            </motion.p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {journeyCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.a
                  key={card.target}
                  href={`/veterans/${card.target}`}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  custom={i}
                  onClick={(e) => {
                    e.preventDefault();
                    track.navClick({
                      nav_type: 'veteran_hub',
                      nav_target: card.target,
                    });
                    navigate('veterans', card.target);
                  }}
                  className="group flex flex-col items-start rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#39C5E8]/40 hover:shadow-xl hover:shadow-slate-200/60"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#39C5E8]/10 text-[#39C5E8] transition-colors group-hover:bg-[#39C5E8]/15">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-bold leading-snug text-[#071B35]">
                    {card.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-slate-600">
                    {card.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-[#39C5E8]">
                    {card.cta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. Planning Support Checklist                                */}
      {/* ============================================================ */}
      <section
        className="bg-[#F8FAFC] py-20 lg:py-28"
        aria-labelledby="planning-heading"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#D6A84B]"
              >
                What UCSG Helps With
              </motion.p>
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                custom={1}
                id="planning-heading"
                className="mt-3 font-heading text-3xl font-bold text-[#071B35] sm:text-4xl"
              >
                Planning support for your next academic chapter.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                custom={2}
                className="mt-4 font-sans text-base leading-relaxed text-slate-600"
              >
                We help you organize the moving parts of returning to school
                &mdash; from research to applications to understanding how
                benefits and transfer credit may fit.
              </motion.p>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border-l-4 border-[#39C5E8] bg-white p-6 shadow-sm sm:p-8">
                <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {planningChecklist.map((item, i) => (
                    <motion.li
                      key={item.label}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-60px' }}
                      custom={i}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#39C5E8]"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-sans text-sm font-semibold text-[#071B35]">
                          {item.label}
                        </p>
                        <p className="mt-0.5 font-sans text-sm text-slate-500">
                          {item.note}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. Founder Section                                            */}
      {/* ============================================================ */}
      <section className="bg-white py-20 lg:py-28" aria-labelledby="founder-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Photo */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="flex justify-center lg:justify-start"
            >
              <Image
                src="/images/founder.jpg"
                alt="Joy Chowdhury, U.S. Army Veteran and Founder of UCSG"
                width={400}
                height={400}
                className="rounded-2xl"
              />
            </motion.div>

            {/* Content */}
            <div>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#D6A84B]"
              >
                Guidance Built With a Veteran Perspective
              </motion.p>
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                custom={1}
                id="founder-heading"
                className="mt-3 font-heading text-3xl font-bold leading-tight text-[#071B35] sm:text-4xl"
              >
                Veteran-Led. Education-Focused. Student-First.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                custom={2}
                className="mt-5 font-sans text-base leading-relaxed text-slate-600"
              >
                UCSG was founded and is led by U.S. Army Veteran Joy Chowdhury.
                Our veteran education initiative is built around clear
                information, responsible program comparison and respectful
                guidance for Veterans planning their next educational chapter.
              </motion.p>

              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {founderPillars.map((pillar, i) => {
                  const Icon = pillar.icon;
                  return (
                    <motion.div
                      key={pillar.title}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-60px' }}
                      custom={i}
                      className="flex items-start gap-3"
                    >
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#071B35]/5 text-[#071B35]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-heading text-sm font-bold text-[#071B35]">
                          {pillar.title}
                        </p>
                        <p className="mt-0.5 font-sans text-sm text-slate-500">
                          {pillar.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. FAQ — 2 Q&As using native details/summary                 */}
      {/* ============================================================ */}
      <section className="bg-[#F8FAFC] py-20 lg:py-28" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#D6A84B]"
            >
              Frequently Asked Questions
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              custom={1}
              id="faq-heading"
              className="mt-3 font-heading text-3xl font-bold text-[#071B35] sm:text-4xl"
            >
              Straight answers before you begin.
            </motion.h2>
          </div>

          <div className="mt-10 space-y-4">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={i}
              >
                <details className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow open:shadow-md sm:p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-base font-bold text-[#071B35]">
                    {item.question}
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#39C5E8]/10 text-[#39C5E8] transition-transform duration-200 group-open:rotate-45">
                      <span className="text-lg font-bold leading-none">+</span>
                    </span>
                  </summary>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-slate-600">
                    {item.answer}
                  </p>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. Closing CTA                                               */}
      {/* ============================================================ */}
      <section
        className="relative overflow-hidden bg-[#071B35] py-20 lg:py-28"
        aria-labelledby="closing-cta-heading"
      >
        {/* subtle gold accent line at top */}
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D6A84B]/60 to-transparent"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#D6A84B]"
          >
            What Comes Next
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={1}
            id="closing-cta-heading"
            className="mt-3 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
          >
            Your Service Was One Chapter. Let&rsquo;s Plan What Comes Next.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={2}
            className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            Start with a short education assessment. We&rsquo;ll learn about your
            academic background, career goals, preferred program type and
            timeline before discussing possible education options.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={3}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <button
              onClick={() => {
                track.ctaClick({
                  cta_type: 'assessment',
                  cta_source: 'veteran_hub_closing',
                  cta_text: 'START FREE ASSESSMENT',
                });
                navigate('veterans', 'assessment');
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D6A84B] px-7 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.12em] text-[#071B35] transition-all hover:brightness-110 hover:shadow-lg hover:shadow-[#D6A84B]/20"
            >
              Start Free Assessment
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              onClick={() => {
                track.ctaClick({
                  cta_type: 'consultation',
                  cta_source: 'veteran_hub_closing',
                });
                navigate('veterans', 'book-consultation');
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#39C5E8]/60 bg-transparent px-7 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.12em] text-[#39C5E8] transition-all hover:border-[#39C5E8] hover:bg-[#39C5E8]/10"
            >
              Book a Consultation
            </button>
          </motion.div>

          {/* Direct contact strip */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={4}
            className="mt-12 border-t border-white/10 pt-8"
          >
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Prefer to reach us directly?
            </p>
            <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#39C5E8] transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {CONTACT.phone}
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#39C5E8] transition-colors hover:text-white"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href={CONTACT.emailHref}
                className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#39C5E8] transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {CONTACT.email}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. Compliance disclosure                                     */}
      {/* ============================================================ */}
      <ComplianceDisclosure />
    </div>
  );
}
