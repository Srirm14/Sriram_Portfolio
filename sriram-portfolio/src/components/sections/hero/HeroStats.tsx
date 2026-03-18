"use client";

import { cn } from "@/lib/utils";
import type { Mode } from "@/types";

export interface HeroStatsProps {
  mode: Mode;
}

const devStats = [
  { value: "4+",  label: "Years Exp"          },
  { value: "2",   label: "Product Companies"   },
  { value: "98%", label: "Positive Feedback"   },
];

const designStats = [
  { value: "4+",  label: "Years Exp"         },
  { value: "98%", label: "Positive Feedback"  },
  { value: "10+", label: "Projects Shipped"   },
];

export function HeroStats({ mode }: HeroStatsProps) {
  const isDev = mode === "developer";
  const stats = isDev ? devStats : designStats;

  return (
    <div className="flex items-center gap-8 mt-12">
      {stats.map((stat, i) => (
        <div key={stat.label} className="flex items-center gap-8">
          <div className="flex flex-col gap-1">
            <span
              className={cn(
                "font-bold text-2xl",
                isDev
                  ? "font-grotesk text-gradient-dev"
                  : "font-syne font-black text-[#39FF14]"
              )}
            >
              {stat.value}
            </span>
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
              {stat.label}
            </span>
          </div>
          {i < stats.length - 1 && (
            <div
              className={cn(
                "h-8",
                isDev ? "w-px bg-white/10" : "w-0.5 bg-[#39FF14]/30"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
