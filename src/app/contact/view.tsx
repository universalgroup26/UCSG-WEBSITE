'use client';

import { useRouter } from 'next/navigation';
import ContactPage from '@/components/pages/ContactPage';

export default function ContactView() {
  const router = useRouter();
  return <ContactPage onBack={() => router.push('/')} />;
}
