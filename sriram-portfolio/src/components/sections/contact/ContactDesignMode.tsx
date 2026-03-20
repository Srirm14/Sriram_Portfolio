"use client";

import { ContactCard } from "./ContactCard";
import { useLightDark } from "@/context/LightDarkContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerChildren } from "@/components/ui/StaggerChildren";
import type { ContactLink } from "./ContactData";
import type { getMeta } from "@/lib/data";

interface ContactDesignModeProps {
  readonly contactLinks: ContactLink[];
  readonly meta: ReturnType<typeof getMeta>;
}

export function ContactDesignMode({
  contactLinks,
  meta,
}: ContactDesignModeProps) {
  const { isLight } = useLightDark();
  const primary = "#e85d00";
  const secondary = isLight ? "#1a1a1a" : "#b0b8c1";

  return (
    <section
      id="contact"
      className="relative py-14 md:py-24 px-4 md:px-6 lg:px-12 overflow-hidden"
      style={{
        backgroundColor: isLight ? "#fff8f2" : "#080808",
        willChange: "transform",
      }}
    >
      {/* Top hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg,
            transparent,
            ${primary}40,
            ${isLight ? "#ff7a1a40" : `${secondary}30`},
            transparent)`,
        }}
      />

      {/* Background — connecting lines / signal abstraction */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden
      >
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="contact-glow" cx="50%" cy="80%" r="50%">
              <stop offset="0%" stopColor={primary} stopOpacity={isLight ? 0.08 : 0.12} />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="contact-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={primary} stopOpacity="0" />
              <stop offset="50%" stopColor={primary} stopOpacity={isLight ? 0.25 : 0.35} />
              <stop offset="100%" stopColor={primary} stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect width="100%" height="100%" fill="url(#contact-glow)" />

          {/* Connecting lines — from center bottom toward cards */}
          {[25, 50, 75].map((xPct) => (
            <line
              key={`conn-${xPct}`}
              x1={`${xPct}%`}
              y1="100%"
              x2={`${50 + (xPct - 50) * 0.6}%`}
              y2="45%"
              stroke="url(#contact-line)"
              strokeWidth="1"
              opacity={isLight ? 0.2 : 0.3}
              strokeDasharray="6 14"
            />
          ))}

          {/* Horizontal signal bands */}
          {[30, 55, 80].map((y) => (
            <line
              key={`band-${y}`}
              x1="0%"
              y1={`${y}%`}
              x2="100%"
              y2={`${y}%`}
              stroke={primary}
              strokeWidth="0.5"
              opacity={isLight ? 0.06 : 0.1}
              strokeDasharray="12 24"
            />
          ))}

          {/* Corner nodes */}
          <circle cx="8%" cy="12%" r="4" fill={primary} opacity={isLight ? 0.2 : 0.25} />
          <circle cx="92%" cy="12%" r="4" fill={secondary} opacity={isLight ? 0.15 : 0.2} />
          <circle cx="50%" cy="88%" r="6" fill={primary} opacity={isLight ? 0.15 : 0.2} />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <ScrollReveal variant="blur-in" className="mb-12 text-center">
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: `${primary}99` }}
          >
            05 — Contact
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
            LET&apos;S{" "}
            <span style={{ color: primary }}>CONNECT</span>
          </h2>
          <div
            className="mt-4 h-px w-16 mx-auto"
            style={{
              background: isLight
                ? `linear-gradient(90deg, ${primary}60, #ff7a1a80)`
                : `linear-gradient(90deg, ${primary}50, ${secondary}40)`,
            }}
          />
          <p
            className="font-poppins text-sm mt-4 max-w-md mx-auto"
            style={{
              color: isLight ? "rgba(15,15,15,0.62)" : "rgba(245,245,245,0.58)",
            }}
          >
            Open to senior frontend roles in Bengaluru or remote. Hover a card
            to open or copy.
          </p>
        </ScrollReveal>

        <StaggerChildren
          className="columns-1 md:columns-3 gap-4 md:gap-6 max-w-3xl mx-auto space-y-4 md:space-y-6"
          staggerDelay={0.12}
          childClassName="break-inside-avoid"
        >
          {contactLinks.map((link) => (
            <ContactCard key={link.id} link={link} mode="designer" />
          ))}
        </StaggerChildren>

        <ScrollReveal
          variant="fade-up"
          delay={0.5}
          className="text-center font-mono text-xs mt-16"
          style={{
            color: isLight ? "rgba(15,15,15,0.48)" : "rgba(245,245,245,0.42)",
          }}
        >
          Built with Next.js · Designed & developed by {meta.name}
        </ScrollReveal>
      </div>
    </section>
  );
}
