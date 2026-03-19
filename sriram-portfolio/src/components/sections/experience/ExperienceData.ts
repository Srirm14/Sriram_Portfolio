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
    designBullets: [],
    designTools: [],
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
      "Front-end developer at a social media analytics firm — developed product features, optimized performance, and resolved issues across sprints.",
      "Designed and implemented intuitive UIs using Agile methodologies and Jira for task management.",
      "Optimized application performance through effective state management and reusable components.",
      "Conducted performance analysis to improve responsiveness and scalability; resolved issues via debugging and POCs.",
      "Contributed to internal design system — component APIs, design tokens, and documentation adopted across teams.",
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
      "Contributed to the internal design system — component APIs, design tokens, and Figma documentation adopted across the frontend organisation.",
      "Partnered with product and design on 2 major UI redesigns, influencing flow decisions that reduced task-completion steps for core workflows.",
      "Bridged design and engineering — ensured Figma handoffs translated to production UI with pixel-level consistency.",
    ],
    designTools: [
      "Figma",
      "Design Tokens",
      "Component APIs",
      "Figma Documentation",
    ],
  },
  {
    id: "zoho",
    company: "Zoho",
    role: "Software Developer - Intern",
    roleDesign: "Software Developer — Intern",
    duration: "May 2021 – Jul 2021",
    location: "Chennai",
    type: "Internship",
    accentColor: "#CC0000",
    devBullets: [
      "Interned in the software industry, tackling various technical challenges and gaining a broad understanding of the field, deepening knowledge and practical experience.",
    ],
    devStack: ["HTML", "CSS", "JavaScript", "Deluge", "React"],
    designBullets: [],
    designTools: [],
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
