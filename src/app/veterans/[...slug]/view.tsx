'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import VeteranBachelorsPage from '@/components/pages/veteran/VeteranBachelorsPage';
import VeteranMastersPage from '@/components/pages/veteran/VeteranMastersPage';
import VeteranOnlineHybridPage from '@/components/pages/veteran/VeteranOnlineHybridPage';
import VeteranAssessmentForm from '@/components/pages/veteran/VeteranAssessmentForm';
import VeteranInfoPage from '@/components/pages/veteran/VeteranInfoPage';
import { track } from '@/lib/analytics';

/* ------------------------------------------------------------------ */
/*  Shared reveal animation                                           */
/* ------------------------------------------------------------------ */
const reveal = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

/* ------------------------------------------------------------------ */
/*  Small inline helpers used across INFO_PAGE_CONTENT                 */
/* ------------------------------------------------------------------ */
function navTo(id: string) {
  return () =>
    window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'veterans', id } }));
}

function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-heading text-2xl font-bold text-[#061846] mt-2 scroll-mt-24">
      {children}
    </h2>
  );
}

function Lead({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-gray-600 leading-relaxed">{children}</p>;
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#EDF5FF] border-l-4 border-[#0874F9] p-4 sm:p-5 rounded-r-lg">
      {children}
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it} className="flex gap-2 text-gray-700">
          <span className="text-[#0874F9] font-bold shrink-0" aria-hidden="true">
            ✓
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Steps({ items }: { items: { title: string; body: React.ReactNode }[] }) {
  return (
    <div className="space-y-5">
      {items.map((step, i) => (
        <div key={step.title} className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0874F9] text-white font-bold">
            {i + 1}
          </div>
          <div className="pt-1">
            <h3 className="font-heading font-semibold text-[#061846]">{step.title}</h3>
            <div className="mt-1 text-gray-600 leading-relaxed">{step.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Faq({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details key={i} className="group rounded-lg border border-gray-200 bg-white p-4 open:bg-[#F8FBFF]">
          <summary className="cursor-pointer list-none font-heading font-semibold text-[#061846] flex items-start justify-between gap-3">
            <span>{item.q}</span>
            <span className="text-[#0874F9] font-bold text-lg leading-none" aria-hidden="true">
              +
            </span>
          </summary>
          <div className="mt-3 text-gray-600 leading-relaxed">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

function InternalLink({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={navTo(id)}
      className="text-[#0874F9] hover:underline font-medium"
    >
      {children}
    </button>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">{children}</div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <motion.div {...reveal} className="space-y-3">
      {children}
    </motion.div>
  );
}

function SourceNote({ children }: { children?: React.ReactNode }) {
  return (
    <p className="text-xs text-gray-500">
      Source: U.S. Department of Veterans Affairs (va.gov). Last verified:{' '}
      {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}. Always verify
      current benefit information directly with the VA.{' '}
      {children ?? null}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero images                                                       */
/* ------------------------------------------------------------------ */
const CAMPUS_IMG = '/images/hero-veteran-campus.jpg?v=1';
const PLAN_IMG = '/images/hero-veteran-plan.jpg?v=1';
const FUTURE_IMG = '/images/hero-veteran-future.jpg?v=1';

/* ------------------------------------------------------------------ */
/*  Program Comparison Worksheet (interactive — in-memory only)       */
/* ------------------------------------------------------------------ */
type FieldStatus = 'confirmed' | 'estimated' | 'pending';
type YesNoUnknown = 'yes' | 'no' | 'unknown';

interface ProgramData {
  id: string;
  label: string;
  programName: string;
  institution: string;
  degreeLevel: string;
  deliveryFormat: string;
  accreditation: string;
  tuitionPerCredit: string;
  tuitionPerCreditStatus: FieldStatus;
  totalCredits: string;
  totalCreditsStatus: FieldStatus;
  totalEstimatedCost: string;
  totalEstimatedCostStatus: FieldStatus;
  transferCredits: string;
  transferCreditsStatus: FieldStatus;
  programLength: string;
  programLengthStatus: FieldStatus;
  vaApproved: YesNoUnknown;
  vaApprovedStatus: FieldStatus;
  veteranServices: YesNoUnknown;
  sourceUrl: string;
  lastVerifiedDate: string;
}

const DEGREE_LEVELS = ["Bachelor's", "Master's", 'MBA', 'Doctoral', 'Certificate'] as const;
const DELIVERY_FORMATS = ['Online', 'Hybrid', 'On-Campus'] as const;
const YNU_OPTIONS: { value: YesNoUnknown; label: string }[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'unknown', label: 'Unknown' },
];
const STATUS_OPTIONS: { value: FieldStatus; label: string }[] = [
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'estimated', label: 'Estimated' },
  { value: 'pending', label: 'Pending' },
];

function statusBadgeClass(s: FieldStatus) {
  switch (s) {
    case 'confirmed':
      return 'bg-[#39C5E8]/15 text-[#0E7C9B] border-[#39C5E8]';
    case 'estimated':
      return 'bg-[#D6A84B]/15 text-[#8A6B26] border-[#D6A84B]';
    case 'pending':
    default:
      return 'bg-gray-100 text-gray-500 border-gray-300';
  }
}

function blankProgram(label: string): ProgramData {
  return {
    id: `${label}-${Math.random().toString(36).slice(2, 8)}`,
    label,
    programName: '',
    institution: '',
    degreeLevel: '',
    deliveryFormat: '',
    accreditation: '',
    tuitionPerCredit: '',
    tuitionPerCreditStatus: 'pending',
    totalCredits: '',
    totalCreditsStatus: 'pending',
    totalEstimatedCost: '',
    totalEstimatedCostStatus: 'pending',
    transferCredits: '',
    transferCreditsStatus: 'pending',
    programLength: '',
    programLengthStatus: 'pending',
    vaApproved: 'unknown',
    vaApprovedStatus: 'pending',
    veteranServices: 'unknown',
    sourceUrl: '',
    lastVerifiedDate: '',
  };
}

const INPUT_CLS =
  'h-9 w-full rounded-md border border-gray-200 bg-white px-2 text-sm text-[#071B35] focus:border-[#39C5E8] focus:outline-none focus:ring-2 focus:ring-[#39C5E8]/30';
const LABEL_CLS = 'text-[11px] font-semibold uppercase tracking-wide text-gray-500';

function StatusBadge({ status }: { status: FieldStatus }) {
  const label = STATUS_OPTIONS.find((o) => o.value === status)?.label ?? 'Pending';
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${statusBadgeClass(
        status,
      )}`}
    >
      {label}
    </span>
  );
}

function StatusSelect({
  value,
  onChange,
  ariaLabel,
}: {
  value: FieldStatus;
  onChange: (v: FieldStatus) => void;
  ariaLabel: string;
}) {
  return (
    <select
      aria-label={ariaLabel}
      value={value}
      onChange={(e) => onChange(e.target.value as FieldStatus)}
      className={`${INPUT_CLS} w-24`}
    >
      {STATUS_OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className={LABEL_CLS}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`mt-1 ${INPUT_CLS}`}
      />
    </div>
  );
}

function FieldWithStatus({
  label,
  value,
  status,
  onValueChange,
  onStatusChange,
  placeholder,
}: {
  label: string;
  value: string;
  status: FieldStatus;
  onValueChange: (v: string) => void;
  onStatusChange: (v: FieldStatus) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <label className={LABEL_CLS}>{label}</label>
        <StatusBadge status={status} />
      </div>
      <div className="mt-1 flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={placeholder}
          className={INPUT_CLS}
        />
        <StatusSelect value={status} onChange={onStatusChange} ariaLabel={`${label} status`} />
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <div>
      <label className={LABEL_CLS}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 ${INPUT_CLS}`}
      >
        <option value="">—</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function ProgramComparisonWorksheet() {
  const [programs, setPrograms] = useState<ProgramData[]>([
    blankProgram('Program 1'),
    blankProgram('Program 2'),
  ]);
  const [activeMobile, setActiveMobile] = useState(0);

  const updateProgram = (id: string, updater: (p: ProgramData) => ProgramData) => {
    setPrograms((prev) => prev.map((p) => (p.id === id ? updater(p) : p)));
  };

  const addProgram = () => {
    setPrograms((prev) =>
      prev.length >= 4 ? prev : [...prev, blankProgram(`Program ${prev.length + 1}`)],
    );
  };

  const removeProgram = (id: string) => {
    setPrograms((prev) => {
      if (prev.length <= 2) return prev;
      return prev
        .filter((p) => p.id !== id)
        .map((p, i) => ({ ...p, label: `Program ${i + 1}` }));
    });
    setActiveMobile((i) => Math.max(0, Math.min(i, programs.length - 2)));
  };

  const clearAll = () => {
    if (typeof window === 'undefined') return;
    const ok = window.confirm('Clear all worksheet data? This cannot be undone.');
    if (!ok) return;
    setPrograms([blankProgram('Program 1'), blankProgram('Program 2')]);
    setActiveMobile(0);
  };

  const printWorksheet = () => {
    if (typeof window !== 'undefined') window.print();
  };

  return (
    <div className="print-container mt-6">
      <div className="flex flex-wrap items-center gap-3 print:hidden">
        <button
          type="button"
          onClick={addProgram}
          disabled={programs.length >= 4}
          className="inline-flex items-center rounded-md bg-[#071B35] px-4 py-2 text-sm font-medium text-white hover:bg-[#0d2a5a] disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Add Program
        </button>
        <button
          type="button"
          onClick={clearAll}
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-[#071B35] hover:bg-gray-50"
        >
          Clear All
        </button>
        <button
          type="button"
          onClick={printWorksheet}
          className="inline-flex items-center rounded-md border border-[#39C5E8] bg-[#39C5E8]/10 px-4 py-2 text-sm font-medium text-[#0E7C9B] hover:bg-[#39C5E8]/20"
        >
          Print Worksheet
        </button>
        <span className="ml-auto text-xs text-gray-500">
          {programs.length} of 4 programs · In-memory only
        </span>
      </div>

      <div className="mt-4 sm:hidden print:hidden">
        <label htmlFor="active-mobile" className={LABEL_CLS}>
          Viewing
        </label>
        <select
          id="active-mobile"
          value={activeMobile}
          onChange={(e) => setActiveMobile(Number(e.target.value))}
          className={`ml-2 w-40 ${INPUT_CLS}`}
        >
          {programs.map((p, i) => (
            <option key={p.id} value={i}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 print:grid-cols-2 print:gap-2">
        {programs.map((p, idx) => {
          const showOnMobile = idx === activeMobile;
          return (
            <div
              key={p.id}
              className={`rounded-lg border border-gray-200 bg-white p-4 print:break-inside-avoid ${
                showOnMobile ? 'block' : 'hidden sm:block print:block'
              }`}
            >
              <div className="flex items-center justify-between gap-2 border-b border-gray-200 pb-2">
                <span className="font-heading text-sm font-semibold text-[#071B35]">
                  {p.label}
                </span>
                {programs.length > 2 ? (
                  <button
                    type="button"
                    onClick={() => removeProgram(p.id)}
                    className="text-xs text-gray-400 hover:text-red-500 print:hidden"
                    aria-label={`Remove ${p.label}`}
                  >
                    Remove
                  </button>
                ) : null}
              </div>

              <div className="mt-3 space-y-3">
                <TextField
                  label="Program Name"
                  value={p.programName}
                  onChange={(v) => updateProgram(p.id, (pp) => ({ ...pp, programName: v }))}
                  placeholder="e.g., BS Computer Science"
                />
                <TextField
                  label="Institution"
                  value={p.institution}
                  onChange={(v) => updateProgram(p.id, (pp) => ({ ...pp, institution: v }))}
                  placeholder="School name"
                />
                <SelectField
                  label="Degree Level"
                  value={p.degreeLevel}
                  onChange={(v) => updateProgram(p.id, (pp) => ({ ...pp, degreeLevel: v }))}
                  options={DEGREE_LEVELS}
                />
                <SelectField
                  label="Delivery Format"
                  value={p.deliveryFormat}
                  onChange={(v) => updateProgram(p.id, (pp) => ({ ...pp, deliveryFormat: v }))}
                  options={DELIVERY_FORMATS}
                />
                <TextField
                  label="Accreditation"
                  value={p.accreditation}
                  onChange={(v) => updateProgram(p.id, (pp) => ({ ...pp, accreditation: v }))}
                  placeholder="e.g., Regional · ABET"
                />
                <FieldWithStatus
                  label="Tuition per Credit"
                  value={p.tuitionPerCredit}
                  status={p.tuitionPerCreditStatus}
                  onValueChange={(v) =>
                    updateProgram(p.id, (pp) => ({ ...pp, tuitionPerCredit: v }))
                  }
                  onStatusChange={(v) =>
                    updateProgram(p.id, (pp) => ({ ...pp, tuitionPerCreditStatus: v }))
                  }
                  placeholder="$ ___"
                />
                <FieldWithStatus
                  label="Total Credits"
                  value={p.totalCredits}
                  status={p.totalCreditsStatus}
                  onValueChange={(v) => updateProgram(p.id, (pp) => ({ ...pp, totalCredits: v }))}
                  onStatusChange={(v) =>
                    updateProgram(p.id, (pp) => ({ ...pp, totalCreditsStatus: v }))
                  }
                  placeholder="e.g., 120"
                />
                <FieldWithStatus
                  label="Total Estimated Cost"
                  value={p.totalEstimatedCost}
                  status={p.totalEstimatedCostStatus}
                  onValueChange={(v) =>
                    updateProgram(p.id, (pp) => ({ ...pp, totalEstimatedCost: v }))
                  }
                  onStatusChange={(v) =>
                    updateProgram(p.id, (pp) => ({ ...pp, totalEstimatedCostStatus: v }))
                  }
                  placeholder="$ ___"
                />
                <FieldWithStatus
                  label="Transfer Credits Accepted"
                  value={p.transferCredits}
                  status={p.transferCreditsStatus}
                  onValueChange={(v) =>
                    updateProgram(p.id, (pp) => ({ ...pp, transferCredits: v }))
                  }
                  onStatusChange={(v) =>
                    updateProgram(p.id, (pp) => ({ ...pp, transferCreditsStatus: v }))
                  }
                  placeholder="Max credits"
                />
                <FieldWithStatus
                  label="Program Length"
                  value={p.programLength}
                  status={p.programLengthStatus}
                  onValueChange={(v) => updateProgram(p.id, (pp) => ({ ...pp, programLength: v }))}
                  onStatusChange={(v) =>
                    updateProgram(p.id, (pp) => ({ ...pp, programLengthStatus: v }))
                  }
                  placeholder="e.g., 24 months"
                />
                <div>
                  <label className={LABEL_CLS}>VA-Approved</label>
                  <div className="mt-1 flex items-center gap-2">
                    <select
                      value={p.vaApproved}
                      onChange={(e) =>
                        updateProgram(p.id, (pp) => ({
                          ...pp,
                          vaApproved: e.target.value as YesNoUnknown,
                        }))
                      }
                      className={INPUT_CLS}
                    >
                      {YNU_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <StatusSelect
                      value={p.vaApprovedStatus}
                      onChange={(v) =>
                        updateProgram(p.id, (pp) => ({ ...pp, vaApprovedStatus: v }))
                      }
                      ariaLabel="VA-Approved status"
                    />
                  </div>
                </div>
                <div>
                  <label className={LABEL_CLS}>Veteran Services</label>
                  <select
                    value={p.veteranServices}
                    onChange={(e) =>
                      updateProgram(p.id, (pp) => ({
                        ...pp,
                        veteranServices: e.target.value as YesNoUnknown,
                      }))
                    }
                    className={`mt-1 ${INPUT_CLS}`}
                  >
                    {YNU_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <TextField
                  label="Source URL"
                  value={p.sourceUrl}
                  onChange={(v) => updateProgram(p.id, (pp) => ({ ...pp, sourceUrl: v }))}
                  placeholder="https://"
                  type="url"
                />
                <TextField
                  label="Last Verified Date"
                  value={p.lastVerifiedDate}
                  onChange={(v) => updateProgram(p.id, (pp) => ({ ...pp, lastVerifiedDate: v }))}
                  placeholder="e.g., 2024-06-15"
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-gray-500 print:hidden">
        Worksheet data is held in your browser memory only. Nothing is transmitted or saved
        unless you print this page. Use explicit &ldquo;Unknown&rdquo; / &ldquo;&mdash;&rdquo;
        values; never invent school data.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  INFO_PAGE_CONTENT — expanded body for each veteran sub-page       */
/* ------------------------------------------------------------------ */
const INFO_PAGE_CONTENT: Record<string, {
  eyebrow: string;
  headline: string;
  subheadline: string;
  children: React.ReactNode;
  ctaText: string;
  ctaHref: string;
  heroImage?: string;
}> = {
  /* ============================================================= */
  /* 1. DEGREE-PLANNING                                            */
  /* ============================================================= */
  'degree-planning': {
    heroImage: CAMPUS_IMG,
    eyebrow: 'VETERAN DEGREE PLANNING',
    headline: 'Build a Clear Plan for Your Next Degree',
    subheadline:
      'Review your education background, compare verified programs, and map your path forward with structured guidance.',
    children: (
      <Body>
        <Section>
          <p className="text-gray-700 leading-relaxed">
            <strong>Veteran degree planning</strong> is the structured process of mapping your
            military experience, prior coursework, career goals, and life constraints to a specific
            degree path at an accredited institution. A clear degree plan for veterans helps you
            avoid wasted credits, identify the right delivery format (online, hybrid, or on-campus),
            and align your education with the VA benefits you may be entitled to. UCSG&apos;s
            veteran education roadmap walks you through each phase — from goal clarification to
            application submission — without pressuring you toward any specific school or program.
          </p>
          <Lead>
            Every veteran&apos;s education journey is different. Some want to finish a
            bachelor&apos;s degree they started years ago. Others are looking at a master&apos;s
            degree or MBA to pivot careers. Still others need a fully online program that fits a
            civilian job or family obligations. The six-step process below is designed to surface
            the right answer for <em>your</em> situation.
          </Lead>
          <Callout>
            <p className="text-sm text-[#071B35]">
              UCSG is an independent education consulting organization. We do not determine VA
              benefit eligibility, guarantee admission, guarantee transfer credit, or guarantee
              employment outcomes. Always verify program details directly with the institution and
              with the VA.
            </p>
          </Callout>
        </Section>

        <Section>
          <H2 id="six-step-process">The Six-Step Veteran Degree Planning Process</H2>
          <Lead>
            Use this sequence as a veteran education roadmap. Each step builds on the previous one
            — skipping a step (especially goal-setting) is the most common reason veterans end up
            with credits that don&apos;t transfer or programs that don&apos;t fit.
          </Lead>
          <Steps
            items={[
              {
                title: 'Clarify Your Academic & Career Goal',
                body: (
                  <span>
                    Write a one-sentence goal: &quot;I want to earn a [degree] in [field] so I can
                    work as [role].&quot; If you can&apos;t fill in all three blanks, start with
                    career research before choosing a degree. UCSG&apos;s free veteran degree
                    assessment helps you articulate this goal in 15 minutes.
                  </span>
                ),
              },
              {
                title: 'Review Prior Learning & Military Experience',
                body: (
                  <span>
                    Request your{' '}
                    <a
                      href="https://jst.doded.mil/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#39C5E8] hover:underline"
                    >
                      Joint Services Transcript (JST)
                    </a>{' '}
                    and any prior college transcripts. Make a list of completed courses, MOS/AFSC
                    training, professional certifications, and CLEP/DSST exams already passed. This
                    is the raw material that determines how much of your degree is already done.
                  </span>
                ),
              },
              {
                title: 'Compare Accredited Programs',
                body: (
                  <span>
                    Shortlist 3–5 institutions offering the degree you want. Compare accreditation
                    (regional vs. national), delivery format, total credits required, and transfer
                    policy. Use the VA&apos;s{' '}
                    <a
                      href="https://www.va.gov/school-finding/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#39C5E8] hover:underline"
                    >
                      School Comparison Tool
                    </a>{' '}
                    to confirm VA approval status.
                  </span>
                ),
              },
              {
                title: 'Understand Total Estimated Cost',
                body: (
                  <span>
                    Build a side-by-side cost worksheet that includes tuition, fees, books,
                    housing, and program length — not just the per-credit rate. Subtract any VA
                    education benefits you <em>may</em> be eligible for (the VA determines
                    eligibility). See our{' '}
                    <InternalLink id="cost-planning">cost planning guide</InternalLink> for a
                    template.
                  </span>
                ),
              },
              {
                title: 'Select Your Format &amp; Path',
                body: (
                  <span>
                    Choose online, hybrid, or on-campus; full-time or part-time; cohort or
                    self-paced. Match the format to your work schedule, family obligations, and
                    learning style. Compare with our{' '}
                    <InternalLink id="online-hybrid-degrees">online &amp; hybrid degree guide</InternalLink>.
                  </span>
                ),
              },
              {
                title: 'Plan Application & Enrollment Steps',
                body: (
                  <span>
                    Build a calendar of application deadlines, transcript submission windows,
                    FAFSA opening dates, and benefit certification timelines. Most VA benefit
                    paperwork takes 4–8 weeks to process — start early. Talk with the
                    institution&apos;s School Certifying Official (SCO) before enrollment.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="degree-types-comparison">Comparison of Degree Types</H2>
          <Lead>
            Use this matrix to align your career goal with the right degree level. Each level has
            different time, cost, and prerequisite expectations.
          </Lead>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#071B35] text-white">
                  <th className="text-left p-3">Degree Level</th>
                  <th className="text-left p-3">Typical Credits</th>
                  <th className="text-left p-3">Typical Length</th>
                  <th className="text-left p-3">Best Fit When</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#071B35]">Associate</td>
                  <td className="p-3">~60</td>
                  <td className="p-3">~2 years full-time</td>
                  <td className="p-3">Building a foundation or transferring to a 4-year program</td>
                </tr>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#071B35]">Bachelor&apos;s</td>
                  <td className="p-3">~120</td>
                  <td className="p-3">~4 years (less with transfer credit)</td>
                  <td className="p-3">Entering or re-entering a civilian career that requires a 4-year degree</td>
                </tr>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#071B35]">Master&apos;s / MBA</td>
                  <td className="p-3">~30–60</td>
                  <td className="p-3">~1–2 years</td>
                  <td className="p-3">Pivoting careers or moving into management after some civilian work experience</td>
                </tr>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#071B35]">Doctoral / Professional</td>
                  <td className="p-3">Varies widely</td>
                  <td className="p-3">~3–7 years</td>
                  <td className="p-3">Specialized research, teaching, or licensed professional practice</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#071B35]">Undergraduate Certificate</td>
                  <td className="p-3">~12–30</td>
                  <td className="p-3">~6 months–1 year</td>
                  <td className="p-3">Targeted skill-building or stacking toward a degree</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Credit totals and program lengths vary by institution and program. Confirm with each
            school directly.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <InternalLink id="bachelors-degree">Bachelor&apos;s &amp; degree completion options →</InternalLink>
            <span className="text-gray-300">|</span>
            <InternalLink id="masters-mba">Master&apos;s &amp; MBA planning →</InternalLink>
            <span className="text-gray-300">|</span>
            <InternalLink id="online-hybrid-degrees">Online &amp; hybrid formats →</InternalLink>
          </div>
        </Section>

        <Section>
          <H2 id="questions-sco">Questions to Ask Your School Certifying Official (SCO)</H2>
          <Lead>
            A School Certifying Official (SCO) handles the paperwork that connects your VA
            education benefits to your enrollment. Bring these questions to your first
            conversation.
          </Lead>
          <CheckList
            items={[
              'Which specific programs at your institution are approved for VA education benefits?',
              'How long does it take to certify my enrollment once I register?',
              'What happens to my certification if I drop a class or change programs mid-term?',
              'How do you report enrollment changes to the VA — and how quickly?',
              'Do you participate in the Yellow Ribbon Program? If so, what is the contribution amount?',
              'What is your institution\'s policy on tuition refunds if I withdraw using VA benefits?',
              'Who is my single point of contact for VA benefit paperwork?',
              'Do you have a dedicated veteran services office, and what services does it provide?',
            ]}
          />
        </Section>

        <Section>
          <H2 id="documents-to-gather">Documents to Gather Before You Apply</H2>
          <Lead>
            You do <strong>not</strong> need to bring your DD-214, Social Security Number, VA claim
            number, disability rating, or medical records to a UCSG planning conversation. For your
            own school applications and VA paperwork, the items below are typically required.
          </Lead>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#071B35]">For institution applications</h3>
              <ul className="mt-2 ml-4 list-disc text-sm text-gray-700 space-y-1">
                <li>Prior college transcripts (official)</li>
                <li>JST transcript (Joint Services Transcript)</li>
                <li>High school diploma or GED (if no prior college)</li>
                <li>Standardized test scores, if required</li>
                <li>Resume or statement of purpose (graduate programs)</li>
                <li>Application fee payment</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#071B35]">For VA benefit paperwork</h3>
              <ul className="mt-2 ml-4 list-disc text-sm text-gray-700 space-y-1">
                <li>DD-214 (only for direct VA submission — UCSG never requests this)</li>
                <li>VA Certificate of Eligibility (COE)</li>
                <li>School-provided enrollment certification (handled by SCO)</li>
                <li>Direct deposit information (VA only)</li>
                <li>Dependent information for transfer-of-entitlement cases</li>
              </ul>
            </div>
          </div>
          <Callout>
            <p className="text-sm text-[#071B35]">
              UCSG&apos;s veteran degree planning process and our free assessment do{' '}
              <strong>not</strong> request, collect, or store DD-214 forms, SSN, VA claim numbers,
              disability ratings, or medical/bank information. Those are submitted directly to the
              VA or to your chosen institution.
            </p>
          </Callout>
        </Section>

        <Section>
          <H2 id="faq">Frequently Asked Questions</H2>
          <Faq
            items={[
              {
                q: 'How is UCSG\'s veteran degree planning different from a college advisor?',
                a: (
                  <span>
                    A college advisor works for one institution and recommends that
                    institution&apos;s programs. UCSG is independent — we help you compare across
                    institutions and choose based on fit, not on enrollment quotas. We do not
                    receive commissions from schools and do not push you toward any specific
                    program.
                  </span>
                ),
              },
              {
                q: 'Will UCSG guarantee my credits will transfer?',
                a: (
                  <span>
                    No. Each institution sets its own transfer-credit policy. UCSG helps you ask
                    the right questions, request the right transcripts (including the JST), and
                    compare policies — but the final decision rests with the receiving
                    institution&apos;s registrar and academic department.
                  </span>
                ),
              },
              {
                q: 'How long does the planning process take?',
                a: (
                  <span>
                    A first conversation typically runs 30–45 minutes. Building a complete degree
                    plan with 3–5 school comparisons usually takes 1–2 weeks of part-time effort,
                    depending on how quickly institutions respond and how quickly you receive your
                    JST and prior transcripts.
                  </span>
                ),
              },
              {
                q: 'Can UCSG help me use my GI Bill® benefits?',
                a: (
                  <span>
                    UCSG does not determine, process, or guarantee GI Bill® benefits. We help you
                    understand where to find official information at va.gov/education and what
                    questions to ask your School Certifying Official. The VA makes all eligibility
                    and payment decisions. See our{' '}
                    <InternalLink id="education-benefits">education benefits guide</InternalLink>.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="next-steps">Next Steps</H2>
          <Lead>Ready to begin? Use these internal links to move forward:</Lead>
          <div className="flex flex-wrap gap-3 mt-2">
            <InternalLink id="assessment">Take the free veteran degree assessment →</InternalLink>
            <span className="text-gray-300">|</span>
            <InternalLink id="program-comparison">Compare programs side-by-side →</InternalLink>
            <span className="text-gray-300">|</span>
            <InternalLink id="choosing-a-school">Review school selection framework →</InternalLink>
          </div>
        </Section>
      </Body>
    ),
    ctaText: 'BUILD MY DEGREE PLAN',
    ctaHref: 'assessment',
  },

  /* ============================================================= */
  /* 2. EDUCATION-BENEFITS                                          */
  /* ============================================================= */
  'education-benefits': {
    heroImage: PLAN_IMG,
    eyebrow: 'EDUCATION BENEFITS',
    headline: 'Understand the Resources Before Making a Decision',
    subheadline:
      'Benefit eligibility and payments are determined by the appropriate government agency, not UCSG. We help you find official information.',
    children: (
      <Body>
        <Section>
          <h2 id="understand-resources" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Understand the Resources Before Making a Decision
          </h2>
          <p className="mt-3 text-gray-700 font-sans leading-relaxed">
            VA education benefits can help eligible veterans, service members, and their families
            cover education costs. The U.S. Department of Veterans Affairs determines eligibility
            and benefit amounts &mdash; not UCSG.
          </p>
          <div className="mt-4 bg-[#F8FAFC] border-l-4 border-[#39C5E8] p-4 sm:p-5 rounded-r-lg">
            <p className="text-sm text-[#071B35] font-sans">
              UCSG is not affiliated with, endorsed by, or sponsored by the U.S. Department of
              Veterans Affairs. &quot;GI Bill&reg;&quot; is a registered trademark of the U.S.
              Department of Veterans Affairs; UCSG makes no claim of affiliation.
            </p>
          </div>
        </Section>

        <Section>
          <h2 id="official-va-resources" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Official VA Resources
          </h2>
          <p className="mt-3 text-gray-700 font-sans leading-relaxed">
            Start with these official VA sources before reading third-party guides.
          </p>
          <ul className="mt-4 space-y-3">
            <li>
              <a href="https://www.va.gov/education/" target="_blank" rel="noopener noreferrer" className="text-[#39C5E8] hover:underline font-medium">VA Education and Training Benefits &rarr;</a>
              <span className="text-gray-600"> &mdash; main hub for all VA education programs.</span>
            </li>
            <li>
              <a href="https://www.va.gov/education/about-gi-bill-benefits/" target="_blank" rel="noopener noreferrer" className="text-[#39C5E8] hover:underline font-medium">About GI Bill&reg; Benefits &rarr;</a>
              <span className="text-gray-600"> &mdash; overview of Post-9/11 and Montgomery GI Bill&reg;.</span>
            </li>
            <li>
              <a href="https://www.va.gov/school-finding/" target="_blank" rel="noopener noreferrer" className="text-[#39C5E8] hover:underline font-medium">VA School Comparison Tool &rarr;</a>
              <span className="text-gray-600"> &mdash; verify whether a school and program are VA-approved.</span>
            </li>
            <li>
              <a href="https://www.benefits.va.gov/GIBILL/Principles_of_Excellence.asp" target="_blank" rel="noopener noreferrer" className="text-[#39C5E8] hover:underline font-medium">Principles of Excellence &rarr;</a>
              <span className="text-gray-600"> &mdash; VA program recognizing institutions committed to veteran student success.</span>
            </li>
          </ul>
        </Section>

        <Section>
          <h2 id="questions-va" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Questions to Ask the VA
          </h2>
          <p className="mt-3 text-gray-700 font-sans leading-relaxed">
            Call the VA Education Service at 1-888-442-4551 or use the Ask VA tool at va.gov.
            These questions help clarify your specific situation.
          </p>
          <ul className="mt-4 space-y-2">
            {[
              'Which education benefit am I eligible for?',
              'How much tuition assistance can I receive?',
              'Am I eligible for a monthly housing allowance?',
              'Does my chosen program qualify for benefits?',
              'How do I transfer benefits to a dependent?',
              'What is my remaining entitlement period?',
              'How does enrollment status (full-time vs part-time) affect my benefits?',
              'What happens if I change programs or schools?',
            ].map((q) => (
              <li key={q} className="flex gap-2 text-gray-700 font-sans">
                <CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0" aria-hidden="true" />
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <h2 id="school-certification-preparation" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            School Certification Preparation
          </h2>
          <p className="mt-3 text-gray-700 font-sans leading-relaxed">
            Once the VA issues your Certificate of Eligibility (COE), your school&apos;s School
            Certifying Official (SCO) coordinates certification. The steps below outline the
            process.
          </p>
          <ol className="mt-4 space-y-5 list-none p-0">
            {[
              'Obtain your Certificate of Eligibility (COE) from the VA',
              "Provide COE to your school's School Certifying Official (SCO)",
              'Confirm the program is VA-approved',
              'Verify your enrollment status each term',
              'Report any changes in enrollment immediately',
            ].map((step, i) => (
              <li key={step} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#39C5E8] text-white font-bold font-heading">
                  {i + 1}
                </div>
                <div className="pt-1 text-gray-700 font-sans">{step}</div>
              </li>
            ))}
          </ol>
        </Section>

        <Section>
          <h2 id="cost-planning-link" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Cost Planning
          </h2>
          <p className="mt-3 text-gray-700 font-sans leading-relaxed">
            Understanding total education cost goes beyond tuition. Consider fees, books,
            housing, and transportation.
          </p>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'veterans', id: 'cost-planning' } }))}
            className="mt-2 text-[#39C5E8] hover:underline font-medium"
          >
            Cost Planning Guide &rarr;
          </button>
        </Section>

        <Section>
          <h2 id="faq" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            FAQ
          </h2>
          <div className="mt-4 space-y-3">
            <details className="group rounded-lg border border-gray-200 bg-white p-4">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Does UCSG determine my VA benefit eligibility?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-gray-600 font-sans leading-relaxed">
                No. The VA determines eligibility and benefit amounts. UCSG helps you find
                official information and understand your options.
              </p>
            </details>
            <details className="group rounded-lg border border-gray-200 bg-white p-4">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>How do I apply for VA education benefits?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-gray-600 font-sans leading-relaxed">
                Apply through the VA website at va.gov/education or visit a VA regional office.
                You&apos;ll need your DD-214 (which you provide to the VA, NOT to UCSG).
              </p>
            </details>
            <details className="group rounded-lg border border-gray-200 bg-white p-4">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>What is a Certificate of Eligibility?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-gray-600 font-sans leading-relaxed">
                A COE is the VA&apos;s official document confirming your benefit eligibility.
                Your school&apos;s SCO uses it to certify your enrollment.
              </p>
            </details>
            <details className="group rounded-lg border border-gray-200 bg-white p-4">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Can I use benefits at any school?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-gray-600 font-sans leading-relaxed">
                Only at VA-approved programs. Use the VA School Comparison Tool to verify program
                approval status.
              </p>
            </details>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/veterans/yellow-ribbon" className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-[#39C5E8] hover:border-[#39C5E8] hover:bg-[#F8FAFC]">Yellow Ribbon Program →</a>
          <a href="/veterans/vre" className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-[#39C5E8] hover:border-[#39C5E8] hover:bg-[#F8FAFC]">VR&E (Chapter 31) →</a>
          <a href="/veterans/book-consultation" className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-[#39C5E8] hover:border-[#39C5E8] hover:bg-[#F8FAFC]">Book a Consultation →</a>
        </div>


          </div>
        </Section>

        <Section>
          <p className="text-gray-700 font-sans">
            Ready to take the next step?{' '}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'veterans', id: 'assessment' } }))}
              className="text-[#39C5E8] hover:underline font-medium"
            >
              Start your veteran assessment &rarr;
            </button>
          </p>
          <SourceNote />
        </Section>
      </Body>
    ),
    ctaText: 'TALK WITH AN ADVISOR',
    ctaHref: 'book-consultation',
  },

  /* ============================================================= */
  /* 3. YELLOW-RIBBON                                                */
  /* ============================================================= */
  'yellow-ribbon': {
    heroImage: PLAN_IMG,
    eyebrow: 'YELLOW RIBBON PROGRAM',
    headline: 'Yellow Ribbon Program: What Veterans Should Know',
    subheadline:
      'The Yellow Ribbon Program may help eligible students with tuition costs at participating schools. The VA determines eligibility.',
    children: (
      <Body>
        <Section>
          <h2 id="what-is-yellow-ribbon" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            What Is the Yellow Ribbon Program?
          </h2>
          <p className="mt-3 text-gray-700 font-sans leading-relaxed">
            The Yellow Ribbon Program is a provision that can help eligible students with
            qualifying uncovered tuition and fees at participating institutions. The VA determines
            eligibility, and participating schools set their own contribution amounts.
          </p>
          <p className="mt-3 text-gray-700 font-sans leading-relaxed">
            The program is not a single-purpose tuition benefit limited to one situation. It may
            apply to more than one kind of uncovered cost, depending on the school type and your
            eligibility. The scenarios below describe what the VA identifies as qualifying costs —
            the VA, not UCSG and not the school, makes the final eligibility determination.
          </p>
        </Section>

        <Section>
          <h2 id="qualifying-costs" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            What Costs Yellow Ribbon May Help With
          </h2>
          <p className="mt-3 text-gray-700 font-sans leading-relaxed">
            Under the VA&apos;s explanation of the program, Yellow Ribbon may help with tuition and
            fees that the Post-9/11 GI Bill&reg; does not fully cover. The two common scenarios are:
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border-l-4 border-[#39C5E8] bg-[#F8FAFC] p-4 sm:p-5">
              <h3 className="font-heading font-semibold text-[#071B35]">Public school non-resident tuition</h3>
              <p className="text-sm text-gray-700 font-sans mt-2 leading-relaxed">
                At a public school, you may be charged non-resident tuition above the annual
                national maximum for the Post-9/11 GI Bill&reg;. Yellow Ribbon may help with that
                uncovered portion at participating public institutions.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-[#D6A84B] bg-[#F8FAFC] p-4 sm:p-5">
              <h3 className="font-heading font-semibold text-[#071B35]">Private school tuition &amp; fees</h3>
              <p className="text-sm text-gray-700 font-sans mt-2 leading-relaxed">
                At a private school, tuition and fees above the annual national maximum for the
                Post-9/11 GI Bill&reg; may be partially covered by Yellow Ribbon at participating
                institutions.
              </p>
            </div>
          </div>
          <ul className="mt-4 space-y-2">
            <li className="flex gap-2 text-gray-700 font-sans">
              <CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0" aria-hidden="true" />
              <span>The school must participate in the Yellow Ribbon Program &mdash; not every institution does.</span>
            </li>
            <li className="flex gap-2 text-gray-700 font-sans">
              <CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0" aria-hidden="true" />
              <span>The participating school contributes a portion; the VA matches that contribution. Amounts are set by the school, not by UCSG.</span>
            </li>
            <li className="flex gap-2 text-gray-700 font-sans">
              <CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0" aria-hidden="true" />
              <span>Eligibility is determined by the VA &mdash; not by UCSG and not by the school.</span>
            </li>
          </ul>
          <div className="mt-4 bg-[#F8FAFC] border-l-4 border-[#39C5E8] p-4 sm:p-5 rounded-r-lg">
            <p className="text-sm text-[#071B35] font-sans">
              UCSG does not determine Yellow Ribbon eligibility or award amounts. Verify with the
              VA and the institution.
            </p>
          </div>
        </Section>

        <Section>
          <h2 id="how-schools-va-contribute" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            How Schools and the VA Contribute
          </h2>
          <p className="mt-3 text-gray-700 font-sans leading-relaxed">
            At participating schools, the institution contributes a portion and the VA matches it.
            This is coordinated through the school&apos;s financial aid office and the VA. Contribution
            amounts, the number of eligible students per year, and program-level availability are
            all set by the participating school.
          </p>
        </Section>

        <Section>
          <h2 id="school-checklist" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            School-Specific Checklist
          </h2>
          <p className="mt-3 text-gray-700 font-sans leading-relaxed">
            Bring these questions to your admissions and School Certifying Official (SCO)
            conversations.
          </p>
          <ul className="mt-4 space-y-2">
            {[
              'Does the school participate in the Yellow Ribbon Program?',
              'How many Yellow Ribbon spots are available per year?',
              "What is the school's contribution amount?",
              'Is the contribution matched by the VA?',
              'Does it cover my specific degree program?',
              'Are there program-level or college-level limits?',
              'Is the contribution guaranteed for all years of enrollment?',
              'What happens if I change programs?',
            ].map((q) => (
              <li key={q} className="flex gap-2 text-gray-700 font-sans">
                <CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0" aria-hidden="true" />
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <h2 id="remaining-cost" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Understanding Remaining Cost
          </h2>
          <p className="mt-3 text-gray-700 font-sans leading-relaxed">
            Even with Yellow Ribbon participation, you may have remaining costs. Consider tuition,
            fees, books, housing, and transportation.
          </p>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'veterans', id: 'cost-planning' } }))}
            className="mt-2 text-[#39C5E8] hover:underline font-medium"
          >
            Cost Planning Guide &rarr;
          </button>
        </Section>

        <Section>
          <h2 id="faq" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            FAQ
          </h2>
          <div className="mt-4 space-y-3">
            <details className="group rounded-lg border border-gray-200 bg-white p-4">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Is Yellow Ribbon the same as full tuition coverage?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-gray-600 font-sans leading-relaxed">
                No. The program may help with costs but does not guarantee full tuition coverage.
                Amounts vary by school and program.
              </p>
            </details>
            <details className="group rounded-lg border border-gray-200 bg-white p-4">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Is Yellow Ribbon a housing allowance?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-gray-600 font-sans leading-relaxed">
                No. Yellow Ribbon helps with tuition/fees. Housing allowance is a separate benefit
                determined by the VA.
              </p>
            </details>
            <details className="group rounded-lg border border-gray-200 bg-white p-4">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Who is eligible for Yellow Ribbon?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-gray-600 font-sans leading-relaxed">
                Eligibility is determined by the VA. Only certain veterans and dependents qualify.
                Check with the VA for your status.
              </p>
            </details>
            <details className="group rounded-lg border border-gray-200 bg-white p-4">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Can I use Yellow Ribbon at any school?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-gray-600 font-sans leading-relaxed">
                No. Only participating schools offer the program. Use the VA School Comparison Tool
                to check.
              </p>
            </details>
          </div>
        </Section>

        <Section>
          <h2 id="official-source" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Official Source
          </h2>
          <p className="mt-3">
            <a
              href="https://www.va.gov/education/yellow-ribbon-program/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#39C5E8] hover:underline font-medium"
            >
              Official VA Yellow Ribbon Program Information &rarr;
            </a>
          </p>
          <SourceNote />
        </Section>
      </Body>
    ),
    ctaText: 'COMPARE MY OPTIONS',
    ctaHref: 'program-comparison',
  },

  /* ============================================================= */
  /* 4. VRE                                                         */
  /* ============================================================= */
  'vre': {
    heroImage: PLAN_IMG,
    eyebrow: 'VR&E / CHAPTER 31',
    headline: 'Veteran Readiness & Employment (VR&E) Education Planning',
    subheadline:
      'VR&E (Chapter 31) helps eligible veterans with service-connected disabilities prepare for, find, and maintain suitable employment.',
    children: (
      <Body>
        <Section>
          <h2 id="what-is-vre" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            What Is VR&amp;E (Chapter 31)?
          </h2>
          <p className="mt-3 text-gray-700 font-sans leading-relaxed">
            Veteran Readiness &amp; Employment (VR&amp;E), formerly Vocational Rehabilitation,
            helps eligible veterans with service-connected disabilities. The program may include
            education, training, and employment services.
          </p>
        </Section>

        <Section>
          <h2 id="official-va-process" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            The Official VA Process
          </h2>
          <p className="mt-3 text-gray-700 font-sans leading-relaxed">
            The VA determines eligibility, entitlement, and plan approval through a structured
            process. UCSG does not administer any step of the VA process.
          </p>
          <ol className="mt-4 space-y-5 list-none p-0">
            {[
              'Apply through the VA (eBenefits or VA.gov)',
              'Attend a comprehensive evaluation',
              'Work with a VR&E counselor to develop a rehabilitation plan',
              'Receive a plan approval (not all plans are approved)',
              'Begin education/training per the approved plan',
              'Receive ongoing support and employment services',
            ].map((step, i) => (
              <li key={step} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#39C5E8] text-white font-bold font-heading">
                  {i + 1}
                </div>
                <div className="pt-1 text-gray-700 font-sans">{step}</div>
              </li>
            ))}
          </ol>
        </Section>

        <Section>
          <h2 id="career-prep-checklist" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Career Preparation Checklist
          </h2>
          <ul className="mt-4 space-y-2">
            {[
              'Identify your career goals before meeting with VR&E',
              'Research programs that align with your employment objectives',
              'Understand the difference between entitlement and plan approval',
              'Ask about subsistence allowance during training',
              'Clarify what happens if your plan is not approved',
              'Discuss transition to employment after training',
            ].map((q) => (
              <li key={q} className="flex gap-2 text-gray-700 font-sans">
                <CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0" aria-hidden="true" />
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <h2 id="school-comparison-guidance" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            School Comparison Guidance
          </h2>
          <p className="mt-3 text-gray-700 font-sans leading-relaxed">
            If your VR&amp;E plan includes education, compare schools using the same factors as
            any veteran: accreditation, program approval, cost, format, and veteran services.
          </p>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'veterans', id: 'choosing-a-school' } }))}
            className="mt-2 text-[#39C5E8] hover:underline font-medium"
          >
            Choosing a School Guide &rarr;
          </button>
        </Section>

        <Section>
          <h2 id="ucsg-role" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            UCSG&apos;s Role
          </h2>
          <p className="mt-3 text-gray-700 font-sans leading-relaxed">
            UCSG provides educational information and helps you prepare for conversations with
            your VR&amp;E counselor. We do not determine VR&amp;E eligibility, entitlement, or
            plan approval. The VA makes all determinations.
          </p>
          <div className="mt-4 bg-[#F8FAFC] border-l-4 border-[#39C5E8] p-4 sm:p-5 rounded-r-lg">
            <p className="text-sm text-[#071B35] font-sans">
              <strong>Distinguish three separate VA decisions:</strong> eligibility to APPLY
              (determined by the VA based on your service-connected disability rating),
              entitlement (whether you qualify for VR&amp;E services), and plan approval
              (whether your specific education plan is accepted). Each step is decided by the VA &mdash;
              not by UCSG and not by the school.
            </p>
          </div>
          <div className="mt-4 bg-[#F8FAFC] border-l-4 border-[#D6A84B] p-4 sm:p-5 rounded-r-lg">
            <p className="text-sm text-[#071B35] font-sans">
              <strong>Time limits:</strong> Veterans discharged on or after January 1, 2013, do
              not have a 12-year basic eligibility limitation. Veterans discharged before that date
              may have a 12-year basic eligibility period measured from their discharge date &mdash;
              verify your specific timeframe with the VA.
            </p>
          </div>
        </Section>

        <Section>
          <h2 id="faq" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            FAQ
          </h2>
          <div className="mt-4 space-y-3">
            <details className="group rounded-lg border border-gray-200 bg-white p-4">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Am I automatically entitled to VR&E?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-gray-600 font-sans leading-relaxed">
                No. Having a service-connected disability makes you eligible to apply, but
                entitlement and plan approval are determined by the VA through evaluation.
              </p>
            </details>
            <details className="group rounded-lg border border-gray-200 bg-white p-4">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Does VR&E cover any program I want?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-gray-600 font-sans leading-relaxed">
                Your rehabilitation plan must be approved by your VR&amp;E counselor. The plan
                must align with your employment goals and be feasible.
              </p>
            </details>
            <details className="group rounded-lg border border-gray-200 bg-white p-4">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Is VR&E the same as the GI Bill&reg;?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-gray-600 font-sans leading-relaxed">
                No. VR&amp;E (Chapter 31) is for veterans with service-connected disabilities.
                The GI Bill&reg; (Chapter 33) is a separate program. You may qualify for both but
                typically use one at a time.
              </p>
            </details>
            <details className="group rounded-lg border border-gray-200 bg-white p-4">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Is there a time limit to use VR&E?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-gray-600 font-sans leading-relaxed">
                It depends on your discharge date. Veterans discharged on or after January 1,
                2013, do not have a 12-year basic eligibility limitation. Veterans discharged
                before that date may have a 12-year basic eligibility period measured from their
                discharge date. Do not assume a universal timeframe &mdash; verify your specific
                situation with the VA.
              </p>
            </details>
          </div>
        </Section>

        <Section>
          <h2 id="official-source" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Official Source
          </h2>
          <p className="mt-3">
            <a
              href="https://www.va.gov/education/about-vre-program/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#39C5E8] hover:underline font-medium"
            >
              Official VR&amp;E Program Information &rarr;
            </a>
          </p>
          <SourceNote />
        </Section>
      </Body>
    ),
    ctaText: 'TALK WITH AN ADVISOR',
    ctaHref: 'book-consultation',
  },

  /* ============================================================= */
  /* 5. COST-PLANNING                                                */
  /* ============================================================= */
  'cost-planning': {
    heroImage: PLAN_IMG,
    eyebrow: 'COST PLANNING',
    headline: 'Education Cost Planning for Veterans',
    subheadline:
      'Understand total degree cost: tuition, fees, living expenses, and benefit verification — beyond the per-credit rate.',
    children: (
      <Body>
        <Section>
          <h2 id="total-cost" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Understanding Total Education Cost
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Education cost goes beyond tuition. Consider mandatory fees, books, housing,
            transportation, and opportunity cost. Use this framework to compare programs side by side.
          </p>
        </Section>

        <Section>
          <h2 id="cost-comparison-table" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Cost Comparison Table
          </h2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#071B35] text-white">
                  <th className="text-left p-3">Cost Component</th>
                  <th className="text-left p-3">Program A</th>
                  <th className="text-left p-3">Program B</th>
                  <th className="text-left p-3">Program C</th>
                </tr>
              </thead>
              <tbody>
                {[
                  'Tuition (per credit)',
                  'Total Credits',
                  'Mandatory Fees',
                  'Books & Materials',
                  'Housing',
                  'Transportation',
                  'Technology Fees',
                  'Total Estimated Cost',
                ].map((row, idx, arr) => (
                  <tr
                    key={row}
                    className={`border-b border-gray-200 ${idx % 2 === 1 ? 'bg-gray-50' : ''} ${idx === arr.length - 1 ? 'font-bold text-[#071B35]' : ''}`}
                  >
                    <td className="p-3">{row}</td>
                    <td className="p-3 text-gray-400">&mdash;</td>
                    <td className="p-3 text-gray-400">&mdash;</td>
                    <td className="p-3 text-gray-400">&mdash;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Use the same comparison period (e.g., per academic year or total program). Separate
            confirmed figures (from the school&apos;s website) from estimated or pending figures. Never
            treat missing values as zero.
          </p>
        </Section>

        <Section>
          <h2 id="academic-budget" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Academic Budget
          </h2>
          <div className="bg-[#F8FAFC] border-l-4 border-[#39C5E8] p-4 sm:p-5 rounded-r-lg mt-3">
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-2"><span className="text-[#071B35] font-semibold">Tuition</span></li>
              <li className="flex gap-2"><span className="text-[#071B35] font-semibold">Technology fee</span></li>
              <li className="flex gap-2"><span className="text-[#071B35] font-semibold">Lab fee</span></li>
              <li className="flex gap-2"><span className="text-[#071B35] font-semibold">Student activity fee</span></li>
              <li className="flex gap-2"><span className="text-[#071B35] font-semibold">Graduation fee</span></li>
            </ul>
            <p className="text-sm text-gray-600 mt-3">Contact institution for current rates.</p>
          </div>
        </Section>

        <Section>
          <h2 id="living-budget" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Living Budget
          </h2>
          <div className="bg-[#F8FAFC] border-l-4 border-[#39C5E8] p-4 sm:p-5 rounded-r-lg mt-3">
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-2"><span className="text-[#071B35] font-semibold">Housing (on/off campus)</span></li>
              <li className="flex gap-2"><span className="text-[#071B35] font-semibold">Food/meals</span></li>
              <li className="flex gap-2"><span className="text-[#071B35] font-semibold">Transportation</span></li>
              <li className="flex gap-2"><span className="text-[#071B35] font-semibold">Health insurance</span></li>
              <li className="flex gap-2"><span className="text-[#071B35] font-semibold">Personal expenses</span></li>
            </ul>
            <p className="text-sm text-gray-600 mt-3">Living costs vary significantly by location.</p>
          </div>
        </Section>

        <Section>
          <h2 id="overlooked-costs" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Overlooked Costs Checklist
          </h2>
          <ul className="space-y-3 mt-4">
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>Application fees (ask about veteran waivers)</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>Transcript request fees</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>Books and digital materials</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>Parking permits</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>Professional certification exam fees</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>Background checks (some programs)</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>Technology requirements (laptop, software)</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>Travel for campus visits or residencies</span></li>
          </ul>
        </Section>

        <Section>
          <h2 id="funding-considerations" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Funding Considerations
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Multiple funding sources may apply: VA education benefits, scholarships, employer tuition
            assistance, and institutional aid. Do not double-count funding. Verify each source separately.
          </p>
          <div className="bg-[#F8FAFC] border-l-4 border-[#39C5E8] p-4 sm:p-5 rounded-r-lg mt-3">
            <p className="text-sm text-[#071B35]">
              UCSG does not determine VA eligibility or payment amounts. Contact the VA for benefit
              verification.
            </p>
          </div>
        </Section>

        <Section>
          <h2 id="faq" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            FAQ
          </h2>
          <div className="space-y-3 mt-4">
            <details className="group rounded-lg border border-gray-200 bg-white p-4 open:bg-[#F8FAFC]">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>How do I know the total cost of a program?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <div className="mt-3 text-gray-600 leading-relaxed">
                Request a cost breakdown from the institution&apos;s financial aid office. Include
                tuition, fees, and estimated living expenses for your location.
              </div>
            </details>
            <details className="group rounded-lg border border-gray-200 bg-white p-4 open:bg-[#F8FAFC]">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Can UCSG calculate my VA benefit amount?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <div className="mt-3 text-gray-600 leading-relaxed">
                No. VA benefit amounts are determined by the VA based on your eligibility, enrollment
                status, and program. Contact the VA for current figures.
              </div>
            </details>
            <details className="group rounded-lg border border-gray-200 bg-white p-4 open:bg-[#F8FAFC]">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>What if I don&apos;t know some costs?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <div className="mt-3 text-gray-600 leading-relaxed">
                Mark unknown figures as &apos;pending&apos; or &apos;unconfirmed.&apos; Never treat a
                missing value as zero. Contact the institution for current rates.
              </div>
            </details>
            <details className="group rounded-lg border border-gray-200 bg-white p-4 open:bg-[#F8FAFC]">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Should I include living expenses?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <div className="mt-3 text-gray-600 leading-relaxed">
                Yes. Housing, food, and transportation are significant costs. Factor them into your
                total budget comparison.
              </div>
            </details>
          </div>
        </Section>

        <Section>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-700">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'veterans', id: 'education-benefits' } }))}
              className="text-[#39C5E8] hover:underline font-medium"
            >
              Explore Education Benefits &rarr;
            </button>
            <span className="text-gray-300" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'veterans', id: 'assessment' } }))}
              className="text-[#39C5E8] hover:underline font-medium"
            >
              Start Free Assessment &rarr;
            </button>
          </div>
        </Section>
      </Body>
    ),
    ctaText: 'START MY ASSESSMENT',
    ctaHref: 'assessment',
  },

  /* ============================================================= */
  /* 6. MILITARY-TRANSFER-CREDIT                                     */
  /* ============================================================= */
  'military-transfer-credit': {
    heroImage: PLAN_IMG,
    eyebrow: 'MILITARY EXPERIENCE',
    headline: 'Military Transfer Credit: What Veterans Should Know',
    subheadline:
      'Your military training and experience may translate into college credit — but each institution sets its own transfer-credit policy.',
    children: (
      <Body>
        <Section>
          <h2 id="previous-experience" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Your Previous Experience May Matter
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Your military training, professional certifications, and prior college coursework may
            translate into college credit. Each institution sets its own evaluation policy &mdash;
            UCSG cannot guarantee credit transfer.
          </p>
        </Section>

        <Section>
          <h2 id="records-checklist" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Records Checklist
          </h2>
          <ul className="space-y-3 mt-4">
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>Joint Services Transcript (JST) &mdash; request at jst.doted.mil</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>Community College of the Air Force (CCAF) transcripts (Air Force)</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>Coast Guard Institute transcripts</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>Prior college transcripts (from every institution attended)</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>CLEP/DANTES exam score reports</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>Professional certifications (industry-recognized)</span></li>
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            Do not assume every service branch uses JST. Air Force uses CCAF; Coast Guard uses Coast
            Guard Institute. Verify which transcript applies to your branch.
          </p>
        </Section>

        <Section>
          <h2 id="ace-recommendations" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Recommendation and Award Credit
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Some institutions award credit for military training based on ACE (American Council on
            Education) recommendations. However, institutions are not required to accept ACE
            recommendations.
          </p>
          <div className="bg-[#F8FAFC] border-l-4 border-[#39C5E8] p-4 sm:p-5 rounded-r-lg mt-3">
            <p className="text-sm text-[#071B35]">
              Do not promise credit amounts or completion savings. Each institution sets its own
              transfer-credit policy &mdash; contact the receiving institution for their specific
              policy.
            </p>
          </div>
        </Section>

        <Section>
          <h2 id="credit-evaluation-status" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Credit Evaluation Status
          </h2>
          <div className="grid gap-4 sm:grid-cols-3 mt-4">
            <div className="rounded-lg border-l-4 border-[#39C5E8] bg-[#F8FAFC] p-4">
              <h3 className="font-heading font-semibold text-[#071B35]">Accepted</h3>
              <p className="text-sm text-gray-600 mt-1">Credit awarded toward your degree.</p>
            </div>
            <div className="rounded-lg border-l-4 border-[#D6A84B] bg-[#F8FAFC] p-4">
              <h3 className="font-heading font-semibold text-[#071B35]">Applied as Elective</h3>
              <p className="text-sm text-gray-600 mt-1">Credit counts but not toward a specific requirement.</p>
            </div>
            <div className="rounded-lg border-l-4 border-gray-400 bg-[#F8FAFC] p-4">
              <h3 className="font-heading font-semibold text-[#071B35]">Not Accepted</h3>
              <p className="text-sm text-gray-600 mt-1">Institution did not award credit.</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Even accepted credits may not shorten your time to completion if they don&apos;t apply to
            specific degree requirements.
          </p>
        </Section>

        <Section>
          <h2 id="questions-to-ask" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Questions to Ask Schools
          </h2>
          <ul className="space-y-3 mt-4">
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>Do you evaluate JST/CCAF transcripts for credit?</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>Do you use ACE recommendations?</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>What is your prior learning assessment (PLA) process?</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>Is there a maximum number of transfer credits accepted?</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>Do transfer credits count toward my major requirements?</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>What are the residency requirements (minimum credits at your institution)?</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>How do transfer credits affect graduation requirements?</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>Is there a fee for transcript evaluation?</span></li>
          </ul>
        </Section>

        <Section>
          <h2 id="official-resources" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Official Military Learning Resources
          </h2>
          <ul className="ml-6 space-y-3 list-disc text-gray-700 mt-3">
            <li>
              <a href="https://jst.doded.mil/" target="_blank" rel="noopener noreferrer" className="text-[#39C5E8] hover:underline font-medium">JST &mdash; jst.doded.mil</a>
            </li>
            <li>
              <a href="https://www.acenet.edu/" target="_blank" rel="noopener noreferrer" className="text-[#39C5E8] hover:underline font-medium">ACE Military Guide &mdash; acenet.edu</a>
            </li>
            <li>
              <a href="https://www.dodedu.mil/" target="_blank" rel="noopener noreferrer" className="text-[#39C5E8] hover:underline font-medium">DoD Voluntary Education &mdash; dodedu.mil</a>
            </li>
          </ul>
        </Section>

        <Section>
          <h2 id="faq" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            FAQ
          </h2>
          <div className="space-y-3 mt-4">
            <details className="group rounded-lg border border-gray-200 bg-white p-4 open:bg-[#F8FAFC]">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Will my military training automatically count for college credit?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <div className="mt-3 text-gray-600 leading-relaxed">
                No. Each institution evaluates independently. Some use ACE recommendations; others
                have their own evaluation process.
              </div>
            </details>
            <details className="group rounded-lg border border-gray-200 bg-white p-4 open:bg-[#F8FAFC]">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>What is a JST?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <div className="mt-3 text-gray-600 leading-relaxed">
                The Joint Services Transcript is an official record of military training and
                experience. Request yours at jst.doted.mil.
              </div>
            </details>
            <details className="group rounded-lg border border-gray-200 bg-white p-4 open:bg-[#F8FAFC]">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Can UCSG guarantee my credits will transfer?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <div className="mt-3 text-gray-600 leading-relaxed">
                No. Transfer credit decisions are made by the receiving institution. We help you ask
                the right questions and prepare your records.
              </div>
            </details>
            <details className="group rounded-lg border border-gray-200 bg-white p-4 open:bg-[#F8FAFC]">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Do all branches use the same transcript system?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <div className="mt-3 text-gray-600 leading-relaxed">
                No. Army, Navy, and Marines use JST. Air Force uses the Community College of the Air
                Force (CCAF). Coast Guard uses the Coast Guard Institute. Verify which applies to you.
              </div>
            </details>
          </div>
        </Section>

        <Section>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-700">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'veterans', id: 'bachelors-degree' } }))}
              className="text-[#39C5E8] hover:underline font-medium"
            >
              Explore Bachelor&apos;s Degree Path &rarr;
            </button>
            <span className="text-gray-300" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'veterans', id: 'assessment' } }))}
              className="text-[#39C5E8] hover:underline font-medium"
            >
              Start Free Assessment &rarr;
            </button>
          </div>
        </Section>
      </Body>
    ),
    ctaText: 'TALK WITH AN ADVISOR',
    ctaHref: 'book-consultation',
  },

  /* ============================================================= */
  /* 7. CHOOSING-A-SCHOOL                                            */
  /* ============================================================= */
  'choosing-a-school': {
    heroImage: PLAN_IMG,
    eyebrow: 'SCHOOL SELECTION',
    headline: 'Choosing the Right School as a Veteran',
    subheadline:
      'Compare schools across 10 factors — degree fit, accreditation, VA approval, cost, transfer policy, veteran services, and more.',
    children: (
      <Body>
        <Section>
          <h2 id="choosing-right-school" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Choosing the Right School as a Veteran
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Selecting the right institution is one of the most important decisions in your education
            journey. Use this framework to compare schools systematically &mdash; don&apos;t rely on
            marketing claims or &apos;military-friendly&apos; badges without verification.
          </p>
        </Section>

        <Section>
          <h2 id="career-goals-first" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Your Career Goals Come First
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Before comparing schools, clarify your career objectives. What field do you want to enter?
            What credentials are required? What salary range is realistic in that field?
          </p>
          <div className="bg-[#F8FAFC] border-l-4 border-[#39C5E8] p-4 sm:p-5 rounded-r-lg mt-3">
            <p className="text-sm text-[#071B35]">
              Your career goals should drive your school selection &mdash; not the other way around.
            </p>
          </div>
        </Section>

        <Section>
          <h2 id="ten-factor-framework" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            10-Factor Selection Framework
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 mt-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="font-heading font-semibold text-[#071B35]">1. Degree fit</h3>
              <p className="text-sm text-gray-600 mt-1">Does the program align with your career goals and required credentials?</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="font-heading font-semibold text-[#071B35]">2. Accreditation</h3>
              <p className="text-sm text-gray-600 mt-1">Verify the institution&apos;s accreditation status through recognized accrediting bodies. Check if the accreditation type meets your transfer and career requirements.</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="font-heading font-semibold text-[#071B35]">3. Program approval</h3>
              <p className="text-sm text-gray-600 mt-1">Is the specific program approved for VA education benefits?</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="font-heading font-semibold text-[#071B35]">4. Delivery format</h3>
              <p className="text-sm text-gray-600 mt-1">Online, hybrid, or on-campus? Which fits your schedule and learning style?</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="font-heading font-semibold text-[#071B35]">5. Total estimated cost</h3>
              <p className="text-sm text-gray-600 mt-1">Tuition, fees, books, housing &mdash; what&apos;s the all-in cost?</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="font-heading font-semibold text-[#071B35]">6. Transfer-credit policy</h3>
              <p className="text-sm text-gray-600 mt-1">Will your prior credits transfer? What&apos;s the maximum accepted?</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="font-heading font-semibold text-[#071B35]">7. Graduation requirements</h3>
              <p className="text-sm text-gray-600 mt-1">How many credits to complete? What are the residency requirements?</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="font-heading font-semibold text-[#071B35]">8. Veteran services</h3>
              <p className="text-sm text-gray-600 mt-1">Is there a dedicated veteran services office or SCO (School Certifying Official)?</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="font-heading font-semibold text-[#071B35]">9. Academic support</h3>
              <p className="text-sm text-gray-600 mt-1">Tutoring, advising, career services, disability services?</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="font-heading font-semibold text-[#071B35]">10. Career alignment</h3>
              <p className="text-sm text-gray-600 mt-1">Do graduates find jobs in your target field? What&apos;s the employment rate?</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Avoid unsupported &apos;best school&apos; rankings or military-friendly badges. Verify
            claims through official sources.
          </p>
        </Section>

        <Section>
          <h2 id="official-research" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Official Research Resources
          </h2>
          <ul className="ml-6 space-y-3 list-disc text-gray-700 mt-3">
            <li>
              <a href="https://www.va.gov/school-finding/" target="_blank" rel="noopener noreferrer" className="text-[#39C5E8] hover:underline font-medium">VA School Comparison Tool &mdash; va.gov/school-finding</a>
            </li>
            <li>
              <a href="https://collegescorecard.ed.gov/" target="_blank" rel="noopener noreferrer" className="text-[#39C5E8] hover:underline font-medium">College Scorecard &mdash; collegescorecard.ed.gov</a>
            </li>
            <li>
              <a href="https://nces.ed.gov/collegenavigator/" target="_blank" rel="noopener noreferrer" className="text-[#39C5E8] hover:underline font-medium">College Navigator &mdash; nces.ed.gov/collegenavigator</a>
            </li>
            <li>
              <a href="https://www.benefits.va.gov/GIBILL/Principles_of_Excellence.asp" target="_blank" rel="noopener noreferrer" className="text-[#39C5E8] hover:underline font-medium">Principles of Excellence &mdash; benefits.va.gov</a>
            </li>
          </ul>
        </Section>

        <Section>
          <h2 id="document-checklist" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Document Checklist
          </h2>
          <ul className="space-y-3 mt-4">
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>Program information sheets from each school</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>VA benefit eligibility confirmation</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>Transfer credit evaluation results</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>Total cost breakdown from financial aid office</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>Veteran services contact information</span></li>
            <li className="flex gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-[#39C5E8] shrink-0 mt-0.5" /><span>Accreditation verification</span></li>
          </ul>
        </Section>

        <Section>
          <h2 id="faq" className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            FAQ
          </h2>
          <div className="space-y-3 mt-4">
            <details className="group rounded-lg border border-gray-200 bg-white p-4 open:bg-[#F8FAFC]">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>What&apos;s the difference between regional and national accreditation?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <div className="mt-3 text-gray-600 leading-relaxed">
                Verify the institution&apos;s accreditation status through recognized accrediting
                bodies. Check if the accreditation type meets your transfer and career
                requirements &mdash; do not assume a universal answer. Each institution sets its
                own transfer-credit policy. Contact the receiving institution for their specific
                policy before enrolling.
              </div>
            </details>
            <details className="group rounded-lg border border-gray-200 bg-white p-4 open:bg-[#F8FAFC]">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>How do I verify a school is VA-approved?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <div className="mt-3 text-gray-600 leading-relaxed">
                Use the VA School Comparison Tool at va.gov/school-finding to check if a specific
                program is approved for VA education benefits.
              </div>
            </details>
            <details className="group rounded-lg border border-gray-200 bg-white p-4 open:bg-[#F8FAFC]">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>What is a School Certifying Official (SCO)?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <div className="mt-3 text-gray-600 leading-relaxed">
                An SCO is the school staff member who certifies your enrollment to the VA. Every
                VA-approved school has one. Contact them early in the enrollment process.
              </div>
            </details>
            <details className="group rounded-lg border border-gray-200 bg-white p-4 open:bg-[#F8FAFC]">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Should I trust &apos;military-friendly&apos; designations?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">+</span>
              </summary>
              <div className="mt-3 text-gray-600 leading-relaxed">
                Some designations are meaningful; others are marketing. Verify actual veteran
                services, staff, and policies rather than relying on badges alone.
              </div>
            </details>
          </div>
        </Section>

        <Section>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-700">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'veterans', id: 'program-comparison' } }))}
              className="text-[#39C5E8] hover:underline font-medium"
            >
              Open Program Comparison Tool &rarr;
            </button>
            <span className="text-gray-300" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'veterans', id: 'assessment' } }))}
              className="text-[#39C5E8] hover:underline font-medium"
            >
              Start Free Assessment &rarr;
            </button>
          </div>
        </Section>
      </Body>
    ),
    ctaText: 'COMPARE MY OPTIONS',
    ctaHref: 'program-comparison',
  },

  /* ============================================================= */
  /* 8. PROGRAM-COMPARISON                                           */
  /* ============================================================= */
  'program-comparison': {
    heroImage: PLAN_IMG,
    eyebrow: 'PROGRAM COMPARISON',
    headline: 'Compare Veteran Education Programs Side-by-Side',
    subheadline:
      'A structured comparison framework for veterans — built to cut through marketing materials and compare what actually matters.',
    children: (
      <Body>
        <Section>
          <h2 className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Compare Veteran Education Programs
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Use this interactive worksheet to compare programs side by side. Enter information
            from each school&rsquo;s official website. Mark each field as confirmed, estimated,
            or pending.
          </p>
        </Section>

        <Section>
          <h2 className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            How to Use This Worksheet
          </h2>
          <ol className="mt-4 space-y-4">
            {[
              'Gather program information from official school websites',
              'Enter data for each program in the columns below',
              'Mark each field\u2019s status (confirmed/estimated/pending)',
              'Compare and discuss with an education advisor',
            ].map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#39C5E8] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="pt-1.5 text-gray-700 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section>
          <h2 className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Program Comparison Worksheet
          </h2>
          <ProgramComparisonWorksheet />
        </Section>

        <Section>
          <h2 className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Comparison Guidance
          </h2>
          <ul className="mt-4 space-y-2">
            {[
              'Compare the same time period (per year or total program)',
              'Mark each figure\u2019s verification status',
              'Note what\u2019s included vs excluded in tuition',
              'Consider non-financial factors (location, culture, support)',
            ].map((tip, i) => (
              <li key={i} className="flex gap-2 text-gray-700">
                <span className="text-[#39C5E8] font-bold shrink-0" aria-hidden="true">
                  ✓
                </span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <h2 className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Priorities and Unresolved Questions
          </h2>
          <div className="mt-4 rounded-r-lg border-l-4 border-[#39C5E8] bg-[#F8FAFC] p-4">
            <p className="text-sm text-[#071B35]">
              What matters most to you? Write down your top 3 priorities before comparing. Common
              priorities: cost, format flexibility, time to completion, career outcomes, veteran
              support.
            </p>
          </div>
          <ol className="mt-4 space-y-2">
            {[
              'Which factors are deal-breakers?',
              'Which factors are nice-to-have?',
              'What\u2019s your timeline for enrollment?',
              'What questions remain unanswered?',
            ].map((q, i) => (
              <li key={i} className="flex gap-2 text-gray-700">
                <span className="text-[#39C5E8] font-bold shrink-0" aria-hidden="true">
                  {i + 1}.
                </span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section>
          <h2 className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            FAQ
          </h2>
          <div className="mt-4 space-y-3">
            <details className="rounded-lg border border-gray-200 bg-white p-4">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Is this worksheet connected to any school database?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-gray-600 leading-relaxed">
                No. You enter information manually from official school websites. The worksheet
                helps you organize and compare &mdash; it doesn&rsquo;t pull data automatically.
              </p>
            </details>
            <details className="rounded-lg border border-gray-200 bg-white p-4">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Will my worksheet data be saved?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-gray-600 leading-relaxed">
                By default, your data stays in your browser&rsquo;s memory during your session. If
                you close the page, the data is lost. Use the Print button to save a physical copy.
              </p>
            </details>
            <details className="rounded-lg border border-gray-200 bg-white p-4">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Can I share this with an advisor?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Print the worksheet and bring it to your consultation. We can review it together
                and discuss next steps.
              </p>
            </details>
            <details className="rounded-lg border border-gray-200 bg-white p-4">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>What if I can&rsquo;t find some information?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Mark it as &lsquo;Pending&rsquo; or &lsquo;Unknown.&rsquo; Never assume or invent
                data. Contact the institution&rsquo;s admissions office for missing information.
              </p>
            </details>
          </div>
        </Section>

        <Section>
          <h2 className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Need Help Comparing?
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent('ucsg-navigate', {
                    detail: { view: 'veterans', id: 'book-consultation' },
                  }),
                )
              }
              className="inline-flex items-center rounded-md bg-[#071B35] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0d2a5a]"
            >
              BOOK A CONSULTATION
            </button>
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent('ucsg-navigate', {
                    detail: { view: 'veterans', id: 'assessment' },
                  }),
                )
              }
              className="inline-flex items-center rounded-md border border-[#D6A84B] bg-white px-6 py-3 text-sm font-semibold text-[#8A6B26] hover:bg-[#D6A84B]/10"
            >
              START FREE ASSESSMENT
            </button>
          </div>
        </Section>
      </Body>
    ),
    ctaText: 'START MY ASSESSMENT',
    ctaHref: 'assessment',
  },

  /* ============================================================= */
  /* 9. RESOURCES                                                    */
  /* ============================================================= */
  'resources': {
    heroImage: FUTURE_IMG,
    eyebrow: 'RESOURCE CENTER',
    headline: 'Veteran Education Resource Center',
    subheadline:
      'Browse veteran education guides covering college comparison, VA benefits, transfer credit, degree planning, and cost planning — all linked to official sources.',
    children: (
      <Body>
        <Section>
          <h2 className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Veteran Education Resource Center
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Browse veteran education guides covering college comparison, VA benefits, transfer
            credit, degree planning, and cost comparison. All resources link to real implemented
            pages on this site.
          </p>
        </Section>

        <Section>
          <h2 className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Topic Jump Links
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {[
              { id: 'degree-planning', label: 'Degree Planning' },
              { id: 'education-benefits', label: 'Education Benefits' },
              { id: 'military-transfer-credit', label: 'Military Credit' },
              { id: 'choosing-a-school', label: 'School Selection' },
              { id: 'cost-planning', label: 'Cost Planning' },
              { id: 'program-comparison', label: 'Program Comparison' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent('ucsg-navigate', {
                      detail: { view: 'veterans', id: t.id },
                    }),
                  )
                }
                className="rounded-full border border-gray-200 bg-[#F8FAFC] px-4 py-2 text-sm font-medium text-[#071B35] hover:border-[#39C5E8] hover:bg-white"
              >
                {t.label}
              </button>
            ))}
          </div>
        </Section>

        <Section>
          <h2 className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Grouped Resource Cards
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: 'choosing-a-school',
                title: 'How to Compare Colleges as a Veteran',
                summary:
                  'Use the 10-factor selection framework to evaluate schools on accreditation, cost, format, and veteran services.',
              },
              {
                id: 'education-benefits',
                title: 'Understanding VA Education Benefits',
                summary:
                  'Learn about VA education benefit programs, how to apply, and what questions to ask the VA.',
              },
              {
                id: 'military-transfer-credit',
                title: 'Military Transcripts and Transfer Credit',
                summary:
                  'Understand JST, CCAF, and prior learning assessment. Questions to ask admissions about credit evaluation.',
              },
              {
                id: 'bachelors-degree',
                title: 'Bachelor\u2019s Degree Completion Planning',
                summary:
                  'Steps to complete your bachelor\u2019s degree, including transfer credit, format comparison, and cost planning.',
              },
              {
                id: 'program-comparison',
                title: 'Compare Veteran Education Programs',
                summary:
                  'Use the interactive comparison worksheet to evaluate programs side by side with verified data.',
              },
              {
                id: 'cost-planning',
                title: 'Education Cost Planning',
                summary:
                  'Budget for tuition, fees, housing, and overlooked costs. Separate confirmed, estimated, and pending figures.',
              },
            ].map((c) => (
              <div
                key={c.id}
                className="flex flex-col rounded-lg border border-gray-200 bg-white p-5 transition hover:border-[#39C5E8] hover:shadow-md"
              >
                <h3 className="font-heading text-lg font-semibold text-[#071B35]">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm text-gray-600 leading-relaxed">{c.summary}</p>
                <p className="mt-4 text-xs text-gray-400">UCSG Editorial Team</p>
                <button
                  type="button"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent('ucsg-navigate', {
                        detail: { view: 'veterans', id: c.id },
                      }),
                    )
                  }
                  className="mt-3 inline-flex items-center text-sm font-medium text-[#39C5E8] hover:underline"
                >
                  Read Guide &rarr;
                </button>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <h2 className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Who Can Help
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              {
                role: 'Admissions Office',
                desc: 'Application requirements, deadlines, fee waivers',
              },
              {
                role: 'Registrar',
                desc: 'Transcript evaluation, transfer credit, enrollment verification',
              },
              {
                role: 'School Certifying Official (SCO)',
                desc: 'VA benefit certification, enrollment reporting',
              },
              {
                role: 'VA Education Case Manager',
                desc: 'Benefit eligibility, payment questions',
              },
              {
                role: 'UCSG Education Advisor',
                desc: 'Program comparison, planning guidance, application support',
              },
            ].map((r) => (
              <div key={r.role} className="rounded-lg border border-gray-200 bg-white p-4">
                <h3 className="font-heading font-semibold text-[#071B35]">{r.role}</h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-r-lg border-l-4 border-[#39C5E8] bg-[#F8FAFC] p-4">
            <p className="text-sm text-[#071B35]">
              Contact each role for their specific area. UCSG provides educational planning
              support &mdash; we do not make VA or institutional decisions.
            </p>
          </div>
        </Section>

        <Section>
          <h2 className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            FAQ
          </h2>
          <div className="mt-4 space-y-3">
            <details className="rounded-lg border border-gray-200 bg-white p-4">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Are these resources free?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Yes. All guides on this site are free to read. The veteran assessment is also free
                with no enrollment commitment.
              </p>
            </details>
            <details className="rounded-lg border border-gray-200 bg-white p-4">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Can UCSG help me contact schools?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-gray-600 leading-relaxed">
                UCSG provides guidance on what to ask and how to prepare. We can help you organize
                your approach, but you should contact schools directly for official information.
              </p>
            </details>
            <details className="rounded-lg border border-gray-200 bg-white p-4">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Where can I find official VA resources?</span>
                <span className="text-[#39C5E8] font-bold text-lg leading-none" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Visit{' '}
                <a
                  href="https://www.va.gov/education"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#39C5E8] font-medium hover:underline"
                >
                  va.gov/education
                </a>{' '}
                for the most current information on VA education benefits. Always verify with
                official sources before making decisions.
              </p>
            </details>
          </div>
        </Section>

        <Section>
          <h2 className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Get Started
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent('ucsg-navigate', {
                    detail: { view: 'veterans', id: 'assessment' },
                  }),
                )
              }
              className="inline-flex items-center rounded-md bg-[#071B35] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0d2a5a]"
            >
              START FREE ASSESSMENT
            </button>
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent('ucsg-navigate', {
                    detail: { view: 'veterans', id: 'book-consultation' },
                  }),
                )
              }
              className="inline-flex items-center rounded-md border border-[#D6A84B] bg-white px-6 py-3 text-sm font-semibold text-[#8A6B26] hover:bg-[#D6A84B]/10"
            >
              BOOK A CONSULTATION
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#071B35]">
            <a href="tel:917-565-4788" className="hover:underline">
              917-565-4788
            </a>
            <a
              href="https://wa.me/13478376354"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              WhatsApp
            </a>
            <a href="mailto:info@universalconsultingservices.com" className="hover:underline">
              info@universalconsultingservices.com
            </a>
          </div>
        </Section>
      </Body>
    ),
    ctaText: 'START MY ASSESSMENT',
    ctaHref: 'assessment',
  },

  /* ============================================================= */
  /* 10. EVENTS                                                      */
  /* ============================================================= */
  'events': {
    heroImage: FUTURE_IMG,
    eyebrow: 'WORKSHOPS & EVENTS',
    headline: 'Veteran Education Workshops & Events',
    subheadline:
      'Attend the YOUR NEXT MISSION: EDUCATION workshop — a structured session covering degree options, education benefits, transfer credit, and school selection.',
    children: (
      <Body>
        <motion.div
          {...reveal}
          className="bg-gradient-to-br from-[#061846] to-[#092B68] rounded-2xl p-6 sm:p-8 text-white"
        >
          <h2 className="text-2xl font-heading font-bold text-[#D6A84B]">YOUR NEXT MISSION: EDUCATION</h2>
          <p className="text-lg mt-2">Veteran Degree &amp; Education Planning Workshop</p>
          <p className="text-white/70 mt-4 leading-relaxed">
            A structured session covering degree options, education benefits, transfer credit, and
            school selection — built for veterans, transitioning service members, and
            military-connected family members.
          </p>
          <button
            className="mt-6 bg-[#0874F9] hover:bg-[#0660D4] text-white font-medium px-6 py-3 rounded-lg transition-colors"
            onClick={() => window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'veterans', id: 'assessment' } }))}
          >
            NOTIFY ME ABOUT FUTURE WORKSHOPS
          </button>
          <p className="text-white/70 mt-4 text-sm leading-relaxed">
            Workshop dates will be announced when confirmed. We&apos;ll notify you when
            registration opens.
          </p>
        </motion.div>

        <Section>
          <H2 id="what-to-expect">What to Expect at the Workshop</H2>
          <Lead>
            The workshop is a small-group, interactive session — not a lecture. Expect facilitated
            discussion, individual planning worksheets, and time for questions. The goal is for
            every attendee to leave with a clearer next step, not a sales pitch.
          </Lead>
          <CheckList
            items={[
              'Facilitated by a UCSG education advisor (no VA representative in attendance — VA guidance is referenced to official VA sources)',
              'Group size capped to allow real Q&A — typically 8–15 attendees',
              'Planning worksheets you can take home and continue using',
              'Live walkthrough of the VA School Comparison Tool and JST portal',
              'Time built in for individual goal-setting and one-on-one questions',
              'No sales pressure — no commitment required to attend',
            ]}
          />
          <Callout>
            <p className="text-sm text-[#061846]">
              UCSG is not affiliated with the VA, DoD, or any branch of the U.S. Armed Forces. VA
              benefit eligibility and payments are determined by the VA. This workshop is
              educational; UCSG does not determine or guarantee benefits.
            </p>
          </Callout>
        </Section>

        <Section>
          <H2 id="who-should-attend">Who Should Attend</H2>
          <div className="grid gap-4 sm:grid-cols-2 mt-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Veterans</h3>
              <p className="text-sm text-gray-600 mt-1">Who want to start or finish a degree and are unsure where to begin — or which degree fits.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Transitioning service members</h3>
              <p className="text-sm text-gray-600 mt-1">Within 6–12 months of separation who want a structured planning process before civilian life.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Guard &amp; Reserve</h3>
              <p className="text-sm text-gray-600 mt-1">Balancing civilian careers, drill obligations, and degree completion.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Military spouses &amp; dependents</h3>
              <p className="text-sm text-gray-600 mt-1">Considering transferred education benefits or their own degree path.</p>
            </div>
          </div>
        </Section>

        <Section>
          <H2 id="agenda">Workshop Agenda</H2>
          <Steps
            items={[
              {
                title: 'Goal Setting & Career Alignment',
                body: (
                  <span>
                    Articulate your one-sentence goal: degree, field, and target role. Without a
                    clear goal, school selection becomes guesswork.
                  </span>
                ),
              },
              {
                title: 'Reviewing Prior Learning & Military Experience',
                body: (
                  <span>
                    Walk through how to request your Joint Services Transcript, gather prior
                    college transcripts, and identify completed CLEP/DSST exams.
                  </span>
                ),
              },
              {
                title: 'Understanding VA Education Benefits',
                body: (
                  <span>
                    Overview of Post-9/11 GI Bill®, MGIB, VR&amp;E, Yellow Ribbon, and DEA — with
                    links to official VA sources for eligibility and rate verification.
                  </span>
                ),
              },
              {
                title: 'Choosing a School: The 10-Factor Framework',
                body: (
                  <span>
                    Live walkthrough of the framework: accreditation, VA program approval, transfer
                    policy, veteran services, cost, and career outcomes.
                  </span>
                ),
              },
              {
                title: 'Building Your Personal Plan',
                body: (
                  <span>
                    Complete a planning worksheet that captures your goal, top 3 candidate
                    programs, next-step actions, and timeline.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="what-to-bring">What to Bring</H2>
          <Callout>
            <p className="text-sm text-[#061846]">
              <strong>You do NOT need to bring your DD-214, Social Security Number, VA claim
              number, disability rating, or any medical or banking information.</strong> The
              workshop is educational — UCSG does not collect, store, or transmit sensitive
              personal data.
            </p>
          </Callout>
          <CheckList
            items={[
              'A notebook or laptop for planning worksheets',
              'A rough idea of your career goal — even if it is still fuzzy',
              'A list of any prior college courses you remember taking',
              'Branch of service, dates of service, and any MOS/AFSC/rating titles you recall',
              'Questions you want answered during Q&A time',
              'An open mind — the workshop is interactive, not a lecture',
            ]}
          />
        </Section>

        <Section>
          <H2 id="format-logistics">Workshop Format &amp; Logistics</H2>
          <Lead>
            Sessions are intentionally small to allow real conversation. Here is what to expect
            in terms of format, duration, and follow-up.
          </Lead>
          <div className="grid gap-4 sm:grid-cols-2 mt-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Format</h3>
              <p className="text-sm text-gray-600 mt-1">
                Live, facilitated, small-group. Most sessions run as a single 90-minute block with
                short Q&amp;A breaks; some run as two 45-minute virtual sessions. The format for
                each session is announced during registration.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Platform</h3>
              <p className="text-sm text-gray-600 mt-1">
                Virtual sessions use a standard videoconferencing platform; in-person sessions are
                hosted at the venue listed on the registration page. Recording is generally not
                available — attend live to participate.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Materials</h3>
              <p className="text-sm text-gray-600 mt-1">
                Each attendee receives a printable planning worksheet and a resource sheet linking
                to every official VA and DoD source referenced in the workshop.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Follow-up</h3>
              <p className="text-sm text-gray-600 mt-1">
                Attendees can request an optional 30-minute follow-up with a UCSG education
                advisor — no commitment, no enrollment pressure. The follow-up is also free.
              </p>
            </div>
          </div>
          <Callout>
            <p className="text-sm text-[#061846]">
              UCSG is not affiliated with the VA. The workshop references official VA resources for
              eligibility and benefit verification. The VA determines all benefit eligibility and
              payment decisions.
            </p>
          </Callout>
        </Section>

        <Section>
          <H2 id="past-topics">Past Workshop Topics</H2>
          <Lead>
            Previous sessions have covered themes such as:
          </Lead>
          <ul className="ml-6 space-y-3 list-disc text-gray-700 mt-2">
            <li>&quot;From service to a bachelor&apos;s degree completion program&quot;</li>
            <li>&quot;Online vs. on-campus: matching format to your life&quot;</li>
            <li>&quot;VR&amp;E and the Post-9/11 GI Bill®: understanding your options&quot;</li>
            <li>&quot;How to read a school&apos;s transfer-credit policy before applying&quot;</li>
            <li>&quot;Yellow Ribbon: what it does and does not cover&quot;</li>
            <li>&quot;Graduate school for veterans: MBA, specialized master&apos;s, and doctoral planning&quot;</li>
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            Workshop content is reviewed periodically. Topics and emphasis may vary by session.
          </p>
        </Section>

        <Section>
          <H2 id="faq">Frequently Asked Questions</H2>
          <Faq
            items={[
              {
                q: 'Is the workshop free?',
                a: (
                  <span>
                    UCSG&apos;s veteran education workshops are offered at no charge. No
                    enrollment commitment is required to attend. If a particular session has a
                    materials fee, it will be disclosed in advance during registration.
                  </span>
                ),
              },
              {
                q: 'Will there be a VA representative present?',
                a: (
                  <span>
                    UCSG is not affiliated with the VA. The workshop references official VA
                    information and links to va.gov for eligibility and benefit verification —
                    but a VA representative is not in attendance. For official eligibility
                    determinations, contact the VA directly at 1-888-442-4551.
                  </span>
                ),
              },
              {
                q: 'When is the next workshop?',
                a: (
                  <span>
                    Upcoming workshop dates will be announced on this page. Use the
                    &quot;Notify Me About Future Workshops&quot; button at the top of the page to be
                    notified when the next session is scheduled.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="register">Notify Me About Future Workshops</H2>
          <Lead>
            Complete the free veteran degree assessment to request a seat at an upcoming session.
            Workshop dates will be announced when confirmed. We&apos;ll notify you when
            registration opens.
          </Lead>
          <button
            className="mt-4 inline-flex items-center gap-2 bg-[#0874F9] hover:bg-[#0660D4] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            onClick={() => window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'veterans', id: 'assessment' } }))}
          >
            NOTIFY ME ABOUT FUTURE WORKSHOPS
          </button>
          <p className="mt-4 text-sm text-gray-500 leading-relaxed">
            We do not confirm specific dates, group sizes, presenters, or agendas in advance.
            Details for each session are shared with registered attendees once the session is
            finalized.
          </p>
        </Section>
      </Body>
    ),
    ctaText: 'NOTIFY ME ABOUT WORKSHOPS',
    ctaHref: 'assessment',
  },

  /* ============================================================= */
  /* 11. FAQ                                                         */
  /* ============================================================= */
  'faq': {
    heroImage: FUTURE_IMG,
    eyebrow: 'FAQ',
    headline: 'Veteran Education FAQ',
    subheadline:
      'Answers to common questions about veteran education planning, VA benefits, transfer credit, school selection, and cost — organized by category.',
    children: (
      <Body>
        <Section>
          <p className="text-gray-700 leading-relaxed">
            This <strong>veteran education FAQ</strong> answers the questions UCSG advisors hear
            most often — organized by category so you can find what you need quickly. Use the
            internal links inside each answer to jump to the full guide on that topic. For official
            eligibility, benefit amounts, and program details, always verify at va.gov/education.
          </p>
          <Callout>
            <p className="text-sm text-[#061846]">
              UCSG is an independent education consulting organization. We are not affiliated with,
              endorsed by, or sponsored by the U.S. Department of Veterans Affairs, the Department
              of Defense, or any branch of the U.S. Armed Forces. The VA determines all benefit
              eligibility and payment decisions.
            </p>
          </Callout>
        </Section>

        <Section>
          <H2 id="benefits">Benefits</H2>
          <Faq
            items={[
              {
                q: 'Does UCSG determine if I\'m eligible for VA education benefits?',
                a: (
                  <span>
                    No. VA education benefit eligibility is determined solely by the U.S.
                    Department of Veterans Affairs. UCSG helps you find the right official
                    information at va.gov/education and prepare the questions to ask the VA. See
                    our <InternalLink id="education-benefits">education benefits guide</InternalLink>.
                  </span>
                ),
              },
              {
                q: 'Can UCSG quote specific GI Bill® payment amounts?',
                a: (
                  <span>
                    No. VA payment rates vary by program, enrollment intensity, school type, and
                    ZIP code — and they change annually. Current rates are published at
                    va.gov/education. UCSG does not quote VA payment amounts; we point you to the
                    official source.
                  </span>
                ),
              },
              {
                q: 'What is the difference between VR&E and the Post-9/11 GI Bill®?',
                a: (
                  <span>
                    VR&amp;E (Chapter 31) is for veterans with service-connected disabilities who
                    need help preparing for or maintaining suitable employment. The Post-9/11 GI
                    Bill® (Chapter 33) is an education benefit for veterans with qualifying
                    post-9/11 service. The VA determines eligibility for each program. See our
                    full <InternalLink id="vre">VR&amp;E guide</InternalLink> for a side-by-side
                    comparison.
                  </span>
                ),
              },
              {
                q: 'Can I use my GI Bill® benefits for an online degree?',
                a: (
                  <span>
                    Yes — Post-9/11 GI Bill® benefits can generally be used at approved online
                    programs, with a different housing allowance structure than on-campus
                    enrollment. Confirm current rules and program-specific approval with the VA and
                    the institution&apos;s SCO before enrolling.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="transfer-credit">Transfer Credit</H2>
          <Faq
            items={[
              {
                q: 'Can UCSG guarantee that my military credits will transfer?',
                a: (
                  <span>
                    No. Each institution sets its own transfer-credit policy. UCSG helps you ask
                    the right questions, request your JST, and compare policies across schools —
                    but the final decision rests with the receiving institution. See our{' '}
                    <InternalLink id="military-transfer-credit">military transfer credit guide</InternalLink>.
                  </span>
                ),
              },
              {
                q: 'How do I request my Joint Services Transcript (JST)?',
                a: (
                  <span>
                    Visit the official DoD JST portal at{' '}
                    <a href="https://jst.doded.mil/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline">jst.doded.mil</a>{' '}
                    and use the &quot;Send Transcript&quot; function to designate the receiving
                    institution. Avoid third-party sites that charge fees.
                  </span>
                ),
              },
              {
                q: 'Do all schools accept ACE credit recommendations for military training?',
                a: (
                  <span>
                    No. The American Council on Education (ACE) publishes credit recommendations
                    for military training, but each institution decides whether to honor them.
                    Some schools accept ACE broadly; others review course-by-course or apply credit
                    only as electives. Always confirm in writing with the registrar&apos;s office.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="school-selection">School Selection</H2>
          <Faq
            items={[
              {
                q: 'What makes a school "veteran-friendly"?',
                a: (
                  <span>
                    Look for a named veteran services office, a published School Certifying
                    Official contact, a written transfer-credit policy that explicitly mentions JST
                    and ACE, Yellow Ribbon participation, and an active Student Veterans of America
                    (SVA) chapter. See our full{' '}
                    <InternalLink id="choosing-a-school">school selection guide</InternalLink>.
                  </span>
                ),
              },
              {
                q: 'Can UCSG recommend specific schools or programs?',
                a: (
                  <span>
                    No. UCSG does not endorse or recommend specific institutions or programs. We
                    provide the comparison framework, the questions to ask, and the official
                    sources to verify claims. Your selection should be based on your goals,
                    constraints, and verified data — not on UCSG referrals.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="cost">Cost</H2>
          <Faq
            items={[
              {
                q: 'Will UCSG quote specific tuition numbers?',
                a: (
                  <span>
                    No. Tuition rates change annually and vary by program, residency, and delivery
                    format. UCSG provides a cost breakdown template you can fill in with each
                    institution&apos;s official cost of attendance — see our{' '}
                    <InternalLink id="cost-planning">cost planning guide</InternalLink>.
                  </span>
                ),
              },
              {
                q: 'Is the lowest-tuition program always the best financial choice?',
                a: (
                  <span>
                    No. A lower-tuition program may have higher fees, longer time-to-completion, or
                    weaker transfer-credit acceptance that increases total cost. Compare total net
                    cost — including opportunity cost — not just per-credit rate.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="general">General</H2>
          <Faq
            items={[
              {
                q: 'Is UCSG affiliated with the VA or Department of Defense?',
                a: (
                  <span>
                    No. UCSG is an independent education consulting organization. We are not
                    affiliated with, endorsed by, or sponsored by the U.S. Department of Veterans
                    Affairs, the Department of Defense, or any branch of the U.S. Armed Forces.
                    Use of &quot;GI Bill®&quot; is a registered trademark of the U.S. Department of
                    Veterans Affairs; UCSG makes no claim of affiliation.
                  </span>
                ),
              },
              {
                q: 'Does UCSG charge for the veteran assessment?',
                a: (
                  <span>
                    The veteran degree assessment is free. No enrollment commitment is required.
                    <InternalLink id="assessment"> Start the assessment →</InternalLink>
                  </span>
                ),
              },
              {
                q: 'Should I bring my DD-214 to the assessment or workshop?',
                a: (
                  <span>
                    No. UCSG does not request, collect, or store DD-214 forms, SSN, VA claim
                    numbers, disability ratings, or medical/bank information. Submit your DD-214
                    only to the VA or to your chosen institution when applying for benefits.
                  </span>
                ),
              },
              {
                q: 'Where can I find official VA education benefit information?',
                a: (
                  <span>
                    Start at <a href="https://www.va.gov/education/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline">va.gov/education</a>{' '}
                    and the related pages linked in our{' '}
                    <InternalLink id="education-benefits">education benefits guide</InternalLink>.
                  </span>
                ),
              },
              {
                q: 'How is UCSG\'s veteran degree planning different from a college advisor?',
                a: (
                  <span>
                    A college advisor works for one institution and recommends that
                    institution&apos;s programs. UCSG is independent — we help you compare across
                    institutions and choose based on fit, not on enrollment quotas. See our{' '}
                    <InternalLink id="degree-planning">degree planning guide</InternalLink>.
                  </span>
                ),
              },
            ]}
          />
        </Section>
      </Body>
    ),
    ctaText: 'START MY ASSESSMENT',
    ctaHref: 'assessment',
  },

  /* ============================================================= */
  /* BOOK-CONSULTATION (auto-opens calendar via BookConsultationView) */
  /* ============================================================= */
  'book-consultation': {
    heroImage: CAMPUS_IMG,
    eyebrow: 'BOOK A VETERAN EDUCATION CONSULTATION',
    headline: 'Talk With Joy About Your Education Goals',
    subheadline:
      'Schedule a free consultation with Joy Chowdhury, U.S. Army Veteran and founder of UCSG. Discuss your degree goals, education background, and next steps.',
    children: (
      <Body>
        {/* Booking calendar */}
        <Section>
          <div className="rounded-2xl bg-gradient-to-b from-[#071B35] to-[#0B2545] p-6 sm:p-8 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <div className="h-px w-6 bg-[#D6A84B]/60" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D6A84B]">
                SCHEDULE A FREE CONSULTATION
              </span>
              <div className="h-px w-6 bg-[#D6A84B]/60" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-white">
              Book Your Veteran Education Consultation
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/70 leading-relaxed">
              Joy Chowdhury, U.S. Army Veteran and founder of UCSG, will review your degree goals,
              education background, and next steps. Free, no enrollment commitment.
            </p>
            <button
              type="button"
              onClick={() => {
                track.ctaClick({
                  cta_type: 'calendar_open',
                  cta_source: 'book_consultation_hero',
                  cta_text: 'OPEN BOOKING CALENDAR',
                });
                window.dispatchEvent(
                  new CustomEvent('ucsg-navigate', { detail: { view: 'contact' } }),
                );
              }}
              className="group mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#39C5E8] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#39C5E8]/25 transition-all duration-300 hover:bg-[#2BAFD0] hover:shadow-xl hover:shadow-[#39C5E8]/35"
              aria-label="Open the booking calendar"
            >
              OPEN BOOKING CALENDAR
            </button>
            <p className="mt-3 text-xs text-white/50">
              All times shown in your local timezone. Opening the calendar does not confirm an
              appointment — you select a slot and confirm it inside the booking tool.
            </p>
          </div>
        </Section>

        {/* Preparation panel */}
        <Section>
          <h2 className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            How to Prepare for Your Consultation
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            A few minutes of preparation helps Joy give you the most useful guidance. Bring what
            you have — don&apos;t worry about what you don&apos;t.
          </p>
          <ul className="space-y-2 mt-4">
            {[
              'Write down your one-sentence degree goal: "I want to earn a [degree] in [field] so I can work as [role]"',
              'List your prior college coursework, military training, and any CLEP/DSST exams already passed',
              'Have your Joint Services Transcript (JST) on hand if you have one — request it at jst.doded.mil',
              'Note your GI Bill® chapter (e.g., Post-9/11, MGIB) if known — UCSG does not determine eligibility',
              'Bring 2–3 questions you most want answered (cost, format, transfer credit, timeline)',
            ].map((item) => (
              <li key={item} className="flex gap-2 text-gray-700">
                <span className="text-[#39C5E8] font-bold shrink-0" aria-hidden="true">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Consultation topics */}
        <Section>
          <h2 className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            What We Can Discuss
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Topics Joy can help you think through during your free consultation.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 mt-4">
            {[
              'Your short-term and long-term career goals',
              'How military experience and prior coursework might count toward a degree',
              'Online, hybrid, and on-campus format trade-offs',
              'How to think about total program cost — not just per-credit tuition',
              'Questions to ask a School Certifying Official (SCO)',
              'How to compare accredited programs side-by-side',
            ].map((topic) => (
              <li
                key={topic}
                className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-gray-700"
              >
                <span className="text-[#39C5E8] font-bold mr-2" aria-hidden="true">
                  ›
                </span>
                {topic}
              </li>
            ))}
          </ul>
        </Section>

        {/* Timezone + compliance callout */}
        <Section>
          <div className="rounded-lg border-l-4 border-[#39C5E8] bg-[#EDF5FF] p-4 sm:p-5">
            <p className="text-sm text-[#071B35]">
              All times shown in your local timezone. UCSG is an independent education consulting
              organization and is not affiliated with the VA. The VA determines all benefit
              eligibility, entitlement, and payment decisions. Opening the calendar does not
              confirm an appointment — you select and confirm your slot inside the booking tool.
            </p>
          </div>
        </Section>

        {/* Direct contact fallback */}
        <Section>
          <h2 className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Prefer to Reach Out Directly?
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            If the calendar doesn&apos;t load, contact Joy directly using any of these methods:
          </p>
          <div className="grid gap-3 sm:grid-cols-3 mt-4">
            <a
              href="tel:+19175654788"
              className="rounded-lg border border-slate-200 bg-white p-4 hover:border-[#39C5E8] transition-colors"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[#D6A84B]">
                Call/Text
              </p>
              <p className="mt-1 text-sm font-medium text-[#071B35]">917-565-4788</p>
            </a>
            <a
              href="https://wa.me/13478376354"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-200 bg-white p-4 hover:border-[#39C5E8] transition-colors"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[#D6A84B]">
                WhatsApp
              </p>
              <p className="mt-1 text-sm font-medium text-[#071B35]">Chat with us</p>
            </a>
            <a
              href="mailto:info@universalconsultingservices.com"
              className="rounded-lg border border-slate-200 bg-white p-4 hover:border-[#39C5E8] transition-colors"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[#D6A84B]">Email</p>
              <p className="mt-1 text-sm font-medium text-[#071B35] break-all">
                info@universalconsultingservices.com
              </p>
            </a>
          </div>
        </Section>

        {/* FAQ */}
        <Section>
          <h2 className="font-heading text-2xl font-bold text-[#071B35] mt-2 scroll-mt-24">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 mt-4">
            <details className="group rounded-lg border border-slate-200 bg-white p-4 open:bg-[#F8FBFF]">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Is the consultation free?</span>
                <span
                  className="text-[#39C5E8] font-bold text-lg leading-none"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="mt-3 text-sm text-gray-600 leading-relaxed">
                Yes. The veteran education consultation is free, with no enrollment commitment. Joy
                will review your goals and offer guidance — the next move is always yours.
              </div>
            </details>
            <details className="group rounded-lg border border-slate-200 bg-white p-4 open:bg-[#F8FBFF]">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Do I need my DD-214 or SSN to talk with Joy?</span>
                <span
                  className="text-[#39C5E8] font-bold text-lg leading-none"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="mt-3 text-sm text-gray-600 leading-relaxed">
                No. UCSG does not request, collect, or store DD-214 forms, SSNs, VA claim numbers,
                disability ratings, or medical information. You submit those directly to the VA or
                your chosen institution. Joy will only ask about your degree goals, prior
                coursework, and preferred format.
              </div>
            </details>
            <details className="group rounded-lg border border-slate-200 bg-white p-4 open:bg-[#F8FBFF]">
              <summary className="cursor-pointer list-none font-heading font-semibold text-[#071B35] flex items-start justify-between gap-3">
                <span>Can Joy tell me if I qualify for GI Bill® benefits?</span>
                <span
                  className="text-[#39C5E8] font-bold text-lg leading-none"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="mt-3 text-sm text-gray-600 leading-relaxed">
                No. UCSG is independent and not affiliated with the VA. The VA determines all
                benefit eligibility and payment decisions. Joy can help you find official
                information at va.gov/education and prepare questions to ask your School Certifying
                Official — but the VA is the final authority on benefits.
              </div>
            </details>
          </div>
        </Section>
      </Body>
    ),
    ctaText: 'TAKE THE ASSESSMENT FIRST',
    ctaHref: 'assessment',
  },
};

/* ------------------------------------------------------------------ */
/*  BookConsultationView — auto-opens contact calendar               */
/* ------------------------------------------------------------------ */
function BookConsultationView({ content }: { content: (typeof INFO_PAGE_CONTENT)[string] }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'contact' } }));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <VeteranInfoPage
      eyebrow={content.eyebrow}
      headline={content.headline}
      subheadline={content.subheadline}
      ctaText={content.ctaText}
      ctaHref={content.ctaHref}
      heroImage={content.heroImage}
    >
      {content.children}
    </VeteranInfoPage>
  );
}

/* ------------------------------------------------------------------ */
/*  VeteranSlugView — entry point                                    */
/* ------------------------------------------------------------------ */
export default function VeteranSlugView({ slug }: { slug: string }) {
  // Degree path pages have dedicated components
  if (slug === 'bachelors-degree') return <VeteranBachelorsPage />;
  if (slug === 'masters-mba') return <VeteranMastersPage />;
  if (slug === 'online-hybrid-degrees') return <VeteranOnlineHybridPage />;
  if (slug === 'assessment') return <VeteranAssessmentForm />;

  // All other pages use the shared VeteranInfoPage layout
  const content = INFO_PAGE_CONTENT[slug];
  if (!content) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-heading font-bold text-[#061846]">Page Not Found</h1>
        <p className="mt-4 text-gray-600">This veteran education page does not exist.</p>
      </div>
    );
  }

  // book-consultation auto-opens the booking calendar
  if (slug === 'book-consultation') {
    return <BookConsultationView content={content} />;
  }

  return (
    <VeteranInfoPage
      eyebrow={content.eyebrow}
      headline={content.headline}
      subheadline={content.subheadline}
      ctaText={content.ctaText}
      ctaHref={content.ctaHref}
      heroImage={content.heroImage}
    >
      {content.children}
    </VeteranInfoPage>
  );
}
