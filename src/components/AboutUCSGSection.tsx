'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, ShieldCheck, MapPin } from 'lucide-react';
import { track } from '@/lib/analytics';

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const differentiators = [
  {
    icon: Users,
    title: 'Students Come First',
    description:
      'Every interaction begins with understanding your unique situation, timeline, and goals — not pushing a predetermined list of programs.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Information',
    description:
      'Program details, costs, and requirements are sourced from official university materials and verified to the best of our ability before sharing with students.',
  },
  {
    icon: MapPin,
    title: 'Onshore U.S. Support',
    description:
      'Our team is based in Jackson Heights, New York. When you need to reach us, you\'re calling a U.S. office, not an overseas call center.',
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-section 1 – Founder Story                                     */
/* ------------------------------------------------------------------ */
function FounderStorySection() {
  return (
    <section aria-labelledby="about-ucsg-heading" className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Founder image — left on desktop, top on mobile */}
          <motion.div
            className="order-2 flex justify-center lg:order-1 lg:justify-start"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0.2}
          >
            <div className="relative h-64 w-full max-w-sm overflow-hidden rounded-2xl shadow-lg sm:h-80 lg:h-[420px]">
              <Image
                src="/images/founder.jpg"
                alt="Joy Chowdhury, Founder and CEO of UCSG"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Text — right on desktop, below image on mobile */}
          <div className="order-1 flex flex-col gap-5 lg:order-2">
            <motion.p
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: '#0874F9' }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              About UCSG
            </motion.p>

            <motion.h2
              id="about-ucsg-heading"
              className="font-heading text-2xl font-bold leading-tight tracking-tight text-[#061846] sm:text-3xl lg:text-4xl"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.1}
            >
              Founded by a Veteran, Driven by Students
            </motion.h2>

            <motion.p
              className="text-base leading-relaxed text-gray-600"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.2}
            >
              UCSG was founded by Joy Chowdhury, a U.S. Army veteran who understands the
              challenges international students face when navigating the U.S. education system.
              After serving in the military, Joy dedicated his career to helping students make
              informed decisions about their educational journey.
            </motion.p>

            <motion.p
              className="text-base leading-relaxed text-gray-600"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.3}
            >
              Based in Jackson Heights, New York, UCSG provides educational guidance, program
              research, application coordination and student support for F-1 students exploring
              university transfers, hybrid graduate programs, and their options under curricular
              and optional practical training frameworks.
            </motion.p>

            <motion.p
              className="text-base leading-relaxed text-gray-600"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.4}
            >
              UCSG is not a law firm and does not provide legal advice. For immigration-related
              decisions, students should consult with a qualified immigration attorney.
            </motion.p>

            <motion.p
              className="mt-2 text-sm font-medium text-[#061846]"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.5}
            >
              Joy Chowdhury — Founder and CEO, UCSG — U.S. Army Veteran
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-section 2 – What Makes UCSG Different                         */
/* ------------------------------------------------------------------ */
function DifferentiatorsSection() {
  return (
    <section aria-labelledby="differentiators-heading" className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="differentiators-heading"
          className="mb-10 text-center font-heading text-2xl font-bold tracking-tight text-[#061846] sm:text-3xl lg:text-4xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          What Makes UCSG Different
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={i * 0.15}
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ backgroundColor: '#EDF5FF' }}
                >
                  <Icon className="h-6 w-6" style={{ color: '#0874F9' }} aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-base leading-relaxed text-gray-600">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Export                                                        */
/* ------------------------------------------------------------------ */
export default function AboutUCSGSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track.sectionView('about_ucsg');
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} aria-label="About UCSG">
      <FounderStorySection />
      <DifferentiatorsSection />
    </section>
  );
}
