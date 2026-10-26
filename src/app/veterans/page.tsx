import type { Metadata } from 'next';
import VeteranHubView from './view';

const SITE_URL = 'https://www.universalconsultingservices.com';

export const metadata: Metadata = {
  title: 'Veteran Education Planning for Your Next Mission',
  description:
    'Compare degree paths, prepare military-credit questions, and organize your next college decision with veteran-led guidance from UCSG. Free assessment available.',
  alternates: { canonical: `${SITE_URL}/veterans` },
  openGraph: {
    title: 'Veteran Education Planning for Your Next Mission | UCSG',
    description:
      'Compare degree paths, prepare military-credit questions, and organize your next college decision with veteran-led guidance.',
    url: `${SITE_URL}/veterans`,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1152, height: 864, alt: 'Veteran Degree & Education Planning' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veteran Education Planning for Your Next Mission | UCSG',
    description: 'Compare degree paths, prepare military-credit questions, and organize your next college decision.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <VeteranHubView />;
}
