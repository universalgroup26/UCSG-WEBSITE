'use client';

import { useState } from 'react';
import { Menu, ChevronDown, MessageCircle } from 'lucide-react';
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Logo from './Logo';
import { getUniversityById } from '@/lib/data/universities';
import type { UniversityData } from '@/lib/data/universities';

const universitiesLinks = [
  { name: 'Rivier University', id: 'rivier' },
  { name: 'Indiana Wesleyan University', id: 'indiana-wesleyan' },
  { name: 'Avila University (AZ)', id: 'avila-az' },
  { name: 'Avila University (KC)', id: 'avila-kc' },
  { name: 'New England College', id: 'new-england' },
  { name: 'Monroe University', id: 'monroe' },
  { name: 'Anderson University', id: 'anderson' },
  { name: 'Regis University', id: 'regis' },
];

const resourcesLinks = [
  { name: 'Day 1 CPT Guide', id: 'day1-cpt' },
  { name: 'University Transfers', id: 'university-transfers' },
  { name: 'Change of Status', id: 'change-of-status' },
  { name: 'SEVIS Reinstatement', id: 'sevis-reinstatement' },
  { name: 'STEM OPT Support', id: 'stem-opt' },
];

interface Props {
  onNavigate?: (view: string, id?: string) => void;
}

export default function Header({ onNavigate }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (view: string, id?: string) => {
    setMobileOpen(false);
    onNavigate?.(view, id);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo size="md" />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <button
            onClick={() => handleNav('home')}
            className="rounded-full bg-[#DBEAFE] px-4 py-1.5 text-sm font-medium text-[#0070F3] transition-colors hover:bg-[#BFDBFE]"
          >
            Home
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium text-[#111827] transition-colors hover:bg-gray-100 outline-none">
              Universities
              <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56">
              {universitiesLinks.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  className="cursor-pointer"
                  onClick={() => handleNav('university', item.id)}
                >
                  {item.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium text-[#111827] transition-colors hover:bg-gray-100 outline-none">
              Resources
              <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              {resourcesLinks.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  className="cursor-pointer"
                  onClick={() => handleNav('resource', item.id)}
                >
                  {item.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <a
            href="#webinars"
            className="rounded-full px-4 py-1.5 text-sm font-medium text-[#111827] transition-colors hover:bg-gray-100"
          >
            Webinars
          </a>
          <button
            onClick={() => handleNav('home')}
            className="rounded-full px-4 py-1.5 text-sm font-medium text-[#111827] transition-colors hover:bg-gray-100"
          >
            Get Started
          </button>
        </nav>

        {/* Desktop CTA */}
        <Button
          className="hidden rounded-full bg-[#0070F3] px-5 text-sm font-medium text-white hover:bg-[#0060D3] md:inline-flex"
          size="default"
          asChild
        >
          <a href="tel:+13028935594">
            <MessageCircle className="mr-1.5 h-4 w-4" />
            Call Now
          </a>
        </Button>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-left">
                <Logo size="sm" />
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              <button
                onClick={() => handleNav('home')}
                className="rounded-lg bg-[#DBEAFE] px-4 py-2.5 text-left text-sm font-medium text-[#0070F3]"
              >
                Home
              </button>

              <div className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                Universities
              </div>
              {universitiesLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav('university', item.id)}
                  className="rounded-lg px-4 py-2 text-left text-sm text-[#111827] hover:bg-gray-50"
                >
                  {item.name}
                </button>
              ))}

              <div className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                Resources
              </div>
              {resourcesLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav('resource', item.id)}
                  className="rounded-lg px-4 py-2 text-left text-sm text-[#111827] hover:bg-gray-50"
                >
                  {item.name}
                </button>
              ))}

              <a
                href="#webinars"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-[#111827] hover:bg-gray-50"
              >
                Webinars
              </a>

              <div className="mt-4 px-4">
                <Button className="w-full rounded-full bg-[#0070F3] text-white hover:bg-[#0060D3]" asChild>
                  <a href="tel:+13028935594">
                    <MessageCircle className="mr-1.5 h-4 w-4" />
                    Call +1 (302) 893-5594
                  </a>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}