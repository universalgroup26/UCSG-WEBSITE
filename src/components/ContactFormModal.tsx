'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  GraduationCap,
  Phone,
  Mail,
  User,
  MessageSquare,
  Send,
  CheckCircle2,
  Flag,
  Building2,
  MapPin,
  Clock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { universities } from '@/lib/data/universities';

// USA Flag Colors
const USA_RED = '#B31942';
const USA_BLUE = '#002868';

interface ContactFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preSelectedUniversity?: string;
  mode?: 'apply' | 'contact';
}

export default function ContactFormModal({
  open,
  onOpenChange,
  preSelectedUniversity,
  mode = 'apply',
}: ContactFormModalProps) {
  // Use key-based reset via parent, so we just use preSelectedUniversity directly
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    university: '',
    program: '',
    message: '',
  });

  const effectiveUniversity = formData.university || preSelectedUniversity;
  const selectedUniData = universities.find((u) => u.id === effectiveUniversity);
  const programs = selectedUniData?.programs.map((p) => p.name) || [];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto rounded-2xl border-0 p-0 shadow-2xl sm:max-w-[520px]"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        {/* === Header with USA Flag stripe === */}
        <div className="relative overflow-hidden">
          {/* Top USA flag stripe bar */}
          <div
            className="h-2 w-full"
            style={{
              background: `linear-gradient(90deg, ${USA_BLUE} 0%, ${USA_BLUE} 33.33%, ${USA_RED} 33.33%, ${USA_RED} 66.66%, #FFFFFF 66.66%, #FFFFFF 100%)`,
            }}
          />

          {/* Blue header area */}
          <div
            className="relative px-6 pb-5 pt-6"
            style={{ backgroundColor: USA_BLUE }}
          >
            {/* Decorative circles */}
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/5" />
            <div className="absolute -left-4 -bottom-4 h-16 w-16 rounded-full bg-white/5" />

            {/* UCSG Logo / Branding */}
            <div className="relative flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-black tracking-tight text-white shadow-lg"
                style={{ backgroundColor: USA_RED }}
              >
                UC
              </div>
              <div>
                <DialogTitle className="text-left text-xl font-bold text-white">
                  {mode === 'apply' ? 'Apply Now' : 'Contact UCSG'}
                </DialogTitle>
                <DialogDescription className="text-left text-sm text-blue-200">
                  Universal Consulting Service Group
                </DialogDescription>
              </div>
              <div className="ml-auto flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1">
                <Flag className="h-3 w-3 fill-current text-white" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">USA</span>
              </div>
            </div>

            {/* Subtitle */}
            <p className="relative mt-4 text-sm leading-relaxed text-blue-100">
              {mode === 'apply'
                ? 'Fill out the form below and our admissions team will reach out within 24 hours with personalized guidance.'
                : 'Have questions? Our team is available 24/7 to help you with admissions, CPT, and enrollment.'}
            </p>

            {/* Quick contact badges */}
            <div className="relative mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white">
                <Phone className="h-3 w-3" />
                +1 (302) 893-5594
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white">
                <Mail className="h-3 w-3" />
                Info@universalconsultingservices.com
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white">
                <Clock className="h-3 w-3" />
                24/7 Support
              </span>
            </div>
          </div>
        </div>

        {/* === Form Body === */}
        <div className="px-6 pb-6 pt-5">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center py-8 text-center"
              >
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full"
                  style={{ backgroundColor: '#FEF2F2' }}
                >
                  <CheckCircle2 className="h-10 w-10" style={{ color: USA_RED }} />
                </div>
                <h3 className="mt-5 text-xl font-bold" style={{ color: USA_BLUE }}>
                  Application Submitted!
                </h3>
                <p className="mt-2 max-w-sm text-sm text-gray-500">
                  Thank you for your interest{selectedUniData ? ` in ${selectedUniData.name}` : ''}. A UCSG advisor will contact you within 24 hours with next steps.
                </p>
                <div className="mt-6 flex gap-3">
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ fullName: '', email: '', phone: '', university: preSelectedUniversity || '', program: '', message: '' });
                    }}
                    variant="outline"
                    className="rounded-full"
                  >
                    Submit Another
                  </Button>
                  <Button
                    onClick={() => onOpenChange(false)}
                    className="rounded-full text-white"
                    style={{ backgroundColor: USA_BLUE }}
                  >
                    Done
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Full Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="fullName"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                  >
                    <User className="h-3.5 w-3.5" style={{ color: USA_BLUE }} />
                    Full Name <span style={{ color: USA_RED }}>*</span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="h-11 rounded-xl border-gray-200 bg-gray-50/50 transition-colors focus:border-[#002868] focus:bg-white focus:ring-1 focus:ring-[#002868]/20"
                  />
                </div>

                {/* Email & Phone row */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                    >
                      <Mail className="h-3.5 w-3.5" style={{ color: USA_BLUE }} />
                      Email <span style={{ color: USA_RED }}>*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-11 rounded-xl border-gray-200 bg-gray-50/50 transition-colors focus:border-[#002868] focus:bg-white focus:ring-1 focus:ring-[#002868]/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                    >
                      <Phone className="h-3.5 w-3.5" style={{ color: USA_BLUE }} />
                      Phone <span style={{ color: USA_RED }}>*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (XXX) XXX-XXXX"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-11 rounded-xl border-gray-200 bg-gray-50/50 transition-colors focus:border-[#002868] focus:bg-white focus:ring-1 focus:ring-[#002868]/20"
                    />
                  </div>
                </div>

                {/* University Select */}
                <div className="space-y-2">
                  <Label
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                  >
                    <Building2 className="h-3.5 w-3.5" style={{ color: USA_BLUE }} />
                    University {mode === 'apply' && <span style={{ color: USA_RED }}>*</span>}
                  </Label>
                  <Select
                    value={effectiveUniversity}
                    onValueChange={(val) => setFormData({ ...formData, university: val, program: '' })}
                  >
                    <SelectTrigger className="h-11 w-full rounded-xl border-gray-200 bg-gray-50/50 transition-colors focus:border-[#002868] focus:bg-white focus:ring-1 focus:ring-[#002868]/20">
                      <SelectValue placeholder="Select a university" />
                    </SelectTrigger>
                    <SelectContent className="max-h-64 overflow-y-auto">
                      {universities.map((uni) => (
                        <SelectItem key={uni.id} value={uni.id}>
                          <span className="flex items-center gap-2">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            {uni.name}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Program Select (shows when university is selected) */}
                {programs.length > 0 && (
                  <div className="space-y-2">
                    <Label
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                    >
                      <GraduationCap className="h-3.5 w-3.5" style={{ color: USA_BLUE }} />
                      Program of Interest
                    </Label>
                    <Select
                      value={formData.program}
                      onValueChange={(val) => setFormData({ ...formData, program: val })}
                    >
                      <SelectTrigger className="h-11 w-full rounded-xl border-gray-200 bg-gray-50/50 transition-colors focus:border-[#002868] focus:bg-white focus:ring-1 focus:ring-[#002868]/20">
                        <SelectValue placeholder="Select a program" />
                      </SelectTrigger>
                      <SelectContent className="max-h-64 overflow-y-auto">
                        {programs.map((prog) => (
                          <SelectItem key={prog} value={prog}>
                            {prog}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Message */}
                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                  >
                    <MessageSquare className="h-3.5 w-3.5" style={{ color: USA_BLUE }} />
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your goals, questions, or any specific requirements..."
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="resize-none rounded-xl border-gray-200 bg-gray-50/50 transition-colors focus:border-[#002868] focus:bg-white focus:ring-1 focus:ring-[#002868]/20"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 h-12 w-full rounded-xl text-base font-bold text-white transition-all hover:shadow-lg"
                  style={{
                    background: isSubmitting
                      ? '#94A3B8'
                      : `linear-gradient(135deg, ${USA_BLUE} 0%, ${USA_RED} 100%)`,
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      {mode === 'apply' ? 'Submit Application' : 'Send Message'}
                    </>
                  )}
                </Button>

                {/* Footer text */}
                <p className="text-center text-[11px] text-gray-400">
                  By submitting, you agree to be contacted by UCSG. We respect your privacy.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
