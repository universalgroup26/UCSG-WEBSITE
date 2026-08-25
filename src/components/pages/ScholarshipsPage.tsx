'use client';

import Image from 'next/image';
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Globe,
  Clock,
  GraduationCap,
  FileText,
  Calendar,
  MessageCircle,
  ArrowRight,
  Lightbulb,
  Heart,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/ScrollReveal';
import { track } from '@/lib/analytics';

const scholarshipPlatforms = [
  {
    name: 'IEFA',
    fullName: 'International Education Financial Aid',
    website: 'https://www.iefa.org',
    description:
      'A comprehensive directory designed specifically for international students. Features scholarships, grants, and student loans with filters by country of origin, degree type, and field of study. No login needed to browse.',
    minRequirements: 'Valid F1 or J1 visa, enrolled in a full-time U.S. institution',
    extraLabel: 'Best Time to Apply',
    extraValue: 'November to February for Fall intakes',
    color: '#059669',
  },
  {
    name: 'Fastweb',
    fullName: 'Fastweb',
    website: 'https://www.fastweb.com',
    description:
      'A U.S.-based scholarship mega-search tool that allows filtering for non-citizens and international students. Create a profile and apply directly via links.',
    minRequirements: 'Enrolled or admitted to a U.S. institution, proof of academic merit or financial need',
    extraLabel: 'Pro Tip',
    extraValue: 'Add a strong personal essay \u2014 Fastweb loves strong applicant profiles.',
    color: '#002868',
  },
  {
    name: 'Scholarships.com',
    fullName: 'Scholarships.com',
    website: 'https://www.scholarships.com',
    description:
      'One of the most user-friendly U.S. sites for finding scholarships by major, state, or college. Track deadlines with the built-in dashboard.',
    minRequirements: 'Must be enrolled or planning to enroll in a U.S. college, some require TOEFL/IELTS or GPA',
    extraLabel: 'Best Time to Apply',
    extraValue: 'Year-round, but prioritize October to March for Fall intakes',
    color: '#D97706',
  },
  {
    name: 'Bold.org',
    fullName: 'Bold.org',
    website: 'https://bold.org',
    description:
      'Fast-growing scholarship platform with easy, essay-based applications. Some awards are for any student globally. Features scholarships for women in STEM, first-gen students, and financial hardship.',
    minRequirements: 'Open to international students, must be 18+ and enrolled in college',
    extraLabel: 'Best Time to Apply',
    extraValue: 'Rolling deadlines \u2014 apply as early as possible',
    color: '#7C3AED',
  },
  {
    name: 'BigFuture',
    fullName: 'BigFuture (College Board)',
    website: 'https://bigfuture.collegeboard.org',
    description:
      'Scholarship + college planning hub run by the SAT people. Use their scholarship match tool \u2014 no login needed unless applying directly.',
    minRequirements: 'Can apply even if not in the U.S. yet, ideal for pre-arrival students',
    extraLabel: 'Best Time to Apply',
    extraValue: 'Use the match tool early, even before landing in the U.S.',
    color: '#DC2626',
  },
];

const checklistItems = [
  'Create profiles on all 5 scholarship platforms',
  'Prepare a strong personal essay (500-1000 words)',
  'Gather academic transcripts and recommendation letters',
  'Apply for your .edu email address from your university',
  'Set calendar reminders for scholarship deadlines',
  'Apply early \u2014 November to February for Fall intakes',
  'Tailor each application to the specific scholarship requirements',
  'Follow up and track all applications in a spreadsheet',
];

const f1Tips = [
  {
    icon: Clock,
    title: 'Start Early',
    description:
      'Many scholarships accept rolling applications but have priority deadlines. Apply as soon as possible for the best chances.',
  },
  {
    icon: GraduationCap,
    title: 'Leverage Your .edu Email',
    description:
      'Many scholarship platforms give priority to applicants with a .edu email address from their U.S. institution.',
  },
  {
    icon: FileText,
    title: 'Write a Killer Essay',
    description:
      'Your personal story matters. Explain your goals, challenges overcome, and how the scholarship will help you succeed.',
  },
];

const keyStats = [
  { value: '$500M+', label: 'Annual Scholarships' },
  { value: '5+', label: 'Top Platforms' },
  { value: 'F1 Eligible', label: 'Visa Type' },
  { value: 'Rolling', label: 'Applications' },
];

interface Props {
  onBack: () => void;
}

export default function ScholarshipsPage({ onBack }: Props) {
  return (
    <div className="min-h-screen bg-white">
      {/* Back Bar */}
      <motion.div
        className="border-b border-gray-100 bg-gray-50/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#002868]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </div>
      </motion.div>

      {/* Hero with Background Image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/bg-scholarships.png"
            alt="Scholarships for international students"
            fill
            className="object-cover"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#002868]/80 to-[#001B4D]/80" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <Globe className="h-8 w-8 text-white" />
            </motion.div>
            <motion.h1
              className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            >
              Scholarships &amp; Opportunities
            </motion.h1>
            <motion.p
              className="mt-4 text-lg text-white/80"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              Find funding for your U.S. education \u2014 scholarships, grants, and financial aid for international students.
            </motion.p>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block h-12 w-full sm:h-16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
          >
            <path
              d="M0,20 C360,60 1080,0 1440,40 L1440,60 L0,60 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Key Stats Bar */}
      <section className="relative -mt-2 z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {keyStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm sm:p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                whileHover={{ y: -2, boxShadow: '0 8px 25px -5px rgba(0,0,0,0.1)' }}
              >
                <p className="text-2xl font-bold text-[#002868] sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-[#6B7280] sm:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Top 5 Scholarship Platforms */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">
              Top Scholarship Search Platforms
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[#6B7280] sm:text-base">
              Whether you are already in the U.S. or just landed with your F1 visa, you can and should apply for scholarships.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 space-y-6">
          {scholarshipPlatforms.map((platform, i) => (
            <ScrollReveal key={platform.name} delay={i * 0.08}>
              <motion.div
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                whileHover={{ y: -2, boxShadow: '0 10px 30px -5px rgba(0,0,0,0.08)' }}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  {/* Left content */}
                  <div className="flex-1">
                    {/* Platform header */}
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white text-sm font-bold"
                        style={{ backgroundColor: platform.color }}
                      >
                        {platform.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-[#0F172A]">
                          {platform.name}
                          <ExternalLink className="h-4 w-4 text-[#6B7280]" />
                        </h3>
                        <a
                          href={platform.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#002868] hover:underline"
                        >
                          {platform.website}
                        </a>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-sm leading-relaxed text-[#374151]">
                      {platform.description}
                    </p>

                    {/* Key Details */}
                    <div className="mt-5 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#002868]/10">
                          <GraduationCap className="h-3.5 w-3.5 text-[#002868]" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                            Min Requirements
                          </p>
                          <p className="mt-0.5 text-sm text-[#0F172A]">{platform.minRequirements}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                          style={{ backgroundColor: `${platform.color}15` }}
                        >
                          {platform.extraLabel === 'Pro Tip' ? (
                            <Lightbulb className="h-3.5 w-3.5" style={{ color: platform.color }} />
                          ) : (
                            <Calendar className="h-3.5 w-3.5" style={{ color: platform.color }} />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                            {platform.extraLabel}
                          </p>
                          <p className="mt-0.5 text-sm text-[#0F172A]">{platform.extraValue}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visit button (desktop) */}
                  <div className="shrink-0 sm:self-center">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        asChild
                        className="w-full rounded-xl bg-[#002868] text-white hover:bg-[#001B4D] sm:w-auto"
                      >
                        <a
                          href={platform.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => track.externalLink(platform.website, `Visit ${platform.name}`)}
                        >
                          Visit Platform
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Application Checklist Section */}
      <section className="bg-gray-50/70">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">
                Your Scholarship Application Checklist
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {checklistItems.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <motion.div
                  className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm border border-gray-100"
                  whileHover={{ x: 4, boxShadow: '0 4px 15px -3px rgba(0,0,0,0.07)' }}
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#002868]" />
                  <p className="text-sm text-[#374151] leading-relaxed">{item}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* F1 Tips Section */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">
                F1 Scholarship Tips
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {f1Tips.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <ScrollReveal key={tip.title} delay={i * 0.1}>
                  <motion.div
                    className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                    whileHover={{ y: -4, boxShadow: '0 12px 30px -5px rgba(0,0,0,0.08)' }}
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#002868]/10">
                      <Icon className="h-6 w-6 text-[#002868]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0F172A]">{tip.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                      {tip.description}
                    </p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0F172A]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <motion.div
                className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#002868]/20"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <Heart className="h-7 w-7 text-[#60A5FA]" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Need Help Finding Scholarships?
              </h2>
              <p className="mt-3 text-sm text-[#94A3B8] sm:text-base">
                Our counselors have information on many scholarships and bursaries that you may be eligible for.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    asChild
                    className="w-full rounded-xl bg-[#25D366] px-8 text-white hover:bg-[#1EB954] sm:w-auto"
                  >
                    <a href="https://wa.me/13028935594" onClick={() => track.ctaClick({ cta_type: 'whatsapp', cta_source: 'scholarships_page', cta_text: 'WhatsApp Chat' })} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp Us
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    asChild
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-8 text-white backdrop-blur-sm hover:bg-white/20 sm:w-auto"
                  >
                    <a href="https://wa.me/13028935594?text=Hi%20UCSG%2C%20I%20need%20help%20with%20scholarships" onClick={() => track.ctaClick({ cta_type: 'whatsapp', cta_source: 'scholarships_page', cta_text: 'Get Help with Scholarships' })} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-2 h-4 w-4" />
                      Contact Us
                    </a>
                  </Button>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
