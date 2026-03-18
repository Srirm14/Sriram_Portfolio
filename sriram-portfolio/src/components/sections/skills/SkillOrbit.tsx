"use client";

import { useState } from "react";

export interface SkillOrbitProps {
  skills: string[];
  radius: number;
  duration: number;
  reverse?: boolean;
  color: string;
  mode: "developer" | "designer";
  pauseOnHover?: boolean;
}

export function SkillOrbit({
  skills,
  radius,
  duration,
  reverse = false,
  color,
  mode,
  pauseOnHover = true,
}: SkillOrbitProps) {
  const [paused, setPaused] = useState(false);
  const total = skills.length;

  const spinName = reverse ? "spin-reverse" : "spin-forward";
  const counterSpinName = reverse ? "spin-forward" : "spin-reverse";

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      {/* Orbit ring track */}
      <div
        className="absolute rounded-full border border-dashed"
        style={{
          width: radius * 2,
          height: radius * 2,
          borderColor:
            mode === "developer"
              ? "rgba(255,255,255,0.06)"
              : "rgba(57,255,20,0.12)",
        }}
      />

      {/* Rotating container */}
      <div
        className="absolute"
        style={{
          width: radius * 2,
          height: radius * 2,
          animation: `${spinName} ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {skills.map((skill, index) => {
          const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
          const x = Math.cos(angle) * radius + radius;
          const y = Math.sin(angle) * radius + radius;

          return (
            <div
              key={skill}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: x,
                top: y,
              }}
            >
              <div
                style={{
                  animation: `${counterSpinName} ${duration}s linear infinite`,
                  animationPlayState: paused ? "paused" : "running",
                }}
              >
              {mode === "developer" ? (
                <div
                  className="px-3 py-1 rounded-full font-mono text-xs whitespace-nowrap transition-all duration-300 cursor-default hover:scale-110"
                  style={{
                    background: `${color}15`,
                    border: `1px solid ${color}30`,
                    color: color,
                    boxShadow: `0 0 8px ${color}20`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${color}60`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${color}80`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 8px ${color}20`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${color}30`;
                  }}
                >
                  {skill}
                </div>
              ) : (
                <div
                  className="px-3 py-1 font-mono text-xs whitespace-nowrap transition-all duration-150 cursor-default hover:scale-105"
                  style={{
                    background: "transparent",
                    border: `2px solid ${color}50`,
                    color: color,
                    boxShadow: `3px 3px 0px ${color}40`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = color;
                    (e.currentTarget as HTMLElement).style.color = "#000";
                    (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0px ${color}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = color;
                    (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0px ${color}40`;
                  }}
                >
                  {skill}
                </div>
              )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
