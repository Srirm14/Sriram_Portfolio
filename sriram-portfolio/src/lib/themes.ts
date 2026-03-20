export type DevTheme    = "glass" | "matrix" | "crimson";
export type DesignTheme = "ktm";
export type ThemeMode   = "developer" | "designer";

export interface ThemeConfig {
  id:          string;
  label:       string;
  mode:        ThemeMode;
  description: string;
  preview:     string[];
}

export const DEV_THEMES: ThemeConfig[] = [
  {
    id:          "glass",
    label:       "Glass",
    mode:        "developer",
    description: "Purple · Cyan · Glassmorphism",
    preview:     ["#7c3aed", "#06b6d4", "#0a0a0f"],
  },
  {
    id:          "matrix",
    label:       "Matrix",
    mode:        "developer",
    description: "Green rain · Terminal black",
    preview:     ["#00ff41", "#008f11", "#0d0d0d"],
  },
  {
    id:          "crimson",
    label:       "Crimson",
    mode:        "developer",
    description: "Blood red · Glass · Deep black",
    preview:     ["#dc2626", "#ef4444", "#0a0505"],
  },
];

export const DESIGN_THEMES: ThemeConfig[] = [
  {
    id:          "ktm",
    label:       "KTM",
    mode:        "designer",
    description: "Orange · Cyan · Sport-tech",
    preview:     ["#e85d00", "#b0b8c1", "#080808"],
  },
];

export const ALL_THEMES = [...DEV_THEMES, ...DESIGN_THEMES];

export function getDefaultTheme(mode: ThemeMode): string {
  return mode === "developer" ? "glass" : "ktm";
}
