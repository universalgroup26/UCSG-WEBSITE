import type { Metadata } from 'next';
import VisionView from './view';

const SITE_URL = 'https://www.universalconsultingservices.com';

export const metadata: Metadata = {
  title: 'Our Vision',
  description:
    'UCSG envisions a future where every F-1 international student has access to transparent, expert guidance for their U.S. education journey.',
  alternates: { canonical: `${SITE_URL}/about/vision` },
  openGraph: {
    title: 'Our Vision | UCSG',
    description: 'Transparent, expert guidance for every F-1 student.',
    url: `${SITE_URL}/about/vision`,
    images: [{ url: '/og-image.png', width: 1152, height: 864 }],
  },
};

export default function Page() {
  return <VisionView />;
}
