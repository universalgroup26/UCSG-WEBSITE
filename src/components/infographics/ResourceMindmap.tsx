'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileText,
  Shield,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Scale,
  Users,
  Globe,
  Mail,
  Phone,
  CreditCard,
  BookOpen,
  Building,
  RefreshCw,
  XCircle,
  CheckCircle,
  Zap,
  Target,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

type MindmapNode = {
  label: string;
  icon?: React.ElementType;
  color?: string;
  children?: { label: string; icon?: React.ElementType; highlight?: boolean }[];
};

type MindmapConfig = {
  id: string;
  centerLabel: string;
  centerSublabel: string;
  branches: {
    label: string;
    icon: React.ElementType;
    color: string;
    bg: string;
    border: string;
    nodes: { label: string; icon?: React.ElementType; highlight?: boolean }[];
  }[];
};

const mindmapConfigs: Record<string, MindmapConfig> = {
  'day1-cpt': {
    id: 'day1-cpt',
    centerLabel: 'Day 1 CPT',
    centerSublabel: 'Complete Guide',
    branches: [
      {
        label: 'Eligibility',
        icon: CheckCircle,
        color: '#059669',
        bg: '#D1FAE5',
        border: '#6EE7B7',
        nodes: [
          { label: 'F-1 Visa Required', icon: Shield },
          { label: 'Graduate Program', icon: GraduationCap },
          { label: 'SEVP-Certified School', icon: Building },
          { label: 'Field-Related Job', icon: Briefcase },
        ],
      },
      {
        label: 'Process',
        icon: Clock,
        color: '#002868',
        bg: '#EFF6FF',
        border: '#BFDBFE',
        nodes: [
          { label: 'Choose University (1-2 days)', icon: Target },
          { label: 'Get Admitted & I-20 (1-3 wks)', icon: FileText },
          { label: 'DSO CPT Authorization (3-5 days)', icon: CheckCircle2 },
          { label: 'Start Working (Day 1)', icon: Zap },
        ],
      },
      {
        label: 'Benefits',
        icon: TrendingUp,
        color: '#D97706',
        bg: '#FEF3C7',
        border: '#FCD34D',
        nodes: [
          { label: 'Immediate Work Authorization', icon: Briefcase },
          { label: 'Earn While You Learn', icon: DollarSign },
          { label: 'Build US Experience', icon: Globe },
          { label: 'H-1B Transition Path', icon: ArrowRight },
        ],
      },
      {
        label: 'Key Rules',
        icon: AlertTriangle,
        color: '#DC2626',
        bg: '#FEE2E2',
        border: '#FCA5A5',
        nodes: [
          { label: 'Job Must Match Major', icon: BookOpen, highlight: true },
          { label: '12+ Mo Full-time = No OPT', icon: XCircle, highlight: true },
          { label: 'Part-time CPT OK', icon: CheckCircle2 },
          { label: 'DSO Updates I-20', icon: FileText },
        ],
      },
    ],
  },
  'university-transfers': {
    id: 'university-transfers',
    centerLabel: 'University',
    centerSublabel: 'Transfer Flow',
    branches: [
      {
        label: 'Why Transfer?',
        icon: AlertTriangle,
        color: '#DC2626',
        bg: '#FEE2E2',
        border: '#FCA5A5',
        nodes: [
          { label: 'SEVIS Terminated', icon: XCircle, highlight: true },
          { label: 'University Closed', icon: Building },
          { label: 'Need Day 1 CPT', icon: Briefcase },
          { label: 'Better Program Fit', icon: GraduationCap },
        ],
      },
      {
        label: 'UCSG Process',
        icon: Clock,
        color: '#002868',
        bg: '#EFF6FF',
        border: '#BFDBFE',
        nodes: [
          { label: 'Free Consultation (Same day)', icon: Phone },
          { label: 'Application Prep (1-3 days)', icon: FileText },
          { label: 'SEVIS Transfer (1-2 days)', icon: RefreshCw },
          { label: 'New I-20 + Enrollment (3-7 days)', icon: CheckCircle2 },
        ],
      },
      {
        label: 'What We Handle',
        icon: Users,
        color: '#7C3AED',
        bg: '#EDE9FE',
        border: '#C4B5FD',
        nodes: [
          { label: 'DSO Coordination', icon: Mail },
          { label: 'Credit Evaluation', icon: BookOpen },
          { label: 'SEVIS Record Transfer', icon: FileText },
          { label: 'CPT Authorization Setup', icon: Briefcase },
        ],
      },
      {
        label: 'Outcomes',
        icon: CheckCircle,
        color: '#059669',
        bg: '#D1FAE5',
        border: '#6EE7B7',
        nodes: [
          { label: '99%+ Success Rate', icon: TrendingUp },
          { label: 'No Gap in Status', icon: Shield },
          { label: 'Immediate CPT Access', icon: Zap },
          { label: '29+ University Options', icon: GraduationCap },
        ],
      },
    ],
  },
  'change-of-status': {
    id: 'change-of-status',
    centerLabel: 'F-1 Status',
    centerSublabel: 'Pathway Map',
    branches: [
      {
        label: 'From B1/B2',
        icon: Globe,
        color: '#002868',
        bg: '#EFF6FF',
        border: '#BFDBFE',
        nodes: [
          { label: 'File I-539', icon: FileText },
          { label: 'Get I-20 from University', icon: GraduationCap },
          { label: 'Show Non-Immigrant Intent', icon: Scale },
          { label: 'Wait for Approval (3-6 mo)', icon: Clock },
        ],
      },
      {
        label: 'From H4',
        icon: Users,
        color: '#7C3AED',
        bg: '#EDE9FE',
        border: '#C4B5FD',
        nodes: [
          { label: 'Spouse H-1B Valid', icon: CheckCircle },
          { label: 'File I-539', icon: FileText },
          { label: 'University Admission', icon: GraduationCap },
          { label: 'CPT After Approval', icon: Briefcase },
        ],
      },
      {
        label: 'From J1/J2',
        icon: RefreshCw,
        color: '#D97706',
        bg: '#FEF3C7',
        border: '#FCD34D',
        nodes: [
          { label: 'Check 2-Year Rule', icon: AlertTriangle, highlight: true },
          { label: 'Waiver if Applicable', icon: Shield },
          { label: 'File I-539', icon: FileText },
          { label: 'Maintain Status During Wait', icon: Clock },
        ],
      },
      {
        label: 'Key Requirements',
        icon: CheckCircle,
        color: '#059669',
        bg: '#D1FAE5',
        border: '#6EE7B7',
        nodes: [
          { label: 'Valid I-94 Required', icon: FileText, highlight: true },
          { label: 'No Unauthorized Work', icon: XCircle, highlight: true },
          { label: 'Financial Documentation', icon: CreditCard },
          { label: 'Program Start Date Alignment', icon: Target },
        ],
      },
    ],
  },
  'sevis-reinstatement': {
    id: 'sevis-reinstatement',
    centerLabel: 'SEVIS',
    centerSublabel: 'Recovery Map',
    branches: [
      {
        label: 'Common Causes',
        icon: AlertTriangle,
        color: '#DC2626',
        bg: '#FEE2E2',
        border: '#FCA5A5',
        nodes: [
          { label: 'Unauthorized Employment', icon: XCircle, highlight: true },
          { label: 'Below Full-Time Credits', icon: BookOpen },
          { label: 'I-20 Expired', icon: FileText },
          { label: 'No Enrollment', icon: GraduationCap },
        ],
      },
      {
        label: 'Reinstatement Path',
        icon: ArrowRight,
        color: '#002868',
        bg: '#EFF6FF',
        border: '#BFDBFE',
        nodes: [
          { label: 'File Within 5 Months', icon: Clock, highlight: true },
          { label: 'Gather Evidence', icon: FileText },
          { label: 'Draft Personal Statement', icon: BookOpen },
          { label: 'Submit I-539', icon: CheckCircle2 },
        ],
      },
      {
        label: 'Evidence Needed',
        icon: Shield,
        color: '#7C3AED',
        bg: '#EDE9FE',
        border: '#C4B5FD',
        nodes: [
          { label: 'Financial Records', icon: CreditCard },
          { label: 'Enrollment Proof', icon: GraduationCap },
          { label: 'Medical Records (if applicable)', icon: FileText },
          { label: 'Proof Beyond Your Control', icon: Scale },
        ],
      },
      {
        label: 'If Denied',
        icon: XCircle,
        color: '#D97706',
        bg: '#FEF3C7',
        border: '#FCD34D',
        nodes: [
          { label: 'Leave US Promptly', icon: Globe, highlight: true },
          { label: 'Travel & Re-entry Option', icon: RefreshCw },
          { label: 'University Transfer Backup', icon: GraduationCap },
          { label: 'UCSG Helps Plan B', icon: Users },
        ],
      },
    ],
  },
  'stem-opt': {
    id: 'stem-opt',
    centerLabel: 'STEM OPT',
    centerSublabel: 'Decision Map',
    branches: [
      {
        label: 'STEM OPT Facts',
        icon: BookOpen,
        color: '#002868',
        bg: '#EFF6FF',
        border: '#BFDBFE',
        nodes: [
          { label: '24-Month Extension', icon: Clock },
          { label: '36 Months Total Work Auth', icon: Briefcase },
          { label: 'E-Verify Employer Required', icon: Building },
          { label: 'I-983 Training Plan', icon: FileText },
        ],
      },
      {
        label: 'If Denied',
        icon: XCircle,
        color: '#DC2626',
        bg: '#FEE2E2',
        border: '#FCA5A5',
        nodes: [
          { label: 'Grace Period Applies', icon: Clock, highlight: true },
          { label: 'Act Immediately', icon: Zap, highlight: true },
          { label: 'UCSG Backup Admission (1-3 days)', icon: GraduationCap },
          { label: 'Day 1 CPT as Safety Net', icon: Shield },
        ],
      },
      {
        label: 'UCSG Backup Plan',
        icon: Shield,
        color: '#059669',
        bg: '#D1FAE5',
        border: '#6EE7B7',
        nodes: [
          { label: 'Emergency University Admission', icon: Zap },
          { label: 'I-20 Transfer & CPT Auth', icon: FileText },
          { label: 'Continue Working Legally', icon: Briefcase },
          { label: 'Resolve USCIS Matters', icon: Scale },
        ],
      },
      {
        label: 'Planning Tips',
        icon: Target,
        color: '#D97706',
        bg: '#FEF3C7',
        border: '#FCD34D',
        nodes: [
          { label: 'Start 2-3 Months Before Expiry', icon: Clock, highlight: true },
          { label: 'Keep All Employment Records', icon: FileText },
          { label: 'Report Changes to DSO', icon: Mail },
          { label: 'Annual Self-Evaluation', icon: CheckCircle2 },
        ],
      },
    ],
  },
};

interface Props {
  resourceId: string;
}

export default function ResourceMindmap({ resourceId }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const config = mindmapConfigs[resourceId];

  if (!config) return null;

  return (
    <section ref={ref} className="bg-[#F8FAFC] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block rounded-full bg-[#EFF6FF] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#002868]">
            Mindmap
          </span>
          <h2 className="mt-4 text-xl font-bold text-[#0F172A] sm:text-2xl">
            {config.centerLabel} — At a Glance
          </h2>
          <p className="mt-2 text-sm text-[#6B7280] sm:text-base">
            Everything you need to know about {config.centerSublabel.toLowerCase()}
          </p>
        </motion.div>

        {/* Desktop: 2x2 grid with center hub */}
        <div className="hidden lg:block">
          <div className="relative mx-auto max-w-6xl">
            {/* Center hub */}
            <motion.div
              className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
            >
              <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#002868] to-[#001B4D] text-center shadow-xl">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-200">{config.centerSublabel}</p>
                <p className="text-lg font-extrabold leading-tight text-white">{config.centerLabel}</p>
              </div>
            </motion.div>

            {/* Grid of branches */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 py-2">
              {config.branches.map((branch, i) => (
                <MindmapBranch key={branch.label} branch={branch} index={i} isInView={isInView} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Stacked */}
        <div className="space-y-4 lg:hidden">
          {/* Mobile center hub */}
          <motion.div
            className="mx-auto mb-4 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#002868] to-[#001B4D] text-center shadow-xl"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
          >
            <p className="text-xs font-bold text-white">{config.centerLabel}</p>
          </motion.div>

          {config.branches.map((branch, i) => {
            const BranchIcon = branch.icon;
            return (
              <motion.div
                key={branch.label}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="rounded-xl border p-4"
                  style={{ borderColor: branch.border, backgroundColor: branch.bg }}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{ backgroundColor: branch.color }}
                    >
                      <BranchIcon className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-[#0F172A]">{branch.label}</h3>
                  </div>
                  <div className="space-y-1.5">
                    {branch.nodes.map((node) => {
                      const NodeIcon = node.icon || CheckCircle2;
                      return (
                        <div
                          key={node.label}
                          className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm ${node.highlight ? 'bg-white/80 font-medium' : 'bg-white/50'}`}
                        >
                          <NodeIcon
                            className={`h-3.5 w-3.5 shrink-0 ${node.highlight ? '' : 'opacity-70'}`}
                            style={{ color: node.highlight ? branch.color : '#6B7280' }}
                          />
                          <span className={node.highlight ? 'text-[#0F172A]' : 'text-[#4B5563]'}>
                            {node.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MindmapBranch({
  branch,
  index,
  isInView,
}: {
  branch: MindmapConfig['branches'][0];
  index: number;
  isInView: boolean;
}) {
  const BranchIcon = branch.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
    >
      <div
        className="rounded-2xl border p-5 sm:p-6"
        style={{ borderColor: branch.border, backgroundColor: branch.bg }}
      >
        <div className="mb-4 flex items-center gap-3">
          <motion.div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-md"
            style={{ backgroundColor: branch.color }}
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.3 }}
          >
            <BranchIcon className="h-5 w-5 text-white" />
          </motion.div>
          <h3 className="text-base font-bold text-[#0F172A] sm:text-lg">{branch.label}</h3>
        </div>
        <div className="space-y-2">
          {branch.nodes.map((node, j) => {
            const NodeIcon = node.icon || CheckCircle2;
            return (
              <motion.div
                key={node.label}
                className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 ${node.highlight ? 'bg-white/80 shadow-sm' : 'bg-white/50'}`}
                initial={{ opacity: 0, x: -8 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.35 + index * 0.1 + j * 0.06, duration: 0.3 }}
              >
                <NodeIcon
                  className={`h-4 w-4 shrink-0 ${node.highlight ? '' : 'opacity-60'}`}
                  style={{ color: node.highlight ? branch.color : '#6B7280' }}
                />
                <span className={`text-sm ${node.highlight ? 'font-semibold text-[#0F172A]' : 'text-[#4B5563]'}`}>
                  {node.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
