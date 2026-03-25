export interface ExperienceFocusPillar {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

/** Developer experience section — four pillars */
export const EXPERIENCE_FOCUS_PILLARS: readonly ExperienceFocusPillar[] = [
  {
    id: "ownership",
    title: "I own delivery, not just tasks",
    body:
      "Align on scope and contracts up front; ship UI through performance and polish; stay accountable when production surfaces edge cases.",
  },
  {
    id: "reuse",
    title: "I invest in what repeats",
    body:
      "Design-system discipline, shared components, and clear data/state patterns — so new work compounds instead of re-solving the same problems.",
  },
  {
    id: "quality",
    title: "I raise quality around me",
    body:
      "Reviews, mentoring, and crisp design–dev handoffs — tighter feedback loops and a bar everyone can see.",
  },
  {
    id: "intent",
    title: "I connect intent to interface",
    body:
      "Research, flows, and prototypes tied to validation — so intent shows up in shipped UX, not only in decks.",
  },
];

/** Designer experience section — three pillars summarizing design work across roles */
export const DESIGN_EXPERIENCE_FOCUS_PILLARS: readonly ExperienceFocusPillar[] = [
  {
    id: "design-journey",
    title: "I own insight → interface",
    body:
      "Research, flows, and prototypes through dev-ready handoff — shaped by validation, stakeholder reality, and how people actually complete tasks.",
  },
  {
    id: "design-requirements-fidelity",
    title: "I gather requirements and ship fidelity",
    body:
      "End-to-end requirement gathering with users and stakeholders; flows and specs that cover edge, empty, and error states — handoffs tight enough for pixel-accurate build.",
  },
  {
    id: "design-scale",
    title: "I scale craft with systems",
    body:
      "Tokens, reusable components, and documentation — plus close partnership with engineering — so consistency compounds and intent ships intact.",
  },
];
