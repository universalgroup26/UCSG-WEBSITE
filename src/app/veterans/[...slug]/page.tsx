import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import VeteranSlugView from './view';

const SITE_URL = 'https://www.universalconsultingservices.com';

// All valid veteran sub-page slugs → metadata
const VETERAN_PAGES: Record<string, { title: string; description: string }> = {
  'degree-planning': {
    title: 'Veteran Degree Planning',
    description: 'Build a clear degree plan: review your education background, compare programs, understand costs, and select your next step with UCSG veteran education planning.',
  },
  'bachelors-degree': {
    title: "Bachelor's & Degree Completion Options for Veterans",
    description: 'Finish your bachelor\'s degree with degree-completion planning, military learning evaluation, and program comparison tailored for veterans.',
  },
  'masters-mba': {
    title: "Master's & MBA Degree Planning for Veterans",
    description: 'Compare graduate programs, MBA vs specialized master\'s, admission requirements, and cost planning for veterans pursuing a master\'s or MBA.',
  },
  'doctoral-degrees': {
    title: 'Doctoral & Professional Degree Planning for Veterans',
    description: 'Explore PhD, DBA, and professional doctorate options. Compare research vs applied programs, admission criteria, and total cost for veterans.',
  },
  'online-hybrid-degrees': {
    title: 'Flexible Degree Options for Veterans',
    description: 'Compare online, hybrid, and on-campus degree formats. Understand asynchronous vs synchronous and working-professional considerations for veterans.',
  },
  'education-benefits': {
    title: 'VA Education Benefits Guide',
    description: 'Understand VA education benefits with official government sources. UCSG does not determine benefit eligibility — we help you find the right information.',
  },
  'yellow-ribbon': {
    title: 'Yellow Ribbon Program Guide',
    description: 'Learn about the Yellow Ribbon Program and what questions to ask schools. Links to official VA resources for verified information.',
  },
  'vre': {
    title: 'VR&E / Chapter 31 Education Planning',
    description: 'Explore Veteran Readiness & Employment (VR&E) Chapter 31 education planning with official VA resources and guidance.',
  },
  'cost-planning': {
    title: 'Education Cost Planning for Veterans',
    description: 'Plan your education costs: tuition, fees, living expenses, and benefit verification. Compare total degree cost across programs.',
  },
  'military-transfer-credit': {
    title: 'Military Experience & Transfer Credit',
    description: 'Understand how military training, JST transcripts, and prior learning may transfer. Questions to ask schools about credit policies.',
  },
  'choosing-a-school': {
    title: 'Choosing the Right School as a Veteran',
    description: 'Compare schools by degree fit, accreditation, program approval, delivery format, cost, transfer-credit policy, veteran services, and career alignment.',
  },
  'program-comparison': {
    title: 'Compare Veteran Education Programs',
    description: 'Side-by-side program comparison framework for veterans: degree type, format, cost, transfer policy, veteran services, and career outcomes.',
  },
  'resources': {
    title: 'Veteran Education Resource Center',
    description: 'Browse veteran education guides: comparing colleges, VA benefits, transfer credit, degree planning, and cost comparison. All with official sources.',
  },
  'events': {
    title: 'Veteran Education Workshops & Events',
    description: 'Attend the YOUR NEXT MISSION: EDUCATION workshop. Veteran degree & education planning events with registration and calendar integration.',
  },
  'faq': {
    title: 'Veteran Education FAQ',
    description: 'Answers to common veteran education questions: benefits, transfer credit, degree paths, cost planning, and school selection.',
  },
  'assessment': {
    title: 'Free Veteran Degree Assessment',
    description: 'Take the free veteran degree assessment. Tell us your goal, education background, and preferred format — get personalized education planning guidance.',
  },
  'book-consultation': {
    title: 'Book a Veteran Education Consultation',
    description: 'Book a free veteran education consultation with UCSG. Discuss your degree goals, education background, and next steps with an education advisor.',
  },
};

export function generateStaticParams() {
  return Object.keys(VETERAN_PAGES).map((slug) => ({ slug: [slug] }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pageSlug = slug?.[0];
  if (!pageSlug || !VETERAN_PAGES[pageSlug]) {
    return { title: 'Page Not Found' };
  }

  const page = VETERAN_PAGES[pageSlug];
  const title = page.title;

  return {
    title,
    description: page.description,
    alternates: { canonical: `${SITE_URL}/veterans/${pageSlug}` },
    openGraph: {
      title: `${title} | UCSG`,
      description: page.description,
      url: `${SITE_URL}/veterans/${pageSlug}`,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1152, height: 864, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | UCSG`,
      description: page.description,
      images: ['/og-image.png'],
    },
  };
}

export default async function VeteranSlugRoute({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const pageSlug = slug?.[0];
  if (!pageSlug || !VETERAN_PAGES[pageSlug]) {
    notFound();
  }
  return <VeteranSlugView slug={pageSlug} />;
}
