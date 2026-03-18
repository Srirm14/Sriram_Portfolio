export interface SkillCategory {
  id: string;
  label: string;
  orbit: number;
  color: string;
  skills: string[];
}

export const devSkills: SkillCategory[] = [
  {
    id: "core",
    label: "Core",
    orbit: 1,
    color: "#7c3aed",
    skills: ["React", "Next.js", "TypeScript", "JavaScript"],
  },
  {
    id: "state",
    label: "State & Data",
    orbit: 2,
    color: "#06b6d4",
    skills: ["Zustand", "Redux", "TanStack Query", "React Query"],
  },
  {
    id: "styling",
    label: "Styling & UI",
    orbit: 2,
    color: "#06b6d4",
    skills: ["Tailwind CSS", "Material UI", "Design Systems"],
  },
  {
    id: "mobile",
    label: "Mobile",
    orbit: 3,
    color: "#4f46e5",
    skills: ["React Native", "Expo", "Angular"],
  },
  {
    id: "forms",
    label: "Forms",
    orbit: 3,
    color: "#4f46e5",
    skills: ["Formily", "React Hook Form", "TipTap"],
  },
  {
    id: "tooling",
    label: "Tooling",
    orbit: 3,
    color: "#4f46e5",
    skills: ["Playwright", "Git", "Vercel", "Figma"],
  },
];

export const designSkills: SkillCategory[] = [
  {
    id: "tools",
    label: "Design Tools",
    orbit: 1,
    color: "#39FF14",
    skills: ["Figma", "FigJam", "Vectornator"],
  },
  {
    id: "process",
    label: "Process",
    orbit: 2,
    color: "#84cc16",
    skills: ["Wireframing", "Prototyping", "User Research", "A/B Testing"],
  },
  {
    id: "systems",
    label: "Systems",
    orbit: 2,
    color: "#84cc16",
    skills: ["Design Tokens", "Component APIs", "Documentation"],
  },
  {
    id: "delivery",
    label: "Delivery",
    orbit: 3,
    color: "#39FF14",
    skills: ["Figma-to-Code", "Handoff", "Visual Branding", "Illustrations"],
  },
];
