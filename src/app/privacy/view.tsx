'use client';

import { useRouter } from 'next/navigation';
import PrivacyPage from '@/components/pages/PrivacyPage';

export default function PrivacyView() {
  const router = useRouter();
  return <PrivacyPage onBack={() => router.push('/')} />;
}
