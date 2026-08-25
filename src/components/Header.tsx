'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  X,
  Menu,
  ChevronRight,
  MessageCircle,
  ArrowRight,
  BookOpen,
  GraduationCap,
} from 'lucide-react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import Logo from '@/components/Logo';
import { track } from '@/lib/analytics';
import {
  universities,
  type UniversityData,
} from '@/lib/data/universities';

/* ===== TYPES ========================================================== */

interface Props {
  onNavigate?: (view: string, id?: string) => void;
}

type MegaMenuId = 'universities' | 'resources' | null;

interface ProgramLink {
  label: string;
}

interface ResourceMenuItem {
  label: string;
  resourceId: string;
}

/* ===== CONSTANTS ====================================================== */

const FACEBOOK_URL =
  'https://www.facebook.com/universalconsultingservicesgroup';
const WHATSAPP_URL = 'https://wa.me/13028935594';

const UNIVERSITY_COLUMN_1_IDS: string[] = [
  'trine',
  'monroe',
  'saint-francis',
  'curry',
  'westcliff',
  'international-american-university',
  'touro',
  'uca',
];

const UNIVERSITY_COLUMN_2_IDS: string[] = [
  'tacoma-community',
  'computer-system-institutes',
  'dream-it',
  'ny-language-center',
  'ny-general-consulting',
  'seattle-colleges',
  'bluedata-esl',
  'windsor-school',
];

const PROGRAM_LINKS: ProgramLink[] = [
  { label: "Master's Programs" },
  { label: 'STEM Programs' },
  { label: 'PhD and Doctoral Programs' },
  { label: 'DBA Programs' },
  { label: 'Hybrid Programs' },
  { label: 'Programs by State' },
  { label: 'Programs by Intake' },
  { label: 'Compare All 45 Programs' },
];

const RESOURCE_COLUMN_1: ResourceMenuItem[] = [
  { label: 'University Transfer Checklist', resourceId: 'university-transfers' },
  {
    label: 'Maintaining F-1 Status During a Transfer',
    resourceId: 'university-transfers',
  },
  { label: 'Questions to Ask Your DSO', resourceId: 'university-transfers' },
];

const RESOURCE_COLUMN_2: ResourceMenuItem[] = [
  { label: 'CPT vs. OPT: Key Differences', resourceId: 'day1-cpt' },
  { label: 'OPT/STEM OPT Planning Checklist', resourceId: 'stem-opt' },
  { label: 'CPT Educational Resources', resourceId: 'day1-cpt' },
];

const RESOURCE_COLUMN_3: ResourceMenuItem[] = [
  { label: 'How to Compare Total Program Cost', resourceId: 'change-of-status' },
  { label: 'Scholarship and Funding Resources', resourceId: 'change-of-status' },
  { label: 'Graduate Program Comparison', resourceId: 'sevis-reinstatement' },
  { label: 'Frequently Asked Questions', resourceId: 'stem-opt' },
];

function getUnisByIds(ids: string[]): UniversityData[] {
  return ids
    .map((id) => universities.find((u) => u.id === id))
    .filter((u): u is UniversityData => u !== undefined);
}

const column1Unis = getUnisByIds(UNIVERSITY_COLUMN_1_IDS);
const column2Unis = getUnisByIds(UNIVERSITY_COLUMN_2_IDS);

/* ===== SUB-COMPONENTS ================================================ */

function UniRow({ uni }: { uni: UniversityData }) {
  return (
    <button
      onClick={() => {
        track.navClick({
          nav_type: 'header',
          nav_target: `university:${uni.id}`,
          nav_text: uni.name,
        });
        window.dispatchEvent(
          new CustomEvent('ucsg-navigate', {
            detail: { view: 'university', id: uni.id },
          })
        );
      }}
      className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-[#EDF5FF]"
    >
      <Image
        src={uni.logoPath}
        alt={`${uni.name} logo`}
        width={28}
        height={28}
        className="h-7 w-7 shrink-0 rounded object-contain"
      />
      <div className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-semibold text-[#0F172A] group-hover:text-[#0874F9]">
          {uni.name}
        </span>
        <span className="block truncate text-[11px] text-[#64748B]">
          {uni.location}
        </span>
      </div>
      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#94A3B8] opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  );
}

/* ===== MAIN COMPONENT ================================================ */

export default function Header({ onNavigate }: Props) {
  // State
  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaMenuId>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll tracking
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mega menu helpers
  const openMega = useCallback((id: MegaMenuId) => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setActiveMega(id);
  }, []);

  const closeMega = useCallback(() => {
    megaTimeoutRef.current = setTimeout(() => {
      setActiveMega(null);
    }, 150);
  }, []);

  const cancelMegaClose = useCallback(() => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
  }, []);

  // Close mega menus on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveMega(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Navigation handler
  const navigate = (
    view: string,
    id?: string,
    label?: string,
    navTarget?: string
  ) => {
    setActiveMega(null);
    setMobileOpen(false);
    track.navClick({
      nav_type: 'header',
      nav_target: navTarget || (id ? `${view}:${id}` : view),
      nav_text: label || view,
    });
    window.dispatchEvent(
      new CustomEvent('ucsg-navigate', {
        detail: { view, id },
      })
    );
    onNavigate?.(view, id);
  };

  // Assessment handler
  const openAssessment = (source: string) => {
    setActiveMega(null);
    setMobileOpen(false);
    track.ctaClick({
      cta_type: 'assessment_fab',
      cta_source: source,
      cta_text: 'Start Free Assessment',
    });
    window.dispatchEvent(
      new CustomEvent('ucsg-assessment', {
        detail: { open: 'assessment' },
      })
    );
  };

  // Mobile menu handler
  const toggleMobile = (open: boolean) => {
    setMobileOpen(open);
    track.mobileMenu(open ? 'open' : 'close');
  };

  // Social handler
  const handleSocial = (platform: string, url: string, name: string) => {
    track.socialClick(platform, name, url);
  };

  return (
    <header className="sticky top-0 z-50" role="banner">
      {/* Main Header */}
      <div
        className={
          'relative border-b transition-all duration-[250ms] ease-in-out ' +
          (scrolled
            ? 'h-[66px] border-gray-200/60 bg-white/[0.92] shadow-lg shadow-[#061846]/[0.06] backdrop-blur-xl'
            : 'h-[82px] border-gray-100 bg-white')
        }
      >
        <div className="mx-auto flex h-full max-w-[1240px] items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Logo size="lg" compact />

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label="Main navigation"
          >
            {/* Home */}
            <button
              onClick={() => navigate('home')}
              className="rounded-lg px-3.5 py-2 text-[13px] font-semibold text-[#0F172A] transition-colors hover:bg-[#EDF5FF] hover:text-[#0874F9]"
            >
              Home
            </button>

            {/* Universities mega menu trigger */}
            <div
              className="relative"
              onMouseEnter={() => openMega('universities')}
              onMouseLeave={closeMega}
            >
              <button
                onClick={() =>
                  setActiveMega((prev) =>
                    prev === 'universities' ? null : 'universities'
                  )
                }
                onFocus={() => openMega('universities')}
                aria-expanded={activeMega === 'universities'}
                aria-controls="mega-universities"
                className={
                  'flex items-center gap-1 rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-colors ' +
                  (activeMega === 'universities'
                    ? 'bg-[#EDF5FF] text-[#0874F9]'
                    : 'text-[#0F172A] hover:bg-[#EDF5FF] hover:text-[#0874F9]')
                }
              >
                Universities
                <ChevronRight className="h-3 w-3 rotate-90" />
              </button>

              {/* Universities Mega Menu Panel */}
              <div
                id="mega-universities"
                role="menu"
                aria-label="Universities menu"
                onMouseEnter={cancelMegaClose}
                onMouseLeave={closeMega}
                className={
                  'absolute left-1/2 top-full -translate-x-1/2 pt-2 transition-all duration-200 ' +
                  (activeMega === 'universities'
                    ? 'pointer-events-auto visible translate-y-0 opacity-100'
                    : 'pointer-events-none invisible -translate-y-2 opacity-0')
                }
              >
                <div className="w-[780px] rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xl shadow-[#061846]/[0.08]">
                  <div className="grid grid-cols-3 gap-6">
                    {/* Column 1 - Universities */}
                    <div>
                      <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                        Universities
                      </h3>
                      <div className="space-y-0.5">
                        {column1Unis.map((uni) => (
                          <UniRow key={uni.id} uni={uni} />
                        ))}
                      </div>
                    </div>

                    {/* Column 2 - Colleges, Language & Training */}
                    <div>
                      <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                        Colleges, Language {'&'} Training
                      </h3>
                      <div className="space-y-0.5">
                        {column2Unis.map((uni) => (
                          <UniRow key={uni.id} uni={uni} />
                        ))}
                      </div>
                    </div>

                    {/* Column 3 - Explore Programs */}
                    <div>
                      <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                        Explore Programs
                      </h3>
                      <div className="space-y-0.5">
                        {PROGRAM_LINKS.map((p) => (
                          <button
                            key={p.label}
                            onClick={() =>
                              navigate(
                                'home',
                                'programs',
                                p.label,
                                'home:programs'
                              )
                            }
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-[#334155] transition-colors hover:bg-[#EDF5FF] hover:text-[#0874F9]"
                          >
                            <ChevronRight className="h-3 w-3 shrink-0 text-[#94A3B8]" />
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom CTA */}
                  <div className="mt-5 flex items-center justify-between rounded-xl bg-[#EDF5FF] px-5 py-3.5">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#061846]">
                        Not Sure Which Program Fits?
                      </p>
                      <p className="mt-0.5 text-xs text-[#64748B]">
                        Get personalized guidance from our advisors.
                      </p>
                    </div>
                    <Button
                      onClick={() => openAssessment('mega_universities')}
                      size="sm"
                      className="ml-4 shrink-0 gap-2 rounded-lg bg-[#0874F9] px-5 text-[13px] font-bold text-white shadow-sm shadow-[#0874F9]/25 hover:bg-[#0657CC]"
                    >
                      Start Free Assessment
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* F-1 Resources mega menu trigger */}
            <div
              className="relative"
              onMouseEnter={() => openMega('resources')}
              onMouseLeave={closeMega}
            >
              <button
                onClick={() =>
                  setActiveMega((prev) =>
                    prev === 'resources' ? null : 'resources'
                  )
                }
                onFocus={() => openMega('resources')}
                aria-expanded={activeMega === 'resources'}
                aria-controls="mega-resources"
                className={
                  'flex items-center gap-1 rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-colors ' +
                  (activeMega === 'resources'
                    ? 'bg-[#EDF5FF] text-[#0874F9]'
                    : 'text-[#0F172A] hover:bg-[#EDF5FF] hover:text-[#0874F9]')
                }
              >
                F-1 Resources
                <ChevronRight className="h-3 w-3 rotate-90" />
              </button>

              {/* F-1 Resources Mega Menu Panel */}
              <div
                id="mega-resources"
                role="menu"
                aria-label="F-1 Resources menu"
                onMouseEnter={cancelMegaClose}
                onMouseLeave={closeMega}
                className={
                  'absolute left-1/2 top-full -translate-x-1/2 pt-2 transition-all duration-200 ' +
                  (activeMega === 'resources'
                    ? 'pointer-events-auto visible translate-y-0 opacity-100'
                    : 'pointer-events-none invisible -translate-y-2 opacity-0')
                }
              >
                <div className="w-[720px] rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xl shadow-[#061846]/[0.08]">
                  <div className="grid grid-cols-3 gap-6">
                    {/* Column 1 - Transfer Resources */}
                    <div>
                      <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                        Transfer Resources
                      </h3>
                      <div className="space-y-0.5">
                        {RESOURCE_COLUMN_1.map((item) => (
                          <button
                            key={item.label}
                            onClick={() =>
                              navigate(
                                'resource',
                                item.resourceId,
                                item.label,
                                `resource:${item.resourceId}`
                              )
                            }
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-[#334155] transition-colors hover:bg-[#EDF5FF] hover:text-[#0874F9]"
                          >
                            <ChevronRight className="h-3 w-3 shrink-0 text-[#94A3B8]" />
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Column 2 - CPT and OPT Education */}
                    <div>
                      <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                        CPT and OPT Education
                      </h3>
                      <div className="space-y-0.5">
                        {RESOURCE_COLUMN_2.map((item) => (
                          <button
                            key={item.label}
                            onClick={() =>
                              navigate(
                                'resource',
                                item.resourceId,
                                item.label,
                                `resource:${item.resourceId}`
                              )
                            }
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-[#334155] transition-colors hover:bg-[#EDF5FF] hover:text-[#0874F9]"
                          >
                            <ChevronRight className="h-3 w-3 shrink-0 text-[#94A3B8]" />
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Column 3 - Program and Cost Planning */}
                    <div>
                      <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                        Program and Cost Planning
                      </h3>
                      <div className="space-y-0.5">
                        {RESOURCE_COLUMN_3.map((item) => (
                          <button
                            key={item.label}
                            onClick={() =>
                              navigate(
                                'resource',
                                item.resourceId,
                                item.label,
                                `resource:${item.resourceId}`
                              )
                            }
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-[#334155] transition-colors hover:bg-[#EDF5FF] hover:text-[#0874F9]"
                          >
                            <ChevronRight className="h-3 w-3 shrink-0 text-[#94A3B8]" />
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Featured Card */}
                  <div className="mt-5 rounded-xl bg-gradient-to-r from-[#061846] to-[#0874F9] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="mb-1.5 flex items-center gap-2">
                          <BookOpen className="h-5 w-5 shrink-0 text-[#D6A84B]" />
                          <h4 className="text-sm font-bold text-white">
                            F-1 Student Resource Center
                          </h4>
                        </div>
                        <p className="text-xs leading-relaxed text-white/70">
                          Your comprehensive guide to maintaining F-1 status,
                          work authorizations, transfers, and program
                          planning - all in one place.
                        </p>
                      </div>
                      <Button
                        onClick={() => navigate('resource', 'day1-cpt', 'F-1 Student Resource Center', 'resource:day1-cpt')}
                        size="sm"
                        className="mt-1 shrink-0 gap-2 rounded-lg bg-white px-5 text-[13px] font-bold text-[#061846] shadow-sm hover:bg-[#EDF5FF]"
                      >
                        Explore
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transfer Support */}
            <button
              onClick={() => navigate('contact', undefined, 'Transfer Support', 'contact')}
              className="rounded-lg px-3.5 py-2 text-[13px] font-semibold text-[#0F172A] transition-colors hover:bg-[#EDF5FF] hover:text-[#0874F9]"
            >
              Transfer Support
            </button>

            {/* About */}
            <button
              onClick={() => navigate('home', 'about', 'About', 'home:about')}
              className="rounded-lg px-3.5 py-2 text-[13px] font-semibold text-[#0F172A] transition-colors hover:bg-[#EDF5FF] hover:text-[#0874F9]"
            >
              About
            </button>

            {/* Contact */}
            <button
              onClick={() => navigate('contact', undefined, 'Contact', 'contact')}
              className="rounded-lg px-3.5 py-2 text-[13px] font-semibold text-[#0F172A] transition-colors hover:bg-[#EDF5FF] hover:text-[#0874F9]"
            >
              Contact
            </button>

          </nav>

          {/* Mobile: WhatsApp + Menu trigger */}
          <div className="flex items-center gap-1 lg:hidden">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact us on WhatsApp"
              onClick={() =>
                track.ctaClick({
                  cta_type: 'whatsapp',
                  cta_source: 'header_mobile',
                  cta_text: 'WhatsApp icon',
                  cta_url: WHATSAPP_URL,
                })
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl text-[#25D366] transition-colors hover:bg-[#25D366]/10"
            >
              <MessageCircle className="h-5 w-5" fill="currentColor" />
            </a>

            <Sheet open={mobileOpen} onOpenChange={toggleMobile}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={
                    'h-10 w-10 rounded-xl transition-colors ' +
                    (mobileOpen
                      ? 'bg-[#061846] text-white'
                      : 'text-[#0F172A] hover:bg-[#EDF5FF] hover:text-[#061846]')
                  }
                  aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                >
                  {mobileOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </SheetTrigger>

              {/* Mobile Sheet Content */}
              <SheetContent
                side="right"
                className="w-[300px] overflow-y-auto p-0 sm:w-[340px]"
              >
                {/* Header area */}
                <div className="bg-[#061846] px-6 pb-6 pt-8">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-3 text-left">
                      <span className="font-heading text-2xl font-black tracking-tight text-white">
                        UCSG
                      </span>
                    </SheetTitle>
                  </SheetHeader>
                  <p className="mt-1 text-xs font-medium tracking-wide text-white/60">
                    Universal Consulting Service Group
                  </p>
                </div>

                {/* Nav links with accordions */}
                <nav
                  className="flex flex-col gap-0 p-4"
                  aria-label="Mobile navigation"
                >
                  {/* Home */}
                  <button
                    onClick={() => navigate('home', undefined, 'Home', 'home')}
                    className="min-h-[44px] rounded-lg px-4 py-3 text-left text-sm font-semibold text-[#334155] transition-colors hover:bg-[#EDF5FF] hover:text-[#0874F9]"
                  >
                    Home
                  </button>

                  {/* Universities Accordion */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="universities" className="border-b-0">
                      <AccordionTrigger className="min-h-[44px] py-3 text-sm font-semibold text-[#334155] hover:no-underline hover:text-[#0874F9]">
                        Universities
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 pb-2 pl-2">
                          {/* Sub-heading: Universities */}
                          <p className="px-3 pt-1 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                            Universities
                          </p>
                          {column1Unis.map((uni) => (
                            <button
                              key={uni.id}
                              onClick={() =>
                                navigate(
                                  'university',
                                  uni.id,
                                  uni.name,
                                  `university:${uni.id}`
                                )
                              }
                              className="flex min-h-[44px] w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-[#EDF5FF]"
                            >
                              <Image
                                src={uni.logoPath}
                                alt={`${uni.name} logo`}
                                width={24}
                                height={24}
                                className="h-6 w-6 shrink-0 rounded object-contain"
                              />
                              <div className="min-w-0 flex-1">
                                <span className="block truncate text-[13px] font-semibold text-[#0F172A]">
                                  {uni.name}
                                </span>
                                <span className="block truncate text-[11px] text-[#64748B]">
                                  {uni.location}
                                </span>
                              </div>
                            </button>
                          ))}

                          {/* Sub-heading: Colleges, Language & Training */}
                          <p className="px-3 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                            Colleges, Language {'&'} Training
                          </p>
                          {column2Unis.map((uni) => (
                            <button
                              key={uni.id}
                              onClick={() =>
                                navigate(
                                  'university',
                                  uni.id,
                                  uni.name,
                                  `university:${uni.id}`
                                )
                              }
                              className="flex min-h-[44px] w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-[#EDF5FF]"
                            >
                              <Image
                                src={uni.logoPath}
                                alt={`${uni.name} logo`}
                                width={24}
                                height={24}
                                className="h-6 w-6 shrink-0 rounded object-contain"
                              />
                              <div className="min-w-0 flex-1">
                                <span className="block truncate text-[13px] font-semibold text-[#0F172A]">
                                  {uni.name}
                                </span>
                                <span className="block truncate text-[11px] text-[#64748B]">
                                  {uni.location}
                                </span>
                              </div>
                            </button>
                          ))}

                          {/* Sub-heading: Explore Programs */}
                          <p className="px-3 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                            Explore Programs
                          </p>
                          {PROGRAM_LINKS.map((p) => (
                            <button
                              key={p.label}
                              onClick={() =>
                                navigate(
                                  'home',
                                  'programs',
                                  p.label,
                                  'home:programs'
                                )
                              }
                              className="flex min-h-[44px] w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-[#334155] transition-colors hover:bg-[#EDF5FF] hover:text-[#0874F9]"
                            >
                              <GraduationCap className="h-4 w-4 shrink-0 text-[#94A3B8]" />
                              {p.label}
                            </button>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* F-1 Resources Accordion */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="resources" className="border-b-0">
                      <AccordionTrigger className="min-h-[44px] py-3 text-sm font-semibold text-[#334155] hover:no-underline hover:text-[#0874F9]">
                        F-1 Resources
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 pb-2 pl-2">
                          {/* Sub-heading: Transfer Resources */}
                          <p className="px-3 pt-1 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                            Transfer Resources
                          </p>
                          {RESOURCE_COLUMN_1.map((item) => (
                            <button
                              key={item.label}
                              onClick={() =>
                                navigate(
                                  'resource',
                                  item.resourceId,
                                  item.label,
                                  `resource:${item.resourceId}`
                                )
                              }
                              className="flex min-h-[44px] w-full items-center rounded-lg px-3 py-2 text-left text-[13px] font-medium text-[#334155] transition-colors hover:bg-[#EDF5FF] hover:text-[#0874F9]"
                            >
                              {item.label}
                            </button>
                          ))}

                          {/* Sub-heading: CPT and OPT Education */}
                          <p className="px-3 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                            CPT and OPT Education
                          </p>
                          {RESOURCE_COLUMN_2.map((item) => (
                            <button
                              key={item.label}
                              onClick={() =>
                                navigate(
                                  'resource',
                                  item.resourceId,
                                  item.label,
                                  `resource:${item.resourceId}`
                                )
                              }
                              className="flex min-h-[44px] w-full items-center rounded-lg px-3 py-2 text-left text-[13px] font-medium text-[#334155] transition-colors hover:bg-[#EDF5FF] hover:text-[#0874F9]"
                            >
                              {item.label}
                            </button>
                          ))}

                          {/* Sub-heading: Program and Cost Planning */}
                          <p className="px-3 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                            Program and Cost Planning
                          </p>
                          {RESOURCE_COLUMN_3.map((item) => (
                            <button
                              key={item.label}
                              onClick={() =>
                                navigate(
                                  'resource',
                                  item.resourceId,
                                  item.label,
                                  `resource:${item.resourceId}`
                                )
                              }
                              className="flex min-h-[44px] w-full items-center rounded-lg px-3 py-2 text-left text-[13px] font-medium text-[#334155] transition-colors hover:bg-[#EDF5FF] hover:text-[#0874F9]"
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Transfer Support */}
                  <button
                    onClick={() => navigate('contact', undefined, 'Transfer Support', 'contact')}
                    className="min-h-[44px] rounded-lg px-4 py-3 text-left text-sm font-semibold text-[#334155] transition-colors hover:bg-[#EDF5FF] hover:text-[#0874F9]"
                  >
                    Transfer Support
                  </button>

                  {/* About */}
                  <button
                    onClick={() => navigate('home', 'about', 'About', 'home:about')}
                    className="min-h-[44px] rounded-lg px-4 py-3 text-left text-sm font-semibold text-[#334155] transition-colors hover:bg-[#EDF5FF] hover:text-[#0874F9]"
                  >
                    About
                  </button>

                  {/* Contact */}
                  <button
                    onClick={() => navigate('contact', undefined, 'Contact', 'contact')}
                    className="min-h-[44px] rounded-lg px-4 py-3 text-left text-sm font-semibold text-[#334155] transition-colors hover:bg-[#EDF5FF] hover:text-[#0874F9]"
                  >
                    Contact
                  </button>

                  {/* Divider */}
                  <div className="my-3 border-t border-gray-100" />

                  {/* Mobile CTA */}
                  <Button
                    onClick={() => openAssessment('mobile_menu')}
                    className="mx-2 h-12 gap-2 rounded-xl bg-[#0874F9] text-sm font-bold text-white shadow-md shadow-[#0874F9]/20 hover:bg-[#0657CC]"
                  >
                    Start Free Student Assessment
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </nav>

                {/* Footer with social links */}
                <div className="border-t border-gray-100 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Contact us on WhatsApp"
                      onClick={() =>
                        track.ctaClick({
                          cta_type: 'whatsapp',
                          cta_source: 'mobile_menu',
                          cta_text: 'WhatsApp',
                          cta_url: WHATSAPP_URL,
                        })
                      }
                      className="flex h-11 items-center gap-2 rounded-lg bg-[#EDF5FF] px-4 text-[13px] font-semibold text-[#0874F9] transition-colors hover:bg-[#25D366] hover:text-white"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Scroll Progress Line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-[#0874F9]"
          style={{ width: progressWidth }}
        />
      </div>
    </header>
  );
}
