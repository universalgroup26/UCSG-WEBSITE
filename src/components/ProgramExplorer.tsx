'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  MapPin,
  Monitor,
  CalendarDays,
  ShieldCheck,
  DollarSign,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Filter,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { track } from '@/lib/analytics';
import { universities, type UniversityData, type Program } from '@/lib/data/universities';

// ─── Flat program item referencing its parent university ────────────────

interface FlatProgram {
  program: Program;
  university: UniversityData;
  field: string;
  format: string;
  intakeSeasons: string[];
}

// ─── Helpers to derive filter values from data ───────────────────────────

/** Extract a normalized field-of-study label from a program name. */
function extractField(programName: string): string {
  const lower = programName.toLowerCase();
  const mapping: [string, string][] = [
    ['computer science', 'Computer Science'],
    ['information systems', 'Information Systems'],
    ['information technology', 'Information Technology'],
    ['engineering management', 'Engineering Management'],
    ['cybersecurity', 'Cybersecurity'],
    ['data science', 'Data Science'],
    ['data analytics', 'Data Analytics'],
    ['business analytics', 'Business Analytics'],
    ['health services administration', 'Health Services Administration'],
    ['healthcare administration', 'Healthcare Administration'],
    ['business administration', 'Business Administration'],
    ['technology management', 'Business Administration'],
    ['software engineering', 'Software Engineering'],
    ['nursing', 'Nursing'],
    ['accounting', 'Accounting'],
    ['project management', 'Project Management'],
    ['intensive english', 'English Language'],
    ['business english', 'English Language'],
    ['toefl preparation', 'English Language'],
    ['university pathway', 'Pathway Programs'],
    ['it training', 'Information Technology'],
  ];
  for (const [keyword, field] of mapping) {
    if (lower.includes(keyword)) return field;
  }
  return 'Other';
}

/** Derive primary delivery format from university flags. */
function deriveFormat(u: UniversityData): string {
  if (u.hybridOption && u.onlinePrograms) return 'Hybrid';
  if (u.onlinePrograms) return 'Online';
  return 'Campus';
}

/** Map semester start text to intake season labels. */
function deriveIntakeSeasons(semesterStarts: string): string[] {
  const lower = semesterStarts.toLowerCase();
  const seasons: string[] = [];
  if (lower.includes('rolling') || lower.includes('every monday')) {
    seasons.push('Rolling');
    return seasons;
  }
  if (/august|september|october/.test(lower)) seasons.push('Fall');
  if (/january|february|march|april/.test(lower)) seasons.push('Spring');
  if (/may|june|july/.test(lower)) seasons.push('Summer');
  return seasons;
}

/** Flatten all universities into a searchable program list. */
function buildFlatPrograms(): FlatProgram[] {
  const list: FlatProgram[] = [];
  for (const u of universities) {
    for (const p of u.programs) {
      list.push({
        program: p,
        university: u,
        field: extractField(p.name),
        format: deriveFormat(u),
        intakeSeasons: deriveIntakeSeasons(u.semesterStarts),
      });
    }
  }
  return list;
}

const allFlatPrograms = buildFlatPrograms();

// ─── Derive unique filter option sets ────────────────────────────────────

const ALL_LEVELS = ['Master\'s', 'PhD', 'DBA', 'Bachelor\'s', 'Associate'];
const allFields = [...new Set(allFlatPrograms.map((fp) => fp.field))].sort();
const allStates = [...new Set(universities.map((u) => u.state))].sort();
const ALL_FORMATS = ['Hybrid', 'Online', 'Campus'];
const ALL_INTAKES = ['Fall', 'Spring', 'Summer', 'Rolling'];

// ─── Filter state ────────────────────────────────────────────────────────

interface Filters {
  level: string;
  field: string;
  state: string;
  format: string;
  intake: string;
}

const ALL_SENTINEL = '__all__';

const defaultFilters: Filters = {
  level: '',
  field: '',
  state: '',
  format: '',
  intake: '',
};

// ─── Animation variants ──────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

// ─── Component ───────────────────────────────────────────────────────────

export default function ProgramExplorer() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Track filter usage when any filter changes
  const updateFilter = useCallback(
    (key: keyof Filters, value: string) => {
      // Sentinel value means "all" — clear the filter
      const resolved = value === ALL_SENTINEL ? '' : value;
      setFilters((prev) => {
        const next = { ...prev, [key]: resolved };
        // Build active filters object for tracking
        const active: Record<string, string> = {};
        if (next.level) active.level = next.level;
        if (next.field) active.field = next.field;
        if (next.state) active.state = next.state;
        if (next.format) active.format = next.format;
        if (next.intake) active.intake = next.intake;
        if (Object.keys(active).length > 0) {
          track.customEvent('program_filter_used', { filters: active });
        }
        return next;
      });
    },
    [],
  );

  // Normalize level filter value to match program.level in data
  const normalizedLevel = useMemo(() => {
    switch (filters.level) {
      case "Master's":
        return 'Master';
      case 'PhD':
        return 'PhD';
      case 'DBA':
        return 'DBA';
      case "Bachelor's":
        return 'Bachelor';
      case 'Associate':
        return 'Associate';
      default:
        return '';
    }
  }, [filters.level]);

  // Filter programs
  const filtered = useMemo(() => {
    return allFlatPrograms.filter((fp) => {
      if (normalizedLevel && fp.program.level !== normalizedLevel) return false;
      if (filters.field && fp.field !== filters.field) return false;
      if (filters.state && fp.university.state !== filters.state) return false;
      if (filters.format && fp.format !== filters.format) return false;
      if (filters.intake && !fp.intakeSeasons.includes(filters.intake)) return false;
      return true;
    });
  }, [filters, normalizedLevel]);

  const activeCount = Object.values(filters).filter(Boolean).length;

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleRequestDetails = useCallback(
    (fp: FlatProgram) => {
      track.ctaClick({
        cta_type: 'program_details_requested',
        cta_source: 'program_explorer',
        cta_text: `Request Details — ${fp.program.name} at ${fp.university.shortName}`,
      });
      window.dispatchEvent(
        new CustomEvent('ucsg-navigate', {
          detail: { view: 'university', id: fp.university.id },
        }),
      );
    },
    [],
  );

  // Section view tracking
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            track.sectionView('program_explorer');
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ─── Filter controls JSX (shared between desktop and mobile) ──────────

  const filterControls = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {/* Degree Level */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          <GraduationCap className="size-3" aria-hidden="true" />
          Degree Level
        </label>
        <Select
          value={filters.level || ALL_SENTINEL}
          onValueChange={(v) => updateFilter('level', v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_SENTINEL}>All Levels</SelectItem>
            {ALL_LEVELS.map((l) => (
              <SelectItem key={l} value={l}>
                {l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Field of Study */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          <BookOpenIcon className="size-3" aria-hidden="true" />
          Field of Study
        </label>
        <Select
          value={filters.field || ALL_SENTINEL}
          onValueChange={(v) => updateFilter('field', v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Fields" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_SENTINEL}>All Fields</SelectItem>
            {allFields.map((f) => (
              <SelectItem key={f} value={f}>
                {f}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* State / Region */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          <MapPin className="size-3" aria-hidden="true" />
          State / Region
        </label>
        <Select
          value={filters.state || ALL_SENTINEL}
          onValueChange={(v) => updateFilter('state', v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All States" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_SENTINEL}>All States</SelectItem>
            {allStates.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Format */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          <Monitor className="size-3" aria-hidden="true" />
          Format
        </label>
        <Select
          value={filters.format || ALL_SENTINEL}
          onValueChange={(v) => updateFilter('format', v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Formats" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_SENTINEL}>All Formats</SelectItem>
            {ALL_FORMATS.map((f) => (
              <SelectItem key={f} value={f}>
                {f}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Intake */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          <CalendarDays className="size-3" aria-hidden="true" />
          Intake
        </label>
        <Select
          value={filters.intake || ALL_SENTINEL}
          onValueChange={(v) => updateFilter('intake', v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Intakes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_SENTINEL}>All Intakes</SelectItem>
            {ALL_INTAKES.map((i) => (
              <SelectItem key={i} value={i}>
                {i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Program Explorer"
      className="bg-white py-16 md:py-20"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ──────────────────────────────────────────── */}
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#0874F9] mb-3">
            Program Explorer
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#061846] mb-3">
            Compare Verified Programs
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed">
            Filter and compare programs using verified information. CPT eligibility and
            authorization vary by student, program, curriculum, employer and DSO approval.
          </p>
        </motion.div>

        {/* ── Filters (collapsible on mobile, always visible on desktop) ── */}
        <div className="mb-8">
          {/* Mobile collapsible trigger */}
          <div className="lg:hidden mb-4">
            <Collapsible open={mobileOpen} onOpenChange={setMobileOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between border-[#092B68]/20 hover:bg-[#EDF5FF] hover:border-[#0874F9]/40"
                >
                  <span className="flex items-center gap-2">
                    <Filter className="size-4 text-[#0874F9]" aria-hidden="true" />
                    <span className="font-medium text-[#061846]">
                      Filters
                      {activeCount > 0 && (
                        <Badge className="ml-2 bg-[#0874F9] text-white border-0">
                          {activeCount}
                        </Badge>
                      )}
                    </span>
                  </span>
                  {mobileOpen ? (
                    <ChevronUp className="size-4" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="size-4" aria-hidden="true" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <div className="rounded-lg border border-[#092B68]/10 bg-[#EDF5FF]/50 p-4">
                  {filterControls}
                  {activeCount > 0 && (
                    <div className="mt-3 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-muted-foreground hover:text-[#061846]"
                      >
                        <X className="size-3.5 mr-1" aria-hidden="true" />
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Desktop: always visible filter panel */}
          <div className="hidden lg:block rounded-lg border border-[#092B68]/10 bg-[#EDF5FF]/50 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Filter className="size-4 text-[#0874F9]" aria-hidden="true" />
                <span className="text-sm font-medium text-[#061846]">
                  Filter Programs
                </span>
                {activeCount > 0 && (
                  <Badge className="bg-[#0874F9] text-white border-0">
                    {activeCount}
                  </Badge>
                )}
              </div>
              {activeCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-[#061846]"
                >
                  <X className="size-3.5 mr-1" aria-hidden="true" />
                  Clear Filters
                </Button>
              )}
            </div>
            {filterControls}
          </div>
        </div>

        {/* ── Results count ───────────────────────────────────────────── */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing{' '}
            <span className="font-semibold text-[#061846]">{filtered.length}</span>{' '}
            program{filtered.length !== 1 ? 's' : ''}
            {activeCount > 0 && ' matching your filters'}
          </p>
        </div>

        {/* ── Program Cards Grid ──────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.4 }}
          >
            <div className="mx-auto w-16 h-16 rounded-full bg-[#EDF5FF] flex items-center justify-center mb-4">
              <GraduationCap className="size-8 text-[#0874F9]" aria-hidden="true" />
            </div>
            <p className="text-base font-medium text-[#061846] mb-1">
              No programs match your filters
            </p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your criteria.
            </p>
            <Button
              variant="outline"
              className="mt-4 border-[#0874F9]/30 text-[#0874F9] hover:bg-[#EDF5FF]"
              onClick={clearFilters}
            >
              Clear All Filters
            </Button>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={stagger}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((fp) => (
                <ProgramCard
                  key={`${fp.university.id}-${fp.program.name}`}
                  fp={fp}
                  onRequestDetails={handleRequestDetails}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── Disclaimer ──────────────────────────────────────────────── */}
        <div className="mt-10 text-center">
          <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            CPT eligibility and authorization vary by student, program, curriculum,
            employer and DSO approval. Program details are sourced from publicly
            available university data and may change. Always verify directly with the
            institution.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Program Card Sub-component ──────────────────────────────────────────

function ProgramCard({
  fp,
  onRequestDetails,
}: {
  fp: FlatProgram;
  onRequestDetails: (fp: FlatProgram) => void;
}) {
  const { program, university, field, format, intakeSeasons } = fp;

  return (
    <motion.article
      className="group relative flex flex-col rounded-lg border border-[#092B68]/10 bg-white p-5 transition-all duration-200 hover:shadow-lg hover:shadow-[#061846]/5 hover:border-[#0874F9]/30"
      variants={fadeUp}
      transition={{ duration: 0.35 }}
      layout
    >
      {/* University header: logo + name + location */}
      <div className="flex items-start gap-3 mb-4">
        <div className="relative size-10 rounded-md overflow-hidden flex-shrink-0 border border-[#092B68]/10 bg-[#EDF5FF]">
          <Image
            src={university.logoPath}
            alt={`${university.shortName} logo`}
            fill
            className="object-contain p-1"
            sizes="40px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#061846] truncate">
            {university.shortName}
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            <MapPin className="size-3 flex-shrink-0" aria-hidden="true" />
            {university.location}
          </p>
        </div>
      </div>

      {/* Program name */}
      <h3 className="text-sm font-semibold text-[#061846] leading-snug mb-3 min-h-[2.5rem]">
        {program.name}
      </h3>

      {/* Metadata badges */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <Badge
          variant="secondary"
          className="bg-[#EDF5FF] text-[#061846] border-0 text-xs font-medium"
        >
          {program.level === 'Master'
            ? "Master's"
            : program.level === 'Associate'
              ? 'Associate'
              : program.level}
        </Badge>
        {program.stem && (
          <Badge className="bg-[#061846] text-white border-0 text-xs font-medium">
            STEM
          </Badge>
        )}
        <Badge
          variant="outline"
          className="border-[#092B68]/15 text-[#092B68] text-xs font-normal"
        >
          <Monitor className="size-3 mr-1" aria-hidden="true" />
          {format}
        </Badge>
      </div>

      {/* Details grid */}
      <div className="space-y-2 mb-4 flex-1">
        {/* Estimated Cost */}
        {university.tuitionRange && (
          <div className="flex items-center gap-2 text-sm">
            <DollarSign
              className="size-3.5 text-muted-foreground flex-shrink-0"
              aria-hidden="true"
            />
            <span className="text-muted-foreground">Est.</span>
            <span className="text-[#061846] font-medium">
              {university.tuitionRange}
            </span>
          </div>
        )}

        {/* Intake */}
        <div className="flex items-center gap-2 text-sm">
          <CalendarDays
            className="size-3.5 text-muted-foreground flex-shrink-0"
            aria-hidden="true"
          />
          <span className="text-muted-foreground">
            {intakeSeasons.length > 0 ? intakeSeasons.join(', ') : 'Contact university'}
          </span>
        </div>

        {/* Duration */}
        {program.duration && (
          <div className="flex items-center gap-2 text-sm">
            <ClockIcon
              className="size-3.5 text-muted-foreground flex-shrink-0"
              aria-hidden="true"
            />
            <span className="text-muted-foreground">{program.duration}</span>
          </div>
        )}

        {/* Accreditation */}
        {university.accreditation && (
          <div className="flex items-start gap-2 text-sm">
            <ShieldCheck
              className="size-3.5 text-muted-foreground flex-shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span className="text-muted-foreground leading-snug">
              {university.accreditation}
            </span>
          </div>
        )}
      </div>

      {/* CTA */}
      <Button
        onClick={() => onRequestDetails(fp)}
        className="w-full bg-[#0874F9] hover:bg-[#061846] text-white font-medium transition-colors"
      >
        Request Details
        <ArrowRight className="size-4 ml-1.5" aria-hidden="true" />
      </Button>
    </motion.article>
  );
}

// ─── Tiny inline icon components to avoid extra imports ──────────────────

function BookOpenIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
