'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, ArrowRight, GraduationCap, Shield, Users, BookOpen } from 'lucide-react';
import { track } from '@/lib/analytics';

const WHATSAPP_URL = 'https://wa.me/13028935594';

const services = [
  { icon: GraduationCap, title: 'F-1 University Transfer Guidance', desc: 'Compare transfer-friendly U.S. universities and plan your SEVIS transfer with expert guidance.' },
  { icon: BookOpen, title: 'Graduate Program Comparison', desc: 'Research and compare 90+ programs across 21 universities — tuition, format, accreditation, and more.' },
  { icon: Shield, title: 'CPT & OPT Educational Resources', desc: 'Understand Day 1 CPT, OPT, STEM OPT, and SEVIS reinstatement with our free educational guides.' },
  { icon: Users, title: 'Veteran Education Planning', desc: 'Degree planning, benefits resources, and military transfer credit guidance for U.S. veterans.' },
];

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function JacksonHeightsView() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061846] to-[#092B68] py-20 text-white">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 text-[#D6A84B]">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Jackson Heights, Queens, NY</span>
            </div>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              F-1 Student Education Consultant in Jackson Heights, NY
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              Universal Consulting Service Group LLC is based in Jackson Heights, Queens —
              helping F-1 international students explore university transfers, compare graduate
              programs, and navigate CPT/OPT educational resources. Veteran-led. Education-focused. Student-first.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => {
                  track.ctaClick({ cta_type: 'call', cta_source: 'jackson_heights_hero', cta_text: 'Call +1 (302) 893-5594' });
                  window.location.href = 'tel:+13028935594';
                }}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#0874F9] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#0660D4]"
              >
                <Phone className="h-5 w-5" />
                Call +1 (302) 893-5594
              </button>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'contact' } }))}
                className="flex items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:border-white"
              >
                Book Free Assessment
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Location + Address */}
      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#061846]">Visit Our Jackson Heights Office</h2>
              <p className="mt-4 text-gray-600">
                Our office is located in the heart of Jackson Heights, Queens — one of the most
                diverse neighborhoods in New York City. We're easily accessible by subway (7 train to 74th Street–Broadway)
                and bus, and we serve F-1 students from across the NYC metro area and nationwide via online consultations.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#0874F9]" />
                  <div>
                    <p className="font-semibold text-[#061846]">Address</p>
                    <p className="text-gray-600">3707 74th Street, Suite 8 (3rd FL)<br />Jackson Heights, NY 11372</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#0874F9]" />
                  <div>
                    <p className="font-semibold text-[#061846]">Phone</p>
                    <a href="tel:+13028935594" className="text-[#0874F9] hover:underline">+1 (302) 893-5594</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#0874F9]" />
                  <div>
                    <p className="font-semibold text-[#061846]">Email</p>
                    <a href="mailto:Info@universalconsultingservices.com" className="text-[#0874F9] hover:underline">Info@universalconsultingservices.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#0874F9]" />
                  <div>
                    <p className="font-semibold text-[#061846]">WhatsApp</p>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline">Message us on WhatsApp</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.5!2d-73.8831!3d40.7497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s3707%2074th%20St%2C%20Jackson%20Heights%2C%20NY%2011372!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="UCSG Office Location — Jackson Heights, NY"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-2xl font-bold text-[#061846]">Our Education Services</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            UCSG provides educational guidance and student support — not legal advice. Admission, scholarship, visa,
            CPT/OPT, and employment outcomes are not guaranteed.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {services.map((s) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0874F9]/10">
                  <s.icon className="h-6 w-6 text-[#0874F9]" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-[#061846]">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-[#061846]">Serving Students Nationwide</h2>
          <p className="mt-4 max-w-3xl text-gray-600">
            While our office is in Jackson Heights, Queens, we serve F-1 students and veterans across the United States
            through online consultations. Whether you're in New York, New Jersey, Connecticut, California, Texas, or
            anywhere in between, we can help you explore your education options remotely.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {['Jackson Heights', 'Queens', 'Manhattan', 'Brooklyn', 'Bronx', 'Staten Island', 'Long Island', 'Westchester', 'New Jersey', 'Online Nationwide'].map((area) => (
              <span key={area} className="rounded-full bg-[#EDF5FF] px-4 py-2 text-sm font-medium text-[#0874F9]">{area}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#061846] to-[#092B68] py-16 text-white">
        <div className="mx-auto max-w-[800px] px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">Ready to Plan Your Next Educational Step?</h2>
          <p className="mt-4 text-white/80">
            Take the free assessment or book a consultation. No enrollment commitment required.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'contact' } }))}
              className="rounded-lg bg-[#0874F9] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#0660D4]"
            >
              Start Free Assessment
            </button>
            <a
              href="tel:+13028935594"
              onClick={() => track.ctaClick({ cta_type: 'call', cta_source: 'jackson_heights_cta', cta_text: 'Call Now' })}
              className="rounded-lg border border-white/30 px-8 py-3 font-semibold text-white transition-colors hover:border-white"
            >
              <Phone className="mr-2 inline h-4 w-4" />
              Call Now
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
