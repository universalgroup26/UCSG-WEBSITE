'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import VeteranBachelorsPage from '@/components/pages/veteran/VeteranBachelorsPage';
import VeteranMastersPage from '@/components/pages/veteran/VeteranMastersPage';
import VeteranOnlineHybridPage from '@/components/pages/veteran/VeteranOnlineHybridPage';
import VeteranAssessmentForm from '@/components/pages/veteran/VeteranAssessmentForm';
import VeteranInfoPage from '@/components/pages/veteran/VeteranInfoPage';
import { track } from '@/lib/analytics';

/* ------------------------------------------------------------------ */
/*  Shared reveal animation                                           */
/* ------------------------------------------------------------------ */
const reveal = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

/* ------------------------------------------------------------------ */
/*  Small inline helpers used across INFO_PAGE_CONTENT                 */
/* ------------------------------------------------------------------ */
function navTo(id: string) {
  return () =>
    window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'veterans', id } }));
}

function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-heading text-2xl font-bold text-[#061846] mt-2 scroll-mt-24">
      {children}
    </h2>
  );
}

function Lead({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-gray-600 leading-relaxed">{children}</p>;
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#EDF5FF] border-l-4 border-[#0874F9] p-4 sm:p-5 rounded-r-lg">
      {children}
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it} className="flex gap-2 text-gray-700">
          <span className="text-[#0874F9] font-bold shrink-0" aria-hidden="true">
            ✓
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Steps({ items }: { items: { title: string; body: React.ReactNode }[] }) {
  return (
    <div className="space-y-5">
      {items.map((step, i) => (
        <div key={step.title} className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0874F9] text-white font-bold">
            {i + 1}
          </div>
          <div className="pt-1">
            <h3 className="font-heading font-semibold text-[#061846]">{step.title}</h3>
            <div className="mt-1 text-gray-600 leading-relaxed">{step.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Faq({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details key={i} className="group rounded-lg border border-gray-200 bg-white p-4 open:bg-[#F8FBFF]">
          <summary className="cursor-pointer list-none font-heading font-semibold text-[#061846] flex items-start justify-between gap-3">
            <span>{item.q}</span>
            <span className="text-[#0874F9] font-bold text-lg leading-none" aria-hidden="true">
              +
            </span>
          </summary>
          <div className="mt-3 text-gray-600 leading-relaxed">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

function InternalLink({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={navTo(id)}
      className="text-[#0874F9] hover:underline font-medium"
    >
      {children}
    </button>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">{children}</div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <motion.div {...reveal} className="space-y-3">
      {children}
    </motion.div>
  );
}

function SourceNote({ children }: { children?: React.ReactNode }) {
  return (
    <p className="text-xs text-gray-500">
      Source: U.S. Department of Veterans Affairs (va.gov). Last verified:{' '}
      {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}. Always verify
      current benefit information directly with the VA.{' '}
      {children ?? null}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero images                                                       */
/* ------------------------------------------------------------------ */
const CAMPUS_IMG = '/images/hero-veteran-campus.jpg?v=1';
const PLAN_IMG = '/images/hero-veteran-plan.jpg?v=1';
const FUTURE_IMG = '/images/hero-veteran-future.jpg?v=1';

/* ------------------------------------------------------------------ */
/*  INFO_PAGE_CONTENT — expanded body for each veteran sub-page       */
/* ------------------------------------------------------------------ */
const INFO_PAGE_CONTENT: Record<string, {
  eyebrow: string;
  headline: string;
  subheadline: string;
  children: React.ReactNode;
  ctaText: string;
  ctaHref: string;
  heroImage?: string;
}> = {
  /* ============================================================= */
  /* 1. DEGREE-PLANNING                                            */
  /* ============================================================= */
  'degree-planning': {
    heroImage: CAMPUS_IMG,
    eyebrow: 'VETERAN DEGREE PLANNING',
    headline: 'Build a Clear Plan for Your Next Degree',
    subheadline:
      'Review your education background, compare verified program information, understand costs, and select your next step with a structured veteran education roadmap.',
    children: (
      <Body>
        <Section>
          <p className="text-gray-700 leading-relaxed">
            <strong>Veteran degree planning</strong> is the structured process of mapping your
            military experience, prior coursework, career goals, and life constraints to a specific
            degree path at an accredited institution. A clear degree plan for veterans helps you
            avoid wasted credits, identify the right delivery format (online, hybrid, or on-campus),
            and align your education with the VA benefits you may be entitled to. UCSG&apos;s
            veteran education roadmap walks you through each phase — from goal clarification to
            application submission — without pressuring you toward any specific school or program.
          </p>
          <Lead>
            Every veteran&apos;s education journey is different. Some want to finish a
            bachelor&apos;s degree they started years ago. Others are looking at a master&apos;s
            degree or MBA to pivot careers. Still others need a fully online program that fits a
            civilian job or family obligations. The six-step process below is designed to surface
            the right answer for <em>your</em> situation.
          </Lead>
          <Callout>
            <p className="text-sm text-[#061846]">
              UCSG is an independent education consulting organization. We do not determine VA
              benefit eligibility, guarantee admission, guarantee transfer credit, or guarantee
              employment outcomes. Always verify program details directly with the institution and
              with the VA.
            </p>
          </Callout>
        </Section>

        <Section>
          <H2 id="six-step-process">The Six-Step Veteran Degree Planning Process</H2>
          <Lead>
            Use this sequence as a veteran education roadmap. Each step builds on the previous one
            — skipping a step (especially goal-setting) is the most common reason veterans end up
            with credits that don&apos;t transfer or programs that don&apos;t fit.
          </Lead>
          <Steps
            items={[
              {
                title: 'Clarify Your Academic & Career Goal',
                body: (
                  <span>
                    Write a one-sentence goal: &quot;I want to earn a [degree] in [field] so I can
                    work as [role].&quot; If you can&apos;t fill in all three blanks, start with
                    career research before choosing a degree. UCSG&apos;s free veteran degree
                    assessment helps you articulate this goal in 15 minutes.
                  </span>
                ),
              },
              {
                title: 'Review Prior Learning & Military Experience',
                body: (
                  <span>
                    Request your{' '}
                    <a
                      href="https://jst.doded.mil/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0874F9] hover:underline"
                    >
                      Joint Services Transcript (JST)
                    </a>{' '}
                    and any prior college transcripts. Make a list of completed courses, MOS/AFSC
                    training, professional certifications, and CLEP/DSST exams already passed. This
                    is the raw material that determines how much of your degree is already done.
                  </span>
                ),
              },
              {
                title: 'Compare Accredited Programs',
                body: (
                  <span>
                    Shortlist 3–5 institutions offering the degree you want. Compare accreditation
                    (regional vs. national), delivery format, total credits required, and transfer
                    policy. Use the VA&apos;s{' '}
                    <a
                      href="https://www.va.gov/school-finding/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0874F9] hover:underline"
                    >
                      School Comparison Tool
                    </a>{' '}
                    to confirm VA approval status.
                  </span>
                ),
              },
              {
                title: 'Understand Total Estimated Cost',
                body: (
                  <span>
                    Build a side-by-side cost worksheet that includes tuition, fees, books,
                    housing, and program length — not just the per-credit rate. Subtract any VA
                    education benefits you <em>may</em> be eligible for (the VA determines
                    eligibility). See our{' '}
                    <InternalLink id="cost-planning">cost planning guide</InternalLink> for a
                    template.
                  </span>
                ),
              },
              {
                title: 'Select Your Format &amp; Path',
                body: (
                  <span>
                    Choose online, hybrid, or on-campus; full-time or part-time; cohort or
                    self-paced. Match the format to your work schedule, family obligations, and
                    learning style. Compare with our{' '}
                    <InternalLink id="online-hybrid-degrees">online &amp; hybrid degree guide</InternalLink>.
                  </span>
                ),
              },
              {
                title: 'Plan Application & Enrollment Steps',
                body: (
                  <span>
                    Build a calendar of application deadlines, transcript submission windows,
                    FAFSA opening dates, and benefit certification timelines. Most VA benefit
                    paperwork takes 4–8 weeks to process — start early. Talk with the
                    institution&apos;s School Certifying Official (SCO) before enrollment.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="degree-types-comparison">Comparison of Degree Types</H2>
          <Lead>
            Use this matrix to align your career goal with the right degree level. Each level has
            different time, cost, and prerequisite expectations.
          </Lead>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#061846] text-white">
                  <th className="text-left p-3">Degree Level</th>
                  <th className="text-left p-3">Typical Credits</th>
                  <th className="text-left p-3">Typical Length</th>
                  <th className="text-left p-3">Best Fit When</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">Associate</td>
                  <td className="p-3">~60</td>
                  <td className="p-3">~2 years full-time</td>
                  <td className="p-3">Building a foundation or transferring to a 4-year program</td>
                </tr>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">Bachelor&apos;s</td>
                  <td className="p-3">~120</td>
                  <td className="p-3">~4 years (less with transfer credit)</td>
                  <td className="p-3">Entering or re-entering a civilian career that requires a 4-year degree</td>
                </tr>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">Master&apos;s / MBA</td>
                  <td className="p-3">~30–60</td>
                  <td className="p-3">~1–2 years</td>
                  <td className="p-3">Pivoting careers or moving into management after some civilian work experience</td>
                </tr>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">Doctoral / Professional</td>
                  <td className="p-3">Varies widely</td>
                  <td className="p-3">~3–7 years</td>
                  <td className="p-3">Specialized research, teaching, or licensed professional practice</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">Undergraduate Certificate</td>
                  <td className="p-3">~12–30</td>
                  <td className="p-3">~6 months–1 year</td>
                  <td className="p-3">Targeted skill-building or stacking toward a degree</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Credit totals and program lengths vary by institution and program. Confirm with each
            school directly.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <InternalLink id="bachelors-degree">Bachelor&apos;s &amp; degree completion options →</InternalLink>
            <span className="text-gray-300">|</span>
            <InternalLink id="masters-mba">Master&apos;s &amp; MBA planning →</InternalLink>
            <span className="text-gray-300">|</span>
            <InternalLink id="online-hybrid-degrees">Online &amp; hybrid formats →</InternalLink>
          </div>
        </Section>

        <Section>
          <H2 id="questions-dso">Questions to Ask Your DSO or School Certifying Official</H2>
          <Lead>
            A Designated School Official (DSO) for F-1 students or a School Certifying Official
            (SCO) for VA benefits handles the paperwork that connects your benefits to your
            enrollment. Bring these questions to your first conversation.
          </Lead>
          <CheckList
            items={[
              'Which specific programs at your institution are approved for VA education benefits?',
              'How long does it take to certify my enrollment once I register?',
              'What happens to my certification if I drop a class or change programs mid-term?',
              'How do you report enrollment changes to the VA — and how quickly?',
              'Do you participate in the Yellow Ribbon Program? If so, what is the contribution amount?',
              'What is your institution\'s policy on tuition refunds if I withdraw using VA benefits?',
              'Who is my single point of contact for VA benefit paperwork?',
              'Do you have a dedicated veteran services office, and what services does it provide?',
            ]}
          />
        </Section>

        <Section>
          <H2 id="documents-to-gather">Documents to Gather Before You Apply</H2>
          <Lead>
            You do <strong>not</strong> need to bring your DD-214, Social Security Number, VA claim
            number, disability rating, or medical records to a UCSG planning conversation. For your
            own school applications and VA paperwork, the items below are typically required.
          </Lead>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">For institution applications</h3>
              <ul className="mt-2 ml-4 list-disc text-sm text-gray-700 space-y-1">
                <li>Prior college transcripts (official)</li>
                <li>JST transcript (Joint Services Transcript)</li>
                <li>High school diploma or GED (if no prior college)</li>
                <li>Standardized test scores, if required</li>
                <li>Resume or statement of purpose (graduate programs)</li>
                <li>Application fee payment</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">For VA benefit paperwork</h3>
              <ul className="mt-2 ml-4 list-disc text-sm text-gray-700 space-y-1">
                <li>DD-214 (only for direct VA submission — UCSG never requests this)</li>
                <li>VA Certificate of Eligibility (COE)</li>
                <li>School-provided enrollment certification (handled by SCO)</li>
                <li>Direct deposit information (VA only)</li>
                <li>Dependent information for transfer-of-entitlement cases</li>
              </ul>
            </div>
          </div>
          <Callout>
            <p className="text-sm text-[#061846]">
              UCSG&apos;s veteran degree planning process and our free assessment do{' '}
              <strong>not</strong> request, collect, or store DD-214 forms, SSN, VA claim numbers,
              disability ratings, or medical/bank information. Those are submitted directly to the
              VA or to your chosen institution.
            </p>
          </Callout>
        </Section>

        <Section>
          <H2 id="faq">Frequently Asked Questions</H2>
          <Faq
            items={[
              {
                q: 'How is UCSG\'s veteran degree planning different from a college advisor?',
                a: (
                  <span>
                    A college advisor works for one institution and recommends that
                    institution&apos;s programs. UCSG is independent — we help you compare across
                    institutions and choose based on fit, not on enrollment quotas. We do not
                    receive commissions from schools and do not push you toward any specific
                    program.
                  </span>
                ),
              },
              {
                q: 'Will UCSG guarantee my credits will transfer?',
                a: (
                  <span>
                    No. Each institution sets its own transfer-credit policy. UCSG helps you ask
                    the right questions, request the right transcripts (including the JST), and
                    compare policies — but the final decision rests with the receiving
                    institution&apos;s registrar and academic department.
                  </span>
                ),
              },
              {
                q: 'How long does the planning process take?',
                a: (
                  <span>
                    A first conversation typically runs 30–45 minutes. Building a complete degree
                    plan with 3–5 school comparisons usually takes 1–2 weeks of part-time effort,
                    depending on how quickly institutions respond and how quickly you receive your
                    JST and prior transcripts.
                  </span>
                ),
              },
              {
                q: 'Can UCSG help me use my GI Bill® benefits?',
                a: (
                  <span>
                    UCSG does not determine, process, or guarantee GI Bill® benefits. We help you
                    understand where to find official information at va.gov/education and what
                    questions to ask your School Certifying Official. The VA makes all eligibility
                    and payment decisions. See our{' '}
                    <InternalLink id="education-benefits">education benefits guide</InternalLink>.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="next-steps">Next Steps</H2>
          <Lead>Ready to begin? Use these internal links to move forward:</Lead>
          <div className="flex flex-wrap gap-3 mt-2">
            <InternalLink id="assessment">Take the free veteran degree assessment →</InternalLink>
            <span className="text-gray-300">|</span>
            <InternalLink id="program-comparison">Compare programs side-by-side →</InternalLink>
            <span className="text-gray-300">|</span>
            <InternalLink id="choosing-a-school">Review school selection framework →</InternalLink>
          </div>
        </Section>
      </Body>
    ),
    ctaText: 'START MY DEGREE ASSESSMENT',
    ctaHref: 'assessment',
  },

  /* ============================================================= */
  /* 2. EDUCATION-BENEFITS                                          */
  /* ============================================================= */
  'education-benefits': {
    heroImage: PLAN_IMG,
    eyebrow: 'EDUCATION BENEFITS',
    headline: 'Understand the Resources Before Making a Decision',
    subheadline:
      'Benefit eligibility and payments are determined by the appropriate government agency, not UCSG. We help you find official information.',
    children: (
      <Body>
        <Section>
          <p className="text-gray-700 leading-relaxed">
            <strong>VA education benefits</strong> can help eligible veterans, service members, and
            qualified family members cover tuition, fees, housing, books, and in some cases
            on-the-job training or apprenticeship costs. The U.S. Department of Veterans Affairs
            determines all eligibility, entitlement, and payment decisions — not UCSG. This
            veteran education benefits guide points you to official sources, the questions to ask
            the VA, and the steps to apply.
          </p>
          <Lead>
            Several different programs exist under the umbrella commonly called &quot;the GI
            Bill.&quot; Each has different eligibility rules, payment structures, and use-by dates.
            Understanding the differences before you commit to a program helps you avoid surprises
            later — for example, discovering a benefit doesn&apos;t cover the format you chose, or
            that you&apos;re past the delimiting date.
          </Lead>
          <Callout>
            <p className="text-sm text-[#061846]">
              UCSG is not affiliated with, endorsed by, or sponsored by the U.S. Department of
              Veterans Affairs, the Department of Defense, or any branch of the U.S. Armed Forces.
              Use of &quot;GI Bill®&quot; is a registered trademark of the U.S. Department of
              Veterans Affairs; UCSG makes no claim of affiliation.
            </p>
          </Callout>
        </Section>

        <Section>
          <H2 id="benefit-programs">Benefit Programs at a Glance</H2>
          <Lead>
            The table below summarizes the main VA education benefit programs. Always confirm
            current rules and amounts at va.gov/education.
          </Lead>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#061846] text-white">
                  <th className="text-left p-3">Program</th>
                  <th className="text-left p-3">Chapter</th>
                  <th className="text-left p-3">General Purpose</th>
                  <th className="text-left p-3">Official Source</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">Post-9/11 GI Bill®</td>
                  <td className="p-3">Chapter 33</td>
                  <td className="p-3">Tuition, fees, housing, books for veterans with qualifying post-9/11 service</td>
                  <td className="p-3">
                    <a href="https://www.va.gov/education/about-gi-bill-benefits/post-9-11-gi-bill/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline">va.gov</a>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">Montgomery GI Bill® (MGIB)</td>
                  <td className="p-3">Chapter 30</td>
                  <td className="p-3">Monthly education benefit for veterans with qualifying active-duty service and contributions</td>
                  <td className="p-3">
                    <a href="https://www.va.gov/education/about-gi-bill-benefits/montgomery-gi-bill/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline">va.gov</a>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">VR&amp;E</td>
                  <td className="p-3">Chapter 31</td>
                  <td className="p-3">Veteran Readiness &amp; Employment for veterans with service-connected disabilities</td>
                  <td className="p-3">
                    <a href="https://www.va.gov/education/about-vre-program/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline">va.gov</a>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">DEA (Survivors &amp; Dependents)</td>
                  <td className="p-3">Chapter 35</td>
                  <td className="p-3">Education and training for eligible dependents and survivors</td>
                  <td className="p-3">
                    <a href="https://www.va.gov/education/survivor-dependent-benefits/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline">va.gov</a>
                  </td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">Yellow Ribbon Program</td>
                  <td className="p-3">Part of Ch. 33</td>
                  <td className="p-3">Helps cover tuition above the Post-9/11 national maximum at participating schools</td>
                  <td className="p-3">
                    <a href="https://www.va.gov/education/yellow-ribbon-program/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline">va.gov</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Eligibility, payment rates, and use-by dates are set by the VA and change periodically.
            Always confirm current rules at va.gov/education.
          </p>
          <div className="mt-4">
            <InternalLink id="yellow-ribbon">Read our Yellow Ribbon Program guide →</InternalLink>
            <span className="mx-2 text-gray-300">|</span>
            <InternalLink id="vre">Read our VR&amp;E (Chapter 31) guide →</InternalLink>
          </div>
        </Section>

        <Section>
          <H2 id="how-to-apply">How to Apply — Step by Step</H2>
          <Lead>
            The VA application process varies slightly by program, but the broad sequence below
            applies to most VA education benefits.
          </Lead>
          <Steps
            items={[
              {
                title: 'Confirm your eligibility category',
                body: (
                  <span>
                    Review the eligibility criteria on va.gov/education for the specific program
                    (Chapter 33, 30, 31, or 35). The VA — not UCSG — determines eligibility.
                  </span>
                ),
              },
              {
                title: 'Gather your service documentation',
                body: (
                  <span>
                    This typically includes your DD-214 (which you submit directly to the VA — UCSG
                    does not collect this), service dates, and dependent information if applicable.
                    Apply through the VA&apos;s eBenefits portal or VA.gov.
                  </span>
                ),
              },
              {
                title: 'Submit your application to the VA',
                body: (
                  <span>
                    Most applications can be completed online at va.gov/education/apply-for-education-benefits.
                    The VA issues a Certificate of Eligibility (COE) once your application is
                    approved — keep this document.
                  </span>
                ),
              },
              {
                title: 'Take your COE to your School Certifying Official',
                body: (
                  <span>
                    Once you register for classes at an approved institution, hand your COE to the
                    SCO so they can certify your enrollment to the VA. This is what triggers tuition
                    payment and (where applicable) housing allowance.
                  </span>
                ),
              },
              {
                title: 'Verify enrollment as required',
                body: (
                  <span>
                    Some programs require monthly enrollment verification (e.g., Post-9/11 GI Bill
                    for online-only students). Verify on time to avoid payment delays.
                  </span>
                ),
              },
              {
                title: 'Report any enrollment changes immediately',
                body: (
                  <span>
                    If you drop a class, change programs, withdraw, or graduate, tell your SCO right
                    away. Delays can result in overpayments that the VA will recoup.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="questions-va">Questions to Ask the VA</H2>
          <Lead>
            Call the VA Education Service at 1-888-442-4551 or use the Ask VA tool at va.gov. These
            questions help clarify your specific situation.
          </Lead>
          <CheckList
            items={[
              'Which education benefit program am I currently eligible for?',
              'How much entitlement do I have remaining (in months)?',
              'What is my delimiting date — the deadline by which I must use my benefit?',
              'Am I eligible to transfer entitlement to a spouse or dependent? If so, what is the process?',
              'Does my benefit cover the specific program format I\'m considering (online, hybrid, on-campus)?',
              'Will my housing allowance change based on my enrollment intensity (full-time vs. part-time)?',
              'Am I eligible for the Yellow Ribbon Program?',
              'What happens to my benefit if I change programs or transfer schools mid-degree?',
            ]}
          />
        </Section>

        <Section>
          <H2 id="faq">Frequently Asked Questions</H2>
          <Faq
            items={[
              {
                q: 'Can UCSG tell me whether I qualify for the Post-9/11 GI Bill®?',
                a: (
                  <span>
                    No. Eligibility is determined solely by the VA. UCSG points you to the official
                    eligibility criteria at va.gov/education and helps you prepare the questions to
                    ask the VA — but we do not make eligibility determinations.
                  </span>
                ),
              },
              {
                q: 'How much will my GI Bill® pay per month?',
                a: (
                  <span>
                    Payment rates vary by program, enrollment intensity, school type, and (for
                    Post-9/11) the ZIP code of your school. Current rates are published at
                    va.gov/education and updated annually. UCSG does not quote VA payment amounts.
                  </span>
                ),
              },
              {
                q: 'Can I use my GI Bill® benefits for an online degree?',
                a: (
                  <span>
                    Yes — Post-9/11 GI Bill® benefits can be used at approved online programs, with
                    a different housing allowance structure than on-campus enrollment. Confirm
                    current rules and the program&apos;s approval status with the VA and your
                    institution&apos;s SCO before enrolling.
                  </span>
                ),
              },
              {
                q: 'What if I have benefits under more than one program?',
                a: (
                  <span>
                    The VA has rules for using multiple benefits (you generally cannot receive
                    benefits from two programs for the same courses simultaneously). The VA makes
                    the final determination on which benefit applies — discuss your specific case
                    with the VA Education Service. See our{' '}
                    <InternalLink id="vre">VR&amp;E vs Post-9/11 comparison</InternalLink>.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="official-resources">Official Resources</H2>
          <Lead>Start with these official VA sources before reading third-party guides.</Lead>
          <ul className="ml-6 space-y-3 list-disc text-gray-700">
            <li>
              <a href="https://www.va.gov/education/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline font-medium">VA Education and Training Benefits</a> — main hub for all VA education programs.
            </li>
            <li>
              <a href="https://www.va.gov/education/about-gi-bill-benefits/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline font-medium">About GI Bill® Benefits</a> — overview of the Post-9/11 and Montgomery GI Bill®.
            </li>
            <li>
              <a href="https://www.va.gov/school-finding/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline font-medium">VA School Comparison Tool</a> — check whether a school and program are VA-approved.
            </li>
            <li>
              <a href="https://www.va.gov/education/yellow-ribbon-program/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline font-medium">Yellow Ribbon Program</a> — official program information.
            </li>
            <li>
              <a href="https://www.va.gov/education/about-vre-program/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline font-medium">VR&amp;E (Chapter 31)</a> — official Veteran Readiness &amp; Employment program page.
            </li>
            <li>
              <a href="https://www.benefits.va.gov/GIBILL/Principles_of_Excellence.asp" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline font-medium">Principles of Excellence</a> — VA program that recognizes institutions committed to veteran student success.
            </li>
          </ul>
          <SourceNote />
        </Section>
      </Body>
    ),
    ctaText: 'TALK WITH AN ADVISOR',
    ctaHref: 'book-consultation',
  },

  /* ============================================================= */
  /* 3. YELLOW-RIBBON                                                */
  /* ============================================================= */
  'yellow-ribbon': {
    heroImage: PLAN_IMG,
    eyebrow: 'YELLOW RIBBON PROGRAM',
    headline: 'Yellow Ribbon Program: What Veterans Should Know',
    subheadline:
      'The Yellow Ribbon Program may help eligible students with tuition costs at participating schools. The VA determines eligibility.',
    children: (
      <Body>
        <Section>
          <p className="text-gray-700 leading-relaxed">
            The <strong>Yellow Ribbon Program</strong> is a provision of the Post-9/11 GI Bill®
            (Chapter 33) that can help cover tuition and fees above the annual national maximum at
            participating degree-granting institutions. The VA determines eligibility; participating
            schools set their own contribution amounts and the number of students they accept each
            year. This page explains how the program works, who is eligible, the questions to ask
            schools, and how participating vs. non-participating schools compare.
          </p>
          <Lead>
            Yellow Ribbon is not a separate benefit — it&apos;s a partnership between the VA and
            the school. The school contributes a fixed dollar amount; the VA matches that amount,
            dollar-for-dollar, up to the remaining balance of tuition and fees (or up to the
            school&apos;s annual cap on Yellow Ribbon funds, whichever comes first).
          </Lead>
          <Callout>
            <p className="text-sm text-[#061846]">
              UCSG does not determine Yellow Ribbon eligibility, contribution amounts, or school
              participation. Always verify current program details at{' '}
              <a
                href="https://www.va.gov/education/yellow-ribbon-program/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0874F9] hover:underline"
              >
                va.gov/education/yellow-ribbon-program
              </a>
              .
            </p>
          </Callout>
        </Section>

        <Section>
          <H2 id="what-yellow-ribbon-is-not">What Yellow Ribbon Is — and What It Is Not</H2>
          <Lead>
            Before diving into mechanics, it&apos;s worth clarifying common misconceptions. The
            Yellow Ribbon Program is often confused with a guaranteed full-ride scholarship —
            it is not.
          </Lead>
          <CheckList
            items={[
              'Yellow Ribbon is a provision of the Post-9/11 GI Bill® (Chapter 33) — not a separate benefit, and not available under the Montgomery GI Bill® (Chapter 30)',
              'Participation is voluntary for schools — many regionally accredited institutions participate, but not all',
              'Contribution amounts and slot counts are set by each school, not by the VA',
              'It only applies when tuition and fees exceed the Post-9/11 national maximum for that academic year',
              'It does not cover non-tuition costs like housing, transportation, or personal expenses',
              'Yellow Ribbon slots are limited and typically first-come, first-served — applying early matters',
              'Even at participating schools, you may not receive a slot if annual limits are already reached',
            ]}
          />
          <Callout>
            <p className="text-sm text-[#061846]">
              Confirm current Yellow Ribbon participation, contribution amounts, and slot
              availability directly with the institution&apos;s School Certifying Official — and
              verify your personal entitlement at the VA. UCSG does not administer or guarantee
              Yellow Ribbon participation.
            </p>
          </Callout>
        </Section>

        <Section>
          <H2 id="how-it-works">How the Yellow Ribbon Program Works</H2>
          <Lead>The Yellow Ribbon Program operates as a matched contribution:</Lead>
          <Steps
            items={[
              {
                title: 'You enroll at a participating institution',
                body: (
                  <span>
                    Only institutions that have signed a Yellow Ribbon agreement with the VA
                    participate. Participation is voluntary and renewed annually — confirm with
                    the school each academic year.
                  </span>
                ),
              },
              {
                title: 'The school contributes a fixed amount',
                body: (
                  <span>
                    The institution sets its own per-student contribution amount and the maximum
                    number of students per academic year. These limits are published in the VA&apos;s
                    Yellow Ribbon school search tool.
                  </span>
                ),
              },
              {
                title: 'The VA matches the school\'s contribution',
                body: (
                  <span>
                    The VA matches dollar-for-dollar up to the remaining tuition and fee balance,
                    or up to the school&apos;s annual cap — whichever is reached first.
                  </span>
                ),
              },
              {
                title: 'You must be entitled at the 100% level',
                body: (
                  <span>
                    Yellow Ribbon is generally available only to veterans and dependents entitled
                    at the 100% Post-9/11 GI Bill® rate. The VA determines your entitlement
                    percentage.
                  </span>
                ),
              },
              {
                title: 'Funds are first-come, first-served',
                body: (
                  <span>
                    Once a school&apos;s annual slots are filled, no additional students are
                    accepted for that year — even if you are otherwise eligible. Apply and enroll
                    early in the school&apos;s cycle.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="who-is-eligible">Who Is Eligible</H2>
          <Lead>
            Eligibility is determined by the VA, not by UCSG or by the school. The general categories
            below are a starting point — confirm your specific eligibility with the VA.
          </Lead>
          <CheckList
            items={[
              'Veterans entitled at the 100% Post-9/11 GI Bill® rate (the VA determines this)',
              'Service members entitled at the 100% Post-9/11 rate (with certain limitations — confirm with the VA)',
              'Spouses or dependents receiving transferred Post-9/11 entitlement (with limitations)',
              'Survivors/dependents under the Fry Scholarship (Chapter 33) in some cases — confirm with VA',
              'Active-duty service members and their spouses typically are not eligible for the housing or Yellow Ribbon portions — confirm with VA',
            ]}
          />
          <p className="text-xs text-gray-500 mt-3">
            Eligibility rules can change. Confirm current rules at va.gov/education/yellow-ribbon-program.
          </p>
        </Section>

        <Section>
          <H2 id="comparison">Participating vs. Non-Participating Schools</H2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#061846] text-white">
                  <th className="text-left p-3">Factor</th>
                  <th className="text-left p-3">Participating School</th>
                  <th className="text-left p-3">Non-Participating School</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">Yellow Ribbon available?</td>
                  <td className="p-3">Yes — for eligible students above the national cap</td>
                  <td className="p-3">No — student is responsible for any tuition above the cap</td>
                </tr>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">School contribution</td>
                  <td className="p-3">School-defined; published in VA Yellow Ribbon tool</td>
                  <td className="p-3">N/A</td>
                </tr>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">VA match</td>
                  <td className="p-3">Dollar-for-dollar up to remaining balance or annual cap</td>
                  <td className="p-3">N/A</td>
                </tr>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">Annual slot limits</td>
                  <td className="p-3">School-defined; first-come, first-served</td>
                  <td className="p-3">N/A</td>
                </tr>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">Out-of-pocket risk</td>
                  <td className="p-3">Lower (but not zero — depends on caps and slot availability)</td>
                  <td className="p-3">Higher if tuition exceeds the Post-9/11 national maximum</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">Who decides?</td>
                  <td className="p-3">VA + school jointly</td>
                  <td className="p-3">Student responsible for difference</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            The Post-9/11 national maximum changes annually — confirm the current cap at va.gov.
          </p>
        </Section>

        <Section>
          <H2 id="questions-schools">Questions to Ask Schools</H2>
          <Lead>
            Bring these questions to your admissions and School Certifying Official (SCO)
            conversations. Get answers in writing where possible.
          </Lead>
          <CheckList
            items={[
              'Does your institution currently participate in the Yellow Ribbon Program for the upcoming academic year?',
              'What is the annual contribution amount per student at your institution?',
              'How many Yellow Ribbon slots does the institution offer per academic year?',
              'Does the Yellow Ribbon contribution apply to my specific degree program (undergraduate, graduate, professional)?',
              'Are Yellow Ribbon slots awarded first-come, first-served, or do you use a different allocation method?',
              'Once I am awarded a Yellow Ribbon slot, is it renewable for subsequent years, or do I need to re-apply annually?',
              'What happens if I lose eligibility mid-year — am I responsible for the remaining balance?',
              'How does Yellow Ribbon interact with your institution\'s institutional scholarships or tuition discounts for veterans?',
            ]}
          />
        </Section>

        <Section>
          <H2 id="faq">Frequently Asked Questions</H2>
          <Faq
            items={[
              {
                q: 'Will every school that participates in Yellow Ribbon cover my full tuition?',
                a: (
                  <span>
                    Not necessarily. The school sets both the contribution amount and the annual
                    slot count. If tuition exceeds the combined Post-9/11 national maximum + school
                    contribution + VA match, you remain responsible for the difference.
                  </span>
                ),
              },
              {
                q: 'Can I receive Yellow Ribbon at an online-only program?',
                a: (
                  <span>
                    Yellow Ribbon eligibility depends on program approval, institution
                    participation, and your VA-determined entitlement. Confirm with the VA and
                    the institution directly — UCSG does not make program-level determinations.
                  </span>
                ),
              },
              {
                q: 'Is Yellow Ribbon guaranteed for the entire length of my program?',
                a: (
                  <span>
                    Generally, participation is renewed annually by the school and the VA. Slots
                    are not guaranteed beyond the current academic year. Ask the school about
                    renewal policy and confirm annually with the VA.
                  </span>
                ),
              },
              {
                q: 'Does UCSG help me apply for Yellow Ribbon?',
                a: (
                  <span>
                    UCSG helps you identify participating schools and prepare the questions to ask
                    your SCO. We do not administer or guarantee Yellow Ribbon participation — the VA
                    and the school jointly handle the program. See our{' '}
                    <InternalLink id="education-benefits">education benefits guide</InternalLink>{' '}
                    for the broader VA education benefits landscape.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="official-source">Official Source</H2>
          <p>
            <a
              href="https://www.va.gov/education/yellow-ribbon-program/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0874F9] hover:underline font-medium"
            >
              Official VA Yellow Ribbon Program Information →
            </a>
          </p>
          <SourceNote />
        </Section>
      </Body>
    ),
    ctaText: 'COMPARE MY OPTIONS',
    ctaHref: 'program-comparison',
  },

  /* ============================================================= */
  /* 4. VRE                                                         */
  /* ============================================================= */
  'vre': {
    heroImage: PLAN_IMG,
    eyebrow: 'VR&E / CHAPTER 31',
    headline: 'Veteran Readiness & Employment (VR&E) Education Planning',
    subheadline:
      'VR&E (Chapter 31) helps eligible veterans with service-connected disabilities prepare for, find, and maintain suitable employment.',
    children: (
      <Body>
        <Section>
          <p className="text-gray-700 leading-relaxed">
            <strong>Veteran Readiness &amp; Employment (VR&amp;E)</strong>, formerly called
            Vocational Rehabilitation, is the VA program (Chapter 31) that helps eligible veterans
            with service-connected disabilities prepare for, find, and maintain suitable employment
            — or, where employment is not feasible, achieve independence in daily living. The program
            may include comprehensive evaluation, vocational exploration, education and training,
            on-the-job training, apprenticeships, and employment services.
          </p>
          <Lead>
            If you have a service-connected disability rating and an employment handicap, VR&amp;E
            may cover tuition, fees, books, supplies, and (in some cases) a monthly subsistence
            allowance. The VA determines eligibility and approves a customized rehabilitation plan.
          </Lead>
          <Callout>
            <p className="text-sm text-[#061846]">
              UCSG does not determine VR&amp;E eligibility, approve rehabilitation plans, or
              guarantee VR&amp;E funding. Always confirm current program details at{' '}
              <a
                href="https://www.va.gov/education/about-vre-program/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0874F9] hover:underline"
              >
                va.gov/education/about-vre-program
              </a>
              .
            </p>
          </Callout>
        </Section>

        <Section>
          <H2 id="who-qualifies">Who Qualifies for VR&amp;E</H2>
          <Lead>
            Eligibility is determined by the VA. The general categories below are a starting
            point — confirm your specific eligibility with the VA Regional Office or your VA
            Vocational Rehabilitation Counselor (VRC).
          </Lead>
          <CheckList
            items={[
              'Veterans with a service-connected disability rating of at least 10% (VA determines the rating)',
              'Veterans who received an other-than-dishonorable discharge (VA makes the formal determination)',
              'Veterans within the basic period of eligibility (generally 12 years from the date of separation or notification of the rating)',
              'Veterans whose disability creates an employment handicap (the VA evaluates this)',
              'Service members pending separation who may be eligible in limited circumstances — confirm with VA',
            ]}
          />
          <p className="text-xs text-gray-500 mt-3">
            Time limits and extension rules can change — confirm current rules with the VA.
          </p>
        </Section>

        <Section>
          <H2 id="services-included">What Services Are Included</H2>
          <Lead>
            VR&amp;E is structured around five tracks. The VA assigns a track based on your
            evaluation and rehabilitation plan.
          </Lead>
          <div className="grid gap-4 sm:grid-cols-2 mt-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Reemployment Track</h3>
              <p className="text-sm text-gray-600 mt-1">Help returning to a former employer with reasonable accommodations.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Rapid Access to Employment</h3>
              <p className="text-sm text-gray-600 mt-1">For veterans with transferable skills who need help finding work.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Self-Employment</h3>
              <p className="text-sm text-gray-600 mt-1">For veterans whose disabilities make traditional employment challenging.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Employment Through Long-Term Services</h3>
              <p className="text-sm text-gray-600 mt-1">Includes education, on-the-job training, and apprenticeships.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4 sm:col-span-2">
              <h3 className="font-heading font-semibold text-[#061846]">Independent Living Services</h3>
              <p className="text-sm text-gray-600 mt-1">For veterans whose disabilities make employment infeasible; focuses on independence in daily living.</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Track assignment is made by the VA. UCSG does not determine track selection.
          </p>
        </Section>

        <Section>
          <H2 id="how-to-apply">How to Apply</H2>
          <Steps
            items={[
              {
                title: 'Confirm basic eligibility',
                body: (
                  <span>
                    Verify your service-connected disability rating and discharge status with the
                    VA before applying. The VA makes the formal eligibility determination.
                  </span>
                ),
              },
              {
                title: 'Submit your application',
                body: (
                  <span>
                    Apply online at va.gov/education/about-vre-program or contact your regional VA
                    office. You can also submit VA Form 28-8832 (Application for Vocational
                    Rehabilitation).
                  </span>
                ),
              },
              {
                title: 'Attend a comprehensive evaluation',
                body: (
                  <span>
                    A Vocational Rehabilitation Counselor (VRC) evaluates your interests,
                    aptitudes, abilities, transferable skills, and the impact of your
                    service-connected disabilities on employment.
                  </span>
                ),
              },
              {
                title: 'Co-develop your rehabilitation plan',
                body: (
                  <span>
                    If found entitled, you and the VRC develop an Individualized Written
                    Rehabilitation Plan (IWRP) that specifies your training objective, services,
                    and timeline.
                  </span>
                ),
              },
              {
                title: 'Enroll in approved training or education',
                body: (
                  <span>
                    Only VA-approved programs and institutions are eligible. Your VRC must approve
                    your school, program, and enrollment before classes begin.
                  </span>
                ),
              },
              {
                title: 'Maintain progress and re-evaluate as needed',
                body: (
                  <span>
                    The VA tracks your academic progress. Report changes in enrollment, program, or
                    disability status to your VRC immediately.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="vre-vs-post911">VR&amp;E vs. Post-9/11 GI Bill®</H2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#061846] text-white">
                  <th className="text-left p-3">Factor</th>
                  <th className="text-left p-3">VR&amp;E (Chapter 31)</th>
                  <th className="text-left p-3">Post-9/11 GI Bill® (Chapter 33)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">Primary purpose</td>
                  <td className="p-3">Employment readiness for veterans with service-connected disabilities</td>
                  <td className="p-3">Education benefit for veterans with qualifying post-9/11 service</td>
                </tr>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">Eligibility basis</td>
                  <td className="p-3">Service-connected disability + employment handicap</td>
                  <td className="p-3">Length and characterization of qualifying post-9/11 service</td>
                </tr>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">Tuition &amp; fees</td>
                  <td className="p-3">Generally fully covered for VA-approved programs</td>
                  <td className="p-3">Up to the national maximum per academic year</td>
                </tr>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">Monthly housing</td>
                  <td className="p-3">Monthly subsistence allowance (VA-determined rate)</td>
                  <td className="p-3">Monthly housing allowance based on school ZIP code</td>
                </tr>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">Books &amp; supplies</td>
                  <td className="p-3">Generally covered as part of the rehabilitation plan</td>
                  <td className="p-3">Annual books &amp; supplies stipend</td>
                </tr>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">Plan approval</td>
                  <td className="p-3">VRC must approve the program &amp; enrollment</td>
                  <td className="p-3">SCO certifies enrollment to VA</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">Who decides?</td>
                  <td className="p-3">VA Vocational Rehabilitation Counselor</td>
                  <td className="p-3">VA Education Service</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Both programs are administered by the VA. UCSG does not determine eligibility, rates,
            or coverage for either program.
          </p>
        </Section>

        <Section>
          <H2 id="faq">Frequently Asked Questions</H2>
          <Faq
            items={[
              {
                q: 'Can I use VR&E and the Post-9/11 GI Bill® at the same time?',
                a: (
                  <span>
                    Generally you cannot receive benefits from both programs simultaneously for the
                    same courses. The VA determines which benefit applies and may require an election
                    between programs. Discuss your specific case with the VA — UCSG does not make
                    this determination.
                  </span>
                ),
              },
              {
                q: 'Does UCSG approve VR&E rehabilitation plans?',
                a: (
                  <span>
                    No. Only the VA, through your Vocational Rehabilitation Counselor, approves
                    rehabilitation plans, training objectives, and enrollment. UCSG helps you
                    prepare for the conversation and ask the right questions — but is not a party
                    to the plan.
                  </span>
                ),
              },
              {
                q: 'What if I disagree with the VA\'s VR&E eligibility decision?',
                a: (
                  <span>
                    The VA has a formal appeals process for eligibility and other determinations.
                    Details are at va.gov. UCSG is not a representative in VA appeals — we
                    recommend contacting a Veterans Service Organization (VSO) for representation.
                  </span>
                ),
              },
              {
                q: 'Does UCSG help me choose between VR&E and the Post-9/11 GI Bill®?',
                a: (
                  <span>
                    UCSG helps you understand the differences and prepare the questions to ask the
                    VA — but we do not make the election for you. The VA determines your eligibility
                    for each program; you (with VA guidance) decide which to use. See our{' '}
                    <InternalLink id="education-benefits">education benefits guide</InternalLink>{' '}
                    for more.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="official-source">Official Source</H2>
          <p>
            <a
              href="https://www.va.gov/education/about-vre-program/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0874F9] hover:underline font-medium"
            >
              Official VR&amp;E Program Information →
            </a>
          </p>
          <SourceNote />
        </Section>
      </Body>
    ),
    ctaText: 'TALK WITH AN ADVISOR',
    ctaHref: 'book-consultation',
  },

  /* ============================================================= */
  /* 5. COST-PLANNING                                                */
  /* ============================================================= */
  'cost-planning': {
    heroImage: PLAN_IMG,
    eyebrow: 'COST PLANNING',
    headline: 'Education Cost Planning for Veterans',
    subheadline:
      'Understand total degree cost: tuition, fees, living expenses, and benefit verification — beyond the per-credit rate.',
    children: (
      <Body>
        <Section>
          <p className="text-gray-700 leading-relaxed">
            <strong>Veteran education cost planning</strong> means looking beyond the per-credit
            tuition rate. The true cost of a degree includes tuition, mandatory fees, books and
            supplies, housing and living expenses, transportation, and the opportunity cost of
            time in school. This page gives you a college cost planning framework, a cost breakdown
            template you can copy, hidden-cost watchlists, and step-by-step instructions for
            comparing total degree cost across institutions.
          </p>
          <Lead>
            VA education benefits may offset some costs for eligible veterans — but the VA
            determines benefit eligibility, payment amounts, and program approval status. UCSG does
            not quote VA payment rates.
          </Lead>
          <Callout>
            <p className="text-sm text-[#061846]">
              Tuition is only one component of total degree cost. Always model the full cost
              picture before choosing a program — and always verify program details and pricing
              directly with the institution.
            </p>
          </Callout>
        </Section>

        <Section>
          <H2 id="cost-breakdown-template">Cost Breakdown Template</H2>
          <Lead>
            Copy this template into a spreadsheet for each program you are comparing. Fill in the
            institution-provided numbers; leave rows blank where they don&apos;t apply.
          </Lead>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#061846] text-white">
                  <th className="text-left p-3">Cost Component</th>
                  <th className="text-left p-3">Per Term</th>
                  <th className="text-left p-3">Per Year</th>
                  <th className="text-left p-3">Full Program</th>
                </tr>
              </thead>
              <tbody>
                {[
                  'Tuition (credit hours × rate)',
                  'Mandatory fees (technology, lab, student activity)',
                  'Books & supplies',
                  'Course materials & software',
                  'Housing / rent',
                  'Utilities & internet',
                  'Food / groceries',
                  'Transportation (commute or relocation)',
                  'Childcare or dependent care',
                  'Health insurance (if not covered)',
                  'Exam / certification fees',
                  'Graduation & diploma fees',
                  'Total estimated cost',
                ].map((row, idx, arr) => (
                  <tr key={row} className={`border-b border-gray-200 ${idx % 2 === 1 ? 'bg-gray-50' : ''} ${idx === arr.length - 1 ? 'font-bold text-[#061846]' : ''}`}>
                    <td className="p-3">{row}</td>
                    <td className="p-3 text-gray-400">$________</td>
                    <td className="p-3 text-gray-400">$________</td>
                    <td className="p-3 text-gray-400">$________</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Actual costs vary by institution, program, and location. Confirm pricing directly with
            each institution&apos;s bursar or financial aid office.
          </p>
        </Section>

        <Section>
          <H2 id="hidden-costs">Hidden Costs to Consider</H2>
          <Lead>
            Per-credit tuition often hides costs that don&apos;t appear in marketing materials.
            Watch for these:
          </Lead>
          <CheckList
            items={[
              'Mandatory fees that scale with credit hours (technology, lab, distance-learning, graduation fees)',
              'Residency requirements that force relocation or on-campus residencies',
              'Cohort lock-step scheduling that extends time-to-completion if you miss one term',
              'Re-take fees for failed courses that push total credits above the published program length',
              'Software subscriptions required for specific courses (e.g., design, statistics, project management)',
              'Proctored exam fees, certification exam fees, or licensure application fees',
              'Opportunity cost: lost wages or delayed civilian career progression while enrolled',
              'Health insurance if your civilian employer plan doesn\'t cover students',
              'Childcare or dependent care during class and study time',
              'Travel to mandatory on-campus sessions or residencies in hybrid programs',
            ]}
          />
        </Section>

        <Section>
          <H2 id="financial-aid-resources">Financial Aid Resources for Veterans</H2>
          <Lead>
            Beyond VA education benefits, several official resources can help lower your net cost.
          </Lead>
          <ul className="ml-6 space-y-3 list-disc text-gray-700">
            <li>
              <a href="https://studentaid.gov/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline font-medium">Federal Student Aid (FAFSA)</a> — many veterans qualify for federal grants and loans; completing the FAFSA is required by most institutions.
            </li>
            <li>
              <a href="https://www.va.gov/education/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline font-medium">VA Education Benefits</a> — the VA determines eligibility for Post-9/11, MGIB, VR&amp;E, Yellow Ribbon, and DEA.
            </li>
            <li>
              <a href="https://www.benefits.va.gov/GIBILL/Principles_of_Excellence.asp" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline font-medium">Principles of Excellence</a> — institutions that have committed to specific veteran-student protections.
            </li>
            <li>
              <a href="https://www.benefits.va.gov/VETERANS/jp.asp" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline font-medium">Edith Nourse Rogers STEM Scholarship</a> — for veterans who have used or are near the end of Post-9/11 entitlement in certain STEM fields (VA determines eligibility).
            </li>
            <li>
              <span className="font-medium">State veteran education benefits</span> — many states offer tuition waivers or reduced tuition at public institutions; check with your state Department of Veterans Affairs.
            </li>
            <li>
              <span className="font-medium">Institutional veteran scholarships &amp; discounts</span> — many schools offer their own veteran aid; ask the financial aid office and the veteran services office.
            </li>
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            UCSG does not administer any of these programs. Confirm eligibility and current terms
            with each program directly.
          </p>
        </Section>

        <Section>
          <H2 id="step-by-step">Step-by-Step Cost Comparison Process</H2>
          <Steps
            items={[
              {
                title: 'List 3–5 candidate programs',
                body: (
                  <span>
                    Pick programs you&apos;ve already vetted on accreditation and fit (see our{' '}
                    <InternalLink id="choosing-a-school">school selection guide</InternalLink>).
                    Don&apos;t add new candidates at this stage.
                  </span>
                ),
              },
              {
                title: 'Request official cost of attendance (COA) from each institution',
                body: (
                  <span>
                    The financial aid office publishes a COA each year — it includes tuition, fees,
                    books, housing, transportation, and personal expenses. Use this as your
                    starting point.
                  </span>
                ),
              },
              {
                title: 'Apply the cost breakdown template above to each program',
                body: (
                  <span>
                    Standardize the categories so you&apos;re comparing apples to apples. Note any
                    costs that appear in one program but not another.
                  </span>
                ),
              },
              {
                title: 'Estimate VA benefit contribution (without quoting VA rates)',
                body: (
                  <span>
                    Identify which VA education benefits you may be eligible for and note them in
                    the cost sheet. The VA determines actual eligibility and payment rates — do
                    not quote numbers from third-party sources.
                  </span>
                ),
              },
              {
                title: 'Apply for federal and institutional aid',
                body: (
                  <span>
                    File the FAFSA and apply to each institution&apos;s institutional aid
                    application by the deadline. Aid awards can change your net cost materially.
                  </span>
                ),
              },
              {
                title: 'Compare net cost (total minus confirmed aid) across programs',
                body: (
                  <span>
                    The lowest sticker tuition is rarely the lowest net cost. Compare after aid —
                    then factor in program length, format fit, and career alignment. See our{' '}
                    <InternalLink id="program-comparison">program comparison guide</InternalLink>.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="faq">Frequently Asked Questions</H2>
          <Faq
            items={[
              {
                q: 'Will UCSG quote specific tuition numbers or VA payment rates?',
                a: (
                  <span>
                    No. Tuition rates change annually and vary by program, residency, and delivery
                    format. VA payment rates are published at va.gov and updated annually. UCSG
                    shows you where to find official numbers and how to build a side-by-side
                    comparison — but we do not quote specific dollar amounts.
                  </span>
                ),
              },
              {
                q: 'Is the lowest-tuition program always the best financial choice?',
                a: (
                  <span>
                    No. A lower-tuition program may have higher fees, longer time-to-completion, or
                    weaker transfer-credit acceptance that increases your total cost. Compare total
                    net cost — including opportunity cost — not just the per-credit rate.
                  </span>
                ),
              },
              {
                q: 'How do I know if a program is approved for VA education benefits?',
                a: (
                  <span>
                    Use the VA&apos;s{' '}
                    <a href="https://www.va.gov/school-finding/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline">School Comparison Tool</a>{' '}
                    and confirm with the institution&apos;s School Certifying Official. Approval is
                    granted at the institution-and-program level, not at the student level.
                  </span>
                ),
              },
              {
                q: 'What if I have to retake a class — does VA cover it?',
                a: (
                  <span>
                    VA rules around repeating courses are specific and depend on the reason for
                    repetition (failure vs. grade improvement vs. program requirement). Confirm with
                    your SCO and the VA Education Service before retaking any course. UCSG does not
                    make coverage determinations.
                  </span>
                ),
              },
            ]}
          />
        </Section>
      </Body>
    ),
    ctaText: 'START MY ASSESSMENT',
    ctaHref: 'assessment',
  },

  /* ============================================================= */
  /* 6. MILITARY-TRANSFER-CREDIT                                     */
  /* ============================================================= */
  'military-transfer-credit': {
    heroImage: PLAN_IMG,
    eyebrow: 'MILITARY EXPERIENCE',
    headline: 'Military Transfer Credit: What Veterans Should Know',
    subheadline:
      'Your military training and experience may translate into college credit — but each institution sets its own transfer-credit policy.',
    children: (
      <Body>
        <Section>
          <p className="text-gray-700 leading-relaxed">
            <strong>Military transfer credit</strong> is the practice of converting your military
            training, MOS/AFSC/rating schools, professional certifications, and college courses
            completed during service into college credit at a civilian institution. The American
            Council on Education (ACE) publishes credit recommendations for military training, and
            most institutions accept the{' '}
            <a href="https://jst.doded.mil/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline">
              Joint Services Transcript (JST)
            </a>{' '}
            as the official record. But <strong>each institution sets its own transfer-credit
            policy</strong> — there is no guarantee that any specific course or training will
            transfer, or at what level.
          </p>
          <Lead>
            UCSG does not guarantee that military experience will translate into college credit at
            any institution. The receiving institution&apos;s registrar and academic departments
            make the final determination.
          </Lead>
          <Callout>
            <p className="text-sm text-[#061846]">
              Always request your JST and any prior college transcripts before applying. Submit
              official copies directly to each institution&apos;s admissions or registrar office
              for evaluation.
            </p>
          </Callout>
        </Section>

        <Section>
          <H2 id="what-is-jst">What Is the Joint Services Transcript (JST)?</H2>
          <Lead>
            The JST is the official transcript for Army, Navy, Marine Corps, and Coast Guard
            service members and veterans. It documents military courses, occupations, and ACE
            credit recommendations. The Air Force uses the Community College of the Air Force (CCAF)
            transcript for enlisted coursework.
          </Lead>
          <div className="grid gap-4 sm:grid-cols-2 mt-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">What the JST includes</h3>
              <ul className="mt-2 ml-4 list-disc text-sm text-gray-700 space-y-1">
                <li>Personal &amp; service information</li>
                <li>Military course completions with ACE credit recommendations</li>
                <li>Occupational experience with ACE recommendations</li>
                <li>Completed CLEP / DSST / certification exams</li>
                <li>Other learning experiences</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">What the JST does NOT include</h3>
              <ul className="mt-2 ml-4 list-disc text-sm text-gray-700 space-y-1">
                <li>College courses you took at a civilian institution (request separately)</li>
                <li>Clearance or classified training (not transcriptable)</li>
                <li>On-the-job training that has no ACE recommendation</li>
                <li>Skills without formal documentation</li>
                <li>Personal fitness / PT results</li>
              </ul>
            </div>
          </div>
        </Section>

        <Section>
          <H2 id="request-jst">How to Request Your JST</H2>
          <Steps
            items={[
              {
                title: 'Visit the official JST site',
                body: (
                  <span>
                    Go to{' '}
                    <a href="https://jst.doded.mil/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline">jst.doded.mil</a>{' '}
                    — the official Department of Defense JST portal. Do not use third-party
                    &quot;military transcript&quot; sites that charge fees.
                  </span>
                ),
              },
              {
                title: 'Create an account or log in with credentials',
                body: (
                  <span>
                    Use your DoD ID, branch of service, and personal information to verify your
                    identity. Veterans can typically access their JST indefinitely after
                    separation.
                  </span>
                ),
              },
              {
                title: 'Review your transcript for accuracy',
                body: (
                  <span>
                    Check that all your military courses, occupations, and completed exams are
                    listed. If something is missing, contact your branch&apos;s personnel or
                    education office to request corrections before submitting to a school.
                  </span>
                ),
              },
              {
                title: 'Send official JST to each institution',
                body: (
                  <span>
                    Use the &quot;Transcripts&quot; or &quot;Send Transcript&quot; function inside
                    the JST portal to designate receiving institutions. Most institutions require
                    an <em>official</em> electronic copy sent directly from JST — a printed PDF
                    you upload is often not accepted.
                  </span>
                ),
              },
              {
                title: 'Also request civilian college transcripts',
                body: (
                  <span>
                    If you took any college courses before or during service, request official
                    transcripts from each institution you attended. Many veterans forget
                    dual-enrollment, AP, or early-college credits from high school.
                  </span>
                ),
              },
              {
                title: 'Request CLEP / DSST score reports if applicable',
                body: (
                  <span>
                    CLEP scores are administered by College Board; DSST by Prometric. Request
                    official score reports sent directly to the receiving institution.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="questions-admissions">Questions to Ask Admissions</H2>
          <Lead>
            Bring these questions to your admissions counselor and the registrar&apos;s transfer
            credit evaluator. Get answers in writing.
          </Lead>
          <CheckList
            items={[
              'Do you accept the Joint Services Transcript (JST) as an official document?',
              'Do you grant credit based on ACE credit recommendations for military courses and occupations?',
              'Is there a maximum number of transfer credits you will accept toward a degree?',
              'How do you handle military credit — do you apply it to general education, electives, or major requirements?',
              'Do you accept credit from CLEP, DSST, or other challenge exams?',
              'Do you offer prior learning assessment (PLA) for non-classroom learning?',
              'What is your residency requirement — the minimum number of credits I must earn at your institution to graduate?',
              'How long does the transfer-credit evaluation take, and when will I receive an official credit transfer report?',
            ]}
          />
        </Section>

        <Section>
          <H2 id="credit-policies-comparison">Comparison of Credit Evaluation Policies</H2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#061846] text-white">
                  <th className="text-left p-3">Policy Area</th>
                  <th className="text-left p-3">Typical Liberal Policy</th>
                  <th className="text-left p-3">Typical Restrictive Policy</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">JST acceptance</td>
                  <td className="p-3">Official JST accepted as primary source</td>
                  <td className="p-3">JST reviewed course-by-course, partial acceptance</td>
                </tr>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">ACE recommendations</td>
                  <td className="p-3">Generally honored at recommended credit levels</td>
                  <td className="p-3">Departmental review required; may apply as elective only</td>
                </tr>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">Max transfer credits</td>
                  <td className="p-3">Up to 75–90 credits toward bachelor&apos;s</td>
                  <td className="p-3">Capped at 60 credits or fewer</td>
                </tr>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">Residency requirement</td>
                  <td className="p-3">25%–30% of credits at the institution</td>
                  <td className="p-3">50% or more of credits at the institution</td>
                </tr>
                <tr className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">CLEP / DSST</td>
                  <td className="p-3">Accepted for many general education requirements</td>
                  <td className="p-3">Limited or none accepted</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 font-semibold text-[#061846]">Prior Learning Assessment (PLA)</td>
                  <td className="p-3">Portfolio-based credit available for non-classroom learning</td>
                  <td className="p-3">No PLA program</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            These are common patterns only — each institution sets its own policy. Confirm with the
            registrar&apos;s office at each school.
          </p>
        </Section>

        <Section>
          <H2 id="pla-guide">Prior Learning Assessment (PLA) Guide</H2>
          <Lead>
            Prior Learning Assessment is a structured way for institutions to award credit for
            learning acquired outside the classroom — through work, military training, certifications,
            volunteer service, or self-study. Common PLA methods include:
          </Lead>
          <div className="grid gap-4 sm:grid-cols-2 mt-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Portfolio-based PLA</h3>
              <p className="text-sm text-gray-600 mt-1">
                You assemble a portfolio documenting college-level learning from experience, which
                faculty evaluate for credit. Most common at adult-focused institutions.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Exam-based PLA</h3>
              <p className="text-sm text-gray-600 mt-1">
                CLEP, DSST, AP, IB, and institutional challenge exams. Most transfer-friendly
                nationwide.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Certification-based PLA</h3>
              <p className="text-sm text-gray-600 mt-1">
                Industry certifications (e.g., CompTIA, PMI, Cisco, nursing credentials) mapped to
                course credit through ACE or institutional crosswalks.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Articulation agreements</h3>
              <p className="text-sm text-gray-600 mt-1">
                Formal transfer agreements between community colleges, military branches, and
                four-year institutions that pre-map credit equivalencies.
              </p>
            </div>
          </div>
        </Section>

        <Section>
          <H2 id="faq">Frequently Asked Questions</H2>
          <Faq
            items={[
              {
                q: 'Will my JST automatically transfer to every school?',
                a: (
                  <span>
                    No. The JST is the official transcript, but each institution decides what
                    credit (if any) to award. Some schools accept ACE recommendations broadly;
                    others review course-by-course. Always ask each institution&apos;s transfer
                    policy in writing.
                  </span>
                ),
              },
              {
                q: 'Does UCSG evaluate or award transfer credit?',
                a: (
                  <span>
                    No. UCSG is not a degree-granting institution and does not evaluate military
                    transcripts or award credit. We help you understand the process, gather the
                    right documents, and ask the right questions of the institution.
                  </span>
                ),
              },
              {
                q: 'How long does transfer-credit evaluation take?',
                a: (
                  <span>
                    Typically 2–6 weeks after the institution receives your official transcripts.
                    Submit transcripts early — ideally before enrollment — to know your actual
                    remaining credits before registering.
                  </span>
                ),
              },
              {
                q: 'Can I get credit for certifications I earned in the military?',
                a: (
                  <span>
                    Often yes — through ACE crosswalks or institutional PLA policies. Confirm with
                    each institution. Submit a copy of your certification to the registrar or
                    veteran services office for evaluation.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="official-source">Official Source</H2>
          <p>
            <a
              href="https://jst.doded.mil/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0874F9] hover:underline font-medium"
            >
              Joint Services Transcript (JST) — Official DoD Portal →
            </a>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Source: U.S. Department of Defense. ACE credit recommendations are published by the
            American Council on Education. Each institution determines whether to honor ACE
            recommendations.
          </p>
        </Section>
      </Body>
    ),
    ctaText: 'TALK WITH AN ADVISOR',
    ctaHref: 'book-consultation',
  },

  /* ============================================================= */
  /* 7. CHOOSING-A-SCHOOL                                            */
  /* ============================================================= */
  'choosing-a-school': {
    heroImage: PLAN_IMG,
    eyebrow: 'SCHOOL SELECTION',
    headline: 'Choosing the Right School as a Veteran',
    subheadline:
      'Compare schools across 10 factors — degree fit, accreditation, VA approval, cost, transfer policy, veteran services, and more.',
    children: (
      <Body>
        <Section>
          <p className="text-gray-700 leading-relaxed">
            <strong>Choosing a college as a veteran</strong> is different from choosing a college
            as a traditional 18-year-old. You bring transferable credits, military training, life
            experience, possibly a family or civilian job, and — often — VA education benefits that
            must be applied correctly. Veteran-friendly schools are those that have built
            infrastructure specifically for your situation: a dedicated veteran services office,
            School Certifying Officials on staff, and transfer-credit policies that honor military
            experience.
          </p>
          <Lead>
            The 10-factor framework below helps you cut through marketing materials and compare
            schools on what actually matters. Use it side-by-side with the VA&apos;s School
            Comparison Tool.
          </Lead>
          <Callout>
            <p className="text-sm text-[#061846]">
              Always verify a school&apos;s VA-approval status, accreditation, and program
              availability directly with the institution and the VA. UCSG does not endorse
              specific institutions.
            </p>
          </Callout>
        </Section>

        <Section>
          <H2 id="ten-factor-framework">The 10-Factor Comparison Framework</H2>
          <div className="space-y-5 mt-4">
            <div>
              <h3 className="font-heading font-semibold text-[#061846]">1. Degree Fit</h3>
              <p className="text-gray-600 mt-1">Does the school offer the exact degree and concentration you want? &quot;Close enough&quot; programs often lead to credit transfer issues or career misalignment later. Confirm the program title, CIP code, and curriculum map match your career goal.</p>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-[#061846]">2. Accreditation Type</h3>
              <p className="text-gray-600 mt-1">Regional accreditation is generally the most transfer-friendly and recognized by other institutions and graduate programs. National accreditation varies; programmatic accreditation (e.g., ABET, AACSB) matters for specific fields. Confirm accreditation type with the Council for Higher Education Accreditation (chea.org).</p>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-[#061846]">3. VA Program Approval</h3>
              <p className="text-gray-600 mt-1">VA approval is institution-and-program specific. A school may be approved for undergraduate programs but not for the specific graduate program you want. Use the VA&apos;s School Comparison Tool to confirm, then verify with the School Certifying Official (SCO).</p>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-[#061846]">4. Delivery Format</h3>
              <p className="text-gray-600 mt-1">Online, hybrid, or on-campus? Synchronous or asynchronous? Cohort or self-paced? Match the format to your work schedule, family obligations, and learning style. Some VA benefit structures differ by format — confirm with the SCO.</p>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-[#061846]">5. Total Estimated Cost</h3>
              <p className="text-gray-600 mt-1">Compare total cost of attendance — tuition, fees, books, housing — not just per-credit rate. Confirm pricing directly with the bursar&apos;s office. Use our <InternalLink id="cost-planning">cost planning template</InternalLink>.</p>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-[#061846]">6. Transfer-Credit Policy</h3>
              <p className="text-gray-600 mt-1">How many credits will transfer, and at what level? Ask specifically about JST, ACE recommendations, and prior learning assessment (PLA). Get the answer in writing — verbal estimates from admissions reps don&apos;t bind the registrar.</p>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-[#061846]">7. Veteran Services Office</h3>
              <p className="text-gray-600 mt-1">Is there a dedicated veteran services office with named staff? How quickly does the SCO process enrollment certifications? Are there veteran-specific orientations, peer mentoring, or study spaces?</p>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-[#061846]">8. Career Alignment &amp; Outcomes</h3>
              <p className="text-gray-600 mt-1">Ask the career services office about graduate placement in your target field. Don&apos;t accept vague claims — ask for programmatic outcome data by department. UCSG does not endorse specific outcome statistics.</p>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-[#061846]">9. Class Format &amp; Scheduling</h3>
              <p className="text-gray-600 mt-1">Term length (8-week, 12-week, 16-week)? Evening or weekend classes? Lock-step cohort or flexible pacing? These factors determine whether you can work full-time while enrolled.</p>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-[#061846]">10. Financial Aid &amp; Scholarships</h3>
              <p className="text-gray-600 mt-1">Does the school offer institutional veteran scholarships or tuition discounts? Is the school a Principles of Excellence signatory? Are Yellow Ribbon slots available for your program? Get the answers before enrollment.</p>
            </div>
          </div>
        </Section>

        <Section>
          <H2 id="red-flags">Red Flags to Watch For</H2>
          <Lead>
            These patterns suggest a school may not be a good fit for veteran students — investigate
            further before committing.
          </Lead>
          <CheckList
            items={[
              'High-pressure sales tactics, "enroll today or lose your seat" pressure',
              'Guarantees of specific job placement, salary, or benefit amounts',
              'Reluctance to put transfer-credit estimates in writing',
              'No dedicated veteran services office or named SCO',
              'Program not currently VA-approved (or status uncertain)',
              'Lack of programmatic accreditation in a field that requires it (health, business, engineering, law)',
              'Vague answers about total cost, fees, or time-to-completion',
              'Pushy enrollment reps who quote VA payment rates without verifying your eligibility',
              'Complaints on the VA\'s Feedback Tool or state attorney general sites',
              'No published outcomes data, or outcomes data that lumps all programs together',
            ]}
          />
        </Section>

        <Section>
          <H2 id="green-flags">Green Flags to Look For</H2>
          <CheckList
            items={[
              'Named veteran services staff with published contact information',
              'School Certifying Official available for a pre-enrollment conversation',
              'Published, written transfer-credit policy that explicitly mentions JST and ACE',
              'Signatory of the VA Principles of Excellence',
              'Yellow Ribbon participation with clear contribution amounts',
              'Active Student Veterans of America (SVA) chapter on campus',
              'Dedicated veteran orientation, peer mentoring, or tutoring',
              'Career services office with veteran-specific placement support',
              'Transparent cost-of-attendance breakdown available on request',
              'Regional accreditation (most transfer-friendly)',
            ]}
          />
        </Section>

        <Section>
          <H2 id="step-by-step">Step-by-Step School Selection Process</H2>
          <Steps
            items={[
              {
                title: 'Define your goal and non-negotiables',
                body: (
                  <span>
                    Write down your career goal, format preference (online/hybrid/on-campus),
                    budget ceiling, and start date. These constraints filter the universe of schools
                    immediately.
                  </span>
                ),
              },
              {
                title: 'Build a long list of 10–15 candidate schools',
                body: (
                  <span>
                    Use the VA School Comparison Tool, College Navigator (nces.ed.gov), and
                    referrals from your network. Include a mix of public, private, online, and
                    on-campus options.
                  </span>
                ),
              },
              {
                title: 'Filter to 5 using the 10-factor framework',
                body: (
                  <span>
                    Eliminate schools that fail on degree fit, accreditation, VA approval, or
                    format. Don&apos;t spend time evaluating costs at schools that fail on basics.
                  </span>
                ),
              },
              {
                title: 'Request official information from each shortlisted school',
                body: (
                  <span>
                    Ask for: cost of attendance, transfer-credit policy, VA program approval letter,
                    veteran services contact, and programmatic outcomes data. Get answers in
                    writing.
                  </span>
                ),
              },
              {
                title: 'Build a side-by-side comparison sheet',
                body: (
                  <span>
                    Use the matrix in our{' '}
                    <InternalLink id="program-comparison">program comparison guide</InternalLink> to
                    compare the 5 shortlisted schools on all 10 factors.
                  </span>
                ),
              },
              {
                title: 'Talk with 2–3 School Certifying Officials',
                body: (
                  <span>
                    Phone or video conversations with the SCO tell you more than marketing pages.
                    Ask about Yellow Ribbon availability, enrollment certification timelines, and
                    veteran-student support.
                  </span>
                ),
              },
              {
                title: 'Visit (in person or virtually) the top 2–3',
                body: (
                  <span>
                    For on-campus programs, visit. For online programs, ask for a demo of the
                    learning platform and a sample syllabus. Gut feel matters as much as data.
                  </span>
                ),
              },
              {
                title: 'Decide and apply',
                body: (
                  <span>
                    Pick one primary and one backup. Submit applications and transcripts early —
                    benefit certification takes 4–8 weeks after enrollment.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="faq">Frequently Asked Questions</H2>
          <Faq
            items={[
              {
                q: 'How can I tell if a school is truly veteran-friendly?',
                a: (
                  <span>
                    Look for a named veteran services office, a published School Certifying
                    Official contact, a written transfer-credit policy that explicitly mentions
                    JST and ACE, Yellow Ribbon participation, and a Student Veterans of America
                    (SVA) chapter. Also check the VA&apos;s Feedback Tool for complaint history.
                  </span>
                ),
              },
              {
                q: 'Should I prioritize regional or national accreditation?',
                a: (
                  <span>
                    For most students, regionally accredited institutions are more
                    transfer-friendly and more broadly recognized by graduate programs and
                    employers. Some nationally accredited institutions serve specific niches
                    (faith-based, vocational). Confirm accreditation type at chea.org and
                    consider your long-term education and career goals.
                  </span>
                ),
              },
              {
                q: 'Can UCSG recommend specific schools?',
                a: (
                  <span>
                    UCSG does not endorse or recommend specific institutions. We provide the
                    comparison framework, the questions to ask, and the official sources to verify
                    claims. Your selection should be based on your goals, constraints, and verified
                    data.
                  </span>
                ),
              },
              {
                q: 'What if I am choosing between an online and an on-campus program?',
                a: (
                  <span>
                    Read our <InternalLink id="online-hybrid-degrees">online &amp; hybrid degree guide</InternalLink>{' '}
                    for a side-by-side comparison. Consider VA housing allowance differences,
                    your work schedule, family obligations, and learning style. There is no
                    one-size-fits-all answer.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="official-source">Official Source</H2>
          <p>
            <a
              href="https://www.va.gov/school-finding/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0874F9] hover:underline font-medium"
            >
              Use the VA School Comparison Tool →
            </a>
          </p>
          <SourceNote />
        </Section>
      </Body>
    ),
    ctaText: 'COMPARE MY OPTIONS',
    ctaHref: 'program-comparison',
  },

  /* ============================================================= */
  /* 8. PROGRAM-COMPARISON                                           */
  /* ============================================================= */
  'program-comparison': {
    heroImage: PLAN_IMG,
    eyebrow: 'PROGRAM COMPARISON',
    headline: 'Compare Veteran Education Programs Side-by-Side',
    subheadline:
      'A structured comparison framework for veterans — built to cut through marketing materials and compare what actually matters.',
    children: (
      <Body>
        <Section>
          <p className="text-gray-700 leading-relaxed">
            A <strong>veteran college comparison</strong> is only as good as the criteria you use.
            This page gives you a single, expandable comparison matrix with the rows you actually
            need to evaluate a degree program — accreditation type, CIP code, delivery format,
            total credits, transfer policy, veteran services, and more. Fill it in for each program
            you are considering; the side-by-side view usually makes the right answer obvious.
          </p>
          <Lead>
            The matrix below is intentionally left blank. Use it as a template — copy the structure
            into your own spreadsheet and fill in the data directly from each institution&apos;s
            official sources.
          </Lead>
          <Callout>
            <p className="text-sm text-[#061846]">
              UCSG does not endorse specific programs or institutions. Confirm all data directly
              with each institution and the VA. Program details change — re-verify before
              enrollment.
            </p>
          </Callout>
        </Section>

        <Section>
          <H2 id="expanded-comparison-table">Expanded Program Comparison Table</H2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#061846] text-white">
                  <th className="text-left p-3">Criterion</th>
                  <th className="text-left p-3">Program A</th>
                  <th className="text-left p-3">Program B</th>
                  <th className="text-left p-3">Program C</th>
                </tr>
              </thead>
              <tbody>
                {[
                  'Institution name',
                  'Degree type & level',
                  'CIP code (Classification of Instructional Programs)',
                  'Accreditation type (regional / national / programmatic)',
                  'Delivery format (online / hybrid / on-campus)',
                  'Total credits required',
                  'Tuition per credit hour',
                  'Mandatory fees (per term)',
                  'Total estimated program cost',
                  'Transfer credits accepted (maximum)',
                  'JST / ACE credit acceptance',
                  'Program length (full-time vs part-time)',
                  'VA program approval status',
                  'Yellow Ribbon participation',
                  'Veteran services office',
                  'School Certifying Official (named contact)',
                  'Career outcomes / placement data',
                  'Application deadline (next cohort)',
                  'Start terms offered',
                  'Residency requirement (minimum credits at institution)',
                ].map((row, idx) => (
                  <tr key={row} className={`border-b border-gray-200 ${idx % 2 === 1 ? 'bg-gray-50' : ''}`}>
                    <td className="p-3 font-medium text-[#061846]">{row}</td>
                    <td className="p-3 text-gray-400">—</td>
                    <td className="p-3 text-gray-400">—</td>
                    <td className="p-3 text-gray-400">—</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            The CIP code is the National Center for Education Statistics&apos; taxonomic code that
            identifies the field of study. It helps you confirm you are comparing apples-to-apples
            programs across institutions.
          </p>
        </Section>

        <Section>
          <H2 id="common-pitfalls">Common Comparison Pitfalls</H2>
          <Lead>
            Even with a solid matrix, veterans sometimes compare programs in ways that produce
            misleading conclusions. Avoid these common pitfalls:
          </Lead>
          <CheckList
            items={[
              'Comparing sticker tuition instead of net cost after financial aid and VA benefits',
              'Ignoring residency requirements that force extra terms of enrollment',
              'Assuming transfer credits transfer at full value — some schools accept them only as electives',
              'Comparing programs at different credit-hour lengths without normalizing per credit',
              'Believing marketing-page outcome data without verifying with the career services office',
              'Forgetting to confirm CIP code alignment — similar program names can mean very different curricula',
              'Treating Yellow Ribbon participation as a guarantee — confirm slot availability before enrolling',
              'Overlooking format implications for VA housing allowance (online vs. on-campus structures differ)',
              'Underestimating opportunity cost — longer programs mean more time out of the civilian workforce',
              'Failing to confirm programmatic accreditation in fields where it matters (health, business, engineering, law)',
            ]}
          />
          <Callout>
            <p className="text-sm text-[#061846]">
              A comparison sheet is only as good as the official data behind it. If a school
              refuses to confirm a number in writing, treat the row as unknown and investigate
              further before enrolling.
            </p>
          </Callout>
        </Section>

        <Section>
          <H2 id="how-to-use">How to Use This Table</H2>
          <Steps
            items={[
              {
                title: 'Pre-fill the institution name and degree level',
                body: (
                  <span>
                    Decide on 3 programs (or up to 5) that already passed the 10-factor school
                    selection filter from our{' '}
                    <InternalLink id="choosing-a-school">choosing a school guide</InternalLink>.
                  </span>
                ),
              },
              {
                title: 'Find the CIP code from each institution\'s catalog',
                body: (
                  <span>
                    The CIP code is published in the institution&apos;s program catalog or on the
                    NCES College Navigator (nces.ed.gov/collegenavigator). CIP codes let you
                    confirm you are comparing the same field across schools.
                  </span>
                ),
              },
              {
                title: 'Verify accreditation type at chea.org or the U.S. Department of Education database',
                body: (
                  <span>
                    Note whether accreditation is regional (most transfer-friendly), national, or
                    programmatic (ABET, AACSB, CCNE, etc.). Programmatic accreditation matters in
                    fields that require licensure.
                  </span>
                ),
              },
              {
                title: 'Confirm VA program approval status with the VA School Comparison Tool',
                body: (
                  <span>
                    Use{' '}
                    <a href="https://www.va.gov/school-finding/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline">va.gov/school-finding</a>{' '}
                    and verify with each institution&apos;s School Certifying Official. Approval is
                    program-specific — don&apos;t assume.
                  </span>
                ),
              },
              {
                title: 'Get veteran services contact info in writing',
                body: (
                  <span>
                    Ask each institution for the name, email, and phone of the veteran services
                    coordinator and the SCO. Schools that can&apos;t name a contact person are a
                    red flag.
                  </span>
                ),
              },
              {
                title: 'Compare total estimated program cost — not per-credit rate',
                body: (
                  <span>
                    Use our{' '}
                    <InternalLink id="cost-planning">cost planning template</InternalLink> to
                    standardize the cost categories. Apply estimated VA benefit contribution
                    separately; the VA determines actual eligibility.
                  </span>
                ),
              },
              {
                title: 'Review career outcomes data by program — not institution-wide',
                body: (
                  <span>
                    Institution-wide employment stats hide wide variation between departments. Ask
                    the career services office for program-specific outcomes data. UCSG does not
                    endorse specific outcome statistics.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="faq">Frequently Asked Questions</H2>
          <Faq
            items={[
              {
                q: 'Why include the CIP code in the comparison?',
                a: (
                  <span>
                    The CIP code is a six-digit taxonomic identifier published by the National
                    Center for Education Statistics. Two programs with similar titles at different
                    schools may have different CIP codes — meaning different curricula,
                    accreditation, and VA approval status. Comparing CIP codes confirms you are
                    comparing equivalent programs.
                  </span>
                ),
              },
              {
                q: 'How do I know the data I\'m entering is accurate?',
                a: (
                  <span>
                    Verify every cell against an official source: the institution&apos;s catalog
                    (for CIP, credits, format), the bursar (for tuition and fees), the registrar
                    (for transfer policy), the VA School Comparison Tool (for VA approval), and the
                    career services office (for outcomes). Avoid marketing pages as primary
                    sources.
                  </span>
                ),
              },
              {
                q: 'Can UCSG fill in the comparison table for me?',
                a: (
                  <span>
                    UCSG&apos;s free veteran degree assessment gathers your goals and constraints
                    and helps you identify which institutions to compare — but we do not collect
                    live program data on your behalf. We give you the framework, the questions to
                    ask, and the official sources to verify. <InternalLink id="assessment">Start the assessment →</InternalLink>
                  </span>
                ),
              },
              {
                q: 'Should I compare more than 3 programs?',
                a: (
                  <span>
                    Comparing 3–5 programs is usually optimal. Fewer than 3 and you lack meaningful
                    contrast; more than 5 and the table becomes unwieldy. After the first pass,
                    drop the weakest two and deepen your research on the top 2–3.
                  </span>
                ),
              },
            ]}
          />
        </Section>
      </Body>
    ),
    ctaText: 'START MY ASSESSMENT',
    ctaHref: 'assessment',
  },

  /* ============================================================= */
  /* 9. RESOURCES                                                    */
  /* ============================================================= */
  'resources': {
    heroImage: FUTURE_IMG,
    eyebrow: 'RESOURCE CENTER',
    headline: 'Veteran Education Resource Center',
    subheadline:
      'Browse veteran education guides covering college comparison, VA benefits, transfer credit, degree planning, and cost planning — all linked to official sources.',
    children: (
      <Body>
        <Section>
          <p className="text-gray-700 leading-relaxed">
            The UCSG <strong>Veteran Education Resource Center</strong> organizes our published
            guides by category. Every guide links back to the relevant official VA or DoD source so
            you can verify what you read. We do not publish benefit amounts, eligibility
            determinations, or program-specific success statistics — those are set by the VA, the
            institution, or the appropriate government agency.
          </p>
          <Lead>
            Use the category descriptions below to find the guide you need, then jump to the
            expanded article cards further down the page.
          </Lead>
        </Section>

        <Section>
          <H2 id="categories">Resource Categories</H2>
          <div className="grid gap-4 sm:grid-cols-2 mt-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Degree Planning</h3>
              <p className="text-sm text-gray-600 mt-1">Roadmaps, planning processes, and questions to ask your DSO before choosing a program.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">VA Education Benefits</h3>
              <p className="text-sm text-gray-600 mt-1">Where to find official information on Post-9/11 GI Bill®, MGIB, VR&amp;E, and the Yellow Ribbon Program.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Transfer Credit</h3>
              <p className="text-sm text-gray-600 mt-1">JST transcripts, ACE recommendations, prior learning assessment, and questions for admissions.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">School Selection</h3>
              <p className="text-sm text-gray-600 mt-1">10-factor framework, red and green flags, and step-by-step school selection.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Cost Planning</h3>
              <p className="text-sm text-gray-600 mt-1">Cost breakdown template, hidden costs, and financial aid resources for veterans.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Program Comparison</h3>
              <p className="text-sm text-gray-600 mt-1">Side-by-side matrix, CIP codes, and how to use the comparison table.</p>
            </div>
          </div>
        </Section>

        <Section>
          <H2 id="article-library">Article Library</H2>
          <div className="grid gap-4 sm:grid-cols-2 mt-4">
            {[
              { title: 'How to Compare Colleges as a Veteran', summary: 'A 10-factor framework covering accreditation, VA approval, transfer policy, veteran services, and career outcomes — built to cut through marketing claims.', tag: 'School Selection' },
              { title: 'Questions Veterans Should Ask Before Choosing a Degree', summary: 'A structured list of questions covering career goals, format fit, transfer credit, cost, and benefit certification timelines.', tag: 'Degree Planning' },
              { title: 'Understanding VA Education Benefits: Where to Start', summary: 'A plain-language orientation to Post-9/11 GI Bill®, MGIB, VR&amp;E, DEA, and Yellow Ribbon — with links to every official VA page.', tag: 'VA Benefits' },
              { title: 'Yellow Ribbon Program: Questions to Ask a School', summary: 'Eight questions that help you confirm participation, contribution amounts, slot availability, and renewal terms at each school.', tag: 'VA Benefits' },
              { title: 'VR&E Education Planning: Official Resources to Review', summary: 'What Veteran Readiness &amp; Employment covers, who qualifies, and where to find official VA information.', tag: 'VA Benefits' },
              { title: 'Military Transcripts and Transfer Credit: What to Ask', summary: 'How to request your JST, what questions to ask admissions, and how prior learning assessment works.', tag: 'Transfer Credit' },
              { title: 'Bachelor\'s Degree Completion Planning for Veterans', summary: 'A six-step planning process for veterans returning to finish a four-year degree they started years ago.', tag: 'Degree Planning' },
              { title: 'MBA vs Specialized Master\'s: A Veteran\'s Planning Guide', summary: 'A side-by-side comparison of program structure, cost, prerequisite expectations, and career outcomes.', tag: 'Degree Planning' },
              { title: 'Online vs Hybrid Degrees: Questions to Compare', summary: 'Asynchronous vs synchronous, cohort vs self-paced, full-time vs part-time — and the VA benefit implications of each format.', tag: 'School Selection' },
              { title: 'Veteran Degree Planning Checklist', summary: 'A printable checklist that walks you from goal-setting through application submission — including documents to gather and what not to share.', tag: 'Degree Planning' },
              { title: 'How to Compare Total Degree Cost', summary: 'A cost breakdown template with hidden costs, opportunity cost, and a step-by-step cost comparison process.', tag: 'Cost Planning' },
              { title: 'What to Ask a School Certifying Official', summary: 'VA benefit certification timelines, enrollment change reporting, Yellow Ribbon participation, and your single point of contact.', tag: 'VA Benefits' },
            ].map((article) => (
              <div key={article.title} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-heading font-semibold text-[#061846]">{article.title}</h3>
                  <span className="shrink-0 rounded-full bg-[#EDF5FF] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#0874F9]">{article.tag}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{article.summary}</p>
                <p className="text-xs text-gray-400 mt-3">UCSG Editorial Team · Resource Center</p>
                <button
                  className="mt-3 text-sm text-[#0874F9] hover:underline font-medium"
                  onClick={() => track.ctaClick({ cta_type: 'resource_read', cta_source: 'veteran_resources', cta_text: article.title })}
                >
                  Read Guide →
                </button>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <H2 id="official-directory">Official Resource Directory</H2>
          <Lead>
            Every UCSG veteran guide cross-references these official sources. Bookmark them.
          </Lead>
          <ul className="ml-6 space-y-3 list-disc text-gray-700">
            <li>
              <a href="https://www.va.gov/education/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline font-medium">va.gov/education</a> — main VA education benefits hub.
            </li>
            <li>
              <a href="https://www.va.gov/education/yellow-ribbon-program/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline font-medium">va.gov/education/yellow-ribbon-program</a> — official Yellow Ribbon Program page.
            </li>
            <li>
              <a href="https://www.va.gov/education/about-vre-program/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline font-medium">va.gov/education/about-vre-program</a> — official VR&amp;E (Chapter 31) page.
            </li>
            <li>
              <a href="https://www.va.gov/school-finding/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline font-medium">va.gov/school-finding</a> — VA School Comparison Tool.
            </li>
            <li>
              <a href="https://jst.doded.mil/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline font-medium">jst.doded.mil</a> — official Joint Services Transcript portal.
            </li>
            <li>
              <a href="https://studentaid.gov/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline font-medium">studentaid.gov</a> — Federal Student Aid (FAFSA) portal.
            </li>
            <li>
              <a href="https://www.benefits.va.gov/GIBILL/Principles_of_Excellence.asp" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline font-medium">VA Principles of Excellence</a> — institutional commitments to veteran students.
            </li>
          </ul>
        </Section>

        <Section>
          <H2 id="faq">Frequently Asked Questions</H2>
          <Faq
            items={[
              {
                q: 'Are UCSG\'s resource guides official VA guidance?',
                a: (
                  <span>
                    No. UCSG guides are independent editorial content created to help you navigate
                    official VA and DoD information. They are not affiliated with, endorsed by, or
                    sponsored by the VA or DoD. Always verify specific eligibility, rates, and
                    program details at the official VA or DoD source linked in each guide.
                  </span>
                ),
              },
              {
                q: 'How often are these guides updated?',
                a: (
                  <span>
                    Guides are reviewed periodically for accuracy. VA benefit rates and program
                    details change annually; UCSG does not quote specific VA payment amounts in
                    any guide. Always confirm current numbers at va.gov.
                  </span>
                ),
              },
              {
                q: 'Where should I start if I\'m new to veteran education planning?',
                a: (
                  <span>
                    Start with our <InternalLink id="degree-planning">degree planning guide</InternalLink>{' '}
                    for the six-step planning process, then read the{' '}
                    <InternalLink id="education-benefits">VA education benefits guide</InternalLink>{' '}
                    to understand which official sources to verify your benefits with.
                  </span>
                ),
              },
            ]}
          />
        </Section>
      </Body>
    ),
    ctaText: 'START MY ASSESSMENT',
    ctaHref: 'assessment',
  },

  /* ============================================================= */
  /* 10. EVENTS                                                      */
  /* ============================================================= */
  'events': {
    heroImage: FUTURE_IMG,
    eyebrow: 'WORKSHOPS & EVENTS',
    headline: 'Veteran Education Workshops & Events',
    subheadline:
      'Attend the YOUR NEXT MISSION: EDUCATION workshop — a structured session covering degree options, education benefits, transfer credit, and school selection.',
    children: (
      <Body>
        <motion.div
          {...reveal}
          className="bg-gradient-to-br from-[#061846] to-[#092B68] rounded-2xl p-6 sm:p-8 text-white"
        >
          <h2 className="text-2xl font-heading font-bold text-[#D6A84B]">YOUR NEXT MISSION: EDUCATION</h2>
          <p className="text-lg mt-2">Veteran Degree &amp; Education Planning Workshop</p>
          <p className="text-white/70 mt-4 leading-relaxed">
            A structured session covering degree options, education benefits, transfer credit, and
            school selection — built for veterans, transitioning service members, and
            military-connected family members.
          </p>
          <button
            className="mt-6 bg-[#0874F9] hover:bg-[#0660D4] text-white font-medium px-6 py-3 rounded-lg transition-colors"
            onClick={() => window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'veterans', id: 'assessment' } }))}
          >
            REGISTER FOR NEXT WORKSHOP
          </button>
        </motion.div>

        <Section>
          <H2 id="what-to-expect">What to Expect at the Workshop</H2>
          <Lead>
            The workshop is a small-group, interactive session — not a lecture. Expect facilitated
            discussion, individual planning worksheets, and time for questions. The goal is for
            every attendee to leave with a clearer next step, not a sales pitch.
          </Lead>
          <CheckList
            items={[
              'Facilitated by a UCSG education advisor (no VA representative in attendance — VA guidance is referenced to official VA sources)',
              'Group size capped to allow real Q&A — typically 8–15 attendees',
              'Planning worksheets you can take home and continue using',
              'Live walkthrough of the VA School Comparison Tool and JST portal',
              'Time built in for individual goal-setting and one-on-one questions',
              'No sales pressure — no commitment required to attend',
            ]}
          />
          <Callout>
            <p className="text-sm text-[#061846]">
              UCSG is not affiliated with the VA, DoD, or any branch of the U.S. Armed Forces. VA
              benefit eligibility and payments are determined by the VA. This workshop is
              educational; UCSG does not determine or guarantee benefits.
            </p>
          </Callout>
        </Section>

        <Section>
          <H2 id="who-should-attend">Who Should Attend</H2>
          <div className="grid gap-4 sm:grid-cols-2 mt-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Veterans</h3>
              <p className="text-sm text-gray-600 mt-1">Who want to start or finish a degree and are unsure where to begin — or which degree fits.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Transitioning service members</h3>
              <p className="text-sm text-gray-600 mt-1">Within 6–12 months of separation who want a structured planning process before civilian life.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Guard &amp; Reserve</h3>
              <p className="text-sm text-gray-600 mt-1">Balancing civilian careers, drill obligations, and degree completion.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Military spouses &amp; dependents</h3>
              <p className="text-sm text-gray-600 mt-1">Considering transferred education benefits or their own degree path.</p>
            </div>
          </div>
        </Section>

        <Section>
          <H2 id="agenda">Workshop Agenda</H2>
          <Steps
            items={[
              {
                title: 'Goal Setting & Career Alignment',
                body: (
                  <span>
                    Articulate your one-sentence goal: degree, field, and target role. Without a
                    clear goal, school selection becomes guesswork.
                  </span>
                ),
              },
              {
                title: 'Reviewing Prior Learning & Military Experience',
                body: (
                  <span>
                    Walk through how to request your Joint Services Transcript, gather prior
                    college transcripts, and identify completed CLEP/DSST exams.
                  </span>
                ),
              },
              {
                title: 'Understanding VA Education Benefits',
                body: (
                  <span>
                    Overview of Post-9/11 GI Bill®, MGIB, VR&amp;E, Yellow Ribbon, and DEA — with
                    links to official VA sources for eligibility and rate verification.
                  </span>
                ),
              },
              {
                title: 'Choosing a School: The 10-Factor Framework',
                body: (
                  <span>
                    Live walkthrough of the framework: accreditation, VA program approval, transfer
                    policy, veteran services, cost, and career outcomes.
                  </span>
                ),
              },
              {
                title: 'Building Your Personal Plan',
                body: (
                  <span>
                    Complete a planning worksheet that captures your goal, top 3 candidate
                    programs, next-step actions, and timeline.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="what-to-bring">What to Bring</H2>
          <Callout>
            <p className="text-sm text-[#061846]">
              <strong>You do NOT need to bring your DD-214, Social Security Number, VA claim
              number, disability rating, or any medical or banking information.</strong> The
              workshop is educational — UCSG does not collect, store, or transmit sensitive
              personal data.
            </p>
          </Callout>
          <CheckList
            items={[
              'A notebook or laptop for planning worksheets',
              'A rough idea of your career goal — even if it is still fuzzy',
              'A list of any prior college courses you remember taking',
              'Branch of service, dates of service, and any MOS/AFSC/rating titles you recall',
              'Questions you want answered during Q&A time',
              'An open mind — the workshop is interactive, not a lecture',
            ]}
          />
        </Section>

        <Section>
          <H2 id="format-logistics">Workshop Format &amp; Logistics</H2>
          <Lead>
            Sessions are intentionally small to allow real conversation. Here is what to expect
            in terms of format, duration, and follow-up.
          </Lead>
          <div className="grid gap-4 sm:grid-cols-2 mt-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Format</h3>
              <p className="text-sm text-gray-600 mt-1">
                Live, facilitated, small-group. Most sessions run as a single 90-minute block with
                short Q&amp;A breaks; some run as two 45-minute virtual sessions. The format for
                each session is announced during registration.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Platform</h3>
              <p className="text-sm text-gray-600 mt-1">
                Virtual sessions use a standard videoconferencing platform; in-person sessions are
                hosted at the venue listed on the registration page. Recording is generally not
                available — attend live to participate.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Materials</h3>
              <p className="text-sm text-gray-600 mt-1">
                Each attendee receives a printable planning worksheet and a resource sheet linking
                to every official VA and DoD source referenced in the workshop.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-heading font-semibold text-[#061846]">Follow-up</h3>
              <p className="text-sm text-gray-600 mt-1">
                Attendees can request an optional 30-minute follow-up with a UCSG education
                advisor — no commitment, no enrollment pressure. The follow-up is also free.
              </p>
            </div>
          </div>
          <Callout>
            <p className="text-sm text-[#061846]">
              UCSG is not affiliated with the VA. The workshop references official VA resources for
              eligibility and benefit verification. The VA determines all benefit eligibility and
              payment decisions.
            </p>
          </Callout>
        </Section>

        <Section>
          <H2 id="past-topics">Past Workshop Topics</H2>
          <Lead>
            Previous sessions have covered themes such as:
          </Lead>
          <ul className="ml-6 space-y-3 list-disc text-gray-700 mt-2">
            <li>&quot;From service to a bachelor&apos;s degree completion program&quot;</li>
            <li>&quot;Online vs. on-campus: matching format to your life&quot;</li>
            <li>&quot;VR&amp;E and the Post-9/11 GI Bill®: understanding your options&quot;</li>
            <li>&quot;How to read a school&apos;s transfer-credit policy before applying&quot;</li>
            <li>&quot;Yellow Ribbon: what it does and does not cover&quot;</li>
            <li>&quot;Graduate school for veterans: MBA, specialized master&apos;s, and doctoral planning&quot;</li>
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            Workshop content is reviewed periodically. Topics and emphasis may vary by session.
          </p>
        </Section>

        <Section>
          <H2 id="faq">Frequently Asked Questions</H2>
          <Faq
            items={[
              {
                q: 'Is the workshop free?',
                a: (
                  <span>
                    UCSG&apos;s veteran education workshops are offered at no charge. No
                    enrollment commitment is required to attend. If a particular session has a
                    materials fee, it will be disclosed in advance during registration.
                  </span>
                ),
              },
              {
                q: 'Will there be a VA representative present?',
                a: (
                  <span>
                    UCSG is not affiliated with the VA. The workshop references official VA
                    information and links to va.gov for eligibility and benefit verification —
                    but a VA representative is not in attendance. For official eligibility
                    determinations, contact the VA directly at 1-888-442-4551.
                  </span>
                ),
              },
              {
                q: 'When is the next workshop?',
                a: (
                  <span>
                    Upcoming workshop dates will be announced on this page. Register through the
                    workshop feature card at the top of the page to be notified when the next
                    session is scheduled.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="register">Register for the Next Workshop</H2>
          <Lead>
            Spots are limited. Complete the free veteran degree assessment to begin the
            registration process — we&apos;ll send you the next workshop schedule.
          </Lead>
          <button
            className="mt-4 inline-flex items-center gap-2 bg-[#0874F9] hover:bg-[#0660D4] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            onClick={() => window.dispatchEvent(new CustomEvent('ucsg-navigate', { detail: { view: 'veterans', id: 'assessment' } }))}
          >
            REGISTER FOR NEXT WORKSHOP
          </button>
        </Section>
      </Body>
    ),
    ctaText: 'REGISTER FOR WORKSHOP',
    ctaHref: 'assessment',
  },

  /* ============================================================= */
  /* 11. FAQ                                                         */
  /* ============================================================= */
  'faq': {
    heroImage: FUTURE_IMG,
    eyebrow: 'FAQ',
    headline: 'Veteran Education FAQ',
    subheadline:
      'Answers to common questions about veteran education planning, VA benefits, transfer credit, school selection, and cost — organized by category.',
    children: (
      <Body>
        <Section>
          <p className="text-gray-700 leading-relaxed">
            This <strong>veteran education FAQ</strong> answers the questions UCSG advisors hear
            most often — organized by category so you can find what you need quickly. Use the
            internal links inside each answer to jump to the full guide on that topic. For official
            eligibility, benefit amounts, and program details, always verify at va.gov/education.
          </p>
          <Callout>
            <p className="text-sm text-[#061846]">
              UCSG is an independent education consulting organization. We are not affiliated with,
              endorsed by, or sponsored by the U.S. Department of Veterans Affairs, the Department
              of Defense, or any branch of the U.S. Armed Forces. The VA determines all benefit
              eligibility and payment decisions.
            </p>
          </Callout>
        </Section>

        <Section>
          <H2 id="benefits">Benefits</H2>
          <Faq
            items={[
              {
                q: 'Does UCSG determine if I\'m eligible for VA education benefits?',
                a: (
                  <span>
                    No. VA education benefit eligibility is determined solely by the U.S.
                    Department of Veterans Affairs. UCSG helps you find the right official
                    information at va.gov/education and prepare the questions to ask the VA. See
                    our <InternalLink id="education-benefits">education benefits guide</InternalLink>.
                  </span>
                ),
              },
              {
                q: 'Can UCSG quote specific GI Bill® payment amounts?',
                a: (
                  <span>
                    No. VA payment rates vary by program, enrollment intensity, school type, and
                    ZIP code — and they change annually. Current rates are published at
                    va.gov/education. UCSG does not quote VA payment amounts; we point you to the
                    official source.
                  </span>
                ),
              },
              {
                q: 'What is the difference between VR&E and the Post-9/11 GI Bill®?',
                a: (
                  <span>
                    VR&amp;E (Chapter 31) is for veterans with service-connected disabilities who
                    need help preparing for or maintaining suitable employment. The Post-9/11 GI
                    Bill® (Chapter 33) is an education benefit for veterans with qualifying
                    post-9/11 service. The VA determines eligibility for each program. See our
                    full <InternalLink id="vre">VR&amp;E guide</InternalLink> for a side-by-side
                    comparison.
                  </span>
                ),
              },
              {
                q: 'Can I use my GI Bill® benefits for an online degree?',
                a: (
                  <span>
                    Yes — Post-9/11 GI Bill® benefits can generally be used at approved online
                    programs, with a different housing allowance structure than on-campus
                    enrollment. Confirm current rules and program-specific approval with the VA and
                    the institution&apos;s SCO before enrolling.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="transfer-credit">Transfer Credit</H2>
          <Faq
            items={[
              {
                q: 'Can UCSG guarantee that my military credits will transfer?',
                a: (
                  <span>
                    No. Each institution sets its own transfer-credit policy. UCSG helps you ask
                    the right questions, request your JST, and compare policies across schools —
                    but the final decision rests with the receiving institution. See our{' '}
                    <InternalLink id="military-transfer-credit">military transfer credit guide</InternalLink>.
                  </span>
                ),
              },
              {
                q: 'How do I request my Joint Services Transcript (JST)?',
                a: (
                  <span>
                    Visit the official DoD JST portal at{' '}
                    <a href="https://jst.doded.mil/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline">jst.doded.mil</a>{' '}
                    and use the &quot;Send Transcript&quot; function to designate the receiving
                    institution. Avoid third-party sites that charge fees.
                  </span>
                ),
              },
              {
                q: 'Do all schools accept ACE credit recommendations for military training?',
                a: (
                  <span>
                    No. The American Council on Education (ACE) publishes credit recommendations
                    for military training, but each institution decides whether to honor them.
                    Some schools accept ACE broadly; others review course-by-course or apply credit
                    only as electives. Always confirm in writing with the registrar&apos;s office.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="school-selection">School Selection</H2>
          <Faq
            items={[
              {
                q: 'What makes a school "veteran-friendly"?',
                a: (
                  <span>
                    Look for a named veteran services office, a published School Certifying
                    Official contact, a written transfer-credit policy that explicitly mentions JST
                    and ACE, Yellow Ribbon participation, and an active Student Veterans of America
                    (SVA) chapter. See our full{' '}
                    <InternalLink id="choosing-a-school">school selection guide</InternalLink>.
                  </span>
                ),
              },
              {
                q: 'Can UCSG recommend specific schools or programs?',
                a: (
                  <span>
                    No. UCSG does not endorse or recommend specific institutions or programs. We
                    provide the comparison framework, the questions to ask, and the official
                    sources to verify claims. Your selection should be based on your goals,
                    constraints, and verified data — not on UCSG referrals.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="cost">Cost</H2>
          <Faq
            items={[
              {
                q: 'Will UCSG quote specific tuition numbers?',
                a: (
                  <span>
                    No. Tuition rates change annually and vary by program, residency, and delivery
                    format. UCSG provides a cost breakdown template you can fill in with each
                    institution&apos;s official cost of attendance — see our{' '}
                    <InternalLink id="cost-planning">cost planning guide</InternalLink>.
                  </span>
                ),
              },
              {
                q: 'Is the lowest-tuition program always the best financial choice?',
                a: (
                  <span>
                    No. A lower-tuition program may have higher fees, longer time-to-completion, or
                    weaker transfer-credit acceptance that increases total cost. Compare total net
                    cost — including opportunity cost — not just per-credit rate.
                  </span>
                ),
              },
            ]}
          />
        </Section>

        <Section>
          <H2 id="general">General</H2>
          <Faq
            items={[
              {
                q: 'Is UCSG affiliated with the VA or Department of Defense?',
                a: (
                  <span>
                    No. UCSG is an independent education consulting organization. We are not
                    affiliated with, endorsed by, or sponsored by the U.S. Department of Veterans
                    Affairs, the Department of Defense, or any branch of the U.S. Armed Forces.
                    Use of &quot;GI Bill®&quot; is a registered trademark of the U.S. Department of
                    Veterans Affairs; UCSG makes no claim of affiliation.
                  </span>
                ),
              },
              {
                q: 'Does UCSG charge for the veteran assessment?',
                a: (
                  <span>
                    The veteran degree assessment is free. No enrollment commitment is required.
                    <InternalLink id="assessment"> Start the assessment →</InternalLink>
                  </span>
                ),
              },
              {
                q: 'Should I bring my DD-214 to the assessment or workshop?',
                a: (
                  <span>
                    No. UCSG does not request, collect, or store DD-214 forms, SSN, VA claim
                    numbers, disability ratings, or medical/bank information. Submit your DD-214
                    only to the VA or to your chosen institution when applying for benefits.
                  </span>
                ),
              },
              {
                q: 'Where can I find official VA education benefit information?',
                a: (
                  <span>
                    Start at <a href="https://www.va.gov/education/" target="_blank" rel="noopener noreferrer" className="text-[#0874F9] hover:underline">va.gov/education</a>{' '}
                    and the related pages linked in our{' '}
                    <InternalLink id="education-benefits">education benefits guide</InternalLink>.
                  </span>
                ),
              },
              {
                q: 'How is UCSG\'s veteran degree planning different from a college advisor?',
                a: (
                  <span>
                    A college advisor works for one institution and recommends that
                    institution&apos;s programs. UCSG is independent — we help you compare across
                    institutions and choose based on fit, not on enrollment quotas. See our{' '}
                    <InternalLink id="degree-planning">degree planning guide</InternalLink>.
                  </span>
                ),
              },
            ]}
          />
        </Section>
      </Body>
    ),
    ctaText: 'START MY ASSESSMENT',
    ctaHref: 'assessment',
  },

  /* ============================================================= */
  /* BOOK-CONSULTATION (unchanged — uses info layout)               */
  /* ============================================================= */
  'book-consultation': {
    heroImage: CAMPUS_IMG,
    eyebrow: 'BOOK A CONSULTATION',
    headline: 'Book a Veteran Education Consultation',
    subheadline:
      'Discuss your degree goals and next steps with an education advisor. Free, no obligation.',
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

/* ------------------------------------------------------------------ */
/*  BookConsultationView — auto-opens contact calendar               */
/* ------------------------------------------------------------------ */
function BookConsultationView({ content }: { content: (typeof INFO_PAGE_CONTENT)[string] }) {
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
      heroImage={content.heroImage}
    >
      {content.children}
    </VeteranInfoPage>
  );
}

/* ------------------------------------------------------------------ */
/*  VeteranSlugView — entry point                                    */
/* ------------------------------------------------------------------ */
export default function VeteranSlugView({ slug }: { slug: string }) {
  // Degree path pages have dedicated components
  if (slug === 'bachelors-degree') return <VeteranBachelorsPage />;
  if (slug === 'masters-mba') return <VeteranMastersPage />;
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
      heroImage={content.heroImage}
    >
      {content.children}
    </VeteranInfoPage>
  );
}
