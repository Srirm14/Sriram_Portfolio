"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useModeStore } from "@/store";
import {
  DESIGN_THEMES,
  DEV_THEMES,
  getDefaultTheme,
  type DesignTheme,
  type ThemeConfig,
} from "@/lib/themes";

const STORAGE_KEY = "sriram-theme";

type ThemeState = {
  designTheme: string;
  devTheme: string;
};

const validDesign: DesignTheme[] = ["ktm"];

function loadThemeState(): ThemeState {
  if (typeof window === "undefined") {
    return { designTheme: "ktm", devTheme: "glass" };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { designTheme: "ktm", devTheme: "glass" };
    const parsed = JSON.parse(raw) as ThemeState;
    // migrate old design theme id
    const migrated: ThemeState = {
      ...parsed,
      designTheme: parsed.designTheme === "klx" ? "ktm" : parsed.designTheme,
    };
    if (migrated.designTheme !== parsed.designTheme) {
      saveThemeState(migrated);
    }

    const saved = migrated.designTheme ?? "";
    if (!validDesign.includes(saved as DesignTheme)) {
      const validDev = DEV_THEMES.some(
        (t) => t.id === (migrated.devTheme ?? "glass")
      );
      const next = {
        designTheme: "ktm",
        devTheme: validDev ? (migrated.devTheme ?? "glass") : "glass",
      };
      saveThemeState(next);
      return next;
    }
    const validDev = DEV_THEMES.some((t) => t.id === migrated.devTheme);
    return {
      designTheme: migrated.designTheme,
      devTheme: validDev ? migrated.devTheme : "glass",
    };
  } catch {
    return { designTheme: "ktm", devTheme: "glass" };
  }
}

function saveThemeState(state: ThemeState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

interface ThemeContextValue {
  theme: string;
  themes: ThemeConfig[];
  setTheme: (id: string) => void;
  designTheme: string;
  devTheme: string;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const mode = useModeStore((s) => s.mode);
  const [state, setState] = useState<ThemeState>(loadThemeState);

  const theme =
    mode === "developer"
      ? state.devTheme
      : state.designTheme;
  const themes = mode === "developer" ? DEV_THEMES : DESIGN_THEMES;

  const setTheme = useCallback(
    (id: string) => {
      const valid = themes.some((t) => t.id === id);
      if (!valid) return;
      setState((prev) => {
        const next =
          mode === "developer"
            ? { ...prev, devTheme: id }
            : { ...prev, designTheme: id };
        saveThemeState(next);
        return next;
      });
    },
    [mode, themes],
  );

  useEffect(() => {
    const active =
      mode === "developer" ? state.devTheme : state.designTheme;
    const valid = themes.some((t) => t.id === active);
    const toApply = valid ? active : getDefaultTheme(mode);

    const allThemeClasses = [...DEV_THEMES, ...DESIGN_THEMES].map(
      (t) => `theme-${t.id}`,
    );
    allThemeClasses.forEach((c) => document.documentElement.classList.remove(c));
    document.documentElement.classList.add(`theme-${toApply}`);
  }, [mode, state.devTheme, state.designTheme, themes]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themes,
        setTheme,
        designTheme: state.designTheme,
        devTheme: state.devTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

export function useThemeContext() {
  return useTheme();
}
