'use client';

import { useRouter } from 'next/navigation';
import ResourcePage from '@/components/pages/ResourcePage';
import type { ResourceData } from '@/lib/data/resources';

export default function ResourcePageView({ resource }: { resource: ResourceData }) {
  const router = useRouter();
  return <ResourcePage resource={resource} onBack={() => router.push('/')} />;
}
