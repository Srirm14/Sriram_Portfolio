"use client";

import { getYearsOfExperience } from "@/lib/experience";
import { useLightDark } from "@/context/LightDarkContext";
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
  const { isLight } = useLightDark();
  const stats = isDev ? devStats : designStats;
  const statLabelColor =
    isDev
      ? undefined
      : isLight
        ? "rgba(15,15,15,0.58)"
        : "rgba(96, 96, 96, 0.55)";

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
                  : ""
              )}
              style={
                isDev
                  ? undefined
                  : {
                      fontFamily: "var(--font-big-shoulders)",
                      fontWeight: 900,
                      fontSize: "clamp(1.4rem,3vw,1.8rem)",
                      color: "var(--theme-primary,#e85d00)",
                      lineHeight: 1,
                    }
              }
            >
              {typeof stat.value === "function" ? stat.value() : stat.value}
            </span>
            <span
              className={cn(
                "font-mono text-xs uppercase tracking-widest",
                isDev && "text-white/40"
              )}
              style={statLabelColor ? { color: statLabelColor } : undefined}
            >
              {stat.label}
            </span>
          </div>
          {i < stats.length - 1 && (
            <div
              className={cn(
                "h-8",
                isDev
                  ? "hero-stat-rule-dev w-px bg-white/10"
                  : "w-0.5 bg-[var(--theme-primary)]/30",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
