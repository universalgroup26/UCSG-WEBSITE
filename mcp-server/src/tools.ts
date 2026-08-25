import { universities, getUniversityById, type McpUniversity, type McpProgram } from './data/universities.js';
import { getResourceByTopic, resourceTopics } from './data/resources.js';

// ============================================================
// MCP Tool Types
// ============================================================

export interface McpTool {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

export interface CallToolResult {
  content: Array<{ type: 'text'; text: string }>;
  isError?: boolean;
}

// ============================================================
// Tool Definitions
// ============================================================

export const tools: McpTool[] = [
  {
    name: 'search_universities',
    description:
      'Search UCSG partner universities by name, state, program type, CPT availability, and other criteria. Returns a filtered list of universities matching your search parameters. Use this to find universities that fit a student\'s specific needs.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Partial or full university name to search for (e.g., "Trine", "Westcliff")',
        },
        state: {
          type: 'string',
          description: 'U.S. state abbreviation to filter by (e.g., "CA", "NY", "IN")',
        },
        programType: {
          type: 'string',
          description: 'Filter by program type: "Master", "PhD", "Bachelor", "STEM", "Non-STEM", "Online", "Hybrid", "On-Campus"',
        },
        cptAvailable: {
          type: 'boolean',
          description: 'Filter universities that offer CPT (true) or do not offer CPT (false). Omit to include all.',
        },
        day1Cpt: {
          type: 'boolean',
          description: 'Filter universities that offer Day 1 CPT (true) or do not (false). Omit to include all.',
        },
        stemOPT: {
          type: 'boolean',
          description: 'Filter universities that have STEM OPT eligible programs (true) or do not (false). Omit to include all.',
        },
        type: {
          type: 'string',
          description: 'Filter by institution type: "University", "College", "Language", "Institute"',
        },
      },
    },
  },
  {
    name: 'get_university_details',
    description:
      'Get detailed information about a specific UCSG partner university including programs, tuition, admission requirements, CPT policies, and key facts. Use the university ID (e.g., "trine", "westcliff", "touro") to look up the university.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'University ID (e.g., "trine", "monroe", "westcliff", "touro", "saint-francis", "curry", "seattle-colleges", "bluedata-esl", "windsor-school", "international-american-university", "sullivan", "harrisburg", "necb", "cumberlands", "uca")',
        },
      },
      required: ['id'],
    },
  },
  {
    name: 'search_programs',
    description:
      'Search for specific academic programs across all UCSG partner universities. Find programs by level (Master, PhD), type (STEM, Non-STEM), delivery format (Online, Hybrid, On-Campus), or keyword.',
    inputSchema: {
      type: 'object',
      properties: {
        level: {
          type: 'string',
          description: 'Program level: "Master", "PhD", "Bachelor", "Associate", "Certificate"',
        },
        type: {
          type: 'string',
          description: 'Program type: "STEM" or "Non-STEM"',
        },
        delivery: {
          type: 'string',
          description: 'Delivery format: "Online", "Hybrid", or "On-Campus"',
        },
        keyword: {
          type: 'string',
          description: 'Keyword to search in program names (e.g., "Computer", "Business", "Data", "MBA")',
        },
      },
    },
  },
  {
    name: 'get_cpt_guidance',
    description:
      'Get comprehensive guidance on CPT vs OPT, including eligibility requirements, application processes, impact on immigration status, and strategic recommendations for F-1 students.',
    inputSchema: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          description: 'Specific CPT/OPT topic: "comparison" (CPT vs OPT comparison), "day1-cpt" (Day 1 CPT specifics), "opt" (post-completion OPT), "stem-opt" (STEM OPT extension), "impact" (impact on H-1B and green card)',
          enum: ['comparison', 'day1-cpt', 'opt', 'stem-opt', 'impact'],
        },
      },
    },
  },
  {
    name: 'get_transfer_checklist',
    description:
      'Get a step-by-step SEVIS transfer checklist for F-1 students transferring between universities. Includes timelines, required documents, and important warnings about common pitfalls.',
    inputSchema: {
      type: 'object',
      properties: {
        situation: {
          type: 'string',
          description: 'Transfer situation: "standard" (normal active SEVIS transfer), "emergency" (SEVIS terminated, need immediate action), "post-completion" (after program end)',
          enum: ['standard', 'emergency', 'post-completion'],
        },
      },
    },
  },
  {
    name: 'get_visa_guidance',
    description:
      'Get guidance on changing visa status to F-1 from other non-immigrant categories (B1/B2, H4, H1B, J1/J2, L1/L2, etc.). Includes eligibility requirements, process overview, and timeline expectations.',
    inputSchema: {
      type: 'object',
      properties: {
        fromVisa: {
          type: 'string',
          description: 'Current visa status (e.g., "B1/B2", "H4", "H1B", "J1", "J2", "L2", "TN", "F2", "E2")',
        },
      },
    },
  },
  {
    name: 'calculate_cost_estimate',
    description:
      'Estimate the total cost of attending a specific university program, including tuition, estimated living expenses, and other costs for the full program duration.',
    inputSchema: {
      type: 'object',
      properties: {
        universityId: {
          type: 'string',
          description: 'University ID (e.g., "trine", "westcliff", "touro")',
        },
        programIndex: {
          type: 'number',
          description: 'Index of the program at the university (0-based, as shown in university details). Use -1 or omit to show all programs.',
        },
        location: {
          type: 'string',
          description: 'Living location preference: "metro" (major city, higher cost) or "suburban" (lower cost of living)',
          enum: ['metro', 'suburban'],
        },
        dependents: {
          type: 'number',
          description: 'Number of dependents (spouse, children) accompanying the student. Default: 0.',
        },
      },
      required: ['universityId'],
    },
  },
  {
    name: 'get_scholarship_tips',
    description:
      'Get scholarship search guidance, application tips, and information about financial aid resources for international F-1 students. Includes university-specific scholarship information and external funding sources.',
    inputSchema: {
      type: 'object',
      properties: {
        universityId: {
          type: 'string',
          description: 'Optional university ID to get university-specific scholarship information (e.g., "trine", "westcliff")',
        },
      },
    },
  },
  {
    name: 'get_resource',
    description:
      'Get any F-1 student resource by topic. Available topics: university-transfers, day1-cpt, stem-opt, change-of-status, sevis-reinstatement, scholarships. Returns comprehensive markdown content with guidance and actionable steps.',
    inputSchema: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          description: `Resource topic. Available topics: ${resourceTopics.join(', ')}`,
        },
      },
      required: ['topic'],
    },
  },
];

// ============================================================
// Cost Estimation Data (monthly living costs by location type)
// ============================================================

const livingCosts: Record<string, { rent: number; food: number; transport: number; insurance: number; personal: number; dependentPerPerson: number }> = {
  metro: { rent: 1500, food: 400, transport: 150, insurance: 250, personal: 200, dependentPerPerson: 800 },
  suburban: { rent: 900, food: 300, transport: 100, insurance: 200, personal: 150, dependentPerPerson: 600 },
};

const programDurationMonths: Record<string, number> = {
  'Master': 24,
  'PhD': 48,
  'Bachelor': 48,
  'Associate': 24,
  'Certificate': 6,
  'High School': 24,
};

function parseTuitionRange(tuition: string): { min: number; max: number } {
  const match = tuition.match(/\$([\d,]+)\s*[-–]\s*\$([\d,]+)/);
  if (!match) return { min: 15000, max: 22000 };
  const min = parseInt(match[1].replace(/,/g, ''), 10);
  const max = parseInt(match[2].replace(/,/g, ''), 10);
  return { min, max };
}

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`;
}

// ============================================================
// Tool Handlers
// ============================================================

export function handleToolCall(name: string, args: Record<string, unknown>): CallToolResult {
  const handler = toolHandlers[name as keyof typeof toolHandlers];
  if (!handler) {
    return {
      content: [{ type: 'text', text: `Unknown tool: ${name}` }],
      isError: true,
    };
  }
  return handler(args as any);
}

const toolHandlers: Record<string, (args: any) => CallToolResult> = {
  // ----------------------------------------------------------
  // search_universities
  // ----------------------------------------------------------
  search_universities(args: {
    name?: string;
    state?: string;
    programType?: string;
    cptAvailable?: boolean;
    day1Cpt?: boolean;
    stemOPT?: boolean;
    type?: string;
  }) {
    let results = [...universities];

    if (args.name) {
      const q = args.name.toLowerCase();
      results = results.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.shortName.toLowerCase().includes(q) ||
          u.id.toLowerCase().includes(q)
      );
    }

    if (args.state) {
      const q = args.state.toUpperCase();
      results = results.filter((u) => u.state === q);
    }

    if (args.cptAvailable !== undefined) {
      results = results.filter((u) => u.cptAvailable === args.cptAvailable);
    }

    if (args.day1Cpt !== undefined) {
      results = results.filter((u) => u.day1Cpt === args.day1Cpt);
    }

    if (args.stemOPT !== undefined) {
      results = results.filter((u) => u.stemOPT === args.stemOPT);
    }

    if (args.type) {
      const q = args.type.toLowerCase();
      results = results.filter((u) => u.type.toLowerCase() === q);
    }

    if (args.programType) {
      const q = args.programType.toLowerCase();
      results = results.filter((u) =>
        u.programs.some((p) => {
          const searchStr = `${p.name} ${p.level} ${p.type} ${p.delivery}`.toLowerCase();
          return searchStr.includes(q);
        })
      );
    }

    if (results.length === 0) {
      return {
        content: [{ type: 'text', text: 'No universities matched your search criteria. Try broadening your filters.' }],
      };
    }

    const text = results
      .map((u) => {
        const programList = u.programs
          .map((p) => `  - ${p.name} (${p.level}, ${p.type}, ${p.delivery})`)
          .join('\n');
        return `## ${u.name} (${u.id})
- **Location:** ${u.location}, ${u.state}
- **Type:** ${u.type}
- **CPT Available:** ${u.cptAvailable ? 'Yes' + (u.day1Cpt ? ' (Day 1)' : '') : 'No'}
- **STEM OPT Eligible:** ${u.stemOPT ? 'Yes' : 'No'}
- **Tuition:** ${u.tuition}
- **Programs:**
${programList}
- **Website:** ${u.website}`;
      })
      .join('\n\n');

    return {
      content: [{ type: 'text', text: `# University Search Results (${results.length} found)\n\n${text}` }],
    };
  },

  // ----------------------------------------------------------
  // get_university_details
  // ----------------------------------------------------------
  get_university_details(args: { id: string }) {
    const uni = getUniversityById(args.id);
    if (!uni) {
      return {
        content: [
          {
            type: 'text',
            text: `University not found with ID "${args.id}". Available IDs: ${universities.map((u) => u.id).join(', ')}`,
          },
        ],
        isError: true,
      };
    }

    const programsList = uni.programs
      .map((p, i) => `${i}. ${p.name} — **Level:** ${p.level} | **Type:** ${p.type} | **Delivery:** ${p.delivery}`)
      .join('\n');

    const facts = Object.entries(uni.keyFacts)
      .map(([k, v]) => `- **${k}:** ${v}`)
      .join('\n');

    return {
      content: [
        {
          type: 'text',
          text: `# ${uni.name}

${uni.description}

## Key Information
- **Location:** ${uni.location}, ${uni.state}
- **Institution Type:** ${uni.type}
- **Founded:** ${uni.founded}
- **Enrollment:** ${uni.enrollment}
- **Accreditation:** ${uni.accreditation}
- **Website:** ${uni.website}

## CPT & Work Authorization
- **CPT Available:** ${uni.cptAvailable ? 'Yes' : 'No'}
- **Day 1 CPT:** ${uni.day1Cpt ? 'Yes' : 'No'}
- **STEM OPT Eligible:** ${uni.stemOPT ? 'Yes' : 'No'}

## Programs (${uni.programs.length})
${programsList}

## Tuition & Costs
- **Tuition Range:** ${uni.tuition}

## Admission Requirements
- **English Requirements:** ${uni.englishRequirements}
- **Semester Starts:** ${uni.semesterStarts}

## Key Facts
${facts}`,
        },
      ],
    };
  },

  // ----------------------------------------------------------
  // search_programs
  // ----------------------------------------------------------
  search_programs(args: {
    level?: string;
    type?: string;
    delivery?: string;
    keyword?: string;
  }) {
    const matches: Array<{ university: McpUniversity; program: McpProgram }> = [];

    for (const uni of universities) {
      for (const prog of uni.programs) {
        let match = true;

        if (args.level && prog.level.toLowerCase() !== args.level.toLowerCase()) {
          match = false;
        }
        if (args.type && prog.type.toLowerCase() !== args.type.toLowerCase()) {
          match = false;
        }
        if (args.delivery && prog.delivery.toLowerCase() !== args.delivery.toLowerCase()) {
          match = false;
        }
        if (args.keyword) {
          const q = args.keyword.toLowerCase();
          if (!prog.name.toLowerCase().includes(q)) {
            match = false;
          }
        }

        if (match) {
          matches.push({ university: uni, program: prog });
        }
      }
    }

    if (matches.length === 0) {
      return {
        content: [{ type: 'text', text: 'No programs matched your search criteria. Try adjusting your filters.' }],
      };
    }

    const text = matches
      .map(({ university: u, program: p }) => {
        return `### ${p.name}
- **University:** ${u.name} (${u.id})
- **Level:** ${p.level}
- **Type:** ${p.type}
- **Delivery:** ${p.delivery}
- **CPT:** ${u.cptAvailable ? (u.day1Cpt ? 'Day 1 CPT' : 'CPT Available') : 'No CPT'}
- **Tuition:** ${u.tuition}
- **Website:** ${u.website}`;
      })
      .join('\n\n');

    return {
      content: [{ type: 'text', text: `# Program Search Results (${matches.length} programs found)\n\n${text}` }],
    };
  },

  // ----------------------------------------------------------
  // get_cpt_guidance
  // ----------------------------------------------------------
  get_cpt_guidance(args: { topic?: string }) {
    const topic = args.topic || 'comparison';

    const guides: Record<string, string> = {
      comparison: `# CPT vs OPT: Complete Comparison

## Overview

**CPT (Curricular Practical Training)** and **OPT (Optional Practical Training)** are the two primary work authorization options for F-1 international students. Both allow you to gain work experience in the U.S., but they serve different purposes and have different rules.

## CPT (Curricular Practical Training)

- **Authorization:** Must be authorized by your DSO and reflected on your I-20
- **Eligibility:** Available from Day 1 if your program requires it; otherwise after 1 academic year
- **Work Type:** Must be directly related to your field of study and part of the curriculum
- **Hours:** Can be part-time (≤20 hrs/week) or full-time (>20 hrs/week)
- **Duration:** No cumulative limit for part-time CPT; 12 months max full-time before OPT is affected
- **Employer Requirement:** Must be related to your major; no E-Verify needed
- **USCIS Application:** No USCIS filing required — authorized by DSO directly
- **Best For:** Students who want to work while completing their degree, especially with Day 1 CPT programs

## OPT (Optional Practical Training)

- **Authorization:** Requires USCIS approval (Form I-765) — EAD card needed
- **Eligibility:** After completing 1 academic year (for pre-completion) or after graduation (post-completion)
- **Work Type:** Must be related to your field of study but not necessarily curricular
- **Hours:** Pre-completion: part-time only during semester, full-time during breaks. Post-completion: part-time or full-time
- **Duration:** 12 months total per degree level
- **STEM Extension:** Additional 24 months for STEM degrees (36 months total)
- **Employer Requirement:** E-Verify required for STEM OPT extension
- **USCIS Application:** Must file Form I-765 with USCIS; 2-5 month processing
- **Best For:** Post-graduation employment; students who want maximum work authorization after completing their degree

## Key Differences

| Feature | CPT | OPT |
|---------|-----|-----|
| Authorized By | DSO (I-20) | USCIS (EAD Card) |
| Processing Time | Days | 2-5 Months |
| Available Before Graduation | Yes (Day 1 or 1 year) | Yes (1 year required) |
| Available After Graduation | No | Yes (12 months + STEM) |
| Full-Time Impact on OPT | 12+ months disqualifies OPT | N/A |
| E-Verify Required | No | Yes (STEM only) |
| I-9 Form | Use I-20 | Use EAD Card |

## Strategic Recommendation

For students seeking maximum work authorization: Consider Day 1 CPT during your program (part-time to preserve OPT) followed by post-completion OPT after graduation. If in a STEM field, add the 24-month STEM extension for up to 36 months of post-graduation work authorization.

For students whose OPT has been denied or is expiring: Transferring to a Day 1 CPT university is an effective way to maintain continuous work authorization while pursuing a new degree.`,

      'day1-cpt': getResourceByTopic('day1-cpt') || 'Resource not found.',

      opt: `# Post-Completion OPT Guide

## What is Post-Completion OPT?

Post-completion Optional Practical Training (OPT) is a 12-month period of work authorization available to F-1 students after completing their academic program. You must apply for OPT before completing your program.

## Application Timeline

1. **Apply early** — You can apply up to 90 days before your program end date.
2. **USCIS must receive your I-765** within 60 days of your program end date.
3. **Processing time:** 2-5 months (automatic 180-day extension if pending at end date).
4. **Start date:** Your OPT begins on the date requested on your I-765, which can be up to 60 days after your program end date.

## Application Steps

1. Report your intent to your DSO.
2. DSO recommends OPT in SEVIS and updates your I-20.
3. File Form I-765 with USCIS (filing fee: $470 as of 2024).
4. Receive EAD card — you may begin working on the start date.

## Unemployment Limits

- You may not exceed **90 days of total unemployment** during your 12-month OPT period.
- Each day or part of a day that you are not employed counts toward this limit.
- Volunteering or self-employment in your field counts as employment.

## Important Rules

- Your work must be directly related to your field of study.
- You must report your employer and any changes to your DSO within 10 days.
- Travel outside the U.S. during OPT requires a valid EAD card, valid F-1 visa, job offer letter, and a signed I-20 from your DSO.
- If you accumulate 90 days of unemployment, your OPT ends and your grace period begins.`,

      'stem-opt': getResourceByTopic('stem-opt') || 'Resource not found.',

      impact: `# Impact of CPT/OPT on Immigration Pathways

## Path to H-1B

Both CPT and OPT can serve as stepping stones to H-1B status. Here's how:

1. **Build professional experience** — CPT/OPT employment helps you develop skills and a professional network.
2. **Employer sponsorship** — Your H-1B petition must be filed by a U.S. employer willing to sponsor you.
3. **H-1B lottery** — Filed annually in March for an October 1 start date. The cap is 65,000 (plus 20,000 for Master's degree holders from U.S. institutions).
4. **Cap-gap protection** — If your H-1B is selected in the lottery and filed before OPT expires, your OPT and F-1 status automatically extend through September 30.

## Path to Green Card (Employment-Based)

CPT/OPT experience is valuable for employment-based green card sponsorship:

- **EB-2 (Advanced Degree):** Requires a Master's degree or Bachelor's + 5 years of progressive experience. OPT/CPT work counts toward this experience.
- **EB-3 (Skilled Worker):** Requires a Bachelor's degree and a permanent job offer. CPT/OPT employment can lead to a sponsoring employer.
- **PERM Labor Certification:** Your employer must complete this process before filing the I-140 petition. Work experience gained during CPT/OPT strengthens your case.

## Dual Intent Consideration

F-1 is a non-immigrant visa category, meaning you must maintain non-immigrant intent. However:
- Once your employer files an H-1B or green card petition, dual intent applies and non-immigrant intent is no longer required.
- During your F-1/OPT period, be cautious about expressing immigrant intent in applications or interviews.
- Traveling while a green card petition is pending can be complex — consult an immigration attorney.

## Day 1 CPT and Long-Term Strategy

For students using Day 1 CPT:
1. Work part-time during your program to preserve OPT eligibility.
2. Build professional skills and employer relationships.
3. Use post-completion OPT as a bridge while pursuing H-1B sponsorship.
4. If H-1B is not selected, enroll in a second degree with Day 1 CPT to continue working.
5. This "study-while-working" cycle can be maintained through multiple degree levels.`,
    };

    const content = guides[topic] || guides.comparison;

    return {
      content: [{ type: 'text', text: content }],
    };
  },

  // ----------------------------------------------------------
  // get_transfer_checklist
  // ----------------------------------------------------------
  get_transfer_checklist(args: { situation: 'standard' | 'emergency' | 'post-completion' }) {
    const situation = args.situation || 'standard';

    const checklists: Record<string, string> = {
      standard: `# SEVIS Transfer Checklist: Standard Transfer

> **Applicable when:** Your SEVIS record is in **active** status and you want to transfer to a new university.

## Pre-Transfer Phase

- [ ] **Step 1: Research and select target university** — Choose a university that offers your desired program, CPT options, and aligns with your academic goals.
- [ ] **Step 2: Apply for admission** — Submit your application with transcripts, test scores, and supporting documents.
- [ ] **Step 3: Get accepted** — Receive your admission letter from the new university.
- [ ] **Step 4: Notify your current DSO** — Inform your current school's DSO of your intent to transfer. Your DSO needs to release your SEVIS record.

## SEVIS Transfer Phase

- [ ] **Step 5: Provide SEVIS ID to new school** — Give your current SEVIS ID to the new university's DSO.
- [ ] **Step 6: DSO initiates transfer** — The new DSO enters your SEVIS ID into the system to accept the transfer record.
- [ ] **Step 7: Current DSO releases record** — Your current DSO releases your SEVIS record to the new institution.
- [ ] **Step 8: Verify transfer complete** — Confirm with the new DSO that your SEVIS record has been successfully transferred.

## Post-Transfer Phase

- [ ] **Step 9: Receive new I-20** — The new university issues your updated I-20 with a new program start date.
- [ ] **Step 10: Check all information** — Verify your name, DOB, program, and start date on the new I-20 are correct.
- [ ] **Step 11: Begin classes** — You must start classes within 5 months of the SEVIS release date.
- [ ] **Step 12: Update your address** — Report your new address to the new DSO within 10 days.
- [ ] **Step 13: Apply for CPT (if needed)** — If you need work authorization, apply for CPT through the new DSO.

## Important Notes

- **Do NOT let your current I-20 expire** before the transfer is complete.
- **Do NOT travel outside the U.S.** between the release date and starting at the new school (unless you re-enter with the new I-20).
- **Standard timeline:** 1-2 weeks from admission to starting at the new school.
- **Credit transfer:** Request transcript evaluation early — most graduate programs accept 6-9 credits.`,

      emergency: `# SEVIS Transfer Checklist: Emergency (Terminated SEVIS)

> **Applicable when:** Your SEVIS record has been **terminated** and you need immediate action to maintain your U.S. presence.

> ⚠️ **URGENCY:** You have limited options. Act immediately. Contact UCSG for same-day assistance.

## Option A: Reinstatement (If within 5 months)

- [ ] **Step 1: Determine termination reason** — Get the exact reason for termination from your DSO.
- [ ] **Step 2: Assess reinstatement eligibility** — Was the termination beyond your control? Can you demonstrate it won't happen again?
- [ ] **Step 3: Gather evidence** — Collect documents supporting your case (medical records, DSO correspondence, financial proof).
- [ ] **Step 4: Draft personal statement** — Write a compelling explanation of circumstances and commitment to maintaining status.
- [ ] **Step 5: File Form I-539** — Submit reinstatement application with all supporting documents.
- [ ] **Step 6: Wait for decision (3-6 months)** — You may study at DSO's discretion but CANNOT work during this time.

## Option B: Travel & Re-Entry (Fastest Option)

- [ ] **Step 1: Get new I-20 from a new university** — UCSG can facilitate this within 1-3 business days.
- [ ] **Step 2: Pay SEVIS I-901 fee** — Pay the $350 SEVIS fee for the new I-20.
- [ ] **Step 3: Travel outside the U.S.** — Leave the United States (Canada, Mexico, or home country).
- [ ] **Step 4: Apply for F-1 visa stamp (if needed)** — If your current F-1 visa is still valid, you may not need a new one.
- [ ] **Step 5: Re-enter the U.S.** — Present your new I-20, valid F-1 visa, and supporting documents at the port of entry.
- [ ] **Step 6: Begin classes** — Enroll and attend classes at the new university.

## Option C: Change of Status (If you cannot travel)

- [ ] **Step 1: Verify you are still in lawful status** — COS requires you to have not violated your status.
- [ ] **Step 2: Get new I-20** — Obtain admission and I-20 from a new university.
- [ ] **Step 3: File Form I-539** — Submit Change of Status application to USCIS.
- [ ] **Step 4: Wait (3-6 months)** — Cannot study or work until approved.

## Critical Warnings

- **Do NOT work** with a terminated SEVIS record — this is unauthorized employment and can lead to a bar on future entry.
- **Unlawful presence** begins accumulating after a termination. More than 180 days triggers a 3-year bar; more than 1 year triggers a 10-year bar.
- **Always have a backup plan** — UCSG recommends pursuing Options A and B simultaneously.
- **Contact UCSG immediately** — We can secure emergency university admission within 1-3 days.`,

      'post-completion': `# SEVIS Transfer Checklist: Post-Completion Transfer

> **Applicable when:** You have completed your program and have a 60-day grace period, or your OPT has ended.

## During Grace Period (Within 60 days of program end)

- [ ] **Step 1: Act quickly** — You have exactly 60 days from your program end date to transfer or take other action.
- [ ] **Step 2: Apply to a new university** — Submit applications immediately. Some UCSG partner schools offer expedited admission.
- [ ] **Step 3: SEVIS transfer during grace period** — Your current DSO can release your SEVIS record to the new school within the 60-day window.
- [ ] **Step 4: Receive new I-20** — The new university issues an I-20 for the new program.
- [ ] **Step 5: Enroll at new school** — You must begin the new program within 5 months of the SEVIS release date.

## After OPT Ends

- [ ] **Step 1: Check your grace period** — You have 60 days from the OPT end date on your EAD card.
- [ ] **Step 2: Apply to new university immediately** — Do not wait. The 60-day grace period is firm.
- [ ] **Step 3: Transfer SEVIS record** — Coordinate both DSOs to complete the transfer.
- [ ] **Step 4: Begin new program** — Enroll and maintain full-time student status.

## After 60-Day Grace Period Has Passed

> ⚠️ If your 60-day grace period has expired, your SEVIS record is automatically terminated. See the **Emergency Transfer** checklist.

## Key Differences from Standard Transfer

- **Tighter timeline** — You must complete everything within the 60-day grace period.
- **No leeway** — If the 60 days pass without action, your record is terminated.
- **No travel recommended** — Traveling during the grace period may prevent re-entry.
- **Credit transfer** — Your completed degree credits may apply toward a higher-level degree at the new school.`,
    };

    return {
      content: [{ type: 'text', text: checklists[situation] || checklists.standard }],
    };
  },

  // ----------------------------------------------------------
  // get_visa_guidance
  // ----------------------------------------------------------
  get_visa_guidance(args: { fromVisa?: string }) {
    const visa = (args.fromVisa || '').toUpperCase().replace(/[^A-Z0-9/]/g, '');

    const guidance: Record<string, string> = {
      'B1/B2': `# Change of Status: B1/B2 → F-1

## Overview

Changing from B1/B2 visitor status to F-1 student status within the U.S. is the most common change of status pathway. However, it is also the most scrutinized by USCIS, as they will assess whether you entered the U.S. with preconceived intent to study.

## Key Requirements

1. **Valid B1/B2 status** — Your I-94 must show a valid admission date. If it has expired, you cannot file COS and must depart.
2. **Non-preconceived intent** — You must demonstrate that your decision to study was made after entering the U.S., not before. Evidence of a change in circumstances helps.
3. **University admission & I-20** — You must be admitted to an SEVP-certified university and have your I-20 before filing.
4. **Financial ability** — Show sufficient funds to cover tuition and living expenses for at least one year.
5. **Non-immigrant intent** — Demonstrate ties to your home country and intent to return after completing studies.

## Process

1. Secure university admission and receive I-20.
2. File Form I-539 online or by mail with: I-20, financial documents, passport, personal statement.
3. Wait 3-6 months for USCIS decision.
4. Once approved, you are in F-1 status and can begin studying.
5. After 1 academic year (or Day 1 if your program qualifies), apply for CPT.

## Strengthening Your Application

- Include evidence of what changed your plans (e.g., job opportunity requiring a degree, personal development decision).
- Show you've been in the U.S. for some time before deciding to study (several months is better than several days).
- Demonstrate strong financial support (bank statements, sponsor letter).
- Provide evidence of home country ties (property, family, job offers).`,

      H4: `# Change of Status: H4 → F-1

## Overview

H4 visa holders (dependents of H-1B workers) can change to F-1 status to pursue full-time education. This is a common pathway for spouses who want to study and eventually gain independent work authorization through CPT or OPT.

## Key Advantages

- H4 to F-1 is generally viewed more favorably by USCIS than B1/B2 to F-1.
- Your spouse's H-1B status provides a stable foundation.
- You may already have established ties in the U.S.

## Process

1. Get admitted to an SEVP-certified university and receive I-20.
2. File Form I-539 with USCIS.
3. Wait 3-6 months for approval.
4. Upon approval, begin your F-1 program.

## Important Considerations

- **H4 EAD vs F-1 CPT:** If you have an H4 EAD (available to certain H-1B spouses with approved I-140), compare the benefits. H4 EAD allows any work without restrictions, while F-1 CPT requires the work to be related to your field of study. However, F-1 CPT/OPT provides a pathway to H-1B sponsorship and green card.
- **Loss of H4 status:** Once you change to F-1, you are no longer in H4 status. If your F-1 is denied, you cannot revert to H4 without a new filing.
- **Dependent education:** Children on H4 status attending K-12 school are not affected by your status change.`,

      H1B: `# Change of Status: H1B → F-1

## Overview

Changing from H-1B to F-1 is less common but can be strategic in certain situations, such as when you want to pursue a higher degree with Day 1 CPT authorization while maintaining U.S. employment.

## When This Makes Sense

- You want to pursue a Master's or PhD with Day 1 CPT while continuing to work.
- Your H-1B was not selected in the lottery and you need to maintain U.S. employment.
- You want to switch career fields and need a new degree.

## Process

1. Apply and get admitted to a Day 1 CPT university.
2. File Form I-539 to change status from H-1B to F-1.
3. Once approved, begin your program with CPT authorization.
4. Continue working in a role related to your new field of study.

## Critical Considerations

- **H-1B cap exemption lost:** Once you change to F-1, your H-1B is no longer active. If you want to return to H-1B, you'll need a new petition (subject to the cap, unless cap-exempt).
- **Employer cooperation:** Your employer must be willing to support your CPT arrangement.
- **Work restrictions:** On F-1 CPT, your work must be related to your field of study. H-1B has no such restriction.
- **H-1B as backup:** Consider this carefully. Some students maintain H-1B and study part-time instead.`,

      default: `# Change of Status to F-1: General Guidance

${args.fromVisa ? `## Your Current Status: ${args.fromVisa.toUpperCase()}` : '## Select Your Current Visa Status'}

The change of status (COS) process to F-1 follows the same general steps regardless of your current visa category:

## General Process

1. **Eligibility Assessment** — Confirm you are in valid status and eligible to change to F-1. Note: J-1 holders subject to the 2-year home residency requirement must obtain a waiver first.
2. **University Admission** — Get admitted to an SEVP-certified university and obtain your Form I-20.
3. **File Form I-539** — Submit your change of status application to USCIS with all supporting documents.
4. **Wait for Approval** — Processing typically takes 3-6 months.
5. **Begin Your Program** — Once approved, you can start studying and apply for CPT.

## Common Pathways

| From Visa | Difficulty | Typical Timeline | Key Consideration |
|-----------|-----------|-----------------|-------------------|
| B1/B2 | Medium | 3-6 months | Must show non-preconceived intent |
| H4 | Easier | 3-6 months | Compare with H4 EAD benefits |
| H1B | Complex | 3-6 months | Consider losing H-1B status |
| F2 | Easy | 2-4 months | Must change to study full-time |
| J1 | Hard | 3-6 months | Check 2-year home residency requirement |
| L2 | Easy | 3-4 months | Compare with L2 EAD benefits |
| TN | Medium | 3-6 months | TN allows study but not CPT/OPT |

## Universal Tips

- **Never let your current status expire** before filing the COS application.
- **File before your I-94 expires** to avoid unlawful presence.
- **Have a backup plan** — if COS is denied, you may need to depart and apply for an F-1 visa abroad.
- **Consult an immigration attorney** for complex cases.

${args.fromVisa ? `\nFor specific guidance on your ${args.fromVisa.toUpperCase()} to F-1 change of status, contact UCSG for a free consultation.` : ''}`,
    };

    const content = guidance[visa] || guidance.default;
    return {
      content: [{ type: 'text', text: content }],
    };
  },

  // ----------------------------------------------------------
  // calculate_cost_estimate
  // ----------------------------------------------------------
  calculate_cost_estimate(args: {
    universityId: string;
    programIndex?: number;
    location?: 'metro' | 'suburban';
    dependents?: number;
  }) {
    const uni = getUniversityById(args.universityId);
    if (!uni) {
      return {
        content: [{ type: 'text', text: `University not found with ID "${args.universityId}".` }],
        isError: true,
      };
    }

    const loc = args.location || 'suburban';
    const deps = args.dependents || 0;
    const costs = livingCosts[loc];
    const { min: tuitionMin, max: tuitionMax } = parseTuitionRange(uni.tuition);

    const programsToShow = args.programIndex !== undefined && args.programIndex >= 0
      ? [uni.programs[args.programIndex]]
      : uni.programs;

    const lines: string[] = [];
    lines.push(`# Cost Estimate: ${uni.name}`);
    lines.push('');
    lines.push(`**Location type:** ${loc === 'metro' ? 'Metro (major city)' : 'Suburban'}`);
    lines.push(`**Dependents:** ${deps}`);
    lines.push('---');

    for (const prog of programsToShow) {
      if (!prog) continue;
      const months = programDurationMonths[prog.level] || 24;
      const years = months / 12;
      const annualLiving = costs.rent + costs.food + costs.transport + costs.insurance + costs.personal;
      const annualDependentCost = deps * costs.dependentPerPerson;
      const annualTotalLiving = annualLiving + annualDependentCost;

      const totalTuitionLow = tuitionMin * years;
      const totalTuitionHigh = tuitionMax * years;
      const totalLiving = annualTotalLiving * years;
      const totalLow = totalTuitionLow + totalLiving;
      const totalHigh = totalTuitionHigh + totalLiving;

      lines.push(`## ${prog.name}`);
      lines.push('');
      lines.push(`- **Program Level:** ${prog.level} (${months} months / ${years} year${years > 1 ? 's' : ''})`);
      lines.push('');
      lines.push('### Annual Costs');
      lines.push(`| Category | Amount |`);
      lines.push(`|----------|--------|`);
      lines.push(`| Tuition | ${formatCurrency(tuitionMin)} - ${formatCurrency(tuitionMax)}/yr |`);
      lines.push(`| Rent | ${formatCurrency(costs.rent)}/mo (${formatCurrency(costs.rent * 12)}/yr) |`);
      lines.push(`| Food & Groceries | ${formatCurrency(costs.food)}/mo (${formatCurrency(costs.food * 12)}/yr) |`);
      lines.push(`| Transportation | ${formatCurrency(costs.transport)}/mo (${formatCurrency(costs.transport * 12)}/yr) |`);
      lines.push(`| Health Insurance | ${formatCurrency(costs.insurance)}/mo (${formatCurrency(costs.insurance * 12)}/yr) |`);
      lines.push(`| Personal Expenses | ${formatCurrency(costs.personal)}/mo (${formatCurrency(costs.personal * 12)}/yr) |`);
      if (deps > 0) {
        lines.push(`| Dependents (${deps}) | ${formatCurrency(annualDependentCost)}/yr |`);
      }
      lines.push(`| **Total Annual Living** | **${formatCurrency(annualTotalLiving)}/yr** |`);
      lines.push('');
      lines.push('### Total Program Estimate');
      lines.push(`| Component | Low Estimate | High Estimate |`);
      lines.push(`|-----------|-------------|--------------|`);
      lines.push(`| Total Tuition | ${formatCurrency(totalTuitionLow)} | ${formatCurrency(totalTuitionHigh)} |`);
      lines.push(`| Total Living Costs | ${formatCurrency(totalLiving)} | ${formatCurrency(totalLiving)} |`);
      lines.push(`| **Grand Total** | **${formatCurrency(totalLow)}** | **${formatCurrency(totalHigh)}** |`);
      lines.push('');
      lines.push(`> **Note:** These are estimates. Actual costs vary based on lifestyle, location within the ${loc} area, and university fee changes. Book costs (~${formatCurrency(500)}/yr) and miscellaneous expenses are not included. Contact the university for the most current fee schedule.`);
      lines.push('');
    }

    return {
      content: [{ type: 'text', text: lines.join('\n') }],
    };
  },

  // ----------------------------------------------------------
  // get_scholarship_tips
  // ----------------------------------------------------------
  get_scholarship_tips(args: { universityId?: string }) {
    const baseResource = getResourceByTopic('scholarships');

    if (args.universityId) {
      const uni = getUniversityById(args.universityId);
      if (!uni) {
        return {
          content: [{ type: 'text', text: `University not found with ID "${args.universityId}".` }],
          isError: true,
        };
      }

      const uniScholarshipInfo = uni.scholarshipsAvailable !== undefined
        ? `**${uni.name} Scholarships:** ${uni.scholarshipsAvailable ? 'This university offers scholarships for international students. Contact the financial aid office at ${uni.website} for specific scholarship opportunities, eligibility requirements, and application deadlines.' : 'This university does not typically offer institutional scholarships for international students. Focus on external funding sources listed below.'}`
        : '';

      return {
        content: [{
          type: 'text',
          text: `# Scholarship Guidance for ${uni.name}

${uniScholarshipInfo}

${baseResource ? baseResource.split('\n').slice(1).join('\n') : 'See general scholarship guidance below.'}`,
        }],
      };
    }

    return {
      content: [{ type: 'text', text: `# Scholarship Guide for International F-1 Students

${baseResource || 'Scholarship information is currently being updated.'}` }],
    };
  },

  // ----------------------------------------------------------
  // get_resource
  // ----------------------------------------------------------
  get_resource(args: { topic: string }) {
    const content = getResourceByTopic(args.topic);
    if (!content) {
      return {
        content: [{
          type: 'text',
          text: `Resource not found for topic "${args.topic}". Available topics: ${resourceTopics.join(', ')}.

You can also try these related search terms: cpt, opt, transfer, change-of-status, reinstatement, scholarships, funding, financial-aid, sevis-termination.`,
        }],
        isError: true,
      };
    }
    return {
      content: [{ type: 'text', text: content }],
    };
  },
};
