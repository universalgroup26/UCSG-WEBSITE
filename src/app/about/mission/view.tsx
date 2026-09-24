'use client';

import { useRouter } from 'next/navigation';
import MissionPage from '@/components/pages/MissionPage';

export default function MissionView() {
  const router = useRouter();
  return <MissionPage onBack={() => router.push('/')} />;
}
