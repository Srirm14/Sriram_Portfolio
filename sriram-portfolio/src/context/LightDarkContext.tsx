"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

type LightDark = "light" | "dark";

interface LightDarkContextValue {
  lightDark: LightDark;
  toggleLightDark: () => void;
  isLight: boolean;
}

const LightDarkContext = createContext<LightDarkContextValue | null>(null);

export function LightDarkProvider({ children }: { children: ReactNode }) {
  const [lightDark, setLightDark] = useState<LightDark>("light");

  useEffect(() => {
    const saved = localStorage.getItem("lightDark") as LightDark;
    if (saved === "light" || saved === "dark") {
      setLightDark(saved);
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("ld-light", "ld-dark");
    html.classList.add(`ld-${lightDark}`);
  }, [lightDark]);

  const toggleLightDark = useCallback(() => {
    setLightDark((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("lightDark", next);
      return next;
    });
  }, []);

  return (
    <LightDarkContext.Provider
      value={{
        lightDark,
        toggleLightDark,
        isLight: lightDark === "light",
      }}
    >
      {children}
    </LightDarkContext.Provider>
  );
}

export function useLightDark() {
  const ctx = useContext(LightDarkContext);
  if (!ctx) {
    throw new Error("useLightDark must be inside LightDarkProvider");
  }
  return ctx;
}
