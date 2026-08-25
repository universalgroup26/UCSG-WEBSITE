'use client';

import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  MessageCircle,
} from 'lucide-react';
import Logo from './Logo';
import { track } from '@/lib/analytics';

const WHATSAPP_URL = 'https://wa.me/13028935594';

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/universalconsultingsvc/', icon: 'instagram' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/81566580/', icon: 'linkedin' },
  { name: 'Twitter / X', href: 'https://twitter.com/UniversalCons16', icon: 'twitter' },
  { name: 'Facebook', href: 'https://www.facebook.com/universalconsultingservicesgroup', icon: 'facebook' },
] as const;

const resourceLinks = [
  { label: 'University Transfer Guidance', view: 'resource' as const, id: 'university-transfers' },
  { label: 'CPT Information', view: 'resource' as const, id: 'day1-cpt' },
  { label: 'Change of Status', view: 'resource' as const, id: 'change-of-status' },
  { label: 'SEVIS Reinstatement', view: 'resource' as const, id: 'sevis-reinstatement' },
  { label: 'STEM OPT Resources', view: 'resource' as const, id: 'stem-opt' },
];

const quickLinks = [
  { label: 'Home', view: 'home' as const, id: undefined },
  { label: 'Universities', view: 'home' as const, id: 'universities' },
  { label: 'Transfer Support', view: 'contact' as const, id: undefined },
  { label: 'Programs', view: 'home' as const, id: 'programs' },
  { label: 'F-1 Resources', view: 'home' as const, id: 'resources' },
  { label: 'About UCSG', view: 'home' as const, id: 'about' },
  { label: 'Contact Us', view: 'contact' as const, id: undefined },
];

const socialIconMap: Record<string, React.ReactNode> = {
  instagram: <Instagram className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  twitter: <Twitter className="h-4 w-4" />,
  facebook: <Facebook className="h-4 w-4" />,
};

interface Props {
  onNavigate?: (view: string, id?: string) => void;
  onContactClick?: () => void;
}

function handleNavigate(view: string, id?: string) {
  window.dispatchEvent(
    new CustomEvent('ucsg-navigate', {
      detail: id ? { view, id } : { view },
    })
  );
}

export default function Footer({ onNavigate, onContactClick }: Props) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      {/* Main Footer Content */}
      <div className="bg-[#061846]">
        <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Column 1: Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Logo variant="light" size="sm" compact />
              <p className="mt-2 text-sm font-semibold text-white">
                Universal Consulting Service Group
              </p>
              <p className="mt-3 text-base leading-relaxed text-white/70">
                Educational guidance, program research, and student support for
                F-1 students in the United States.
              </p>
              <div className="mt-5 flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                    onClick={() =>
                      track.socialClick(social.icon, social.name, social.href)
                    }
                  >
                    {socialIconMap[social.icon]}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Resources */}
            <div>
              <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
                Resources
              </h4>
              <ul className="mt-4 space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => {
                        track.navClick({
                          nav_type: 'footer',
                          nav_target: `resource:${link.id}`,
                          nav_text: link.label,
                        });
                        handleNavigate(link.view, link.id);
                        onNavigate?.(link.view, link.id);
                      }}
                      className="text-base text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Quick Links */}
            <div>
              <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
                Quick Links
              </h4>
              <ul className="mt-4 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => {
                        track.navClick({
                          nav_type: 'footer',
                          nav_target: link.id
                            ? `${link.view}:${link.id}`
                            : link.view,
                          nav_text: link.label,
                        });
                        handleNavigate(link.view, link.id);
                        onNavigate?.(link.view, link.id);
                      }}
                      className="text-base text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
                Contact Us
              </h4>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="tel:+13028935594"
                    onClick={() =>
                      track.ctaClick({
                        cta_type: 'call',
                        cta_source: 'footer',
                        cta_text: '+1 (302) 893-5594',
                      })
                    }
                    className="flex items-center gap-3 text-base text-white/70 transition-colors hover:text-white"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-white/50" />
                    +1 (302) 893-5594
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:Info@universalconsultingservices.com"
                    onClick={() =>
                      track.ctaClick({
                        cta_type: 'email',
                        cta_source: 'footer',
                        cta_text: 'Info@universalconsultingservices.com',
                      })
                    }
                    className="flex items-center gap-3 text-base text-white/70 transition-colors hover:text-white"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-white/50" />
                    Info@universalconsultingservices.com
                  </a>
                </li>
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      track.ctaClick({
                        cta_type: 'whatsapp',
                        cta_source: 'footer',
                        cta_text: 'WhatsApp',
                        cta_url: WHATSAPP_URL,
                      })
                    }
                    className="flex items-center gap-3 text-base text-white/70 transition-colors hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0 text-white/50" />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-base text-white/70">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/50" />
                    <span>
                      3707 74th Street, Suite 8 (3rd FL), Jackson Heights, NY
                      11372, USA
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#040E28]">
        <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-white/60">
                &copy; {currentYear} Universal Consulting Service Group. All rights
                reserved.
              </p>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('ucsg-consent-preferences'))}
                className="text-xs text-white/40 transition-colors hover:text-white/60"
              >
                Privacy &amp; Cookie Settings
              </button>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-white/40">
              UCSG provides educational information and student-support services.
              Admission, scholarships, visa status, SEVIS transfer, CPT/OPT
              authorization and employment outcomes are not guaranteed.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
