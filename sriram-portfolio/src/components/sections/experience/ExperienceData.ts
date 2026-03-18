export interface ExperienceItem {
  id: string;
  company: string;
  role: string | null;
  roleDesign: string;
  duration: string;
  location: string;
  type: string;
  devBullets: string[];
  devStack: string[];
  designBullets: string[];
  designTools: string[];
  accentColor: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: "delta",
    company: "Delta Electronics",
    role: "Senior Software Development Engineer",
    roleDesign: "UI/UX Lead — CRM Platform",
    duration: "Dec 2024 – Present",
    location: "Bengaluru",
    type: "Full-time",
    accentColor: "#7c3aed",
    devBullets: [
      "Architected the frontend for an internal enterprise CRM from scratch — designed a modular Next.js codebase with feature-based separation of concerns, replacing the company's reliance on third-party CRM tooling with a fully owned platform tailored to internal sales workflows.",
      "Reduced initial page load time by implementing TanStack Query with request deduplication and selective cache invalidation, replacing redundant API calls and eliminating unnecessary re-renders across high-traffic views.",
      "Built a dynamic multi-step form system using Formily with conditional field logic and runtime schema validation, supporting distinct business workflows without duplicating component code.",
      "Streamlined global state management by migrating from scattered React Context usage to Zustand slices, reducing state-related bugs and improving predictability across the application.",
      "Established frontend code review standards and mentored junior engineers on React composition patterns, performant state management, and maintainable architecture.",
    ],
    devStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "TanStack Query",
      "Formily",
      "React Hook Form",
      "Material UI",
      "TipTap",
    ],
    designBullets: [
      "Led end-to-end UI/UX for an internal enterprise CRM — from initial wireframes and user flow mapping to final component design and developer handoff.",
      "Designed a scalable design system with reusable components, spacing tokens, and interaction patterns used across the entire platform.",
      "Worked directly with sales team stakeholders to translate complex business workflows into clean, intuitive multi-step form experiences.",
    ],
    designTools: [
      "Figma",
      "FigJam",
      "Design Tokens",
      "Component Architecture",
    ],
  },
  {
    id: "brandwatch",
    company: "Brandwatch Technologies",
    role: "Frontend Engineer II",
    roleDesign: "Design System Contributor",
    duration: "Nov 2021 – Dec 2024",
    location: "Remote",
    type: "Full-time",
    accentColor: "#06b6d4",
    devBullets: [
      "Owned frontend development across 3 core product modules of a social media management platform serving 100K+ users — taking features from design handoff through implementation, QA, and production rollout.",
      "Built and maintained a shared component library in Angular and React used across 4 engineering teams, eliminating duplicated UI logic and cutting new-developer ramp-up time by ~2 weeks.",
      "Diagnosed and resolved rendering bottlenecks caused by unguarded subscription updates in Angular — reducing heavy dashboard repaint frequency and improving responsiveness on mid-tier devices.",
      "Implemented Playwright E2E test coverage for 6 critical user flows; caught 3 regressions before production deployment within the first quarter of adoption.",
      "Collaborated with product and design to refine 2 major UI redesigns, contributing to flow decisions that reduced average steps-to-task-completion for core workflows.",
      "Contributed to an internal design system — standardising component APIs, design tokens, and usage documentation adopted across the frontend organisation.",
    ],
    devStack: [
      "Angular",
      "React",
      "TypeScript",
      "Redux",
      "Tailwind CSS",
      "Playwright",
      "Internal Design System",
    ],
    designBullets: [
      "Contributed to an internal design system used across the frontend organisation — standardising component APIs, design tokens, and Figma documentation.",
      "Partnered with product and design teams on 2 major UI redesigns, contributing to flow decisions that reduced task-completion steps for core workflows.",
      "Bridged design and engineering — ensured Figma designs translated accurately into production UI with pixel-level consistency.",
    ],
    designTools: [
      "Figma",
      "Design Tokens",
      "Component APIs",
      "Figma Documentation",
    ],
  },
  {
    id: "codestorm",
    company: "Codestorm X",
    role: null,
    roleDesign: "Freelance Product Designer",
    duration: "Nov 2023 – Feb 2024",
    location: "Remote",
    type: "Freelance",
    accentColor: "#39FF14",
    devBullets: [],
    devStack: [],
    designBullets: [
      "Delivered end-to-end product design across 3 client projects — covering user research, wireframing, iterative prototyping, and final UI handoff.",
      "Designed logos using golden ratio principles, brand identity systems, posters, and cohesive visual assets ensuring consistency across touchpoints.",
      "Led redesign initiatives validated through A/B testing and user feedback, improving user satisfaction and streamlining key workflows.",
      "Built reusable Figma component libraries accelerating design-to-dev handoff and maintaining visual consistency across projects.",
    ],
    designTools: [
      "Figma",
      "FigJam",
      "Vectornator",
      "Prototyping",
      "Branding",
    ],
  },
];
