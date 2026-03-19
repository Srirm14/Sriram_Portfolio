import type { ProjectItem } from "./ProjectsData";

/**
 * Pearl/gold palette for dev mode — avoids purple/cyan from raw project data.
 * Deterministic per project id (matches ProjectCard illustrations).
 */
export function getCardGradient(
  item: ProjectItem,
  isDev: boolean,
): ProjectItem["gradient"] {
  if (!isDev) return item.gradient;
  const variants: ProjectItem["gradient"][] = [
    { from: "#c9a84c", via: "#8b6914", to: "#e8d5a3" },
    { from: "#e8d5a3", via: "#a67c28", to: "#f0ece4" },
    { from: "#d4a843", via: "#6b5220", to: "#c9a84c" },
  ];
  let h = 0;
  for (let i = 0; i < item.id.length; i++) h += item.id.charCodeAt(i);
  return variants[h % variants.length]!;
}
