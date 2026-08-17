'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  AlertTriangle,
  Shield,
  RefreshCw,
  Globe,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Scale,
  GraduationCap,
} from 'lucide-react';

export default function SEVISRecoveryFlowchart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block rounded-full bg-[#FEE2E2] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#DC2626]">
            Decision Tree
          </span>
          <h2 className="mt-4 text-xl font-bold text-[#1E2D3B] sm:text-2xl">
            SEVIS Termination — Your Recovery Options
          </h2>
          <p className="mt-2 text-sm text-[#6B7280] sm:text-base">
            A clear decision path based on your specific situation
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          {/* Trigger Node */}
          <motion.div
            className="mx-auto mb-8 flex w-fit flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#DC2626] shadow-lg">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
            <p className="mt-2 text-center text-sm font-bold text-[#1E2D3B] sm:text-base">SEVIS Terminated</p>
          </motion.div>

          {/* Decision: Within 5 months? */}
          <motion.div
            className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full bg-[#FEF3C7] px-5 py-2.5 shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Scale className="h-5 w-5 text-[#D97706]" />
            <span className="text-sm font-semibold text-[#1E2D3B]">Within 5 months of termination?</span>
          </motion.div>

          {/* Two paths */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* YES Path - Reinstatement */}
            <motion.div
              className="rounded-2xl border-2 border-[#059669] bg-[#D1FAE5]/30 p-5 sm:p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#059669] text-xs font-bold text-white">YES</span>
                <h3 className="text-base font-bold text-[#059669] sm:text-lg">Reinstatement (I-539)</h3>
              </div>

              <div className="space-y-3">
                {[
                  { icon: FileText, label: 'File Form I-539 with USCIS', desc: 'Reinstatement application' },
                  { icon: Shield, label: 'Strong Evidence Package', desc: 'Financial, enrollment, medical records' },
                  { icon: FileText, label: 'Personal Statement', desc: 'Explain circumstances beyond control' },
                  { icon: Clock, label: 'Wait 3-6 Months', desc: 'Cannot work during wait' },
                  { icon: CheckCircle2, label: 'If Approved', desc: 'SEVIS restored, continue studies + CPT' },
                ].map((step, j) => {
                  const StepIcon = step.icon;
                  return (
                    <motion.div
                      key={step.label}
                      className="flex items-start gap-3 rounded-xl bg-white/70 p-3"
                      initial={{ opacity: 0, y: 8 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + j * 0.08, duration: 0.3 }}
                    >
                      <StepIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#059669]" />
                      <div>
                        <p className="text-sm font-semibold text-[#1E2D3B]">{step.label}</p>
                        <p className="text-xs text-[#6B7280]">{step.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* If denied sub-path */}
              <div className="mt-4 rounded-xl border border-[#FCA5A5] bg-[#FEE2E2]/50 p-3">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-[#DC2626]">
                  <XCircle className="h-3.5 w-3.5" />
                  If Denied:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-[#DC2626] sm:text-xs">Depart US</span>
                  <span className="text-[#D97706]">→</span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-[#D97706] sm:text-xs">New F-1 Visa</span>
                  <span className="text-[#D97706]">→</span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-[#059669] sm:text-xs">Re-enter & Study</span>
                </div>
              </div>
            </motion.div>

            {/* NO/ALTERNATIVE Path - Transfer or Travel */}
            <motion.div
              className="rounded-2xl border-2 border-[#006F8F] bg-[#E0F4F8]/30 p-5 sm:p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#006F8F] text-xs font-bold text-white">NO</span>
                <h3 className="text-base font-bold text-[#006F8F] sm:text-lg">Transfer or Travel & Re-entry</h3>
              </div>

              <div className="space-y-3">
                {[
                  { icon: GraduationCap, label: 'University Transfer', desc: 'New I-20 from Day 1 CPT university' },
                  { icon: RefreshCw, label: 'SEVIS Record Transfer', desc: 'UCSG coordinates with DSOs' },
                  { icon: Globe, label: 'OR: Travel & Re-entry', desc: 'Depart US, get new F-1 visa, re-enter' },
                  { icon: CheckCircle2, label: 'New SEVIS Record', desc: 'Clean start with new I-20' },
                  { icon: Clock, label: 'Much Faster', desc: '1-3 weeks vs 3-6 months' },
                ].map((step, j) => {
                  const StepIcon = step.icon;
                  return (
                    <motion.div
                      key={step.label}
                      className="flex items-start gap-3 rounded-xl bg-white/70 p-3"
                      initial={{ opacity: 0, y: 8 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + j * 0.08, duration: 0.3 }}
                    >
                      <StepIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#006F8F]" />
                      <div>
                        <p className="text-sm font-semibold text-[#1E2D3B]">{step.label}</p>
                        <p className="text-xs text-[#6B7280]">{step.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* UCSG recommendation */}
              <div className="mt-4 rounded-xl border border-[#B3E5EC] bg-[#E0F4F8] p-3">
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-[#006F8F]">
                  <Shield className="h-3.5 w-3.5" />
                  UCSG Recommendation:
                </p>
                <p className="text-xs leading-relaxed text-[#4B5563]">
                  We often recommend the <strong>transfer or travel route</strong> as it&apos;s significantly faster and has a higher success rate than reinstatement.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom: UCSG handles both */}
          <motion.div
            className="mt-8 flex flex-col items-center rounded-2xl bg-gradient-to-r from-[#006F8F] to-[#005A73] p-6 text-center shadow-lg sm:mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <p className="text-sm font-bold text-white sm:text-base">Don&apos;t panic — UCSG handles both paths 24/7</p>
            <p className="mt-1 text-xs text-teal-200 sm:text-sm">Free consultation · Same-day assessment · No obligation</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
