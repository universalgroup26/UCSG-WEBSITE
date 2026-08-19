'use client';

import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  ArrowLeft,
  Globe,
} from 'lucide-react';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, useInView } from 'framer-motion';

function ScrollReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const contactMethods = [
  {
    icon: Phone,
    title: 'Call Us',
    value: '+1 (302) 893-5594',
    subtitle: 'Available 24/7',
    href: 'tel:+13028935594',
    color: '#002868',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: 'Chat on WhatsApp',
    subtitle: 'Instant reply, 24/7',
    href: 'https://wa.me/13028935594',
    external: true,
    color: '#25D366',
  },
  {
    icon: Mail,
    title: 'Email Us',
    value: 'Info@universalconsultingservices.com',
    subtitle: 'Response within 2 hours',
    href: 'mailto:Info@universalconsultingservices.com',
    color: '#D97706',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: '3707 74th Street, Suite 8 (3rd FL)',
    subtitle: 'Jackson Heights, NY 11372',
    href: 'https://maps.google.com/?q=3707+74th+Street+Suite+8+Jackson+Heights+NY+11372',
    external: true,
    color: '#7C3AED',
  },
];

const officeHours = [
  { day: 'Monday – Friday', hours: '9:00 AM – 9:00 PM EST' },
  { day: 'Saturday', hours: '10:00 AM – 6:00 PM EST' },
  { day: 'Sunday', hours: '12:00 PM – 6:00 PM EST' },
  { day: 'Emergency Support', hours: '24/7 via Phone & WhatsApp' },
];

const services = [
  'Day 1 CPT University Admission',
  'University Transfers (Emergency)',
  'Change of Status (to F-1)',
  'SEVIS Reinstatement',
  'STEM OPT Support',
  'I-20 Extension',
  'H-1B Guidance',
];

interface Props {
  onBack: () => void;
}

export default function ContactPage({ onBack }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    nationality: '',
    englishLevel: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', whatsapp: '', nationality: '', englishLevel: '', service: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Bar */}
      <motion.div
        className="border-b border-gray-100 bg-gray-50/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#002868]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </div>
      </motion.div>

      {/* Hero with Background Image */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/bg-contact.png"
            alt="UCSG Consulting Office"
            fill
            className="object-cover"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1A]/85 via-[#002868]/60 to-[#0A0F1A]/75" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Globe className="h-8 w-8 text-white" />
            </motion.div>
            <motion.h1
              className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Contact Us
            </motion.h1>
            <motion.p
              className="mt-4 text-lg text-white/80"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              Get in touch with UCSG — Universal Consulting Service Group. We&apos;re here to help you with your US education journey.
            </motion.p>
            <motion.div
              className="mt-6 flex items-center justify-center gap-2 text-sm text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              <Clock className="h-4 w-4" />
              Available 24/7 · Free Consultation
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Methods Cards */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              const Wrapper = method.external ? 'a' : 'a';
              return (
                <motion.a
                  key={method.title}
                  href={method.href}
                  target={method.external ? '_blank' : undefined}
                  rel={method.external ? 'noopener noreferrer' : undefined}
                  className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${method.color}10` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: method.color }} />
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A]">{method.title}</h3>
                  <p className="mt-1 text-sm font-medium text-[#002868]">{method.value}</p>
                  <p className="mt-1 text-xs text-[#6B7280]">{method.subtitle}</p>
                </motion.a>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* Contact Form + Info Grid */}
      <section className="bg-gray-50/70">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <ScrollReveal className="lg:col-span-3">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
                <h2 className="text-2xl font-bold text-[#0F172A]">Send Us a Message</h2>
                <p className="mt-2 text-sm text-[#6B7280]">
                  Fill out the form below and we&apos;ll get back to you within 2 hours.
                </p>

                {submitted ? (
                  <motion.div
                    className="mt-8 flex flex-col items-center justify-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#059669]/10">
                      <CheckCircle2 className="h-8 w-8 text-[#059669]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0F172A]">Message Sent!</h3>
                    <p className="mt-1 text-sm text-[#6B7280]">
                      We&apos;ll respond within 2 hours. Check your email and WhatsApp.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
                          Full Name <span className="text-[#DC2626]">*</span>
                        </label>
                        <Input
                          required
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="h-11 rounded-xl border-gray-200 bg-gray-50/50 focus-visible:border-[#002868] focus-visible:ring-[#002868]/20"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
                          Email Address <span className="text-[#DC2626]">*</span>
                        </label>
                        <Input
                          required
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="h-11 rounded-xl border-gray-200 bg-gray-50/50 focus-visible:border-[#002868] focus-visible:ring-[#002868]/20"
                        />
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-3">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          placeholder="+1 (XXX) XXX-XXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="h-11 rounded-xl border-gray-200 bg-gray-50/50 focus-visible:border-[#002868] focus-visible:ring-[#002868]/20"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
                          WhatsApp Number
                        </label>
                        <Input
                          type="tel"
                          placeholder="+Country XXX XXX"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          className="h-11 rounded-xl border-gray-200 bg-gray-50/50 focus-visible:border-[#002868] focus-visible:ring-[#002868]/20"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
                          Nationality
                        </label>
                        <Input
                          placeholder="e.g. Bangladeshi"
                          value={formData.nationality}
                          onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                          className="h-11 rounded-xl border-gray-200 bg-gray-50/50 focus-visible:border-[#002868] focus-visible:ring-[#002868]/20"
                        />
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
                          Service Needed
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 text-sm text-[#0F172A] focus:border-[#002868] focus:outline-none focus:ring-2 focus:ring-[#002868]/20"
                        >
                          <option value="">Select a service...</option>
                          {services.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
                          English Level
                        </label>
                        <select
                          value={formData.englishLevel}
                          onChange={(e) => setFormData({ ...formData, englishLevel: e.target.value })}
                          className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 text-sm text-[#0F172A] focus:border-[#002868] focus:outline-none focus:ring-2 focus:ring-[#002868]/20"
                        >
                          <option value="">Select...</option>
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                          <option value="fluent">Fluent / Native</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
                        Your Message <span className="text-[#DC2626]">*</span>
                      </label>
                      <Textarea
                        required
                        rows={5}
                        placeholder="Tell us about your situation, current visa status, and how we can help..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="rounded-xl border-gray-200 bg-gray-50/50 focus-visible:border-[#002868] focus-visible:ring-[#002868]/20"
                      />
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        className="h-12 w-full rounded-xl bg-[#002868] px-8 text-base font-semibold text-white hover:bg-[#001B4D] sm:w-auto"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </motion.div>
                  </form>
                )}
              </div>
            </ScrollReveal>

            {/* Sidebar Info */}
            <div className="space-y-6 lg:col-span-2">
              <ScrollReveal delay={0.1}>
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-[#0F172A]">
                    <Clock className="h-5 w-5 text-[#002868]" />
                    Office Hours
                  </h3>
                  <div className="mt-4 space-y-3">
                    {officeHours.map((item) => (
                      <div key={item.day} className="flex items-start justify-between gap-4">
                        <span className="text-sm font-medium text-[#0F172A]">{item.day}</span>
                        <span className="shrink-0 text-right text-sm text-[#6B7280]">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#0F172A]">Our Services</h3>
                  <ul className="mt-4 space-y-2.5">
                    {services.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm text-[#0F172A]">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#059669]" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="rounded-2xl bg-[#002868] p-6 text-white">
                  <h3 className="text-lg font-semibold">Quick Contact</h3>
                  <p className="mt-2 text-sm text-white/80">
                    Need immediate help? Call us or message on WhatsApp for instant support.
                  </p>
                  <div className="mt-5 space-y-3">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        className="w-full rounded-xl bg-white text-[#002868] hover:bg-gray-100"
                        asChild
                      >
                        <a href="tel:+13028935594">
                          <Phone className="mr-2 h-4 w-4" />
                          Call +1 (302) 893-5594
                        </a>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        className="w-full rounded-xl bg-[#25D366] text-white hover:bg-[#1EB954]"
                        asChild
                      >
                        <a href="https://wa.me/13028935594" target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          WhatsApp Chat
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Map / Location Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 lg:p-10">
                <h2 className="text-2xl font-bold text-[#0F172A]">Our Office</h2>
                <p className="mt-2 text-sm text-[#6B7280]">
                  Visit us at our Jackson Heights, Queens office for in-person consultations.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#002868]/10">
                      <MapPin className="h-4 w-4 text-[#002868]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">Address</p>
                      <p className="mt-0.5 text-sm text-[#6B7280]">
                        3707 74th Street, Suite 8 (3rd FL)<br />
                        Jackson Heights, NY 11372, USA
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#059669]/10">
                      <Phone className="h-4 w-4 text-[#059669]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">Phone</p>
                      <a href="tel:+13028935594" className="mt-0.5 block text-sm text-[#002868] hover:underline">
                        +1 (302) 893-5594
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D97706]/10">
                      <Mail className="h-4 w-4 text-[#D97706]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">Email</p>
                      <a href="mailto:Info@universalconsultingservices.com" className="mt-0.5 block text-sm text-[#002868] hover:underline">
                        Info@universalconsultingservices.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative min-h-[300px] bg-gray-100 lg:min-h-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3018.8!2d-73.882!3d40.748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzUyLjgiTiA3M8KwNTInNTUuMiJX!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: 'absolute', inset: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="UCSG Office Location"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-[#6B7280]">
          UCSG is not a law firm. We provide guidance and connect students with accredited institutions.
          For legal advice, please consult a licensed immigration attorney.
        </p>
      </section>
    </div>
  );
}
