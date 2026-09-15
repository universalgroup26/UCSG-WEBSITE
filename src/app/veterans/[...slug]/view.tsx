'use client';

import { useEffect } from 'react';
import VeteranBachelorsPage from '@/components/pages/veteran/VeteranBachelorsPage';
import VeteranMastersPage from '@/components/pages/veteran/VeteranMastersPage';
import VeteranDoctoralPage from '@/components/pages/veteran/VeteranDoctoralPage';
import VeteranOnlineHybridPage from '@/components/pages/veteran/VeteranOnlineHybridPage';
import VeteranAssessmentForm from '@/components/pages/veteran/VeteranAssessmentForm';
import VeteranInfoPage from '@/components/pages/veteran/VeteranInfoPage';
import { track } from '@/lib/analytics';

// Content for the routes that use VeteranInfoPage (shared layout)
const INFO_PAGE_CONTENT: Record<string, {
  eyebrow: string;
  headline: string;
  subheadline: string;
  children: React.ReactNode;
  ctaText: string;
  ctaHref: string;
}> = {
  'degree-planning': {
    eyebrow: 'VETERAN DEGREE PLANNING',
    headline: 'Build a Clear Plan for Your Next Degree',
    subheadline: 'Review your education background, compare verified program information, understand costs, and select your next step with structured guidance.',
    children: (
      <div className="space-y-6">
        <p>UCSG's veteran degree planning process is designed to help you move from uncertainty to a clear educational roadmap. We help you:</p>
        <ul className="ml-6 space-y-3 list-disc">
          <li>Clarify your academic and career goals</li>
          <li>Review your previous education and military experience</li>
          <li>Compare programs across accredited institutions</li>
          <li>Understand total estimated costs and official benefit resources</li>
          <li>Select the right degree path and format for your situation</li>
          <li>Navigate application and enrollment steps</li>
        </ul>
        <p>Our planning process is educational and informational. We do not determine VA benefit eligibility or guarantee admission, transfer credit, or employment outcomes.</p>
      </div>
    ),
    ctaText: 'START MY DEGREE ASSESSMENT',
    ctaHref: 'assessment',
  },
  'education-benefits': {
    eyebrow: 'EDUCATION BENEFITS',
    headline: 'Understand the Resources Before Making a Decision',
    subheadline: 'Benefit eligibility and payments are determined by the appropriate government agency, not UCSG. We help you find official information.',
    children: (
      <div className="space-y-6">
        <p>VA education benefits can help eligible veterans, service members, and their families cover education costs. The U.S. Department of Veterans Affairs determines eligibility and benefit amounts.</p>
        <h3 className="text-xl font-heading font-bold">Official Resources</h3>
        <ul className="ml-6 space-y-3 list-disc">
          <li><a href="https://www.va.gov/education/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline">VA Education and Training Benefits</a></li>
          <li><a href="https://www.va.gov/education/about-gi-bill-benefits/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline">About GI Bill® Benefits</a></li>
          <li><a href="https://www.va.gov/school-finding/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline">VA School Comparison Tool</a></li>
          <li><a href="https://www.benefits.va.gov/GIBILL/Principles_of_Excellence.asp" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline">Principles of Excellence</a></li>
        </ul>
        <p className="text-sm text-gray-500">Source: U.S. Department of Veterans Affairs (va.gov). Last verified: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}. Always verify current benefit information directly with the VA.</p>
      </div>
    ),
    ctaText: 'TALK WITH AN ADVISOR',
    ctaHref: 'book-consultation',
  },
  'yellow-ribbon': {
    eyebrow: 'YELLOW RIBBON PROGRAM',
    headline: 'Yellow Ribbon Program: Questions to Ask a School',
    subheadline: 'The Yellow Ribbon Program may help eligible students with tuition costs. Eligibility is determined by the VA.',
    children: (
      <div className="space-y-6">
        <p>The Yellow Ribbon Program is a provision that can help eligible students attending participating schools. The VA determines eligibility, and participating schools set their own contribution amounts.</p>
        <h3 className="text-xl font-heading font-bold">Questions to Ask Schools</h3>
        <ul className="ml-6 space-y-3 list-disc">
          <li>Does your institution participate in the Yellow Ribbon Program?</li>
          <li>How many students are accepted under the program each year?</li>
          <li>What is the school's contribution amount per year?</li>
          <li>Does the program cover my specific degree program?</li>
        </ul>
        <p><a href="https://www.va.gov/education/yellow-ribbon-program/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline">Official VA Yellow Ribbon Program Information</a></p>
        <p className="text-sm text-gray-500">Source: U.S. Department of Veterans Affairs. Last verified: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}.</p>
      </div>
    ),
    ctaText: 'COMPARE MY OPTIONS',
    ctaHref: 'program-comparison',
  },
  'vre': {
    eyebrow: 'VR&E / CHAPTER 31',
    headline: 'Veteran Readiness & Employment (VR&E) Education Planning',
    subheadline: 'VR&E (Chapter 31) helps eligible veterans with service-connected disabilities prepare for, find, and maintain suitable employment.',
    children: (
      <div className="space-y-6">
        <p>Veteran Readiness & Employment (VR&E), formerly called Vocational Rehabilitation, helps eligible veterans with service-connected disabilities. The program may include education and training, vocational assessment, and employment services.</p>
        <h3 className="text-xl font-heading font-bold">What VR&E May Include</h3>
        <ul className="ml-6 space-y-3 list-disc">
          <li>Comprehensive evaluation to determine abilities and goals</li>
          <li>Vocational exploration and planning</li>
          <li>Education and training (including on-the-job and apprenticeship)</li>
          <li>Employment services and job-seeking support</li>
        </ul>
        <p><a href="https://www.va.gov/education/about-vre-program/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline">Official VR&E Program Information</a></p>
        <p className="text-sm text-gray-500">Source: U.S. Department of Veterans Affairs. Eligibility determined by the VA. Last verified: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}.</p>
      </div>
    ),
    ctaText: 'TALK WITH AN ADVISOR',
    ctaHref: 'book-consultation',
  },
  'cost-planning': {
    eyebrow: 'COST PLANNING',
    headline: 'Education Cost Planning for Veterans',
    subheadline: 'Understand total degree cost: tuition, fees, living expenses, and benefit verification.',
    children: (
      <div className="space-y-6">
        <p>Understanding the total cost of a degree is critical. Beyond tuition, consider fees, books, housing, transportation, and opportunity cost.</p>
        <ul className="ml-6 space-y-3 list-disc">
          <li>Tuition per credit hour and total program credits</li>
          <li>Mandatory fees (technology, lab, student activity)</li>
          <li>Books and materials</li>
          <li>Housing and living expenses</li>
          <li>Program length (months to completion)</li>
          <li>Transfer credit impact on total cost</li>
        </ul>
        <p>VA education benefits may offset some costs, but eligibility and amounts are determined by the VA.</p>
      </div>
    ),
    ctaText: 'START MY ASSESSMENT',
    ctaHref: 'assessment',
  },
  'military-transfer-credit': {
    eyebrow: 'MILITARY EXPERIENCE',
    headline: 'Your Previous Experience May Matter',
    subheadline: 'Institutions establish their own policies regarding military training and transfer credit.',
    children: (
      <div className="space-y-6">
        <p>Your military training and experience may translate into college credit, but each institution sets its own transfer-credit policy.</p>
        <h3 className="text-xl font-heading font-bold">Questions to Ask Schools</h3>
        <ul className="ml-6 space-y-3 list-disc">
          <li>Do you accept <a href="https://jst.doded.mil/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline">Joint Services Transcript (JST)</a>?</li>
          <li>How are military training and courses evaluated?</li>
          <li>Do you offer prior learning assessment (PLA)?</li>
          <li>What are your residency requirements?</li>
          <li>Is there a maximum transfer credits accepted?</li>
        </ul>
      </div>
    ),
    ctaText: 'TALK WITH AN ADVISOR',
    ctaHref: 'book-consultation',
  },
  'choosing-a-school': {
    eyebrow: 'SCHOOL SELECTION',
    headline: 'Choosing the Right School as a Veteran',
    subheadline: 'Compare schools by degree fit, accreditation, program approval, cost, and veteran services.',
    children: (
      <div className="space-y-6">
        <ul className="ml-6 space-y-3 list-disc">
          <li><strong>Degree fit:</strong> Does the program align with your career goals?</li>
          <li><strong>Accreditation:</strong> Is the institution regionally or nationally accredited?</li>
          <li><strong>Program approval:</strong> Is the specific program approved for VA benefits?</li>
          <li><strong>Delivery format:</strong> Online, hybrid, or on-campus?</li>
          <li><strong>Total estimated cost:</strong> Tuition, fees, and living expenses?</li>
          <li><strong>Transfer-credit policy:</strong> Will your prior credits transfer?</li>
          <li><strong>Veteran services:</strong> Is there a dedicated veteran services office?</li>
          <li><strong>Career alignment:</strong> Do graduates find jobs in your field?</li>
        </ul>
        <p><a href="https://www.va.gov/school-finding/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline">Use the VA School Comparison Tool</a></p>
      </div>
    ),
    ctaText: 'COMPARE MY OPTIONS',
    ctaHref: 'program-comparison',
  },
  'program-comparison': {
    eyebrow: 'PROGRAM COMPARISON',
    headline: 'Compare Veteran Education Programs',
    subheadline: 'Side-by-side comparison framework for veterans.',
    children: (
      <div className="space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left p-2">Criteria</th>
                <th className="text-left p-2">Program A</th>
                <th className="text-left p-2">Program B</th>
                <th className="text-left p-2">Program C</th>
              </tr>
            </thead>
            <tbody>
              {['Degree type', 'Delivery format', 'Total credits', 'Tuition per credit', 'Total estimated cost', 'Transfer credits accepted', 'Program length', 'Accreditation', 'VA-approved?', 'Veteran services'].map((row) => (
                <tr key={row} className="border-b border-gray-200">
                  <td className="p-2 font-medium">{row}</td>
                  <td className="p-2 text-gray-400">—</td>
                  <td className="p-2 text-gray-400">—</td>
                  <td className="p-2 text-gray-400">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    ctaText: 'START MY ASSESSMENT',
    ctaHref: 'assessment',
  },
  'resources': {
    eyebrow: 'RESOURCE CENTER',
    headline: 'Veteran Education Resource Center',
    subheadline: 'Browse veteran education guides covering college comparison, VA benefits, transfer credit, and degree planning.',
    children: (
      <div className="space-y-4">
        {[
          'How to Compare Colleges as a Veteran',
          'Questions Veterans Should Ask Before Choosing a Degree',
          'Understanding VA Education Benefits: Where to Start',
          'Yellow Ribbon Program: Questions to Ask a School',
          'VR&E Education Planning: Official Resources to Review',
          'Military Transcripts and Transfer Credit: What to Ask',
          "Bachelor's Degree Completion Planning for Veterans",
          "MBA vs Specialized Master's: A Veteran's Planning Guide",
          'Online vs Hybrid Degrees: Questions to Compare',
          'Veteran Degree Planning Checklist',
          'How to Compare Total Degree Cost',
          'What to Ask a School Certifying Official',
        ].map((title) => (
          <div key={title} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-heading font-semibold text-[#061846]">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">UCSG Editorial Team</p>
            <button
              className="mt-3 text-sm text-[#0874F9] hover:underline font-medium"
              onClick={() => track.ctaClick({ cta_type: 'resource_read', cta_source: 'veteran_resources', cta_text: title })}
            >
              Read Guide →
            </button>
          </div>
        ))}
      </div>
    ),
    ctaText: 'START MY ASSESSMENT',
    ctaHref: 'assessment',
  },
  'events': {
    eyebrow: 'WORKSHOPS & EVENTS',
    headline: 'Veteran Education Workshops & Events',
    subheadline: 'Attend the YOUR NEXT MISSION: EDUCATION workshop.',
    children: (
      <div className="space-y-8">
        <div className="bg-gradient-to-br from-[#061846] to-[#092B68] rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-heading font-bold text-[#D6A84B]">YOUR NEXT MISSION: EDUCATION</h3>
          <p className="text-lg mt-2">Veteran Degree & Education Planning Workshop</p>
          <p className="text-white/70 mt-4">A structured session covering degree options, education benefits, transfer credit, and school selection.</p>
          <button
            className="mt-6 bg-[#0874F9] hover:bg-[#0660D4] text-white font-medium px-6 py-3 rounded-lg transition-colors"
            onClick={() => window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'veterans', id: 'assessment' } }))}
          >
            REGISTER FOR NEXT WORKSHOP
          </button>
        </div>
        <p className="text-center text-gray-500">Upcoming workshop dates will be announced here.</p>
      </div>
    ),
    ctaText: 'REGISTER FOR WORKSHOP',
    ctaHref: 'assessment',
  },
  'faq': {
    eyebrow: 'FAQ',
    headline: 'Veteran Education FAQ',
    subheadline: 'Answers to common questions about veteran education planning.',
    children: (
      <div className="space-y-6">
        {[
          { q: 'Does UCSG determine if I\'m eligible for VA education benefits?', a: 'No. VA education benefit eligibility is determined by the U.S. Department of Veterans Affairs.' },
          { q: 'Can UCSG guarantee that my military credits will transfer?', a: 'No. Each institution sets its own transfer-credit policy.' },
          { q: 'Is UCSG affiliated with the VA or Department of Defense?', a: 'No. UCSG is an independent education consulting organization.' },
          { q: 'Does UCSG charge for the veteran assessment?', a: 'The veteran degree assessment is free. No enrollment commitment is required.' },
          { q: 'Should I bring my DD-214 to the assessment?', a: 'No. We do not request, collect, or store DD-214 forms, SSN, disability ratings, or VA claim numbers.' },
        ].map((faq, i) => (
          <div key={i} className="border-b border-gray-200 pb-4">
            <h3 className="font-heading font-semibold text-[#061846] text-lg">{faq.q}</h3>
            <p className="mt-2 text-gray-600">{faq.a}</p>
          </div>
        ))}
      </div>
    ),
    ctaText: 'START MY ASSESSMENT',
    ctaHref: 'assessment',
  },
  'book-consultation': {
    eyebrow: 'BOOK A CONSULTATION',
    headline: 'Book a Veteran Education Consultation',
    subheadline: 'Discuss your degree goals and next steps with an education advisor. Free, no obligation.',
    children: (
      <div className="space-y-6">
        <div className="bg-[#EDF5FF] rounded-xl p-8 text-center">
          <p className="text-lg font-heading font-semibold text-[#061846]">Ready to talk?</p>
          <p className="text-gray-600 mt-2">Click below to open the booking calendar.</p>
          <button
            className="mt-4 bg-[#0874F9] hover:bg-[#0660D4] text-white font-medium px-8 py-3 rounded-lg transition-colors"
            onClick={() => window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'contact' } }))}
          >
            OPEN BOOKING CALENDAR
          </button>
        </div>
      </div>
    ),
    ctaText: 'TAKE THE ASSESSMENT FIRST',
    ctaHref: 'assessment',
  },
};

// Separate component for book-consultation (needs useEffect to auto-open calendar)
function BookConsultationView({ content }: { content: typeof INFO_PAGE_CONTENT[string] }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'contact' } }));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <VeteranInfoPage
      eyebrow={content.eyebrow}
      headline={content.headline}
      subheadline={content.subheadline}
      ctaText={content.ctaText}
      ctaHref={content.ctaHref}
    >
      {content.children}
    </VeteranInfoPage>
  );
}

export default function VeteranSlugView({ slug }: { slug: string }) {
  // Degree path pages have dedicated components
  if (slug === 'bachelors-degree') return <VeteranBachelorsPage />;
  if (slug === 'masters-mba') return <VeteranMastersPage />;
  if (slug === 'doctoral-degrees') return <VeteranDoctoralPage />;
  if (slug === 'online-hybrid-degrees') return <VeteranOnlineHybridPage />;
  if (slug === 'assessment') return <VeteranAssessmentForm />;

  // All other pages use the shared VeteranInfoPage layout
  const content = INFO_PAGE_CONTENT[slug];
  if (!content) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-heading font-bold text-[#061846]">Page Not Found</h1>
        <p className="mt-4 text-gray-600">This veteran education page does not exist.</p>
      </div>
    );
  }

  // book-consultation auto-opens the booking calendar
  if (slug === 'book-consultation') {
    return <BookConsultationView content={content} />;
  }

  return (
    <VeteranInfoPage
      eyebrow={content.eyebrow}
      headline={content.headline}
      subheadline={content.subheadline}
      ctaText={content.ctaText}
      ctaHref={content.ctaHref}
    >
      {content.children}
    </VeteranInfoPage>
  );
}
