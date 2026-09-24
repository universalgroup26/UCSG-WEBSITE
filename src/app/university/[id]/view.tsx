'use client';

import { useRouter } from 'next/navigation';
import UniversityPage from '@/components/pages/UniversityPage';
import type { UniversityData } from '@/lib/data/universities';

/**
 * Client wrapper for the university route — provides navigation callbacks
 * (onBack → router.push('/'), onApplyClick → opens assessment popup).
 */
export default function UniversityPageView({ university }: { university: UniversityData }) {
  const router = useRouter();

  const handleBack = () => router.push('/');
  const handleApplyClick = () => {
    window.dispatchEvent(
      new CustomEvent('ucsg-assessment', { detail: { open: 'assessment' } }),
    );
  };

  return (
    <UniversityPage
      university={university}
      onBack={handleBack}
      onApplyClick={handleApplyClick}
    />
  );
}
