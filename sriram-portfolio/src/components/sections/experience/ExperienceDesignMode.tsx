"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLightDark } from "@/context/LightDarkContext";
import { ExperienceDesignCard } from "./ExperienceDesignCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { ExperienceItem } from "./ExperienceData";

interface ExperienceDesignModeProps {
  experiences: ExperienceItem[];
}

export function ExperienceDesignMode({
  experiences,
}: ExperienceDesignModeProps) {
  const { isLight } = useLightDark();
  const designExperiences = experiences.filter(
    (item) => item.designBullets.length > 0
  );
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true });

  const primary = "#e85d00";
  const secondary = isLight ? "#1a1a1a" : "#b0b8c1";

  return (
    <section
      id="experience"
      className="relative overflow-hidden px-4 py-14 md:px-6 md:py-24 lg:px-12"
      style={{
        backgroundColor: isLight ? "#fff8f2" : "#080808",
        willChange: "transform",
      }}
    >
      {/* Top accent — hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: isLight
            ? `linear-gradient(90deg, transparent, ${primary}40, transparent)`
            : `linear-gradient(90deg, transparent, ${primary}30, transparent)`,
        }}
      />

      {/* ── The road traveled — ghostly abstraction ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden
      >
        {/* Dark gradient base — depth */}
        <div
          className="absolute inset-0"
          style={{
            background: isLight
              ? `linear-gradient(135deg, transparent 0%, rgba(232,93,0,0.03) 40%, transparent 70%)`
              : `linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.15) 30%, rgba(232,93,0,0.04) 50%, transparent 80%)`,
          }}
        />

        {/* Animated shimmer sweep — there but not there */}
        <div
          className="absolute inset-0 exp-shimmer-layer"
          style={{
            background: `linear-gradient(105deg, transparent 0%, transparent 35%, ${primary}08 48%, ${primary}06 52%, transparent 65%, transparent 100%)`,
            backgroundSize: "70% 100%",
            animation: "exp-shimmer-sweep 14s linear infinite",
          }}
        />

        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="road-stroke" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={primary} stopOpacity="0.4" />
              <stop offset="50%" stopColor={primary} stopOpacity="0.6" />
              <stop offset="100%" stopColor={secondary} stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Winding road — ghostly, low opacity */}
          <path
            d="M 0 820 Q 180 780, 320 720 Q 460 660, 520 580 Q 580 500, 680 420 Q 780 340, 820 220 Q 900 120, 1100 80"
            fill="none"
            stroke="url(#road-stroke)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="32 24"
            opacity={isLight ? 0.28 : 0.35}
          />
          {/* Parallel trace */}
          <path
            d="M 0 820 Q 180 780, 320 720 Q 460 660, 520 580 Q 580 500, 680 420 Q 780 340, 820 220 Q 900 120, 1100 80"
            fill="none"
            stroke={primary}
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeDasharray="32 24"
            opacity={isLight ? 0.12 : 0.15}
            transform="translate(2, 2)"
          />

          {/* Milestones — subtle */}
          {[
            [320, 720],
            [520, 580],
            [680, 420],
            [820, 220],
          ].map(([cx, cy], i) => (
            <g key={`m-${i}`}>
              <circle
                cx={cx}
                cy={cy}
                r={i === 1 ? 6 : 4}
                fill="none"
                stroke={primary}
                strokeWidth="1"
                opacity={isLight ? 0.35 : 0.4}
              />
              <circle
                cx={cx}
                cy={cy}
                r="1.5"
                fill={primary}
                opacity={isLight ? 0.4 : 0.45}
              />
            </g>
          ))}

          {/* Start / end — faint */}
          <circle cx="50" cy="810" r="3" fill={primary} opacity={isLight ? 0.3 : 0.35} />
          <circle cx="1150" cy="90" r="3" fill={secondary} opacity={isLight ? 0.25 : 0.3} />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <ScrollReveal variant="fade-up" className="mb-10 md:mb-16">
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: `${primary}99` }}
          >
            02 — Experience
          </p>
          <h2
            className="section-heading-design"
            style={{
              color: isLight ? "#0f0f0f" : "#f5f5f5",
              fontFamily: "var(--font-big-shoulders)",
              fontWeight: 900,
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            THE ROAD{" "}
            <span style={{ color: primary }}>TRAVELED</span>
          </h2>
          <div
            className="mt-4 h-px w-16"
            style={{
              background: isLight
                ? `linear-gradient(90deg, ${primary}60, #ff7a1a80)`
                : `linear-gradient(90deg, ${primary}50, ${secondary}40)`,
            }}
          />
        </ScrollReveal>

        <div ref={lineRef} className="relative">
          <motion.div
            className="absolute left-1/2 top-0 hidden -translate-x-1/2 lg:block"
            style={{
              width: "1px",
              background: isLight
                ? `linear-gradient(180deg, transparent, ${primary}25, ${primary}35, transparent)`
                : `linear-gradient(180deg, transparent, ${primary}20, ${primary}30, transparent)`,
            }}
            initial={{ height: 0 }}
            animate={{ height: lineInView ? "100%" : 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Desktop: alternating timeline */}
          <div className="hidden flex-col gap-8 md:gap-12 lg:flex">
            {designExperiences.map((item, index) => (
              <ExperienceDesignCard
                key={item.id}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
                isLight={isLight}
              />
            ))}
          </div>

          {/* Mobile: stacked with left border */}
          <div className="flex flex-col gap-5 md:gap-8 lg:hidden">
            {designExperiences.map((item, index) => (
              <ExperienceDesignCard
                key={item.id}
                item={item}
                index={index}
                isLeft={true}
                compact
                isLight={isLight}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
