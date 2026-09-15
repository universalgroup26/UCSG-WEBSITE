'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Shield,
  Phone,
  Star,
  GraduationCap,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { track } from '@/lib/analytics';
import { ComplianceDisclosure } from './VeteranInfoPage';

/* ------------------------------------------------------------------ */
/*  Types & data                                                      */
/* ------------------------------------------------------------------ */

interface VeteranFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  militaryConnection: string;
  highestEducation: string;
  degreeGoal: string;
  preferredFormat: string;
  areaOfStudy: string;
  startTerm: string;
  mainGoal: string;
  speakWithAdvisor: string;
  consent: boolean;
}

const INITIAL_FORM: VeteranFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  state: '',
  militaryConnection: '',
  highestEducation: '',
  degreeGoal: '',
  preferredFormat: '',
  areaOfStudy: '',
  startTerm: '',
  mainGoal: '',
  speakWithAdvisor: '',
  consent: false,
};

const MILITARY_CONNECTIONS = [
  'Veteran',
  'Transitioning Service Member',
  'Guard / Reserve',
  'Military Spouse',
  'Prefer Not to Say',
];

const HIGHEST_EDUCATION = [
  'High School',
  'Some College',
  'Associate Degree',
  "Bachelor's Degree",
  "Master's Degree",
  'Doctorate',
  'Other',
];

const DEGREE_GOALS = [
  "Bachelor's",
  "Master's",
  'MBA',
  'Doctoral',
  'Certificate',
  'Not Sure',
];

const PREFERRED_FORMATS = ['Online', 'Hybrid', 'On Campus', 'Not Sure'];

const START_TERMS = [
  'Spring 2026',
  'Summer 2026',
  'Fall 2026',
  'Spring 2027',
  'Later / Not Sure',
];

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA',
  'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM',
  'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA',
  'WV', 'WI', 'WY', 'AE', 'AA', 'AP', 'Other',
];

/* ------------------------------------------------------------------ */
/*  Reusable field wrappers                                            */
/* ------------------------------------------------------------------ */

function TextField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
  id,
  error,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  id?: string;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        autoComplete={autoComplete}
        className="h-11 rounded-lg border-slate-200 bg-white text-sm focus:border-[#0874F9] focus:ring-[#0874F9]/20"
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  label,
  value,
  onValueChange,
  placeholder,
  options,
  required,
  id,
  error,
}: {
  label: string;
  value: string;
  onValueChange: (v: string) => void;
  placeholder: string;
  options: readonly string[];
  required?: boolean;
  id?: string;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          id={id}
          aria-label={label}
          className="h-11 w-full rounded-lg border-slate-200 bg-white text-sm focus:border-[#0874F9] focus:ring-[#0874F9]/20"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-y-auto rounded-lg">
          {options.map((opt) => (
            <SelectItem key={opt} value={opt} className="text-sm">
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

interface Props {
  onBack?: () => void;
}

export default function VeteranAssessmentForm({ onBack }: Props) {
  const [form, setForm] = useState<VeteranFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formStarted, setFormStarted] = useState(false);
  const touchedRef = useRef(false);

  // Track form-start event on first interaction
  useEffect(() => {
    if (!formStarted || touchedRef.current) return;
    touchedRef.current = true;
    track.formEvent({
      event: 'form_start',
      form_id: 'veteran_assessment',
      form_name: 'Veteran Degree Assessment',
    });
    track.customEvent('veteran_assessment_start', {});
  }, [formStarted]);

  const handleChange = useCallback((patch: Partial<VeteranFormData>) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setFormStarted(true);
    setErrors((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(patch)) {
        delete next[key];
      }
      return next;
    });
  }, []);

  const validate = useCallback((): boolean => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = 'Please enter your first name.';
    if (!form.lastName.trim()) e.lastName = 'Please enter your last name.';
    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = 'Please enter a valid email address.';
    if (!form.phone.trim()) e.phone = 'Please enter your mobile phone number.';
    if (!form.state) e.state = 'Please select your state.';
    if (!form.militaryConnection) e.militaryConnection = 'Please select your military connection.';
    if (!form.highestEducation) e.highestEducation = 'Please select your highest education.';
    if (!form.degreeGoal) e.degreeGoal = 'Please select your degree goal.';
    if (!form.preferredFormat) e.preferredFormat = 'Please select your preferred format.';
    if (!form.speakWithAdvisor) e.speakWithAdvisor = 'Please select an option.';
    if (!form.consent) e.consent = 'You must agree to be contacted.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (submitting) return;
      if (!validate()) return;

      setSubmitting(true);

      // Build a readable message containing all veteran-specific fields
      const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
      const message = [
        '--- Veteran Degree Assessment ---',
        '',
        `Military Connection: ${form.militaryConnection}`,
        `Highest Education: ${form.highestEducation}`,
        `Degree Goal: ${form.degreeGoal}`,
        `Preferred Format: ${form.preferredFormat}`,
        `Area of Study: ${form.areaOfStudy || 'Not specified'}`,
        `Desired Start Term: ${form.startTerm || 'Not specified'}`,
        `Main Goal: ${form.mainGoal || 'Not specified'}`,
        `Speak with Advisor: ${form.speakWithAdvisor}`,
        `State: ${form.state}`,
      ].join('\n');

      // Generate a veteran-prefixed event_id for CAPI deduplication
      const metaEventId = `veteran-${track.generateEventId()}`;

      // ⚡ Fire analytics IMMEDIATELY — GHL + Meta Pixel + GA4 + custom event
      track.customEvent('veteran_assessment_complete', {
        military_connection: form.militaryConnection,
        degree_goal: form.degreeGoal,
        preferred_format: form.preferredFormat,
      });
      track.customEvent('lead_submit', { source: 'veteran_assessment' });
      track.formEvent({
        event: 'form_submit',
        form_id: 'veteran_assessment',
        form_name: 'Veteran Degree Assessment',
      });
      track.leadConversion({
        formId: 'veteran_assessment',
        formName: 'Veteran Degree Assessment',
        name: fullName,
        email: form.email.trim(),
        phone: form.phone.trim(),
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        service: form.degreeGoal,
        value: 50,
        currency: 'USD',
        eventId: metaEventId,
        externalId: track.getOrCreateExternalId(),
        ghlFields: {
          military_connection: form.militaryConnection,
          highest_education: form.highestEducation,
          degree_goal: form.degreeGoal,
          preferred_format: form.preferredFormat,
          area_of_study: form.areaOfStudy,
          desired_start_term: form.startTerm,
          main_goal: form.mainGoal,
          speak_with_advisor: form.speakWithAdvisor,
          state: form.state,
        },
      });

      // Send to server for DB, email, CAPI (non-blocking for UX)
      const consentRaw = typeof window !== 'undefined' ? localStorage.getItem('ucsg_consent_v2') : null;
      const consentState = consentRaw ? (JSON.parse(consentRaw) as { advertising?: boolean }) : null;
      const attribution = track.getAttribution();

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email: form.email.trim(),
          phone: form.phone.trim(),
          service: form.degreeGoal,
          message,
          source: 'Veteran Assessment',
          meta_event_id: metaEventId,
          meta_lead_value: 50,
          meta_currency: 'USD',
          meta_consent_advertising: consentState?.advertising !== false,
          meta_external_id: track.getOrCreateExternalId(),
          gclid: attribution.lastTouch?.gclid || attribution.firstTouch?.gclid,
          // Veteran-specific custom fields for GHL
          military_connection: form.militaryConnection,
          highest_education: form.highestEducation,
          degree_goal: form.degreeGoal,
          preferred_format: form.preferredFormat,
          area_of_study: form.areaOfStudy,
          desired_start_term: form.startTerm,
          main_goal: form.mainGoal,
          speak_with_advisor: form.speakWithAdvisor,
          state: form.state,
          tags: [
            'Veteran',
            form.militaryConnection,
            form.degreeGoal,
            form.preferredFormat,
          ].join(','),
        }),
      }).then((res) => {
        if (!res.ok) {
          track.formEvent({
            event: 'form_error',
            form_id: 'veteran_assessment',
            error_message: `HTTP ${res.status}`,
          });
        }
      }).catch(() => {
        track.formEvent({
          event: 'form_error',
          form_id: 'veteran_assessment',
          error_message: 'Network error',
        });
      }).finally(() => {
        setSubmitting(false);
      });

      // Show success immediately — GHL + Meta already received the lead
      setSubmitted(true);
    },
    [form, submitting, validate]
  );

  const handleBack = () => {
    if (onBack) return onBack();
    window.dispatchEvent(
      new CustomEvent('ucsg-navigate', { detail: { view: 'veterans' } })
    );
  };

  const handleAdvisorClick = () => {
    track.ctaClick({
      cta_type: 'contact',
      cta_source: 'veteran_assessment_book_consultation',
      cta_text: 'Book a Consultation',
    });
    window.dispatchEvent(
      new CustomEvent('ucsg-navigate', {
        detail: { view: 'veterans', id: 'book-consultation' },
      })
    );
  };

  /* ----------------------------- Render ----------------------------- */

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        {/* Back Bar */}
        <motion.div
          className="border-b border-gray-100 bg-gray-50/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#061846]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Veterans Hub
            </button>
          </div>
        </motion.div>

        <section className="relative overflow-hidden bg-gradient-to-b from-[#061846] via-[#092B68] to-[#061846] py-16 sm:py-24">
          <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15"
            >
              <CheckCircle2 className="h-8 w-8 text-green-400" aria-hidden="true" />
            </motion.div>
            <motion.h1
              className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Assessment Received
            </motion.h1>
            <motion.p
              className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Thank you for your submission, {form.firstName}. A UCSG veteran education advisor
              will review your goals and reach out within one business day.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <button
                type="button"
                onClick={handleAdvisorClick}
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#0874F9] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#0874F9]/25 transition-all duration-300 hover:bg-[#0660D4] hover:shadow-xl hover:shadow-[#0874F9]/35 sm:w-auto sm:px-8"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Book a Consultation Now
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                onClick={handleBack}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/5 sm:w-auto sm:px-8"
              >
                Back to Veterans Hub
              </button>
            </motion.div>
          </div>
        </section>

        <ComplianceDisclosure />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Bar */}
      <motion.div
        className="border-b border-gray-100 bg-gray-50/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#061846]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Veterans Hub
          </button>
        </div>
      </motion.div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#061846] via-[#092B68] to-[#061846]">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[#D6A84B]/[0.08] blur-[100px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8">
          <motion.div
            className="mb-4 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
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
            transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Start Your Veteran Degree Assessment
          </motion.h1>

          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Takes about 3 minutes. No enrollment commitment. We&apos;ll review your goals, prior
            learning, and degree-path options — then walk you through what&apos;s possible.
          </motion.p>

          <motion.div
            className="mt-5 flex items-center justify-center gap-5 text-xs text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-[#D6A84B]" aria-hidden="true" />
              No SSN Required
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-[#D6A84B]" aria-hidden="true" />
              No DD-214 Required
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <Star className="h-3.5 w-3.5 text-[#D6A84B]" aria-hidden="true" />
              No Enrollment Commitment
            </span>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {/* Section: About You */}
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0874F9]/10">
                    <span className="text-sm font-bold text-[#0874F9]">1</span>
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-bold text-[#061846]">About You</h2>
                    <p className="text-xs text-[#6B7280]">
                      Basic contact information so we can follow up.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    label="First Name"
                    id="veteran-first-name"
                    value={form.firstName}
                    onChange={(v) => handleChange({ firstName: v })}
                    placeholder="John"
                    required
                    autoComplete="given-name"
                    error={errors.firstName}
                  />
                  <TextField
                    label="Last Name"
                    id="veteran-last-name"
                    value={form.lastName}
                    onChange={(v) => handleChange({ lastName: v })}
                    placeholder="Doe"
                    required
                    autoComplete="family-name"
                    error={errors.lastName}
                  />
                  <TextField
                    label="Email"
                    id="veteran-email"
                    type="email"
                    value={form.email}
                    onChange={(v) => handleChange({ email: v })}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    error={errors.email}
                  />
                  <TextField
                    label="Mobile Phone"
                    id="veteran-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(v) => handleChange({ phone: v })}
                    placeholder="(555) 555-5555"
                    required
                    autoComplete="tel"
                    error={errors.phone}
                  />
                  <SelectField
                    label="State"
                    id="veteran-state"
                    value={form.state}
                    onValueChange={(v) => handleChange({ state: v })}
                    placeholder="Select your state"
                    options={US_STATES}
                    required
                    error={errors.state}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section: Military Connection */}
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#061846]/10">
                    <span className="text-sm font-bold text-[#061846]">2</span>
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-bold text-[#061846]">
                      Your Military Connection
                    </h2>
                    <p className="text-xs text-[#6B7280]">
                      Helps us tailor our guidance. Prefer not to say? That&apos;s fine.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <SelectField
                    label="Military Connection"
                    id="veteran-military-connection"
                    value={form.militaryConnection}
                    onValueChange={(v) => handleChange({ militaryConnection: v })}
                    placeholder="Select your connection"
                    options={MILITARY_CONNECTIONS}
                    required
                    error={errors.militaryConnection}
                  />
                  <SelectField
                    label="Highest Education"
                    id="veteran-highest-education"
                    value={form.highestEducation}
                    onValueChange={(v) => handleChange({ highestEducation: v })}
                    placeholder="Select your highest education"
                    options={HIGHEST_EDUCATION}
                    required
                    error={errors.highestEducation}
                  />
                </div>

                <div className="mt-4 rounded-lg bg-slate-50 p-3">
                  <p className="text-xs leading-relaxed text-[#6B7280]">
                    <Shield className="mr-1 inline h-3.5 w-3.5 text-[#D6A84B]" aria-hidden="true" />
                    We do <strong>not</strong> request your SSN, DD-214, disability rating, VA claim
                    number, or any banking / medical information on this form.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section: Degree Goals */}
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D6A84B]/15">
                    <span className="text-sm font-bold text-[#D6A84B]">3</span>
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-bold text-[#061846]">
                      Your Degree Goals
                    </h2>
                    <p className="text-xs text-[#6B7280]">
                      Tell us where you&apos;d like to go next.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <SelectField
                    label="Degree Goal"
                    id="veteran-degree-goal"
                    value={form.degreeGoal}
                    onValueChange={(v) => handleChange({ degreeGoal: v })}
                    placeholder="Select your degree goal"
                    options={DEGREE_GOALS}
                    required
                    error={errors.degreeGoal}
                  />
                  <SelectField
                    label="Preferred Format"
                    id="veteran-preferred-format"
                    value={form.preferredFormat}
                    onValueChange={(v) => handleChange({ preferredFormat: v })}
                    placeholder="Select your preferred format"
                    options={PREFERRED_FORMATS}
                    required
                    error={errors.preferredFormat}
                  />
                  <TextField
                    label="Area of Study (optional)"
                    id="veteran-area-of-study"
                    value={form.areaOfStudy}
                    onChange={(v) => handleChange({ areaOfStudy: v })}
                    placeholder="e.g., Business, Cybersecurity, Nursing"
                  />
                  <SelectField
                    label="Desired Start Term (optional)"
                    id="veteran-start-term"
                    value={form.startTerm}
                    onValueChange={(v) => handleChange({ startTerm: v })}
                    placeholder="Select your desired start term"
                    options={START_TERMS}
                  />
                </div>

                <div className="mt-4 space-y-1.5">
                  <Label htmlFor="veteran-main-goal" className="text-sm font-medium text-slate-700">
                    Main Goal (optional)
                  </Label>
                  <textarea
                    id="veteran-main-goal"
                    value={form.mainGoal}
                    onChange={(e) => handleChange({ mainGoal: e.target.value })}
                    placeholder="What are you trying to achieve with this degree? e.g., career change, promotion, finish what I started..."
                    rows={3}
                    className="w-full resize-none rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0874F9] focus:outline-none focus:ring-2 focus:ring-[#0874F9]/20"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section: Speak with Advisor + Consent */}
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0874F9]/10">
                    <GraduationCap className="h-5 w-5 text-[#0874F9]" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-bold text-[#061846]">
                      Speak With an Education Advisor?
                    </h2>
                    <p className="text-xs text-[#6B7280]">
                      Free, no-pressure consultation. You decide after we talk.
                    </p>
                  </div>
                </div>

                <SelectField
                  label="Would you like to speak with an education advisor?"
                  id="veteran-speak-advisor"
                  value={form.speakWithAdvisor}
                  onValueChange={(v) => handleChange({ speakWithAdvisor: v })}
                  placeholder="Select an option"
                  options={['Yes', 'Maybe Later']}
                  required
                  error={errors.speakWithAdvisor}
                />

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="veteran-consent"
                      checked={form.consent}
                      onCheckedChange={(checked) =>
                        handleChange({ consent: checked === true })
                      }
                      className="mt-1 data-[state=checked]:border-[#0874F9] data-[state=checked]:bg-[#0874F9]"
                    />
                    <label htmlFor="veteran-consent" className="text-sm leading-relaxed text-slate-700">
                      I consent to be contacted by Universal Consulting Service Group about my
                      education planning goals via phone, SMS, and email. I understand I can
                      unsubscribe at any time. <span className="text-red-500">*</span>
                    </label>
                  </div>
                  {errors.consent && (
                    <p className="text-xs text-red-500" role="alert">
                      {errors.consent}
                    </p>
                  )}
                </div>

                <div className="mt-6 rounded-lg bg-slate-50 p-4">
                  <p className="text-xs leading-relaxed text-[#6B7280]">
                    <Shield className="mr-1 inline h-3.5 w-3.5 text-[#D6A84B]" aria-hidden="true" />
                    UCSG is an independent education consulting organization and is not affiliated
                    with or endorsed by the U.S. Department of Veterans Affairs, Department of
                    Defense, or any branch of the U.S. Armed Forces. UCSG does not determine, fund,
                    or administer veterans education benefits.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex flex-col items-center gap-3">
              <Button
                type="submit"
                disabled={submitting}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#0874F9] px-6 text-base font-semibold text-white shadow-lg shadow-[#0874F9]/25 transition-all duration-300 hover:bg-[#0660D4] hover:shadow-xl hover:shadow-[#0874F9]/35 disabled:opacity-60 sm:w-auto sm:px-10"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Submitting…
                  </>
                ) : (
                  <>
                    Submit My Assessment
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </>
                )}
              </Button>
              <p className="text-xs text-[#6B7280]">
                Takes about 3 minutes. No enrollment commitment required.
              </p>
            </div>
          </form>
        </div>
      </section>

      <ComplianceDisclosure />
    </div>
  );
}
