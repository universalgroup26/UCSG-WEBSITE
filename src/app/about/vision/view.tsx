'use client';

import { useRouter } from 'next/navigation';
import VisionPage from '@/components/pages/VisionPage';

export default function VisionView() {
  const router = useRouter();
  return <VisionPage onBack={() => router.push('/')} />;
}
