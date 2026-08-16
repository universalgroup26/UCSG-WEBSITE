'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import UniversitiesSection from '@/components/UniversitiesSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <UniversitiesSection />
      </main>
      <Footer />
    </div>
  );
}
