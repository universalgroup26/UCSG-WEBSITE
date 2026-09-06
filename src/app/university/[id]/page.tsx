import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { universities, getUniversityById } from '@/lib/data/universities';
import UniversityPageView from './view';

const SITE_URL = 'https://www.universalconsultingservices.com';

// Pre-render all university pages at build time (fully static HTML for SEO)
export function generateStaticParams() {
  return universities.map((u) => ({ id: u.id }));
}

// Per-page metadata — unique title, description, canonical, OG tags for each university
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const uni = getUniversityById(id);
  if (!uni) {
    return { title: 'University Not Found' };
  }

  const title = `${uni.name} — Day 1 CPT & Graduate Programs | UCSG`;
  const description = `${uni.description.slice(0, 155)}...`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/university/${uni.id}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/university/${uni.id}`,
      type: 'website',
      images: [{ url: '/og-image.png', width: 1152, height: 864, alt: uni.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}

export default async function UniversityRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const uni = getUniversityById(id);
  if (!uni) notFound();
  return <UniversityPageView university={uni} />;
}
