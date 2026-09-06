import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { resources, getResourceById } from '@/lib/data/resources';
import ResourcePageView from './view';

const SITE_URL = 'https://www.universalconsultingservices.com';

export function generateStaticParams() {
  return resources.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const res = getResourceById(id);
  if (!res) {
    return { title: 'Resource Not Found' };
  }

  const title = `${res.title} | UCSG`;
  const description = res.description.slice(0, 155);

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/resource/${res.id}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/resource/${res.id}`,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1152, height: 864, alt: res.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}

export default async function ResourceRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = getResourceById(id);
  if (!res) notFound();
  return <ResourcePageView resource={res} />;
}
