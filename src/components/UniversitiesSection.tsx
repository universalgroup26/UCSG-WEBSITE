'use client';

interface University {
  name: string;
  shortName: string;
  initials: string;
  color: string;
}

const universities: University[] = [
  { name: 'Rivier University', shortName: 'Rivier', initials: 'RU', color: '#1E3A5F' },
  { name: 'Indiana Wesleyan University', shortName: 'Indiana Wesleyan', initials: 'IWU', color: '#8B1A1A' },
  { name: 'Avila University Kansas City', shortName: 'Avila - KC', initials: 'AU', color: '#C41E3A' },
  { name: 'Avila University Arizona', shortName: 'Avila - AZ', initials: 'AU', color: '#7B2D26' },
  { name: 'New England College', shortName: 'New England', initials: 'NEC', color: '#004B87' },
  { name: 'Monroe University', shortName: 'Monroe', initials: 'MU', color: '#1B3A4B' },
  { name: 'Anderson University', shortName: 'Anderson', initials: 'AU', color: '#E87722' },
  { name: 'Regis University', shortName: 'Regis', initials: 'RU', color: '#6B0F1A' },
  { name: 'Curry College', shortName: 'Curry', initials: 'CC', color: '#003B5C' },
  { name: 'National Louis University', shortName: 'National Louis', initials: 'NLU', color: '#003366' },
  { name: 'Harrisburg University', shortName: 'Harrisburg', initials: 'HU', color: '#003B6F' },
  { name: 'Texas Wesleyan University', shortName: 'Texas Wesleyan', initials: 'TXW', color: '#6B0015' },
  { name: 'Humphreys University', shortName: 'Humphreys', initials: 'HU', color: '#1A3C5E' },
  { name: 'McDaniel College', shortName: 'McDaniel', initials: 'MC', color: '#004B87' },
  { name: 'Westcliff University', shortName: 'Westcliff', initials: 'WU', color: '#1A3A5C' },
  { name: 'Sofia University', shortName: 'Sofia', initials: 'SU', color: '#7B2D8B' },
  { name: 'Salem University', shortName: 'Salem', initials: 'SU', color: '#003057' },
  { name: 'Wayland Baptist University', shortName: 'Wayland Baptist', initials: 'WBU', color: '#1B3A4B' },
  { name: 'Faulkner University', shortName: 'Faulkner', initials: 'FU', color: '#6B2D5B' },
  { name: 'University of the Potomac', shortName: 'Potomac', initials: 'UOTP', color: '#1A3C5E' },
  { name: 'California Miramar University', shortName: 'Cal Miramar', initials: 'CMU', color: '#003366' },
  { name: 'Adelphi University', shortName: 'Adelphi', initials: 'AU', color: '#6B0015' },
  { name: 'Cumberland University', shortName: 'Cumberland', initials: 'CU', color: '#2C1810' },
  { name: 'Bay Atlantic University', shortName: 'Bay Atlantic', initials: 'BAU', color: '#003B6F' },
  { name: 'Goldey-Beacom College', shortName: 'Goldey-Beacom', initials: 'GBC', color: '#B8860B' },
  { name: 'Concordia University Texas', shortName: 'Concordia - TX', initials: 'CTX', color: '#1A237E' },
  { name: 'Ottawa University', shortName: 'Ottawa', initials: 'OU', color: '#003B5C' },
  { name: 'Midwest University', shortName: 'Midwest', initials: 'MU', color: '#1A3A5C' },
  { name: 'Webster University', shortName: 'Webster', initials: 'WU', color: '#003057' },
];

export default function UniversitiesSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl lg:text-[2.25rem]">
            SEVP-Certified Universities
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#64748B]">
            Click on any university logo to learn more about their programs and
            offerings
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:mt-16 sm:gap-4">
          {universities.map((uni) => (
            <button
              key={uni.name}
              className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-[#E2E8F0] bg-white px-3 py-5 transition-all hover:border-[#0070F3]/40 hover:shadow-lg sm:px-4 sm:py-6"
            >
              {/* University Shield Logo */}
              <div
                className="flex h-16 w-16 items-center justify-center rounded-lg text-xs font-bold tracking-wide text-white shadow-sm transition-transform group-hover:scale-105 sm:h-[68px] sm:w-[68px]"
                style={{ backgroundColor: uni.color }}
              >
                {uni.initials}
              </div>
              <span className="text-center text-[11px] font-medium leading-tight text-[#334155] transition-colors group-hover:text-[#0070F3] sm:text-xs">
                {uni.shortName}
              </span>
            </button>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-[#64748B]">
          All universities are SEVP-certified and offer Day 1 CPT programs
        </p>
      </div>
    </section>
  );
}
