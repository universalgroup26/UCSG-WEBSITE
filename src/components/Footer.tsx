'use client';

import {
  ArrowRight,
  Phone,
  Mail,
  Clock,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const resourceLinks = [
  'Day 1 CPT',
  'University Transfers',
  'Change of Status',
  'SEVIS Reinstatement',
];

const quickHelpLinks = [
  'SEVIS terminated',
  'OPT / STEM OPT denied',
  'Urgent university transfer',
  'Day 1 CPT options',
];

export default function Footer() {
  return (
    <footer className="bg-[#0B1120] text-white">
      {/* CTA Section */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              Get Free Consultation
            </h3>
            <p className="mt-3 text-base text-[#94A3B8]">
              Expert guidance from CPT Mentor - Available 24/7
            </p>
            <div className="mt-8">
              <Button className="h-12 rounded-full bg-white px-8 text-base font-semibold text-[#0B1120] shadow-lg hover:bg-gray-100">
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Column Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo & Description */}
          <div>
            <a href="/" className="flex items-center gap-1">
              <span className="text-xl font-bold text-white">CPT</span>
              <span className="inline-block rounded-md border-2 border-white px-2 py-0.5 text-xl font-bold text-white">
                Mentor
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-[#94A3B8]">
              Your trusted resource for university transfers, SEVIS reinstatement,
              Day 1 CPT guidance, Change of Status support, and end-to-end F-1 visa
              solutions for international students.
            </p>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Resources
            </h4>
            <ul className="mt-4 space-y-3">
              {resourceLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-[#94A3B8] transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Help */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Help
            </h4>
            <ul className="mt-4 space-y-3">
              {quickHelpLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-[#94A3B8] transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 text-sm text-[#94A3B8] transition-colors hover:text-white"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1E293B]">
                    <Phone className="h-4 w-4 text-[#94A3B8]" />
                  </div>
                  +1 (978) 606-5493
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@cptmentor.com"
                  className="flex items-center gap-3 text-sm text-[#94A3B8] transition-colors hover:text-white"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1E293B]">
                    <Mail className="h-4 w-4 text-[#94A3B8]" />
                  </div>
                  info@cptmentor.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#94A3B8]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1E293B]">
                  <Clock className="h-4 w-4 text-[#94A3B8]" />
                </div>
                Support 24/7
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-3">
              <span className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                <Clock className="h-3.5 w-3.5" />
                Support 24/7
              </span>
              <span className="hidden sm:block text-white/20">|</span>
              <span className="flex items-start gap-1.5 text-xs text-[#94A3B8]">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                447 Broadway 2nd floor #1483, New York, NY 10013, USA
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
              <a href="#" className="transition-colors hover:text-white">
                Privacy Policy
              </a>
              <span className="text-white/20">|</span>
              <span>Disclaimer: We are not a law firm. We provide guidance and connect students with accredited institutions.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
