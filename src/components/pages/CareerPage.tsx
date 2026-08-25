'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Heart,
  Shield,
  TrendingUp,
  Target,
  MapPin,
  Clock,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Sparkles,
  Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedHeading } from '@/components/animations/TextReveal';
import { track } from '@/lib/analytics';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const whyWork = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description:
      'Every day you help international students achieve their American education dreams — work that truly matters.',
    color: '#0874F9',
    bg: '#0874F910',
  },
  {
    icon: Shield,
    title: 'Veteran-Led',
    description:
      'Founded by a U.S. Army Veteran, our leadership brings discipline, integrity, and service-first values to everything we do.',
    color: '#061846',
    bg: '#06184610',
  },
  {
    icon: TrendingUp,
    title: 'Growth',
    description:
      'A rapidly expanding organization where your contributions shape the future of international education consulting.',
    color: '#D6A84B',
    bg: '#D6A84B10',
  },
  {
    icon: Heart,
    title: 'Impact',
    description:
      'Join a team that has helped 5,000+ students and is on track to reach 50,000 by 2030 through your direct efforts.',
    color: '#059669',
    bg: '#05966910',
  },
];

const openings = [
  {
    title: 'Senior Education Consultant',
    type: 'Full-time',
    location: 'Jackson Heights, NY',
    locationType: 'On-site',
    description:
      'Help F-1 students navigate university transfers and program selection. You will be the primary point of contact for students exploring their educational options, guiding them from initial consultation through enrollment.',
    requirements: [
      '3+ years experience in education consulting or international student advising',
      'Deep knowledge of F-1 visa regulations, SEVIS, and university admissions',
      'Excellent cross-cultural communication skills',
      'Bachelor\'s degree required; Master\'s preferred',
    ],
    color: '#0874F9',
  },
  {
    title: 'Immigration Compliance Specialist',
    type: 'Full-time',
    location: 'Remote',
    locationType: 'Remote',
    description:
      'Ensure student cases maintain proper documentation and SEVIS compliance. Monitor regulatory changes, prepare compliance reports, and coordinate with students to maintain their visa status throughout their studies.',
    requirements: [
      '2+ years experience in immigration compliance or related legal field',
      'Strong understanding of SEVIS, I-20 processes, and F-1 regulations',
      'Detail-oriented with exceptional organizational skills',
      'Ability to work independently in a remote environment',
    ],
    color: '#061846',
  },
  {
    title: 'Digital Marketing Associate',
    type: 'Full-time',
    location: 'New York, NY',
    locationType: 'Hybrid',
    description:
      'Drive student awareness through content, SEO, and social media. Create compelling campaigns that reach international students, manage digital channels, and analyze performance metrics to optimize outreach.',
    requirements: [
      '2+ years experience in digital marketing, content creation, or social media',
      'Experience with SEO tools, Google Analytics, and social platforms',
      'Strong writing skills with experience in multicultural audiences',
      'Portfolio of published content or campaigns',
    ],
    color: '#D6A84B',
  },
  {
    title: 'Student Success Coordinator',
    type: 'Full-time',
    location: 'Jackson Heights, NY',
    locationType: 'On-site',
    description:
      'Support enrolled students from orientation through graduation. Serve as a dedicated resource for academic guidance, cultural adjustment, and career readiness, ensuring every student has the support they need to thrive.',
    requirements: [
      '2+ years in student affairs, academic advising, or counseling',
      'Empathetic, patient, and excellent at building student relationships',
      'Knowledge of U.S. higher education systems and student support services',
      'Bachelor\'s degree in Education, Counseling, or related field',
    ],
    color: '#059669',
  },
];

const cultureValues = [
  { icon: Shield, label: 'Integrity First', description: 'We do the right thing, even when no one is watching.' },
  { icon: Users, label: 'Student-Centric', description: 'Every decision starts with "how does this help our students?"' },
  { icon: Sparkles, label: 'Continuous Growth', description: 'We invest in learning and encourage bold ideas.' },
  { icon: Heart, label: 'Compassion', description: 'We treat every student and teammate with genuine care.' },
  { icon: GraduationCap, label: 'Excellence', description: 'We hold ourselves to the highest professional standards.' },
  { icon: Briefcase, label: 'Accountability', description: 'We own our work and deliver on our commitments.' },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */
interface CareerPageProps {
  onBack: () => void;
}

export default function CareerPage({ onBack }: CareerPageProps) {
  const handleApplyClick = () => {
    track.ctaClick({
      cta_type: 'assessment',
      cta_source: 'career_page_cta',
      cta_text: 'Start Your Application',
    });
    window.dispatchEvent(new CustomEvent('ucsg-assessment', { detail: { open: 'assessment' } }));
  };

  const handlePhoneClick = () => {
    track.ctaClick({
      cta_type: 'phone',
      cta_source: 'career_page_cta',
      cta_text: 'Talk With Our Team',
    });
  };

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
            <ArrowLeft className="h-4 w-4" />
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
              transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="h-px w-8 bg-[#D6A84B]/50" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6A84B]">
                We're Hiring
              </span>
              <div className="h-px w-8 bg-[#D6A84B]/50" />
            </motion.div>

            <motion.h1
              className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Join Our Team of{' '}
              <span className="text-[#D6A84B]">Education Advocates</span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              Help us transform international education. At UCSG, your work directly
              changes lives — one student at a time.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────── Why Work at UCSG ──────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="WHY UCSG"
            title="Why Work at UCSG"
            description="More than a job — a purpose-driven career helping students achieve their American dream."
            badgeColor="#061846"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {whyWork.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="group h-full border-transparent bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ backgroundColor: item.bg }}
                      >
                        <Icon
                          className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
                          style={{ color: item.color }}
                        />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-[#0F172A]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────── Current Openings ──────────────────────────────── */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="OPEN POSITIONS"
            title="Current Openings"
            description="Find a role where your skills and passion for education make a real difference."
            badgeColor="#D6A84B"
          />

          <div className="mt-12 space-y-6 lg:mt-16">
            {openings.map((job, i) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="overflow-hidden border-transparent bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        {/* Color accent */}
                        <div className="mb-4 h-1 w-12 rounded-full" style={{ backgroundColor: job.color }} />

                        <h3 className="font-heading text-xl font-bold text-[#0F172A]">{job.title}</h3>

                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <Badge
                            variant="outline"
                            className="text-xs"
                            style={{
                              backgroundColor: `${job.color}08`,
                              color: job.color,
                              borderColor: `${job.color}25`,
                            }}
                          >
                            <Briefcase className="mr-1 h-3 w-3" />
                            {job.type}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs"
                            style={{
                              backgroundColor: `${job.color}08`,
                              color: job.color,
                              borderColor: `${job.color}25`,
                            }}
                          >
                            <MapPin className="mr-1 h-3 w-3" />
                            {job.location}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs"
                            style={{
                              backgroundColor: `${job.color}08`,
                              color: job.color,
                              borderColor: `${job.color}25`,
                            }}
                          >
                            <Clock className="mr-1 h-3 w-3" />
                            {job.locationType}
                          </Badge>
                        </div>

                        <p className="mt-4 text-sm leading-relaxed text-[#6B7280]">{job.description}</p>

                        {/* Requirements */}
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-[#0F172A]">Requirements</h4>
                          <ul className="mt-2 space-y-1.5">
                            {job.requirements.map((req) => (
                              <li key={req} className="flex items-start gap-2 text-sm text-[#6B7280]">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: job.color }} />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Apply button on desktop */}
                      <div className="shrink-0 sm:ml-6">
                        <motion.button
                          onClick={handleApplyClick}
                          className="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:w-auto"
                          style={{ backgroundColor: job.color }}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                          onFocus={(e) => {
                            e.currentTarget.style.outline = 'none';
                            e.currentTarget.style.boxShadow = `0 0 0 2px white, 0 0 0 4px ${job.color}`;
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          Apply Now
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </motion.button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────── Company Culture ──────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            badge="OUR VALUES"
            title="Company Culture"
            description="The values that define how we work, collaborate, and serve our students every day."
            badgeColor="#0874F9"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {cultureValues.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.label}
                  className="group"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-start gap-4 rounded-xl border border-transparent p-5 transition-all duration-300 hover:border-[#D6A84B]/20 hover:bg-[#F8FAFC]">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#061846]">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-heading text-base font-bold text-[#0F172A]">{value.label}</h4>
                      <p className="mt-1 text-sm text-[#6B7280]">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────── CTA Section ──────────────────────────────── */}
      <section
        aria-label="Call to action"
        className="relative w-full overflow-hidden bg-gradient-to-b from-[#061846] to-[#092B68] py-16 sm:py-20 lg:py-24"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-[3] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0874F9]/[0.07] blur-3xl"
          aria-hidden="true"
        />
        <div className="ucsg-orbit-lines pointer-events-none absolute inset-0 z-[2]" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.p
            className="mb-3 text-sm font-medium uppercase tracking-widest text-[#D6A84B] sm:mb-4 sm:text-base"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
          >
            YOUR CAREER STARTS HERE
          </motion.p>

          <motion.h2
            className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={1}
          >
            Ready to Make a Difference?
          </motion.h2>

          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:mt-6 sm:text-lg"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={2}
          >
            Whether you see yourself in one of our open roles or want to explore how your
            skills can contribute to our mission, we&apos;d love to hear from you.
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
              onClick={handleApplyClick}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#0874F9] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#0874F9]/25 transition-all duration-300 hover:bg-[#0660D4] hover:shadow-xl hover:shadow-[#0874F9]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874F9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061846] sm:w-auto sm:px-8"
            >
              Start Your Application
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </button>

            <a
              href="tel:+13028935594"
              onClick={handlePhoneClick}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061846] sm:w-auto sm:px-8"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Talk With Our Team
            </a>
          </motion.div>

          <motion.p
            className="mt-6 text-xs text-white/40 sm:mt-8 sm:text-sm"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={4}
          >
            Available by phone, WhatsApp, or email during business hours.
          </motion.p>
        </div>
      </section>

      {/* ──────────────────────────────── Disclaimer ──────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-[#6B7280]">
          UCSG is an equal opportunity employer. We celebrate diversity and are committed
          to creating an inclusive environment for all team members.
        </p>
      </section>
    </div>
  );
}
