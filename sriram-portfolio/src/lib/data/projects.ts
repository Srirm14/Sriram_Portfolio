import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "smartledger",
    title: "SmartLedger",
    tech: ["React", "Tailwind CSS", "PostgreSQL", "Vercel"],
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
    tags: ["UI/UX", "Figma", "Product Design"],
  },
  {
    id: "calicalc",
    title: "CaliCalc",
    tech: ["React Native", "Expo"],
    duration: "Dec 2025",
    devBullets: [
      "Built a mobile app for tracking endurance competition events — managing participants, performance metrics, and results across multiple competitions.",
      "Used React Native and Expo for cross-platform deployment with a focus on fast data entry and clean leaderboard views for event-day use.",
      "Actively used across 4+ calisthenics competitions in gym communities, with continued real-world usage by event organisers for participant and scoring management.",
    ],
    designBullets: [
      "Designed the full mobile UI for an endurance competition tracking app — optimised for fast event-day data entry and leaderboard readability.",
      "Focused on high-contrast, minimal-tap interaction patterns for use in gym environments.",
      "Used across 4+ calisthenics competitions by real event organisers.",
    ],
    tags: ["Mobile UI", "React Native", "Expo"],
  },
  {
    id: "uniwiz",
    title: "UniWiz — University Management Portal",
    tech: [],
    duration: "",
    devBullets: [],
    designBullets: [
      "Designed a university management portal covering student records, scheduling, and faculty workflows.",
      "Built a comprehensive Figma design system with tokens, components, and documentation for consistent UI across modules.",
      "Created user flows and wireframes for complex multi-role dashboards (student, faculty, admin).",
    ],
    tags: ["UI/UX", "Figma", "Design System"],
  },
  {
    id: "neuhealth",
    title: "NeuHealth — Doctor Appointment Portal",
    tech: [],
    duration: "",
    devBullets: [],
    designBullets: [
      "Designed an intuitive app for booking neurologist appointments, managing medical history, and supporting communication for substance abuse treatment.",
      "Created user-friendly wireframes and interactive prototypes to streamline the booking process and reduce friction for patients.",
      "Focused on accessibility and clarity for users navigating sensitive health workflows.",
    ],
    tags: ["Healthcare UI", "Figma", "Prototyping"],
    designTools: "Figma, FigJam, Vectornator",
  },
];
