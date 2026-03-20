"use client";

import { motion } from "framer-motion";
import { Code2, Pencil } from "lucide-react";
import { useLightDark } from "@/context/LightDarkContext";
import { useModeStore } from "@/store";
import type { Mode } from "@/types";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Mode; label: string; Icon: typeof Code2 }[] = [
  { value: "developer", label: "Dev", Icon: Code2 },
  { value: "designer", label: "Design", Icon: Pencil },
];

export function ModeToggle() {
  const { mode, setMode } = useModeStore();
  const { isLight } = useLightDark();

  return (
    <div
      className={cn(
        "mode-toggle-shell relative flex w-[180px] rounded-full p-0.5",
        "backdrop-blur-glass border",
        isLight
          ? "border-[rgba(201,168,76,0.22)] bg-[rgba(255,252,247,0.88)]"
          : "border-white/10 bg-black/40",
        "toggle-border-shimmer",
      )}
    >
      <div className="relative flex w-full">
        {OPTIONS.map((opt) => {
          const Icon = opt.Icon;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => setMode(opt.value)}
              className={cn(
                "relative z-10 flex flex-1 items-center justify-center gap-1.5",
                "px-3 py-2 font-mono text-[10px] uppercase tracking-wider transition-colors",
                mode === opt.value
                  ? opt.value === "designer"
                    ? "text-black"
                    : "text-[#0a0a0b]"
                  : opt.value === "developer"
                    ? isLight
                      ? "text-[rgba(42,36,30,0.42)] hover:text-[rgba(28,22,18,0.88)]"
                      : "text-[#f0ece4]/45 hover:text-[#f0ece4]/80"
                    : isLight
                      ? "text-[rgba(42,36,30,0.42)] hover:text-[var(--theme-primary,#e85d00)]"
                      : "text-white hover:drop-shadow-[0_0_8px_rgba(232,93,0,0.5)]",
              )}
            >
              <Icon className="size-3.5 shrink-0" strokeWidth={2.5} />
              <span>{opt.label}</span>
            </button>
          );
        })}
        {mode === "developer" ? (
          <motion.div
            layoutId="mode-toggle-indicator"
            className="absolute inset-y-0.5 left-0.5 z-0 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-[#c9a84c] to-[#e8d5a3]"
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
          />
        ) : (
          <motion.div
            layoutId="mode-toggle-indicator"
            className="absolute inset-y-0.5 left-[calc(50%+2px)] z-0 w-[calc(50%-4px)] rounded-full bg-[var(--theme-primary,#e85d00)]"
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
