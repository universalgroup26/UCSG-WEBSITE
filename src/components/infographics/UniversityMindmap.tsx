'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MapPin,
  GraduationCap,
  DollarSign,
  Briefcase,
  Clock,
  Globe,
  Wifi,
  Award,
  Users,
  BookOpen,
  CheckCircle2,
  Star,
  Building,
} from 'lucide-react';

interface UniversityMindmapProps {
  universityName: string;
  color: string;
  cptAvailable: boolean;
  programs: { name: string; icon: string }[];
  location: string;
  tuitionRange: string;
  onlineAvailable: boolean;
  hybridAvailable: boolean;
}

export default function UniversityMindmap({
  universityName,
  color,
  cptAvailable,
  programs,
  location,
  tuitionRange,
  onlineAvailable,
  hybridAvailable,
}: UniversityMindmapProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const displayPrograms = programs.slice(0, 4);

  return (
    <section ref={ref} className="bg-[#F7F7F7] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white" style={{ backgroundColor: color }}>
            University Profile
          </span>
          <h2 className="mt-4 text-xl font-bold text-[#1E2D3B] sm:text-2xl">
            {universityName} — At a Glance
          </h2>
          <p className="mt-2 text-sm text-[#6B7280] sm:text-base">
            Key factors that make this university a great choice
          </p>
        </motion.div>

        {/* Desktop Mindmap */}
        <div className="hidden lg:block">
          <div className="relative mx-auto max-w-6xl">
            {/* Center hub */}
            <motion.div
              className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
            >
              <div
                className="flex h-28 w-28 flex-col items-center justify-center rounded-full text-center shadow-2xl"
                style={{ backgroundColor: color }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">Your Path</p>
                <p className="text-sm font-extrabold leading-tight text-white">{universityName.split(' ').slice(-2).join(' ')}</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 py-2">
              {/* Location & Flexibility */}
              <MindmapCard
                title="Location & Flexibility"
                icon={MapPin}
                color="#006F8F"
                bg="#E0F4F8"
                border="#B3E5EC"
                isInView={isInView}
                index={0}
              >
                <MindmapItem icon={MapPin} color="#006F8F" label={location} />
                <MindmapItem icon={Building} color="#006F8F" label="Accredited Campus" />
                {onlineAvailable && <MindmapItem icon={Globe} color="#006F8F" label="Online Programs" highlight />}
                {hybridAvailable && <MindmapItem icon={Wifi} color="#006F8F" label="Hybrid Format" highlight />}
              </MindmapCard>

              {/* Programs */}
              <MindmapCard
                title="Programs Offered"
                icon={GraduationCap}
                color="#7C3AED"
                bg="#EDE9FE"
                border="#C4B5FD"
                isInView={isInView}
                index={1}
              >
                {displayPrograms.map((p) => (
                  <MindmapItem key={p.name} icon={BookOpen} color="#7C3AED" label={p.name} />
                ))}
                {programs.length > 4 && (
                  <div className="rounded-lg bg-white/50 px-3 py-2 text-center text-xs font-medium text-[#7C3AED]">
                    +{programs.length - 4} more programs
                  </div>
                )}
              </MindmapCard>

              {/* CPT & Work */}
              <MindmapCard
                title="CPT & Work Authorization"
                icon={Briefcase}
                color="#059669"
                bg="#D1FAE5"
                border="#6EE7B7"
                isInView={isInView}
                index={2}
              >
                {cptAvailable ? (
                  <>
                    <MindmapItem icon={CheckCircle2} color="#059669" label="Day 1 CPT Available" highlight />
                    <MindmapItem icon={Briefcase} color="#059669" label="Work from First Day" />
                    <MindmapItem icon={Clock} color="#059669" label="Full-time or Part-time CPT" />
                    <MindmapItem icon={Star} color="#059669" label="Field-Related Employment" />
                  </>
                ) : (
                  <>
                    <MindmapItem icon={Briefcase} color="#059669" label="CPT Available After 1 Year" />
                    <MindmapItem icon={Clock} color="#059669" label="OPT Eligible" />
                    <MindmapItem icon={Users} color="#059669" label="Career Services Support" />
                    <MindmapItem icon={Award} color="#059669" label="STEM OPT for Qualifying Degrees" />
                  </>
                )}
              </MindmapCard>

              {/* Costs & Value */}
              <MindmapCard
                title="Costs & Value"
                icon={DollarSign}
                color="#D97706"
                bg="#FEF3C7"
                border="#FCD34D"
                isInView={isInView}
                index={3}
              >
                <MindmapItem icon={DollarSign} color="#D97706" label={`Tuition: ${tuitionRange}`} highlight />
                <MindmapItem icon={BookOpen} color="#D97706" label="Affordable Compared to Peers" />
                <MindmapItem icon={Award} color="#D97706" label="Scholarships May Be Available" />
                <MindmapItem icon={Star} color="#D97706" label="UCSG Fee Assistance" />
              </MindmapCard>
            </div>
          </div>
        </div>

        {/* Mobile: Stacked cards */}
        <div className="space-y-3 lg:hidden">
          <motion.div
            className="mx-auto mb-2 flex h-14 w-14 flex-col items-center justify-center rounded-full text-center shadow-lg"
            style={{ backgroundColor: color }}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
          >
            <p className="text-[9px] font-semibold text-white/70">AT A</p>
            <p className="text-[9px] font-extrabold text-white">GLANCE</p>
          </motion.div>

          {[
            {
              title: 'Location & Flexibility',
              icon: MapPin,
              color: '#006F8F',
              bg: '#E0F4F8',
              border: '#B3E5EC',
              items: [
                { icon: MapPin, label: location },
                { icon: Building, label: 'Accredited Campus' },
                ...(onlineAvailable ? [{ icon: Globe, label: 'Online Programs' }] : []),
                ...(hybridAvailable ? [{ icon: Wifi, label: 'Hybrid Format' }] : []),
              ],
            },
            {
              title: 'Programs',
              icon: GraduationCap,
              color: '#7C3AED',
              bg: '#EDE9FE',
              border: '#C4B5FD',
              items: displayPrograms.map((p) => ({ icon: BookOpen, label: p.name })),
            },
            {
              title: 'CPT & Work',
              icon: Briefcase,
              color: '#059669',
              bg: '#D1FAE5',
              border: '#6EE7B7',
              items: cptAvailable
                ? [
                    { icon: CheckCircle2, label: 'Day 1 CPT' },
                    { icon: Briefcase, label: 'Work from Day 1' },
                    { icon: Clock, label: 'Full/Part-time' },
                  ]
                : [
                    { icon: Briefcase, label: 'CPT After 1 Year' },
                    { icon: Clock, label: 'OPT Eligible' },
                  ],
            },
            {
              title: 'Cost & Value',
              icon: DollarSign,
              color: '#D97706',
              bg: '#FEF3C7',
              border: '#FCD34D',
              items: [
                { icon: DollarSign, label: `Tuition: ${tuitionRange}` },
                { icon: Award, label: 'Scholarships Available' },
              ],
            },
          ].map((section, i) => {
            const SectionIcon = section.icon;
            return (
              <motion.div
                key={section.title}
                className="rounded-xl border p-4"
                style={{ borderColor: section.border, backgroundColor: section.bg }}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-2.5 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ backgroundColor: section.color }}>
                    <SectionIcon className="h-3.5 w-3.5 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-[#1E2D3B]">{section.title}</h3>
                </div>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center gap-2 rounded-lg bg-white/50 px-2.5 py-1.5 text-xs">
                        <ItemIcon className="h-3 w-3 shrink-0" style={{ color: section.color }} />
                        <span className="text-[#4B5563]">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MindmapCard({
  title,
  icon: Icon,
  color,
  bg,
  border,
  isInView,
  index,
  children,
}: {
  title: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  isInView: boolean;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
    >
      <div className="rounded-2xl border p-5 sm:p-6" style={{ borderColor: border, backgroundColor: bg }}>
        <div className="mb-4 flex items-center gap-3">
          <motion.div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-md"
            style={{ backgroundColor: color }}
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="h-5 w-5 text-white" />
          </motion.div>
          <h3 className="text-base font-bold text-[#1E2D3B] sm:text-lg">{title}</h3>
        </div>
        <div className="space-y-2">{children}</div>
      </div>
    </motion.div>
  );
}

function MindmapItem({
  icon: Icon,
  color,
  label,
  highlight,
}: {
  icon: React.ElementType;
  color: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 ${highlight ? 'bg-white/80 shadow-sm' : 'bg-white/50'}`}
      whileHover={{ x: 3 }}
    >
      <Icon className={`h-4 w-4 shrink-0 ${highlight ? '' : 'opacity-60'}`} style={{ color }} />
      <span className={`text-sm ${highlight ? 'font-semibold text-[#1E2D3B]' : 'text-[#4B5563]'}`}>
        {label}
      </span>
    </motion.div>
  );
}
