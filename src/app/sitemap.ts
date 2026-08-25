import type { MetadataRoute } from 'next';
import { universities } from '@/lib/data/universities';
import { resources } from '@/lib/data/resources';

const SITE_URL = 'https://www.universalconsultingservices.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  // University pages (internal hash nav)
  const uniPages: MetadataRoute.Sitemap = universities.map((uni) => ({
    url: `${SITE_URL}/#university/${uni.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Resource/guide pages (internal hash nav)
  const resourcePages: MetadataRoute.Sitemap = resources.map((res) => ({
    url: `${SITE_URL}/#resource/${res.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...uniPages, ...resourcePages];
}
