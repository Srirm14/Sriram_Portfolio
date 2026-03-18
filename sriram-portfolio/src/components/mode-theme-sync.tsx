"use client";

import { useEffect } from "react";
import { useModeStore } from "@/store";

export function ModeThemeSync() {
  const mode = useModeStore((s) => s.mode);

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
    document.body.setAttribute("data-mode", mode);
  }, [mode]);

  return null;
}
