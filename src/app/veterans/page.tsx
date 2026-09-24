import type { Metadata } from 'next';
import VeteranHubView from './view';

const SITE_URL = 'https://www.universalconsultingservices.com';

export const metadata: Metadata = {
  title: 'Veteran Degree & Education Planning',
  description:
    'Explore degree options, education resources, military transfer-credit questions and veteran-focused education planning with UCSG. Bachelor\'s, Master\'s, MBA, and Online/Hybrid programs.',
  alternates: { canonical: `${SITE_URL}/veterans` },
  openGraph: {
    title: 'Veteran Degree & Education Planning | UCSG',
    description:
      'Explore degree options, compare programs, understand official education resources and build a clear plan for your next academic chapter.',
    url: `${SITE_URL}/veterans`,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1152, height: 864, alt: 'Veteran Degree & Education Planning' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veteran Degree & Education Planning | UCSG',
    description: 'Degree options, education resources, and veteran-focused education planning.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <VeteranHubView />;
}
