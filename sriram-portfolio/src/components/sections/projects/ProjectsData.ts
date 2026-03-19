export interface ProjectItem {
  id: string;
  title: string;
  shortDesc: string;
  devBullets: string[];
  designBullets: string[];
  devTech: string[];
  designTools: string[];
  duration: string;
  tags: string[];
  designTags: string[];
  featured: boolean;
  gradient: {
    from: string;
    via: string;
    to: string;
  };
  imagePath?: string;
  link?: string;
  linkLabel?: string;
}

export const projects: ProjectItem[] = [
  {
    id: "delta",
    title: "Delta CRM Platform",
    shortDesc: "Internal enterprise CRM for sales workflows",
    featured: true,
    duration: "Dec 2024 – Present",
    link: "https://www.deltaelectronicsindia.com/en-IN/index",
    linkLabel: "View site",
    devBullets: [
      "Architected the frontend for an internal enterprise CRM from scratch — modular Next.js codebase replacing third-party CRM tooling for internal sales workflows.",
      "Reduced page load time with TanStack Query (request deduplication, selective cache invalidation); eliminated redundant API calls and unnecessary re-renders.",
      "Built a dynamic multi-step form system using Formily with conditional logic and runtime schema validation for distinct business workflows.",
      "Migrated from scattered React Context to Zustand slices for predictable global state; established code review standards and mentored junior engineers.",
    ],
    designBullets: [],
    devTech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand", "TanStack Query", "Formily", "Material UI", "TipTap"],
    designTools: [],
    tags: ["Enterprise", "CRM", "Internal Tooling"],
    designTags: [],
    gradient: {
      from: "#7c3aed",
      via: "#6d28d9",
      to: "#4f46e5",
    },
  },
  {
    id: "brandwatch",
    title: "Brandwatch Platform",
    shortDesc: "Social media analytics platform for brand performance",
    featured: true,
    duration: "Nov 2021 – Dec 2024",
    link: "https://www.brandwatch.com/",
    linkLabel: "View site",
    devBullets: [
      "Developed new product features, optimized performance, and resolved issues across sprints as a front-end developer at Brandwatch Technologies.",
      "Designed and implemented intuitive UIs using Agile methodologies and Jira.",
      "Optimized application performance through effective state management and reusable components.",
      "Conducted performance analysis to improve responsiveness and scalability; resolved issues via debugging and POCs.",
    ],
    designBullets: [
      "Contributed to internal design system — component APIs, tokens, Figma documentation.",
      "Partnered with product and design on major UI redesigns; used FigJam for ideation and cross-functional alignment.",
      "Bridged design and engineering — ensured Figma handoffs translated to production UI with pixel-level consistency.",
    ],
    devTech: ["Angular", "React", "TypeScript", "Redux", "Tailwind CSS", "Playwright"],
    designTools: ["Figma", "FigJam", "Design Tokens", "Component APIs"],
    tags: ["Enterprise", "Social Intelligence", "Analytics"],
    designTags: ["Design System", "Figma", "UI/UX"],
    gradient: {
      from: "#06b6d4",
      via: "#0891b2",
      to: "#0e7490",
    },
  },
  {
    id: "smartledger",
    title: "SmartLedger",
    shortDesc: "Full-stack ERP for petrol bunk management",
    featured: true,
    duration: "Nov 2023 – Dec 2024",
    devBullets: [
      "Built a full-stack ERP for petrol bunk management covering inventory, billing, and Tally integration — replacing fragmented manual workflows for day-to-day operations.",
      "Designed modular React components with reusable form and table primitives, keeping the codebase maintainable across iterative feature additions.",
      "Deployed on Vercel with a PostgreSQL backend; iterated over 12 months based on real operator feedback.",
    ],
    designBullets: [
      "Designed end-to-end UI for a petrol bunk ERP — inventory, billing, and workflow screens built for non-technical daily operators.",
      "Created reusable Figma component library and layout system used throughout the product.",
      "Iterated on designs based on real operator feedback over 12 months of active use.",
    ],
    devTech: ["React", "Tailwind CSS", "PostgreSQL", "Vercel"],
    designTools: ["Figma", "Component Library", "User Research"],
    tags: ["Full-stack", "ERP", "Real Users"],
    designTags: ["UI/UX", "Figma", "Product Design"],
    gradient: {
      from: "#7c3aed",
      via: "#4f46e5",
      to: "#06b6d4",
    },
  },
  {
    id: "calicalc",
    title: "CaliCalc",
    shortDesc: "Endurance competition tracking mobile app",
    featured: false,
    duration: "Dec 2025",
    devBullets: [
      "Built a mobile app for tracking endurance competition events — managing participants, performance metrics, and results across multiple competitions.",
      "Used React Native and Expo for cross-platform deployment with a focus on fast data entry and clean leaderboard views for event-day use.",
      "Actively used across 4+ calisthenics competitions in gym communities, with continued real-world usage by event organisers.",
    ],
    designBullets: [],
    devTech: ["React Native", "Expo"],
    designTools: [],
    tags: ["Mobile", "React Native", "Live App"],
    designTags: [],
    gradient: {
      from: "#06b6d4",
      via: "#0891b2",
      to: "#7c3aed",
    },
  },
  {
    id: "uniwiz",
    title: "UniWiz",
    shortDesc: "Next-gen university management portal — dashboards, academic tracking, placements, exams, reporting",
    featured: false,
    duration: "2024",
    devBullets: [],
    designBullets: [
      "Designed a digital portal to streamline academic records and admin — reducing paperwork and improving efficiency.",
      "Covered dashboards, academic tracking, placement management, exam handling, and reporting across multi-role views.",
      "Built a Figma design system with tokens, components, and documentation for consistent UI.",
    ],
    devTech: [],
    designTools: ["Figma", "FigJam", "Design System", "User Flows"],
    tags: [],
    designTags: ["UI/UX", "Design System", "Multi-role"],
    gradient: {
      from: "#e63946",
      via: "#16a34a",
      to: "#0891b2",
    },
  },
  {
    id: "neuhealth",
    title: "NeuHealth",
    shortDesc: "Doctor appointment booking portal",
    featured: false,
    duration: "Aug – Nov 2024",
    link: "https://www.figma.com/proto/P3xPx0pKqi2oXf987runmO/Neu-health?page-id=0%3A1&type=design&node-id=261-30192&viewport=8599%2C549%2C0.36&t=MrGwaCRjYSdALQzZ-1&scaling=scale-down&starting-point-node-id=261%3A30166",
    devBullets: [],
    designBullets: [
      "Designed an intuitive app for booking neurologist appointments, managing medical history, and supporting communication for substance abuse treatment.",
      "Created user-friendly wireframes and interactive prototypes to streamline the booking process and reduce friction for patients.",
      "Focused on accessibility and clarity for users navigating sensitive health workflows.",
    ],
    devTech: [],
    designTools: ["Figma", "FigJam", "Vectornator", "Prototyping"],
    tags: [],
    designTags: ["Healthcare UI", "Figma", "Accessibility"],
    gradient: {
      from: "#f43f5e",
      via: "#e11d48",
      to: "#7c3aed",
    },
  },
];
