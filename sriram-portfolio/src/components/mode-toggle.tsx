"use client";

import { motion } from "framer-motion";
import { useMode } from "@/contexts/mode-context";
import type { Mode } from "@/types";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Mode; label: string; icon: string }[] = [
  { value: "developer", label: "</> Dev", icon: "" },
  { value: "designer", label: "✏ Design", icon: "" },
];

export function ModeToggle() {
  const { mode, setMode } = useMode();

  return (
    <div
      className={cn(
        "relative flex w-[200px] rounded-full p-0.5",
        "backdrop-blur-glass bg-black/40 border border-white/10",
        "toggle-border-shimmer"
      )}
    >
      <div className="relative flex w-full">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setMode(opt.value)}
            className={cn(
              "relative z-10 flex flex-1 items-center justify-center",
              "px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors",
              mode === opt.value
                ? "text-white"
                : opt.value === "developer"
                  ? "text-white/60 hover:text-white hover:drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]"
                  : "text-[#39FF14]/70 hover:text-[#39FF14] hover:drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]"
            )}
          >
            {opt.label}
          </button>
        ))}
        {mode === "developer" ? (
          <motion.div
            layoutId="mode-toggle-indicator"
            className="absolute inset-y-0.5 left-0.5 z-0 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4]"
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
          />
        ) : (
          <motion.div
            layoutId="mode-toggle-indicator"
            className="absolute inset-y-0.5 left-[calc(50%+2px)] z-0 w-[calc(50%-4px)] rounded-full bg-[#39FF14]"
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
          />
        )}
      </div>
    </div>
  );
}
