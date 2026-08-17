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
import Logo from './Logo';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const resourceLinks = [
  'Day 1 CPT',
  'University Transfers',
  'Change of Status',
  'SEVIS Reinstatement',
  'STEM OPT Support',
];

const quickHelpLinks = [
  'SEVIS terminated',
  'OPT / STEM OPT denied',
  'Urgent university transfer',
  'Day 1 CPT options',
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
                  <Button className="h-12 rounded-full bg-white px-8 text-base font-semibold text-[#1E2D3B] shadow-lg hover:bg-gray-100">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Chat on WhatsApp
                    <ArrowRight className="ml-1 h-4 w-4" />
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
            <Logo variant="light" size="lg" />
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
                <li key={link}>
                  <button
                    onClick={() => {
                      const id = link === 'Day 1 CPT' ? 'day1-cpt' : link === 'University Transfers' ? 'university-transfers' : link === 'Change of Status' ? 'change-of-status' : link === 'SEVIS Reinstatement' ? 'sevis-reinstatement' : 'stem-opt';
                      onNavigate?.('resource', id);
                    }}
                    className="text-sm text-[#94A3B8] transition-colors hover:text-[#00C6FF]"
                  >
                    {link}
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
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-[#94A3B8] transition-colors hover:text-[#00C6FF]"
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
              <li className="flex items-center gap-3 text-sm text-[#94A3B8]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#002A38]">
                  <Clock className="h-4 w-4 text-[#94A3B8]" />
                </div>
                Support 24/7
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
            <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
              <a href="#" className="transition-colors hover:text-[#00C6FF]">
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
