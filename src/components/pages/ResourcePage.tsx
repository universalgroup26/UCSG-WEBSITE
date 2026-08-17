'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Briefcase,
  ShieldCheck,
  GraduationCap,
  RefreshCw,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import type { ResourceData } from '@/lib/data/resources';
import ResourceMindmap from '@/components/infographics/ResourceMindmap';
import CPTvsOPTInfographic from '@/components/infographics/CPTvsOPTInfographic';
import VisaPathwayFlowchart from '@/components/infographics/VisaPathwayFlowchart';
import SEVISRecoveryFlowchart from '@/components/infographics/SEVISRecoveryFlowchart';

const iconComponents: Record<string, React.ElementType> = {
  briefcase: Briefcase,
  'graduation-cap': GraduationCap,
  'shield-check': ShieldCheck,
  'refresh-cw': RefreshCw,
};

function ScrollReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface Props {
  resource: ResourceData;
  onBack: () => void;
}

export default function ResourcePage({ resource, onBack }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const HeroIcon = iconComponents[resource.icon] || Briefcase;

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
            className="flex items-center gap-1.5 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#006F8F]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </div>
      </motion.div>

      {/* Hero with Background Image */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={resource.heroBgImage}
            alt={`${resource.title} background`}
            fill
            className="object-cover"
            unoptimized
            priority
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${resource.heroGradient} opacity-80`} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <HeroIcon className="h-8 w-8 text-white" />
            </motion.div>
            <motion.h1
              className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {resource.title}
            </motion.h1>
            <motion.p
              className="mt-4 text-lg text-white/80"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              {resource.subtitle}
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button className="h-12 rounded-full bg-white px-8 font-semibold shadow-lg" style={{ color: resource.heroGradient.includes('#7C3AED') ? '#7C3AED' : resource.heroGradient.includes('#059669') ? '#059669' : resource.heroGradient.includes('#DC2626') ? '#DC2626' : '#006F8F' }}>
                  {resource.ctaText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button className="h-12 rounded-full border-2 border-white bg-transparent px-8 font-semibold text-white hover:bg-white/10">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp 24/7
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <svg viewBox="0 0 1440 60" fill="none" className="block w-full" preserveAspectRatio="none">
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" fill="white" />
        </svg>
      </section>

      {/* Key Facts Infographic Bar */}
      <section className="-mt-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {resource.keyFacts.map((fact, i) => (
              <motion.div
                key={fact.label}
                className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm"
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -2, shadow: '0 4px 12px rgba(0,0,0,0.08)' }}
              >
                <p className="text-2xl font-bold sm:text-3xl" style={{ color: fact.color }}>
                  {fact.value}
                </p>
                <p className="mt-1 text-xs text-[#6B7280] sm:text-sm">{fact.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview with Visual */}
      <ScrollReveal className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h2 className="text-xl font-bold text-[#1E2D3B] sm:text-2xl">Overview</h2>
              <p className="mt-4 leading-relaxed text-[#6B7280]">{resource.overview}</p>
            </div>
            <div className="relative hidden h-64 overflow-hidden rounded-2xl border border-gray-100 shadow-sm lg:col-span-2 lg:block">
              <Image
                src="/images/documents.png"
                alt="Professional document guidance"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Topic-Specific Mindmap */}
      <ResourceMindmap resourceId={resource.id} />

      {/* Topic-Specific Infographic */}
      {resource.id === 'day1-cpt' && <CPTvsOPTInfographic />}
      {resource.id === 'change-of-status' && <VisaPathwayFlowchart />}
      {resource.id === 'sevis-reinstatement' && <SEVISRecoveryFlowchart />}

      {/* Process Timeline */}
      <section className="bg-[#F7F7F7] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-xl font-bold text-[#1E2D3B] sm:text-2xl">How It Works</h2>
            <p className="mt-2 text-[#6B7280]">Our step-by-step process to get you started</p>
          </ScrollReveal>
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-gray-200 sm:block" />
            <div className="space-y-8">
              {resource.steps.map((step, i) => (
                <ScrollReveal key={step.step} delay={i * 0.1}>
                  <div className="relative flex gap-5 sm:gap-8">
                    <motion.div
                      className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#006F8F] text-lg font-bold text-white shadow-md"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {step.step}
                    </motion.div>
                    <div className="flex-1 rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="text-lg font-semibold text-[#1E2D3B]">{step.title}</h3>
                        <Badge className="w-fit border-[#006F8F]/20 bg-[#E0F4F8] text-[#006F8F]">
                          <Clock className="mr-1 h-3 w-3" />
                          {step.timeline}
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{step.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-xl font-bold text-[#1E2D3B] sm:text-2xl">Why Choose UCSG</h2>
            <p className="mt-2 text-[#6B7280]">Benefits of working with our team</p>
          </ScrollReveal>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resource.benefits.map((benefit, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ delay: 0.1 + i * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#059669]" />
                  </motion.div>
                  <span className="text-sm text-[#6B7280]">{benefit}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F7F7] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-xl font-bold text-[#1E2D3B] sm:text-2xl">Frequently Asked Questions</h2>
          </ScrollReveal>
          <div className="mx-auto max-w-3xl space-y-3">
            {resource.faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="pr-4 font-medium text-[#1E2D3B]">{faq.question}</span>
                    <motion.span
                      className="shrink-0"
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown className="h-5 w-5 text-[#6B7280]" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-gray-50 px-6 pb-5 pt-3">
                          <p className="text-sm leading-relaxed text-[#6B7280]">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <ScrollReveal>
        <section className="bg-[#1E2D3B] py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h3 className="text-2xl font-bold text-white sm:text-3xl">Ready to Get Started?</h3>
              <p className="mt-3 text-[#94A3B8]">
                Expert guidance from UCSG — Available 24/7
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button className="h-12 rounded-full bg-[#25D366] px-8 font-semibold text-white shadow-lg hover:bg-[#1EB954]" asChild>
                    <a href="https://wa.me/13028935594" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button className="h-12 rounded-full border border-white/20 bg-transparent px-8 font-semibold text-white hover:bg-white/10">
                    {resource.ctaText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
