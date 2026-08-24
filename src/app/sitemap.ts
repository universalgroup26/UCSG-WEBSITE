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
    {
      url: `${SITE_URL}/#contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#scholarships`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // University pages
  const uniPages: MetadataRoute.Sitemap = universities.map((uni) => ({
    url: `${SITE_URL}/#university/${uni.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Resource/guide pages
  const resourcePages: MetadataRoute.Sitemap = resources.map((res) => ({
    url: `${SITE_URL}/#resource/${res.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...uniPages, ...resourcePages];
}
