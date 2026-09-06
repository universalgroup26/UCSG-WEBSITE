'use client';

import { useRouter } from 'next/navigation';
import CareerPage from '@/components/pages/CareerPage';

export default function CareerView() {
  const router = useRouter();
  return <CareerPage onBack={() => router.push('/')} />;
}
