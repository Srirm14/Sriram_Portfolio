"use client";

import { getYearsOfExperience } from "@/lib/experience";
import { cn } from "@/lib/utils";
import type { Mode } from "@/types";

export interface HeroStatsProps {
  mode: Mode;
}

const devStats = [
  { value: () => getYearsOfExperience(), label: "Years Exp" },
  { value: "2", label: "Product Companies" },
  { value: "98%", label: "Positive Feedback" },
];

const designStats = [
  { value: () => getYearsOfExperience(), label: "Years Exp" },
  { value: "98%", label: "Positive Feedback" },
  { value: "10+", label: "Projects Shipped"   },
];

export function HeroStats({ mode }: HeroStatsProps) {
  const isDev = mode === "developer";
  const stats = isDev ? devStats : designStats;

  return (
    <div className={cn(
      "flex items-center justify-center lg:justify-start mt-6 md:mt-12",
      isDev ? "gap-4 md:gap-8" : "gap-3 md:gap-8"
    )}>
      {stats.map((stat, i) => (
        <div key={stat.label} className={cn("flex items-center", isDev ? "gap-4 md:gap-8" : "gap-3 md:gap-8")}>
          <div className="flex flex-col gap-1">
            <span
              className={cn(
                "font-bold",
                isDev
                  ? "font-grotesk text-gradient-dev text-2xl"
                  : "font-bebas text-[#e63946] text-xl md:text-2xl"
              )}
            >
              {typeof stat.value === "function" ? stat.value() : stat.value}
            </span>
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
              {stat.label}
            </span>
          </div>
          {i < stats.length - 1 && (
            <div
              className={cn(
                "h-8",
                isDev
                  ? "hero-stat-rule-dev w-px bg-white/10"
                  : "w-0.5 bg-[#e63946]/30",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
