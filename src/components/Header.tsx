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

const universitiesLinks = [
  'Rivier University',
  'Indiana Wesleyan University',
  'Avila University',
  'New England College',
  'Monroe University',
  'Anderson University',
  'Regis University',
  'Harrisburg University',
];

const resourcesLinks = [
  'Day 1 CPT Guide',
  'University Transfers',
  'Change of Status',
  'SEVIS Reinstatement',
  'STEM OPT Support',
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-1">
          <span className="text-xl font-bold text-[#111827]">CPT</span>
          <span className="inline-block rounded-md border-2 border-[#111827] px-2 py-0.5 text-xl font-bold text-[#111827]">
            Mentor
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <a
            href="/"
            className="rounded-full bg-[#DBEAFE] px-4 py-1.5 text-sm font-medium text-[#0070F3] transition-colors hover:bg-[#BFDBFE]"
          >
            Home
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium text-[#111827] transition-colors hover:bg-gray-100 outline-none">
              Universities
              <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56">
              {universitiesLinks.map((name) => (
                <DropdownMenuItem key={name} className="cursor-pointer">
                  {name}
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
              {resourcesLinks.map((name) => (
                <DropdownMenuItem key={name} className="cursor-pointer">
                  {name}
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
          <a
            href="#get-started"
            className="rounded-full px-4 py-1.5 text-sm font-medium text-[#111827] transition-colors hover:bg-gray-100"
          >
            Get Started
          </a>
        </nav>

        {/* Desktop CTA */}
        <Button
          className="hidden rounded-full bg-[#0070F3] px-5 text-sm font-medium text-white hover:bg-[#0060D3] md:inline-flex"
          size="default"
        >
          <MessageCircle className="mr-1.5 h-4 w-4" />
          WhatsApp 24/7
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
              <SheetTitle className="flex items-center gap-1 text-left">
                <span className="text-xl font-bold text-[#111827]">CPT</span>
                <span className="inline-block rounded-md border-2 border-[#111827] px-2 py-0.5 text-xl font-bold text-[#111827]">
                  Mentor
                </span>
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              <a
                href="/"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-[#DBEAFE] px-4 py-2.5 text-sm font-medium text-[#0070F3]"
              >
                Home
              </a>

              <div className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                Universities
              </div>
              {universitiesLinks.map((name) => (
                <a
                  key={name}
                  href="#"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2 text-sm text-[#111827] hover:bg-gray-50 rounded-lg"
                >
                  {name}
                </a>
              ))}

              <div className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                Resources
              </div>
              {resourcesLinks.map((name) => (
                <a
                  key={name}
                  href="#"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2 text-sm text-[#111827] hover:bg-gray-50 rounded-lg"
                >
                  {name}
                </a>
              ))}

              <a
                href="#webinars"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-[#111827] hover:bg-gray-50 rounded-lg"
              >
                Webinars
              </a>

              <div className="mt-4 px-4">
                <Button className="w-full rounded-full bg-[#0070F3] text-white hover:bg-[#0060D3]">
                  <MessageCircle className="mr-1.5 h-4 w-4" />
                  WhatsApp 24/7
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
