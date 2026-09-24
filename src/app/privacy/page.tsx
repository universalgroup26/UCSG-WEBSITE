import type { Metadata } from 'next';
import PrivacyView from './view';

const SITE_URL = 'https://www.universalconsultingservices.com';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'UCSG Privacy Policy — how Universal Consulting Service Group collects, uses, and protects your data. Covers Meta Pixel, GoHighLevel CRM, Google Analytics, Microsoft Clarity, and your GDPR/CCPA rights.',
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: {
    title: 'Privacy Policy | UCSG',
    description: 'How UCSG collects, uses, and protects your personal data.',
    url: `${SITE_URL}/privacy`,
    type: 'article',
    images: [{ url: '/og-image.png', width: 1152, height: 864 }],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <PrivacyView />;
}
