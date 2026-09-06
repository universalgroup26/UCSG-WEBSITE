import type { Metadata } from 'next';
import AboutView from './view';

const SITE_URL = 'https://www.universalconsultingservices.com';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Universal Consulting Service Group (UCSG) — an Army veteran-owned educational consulting service helping F-1 international students navigate U.S. university transfers, Day 1 CPT, and graduate programs.',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: 'About UCSG — Universal Consulting Service Group',
    description: 'Army veteran-owned educational guidance for F-1 international students in the United States.',
    url: `${SITE_URL}/about`,
    images: [{ url: '/og-image.png', width: 1152, height: 864 }],
  },
};

export default function Page() {
  return <AboutView />;
}
