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
}

export default function Footer({ onNavigate }: Props) {
  return (
    <footer className="bg-[#1E2D3B] text-white">
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
                Get Free Consultation
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
            </div>

            {/* Column 2: Resources */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                Resources
              </h4>
              <ul className="mt-4 space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => onNavigate?.('resource', link.id)}
                      className="text-sm text-[#94A3B8] transition-colors hover:text-[#00C6FF]"
                    >
                      {link.name}
                    </button>
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
                  <li key={link.name}>
                    <button
                      onClick={() => onNavigate?.('resource', link.id)}
                      className="text-sm text-[#94A3B8] transition-colors hover:text-[#00C6FF]"
                    >
                      {link.name}
                    </button>
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
                    href="tel:+13028935594"
                    className="flex items-center gap-3 text-sm text-[#94A3B8] transition-colors hover:text-[#00C6FF]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#002A38]">
                      <Phone className="h-4 w-4 text-[#94A3B8]" />
                    </div>
                    +1 (302) 893-5594
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:Info@universalconsultingservices.com"
                    className="flex items-center gap-3 text-sm text-[#94A3B8] transition-colors hover:text-[#00C6FF]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#002A38]">
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
                    className="flex items-center gap-3 text-sm text-[#94A3B8] transition-colors hover:text-[#00C6FF]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#002A38]">
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
