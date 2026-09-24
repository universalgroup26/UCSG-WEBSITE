'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Cookie,
  Database,
  Share2,
  Clock,
  UserCheck,
  Baby,
  Globe2,
  Mail,
  Phone,
  Lock,
  FileText,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';
import { track } from '@/lib/analytics';

/* ------------------------------------------------------------------ */
/*  TOC sections — keep ids in sync with <section id="..."> below     */
/* ------------------------------------------------------------------ */
interface TocItem {
  id: string;
  label: string;
}

const TOC: TocItem[] = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'information-we-collect', label: 'Information We Collect' },
  { id: 'how-we-use-information', label: 'How We Use Information' },
  { id: 'third-party-services', label: 'Third-Party Services' },
  { id: 'cookies', label: 'Cookies & Local Storage' },
  { id: 'data-retention', label: 'Data Retention' },
  { id: 'your-rights', label: 'Your Rights' },
  { id: 'childrens-privacy', label: "Children's Privacy" },
  { id: 'international-transfers', label: 'International Transfers' },
  { id: 'meta-lead-ads', label: 'Meta Lead Ads' },
  { id: 'security', label: 'Security' },
  { id: 'do-not-track', label: 'Do Not Track' },
  { id: 'changes', label: 'Changes to This Policy' },
  { id: 'contact', label: 'Contact Us' },
];

/* ------------------------------------------------------------------ */
/*  Content data                                                       */
/* ------------------------------------------------------------------ */
interface ThirdParty {
  name: string;
  purpose: string;
  dataSent: string;
  policyUrl: string;
  policyLabel: string;
}

const THIRD_PARTIES: ThirdParty[] = [
  {
    name: 'Meta (Facebook)',
    purpose:
      'Ad attribution, lead measurement, and audience enrichment via Meta Pixel (client-side), Meta Conversions API (server-side), Facebook JS SDK, and Meta Lead Ads webhook.',
    dataSent:
      'Page views, lead events (value: $50 USD), and SHA-256 hashed email / phone / name for advanced matching. Meta Lead Ads webhook also delivers form responses (name, email, phone, custom answers).',
    policyUrl: 'https://www.facebook.com/policy.php',
    policyLabel: 'facebook.com/policy.php',
  },
  {
    name: 'GoHighLevel (GHL)',
    purpose:
      'Customer Relationship Management (CRM). We create/update contacts, attach intent tags and UTM custom fields, and place leads in a marketing pipeline. GHL also loads a chat widget and an external tracking script.',
    dataSent:
      'Contact details (name, email, phone), intent tags, UTM data, custom fields (WhatsApp, nationality, English level, assessment answers), and lead source. Location ID: Gae7cVfCqZkpS7IWBUTL.',
    policyUrl: 'https://www.gohighlevel.com/privacy-policy',
    policyLabel: 'gohighlevel.com/privacy-policy',
  },
  {
    name: 'Google (Tag Manager, Analytics 4, Ads)',
    purpose:
      'Tag deployment, analytics, and conversion tracking. Uses Google Consent Mode v2 (default deny, granted on consent).',
    dataSent:
      'GA4 measurement ID G-MHC25XBP3P — page views, events, session data, and anonymous client IDs. Google Ads receives click identifiers and conversion events. Cookies include _ga, _gid, and Google Ads conversion cookies.',
    policyUrl: 'https://policies.google.com/privacy',
    policyLabel: 'policies.google.com/privacy',
  },
  {
    name: 'Microsoft Clarity',
    purpose:
      'Privacy-preserving session replay, heatmaps, and user behavior analytics. Project ID: y7hrmh5gu4.',
    dataSent:
      'Mouse movements, clicks, scroll depth, and session recordings. No personally identifiable information is collected by default; Clarity does not link sessions to individual user identities.',
    policyUrl: 'https://privacy.microsoft.com/privacystatement',
    policyLabel: 'privacy.microsoft.com/privacystatement',
  },
  {
    name: 'Vercel Web Analytics',
    purpose:
      'Aggregated, privacy-preserving website traffic analytics (page views, referrers) reported at the aggregate level only.',
    dataSent:
      'Aggregated, non-personal page view counts and referring URLs. No cookies are set and no personal data is collected.',
    policyUrl: 'https://vercel.com/legal/privacy-policy',
    policyLabel: 'vercel.com/legal/privacy-policy',
  },
  {
    name: 'Cloudflare Turnstile',
    purpose:
      'Bot detection and abuse protection for our contact and lead forms, when enabled.',
    dataSent:
      'A proof-of-work token and basic browser/environment signals. Cloudflare may set a cf_clearance cookie to remember verified visitors.',
    policyUrl: 'https://www.cloudflare.com/privacypolicy/',
    policyLabel: 'cloudflare.com/privacypolicy',
  },
];

interface CookieRow {
  name: string;
  purpose: string;
  duration: string;
  category: 'Strictly Necessary' | 'Analytics' | 'Advertising';
}

const COOKIES: CookieRow[] = [
  {
    name: 'ucsg_consent_v2',
    purpose:
      'Stores your cookie consent preferences (analytics / advertising granted or denied). Required for the site to remember your choice.',
    duration: '12 months (localStorage)',
    category: 'Strictly Necessary',
  },
  {
    name: '_ga, _ga_*',
    purpose:
      'Google Analytics 4 — distinguishes unique users and records page views / events.',
    duration: 'Up to 14 months',
    category: 'Analytics',
  },
  {
    name: '_gid',
    purpose: 'Google Analytics — distinguishes unique visitors for the day.',
    duration: '24 hours',
    category: 'Analytics',
  },
  {
    name: '_fbp, _fbc',
    purpose:
      'Meta Pixel — first-party cookie for ad attribution and click identity (fbclid).',
    duration: 'Up to 90 days',
    category: 'Advertising',
  },
  {
    name: 'Meta Pixel cookies',
    purpose:
      'Meta Pixel — page-view, lead, and conversion events sent to Meta for ad measurement.',
    duration: 'Session / up to 90 days',
    category: 'Advertising',
  },
  {
    name: 'Google Ads cookies',
    purpose:
      'Conversion tracking and remarketing for users who clicked a Google ad (gclid).',
    duration: 'Up to 90 days',
    category: 'Advertising',
  },
  {
    name: 'clarity_* / CLID',
    purpose: 'Microsoft Clarity — unique session identifier for replay & heatmap analytics.',
    duration: 'Up to 13 months',
    category: 'Analytics',
  },
  {
    name: 'cf_clearance',
    purpose:
      'Cloudflare Turnstile — remembers that a visitor passed a bot challenge.',
    duration: 'Up to 30 days',
    category: 'Strictly Necessary',
  },
];

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ------------------------------------------------------------------ */
/*  Small presentational helpers                                       */
/* ------------------------------------------------------------------ */
function SectionHeading({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#061846]/5">
        <Icon className="h-4 w-4 text-[#061846]" aria-hidden="true" />
      </span>
      <h2 className="font-heading text-xl font-bold text-[#061846] sm:text-2xl">
        {children}
      </h2>
    </div>
  );
}

function ExternalPolicyLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-[#0874F9] underline decoration-[#0874F9]/30 underline-offset-2 transition-colors hover:text-[#0660D4] hover:decoration-[#0874F9]"
      onClick={() => track.externalLink(href, String(children))}
    >
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
interface PrivacyPageProps {
  onBack: () => void;
}

export default function PrivacyPage({ onBack }: PrivacyPageProps) {
  const [activeId, setActiveId] = useState<string>('introduction');
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  // Smooth-scroll to a section by id, accounting for sticky header.
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 96;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
    setMobileTocOpen(false);
  }, []);

  // Track active section with IntersectionObserver for TOC highlight.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-96px 0px -65% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleManagePreferences = useCallback(() => {
    track.ctaClick({
      cta_type: 'cookie_preferences',
      cta_source: 'privacy_page',
      cta_text: 'Manage Cookie Preferences',
    });
    window.dispatchEvent(new CustomEvent('ucsg-consent-preferences'));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ──────────────────────────────── Back Bar ──────────────────────────────── */}
      <motion.div
        className="border-b border-gray-100 bg-gray-50/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#061846]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </button>
        </div>
      </motion.div>

      {/* ──────────────────────────────── Hero Banner ──────────────────────────────── */}
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
          className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#D6A84B]/[0.08] blur-[100px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              className="mb-6 flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <div className="h-px w-8 bg-[#D6A84B]/50" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6A84B]">
                Legal
              </span>
              <div className="h-px w-8 bg-[#D6A84B]/50" />
            </motion.div>

            <motion.h1
              className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            >
              Privacy Policy
            </motion.h1>

            <motion.p
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              How Universal Consulting Service Group collects, uses, and protects
              your information when you visit our website or use our educational
              consulting services for F-1 international students.
            </motion.p>

            <motion.p
              className="mx-auto mt-4 text-sm text-white/50"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              <span className="font-semibold text-white/70">Last updated:</span> September 6, 2026
            </motion.p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────── Mobile TOC toggle ──────────────────────────────── */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileTocOpen((o) => !o)}
          className="flex w-full items-center justify-between border-b border-gray-100 bg-white px-4 py-3 text-sm font-semibold text-[#061846] sm:px-6"
          aria-expanded={mobileTocOpen}
          aria-controls="mobile-toc"
        >
          <span className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#0874F9]" aria-hidden="true" />
            On this page
          </span>
          <ArrowRight
            className={`h-4 w-4 text-[#6B7280] transition-transform ${mobileTocOpen ? 'rotate-90' : ''}`}
            aria-hidden="true"
          />
        </button>
        {mobileTocOpen && (
          <nav
            id="mobile-toc"
            className="border-b border-gray-100 bg-gray-50/60 px-4 py-3 sm:px-6"
            aria-label="On this page (mobile)"
          >
            <div className="flex gap-2 overflow-x-auto pb-1">
              {TOC.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    activeId === item.id
                      ? 'bg-[#061846] text-white'
                      : 'bg-white text-[#6B7280] hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>

      {/* ──────────────────────────────── Article + Sticky TOC ──────────────────────────────── */}
      <div ref={articleRef} className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          {/* Sticky desktop TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-3 flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                <FileText className="h-3.5 w-3.5 text-[#0874F9]" aria-hidden="true" />
                On this page
              </p>
              <nav aria-label="Table of contents" className="border-l border-gray-200">
                <ul className="space-y-0.5">
                  {TOC.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`-ml-px block w-full border-l-2 py-1.5 pl-3 text-left text-sm transition-colors ${
                          activeId === item.id
                            ? 'border-[#0874F9] font-semibold text-[#0874F9]'
                            : 'border-transparent text-[#6B7280] hover:border-gray-300 hover:text-[#061846]'
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs font-semibold text-[#061846]">Cookie preferences</p>
                <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">
                  Change your analytics or advertising consent at any time.
                </p>
                <button
                  type="button"
                  onClick={handleManagePreferences}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-[#061846] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#092B68]"
                >
                  <Cookie className="h-3.5 w-3.5" aria-hidden="true" />
                  Manage Cookie Preferences
                </button>
              </div>
            </div>
          </aside>

          {/* Article body */}
          <article className="max-w-3xl text-[15px] leading-relaxed text-gray-700">
            {/* Introduction */}
            <motion.section
              id="introduction"
              className="scroll-mt-24"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
            >
              <SectionHeading icon={Shield}>Introduction</SectionHeading>
              <p>
                Universal Consulting Service Group (&ldquo;UCSG,&rdquo; &ldquo;we,&rdquo;
                &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is an educational consulting service
                that helps F-1 international students navigate U.S. university transfers,
                Day 1 CPT programs, change-of-status pathways, STEM OPT, and graduate
                program selection. We respect your privacy and are committed to protecting
                the personal data you share with us.
              </p>
              <p className="mt-4">
                This Privacy Policy explains, in plain language, what information we collect
                when you visit our website, use our assessment tools, or submit a contact
                form — and how we use, share, and protect that information. It applies to
                all visitors to{' '}
                <span className="font-medium text-[#061846]">
                  universalconsultingservices.com
                </span>{' '}
                and to leads captured through our marketing channels (including Meta Lead
                Ads). By using our website or services, you agree to the practices
                described in this policy.
              </p>
            </motion.section>

            <div className="my-10 h-px w-full bg-gray-100" aria-hidden="true" />

            {/* Information We Collect */}
            <motion.section
              id="information-we-collect"
              className="scroll-mt-24"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              custom={0}
            >
              <SectionHeading icon={Database}>Information We Collect</SectionHeading>
              <p>We collect information in the following categories:</p>

              <h3 className="mt-5 font-heading text-base font-semibold text-[#061846]">
                (a) Contact &amp; assessment data you submit
              </h3>
              <p className="mt-1">
                When you fill out a contact form, booking form, or free assessment, you may
                provide:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Full name, email address, phone number, and WhatsApp number</li>
                <li>Nationality and English proficiency level</li>
                <li>Service interest (e.g., university transfer, Day 1 CPT, STEM OPT)</li>
                <li>Your message or specific questions</li>
                <li>
                  Assessment answers, including your current F-1 situation, degree level,
                  field of study, preferred study location and format (online / on-campus),
                  budget range, OPT end date, target intake term, and current university
                </li>
              </ul>

              <h3 className="mt-5 font-heading text-base font-semibold text-[#061846]">
                (b) Marketing attribution data
              </h3>
              <p className="mt-1">
                We capture UTM parameters and click identifiers from the referring URL —
                including <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">utm_source</code>,{' '}
                <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">utm_medium</code>,{' '}
                <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">utm_campaign</code>,{' '}
                <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">gclid</code> (Google Ads), and{' '}
                <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">fbclid</code> (Meta) — so we
                can understand which campaigns bring students to us.
              </p>

              <h3 className="mt-5 font-heading text-base font-semibold text-[#061846]">
                (c) Usage &amp; device data
              </h3>
              <p className="mt-1">
                Our analytics tools automatically record: pages viewed, clicks, scroll depth,
                session duration, IP address (truncated / anonymized where supported), browser
                type, operating system, device type, and approximate geographic region
                (country / region / city).
              </p>

              <h3 className="mt-5 font-heading text-base font-semibold text-[#061846]">
                (d) Cookies &amp; local storage
              </h3>
              <p className="mt-1">
                We use cookies and similar technologies (such as localStorage) to remember
                your consent choices, measure traffic, and improve our marketing. See the{' '}
                <button
                  onClick={() => scrollToSection('cookies')}
                  className="font-medium text-[#0874F9] underline decoration-[#0874F9]/30 underline-offset-2 transition-colors hover:text-[#0660D4]"
                >
                  Cookies &amp; Local Storage
                </button>{' '}
                section below.
              </p>
            </motion.section>

            <div className="my-10 h-px w-full bg-gray-100" aria-hidden="true" />

            {/* How We Use Information */}
            <motion.section
              id="how-we-use-information"
              className="scroll-mt-24"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              custom={0}
            >
              <SectionHeading icon={UserCheck}>How We Use Your Information</SectionHeading>
              <p>We use the information we collect to:</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-6">
                <li>Respond to your inquiries and provide personalized educational guidance</li>
                <li>Match you with suitable universities, Day 1 CPT programs, or graduate programs</li>
                <li>
                  Send your lead to our GoHighLevel CRM so our consultants can follow up with
                  you, schedule an assessment, and place you in our service pipeline
                </li>
                <li>Send you notifications, follow-ups, and (with consent) marketing communications</li>
                <li>Improve our website, content, and the students&apos; experience</li>
                <li>Measure and optimize the performance of our marketing and advertising</li>
                <li>Comply with our legal, accounting, and reporting obligations</li>
              </ul>
              <p className="mt-4">
                We do <span className="font-semibold text-[#061846]">not</span> sell your
                personal information to third parties.
              </p>
            </motion.section>

            <div className="my-10 h-px w-full bg-gray-100" aria-hidden="true" />

            {/* Third-Party Services */}
            <motion.section
              id="third-party-services"
              className="scroll-mt-24"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              custom={0}
            >
              <SectionHeading icon={Share2}>Third-Party Services We Share Data With</SectionHeading>
              <p>
                We use trusted third-party services to operate our website, measure marketing,
                and manage our CRM. Each service has its own privacy practices. The table below
                summarizes each provider, what we send, and a link to their policy.
              </p>

              <div className="mt-6 space-y-5">
                {THIRD_PARTIES.map((tp) => (
                  <div
                    key={tp.name}
                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
                  >
                    <h3 className="font-heading text-base font-bold text-[#061846]">
                      {tp.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                      {tp.purpose}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      <span className="font-semibold text-[#061846]">Data sent:</span>{' '}
                      {tp.dataSent}
                    </p>
                    <p className="mt-2.5 text-sm">
                      <span className="font-semibold text-[#061846]">Privacy policy:</span>{' '}
                      <ExternalPolicyLink href={tp.policyUrl}>
                        {tp.policyLabel}
                      </ExternalPolicyLink>
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>

            <div className="my-10 h-px w-full bg-gray-100" aria-hidden="true" />

            {/* Cookies */}
            <motion.section
              id="cookies"
              className="scroll-mt-24"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              custom={0}
            >
              <SectionHeading icon={Cookie}>Cookies &amp; Local Storage</SectionHeading>
              <p>
                We group cookies and local storage entries into three categories:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-6">
                <li>
                  <span className="font-semibold text-[#061846]">Strictly Necessary</span> —
                  required for the site to function (e.g., remembering your consent choice in
                  the localStorage key{' '}
                  <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">ucsg_consent_v2</code>).
                  These cannot be disabled.
                </li>
                <li>
                  <span className="font-semibold text-[#061846]">Analytics</span> — help us
                  understand how visitors use the site (e.g., GA4 <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">_ga</code>).
                  Only set after you grant analytics consent.
                </li>
                <li>
                  <span className="font-semibold text-[#061846]">Advertising</span> — used by
                  Meta Pixel (<code className="rounded bg-gray-100 px-1 py-0.5 text-xs">_fbp</code>,{' '}
                  <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">_fbc</code>) and Google
                  Ads to measure ad performance. Only set after you grant advertising consent.
                </li>
              </ul>

              <p className="mt-4">
                We implement <span className="font-semibold text-[#061846]">Google Consent Mode v2</span>:
                advertising and analytics storage default to <em>denied</em> and are switched to{' '}
                <em>granted</em> only after you accept them in our consent banner. If you reject
                non-essential cookies, only strictly necessary cookies remain.
              </p>

              {/* Cookie table */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b-2 border-[#061846]/20 bg-gray-50">
                      <th scope="col" className="px-3 py-2.5 font-heading font-semibold text-[#061846]">
                        Cookie / Key
                      </th>
                      <th scope="col" className="px-3 py-2.5 font-heading font-semibold text-[#061846]">
                        Purpose
                      </th>
                      <th scope="col" className="px-3 py-2.5 font-heading font-semibold text-[#061846]">
                        Duration
                      </th>
                      <th scope="col" className="px-3 py-2.5 font-heading font-semibold text-[#061846]">
                        Category
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COOKIES.map((row) => (
                      <tr key={row.name} className="border-b border-gray-100 align-top">
                        <td className="px-3 py-2.5 font-mono text-xs text-[#061846]">{row.name}</td>
                        <td className="px-3 py-2.5 text-gray-600">{row.purpose}</td>
                        <td className="px-3 py-2.5 text-gray-600">{row.duration}</td>
                        <td className="px-3 py-2.5">
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                              row.category === 'Strictly Necessary'
                                ? 'bg-[#061846]/10 text-[#061846]'
                                : row.category === 'Analytics'
                                ? 'bg-[#0874F9]/10 text-[#0874F9]'
                                : 'bg-[#D6A84B]/10 text-[#9C7A33]'
                            }`}
                          >
                            {row.category}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 rounded-xl border border-[#0874F9]/20 bg-[#0874F9]/[0.03] p-4 sm:p-5">
                <p className="flex items-center gap-2 font-heading text-sm font-semibold text-[#061846]">
                  <Cookie className="h-4 w-4 text-[#0874F9]" aria-hidden="true" />
                  Manage your cookie preferences
                </p>
                <p className="mt-1.5 text-sm text-gray-600">
                  You can change your analytics or advertising consent at any time. Reopening
                  the consent banner will not delete data already collected by our providers —
                  see their retention policies below.
                </p>
                <button
                  type="button"
                  onClick={handleManagePreferences}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#0874F9] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0660D4]"
                >
                  <Cookie className="h-4 w-4" aria-hidden="true" />
                  Manage Cookie Preferences
                </button>
              </div>
            </motion.section>

            <div className="my-10 h-px w-full bg-gray-100" aria-hidden="true" />

            {/* Data Retention */}
            <motion.section
              id="data-retention"
              className="scroll-mt-24"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
            >
              <SectionHeading icon={Clock}>Data Retention</SectionHeading>
              <p>
                We retain contact and assessment submissions in our database for as long as
                needed to provide our educational consulting services and to respond to your
                inquiries. Records may also be retained in our GoHighLevel CRM (subject to
                GHL&apos;s retention policy) so our consultants can follow up with you across
                multiple semesters and intake cycles.
              </p>
              <p className="mt-4">
                Analytics data is retained by each provider according to their own retention
                policies:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Google Analytics 4: approximately 14 months for user-level data</li>
                <li>Microsoft Clarity: session replays retained for approximately 12 months</li>
                <li>Meta Pixel &amp; Conversions API: subject to Meta&apos;s data retention terms</li>
                <li>Vercel Web Analytics: aggregated, non-identifiable data only</li>
              </ul>
              <p className="mt-4">
                You may request deletion of your personal data at any time — see{' '}
                <button
                  onClick={() => scrollToSection('your-rights')}
                  className="font-medium text-[#0874F9] underline decoration-[#0874F9]/30 underline-offset-2 transition-colors hover:text-[#0660D4]"
                >
                  Your Rights
                </button>{' '}
                below.
              </p>
            </motion.section>

            <div className="my-10 h-px w-full bg-gray-100" aria-hidden="true" />

            {/* Your Rights */}
            <motion.section
              id="your-rights"
              className="scroll-mt-24"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              custom={0}
            >
              <SectionHeading icon={UserCheck}>Your Rights (GDPR / CCPA)</SectionHeading>
              <p>
                If you are a resident of the European Economic Area (EEA), the United Kingdom,
                Switzerland, or California (CCPA / CPRA), you have specific rights regarding your
                personal data. Subject to applicable law, you may:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-6">
                <li><span className="font-semibold text-[#061846]">Access</span> — request a copy of the personal data we hold about you</li>
                <li><span className="font-semibold text-[#061846]">Correct</span> — ask us to fix inaccurate or incomplete data</li>
                <li><span className="font-semibold text-[#061846]">Delete</span> — request that we erase your personal data (&ldquo;right to be forgotten&rdquo;)</li>
                <li><span className="font-semibold text-[#061846]">Restrict</span> — ask us to limit how we use your data in certain circumstances</li>
                <li><span className="font-semibold text-[#061846]">Object</span> — object to our processing of your data (e.g., for direct marketing)</li>
                <li><span className="font-semibold text-[#061846]">Data portability</span> — receive your data in a structured, machine-readable format</li>
                <li><span className="font-semibold text-[#061846]">Opt out of sale or sharing</span> — we do not sell your data; you may opt out of &ldquo;sharing&rdquo; for cross-context behavioral advertising by disabling advertising consent</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, contact us at{' '}
                <a
                  href="mailto:Info@universalconsultingservices.com"
                  className="font-medium text-[#0874F9] underline decoration-[#0874F9]/30 underline-offset-2 transition-colors hover:text-[#0660D4]"
                >
                  Info@universalconsultingservices.com
                </a>{' '}
                or by phone at{' '}
                <a
                  href="tel:+13028935594"
                  className="font-medium text-[#0874F9] underline decoration-[#0874F9]/30 underline-offset-2 transition-colors hover:text-[#0660D4]"
                >
                  +1 (302) 893-5594
                </a>
                . We will respond within the timeframes required by applicable law (typically
                30 days).
              </p>
              <p className="mt-4">
                If you are in the EU, EEA, UK, or Switzerland, you also have the right to lodge
                a complaint with your local data protection supervisory authority.
              </p>
            </motion.section>

            <div className="my-10 h-px w-full bg-gray-100" aria-hidden="true" />

            {/* Children's Privacy */}
            <motion.section
              id="childrens-privacy"
              className="scroll-mt-24"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
            >
              <SectionHeading icon={Baby}>Children&apos;s Privacy</SectionHeading>
              <p>
                UCSG does not knowingly collect personal information from children under 13
                years of age. Our services are directed to adult F-1 students and prospective
                graduate students. If you believe a child under 13 has provided us with
                personal data, please contact us at{' '}
                <a
                  href="mailto:Info@universalconsultingservices.com"
                  className="font-medium text-[#0874F9] underline decoration-[#0874F9]/30 underline-offset-2 transition-colors hover:text-[#0660D4]"
                >
                  Info@universalconsultingservices.com
                </a>{' '}
                and we will promptly delete that information.
              </p>
            </motion.section>

            <div className="my-10 h-px w-full bg-gray-100" aria-hidden="true" />

            {/* International Transfers */}
            <motion.section
              id="international-transfers"
              className="scroll-mt-24"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
            >
              <SectionHeading icon={Globe2}>International Data Transfers</SectionHeading>
              <p>
                UCSG is based in the United States. When you use our website, your personal
                data may be processed in the United States and in other countries where our
                service providers (Meta, Google, Microsoft, GoHighLevel, Cloudflare, Vercel)
                operate data centers. By submitting your information, you consent to these
                transfers.
              </p>
              <p className="mt-4">
                For transfers of personal data from the EU, EEA, UK, or Switzerland to countries
                that have not received an adequacy decision, we rely on appropriate safeguards
                such as the European Commission&apos;s Standard Contractual Clauses (SCCs), or
                another lawful transfer mechanism, and we require our providers to do the same.
              </p>
            </motion.section>

            <div className="my-10 h-px w-full bg-gray-100" aria-hidden="true" />

            {/* Meta Lead Ads */}
            <motion.section
              id="meta-lead-ads"
              className="scroll-mt-24"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
            >
              <SectionHeading icon={Mail}>Meta Lead Ads (Webhook)</SectionHeading>
              <p>
                If you submit your information through a Meta (Facebook / Instagram) Lead Ad
                form, Meta sends us your form responses — including your name, email, phone
                number, and any custom answers you provided — via a webhook to our secure
                endpoint. We store these responses and process them as a lead in the same way
                as a contact form submission.
              </p>
              <p className="mt-4">
                This means your data is shared with us by Meta under Meta&apos;s own terms and
                your privacy choices on Meta&apos;s platforms. See{' '}
                <ExternalPolicyLink href="https://www.facebook.com/policy.php">
                  Meta&apos;s Privacy Policy
                </ExternalPolicyLink>{' '}
                for more information about how Meta handles lead data.
              </p>
            </motion.section>

            <div className="my-10 h-px w-full bg-gray-100" aria-hidden="true" />

            {/* Security */}
            <motion.section
              id="security"
              className="scroll-mt-24"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
            >
              <SectionHeading icon={Lock}>Security</SectionHeading>
              <p>
                We implement reasonable administrative, technical, and physical safeguards
                designed to protect your personal data. These include HTTPS encryption for all
                data in transit, secure storage of contact submissions in our database, and
                SHA-256 hashing of personal identifiers (such as email, phone, and name) before
                they are sent to Meta via the Conversions API.
              </p>
              <p className="mt-4">
                However, no method of transmission over the internet or electronic storage is
                100% secure. While we strive to use commercially acceptable means to protect
                your personal data, we cannot guarantee absolute security.
              </p>
            </motion.section>

            <div className="my-10 h-px w-full bg-gray-100" aria-hidden="true" />

            {/* Do Not Track */}
            <motion.section
              id="do-not-track"
              className="scroll-mt-24"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
            >
              <SectionHeading icon={HelpCircle}>Do Not Track Signals</SectionHeading>
              <p>
                We do not respond to browser-based &ldquo;Do Not Track&rdquo; (DNT) signals.
                Instead, we honor your privacy choices through{' '}
                <span className="font-semibold text-[#061846]">Google Consent Mode v2</span> and
                our own cookie consent banner, which lets you granularly enable or disable
                analytics and advertising storage before any non-essential cookies are set.
              </p>
            </motion.section>

            <div className="my-10 h-px w-full bg-gray-100" aria-hidden="true" />

            {/* Changes */}
            <motion.section
              id="changes"
              className="scroll-mt-24"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
            >
              <SectionHeading icon={RefreshCw}>Changes to This Policy</SectionHeading>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our
                practices, our services, or applicable law. When we do, we will revise the
                &ldquo;Last updated&rdquo; date at the top of this page. We encourage you to
                review this policy periodically to stay informed about how we protect your
                information.
              </p>
              <p className="mt-4">
                If we make material changes that affect your rights, we will provide a more
                prominent notice (such as on our homepage or via email to existing contacts,
                where appropriate).
              </p>
            </motion.section>

            <div className="my-10 h-px w-full bg-gray-100" aria-hidden="true" />

            {/* Contact */}
            <motion.section
              id="contact"
              className="scroll-mt-24"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
            >
              <SectionHeading icon={Phone}>Contact Us</SectionHeading>
              <p>
                If you have any questions, requests, or concerns about this Privacy Policy or
                our handling of your personal data, please contact us:
              </p>
              <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-5">
                <p className="font-heading text-base font-bold text-[#061846]">
                  Universal Consulting Service Group
                </p>
                <p className="mt-1.5 text-sm text-gray-600">
                  3707 74th Street, Suite 8 (3rd FL)<br />
                  Jackson Heights, NY 11372, USA
                </p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 shrink-0 text-[#0874F9]" aria-hidden="true" />
                    <a
                      href="mailto:Info@universalconsultingservices.com"
                      className="font-medium text-[#0874F9] underline decoration-[#0874F9]/30 underline-offset-2 transition-colors hover:text-[#0660D4]"
                    >
                      Info@universalconsultingservices.com
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-[#0874F9]" aria-hidden="true" />
                    <a
                      href="tel:+13028935594"
                      className="font-medium text-[#0874F9] underline decoration-[#0874F9]/30 underline-offset-2 transition-colors hover:text-[#0660D4]"
                    >
                      +1 (302) 893-5594
                    </a>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Footer note */}
            <p className="mt-12 text-center text-xs text-gray-400">
              &copy; {new Date().getFullYear()} Universal Consulting Service Group. All rights reserved.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
