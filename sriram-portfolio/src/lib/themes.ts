export type DevTheme = "glass" | "matrix" | "crimson";
export type DesignTheme =
  | "spiderman"
  | "academia-dark"
  | "academia-light"
  | "bauhaus";
export type ThemeMode = "developer" | "designer";

export interface ThemeConfig {
  id: string;
  label: string;
  mode: ThemeMode;
  description: string;
  preview: string[]; // 2-3 color hex for preview dots
}

export const DEV_THEMES: ThemeConfig[] = [
  {
    id: "glass",
    label: "Glass",
    mode: "developer",
    description: "Purple · Cyan · Glassmorphism",
    preview: ["#7c3aed", "#06b6d4", "#0a0a0f"],
  },
  {
    id: "matrix",
    label: "Matrix",
    mode: "developer",
    description: "Green rain · Terminal black",
    preview: ["#00ff41", "#008f11", "#0d0d0d"],
  },
  {
    id: "crimson",
    label: "Crimson",
    mode: "developer",
    description: "Blood red · Glass · Deep black",
    preview: ["#dc2626", "#ef4444", "#0a0505"],
  },
];

export const DESIGN_THEMES: ThemeConfig[] = [
  {
    id: "spiderman",
    label: "Spider",
    mode: "designer",
    description: "Red · Navy · Web · Dark",
    preview: ["#e63946", "#1d3557", "#f1faee"],
  },
  {
    id: "academia-dark",
    label: "Academia Dark",
    mode: "designer",
    description: "Gold · Brown · Pearl · Vintage dark",
    preview: ["#c9a84c", "#2c1a0e", "#f5e6c8"],
  },
  {
    id: "academia-light",
    label: "Academia Light",
    mode: "designer",
    description: "Parchment · Dark brown · Gold light",
    preview: ["#8b6914", "#f5e6c8", "#2c1a0e"],
  },
  {
    id: "bauhaus",
    label: "Bauhaus",
    mode: "designer",
    description: "Red · Yellow · Blue · Geometry",
    preview: ["#e63946", "#ffd60a", "#023e8a"],
  },
];

export const ALL_THEMES = [...DEV_THEMES, ...DESIGN_THEMES];

export function getDefaultTheme(mode: ThemeMode): string {
  return mode === "developer" ? "glass" : "spiderman";
}
