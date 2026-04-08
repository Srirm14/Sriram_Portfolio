"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

type LightDark = "light" | "dark";

interface LightDarkContextValue {
  lightDark: LightDark;
  toggleLightDark: () => void;
  isLight: boolean;
}

const LightDarkContext = createContext<LightDarkContextValue | null>(null);

export function LightDarkProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [lightDark, setLightDark] = useState<LightDark>(() => {
    if (globalThis.window === undefined) return "dark";
    const saved = localStorage.getItem("lightDark") as LightDark;
    return saved === "light" || saved === "dark" ? saved : "dark";
  });

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

  const value = useMemo(
    () => ({
      lightDark,
      toggleLightDark,
      isLight: lightDark === "light",
    }),
    [lightDark, toggleLightDark],
  );

  return (
    <LightDarkContext.Provider value={value}>
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
