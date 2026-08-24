'use client';

import Image from 'next/image';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  Award,
  CheckCircle,
  CheckCircle2,
  BookOpen,
  Building,
  Globe,
  Clock,
  Briefcase,
  DollarSign,
  MessageCircle,
  ArrowRight,
  GraduationCap,
  TrendingUp,
  Star,
  Wifi,
  Shield,
  BadgeCheck,
  Sparkles,
  Target,
  BarChart3,
  ChevronRight,
  Mail,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { UniversityData } from '@/lib/data/universities';
import { universities } from '@/lib/data/universities';
import { motion } from 'framer-motion';
import UniversityMindmap from '@/components/infographics/UniversityMindmap';
import ScrollReveal from '@/components/ScrollReveal';
import { track } from '@/lib/analytics';

const iconMap: Record<string, React.ElementType> = {
  calendar: Calendar,
  users: Users,
  award: Award,
  'check-circle': CheckCircle,
  'book-open': BookOpen,
  building: Building,
  'map-pin': MapPin,
  globe: Globe,
  clock: Clock,
  target: TrendingUp,
  flask: GraduationCap,
  'dollar-sign': DollarSign,
  briefcase: Briefcase,
  trophy: Award,
};

const amenityIcons: Record<string, React.ElementType> = {
  'Library': BookOpen,
  'Computer Lab': Globe,
  'Computer Labs': Globe,
  'Student Center': Users,
  'Student Union': Users,
  'Student Lounge': Users,
  'Fitness Center': Star,
  'Athletic Fields': Star,
  'Athletic Complex': Star,
  'Athletic Facilities': Star,
  'Science Labs': GraduationCap,
  'Science Building': GraduationCap,
  'Dining Hall': Sparkles,
  'Cafeteria': Sparkles,
  'Career Center': Briefcase,
  'Career Services': Briefcase,
  'Chapel': Shield,
  'Nursing Lab': CheckCircle2,
  'Nursing Simulation Lab': CheckCircle2,
  'Innovation Lab': Wifi,
  'Innovation Hub': Wifi,
  'Maker Space': Wifi,
  'Research Labs': GraduationCap,
  'AI Lab': Globe,
  'Art Gallery': Sparkles,
  'Art Studio': Sparkles,
  'Art Therapy Studio': Sparkles,
  'Music Hall': Sparkles,
  'Performing Arts Center': Sparkles,
  'Outdoor Recreation': Star,
  'Recreation Center': Star,
  'Writing Center': BookOpen,
  'Tutoring Center': BookOpen,
  'Counseling Center': Users,
  'Online Learning Hub': Wifi,
  'Study Lounges': BookOpen,
  'Study Rooms': BookOpen,
  'Study Areas': BookOpen,
  'Coworking Space': Wifi,
  'Business Center': Briefcase,
  'Health Science Center': CheckCircle2,
  'Law School': Shield,
  'Law School Facilities': Shield,
  'Meditation Room': Shield,
  'Aviation Training Center': GraduationCap,
  'Performing Arts': Sparkles,
  'International Center': Globe,
  'Tech Lab': Wifi,
  'Student Commons': Users,
  'Student Services': Users,
  'Career Development': Briefcase,
  'Urban Campus': Building,
};

function getAmenityIcon(name: string): React.ElementType {
  return amenityIcons[name] || Building;
}

interface Props {
  university: UniversityData;
  onBack: () => void;
  onApplyClick?: (universityId?: string) => void;
}

export default function UniversityPage({ university, onBack, onApplyClick }: Props) {
  const compareSuggestions = universities
    .filter((u) => u.id !== university.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Back Bar */}
      <div className="border-b border-gray-100 bg-gray-50/50">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#002868]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Universities
            </button>
          </motion.div>
        </div>
      </div>

      {/* Hero with Background Image */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/bg-university.png"
            alt={`${university.name} campus`}
            fill
            className="object-cover"
            unoptimized
            priority
          />
          <div className="absolute inset-0" style={{ backgroundColor: university.color, opacity: 0.75 }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
            {/* Logo / Shield */}
            {university.logoPath ? (
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-white/30 bg-white shadow-lg sm:h-28 sm:w-28">
                <Image
                  src={university.logoPath}
                  alt={`${university.name} logo`}
                  width={112}
                  height={112}
                  className="h-full w-full object-contain p-2"
                  unoptimized
                />
              </div>
            ) : (
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl font-bold shadow-lg sm:h-28 sm:w-28 sm:text-3xl" style={{ color: university.color }}>
                {university.initials}
              </div>
            )}
            <div className="flex-1">
              <Badge className="mb-3 border-white/30 bg-white/20 text-white backdrop-blur-sm">
                SEVP Certified
              </Badge>
              <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                {university.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-teal-100">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {university.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Est. {university.founded}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building className="h-4 w-4" />
                  {university.type}
                </span>
              </div>
            </div>
            <div className="shrink-0">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  className="h-12 rounded-full bg-white px-6 font-semibold shadow-lg transition-all hover:scale-105"
                  style={{ color: university.color }}
                  onClick={() => { track.ctaClick({ cta_type: 'apply', cta_source: 'university_hero', cta_text: `Apply Now — ${university.shortName}` }); onApplyClick?.(university.id); }}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Apply Now
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
        {/* Wave bottom */}
        <svg viewBox="0 0 1440 60" fill="none" className="block w-full" preserveAspectRatio="none">
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" fill="white" />
        </svg>
      </section>

      {/* Key Facts Infographic Bar */}
      <section className="-mt-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {university.keyFacts.map((fact) => {
              const Icon = iconMap[fact.icon] || CheckCircle;
              return (
                <div
                  key={fact.label}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${university.color}15`, color: university.color }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280]">{fact.label}</p>
                    <p className="text-sm font-semibold text-[#0F172A]">{fact.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* University Mindmap Infographic */}
      <UniversityMindmap
        universityName={university.name}
        color={university.color}
        cptAvailable={university.cptAvailable}
        programs={university.programs}
        location={university.location}
        tuitionRange={university.tuitionRange}
        onlineAvailable={university.onlinePrograms}
        hybridAvailable={university.hybridOption}
      />

      {/* Description + Sidebar */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">About {university.shortName}</h2>
                <p className="mt-4 leading-relaxed text-[#6B7280]">{university.description}</p>
              </ScrollReveal>

              {/* CPT Info Box */}
              <ScrollReveal delay={0.1}>
                <div className="mt-8 rounded-2xl border-2 border-[#002868]/20 bg-[#F8FAFC] p-6">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#002868]">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-[#0F172A]">Day 1 CPT Authorization</h3>
                  </div>
                  <p className="mt-3 leading-relaxed text-[#6B7280]">{university.cptInfo}</p>
                </div>
              </ScrollReveal>

              {/* Why Choose This University - 2x2 Grid */}
              <ScrollReveal delay={0.05}>
                <div className="mt-10">
                  <div className="mb-6 flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-[#002868]" />
                    <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">Why Choose This University?</h2>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Rankings Card */}
                    <div className="rounded-xl border border-gray-100 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                          <BarChart3 className="h-5 w-5 text-amber-600" />
                        </div>
                        <h4 className="font-semibold text-[#0F172A]">Rankings &amp; Reputation</h4>
                      </div>
                      <p className="mt-3 text-sm font-medium text-amber-700">{university.ranking}</p>
                      <p className="mt-1.5 text-xs text-[#6B7280]">
                        {university.ranking !== 'Unranked'
                          ? 'Recognized for academic excellence and student outcomes.'
                          : 'A growing institution focused on practical, career-oriented education.'}
                      </p>
                    </div>

                    {/* Campus & Location Card */}
                    <div className="rounded-xl border border-gray-100 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                          <MapPin className="h-5 w-5 text-emerald-600" />
                        </div>
                        <h4 className="font-semibold text-[#0F172A]">Campus &amp; Location</h4>
                      </div>
                      <p className="mt-3 text-sm font-medium text-emerald-700">{university.campusSize}</p>
                      <p className="mt-1.5 text-xs text-[#6B7280]">
                        Located in {university.location} · {university.studentFacultyRatio} student-to-faculty ratio
                      </p>
                    </div>

                    {/* Flexibility Card */}
                    <div className="rounded-xl border border-gray-100 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                          <Wifi className="h-5 w-5 text-blue-600" />
                        </div>
                        <h4 className="font-semibold text-[#0F172A]">Flexibility</h4>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Badge className={university.onlinePrograms ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-gray-200 bg-gray-50 text-gray-400'}>
                          <Globe className="mr-1 h-3 w-3" />
                          Online Programs
                        </Badge>
                        <Badge className={university.hybridOption ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-gray-200 bg-gray-50 text-gray-400'}>
                          <Clock className="mr-1 h-3 w-3" />
                          Hybrid Option
                        </Badge>
                      </div>
                      <p className="mt-2 text-xs text-[#6B7280]">
                        {university.onlinePrograms && university.hybridOption
                          ? 'Full online and hybrid learning available for maximum flexibility.'
                          : university.onlinePrograms
                          ? 'Online programs available to study from anywhere.'
                          : 'Campus-based programs with a focused learning experience.'}
                      </p>
                    </div>

                    {/* Affordability Card */}
                    <div className="rounded-xl border border-gray-100 bg-gradient-to-br from-purple-50 to-white p-5 shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                          <DollarSign className="h-5 w-5 text-purple-600" />
                        </div>
                        <h4 className="font-semibold text-[#0F172A]">Affordability</h4>
                      </div>
                      <p className="mt-3 text-sm font-medium text-purple-700">{university.tuitionRange}</p>
                      <div className="mt-2 flex items-center gap-1.5">
                        {university.scholarshipsAvailable ? (
                          <>
                            <BadgeCheck className="h-4 w-4 text-purple-600" />
                            <span className="text-xs font-medium text-purple-700">Scholarships Available</span>
                          </>
                        ) : (
                          <span className="text-xs text-[#6B7280]">Contact admissions for financial aid options</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Programs */}
              <ScrollReveal>
                <div className="mt-10">
                  <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">
                    Available Programs
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {university.programs.map((program, index) => (
                      <ScrollReveal key={program.name} delay={index * 0.08}>
                        <div
                          className="group rounded-xl border border-gray-100 bg-white p-5 transition-all hover:border-[#002868]/30 hover:shadow-md"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F1F5F9]">
                              <GraduationCap className="h-5 w-5 text-[#6B7280]" />
                            </div>
                            <div className="flex gap-2">
                              {program.stem && (
                                <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">STEM</Badge>
                              )}
                              <Badge className="border-gray-200 bg-gray-50 text-[#6B7280]">{program.level}</Badge>
                            </div>
                          </div>
                          <h4 className="mt-3 font-semibold text-[#0F172A]">{program.name}</h4>
                          <div className="mt-2 flex items-center gap-3 text-xs text-[#94A3B8]">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {program.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-3.5 w-3.5" />
                              Day 1 CPT
                            </span>
                          </div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Admissions Requirements */}
              <ScrollReveal>
                <div className="mt-10">
                  <div className="mb-6 flex items-center gap-2">
                    <Shield className="h-6 w-6 text-[#002868]" />
                    <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">Admissions Requirements</h2>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* GPA */}
                    <div className="rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F0FDF4]">
                        <TrendingUp className="h-6 w-6 text-emerald-600" />
                      </div>
                      <p className="mt-3 text-xs font-medium uppercase tracking-wider text-[#6B7280]">Average GPA</p>
                      <p className="mt-1 text-2xl font-bold text-[#0F172A]">{university.averageGPA}</p>
                    </div>

                    {/* English Requirements */}
                    <div className="rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EFF6FF]">
                        <Globe className="h-6 w-6 text-blue-600" />
                      </div>
                      <p className="mt-3 text-xs font-medium uppercase tracking-wider text-[#6B7280]">English Requirements</p>
                      <p className="mt-1 text-sm font-bold text-[#0F172A]">{university.englishRequirements}</p>
                    </div>

                    {/* Application Fee */}
                    <div className="rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF7ED]">
                        <DollarSign className="h-6 w-6 text-orange-600" />
                      </div>
                      <p className="mt-3 text-xs font-medium uppercase tracking-wider text-[#6B7280]">Application Fee</p>
                      <p className="mt-1 text-2xl font-bold text-[#0F172A]">{university.applicationFee}</p>
                    </div>

                    {/* Semester Starts */}
                    <div className="rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FDF4FF]">
                        <Calendar className="h-6 w-6 text-purple-600" />
                      </div>
                      <p className="mt-3 text-xs font-medium uppercase tracking-wider text-[#6B7280]">Semester Starts</p>
                      <p className="mt-1 text-sm font-bold text-[#0F172A]">{university.semesterStarts}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Campus Highlights */}
              <ScrollReveal>
                <div className="mt-10">
                  <div className="mb-6 flex items-center gap-2">
                    <Star className="h-6 w-6 text-[#002868]" />
                    <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">Campus Highlights</h2>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    {/* Notable Alumni */}
                    {university.notableAlumni.length > 0 && (
                      <div>
                        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
                          <Award className="h-4 w-4 text-amber-500" />
                          Notable Alumni
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {university.notableAlumni.map((alumnus) => (
                            <Badge
                              key={alumnus}
                              className="border-amber-200 bg-amber-50 px-3 py-1.5 text-amber-800"
                            >
                              {alumnus}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Campus Amenities */}
                    <div className={university.notableAlumni.length > 0 ? 'mt-6' : ''}>
                      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
                        <Building className="h-4 w-4 text-[#002868]" />
                        Campus Amenities
                      </h4>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {university.campusAmenities.map((amenity) => {
                          const Icon = getAmenityIcon(amenity);
                          return (
                            <div
                              key={amenity}
                              className="flex items-center gap-2.5 rounded-lg border border-gray-50 bg-[#F8FAFC] p-3"
                            >
                              <Icon className="h-4 w-4 shrink-0 text-[#002868]" />
                              <span className="text-sm text-[#0F172A]">{amenity}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Compare This University */}
              <ScrollReveal>
                <div className="mt-10">
                  <div className="mb-6 flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-[#002868]" />
                    <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">Compare This University</h2>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {compareSuggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="group flex flex-col items-center gap-3 rounded-xl border border-gray-100 bg-white p-5 transition-all hover:border-[#002868]/30 hover:shadow-md"
                      >
                        {suggestion.logoPath ? (
                          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
                            <Image
                              src={suggestion.logoPath}
                              alt={`${suggestion.name} logo`}
                              width={64}
                              height={64}
                              className="h-full w-full object-contain p-1"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div
                            className="flex h-16 w-16 items-center justify-center rounded-lg text-sm font-bold text-white shadow-sm"
                            style={{ backgroundColor: suggestion.color }}
                          >
                            {suggestion.initials}
                          </div>
                        )}
                        <div className="text-center">
                          <p className="text-sm font-semibold text-[#0F172A]">{suggestion.shortName}</p>
                          <p className="mt-1 text-xs text-[#6B7280]">{suggestion.location}</p>
                          <p className="mt-1 text-xs font-medium text-[#002868]">{suggestion.tuitionRange}</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-1.5">
                          <Badge className="border-gray-200 bg-gray-50 text-[10px] text-[#6B7280]">
                            <CheckCircle className="mr-0.5 h-2.5 w-2.5" />
                            Day 1 CPT
                          </Badge>
                          {suggestion.onlinePrograms && (
                            <Badge className="border-gray-200 bg-gray-50 text-[10px] text-[#6B7280]">
                              <Globe className="mr-0.5 h-2.5 w-2.5" />
                              Online
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info Card */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-[#0F172A]">Quick Information</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                    <span className="text-sm text-[#6B7280]">Accreditation</span>
                    <span className="text-sm font-medium text-[#0F172A]">{university.accreditation}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                    <span className="text-sm text-[#6B7280]">Ranking</span>
                    <span className="text-sm font-medium text-[#0F172A]">{university.ranking}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                    <span className="text-sm text-[#6B7280]">Campus Size</span>
                    <span className="text-sm font-medium text-[#0F172A]">{university.campusSize}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                    <span className="text-sm text-[#6B7280]">Tuition Range</span>
                    <span className="text-sm font-medium text-[#0F172A]">{university.tuitionRange}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                    <span className="text-sm text-[#6B7280]">Acceptance Rate</span>
                    <span className="text-sm font-medium text-[#0F172A]">{university.acceptanceRate}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                    <span className="text-sm text-[#6B7280]">Online Programs</span>
                    <span className={`text-sm font-medium ${university.onlinePrograms ? 'text-emerald-600' : 'text-[#94A3B8]'}`}>
                      {university.onlinePrograms ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                    <span className="text-sm text-[#6B7280]">Hybrid Option</span>
                    <span className={`text-sm font-medium ${university.hybridOption ? 'text-emerald-600' : 'text-[#94A3B8]'}`}>
                      {university.hybridOption ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                    <span className="text-sm text-[#6B7280]">Scholarships</span>
                    <span className={`text-sm font-medium ${university.scholarshipsAvailable ? 'text-emerald-600' : 'text-[#94A3B8]'}`}>
                      {university.scholarshipsAvailable ? 'Available' : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                    <span className="text-sm text-[#6B7280]">GPA Requirement</span>
                    <span className="text-sm font-medium text-[#0F172A]">{university.averageGPA}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                    <span className="text-sm text-[#6B7280]">English Reqs</span>
                    <span className="text-sm font-medium text-[#0F172A]">{university.englishRequirements}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                    <span className="text-sm text-[#6B7280]">Total Enrollment</span>
                    <span className="text-sm font-medium text-[#0F172A]">{university.enrollment}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B7280]">Website</span>
                    <span className="text-sm font-medium text-[#002868]">{university.website}</span>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-[#0F172A]">Contact Admissions</h3>
                <div className="mt-4 space-y-3">
                  <a
                    href={`mailto:${university.contactEmail}`}
                    className="flex items-center gap-3 rounded-lg bg-[#F8FAFC] p-3 text-sm text-[#0F172A] transition-colors hover:bg-[#F1F5F9]"
                    onClick={() => track.ctaClick({ cta_type: 'email', cta_source: 'university_sidebar', cta_text: university.contactEmail })}
                  >
                    <Mail className="h-4 w-4 text-[#002868]" />
                    {university.contactEmail}
                  </a>
                  <a
                    href="tel:+13028935594"
                    className="flex items-center gap-3 rounded-lg bg-[#F8FAFC] p-3 text-sm text-[#0F172A] transition-colors hover:bg-[#F1F5F9]"
                    onClick={() => track.ctaClick({ cta_type: 'call', cta_source: 'university_sidebar', cta_text: 'Call +1 (302) 893-5594' })}
                  >
                    <Phone className="h-4 w-4 text-[#002868]" />
                    +1 (302) 893-5594
                  </a>
                </div>
              </div>

              {/* CTA Card */}
              <ScrollReveal delay={0.15}>
                <div className="rounded-2xl bg-[#0F172A] p-6 text-white">
                  <h3 className="text-lg font-bold">Interested in {university.shortName}?</h3>
                  <p className="mt-2 text-sm text-[#94A3B8]">
                    UCSG provides free consultation on admission requirements, CPT authorization, and enrollment timelines. Call us 24/7.
                  </p>
                  <Button className="mt-5 w-full rounded-full bg-[#25D366] text-white hover:bg-[#1EB954]" asChild>
                    <a href="https://wa.me/13028935594" onClick={() => track.ctaClick({ cta_type: 'whatsapp', cta_source: 'university_page', cta_text: 'WhatsApp Chat' })} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                  <Button className="mt-3 w-full rounded-full border border-white/20 bg-transparent text-white hover:bg-white/10" asChild>
                    <a href="https://wa.me/13028935594?text=Hi%20UCSG%2C%20I%27m%20interested%20in%20applying%20to%20" onClick={() => track.ctaClick({ cta_type: 'whatsapp', cta_source: 'university_page', cta_text: 'Get Free Consultation' })} target="_blank" rel="noopener noreferrer">
                      Get Free Consultation
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </ScrollReveal>

              {/* Process Card */}
              <ScrollReveal delay={0.2}>
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="font-semibold text-[#0F172A]">How to Apply</h3>
                  <div className="mt-4 space-y-4">
                    {[
                      'Free consultation with advisor',
                      'Document collection & review',
                      'Application submission',
                      'I-20 issuance & enrollment',
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#002868] text-xs font-bold text-white">
                          {i + 1}
                        </div>
                        <span className="text-sm text-[#6B7280]">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
