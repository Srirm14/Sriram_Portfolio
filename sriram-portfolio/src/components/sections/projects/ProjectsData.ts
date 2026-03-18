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
}

export const projects: ProjectItem[] = [
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
    shortDesc: "University management portal",
    featured: false,
    duration: "2024",
    devBullets: [],
    designBullets: [
      "Designed a university management portal covering student records, scheduling, and faculty workflows.",
      "Built a comprehensive Figma design system with tokens, components, and documentation for consistent UI across modules.",
      "Created user flows and wireframes for complex multi-role dashboards — student, faculty, and admin views.",
    ],
    devTech: [],
    designTools: ["Figma", "FigJam", "Design System", "User Flows"],
    tags: [],
    designTags: ["UI/UX", "Design System", "Multi-role"],
    gradient: {
      from: "#39FF14",
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
