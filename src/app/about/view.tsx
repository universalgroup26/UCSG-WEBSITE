'use client';

import { useRouter } from 'next/navigation';
import AboutPage from '@/components/pages/AboutPage';

export default function AboutView() {
  const router = useRouter();
  return <AboutPage onBack={() => router.push('/')} />;
}
