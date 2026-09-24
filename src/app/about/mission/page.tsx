import type { Metadata } from 'next';
import MissionView from './view';

const SITE_URL = 'https://www.universalconsultingservices.com';

export const metadata: Metadata = {
  title: 'Our Mission',
  description:
    'UCSG\'s mission: to empower F-1 international students with clear, honest, and actionable educational guidance for U.S. university transfers, CPT, and OPT.',
  alternates: { canonical: `${SITE_URL}/about/mission` },
  openGraph: {
    title: 'Our Mission | UCSG',
    description: 'Empowering F-1 students with honest educational guidance.',
    url: `${SITE_URL}/about/mission`,
    images: [{ url: '/og-image.png', width: 1152, height: 864 }],
  },
};

export default function Page() {
  return <MissionView />;
}
