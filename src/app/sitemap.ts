import type { MetadataRoute } from 'next';
import { universities } from '@/lib/data/universities';
import { resources } from '@/lib/data/resources';

const SITE_URL = 'https://www.universalconsultingservices.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static pages — real routes (crawable, indexable)
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/about/mission`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/about/vision`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/about/career`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // University detail pages — real dynamic routes
  const uniPages: MetadataRoute.Sitemap = universities.map((uni) => ({
    url: `${SITE_URL}/university/${uni.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Resource/guide pages — real dynamic routes
  const resourcePages: MetadataRoute.Sitemap = resources.map((res) => ({
    url: `${SITE_URL}/resource/${res.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...uniPages, ...resourcePages];
}
