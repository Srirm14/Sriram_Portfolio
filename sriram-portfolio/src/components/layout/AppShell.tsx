"use client";

import { LightDarkProvider } from "@/context/LightDarkContext";
import { ThemeProvider } from "@/context/ThemeContext";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <LightDarkProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </LightDarkProvider>
  );
}
