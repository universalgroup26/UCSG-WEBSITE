'use client';

import { useState } from 'react';
import { Menu, X, Facebook, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import Logo from './Logo';
import { track } from '@/lib/analytics';

/* ─── Navigation definition ───────────────────────────────────────── */

interface NavItem {
  label: string;
  view: string;
  id?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', view: 'home' },
  { label: 'Transfer Support', view: 'contact' },
  { label: 'Programs', view: 'home', id: 'programs' },
  { label: 'F-1 Resources', view: 'home', id: 'resources' },
  { label: 'About', view: 'home', id: 'about' },
  { label: 'Contact', view: 'contact' },
];

const FACEBOOK_URL = 'https://www.facebook.com/universalconsultingservicesgroup';
const WHATSAPP_URL = 'https://wa.me/13028935594';

/* ─── Props ──────────────────────────────────────────────────────── */

interface Props {
  onNavigate?: (view: string, id?: string) => void;
}

/* ─── Component ──────────────────────────────────────────────────── */

export default function Header({ onNavigate }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 10);
  });

  const handleNav = (item: NavItem) => {
    setActiveNav(item.view);
    setMobileOpen(false);
    track.navClick({
      nav_type: activeNav === item.view ? 'header' : 'header',
      nav_target: item.id ? `${item.view}:${item.id}` : item.view,
      nav_text: item.label,
    });
    window.dispatchEvent(
      new CustomEvent('ucsg-navigate', {
        detail: { view: item.view, id: item.id },
      })
    );
    onNavigate?.(item.view, item.id);
  };

  const handleCta = () => {
    setMobileOpen(false);
    track.ctaClick({
      cta_type: 'consultation',
      cta_source: 'header',
      cta_text: 'Start Free Student Assessment',
    });
    window.dispatchEvent(
      new CustomEvent('ucsg-navigate', {
        detail: { view: 'contact' },
      })
    );
    onNavigate?.('contact');
  };

  const toggleMobile = (open: boolean) => {
    setMobileOpen(open);
    track.mobileMenu(open ? 'open' : 'close');
  };

  const handleSocialClick = (platform: string, url: string, name: string) => {
    track.socialClick(platform, name, url);
  };

  return (
    <header className="sticky top-0 z-50" role="banner">
      <div
        className={
          'relative border-b transition-all duration-300 ' +
          (scrolled
            ? 'border-gray-200/80 bg-white/90 shadow-lg shadow-black/[0.04] backdrop-blur-xl'
            : 'border-gray-100 bg-white')
        }
      >
        <div className="mx-auto flex h-18 max-w-[1200px] items-center justify-between px-4 sm:px-6">
          {/* ── Logo ── */}
          <Logo size="lg" compact />

          {/* ── Desktop Navigation ── */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                activeNav === item.view &&
                (!item.id || activeNav === 'home');

              return (
                <button
                  key={item.label}
                  onClick={() => handleNav(item)}
                  aria-current={isActive ? 'page' : undefined}
                  className={
                    'rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-colors ' +
                    (isActive
                      ? 'bg-[#061846] text-white'
                      : 'text-[#0F172A] hover:bg-[#EDF5FF] hover:text-[#0874F9]')
                  }
                >
                  {item.label}
                </button>
              );
            })}

            {/* Facebook icon — subtle in desktop nav */}
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="UCSG on Facebook"
              onClick={() =>
                handleSocialClick('facebook', FACEBOOK_URL, 'UCSG Facebook')
              }
              className="ml-1.5 flex h-9 w-9 items-center justify-center rounded-lg text-[#94A3B8] transition-colors hover:bg-[#EDF5FF] hover:text-[#0874F9]"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:block">
            <Button
              onClick={handleCta}
              size="sm"
              className={
                'h-9 gap-2 rounded-lg bg-[#0874F9] px-5 text-[13px] font-bold text-white ' +
                'shadow-sm shadow-[#0874F9]/25 transition-all hover:bg-[#0657CC] hover:shadow-md hover:shadow-[#0874F9]/30'
              }
            >
              Start Free Student Assessment
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* ── Mobile: WhatsApp + Menu trigger ── */}
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

              {/* ── Mobile Sheet Content ── */}
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

                {/* Nav links */}
                <nav
                  className="flex flex-col gap-0.5 p-4"
                  aria-label="Mobile navigation"
                >
                  {NAV_ITEMS.map((item) => {
                    const isActive =
                      activeNav === item.view &&
                      (!item.id || activeNav === 'home');

                    return (
                      <button
                        key={item.label}
                        onClick={() => handleNav(item)}
                        className={
                          'rounded-lg px-4 py-3 text-left text-sm font-semibold transition-colors ' +
                          (isActive
                            ? 'bg-[#061846]/5 text-[#061846]'
                            : 'text-[#334155] hover:bg-[#EDF5FF] hover:text-[#0874F9]')
                        }
                      >
                        {item.label}
                      </button>
                    );
                  })}

                  {/* Divider */}
                  <div className="my-3 border-t border-gray-100" />

                  {/* Mobile CTA */}
                  <Button
                    onClick={handleCta}
                    className={
                      'mx-2 h-11 gap-2 rounded-xl bg-[#0874F9] text-sm font-bold text-white ' +
                      'shadow-md shadow-[#0874F9]/20 hover:bg-[#0657CC]'
                    }
                  >
                    Start Free Student Assessment
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </nav>

                {/* Footer with social link */}
                <div className="border-t border-gray-100 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <a
                      href={FACEBOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="UCSG on Facebook"
                      onClick={() =>
                        handleSocialClick(
                          'facebook',
                          FACEBOOK_URL,
                          'UCSG Facebook (mobile menu)'
                        )
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EDF5FF] text-[#0874F9] transition-colors hover:bg-[#0874F9] hover:text-white"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
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
                      className="flex h-10 items-center gap-2 rounded-lg bg-[#EDF5FF] px-4 text-[13px] font-semibold text-[#0874F9] transition-colors hover:bg-[#25D366] hover:text-white"
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
      </div>
    </header>
  );
}
