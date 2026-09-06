import type { Metadata } from 'next';
import CareerView from './view';

const SITE_URL = 'https://www.universalconsultingservices.com';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join Universal Consulting Service Group — help F-1 international students achieve their U.S. education goals. Explore career opportunities with UCSG.',
  alternates: { canonical: `${SITE_URL}/about/career` },
  openGraph: {
    title: 'Careers | UCSG',
    description: 'Help F-1 students achieve their U.S. education goals.',
    url: `${SITE_URL}/about/career`,
    images: [{ url: '/og-image.png', width: 1152, height: 864 }],
  },
};

export default function Page() {
  return <CareerView />;
}
