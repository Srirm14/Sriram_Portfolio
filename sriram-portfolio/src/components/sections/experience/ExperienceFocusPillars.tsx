"use client";

import { useLightDark } from "@/context/LightDarkContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  DESIGN_EXPERIENCE_FOCUS_PILLARS,
  EXPERIENCE_FOCUS_PILLARS,
} from "./ExperienceFocusPillars.constants";

export type ExperienceFocusPillarsVariant = "developer" | "designer";

interface ExperienceFocusPillarsProps {
  readonly variant: ExperienceFocusPillarsVariant;
}

export function ExperienceFocusPillars({ variant }: ExperienceFocusPillarsProps) {
  const { isLight } = useLightDark();
  const primary = "#e85d00";
  if (variant === "developer") {
    return (
      <ScrollReveal variant="fade-up" className="relative z-20 mb-12 md:mb-14">
        <ul
          className="experience-focus-pillars mx-auto grid max-w-6xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4"
          aria-label="How I work across my experience"
        >
          {EXPERIENCE_FOCUS_PILLARS.map((pillar) => (
            <li key={pillar.id} className="experience-focus-pillars__item">
              <p className="experience-focus-pillars__title">{pillar.title}</p>
              <p className="experience-focus-pillars__body">{pillar.body}</p>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal variant="fade-up" className="relative z-10 mb-12 md:mb-14">
      <ul
        className="mx-auto grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-3 md:gap-4"
        aria-label="How I approach design across my experience"
      >
        {DESIGN_EXPERIENCE_FOCUS_PILLARS.map((pillar) => (
          <li
            key={pillar.id}
            className="rounded-lg border px-4 py-3 text-left"
            style={{
              borderColor: isLight
                ? "rgba(232,93,0,0.22)"
                : "rgba(232,93,0,0.28)",
              backgroundColor: isLight
                ? "rgba(255,255,255,0.55)"
                : "rgba(232,93,0,0.06)",
            }}
          >
            <p
              className="font-mono text-[10px] uppercase tracking-widest"
              style={{ color: isLight ? "#b84a00" : primary }}
            >
              {pillar.title}
            </p>
            <p
              className="mt-2 text-xs leading-relaxed"
              style={{
                color: isLight ? "rgba(15,15,15,0.72)" : "rgba(245,245,245,0.78)",
              }}
            >
              {pillar.body}
            </p>
          </li>
        ))}
      </ul>
    </ScrollReveal>
  );
}
