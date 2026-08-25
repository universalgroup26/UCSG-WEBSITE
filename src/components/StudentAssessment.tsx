'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { track } from '@/lib/analytics';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  Loader2,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Props {
  open: boolean;
  onClose: () => void;
  preselectedIntent?: string;
}

interface StepData {
  // Step 1
  situation: string;
  service: string;
  // Step 2
  currentUniversity: string;
  degreeLevel: string;
  fieldOfStudy: string;
  targetIntake: string;
  // Step 3
  optEndDate: string;
  preferredLocation: string;
  preferredFormat: string;
  budgetRange: string;
  // Step 4
  fullName: string;
  phone: string;
  email: string;
  consent: boolean;
}

const INITIAL_STEP_DATA: StepData = {
  situation: '',
  service: '',
  currentUniversity: '',
  degreeLevel: '',
  fieldOfStudy: '',
  targetIntake: '',
  optEndDate: '',
  preferredLocation: '',
  preferredFormat: '',
  budgetRange: '',
  fullName: '',
  phone: '',
  email: '',
  consent: false,
};

const TOTAL_STEPS = 4;

/* ------------------------------------------------------------------ */
/*  Options                                                            */
/* ------------------------------------------------------------------ */

const SITUATION_OPTIONS = [
  "I'm currently enrolled at a U.S. university",
  'My OPT/STEM OPT is ending soon',
  "I'm looking to transfer universities",
  'I need a new graduate program',
  'Other',
];

const SERVICE_OPTIONS = [
  'University Transfer Guidance',
  'Program Comparison',
  'CPT/OPT Information',
  'General Consultation',
];

const DEGREE_OPTIONS = ["Master's", 'PhD', 'DBA', "Bachelor's", 'Associate', 'Other'];

const INTAKE_OPTIONS = ['Fall 2025', 'Spring 2026', 'Summer 2026', 'Fall 2026', 'Not sure'];

const FORMAT_OPTIONS = ['Hybrid', 'Online', 'Campus', 'No preference'];

const BUDGET_OPTIONS = [
  'Under $15,000/year',
  '$15,000-$25,000/year',
  '$25,000-$40,000/year',
  '$40,000+/year',
  'Not sure',
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const INTENT_SITUATION_MAP: Record<string, string> = {
  transfer: "I'm looking to transfer universities",
  'opt-ending': 'My OPT/STEM OPT is ending soon',
  'affordable-program': 'I need a new graduate program',
  'compare-programs': 'I need a new graduate program',
};

const INTENT_SERVICE_MAP: Record<string, string> = {
  transfer: 'University Transfer Guidance',
  'opt-ending': 'CPT/OPT Information',
  'affordable-program': 'Program Comparison',
  'compare-programs': 'Program Comparison',
};

function isStep1Valid(d: StepData) {
  return d.situation !== '' && d.service !== '';
}
function isStep2Valid(d: StepData) {
  return d.degreeLevel !== '' && d.fieldOfStudy.trim() !== '';
}
function isStep3Valid() {
  return true; // all fields optional
}
function isStep4Valid(d: StepData) {
  return (
    d.fullName.trim() !== '' &&
    d.phone.trim() !== '' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim()) &&
    d.consent
  );
}

/* ------------------------------------------------------------------ */
/*  Select field wrapper                                               */
/* ------------------------------------------------------------------ */

function SelectField({
  label,
  value,
  onValueChange,
  placeholder,
  options,
  required,
  id,
}: {
  label: string;
  value: string;
  onValueChange: (v: string) => void;
  placeholder: string;
  options: readonly string[];
  required?: boolean;
  id?: string;
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
          className="w-full h-10 rounded-lg border-slate-200 bg-white text-sm focus:border-[#0874F9] focus:ring-[#0874F9]/20"
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
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Text input wrapper                                                 */
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
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
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-10 rounded-lg border-slate-200 bg-white text-sm focus:border-[#0874F9] focus:ring-[#0874F9]/20"
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress Bar                                                       */
/* ------------------------------------------------------------------ */

function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-6" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={TOTAL_STEPS} aria-label={`Step ${currentStep} of ${TOTAL_STEPS}`}>
      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => {
          const step = i + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;
          return (
            <div key={step} className="flex items-center gap-1.5">
              {i > 0 && (
                <div
                  className={`h-0.5 w-6 sm:w-10 transition-colors duration-300 ${
                    isCompleted ? 'bg-[#0874F9]' : 'bg-slate-200'
                  }`}
                />
              )}
              <div
                className={`flex items-center justify-center h-7 w-7 rounded-full text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-[#0874F9] text-white shadow-md shadow-[#0874F9]/30'
                  : isCompleted
                    ? 'bg-[#0874F9] text-white'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : step}
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-slate-500 text-center">
        Step {currentStep} of {TOTAL_STEPS}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step Content                                                       */
/* ------------------------------------------------------------------ */

function StepIndicator({ label, description }: { label: string; description: string }) {
  return (
    <div className="mb-5">
      <DialogHeader>
        <DialogTitle className="text-xl font-heading font-semibold text-[#061846]">
          {label}
        </DialogTitle>
        <DialogDescription className="text-sm text-slate-500 mt-1">
          {description}
        </DialogDescription>
      </DialogHeader>
    </div>
  );
}

function Step1({ data, onChange }: { data: StepData; onChange: (patch: Partial<StepData>) => void }) {
  return (
    <div className="space-y-4">
      <StepIndicator
        label="Your Situation"
        description="Tell us about your current F-1 status so we can tailor our guidance."
      />
      <SelectField
        label="Current F-1 Situation"
        id="assessment-situation"
        value={data.situation}
        onValueChange={(v) => onChange({ situation: v })}
        placeholder="Select your situation"
        options={SITUATION_OPTIONS}
        required
      />
      <SelectField
        label="Service Needed"
        id="assessment-service"
        value={data.service}
        onValueChange={(v) => onChange({ service: v })}
        placeholder="What service do you need?"
        options={SERVICE_OPTIONS}
        required
      />
    </div>
  );
}

function Step2({ data, onChange }: { data: StepData; onChange: (patch: Partial<StepData>) => void }) {
  return (
    <div className="space-y-4">
      <StepIndicator
        label="Academic Details"
        description="Help us understand your academic background and goals."
      />
      <TextField
        label="Current University"
        id="assessment-university"
        value={data.currentUniversity}
        onChange={(v) => onChange({ currentUniversity: v })}
        placeholder="e.g., Syracuse University"
      />
      <SelectField
        label="Degree Level"
        id="assessment-degree"
        value={data.degreeLevel}
        onValueChange={(v) => onChange({ degreeLevel: v })}
        placeholder="Select degree level"
        options={DEGREE_OPTIONS}
        required
      />
      <TextField
        label="Field of Study"
        id="assessment-field"
        value={data.fieldOfStudy}
        onChange={(v) => onChange({ fieldOfStudy: v })}
        placeholder="e.g., Computer Science"
        required
      />
      <SelectField
        label="Target Intake"
        id="assessment-intake"
        value={data.targetIntake}
        onValueChange={(v) => onChange({ targetIntake: v })}
        placeholder="When do you want to start?"
        options={INTAKE_OPTIONS}
      />
    </div>
  );
}

function Step3({ data, onChange }: { data: StepData; onChange: (patch: Partial<StepData>) => void }) {
  return (
    <div className="space-y-4">
      <StepIndicator
        label="Preferences"
        description="Optional details that help us refine our recommendations."
      />
      <TextField
        label="OPT/STEM OPT End Date"
        id="assessment-opt-date"
        type="date"
        value={data.optEndDate}
        onChange={(v) => onChange({ optEndDate: v })}
        placeholder=""
      />
      <TextField
        label="Preferred Location / State"
        id="assessment-location"
        value={data.preferredLocation}
        onChange={(v) => onChange({ preferredLocation: v })}
        placeholder="e.g., New York, California"
      />
      <SelectField
        label="Preferred Format"
        id="assessment-format"
        value={data.preferredFormat}
        onValueChange={(v) => onChange({ preferredFormat: v })}
        placeholder="Select format"
        options={FORMAT_OPTIONS}
      />
      <SelectField
        label="Estimated Budget Range"
        id="assessment-budget"
        value={data.budgetRange}
        onValueChange={(v) => onChange({ budgetRange: v })}
        placeholder="Select budget range"
        options={BUDGET_OPTIONS}
      />
    </div>
  );
}

function Step4({
  data,
  onChange,
  errors,
}: {
  data: StepData;
  onChange: (patch: Partial<StepData>) => void;
  errors: Record<string, string>;
}) {
  return (
    <div className="space-y-4">
      <StepIndicator
        label="Contact Information"
        description="How should our team reach you with your personalized assessment?"
      />
      <TextField
        label="Full Name"
        id="assessment-name"
        value={data.fullName}
        onChange={(v) => onChange({ fullName: v })}
        placeholder="Your full name"
        required
        error={errors.fullName}
      />
      <TextField
        label="Phone Number"
        id="assessment-phone"
        type="tel"
        value={data.phone}
        onChange={(v) => onChange({ phone: v })}
        placeholder="+1 (xxx) xxx-xxxx"
        required
        error={errors.phone}
      />
      <TextField
        label="Email"
        id="assessment-email"
        type="email"
        value={data.email}
        onChange={(v) => onChange({ email: v })}
        placeholder="you@example.com"
        required
        error={errors.email}
      />
      <div className="flex items-start gap-3 pt-1">
        <Checkbox
          id="assessment-consent"
          checked={data.consent}
          onCheckedChange={(checked) => onChange({ consent: checked === true })}
          aria-required="true"
          aria-describedby={errors.consent ? 'consent-error' : undefined}
          className="mt-0.5 data-[state=checked]:bg-[#0874F9] data-[state=checked]:border-[#0874F9]"
        />
        <Label
          htmlFor="assessment-consent"
          className="text-[13px] leading-snug text-slate-600 font-normal cursor-pointer"
        >
          I agree to be contacted by UCSG regarding educational guidance services. I understand I
          can opt out at any time.
          <span className="ml-1 text-red-500">*</span>
        </Label>
      </div>
      {errors.consent && (
        <p id="consent-error" className="text-xs text-red-500 -mt-2" role="alert">
          {errors.consent}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Thank You Screen                                                   */
/* ------------------------------------------------------------------ */

function ThankYouScreen() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
        <CheckCircle2 className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="text-xl font-heading font-semibold text-[#061846] mb-2">
        Assessment Submitted!
      </h3>
      <p className="text-sm text-slate-500 max-w-xs">
        Thank you for completing the assessment. Our team will review your information and reach
        out within one business day.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function StudentAssessment({ open, onClose, preselectedIntent }: Props) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<StepData>(INITIAL_STEP_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Reset on open
  useEffect(() => {
    if (open) {
      const initial = { ...INITIAL_STEP_DATA };
      if (preselectedIntent) {
        const situation = INTENT_SITUATION_MAP[preselectedIntent] || '';
        const service = INTENT_SERVICE_MAP[preselectedIntent] || '';
        if (situation) initial.situation = situation;
        if (service) initial.service = service;
      }
      setData(initial);
      setStep(1);
      setErrors({});
      setSubmitting(false);
      setSubmitted(false);
      track.customEvent('assessment_start', { preselected_intent: preselectedIntent || 'none' });
    }
  }, [open, preselectedIntent]);

  const handleChange = useCallback((patch: Partial<StepData>) => {
    setData((prev) => ({ ...prev, ...patch }));
    setErrors((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(patch)) {
        delete next[key];
      }
      return next;
    });
  }, []);

  const validateStep = useCallback(
    (s: number, d: StepData): boolean => {
      const e: Record<string, string> = {};
      if (s === 1 && !isStep1Valid(d)) {
        if (!d.situation) e.situation = 'Please select your current F-1 situation.';
        if (!d.service) e.service = 'Please select the service you need.';
      }
      if (s === 2 && !isStep2Valid(d)) {
        if (!d.degreeLevel) e.degreeLevel = 'Please select your degree level.';
        if (!d.fieldOfStudy.trim()) e.fieldOfStudy = 'Please enter your field of study.';
      }
      if (s === 4 && !isStep4Valid(d)) {
        if (!d.fullName.trim()) e.fullName = 'Please enter your full name.';
        if (!d.phone.trim()) e.phone = 'Please enter your phone number.';
        if (!d.email.trim()) e.email = 'Please enter your email.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim()))
          e.email = 'Please enter a valid email address.';
        if (!d.consent) e.consent = 'You must agree to be contacted.';
      }
      setErrors(e);
      return Object.keys(e).length === 0;
    },
    []
  );

  const handleNext = useCallback(() => {
    if (!validateStep(step, data)) return;
    track.customEvent('assessment_step_complete', { step, step_name: getStepName(step) });
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }, [step, data, validateStep]);

  const handleBack = useCallback(() => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!validateStep(4, data)) return;
    setSubmitting(true);

    // Build message with all assessment details
    const message = [
      '--- Student Assessment ---',
      '',
      `F-1 Situation: ${data.situation}`,
      `Service Needed: ${data.service}`,
      '',
      `Current University: ${data.currentUniversity || 'Not specified'}`,
      `Degree Level: ${data.degreeLevel}`,
      `Field of Study: ${data.fieldOfStudy}`,
      `Target Intake: ${data.targetIntake || 'Not specified'}`,
      '',
      `OPT/STEM OPT End Date: ${data.optEndDate || 'N/A'}`,
      `Preferred Location: ${data.preferredLocation || 'Not specified'}`,
      `Preferred Format: ${data.preferredFormat || 'Not specified'}`,
      `Budget Range: ${data.budgetRange || 'Not specified'}`,
    ].join('\n');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.fullName.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          service: data.service,
          message,
          source: 'Student Assessment Popup',
        }),
      });

      if (res.ok) {
        track.customEvent('lead_submit', { source: 'assessment_popup' });
        track.formEvent({ event: 'form_submit', form_id: 'assessment_popup', form_name: 'Student Assessment' });
        track.leadConversion({
          formId: 'assessment_popup',
          formName: 'Student Assessment',
          name: data.fullName.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          service: data.service,
        });
        setSubmitted(true);
        // Close after 3 seconds
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setErrors({ submit: 'Something went wrong. Please try again.' });
      }
    } catch {
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setSubmitting(false);
    }
  }, [data, onClose]);

  const isCurrentStepValid = useMemo(() => {
    if (step === 1) return isStep1Valid(data);
    if (step === 2) return isStep2Valid(data);
    if (step === 3) return isStep3Valid();
    if (step === 4) return isStep4Valid(data);
    return false;
  }, [step, data]);

  const stepTitles = ['Your Situation', 'Academic Details', 'Preferences', 'Contact Info'];

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent
        showCloseButton={!submitted}
        className={
          'sm:max-w-[560px] p-0 overflow-hidden rounded-2xl ' +
          'max-h-[90vh] flex flex-col'
        }
        aria-label="Student Assessment Form"
      >
        <div className="px-6 pt-6 pb-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0874F9]/10">
              <GraduationCap className="h-5 w-5 text-[#0874F9]" aria-hidden="true" />
            </div>
            <div>
              <DialogTitle className="text-lg font-heading font-bold text-[#061846]">
                {submitted ? '' : 'Free Student Assessment'}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-400">
                {submitted ? '' : 'Takes about 60 seconds'}
              </DialogDescription>
            </div>
          </div>

          {!submitted && <ProgressBar currentStep={step} />}
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
          {submitted ? (
            <ThankYouScreen />
          ) : (
            <>
              {step === 1 && <Step1 data={data} onChange={handleChange} />}
              {step === 2 && <Step2 data={data} onChange={handleChange} />}
              {step === 3 && <Step3 data={data} onChange={handleChange} />}
              {step === 4 && <Step4 data={data} onChange={handleChange} errors={errors} />}

              {errors.submit && (
                <p className="mt-3 text-sm text-red-500 text-center" role="alert">
                  {errors.submit}
                </p>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="gap-2 rounded-lg border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {step < TOTAL_STEPS ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!isCurrentStepValid}
                    className="gap-2 rounded-lg bg-[#0874F9] text-white hover:bg-[#0660D0] disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isCurrentStepValid || submitting}
                    className="gap-2 rounded-lg bg-[#0874F9] text-white hover:bg-[#0660D0] disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Assessment'
                    )}
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getStepName(step: number): string {
  const names: Record<number, string> = {
    1: 'situation',
    2: 'academic_details',
    3: 'preferences',
    4: 'contact_info',
  };
  return names[step] || `step_${step}`;
}
