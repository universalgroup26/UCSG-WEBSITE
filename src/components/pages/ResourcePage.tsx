'use client';

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
import type { ResourceData } from '@/lib/data/resources';

const iconComponents: Record<string, React.ElementType> = {
  briefcase: Briefcase,
  'graduation-cap': GraduationCap,
  'shield-check': ShieldCheck,
  'refresh-cw': RefreshCw,
};

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
      <div className="border-b border-gray-100 bg-gray-50/50">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-medium text-[#64748B] transition-colors hover:text-[#0070F3]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${resource.heroGradient}`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <HeroIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {resource.title}
            </h1>
            <p className="mt-4 text-lg text-white/80">{resource.subtitle}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button className="h-12 rounded-full bg-white px-8 font-semibold shadow-lg transition-all hover:scale-105" style={{ color: resource.heroGradient.includes('#7C3AED') ? '#7C3AED' : resource.heroGradient.includes('#059669') ? '#059669' : resource.heroGradient.includes('#DC2626') ? '#DC2626' : '#0070F3' }}>
                {resource.ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button className="h-12 rounded-full border-2 border-white bg-transparent px-8 font-semibold text-white hover:bg-white/10">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp 24/7
              </Button>
            </div>
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
            {resource.keyFacts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <p className="text-2xl font-bold sm:text-3xl" style={{ color: fact.color }}>
                  {fact.value}
                </p>
                <p className="mt-1 text-xs text-[#64748B] sm:text-sm">{fact.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-bold text-[#111827] sm:text-2xl">Overview</h2>
            <p className="mt-4 leading-relaxed text-[#64748B]">{resource.overview}</p>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="bg-[#F8FAFC] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-xl font-bold text-[#111827] sm:text-2xl">How It Works</h2>
            <p className="mt-2 text-[#64748B]">Our step-by-step process to get you started</p>
          </div>
          <div className="relative mx-auto max-w-3xl">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-gray-200 sm:block" />
            <div className="space-y-8">
              {resource.steps.map((step) => (
                <div key={step.step} className="relative flex gap-5 sm:gap-8">
                  {/* Step Number Circle */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0070F3] text-lg font-bold text-white shadow-md">
                    {step.step}
                  </div>
                  {/* Content */}
                  <div className="flex-1 rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-lg font-semibold text-[#111827]">{step.title}</h3>
                      <Badge className="w-fit border-[#0070F3]/20 bg-[#DBEAFE] text-[#0070F3]">
                        <Clock className="mr-1 h-3 w-3" />
                        {step.timeline}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-xl font-bold text-[#111827] sm:text-2xl">Why Choose UCSG</h2>
            <p className="mt-2 text-[#64748B]">Benefits of working with our team</p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resource.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#059669]" />
                <span className="text-sm text-[#64748B]">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F8FAFC] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-xl font-bold text-[#111827] sm:text-2xl">Frequently Asked Questions</h2>
          </div>
          <div className="mx-auto max-w-3xl space-y-3">
            {resource.faqs.map((faq, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                >
                  <span className="pr-4 font-medium text-[#111827]">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#64748B] transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="border-t border-gray-50 px-6 pb-5 pt-3">
                    <p className="text-sm leading-relaxed text-[#64748B]">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0B1120] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-2xl font-bold text-white sm:text-3xl">Ready to Get Started?</h3>
            <p className="mt-3 text-[#94A3B8]">
              Expert guidance from UCSG — Available 24/7
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button className="h-12 rounded-full bg-white px-8 font-semibold text-[#0B1120] shadow-lg hover:bg-gray-100">
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </Button>
              <Button className="h-12 rounded-full border border-white/20 bg-transparent px-8 font-semibold text-white hover:bg-white/10">
                {resource.ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
