import type { Metadata } from 'next';
import JacksonHeightsView from './view';

const SITE_URL = 'https://www.universalconsultingservices.com';

export const metadata: Metadata = {
  title: 'Education Consultant Jackson Heights NY',
  description:
    'UCSG is an education consultant in Jackson Heights, Queens, NY helping F-1 international students with university transfers, graduate program comparison, Day 1 CPT, and veteran education planning. Call +1 (302) 893-5594.',
  alternates: { canonical: `${SITE_URL}/jackson-heights` },
  openGraph: {
    title: 'Education Consultant Jackson Heights NY | UCSG',
    description:
      'F-1 student education consultant in Jackson Heights, Queens. University transfers, graduate programs, CPT/OPT guidance, and veteran education planning.',
    url: `${SITE_URL}/jackson-heights`,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1152, height: 864, alt: 'UCSG — Jackson Heights Education Consultant' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Education Consultant Jackson Heights NY | UCSG',
    description: 'F-1 student education consultant in Jackson Heights, Queens.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <JacksonHeightsView />;
}
