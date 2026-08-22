'use client';

import {
  Phone,
  Mail,
  Clock,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const WHATSAPP_URL = 'https://wa.me/13028935594';

const resourceLinks = [
  { name: 'Day 1 CPT', id: 'day1-cpt' },
  { name: 'University Transfers', id: 'university-transfers' },
  { name: 'Change of Status', id: 'change-of-status' },
  { name: 'SEVIS Reinstatement', id: 'sevis-reinstatement' },
  { name: 'STEM OPT Support', id: 'stem-opt' },
];

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/universalconsultingsvc/', icon: 'instagram' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/81566580/', icon: 'linkedin' },
  { name: 'Twitter / X', href: 'https://twitter.com/UniversalCons16', icon: 'twitter' },
  { name: 'Facebook Group', href: 'https://www.facebook.com/groups/universalconsultingservices/', icon: 'facebook' },
];

const quickHelpLinks = [
  { name: 'SEVIS terminated', id: 'sevis-reinstatement' },
  { name: 'OPT / STEM OPT denied', id: 'stem-opt' },
  { name: 'Urgent university transfer', id: 'university-transfers' },
  { name: 'Day 1 CPT options', id: 'day1-cpt' },
];

function FooterReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface Props {
  onNavigate?: (view: string, id?: string) => void;
  onContactClick?: () => void;
}

export default function Footer({ onNavigate, onContactClick }: Props) {
  return (
    <footer className="bg-[#0F172A] text-white">
      {/* CTA Section */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <FooterReveal>
            <div className="mx-auto max-w-2xl text-center">
              <motion.h3
                className="text-2xl font-bold text-white sm:text-3xl"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  onClick={() => { onContactClick?.(); onNavigate?.('contact'); }}
                  className="text-2xl font-bold text-white sm:text-3xl underline underline-offset-4 decoration-white/30 hover:decoration-white/60 transition-all"
                >
                  Get Free Consultation
                </button>
              </motion.h3>
              <motion.p
                className="mt-3 text-base text-[#94A3B8]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                Expert guidance from UCSG — Universal Consulting Service Group. Call or WhatsApp us 24/7.
              </motion.p>
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.5 }}
              >
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    className="h-12 rounded-full bg-[#25D366] px-8 text-base font-semibold text-white shadow-lg hover:bg-[#1EB954]"
                    asChild
                  >
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </FooterReveal>
        </div>
      </div>

      {/* 4-Column Grid */}
      <FooterReveal delay={0.1}>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Column 1: Logo & Description */}
            <div>
              <Logo variant="light" size="lg" showText />
              <p className="mt-4 text-sm leading-relaxed text-[#94A3B8]">
                UCSG — Universal Consulting Service Group. Founded by Joy Chowdhury in
                Queens, New York City, we offer transparent and seamless guidance for international
                students seeking college admission, CPT/OPT opportunities, and visa solutions.
                Driven by students&apos; happiness.
              </p>
              {/* Social Links */}
              <div className="mt-5 flex items-center gap-3">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0C1A2E] text-[#94A3B8] transition-colors hover:bg-[#002868] hover:text-white"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                    whileHover={{ scale: 1.2, rotate: 8, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon === 'instagram' && (
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    )}
                    {social.icon === 'linkedin' && (
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    )}
                    {social.icon === 'twitter' && (
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    )}
                    {social.icon === 'facebook' && (
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    )}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Column 2: Resources */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                Resources
              </h4>
              <ul className="mt-4 space-y-3">
                {resourceLinks.map((link, i) => (
                  <li key={link.id}>
                    <motion.button
                      onClick={() => onNavigate?.('resource', link.id)}
                      className="text-sm text-[#94A3B8] transition-colors hover:text-[#002868]"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.06, duration: 0.3 }}
                      whileHover={{ x: 4 }}
                    >
                      {link.name}
                    </motion.button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => onNavigate?.('scholarships')}
                    className="text-sm text-[#94A3B8] transition-colors hover:text-[#002868]"
                  >
                    Scholarships & Funding
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Help */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                Quick Help
              </h4>
              <ul className="mt-4 space-y-3">
                {quickHelpLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => onNavigate?.('resource', link.id)}
                      className="text-sm text-[#94A3B8] transition-colors hover:text-[#002868]"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h4
                className="text-sm font-semibold uppercase tracking-wider text-white cursor-pointer hover:text-[#002868] transition-colors"
                onClick={() => onNavigate?.('contact')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNavigate?.('contact'); }}
              >
                Contact
              </h4>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="tel:+13028935594"
                    className="flex items-center gap-3 text-sm text-[#94A3B8] transition-colors hover:text-[#002868]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0C1A2E]">
                      <Phone className="h-4 w-4 text-[#94A3B8]" />
                    </div>
                    +1 (302) 893-5594
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:Info@universalconsultingservices.com"
                    className="flex items-center gap-3 text-sm text-[#94A3B8] transition-colors hover:text-[#002868]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0C1A2E]">
                      <Mail className="h-4 w-4 text-[#94A3B8]" />
                    </div>
                    Info@universalconsultingservices.com
                  </a>
                </li>
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-[#94A3B8] transition-colors hover:text-[#002868]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0C1A2E]">
                      <MessageCircle className="h-4 w-4 text-[#94A3B8]" />
                    </div>
                    WhatsApp 24/7
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </FooterReveal>

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
                3707 74th Street, Suite 8 (3rd FL), Jackson Heights, NY 11372, USA
              </span>
            </div>
            <p className="text-xs text-[#64748B]">
              We are not a law firm. We provide guidance and connect students with accredited institutions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
