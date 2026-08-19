export interface ResourceData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  heroGradient: string;
  heroBgImage: string;
  overview: string;
  steps: ProcessStep[];
  keyFacts: KeyFact[];
  faqs: FAQ[];
  benefits: string[];
  ctaText: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  timeline: string;
}

export interface KeyFact {
  label: string;
  value: string;
  color: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const resources: ResourceData[] = [
  {
    id: 'day1-cpt',
    title: 'Day 1 CPT',
    subtitle: 'Start Working from Day One of Your Program',
    description:
      'Curricular Practical Training (CPT) is work authorization that allows F-1 students to gain practical experience in their field of study. Day 1 CPT means you can start working immediately upon enrollment — no need to wait for one academic year.',
    icon: 'briefcase',
    heroGradient: 'from-[#002868] to-[#001B4D]',
    heroBgImage: '/images/bg-day1-cpt.png',
    overview:
      'Day 1 CPT is an employment authorization option for F-1 international students enrolled in qualifying graduate programs. Unlike regular CPT which requires completion of one academic year, Day 1 CPT allows you to begin paid or unpaid work related to your major from the very first day of your program. This authorization is granted through the university\'s DSO (Designated School Official) and must be directly related to your field of study.',
    steps: [
      {
        step: 1,
        title: 'Choose a Day 1 CPT University',
        description: 'Select from our network of SEVP-certified universities that offer Day 1 CPT authorization for your field of study.',
        timeline: '1-2 days',
      },
      {
        step: 2,
        title: 'Get Admitted & Receive I-20',
        description: 'Complete the application process, receive your admission letter, and get your updated I-20 with CPT authorization.',
        timeline: '1-3 weeks',
      },
      {
        step: 3,
        title: 'CPT Authorization from DSO',
        description: 'Your DSO will issue the CPT authorization on your I-20, allowing you to begin working immediately.',
        timeline: '3-5 days',
      },
      {
        step: 4,
        title: 'Start Working Legally',
        description: 'Begin your employment or internship at a position directly related to your field of study. Maintain good academic standing.',
        timeline: 'Day 1',
      },
    ],
    keyFacts: [
      { label: 'Average Processing Time', value: '2-4 Weeks', color: '#002868' },
      { label: 'Work Authorization Type', value: 'CPT (Curricular)', color: '#059669' },
      { label: 'Min. Enrollment Required', value: 'Part-time OK', color: '#D97706' },
      { label: 'Eligible Programs', value: 'Graduate Level', color: '#7C3AED' },
    ],
    faqs: [
      {
        question: 'What is Day 1 CPT?',
        answer: 'Day 1 CPT allows F-1 international students to begin off-campus employment related to their field of study from the first day of their academic program, without having to complete one full academic year first.',
      },
      {
        question: 'Is Day 1 CPT legal?',
        answer: 'Yes, Day 1 CPT is fully legal when authorized by a SEVP-certified institution through their DSO. The authorization must be reflected on your Form I-20.',
      },
      {
        question: 'Can I work full-time with Day 1 CPT?',
        answer: 'Yes, if you are enrolled part-time in your academic program, you may be authorized for full-time CPT employment. Full-time CPT for 12 months or more may affect your OPT eligibility.',
      },
      {
        question: 'Does Day 1 CPT affect my OPT?',
        answer: 'Part-time CPT does not affect OPT. However, 12+ months of full-time CPT will make you ineligible for post-completion OPT in that program level.',
      },
      {
        question: 'Which universities offer Day 1 CPT?',
        answer: 'We work with 29+ SEVP-certified universities across the USA that offer Day 1 CPT programs. Contact us to find the best fit for your situation.',
      },
    ],
    benefits: [
      'Start working immediately upon enrollment',
      'Gain real-world experience while studying',
      'Build professional network in the USA',
      'Earn income to support your education',
      'Strengthen your resume for future opportunities',
      'Transition to H-1B with employer sponsorship',
    ],
    ctaText: 'Explore Day 1 CPT Universities',
  },
  {
    id: 'university-transfers',
    title: 'University Transfers',
    subtitle: 'Seamless Transfer to a Day 1 CPT University',
    description:
      'Whether your SEVIS has been terminated or you simply need a better university fit, we can connect you with SEVP-approved universities within 24-48 hours. Our fast-track transfer process ensures minimal disruption to your academic journey.',
    icon: 'graduation-cap',
    heroGradient: 'from-[#059669] to-[#047857]',
    heroBgImage: '/images/bg-transfers.png',
    overview:
      'University transfers for international students require careful handling of SEVIS records, credit transfers, and immigration status. Our team specializes in emergency transfers for students facing SEVIS termination, as well as strategic transfers for students seeking Day 1 CPT opportunities. We work directly with university admissions teams to expedite the process.',
    steps: [
      {
        step: 1,
        title: 'Free Consultation',
        description: 'Share your current situation, academic background, and goals. We\'ll assess your eligibility and recommend the best university options.',
        timeline: 'Same day',
      },
      {
        step: 2,
        title: 'University Selection & Application',
        description: 'We\'ll help you select the right university, prepare your application materials, and submit everything on your behalf.',
        timeline: '1-3 days',
      },
      {
        step: 3,
        title: 'SEVIS Record Transfer',
        description: 'Your new university will initiate the SEVIS record transfer. We coordinate with DSOs on both ends for a smooth transition.',
        timeline: '1-2 days',
      },
      {
        step: 4,
        title: 'New I-20 & Enrollment',
        description: 'Receive your new I-20 from the transfer university, complete enrollment, and start your new program with CPT authorization.',
        timeline: '3-7 days',
      },
    ],
    keyFacts: [
      { label: 'Transfer Timeline', value: '24-48 Hours', color: '#059669' },
      { label: 'Success Rate', value: '99%+', color: '#002868' },
      { label: 'Partner Universities', value: '29+', color: '#D97706' },
      { label: 'SEVIS Termination Support', value: '24/7', color: '#DC2626' },
    ],
    faqs: [
      {
        question: 'How fast can I transfer?',
        answer: 'In emergency situations, we can connect you with a university and initiate the SEVIS transfer within 24-48 hours. Standard transfers typically take 1-2 weeks.',
      },
      {
        question: 'Can I transfer with a terminated SEVIS record?',
        answer: 'If your SEVIS record has been terminated, you may still have options including reinstatement or travel and re-entry. Contact us immediately for a free assessment.',
      },
      {
        question: 'Will my credits transfer?',
        answer: 'Credit transfer depends on the receiving university\'s policies. We help match your completed coursework to equivalent programs at our partner universities.',
      },
      {
        question: 'Do I need to leave the US during transfer?',
        answer: 'In most cases, no. A valid SEVIS transfer can be completed without leaving the U.S. However, if your SEVIS is terminated, different options apply.',
      },
    ],
    benefits: [
      'Emergency 24-48 hour transfer available',
      'SEVIS termination recovery support',
      'Credit evaluation and transfer assistance',
      'Day 1 CPT at new university',
      'Dedicated advisor throughout the process',
      'Post-transfer support and guidance',
    ],
    ctaText: 'Start University Transfer Today',
  },
  {
    id: 'change-of-status',
    title: 'Change of Status (to F1)',
    subtitle: 'Transition to F-1 Status from Any Visa Category',
    description:
      'Whether you\'re currently on B1/B2, F2, H1B, H4, J1/J2, or another visa status, we guide you through the entire Change of Status (COS) process to F-1. From I-20 issuance to university placement, we handle every detail.',
    icon: 'shield-check',
    heroGradient: 'from-[#7C3AED] to-[#6D28D9]',
    heroBgImage: '/images/bg-change-status.png',
    overview:
      'A Change of Status (COS) allows you to transition from your current non-immigrant visa status to F-1 student status without leaving the United States. This process involves filing Form I-539 with USCIS, obtaining a new I-20 from an SEVP-certified university, and meeting specific requirements. Our team handles the entire process end-to-end.',
    steps: [
      {
        step: 1,
        title: 'Eligibility Assessment',
        description: 'We evaluate your current visa status, travel history, and goals to determine the best COS strategy for your situation.',
        timeline: 'Same day',
      },
      {
        step: 2,
        title: 'University Admission & I-20',
        description: 'Secure admission to a Day 1 CPT university and obtain your I-20. We handle all documentation and communication with the school.',
        timeline: '1-2 weeks',
      },
      {
        step: 3,
        title: 'File I-539 with USCIS',
        description: 'Prepare and submit your Change of Status application (Form I-539) with all supporting documents to USCIS.',
        timeline: '1-2 weeks',
      },
      {
        step: 4,
        title: 'Receive Approval & Start',
        description: 'Once USCIS approves your COS, you\'re officially in F-1 status. Begin your studies with Day 1 CPT work authorization.',
        timeline: '3-6 months',
      },
    ],
    keyFacts: [
      { label: 'Eligible From', value: 'B1/B2, F2, H4, J1/J2', color: '#7C3AED' },
      { label: 'Processing Time', value: '3-6 Months', color: '#002868' },
      { label: 'Form Required', value: 'I-539', color: '#059669' },
      { label: 'Success Rate', value: '95%+', color: '#D97706' },
    ],
    faqs: [
      {
        question: 'Can I change from B1/B2 to F-1?',
        answer: 'Yes, you can file a Change of Status from B1/B2 to F-1 while in the U.S. However, you must demonstrate non-immigrant intent and meet all F-1 requirements.',
      },
      {
        question: 'Can I study while my COS is pending?',
        answer: 'You cannot begin studying until your COS is approved. However, the timing of your program start date can be aligned with expected approval.',
      },
      {
        question: 'Can I work while my COS is pending?',
        answer: 'No, you cannot work until your F-1 status is approved and you have CPT authorization from your university.',
      },
      {
        question: 'What if my COS is denied?',
        answer: 'If denied, you may need to depart the U.S. and apply for an F-1 visa at a consulate abroad. We help prepare a backup plan in every case.',
      },
    ],
    benefits: [
      'Expert guidance for all visa categories',
      'Complete I-539 preparation and filing',
      'University admission included',
      'Day 1 CPT upon F-1 approval',
      'Regular status updates throughout',
      'Backup strategy in case of denial',
    ],
    ctaText: 'Apply for Change of Status',
  },
  {
    id: 'sevis-reinstatement',
    title: 'SEVIS Reinstatement',
    description:
      'A terminated SEVIS record doesn\'t have to end your U.S. journey. We help you prepare strong reinstatement requests with comprehensive supporting documentation to maximize your chances of USCIS approval.',
    subtitle: 'Restore Your F-1 Status After SEVIS Termination',
    icon: 'refresh-cw',
    heroGradient: 'from-[#DC2626] to-[#B91C1C]',
    heroBgImage: '/images/bg-sevis.png',
    overview:
      'If your SEVIS record has been terminated due to unauthorized employment, failure to maintain full-time enrollment, or other violations, you may be eligible for reinstatement. The reinstatement process involves filing Form I-539 with USCIS and demonstrating that the violation was beyond your control or that reinstatement is warranted. We prepare comprehensive applications with strong supporting evidence.',
    steps: [
      {
        step: 1,
        title: 'Case Evaluation',
        description: 'We review the circumstances of your SEVIS termination, identify the best legal strategy, and assess your reinstatement eligibility.',
        timeline: 'Same day',
      },
      {
        step: 2,
        title: 'Evidence & Documentation',
        description: 'Gather all supporting documents including financial records, enrollment proof, medical records, or evidence of circumstances beyond your control.',
        timeline: '1-2 weeks',
      },
      {
        step: 3,
        title: 'Prepare & File Reinstatement',
        description: 'Draft a compelling personal statement and file your I-539 reinstatement application with USCIS, including all supporting evidence.',
        timeline: '1-2 weeks',
      },
      {
        step: 4,
        title: 'Decision & Next Steps',
        description: 'USCIS will process your application. If approved, your SEVIS record is reinstated. If denied, we help with alternative options.',
        timeline: '3-6 months',
      },
    ],
    keyFacts: [
      { label: 'Filing Deadline', value: '5 Months Max', color: '#DC2626' },
      { label: 'Form Required', value: 'I-539', color: '#002868' },
      { label: 'Processing Time', value: '3-6 Months', color: '#D97706' },
      { label: 'Approval Depends On', value: 'Evidence Quality', color: '#059669' },
    ],
    faqs: [
      {
        question: 'What causes SEVIS termination?',
        answer: 'Common causes include: failure to maintain full-time enrollment, unauthorized employment, failure to extend I-20 on time, or visa status violations.',
      },
      {
        question: 'How long do I have to file for reinstatement?',
        answer: 'You must file within 5 months of the SEVIS termination date, or within 5 months of discovering the termination if it was not your fault.',
      },
      {
        question: 'Can I study while reinstatement is pending?',
        answer: 'You may be able to study at the discretion of your DSO, but you cannot work until reinstatement is approved.',
      },
      {
        question: 'What happens if reinstatement is denied?',
        answer: 'If denied, you must depart the U.S. within a specified period. We can help with university transfer options or travel/re-entry strategies.',
      },
    ],
    benefits: [
      'Expert evaluation of termination reasons',
      'Comprehensive evidence gathering',
      'Professional personal statement drafting',
      'Complete I-539 filing service',
      'University transfer as backup option',
      'Ongoing support throughout the process',
    ],
    ctaText: 'Request SEVIS Reinstatement Help',
  },
  {
    id: 'stem-opt',
    title: 'STEM OPT Support',
    subtitle: 'Navigate STEM OPT Denials & Extensions with Confidence',
    description:
      'If your STEM OPT is denied, expiring, or you need guidance on the extension process, UCSG provides backup university admissions and expert support so you can continue studying and working in the USA.',
    icon: 'refresh-cw',
    heroGradient: 'from-[#D97706] to-[#B45309]',
    heroBgImage: '/images/bg-stem-opt.png',
    overview:
      'The STEM OPT Extension allows F-1 students who earned degrees in STEM (Science, Technology, Engineering, Mathematics) fields to extend their post-completion OPT by 24 months. However, denials, RFEs (Requests for Evidence), and timing issues can jeopardize your status. UCSG helps students navigate these challenges by providing backup university admissions with Day 1 CPT, ensuring you never fall out of status while resolving OPT issues.',
    steps: [
      {
        step: 1,
        title: 'Free Status Assessment',
        description: 'Share your current OPT/STEM OPT situation, denial notice, or timeline. We assess your options and create a personalized action plan.',
        timeline: 'Same day',
      },
      {
        step: 2,
        title: 'Backup University Admission',
        description: 'If your STEM OPT is at risk, we secure admission to a Day 1 CPT university so you can maintain lawful F-1 status immediately.',
        timeline: '1-3 days',
      },
      {
        step: 3,
        title: 'I-20 Transfer & CPT Authorization',
        description: 'Your new I-20 is issued with CPT work authorization, allowing you to continue working while resolving your STEM OPT situation.',
        timeline: '3-7 days',
      },
      {
        step: 4,
        title: 'Continue Working & Resolve',
        description: 'Work legally on CPT while pursuing your new degree. We continue to assist with any USCIS matters or future immigration steps.',
        timeline: 'Ongoing',
      },
    ],
    keyFacts: [
      { label: 'STEM Extension Duration', value: '24 Months', color: '#D97706' },
      { label: 'Eligible Degrees', value: 'STEM Fields Only', color: '#002868' },
      { label: 'Backup Admission Time', value: '1-3 Days', color: '#059669' },
      { label: 'Work Authorization', value: 'Day 1 CPT', color: '#7C3AED' },
    ],
    faqs: [
      {
        question: 'What is STEM OPT Extension?',
        answer: 'The STEM OPT Extension is a 24-month extension of post-completion OPT for F-1 students who earned degrees in qualifying STEM fields. It allows you to continue working in the US for up to 3 years total after graduation.',
      },
      {
        question: 'My STEM OPT was denied. What are my options?',
        answer: 'If your STEM OPT is denied, you have a grace period before you must depart. UCSG can secure emergency university admission with Day 1 CPT within 1-3 days, allowing you to maintain F-1 status and continue working legally.',
      },
      {
        question: 'Can I apply for STEM OPT if I already used 12 months of regular OPT?',
        answer: 'Yes, the STEM extension is in addition to your initial 12-month post-completion OPT, giving you a total of 36 months of work authorization if you qualify.',
      },
      {
        question: 'What should I do if my STEM OPT is expiring soon?',
        answer: 'Plan early! Contact UCSG at least 2-3 months before your STEM OPT expires. We can enroll you in a Day 1 CPT university to ensure continuous work authorization without any gap.',
      },
      {
        question: 'Can I switch from STEM OPT to CPT at a new university?',
        answer: 'Yes. Transferring to a new university with a Day 1 CPT program is a common and effective strategy. UCSG handles the entire transfer process, including SEVIS record transfer and new I-20 issuance.',
      },
    ],
    benefits: [
      'Emergency backup admission within 1-3 days',
      'Day 1 CPT work authorization at new university',
      'No gap in employment authorization',
      'SEVIS record transfer handled for you',
      'Guidance on STEM OPT RFE responses',
      'Long-term immigration strategy planning',
    ],
    ctaText: 'Get STEM OPT Backup Plan',
  },
];

export function getResourceById(id: string): ResourceData | undefined {
  return resources.find((r) => r.id === id);
}
