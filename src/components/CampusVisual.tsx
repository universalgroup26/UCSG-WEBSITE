'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Users } from 'lucide-react';

export default function CampusVisual() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-[#F7F7F7]">
      <div className="grid items-center lg:grid-cols-2">
        {/* Image Side */}
        <div className="relative h-48 overflow-hidden sm:h-56 lg:h-64">
          <Image
            src="/images/campus.png"
            alt="American university campus with modern buildings"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F7F7F7]/30 lg:to-[#F7F7F7]" />
        </div>

        {/* Text Side */}
        <div className="p-5 sm:p-8">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E0F4F8]">
              <GraduationCap className="h-4 w-4 text-[#006F8F]" />
            </div>
            <h3 className="text-base font-bold text-[#1E2D3B] sm:text-lg">Accredited American Universities</h3>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-[#6B7280] sm:text-base">
            Our partner institutions offer state-of-the-art facilities, experienced faculty,
            and flexible programs designed for working professionals.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-1.5 text-sm text-[#4B5563]">
              <MapPin className="h-4 w-4 text-[#006F8F]" />
              <span>15+ States</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-[#4B5563]">
              <Users className="h-4 w-4 text-[#006F8F]" />
              <span>Diverse Programs</span>
            </div>
            <motion.div
              className="flex items-center gap-1.5 text-sm text-[#4B5563]"
              whileHover={{ x: 3 }}
            >
              <GraduationCap className="h-4 w-4 text-[#006F8F]" />
              <span>Day 1 CPT Available</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
