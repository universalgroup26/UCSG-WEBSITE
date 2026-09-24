import type { Metadata } from 'next';
import ContactView from './view';

const SITE_URL = 'https://www.universalconsultingservices.com';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Universal Consulting Service Group for F-1 student guidance, university transfer support, Day 1 CPT, OPT/STEM OPT, and SEVIS reinstatement. Call +1 (302) 893-5594 or book a free assessment.',
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: 'Contact UCSG',
    description: 'Free assessment and personalized guidance for F-1 students.',
    url: `${SITE_URL}/contact`,
    images: [{ url: '/og-image.png', width: 1152, height: 864 }],
  },
};

export default function Page() {
  return <ContactView />;
}
