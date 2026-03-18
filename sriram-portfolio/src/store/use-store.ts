import { create } from "zustand";
import type { Mode } from "@/types";

interface ModeStore {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export const useModeStore = create<ModeStore>((set) => ({
  mode: "developer",
  setMode: (mode) => set({ mode }),
}));
