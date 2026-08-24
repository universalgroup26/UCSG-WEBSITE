'use client';

import { useState } from 'react';
import { Menu, ChevronDown, Phone, Mail, ShieldCheck, X, GraduationCap, BookOpen, DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Logo from './Logo';

const universitiesLinks = [
  { name: 'Trine University', id: 'trine' },
  { name: 'Monroe University', id: 'monroe' },
  { name: 'Saint Francis University', id: 'saint-francis' },
  { name: 'Tacoma Community College', id: 'tacoma-community' },
  { name: 'Computer System Institutes', id: 'computer-system-institutes' },
  { name: 'Curry College', id: 'curry' },
  { name: 'Dream IT', id: 'dream-it' },
  { name: 'NEW YORK Language Center', id: 'ny-language-center' },
  { name: 'International American University', id: 'international-american-university' },
  { name: 'NEW YORK General Consulting', id: 'ny-general-consulting' },
  { name: 'Westcliff University', id: 'westcliff' },
];

const resourcesLinks = [
  { name: 'Day 1 CPT Guide', id: 'day1-cpt', icon: BookOpen },
  { name: 'University Transfers', id: 'university-transfers', icon: GraduationCap },
  { name: 'Change of Status', id: 'change-of-status', icon: ArrowRight },
  { name: 'SEVIS Reinstatement', id: 'sevis-reinstatement', icon: ShieldCheck },
  { name: 'STEM OPT Support', id: 'stem-opt', icon: DollarSign },
];

interface Props {
  onNavigate?: (view: string, id?: string) => void;
}

const navItemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  }),
};



export default function Header({ onNavigate }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 10);
  });

  const handleNav = (view: string, id?: string) => {
    setActiveNav(view);
    setMobileOpen(false);
    onNavigate?.(view, id);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* ===== MAIN HEADER ===== */}
      <div
        className={
          `relative border-b transition-all duration-300 ${
            scrolled
              ? 'border-gray-200/80 bg-white/90 shadow-lg shadow-black/[0.04] backdrop-blur-xl'
              : 'border-gray-100 bg-white'
          }`
        }
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo — compact UCSG only */}
          <Logo size="lg" compact />

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-0.5 xl:flex">
            <motion.button
              custom={0}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              onClick={() => handleNav('home')}
              className={
                `relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  activeNav === 'home'
                    ? 'bg-[#002868] text-white'
                    : 'text-[#0F172A] hover:bg-[#002868]/5 hover:text-[#002868]'
                }`
              }
            >
              Home
            </motion.button>

            <UniversityDropdown handleNav={handleNav} />

            <ResourceDropdown handleNav={handleNav} />

            <motion.button
              custom={3}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              onClick={() => handleNav('resource', 'day1-cpt')}
              className={
                `relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  activeNav === 'day1-cpt'
                    ? 'bg-[#002868] text-white'
                    : 'text-[#0F172A] hover:bg-[#002868]/5 hover:text-[#002868]'
                }`
              }
            >
              Day 1 CPT
            </motion.button>

            <motion.button
              custom={4}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              onClick={() => handleNav('scholarships')}
              className={
                `relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  activeNav === 'scholarships'
                    ? 'bg-[#002868] text-white'
                    : 'text-[#0F172A] hover:bg-[#002868]/5 hover:text-[#002868]'
                }`
              }
            >
              Scholarships
            </motion.button>

            <motion.button
              custom={5}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              onClick={() => handleNav('contact')}
              className={
                `relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  activeNav === 'contact'
                    ? 'bg-[#B31942] text-white'
                    : 'text-[#0F172A] hover:bg-[#B31942]/5 hover:text-[#B31942]'
                }`
              }
            >
              Contact
            </motion.button>
          </nav>

          {/* Mobile Menu Trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="xl:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={
                  `relative h-10 w-10 rounded-xl transition-colors ${
                    mobileOpen ? 'bg-[#002868] text-white' : 'text-[#0F172A] hover:bg-[#002868]/5'
                  }`
                }
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[340px] overflow-y-auto p-0">
              {/* Mobile header with blue gradient */}
              <div className="bg-gradient-to-br from-[#002868] to-[#001B4D] px-6 pb-6 pt-8">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-3 text-left">
                    <div className="flex flex-col">
                      <span className="text-2xl font-extrabold tracking-tight text-white">UCSG</span>
                      <span className="text-xs font-medium tracking-wide text-white/70">
                        Universal Consulting Service Group
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-white">
                  <ShieldCheck className="h-3 w-3" />
                  U.S. Army Veteran-owned Business
                </div>
              </div>

              <nav className="flex flex-col gap-0.5 p-4">
                <button
                  onClick={() => handleNav('home')}
                  className="rounded-lg px-4 py-3 text-left text-sm font-semibold text-[#0F172A] transition-colors hover:bg-[#002868]/5"
                >
                  Home
                </button>

                {/* Universities section */}
                <div className="mt-2 px-4 pb-1.5 text-[11px] font-bold uppercase tracking-widest text-[#002868]">
                  Partner Universities
                </div>
                {universitiesLinks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNav('university', item.id)}
                    className="rounded-lg px-4 py-2.5 text-left text-sm text-[#334155] transition-colors hover:bg-[#002868]/5 hover:text-[#002868]"
                  >
                    {item.name}
                  </button>
                ))}

                {/* Resources section */}
                <div className="mt-3 px-4 pb-1.5 text-[11px] font-bold uppercase tracking-widest text-[#B31942]">
                  Resources
                </div>
                {resourcesLinks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNav('resource', item.id)}
                    className="flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-left text-sm text-[#334155] transition-colors hover:bg-[#002868]/5 hover:text-[#002868]"
                  >
                    <item.icon className="h-4 w-4 text-[#94A3B8]" />
                    {item.name}
                  </button>
                ))}

                <div className="my-3 border-t border-gray-100" />

                <button
                  onClick={() => handleNav('scholarships')}
                  className="rounded-lg px-4 py-3 text-left text-sm font-semibold text-[#0F172A] transition-colors hover:bg-[#002868]/5"
                >
                  Scholarships
                </button>
                <button
                  onClick={() => handleNav('contact')}
                  className="rounded-lg px-4 py-3 text-left text-sm font-semibold text-[#B31942] transition-colors hover:bg-[#B31942]/5"
                >
                  Contact Us
                </button>

                {/* Mobile CTA */}
                <div className="mt-4 space-y-2 px-2">
                  <a
                    href="tel:+13028935594"
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#B31942] to-[#002868] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#B31942]/20"
                  >
                    <Phone className="h-4 w-4" />
                    Call +1 (302) 893-5594
                  </a>
                  <a
                    href="mailto:Info@universalconsultingservices.com"
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#002868]/10 px-5 py-3 text-sm font-semibold text-[#002868] transition-colors hover:bg-[#002868]/5"
                  >
                    <Mail className="h-4 w-4" />
                    Email Us
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}



/* ===== UNIVERSITY DROPDOWN ===== */
function UniversityDropdown({ handleNav }: { handleNav: (v: string, id?: string) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          custom={1}
          variants={navItemVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-[#002868]/5 hover:text-[#002868] outline-none"
        >
          Universities
          <ChevronDown className="h-3.5 w-3.5 opacity-50" />
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-72 p-2">
        <DropdownMenuLabel className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#002868]">
          Partner Universities
        </DropdownMenuLabel>
        {universitiesLinks.map((item) => (
          <DropdownMenuItem
            key={item.id}
            className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium focus:bg-[#002868]/5 focus:text-[#002868]"
            onClick={() => handleNav('university', item.id)}
          >
            {item.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ===== RESOURCE DROPDOWN ===== */
function ResourceDropdown({ handleNav }: { handleNav: (v: string, id?: string) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          custom={2}
          variants={navItemVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-[#002868]/5 hover:text-[#002868] outline-none"
        >
          Resources
          <ChevronDown className="h-3.5 w-3.5 opacity-50" />
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-56 p-2">
        {resourcesLinks.map((item) => (
          <DropdownMenuItem
            key={item.id}
            className="flex cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium focus:bg-[#002868]/5 focus:text-[#002868]"
            onClick={() => handleNav('resource', item.id)}
          >
            <item.icon className="h-4 w-4 text-[#94A3B8]" />
            {item.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
