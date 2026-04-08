"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { ProjectItem } from "./ProjectsData";
import { getCardGradient } from "./projectGradients";
import { useLightDark } from "@/context/LightDarkContext";
import { cn } from "@/lib/utils";

function getDomain(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function getIllustrationHeight(id: string, index: number): number {
  const heights: Record<string, number> = {
    smartledger: 140,
    calicalc: 110,
    uniwiz: 130,
    neuhealth: 120,
    delta: 150,
    brandwatch: 115,
  };
  const fallbacks = [130, 110, 145, 120, 135, 115];
  return heights[id] ?? fallbacks[index % fallbacks.length];
}

/** Up to two preview lines for dev cards — substance over empty containers */
function getDevPreviewLines(item: ProjectItem): string[] {
  const a = item.devBullets[0]?.trim();
  const b = item.devBullets[1]?.trim();
  if (a && b) return [a, b];
  if (a) return [a, item.shortDesc];
  return [item.shortDesc];
}

interface ProjectCardProps {
  item: ProjectItem;
  mode: "developer" | "designer";
  onClick: (item: ProjectItem) => void;
  index: number;
}

// Unique abstract SVG illustration per project
// Based on project id — deterministic, always same shape per project
function AbstractIllustration({
  item,
  isDev,
  isLight,
}: {
  item: ProjectItem;
  isDev: boolean;
  isLight: boolean;
}) {
  const id = item.id;
  const g = getCardGradient(item, isDev);
  const from = g.from;
  const via = g.via;
  const to = g.to;
  // Designer mode: KTM palette; dev uses pearl/gold via getCardGradient
  const cardFrom = isDev ? from : "#e85d00";
  const cardVia = isDev ? via : (isLight ? "#1a1a1a" : "#b0b8c1");
  const cardTo = isDev ? to : (isLight ? "#ff7a1a" : "#b0b8c1");

  // Each project gets a unique abstract pattern
  const patterns: Record<string, React.ReactNode> = {
    delta: (
      <svg viewBox="0 0 280 120" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full">
        <circle cx="140" cy="60" r="40" stroke={cardFrom} strokeWidth="0.5"
          strokeDasharray="4 6" opacity="0.2" />
        <circle cx="140" cy="60" r="20" fill={cardFrom} opacity="0.08" />
        <circle cx="140" cy="60" r="6" fill={cardFrom} opacity="0.3" />
        <line x1="0" y1="60" x2="280" y2="60" stroke={cardVia}
          strokeWidth="0.5" opacity="0.15" strokeDasharray="8 4" />
      </svg>
    ),

    brandwatch: (
      <svg viewBox="0 0 280 120" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full">
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 12 }).map((_, col) => (
            <circle key={`${row}-${col}`} cx={12 + col * 24} cy={14 + row * 24}
              r={1} fill={cardFrom} opacity={0.12 + (row + col) * 0.02} />
          ))
        )}
        <path d="M20 100 L70 40 L120 80 L170 30 L260 70"
          stroke={cardFrom} strokeWidth="1" opacity="0.35" fill="none"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),

    smartledger: (
      <svg viewBox="0 0 280 120" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full">
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 10 }).map((_, col) => (
            <circle key={`${row}-${col}`} cx={20 + col * 26} cy={16 + row * 18}
              r={isDev ? 1.5 : 1} fill={cardFrom}
              opacity={0.15 + (row + col) * 0.02} />
          ))
        )}
        <line x1="0" y1="120" x2="280" y2="0" stroke={cardFrom}
          strokeWidth="0.5" opacity="0.2" />
        <line x1="40" y1="120" x2="280" y2="20" stroke={cardVia}
          strokeWidth="0.5" opacity="0.15" />
        <rect x="0" y="52" width="280" height="18" fill={cardFrom} opacity="0.06" />
        <path d="M8 8 L8 24 M8 8 L24 8" stroke={cardFrom} strokeWidth="1.5"
          opacity="0.5" strokeLinecap="round" />
        <path d="M272 112 L272 96 M272 112 L256 112" stroke={cardTo}
          strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
        <rect x="0" y="0" width="280" height="2" fill={`url(#scan-${id})`}
          opacity="0.6">
          <animateTransform attributeName="transform" type="translate"
            values="0,0;0,118;0,0" dur="4s" repeatCount="indefinite" />
        </rect>
        <defs>
          <linearGradient id={`scan-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={cardFrom} stopOpacity="0" />
            <stop offset="50%" stopColor={cardFrom} stopOpacity="1" />
            <stop offset="100%" stopColor={cardFrom} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),

    calicalc: (
      <svg viewBox="0 0 280 120" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full">
        {[30,55,80,45,90,65,40,75,50,85,60,35,70,95,45,60,80,50,70,40].map(
          (h, i) => (
            <rect key={i} x={4 + i * 14} y={120 - h} width={8} height={h}
              rx={isDev ? 3 : 0}
              fill={i % 3 === 0 ? cardFrom : i % 3 === 1 ? cardVia : cardTo}
              opacity={0.15 + (h / 95) * 0.25}>
              {i % 4 === 0 && (
                <animate attributeName="height"
                  values={`${h};${Math.min(h + 15, 100)};${h}`}
                  dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
              )}
              {i % 4 === 0 && (
                <animate attributeName="y"
                  values={`${120 - h};${120 - Math.min(h + 15, 100)};${120 - h}`}
                  dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
              )}
            </rect>
          )
        )}
        <line x1="0" y1="119" x2="280" y2="119"
          stroke={cardFrom} strokeWidth="1" opacity="0.2" />
        <circle cx="200" cy="26" r="3" fill={cardFrom} opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6"
            dur="2s" repeatCount="indefinite" />
        </circle>
        <line x1="200" y1="26" x2="200" y2="119"
          stroke={cardFrom} strokeWidth="0.5"
          strokeDasharray="3 3" opacity="0.2" />
      </svg>
    ),

    uniwiz: (
      <svg viewBox="0 0 280 120" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full">
        <line x1="140" y1="60" x2="40" y2="30"
          stroke={cardFrom} strokeWidth="0.8" opacity="0.25" />
        <line x1="140" y1="60" x2="240" y2="30"
          stroke={cardFrom} strokeWidth="0.8" opacity="0.25" />
        <line x1="140" y1="60" x2="40" y2="90"
          stroke={cardVia} strokeWidth="0.8" opacity="0.2" />
        <line x1="140" y1="60" x2="240" y2="90"
          stroke={cardVia} strokeWidth="0.8" opacity="0.2" />
        <line x1="140" y1="60" x2="140" y2="15"
          stroke={cardTo} strokeWidth="0.8" opacity="0.2" />
        <line x1="140" y1="60" x2="80" y2="105"
          stroke={cardTo} strokeWidth="0.8" opacity="0.15" />
        <line x1="140" y1="60" x2="200" y2="105"
          stroke={cardTo} strokeWidth="0.8" opacity="0.15" />
        {[[40,30], [240,30], [40,90], [240,90], [140,15], [80,105], [200,105]].map(
          ([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={4}
              fill={i % 2 === 0 ? cardFrom : cardVia} opacity={0.3} />
          )
        )}
        <circle cx="140" cy="60" r="10" fill={cardFrom} opacity="0.12" />
        <circle cx="140" cy="60" r="5" fill={cardFrom} opacity="0.4">
          <animate attributeName="r" values="5;7;5"
            dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.2;0.4"
            dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="140" cy="60" r="30" stroke={cardFrom} strokeWidth="0.5"
          strokeDasharray="4 6" opacity="0.15" />
      </svg>
    ),

    neuhealth: (
      <svg viewBox="0 0 280 120" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full">
        {[20,40,60,80,100].map(y => (
          <line key={y} x1="0" y1={y} x2="280" y2={y}
            stroke={cardFrom} strokeWidth="0.3" opacity="0.1" />
        ))}
        {[0,40,80,120,160,200,240,280].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="120"
            stroke={cardFrom} strokeWidth="0.3" opacity="0.1" />
        ))}
        <path
          d="M0 70 L40 70 L55 70 L65 30 L75 95 L85 55 L95 70 L140 70 L155 70 L165 30 L175 95 L185 55 L195 70 L280 70"
          stroke={cardFrom} strokeWidth={isDev ? "1.5" : "2"} opacity="0.5"
          fill="none" strokeLinecap="round" strokeLinejoin="round"
        />
        <circle cx="65" cy="30" r="3" fill={cardFrom} opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6"
            dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="165" cy="30" r="3" fill={cardFrom} opacity="0.4">
          <animate attributeName="opacity" values="0.4;0.8;0.4"
            dur="1.5s" begin="0.75s" repeatCount="indefinite" />
        </circle>
        <rect x="0" y="0" width="3" height="120"
          fill={`url(#scan-neu-${id})`} opacity="0.8">
          <animateTransform attributeName="transform" type="translate"
            values="0,0;280,0;0,0" dur="3s" repeatCount="indefinite" />
        </rect>
        <defs>
          <linearGradient id={`scan-neu-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={cardFrom} stopOpacity="0" />
            <stop offset="50%" stopColor={cardFrom} stopOpacity="0.8" />
            <stop offset="100%" stopColor={cardFrom} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  };

  const fallback = (
    <svg viewBox="0 0 280 120" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full">
      <circle cx="140" cy="60" r="40" stroke={cardFrom} strokeWidth="0.5"
        strokeDasharray="4 6" opacity="0.2" />
      <circle cx="140" cy="60" r="20" fill={cardFrom} opacity="0.08" />
      <circle cx="140" cy="60" r="6" fill={cardFrom} opacity="0.3" />
    </svg>
  );

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden",
        isLight && isDev && "project-card-abstract-wrap",
      )}
    >
      {isLight && isDev ? (
        <>
          <div
            className="project-card-abstract-base absolute inset-0"
            aria-hidden
          />
          <div
            className="project-card-abstract-layers absolute inset-0"
            aria-hidden
          />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg,
            ${cardFrom}18 0%, ${cardVia}10 50%, ${cardTo}08 100%)`,
          }}
        />
      )}
      <div
        className={cn(
          "absolute inset-0",
          isLight && isDev && "project-card-abstract-svg-wrap",
        )}
      >
        {patterns[id] ?? fallback}
      </div>
      {/* Designer mode — web overlay on card illustration */}
      {!isDev && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 280 120"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Web from top-right of card */}
          {[150, 170, 190, 210, 230, 250].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const len = 200;
            const x2 = 280 + len * Math.cos(rad);
            const y2 = 0 + len * Math.sin(rad);
            return (
              <line
                key={i}
                x1="280"
                y1="0"
                x2={x2}
                y2={y2}
                stroke={cardFrom}
                strokeWidth="0.4"
                opacity={0.08 + i * 0.01}
              />
            );
          })}
          {/* Concentric arcs */}
          {[30, 55, 85].map((r, i) => (
            <circle
              key={i}
              cx="280"
              cy="0"
              r={r}
              fill="none"
              stroke={cardFrom}
              strokeWidth="0.4"
              opacity={0.07 + i * 0.02}
              strokeDasharray="2 6"
            />
          ))}
          {/* Small cross bottom-left */}
          <line
            x1="12"
            y1="108"
            x2="20"
            y2="108"
            stroke={cardFrom}
            strokeWidth="0.8"
            opacity="0.2"
          />
          <line
            x1="16"
            y1="104"
            x2="16"
            y2="112"
            stroke={cardFrom}
            strokeWidth="0.8"
            opacity="0.2"
          />
          {/* Navy slash bottom-left */}
          <line
            x1="0"
            y1="120"
            x2="50"
            y2="60"
            stroke={cardVia}
            strokeWidth="12"
            opacity="0.08"
          />
        </svg>
      )}
      <div
        className={cn(
          "absolute inset-0 z-[3] pointer-events-none",
          isLight && isDev
            ? "project-card-abstract-vignette-dev"
            : "project-card-abstract-vignette",
        )}
        style={{
          background: isLight
            ? isDev
              ? "radial-gradient(ellipse 88% 78% at 50% 42%, transparent 40%, rgba(218, 205, 182, 0.38) 100%)"
              : "radial-gradient(ellipse at center, transparent 42%, rgba(255,252,248,0.75) 100%)"
            : isDev
              ? "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,11,0.65) 100%)"
              : "radial-gradient(ellipse at center, transparent 40%, rgba(13,13,20,0.75) 100%)",
        }}
      />
      <div
        className="project-card-abstract-fade-bottom absolute bottom-0 left-0 right-0 h-10 pointer-events-none z-[3]"
        style={{
          background: isLight
            ? isDev
              ? "linear-gradient(to bottom, transparent, rgba(241,232,220,0.97))"
              : "linear-gradient(to bottom, transparent, rgba(255,252,247,0.96))"
            : isDev
              ? "linear-gradient(to bottom, transparent, rgba(10,10,11,0.96))"
              : "linear-gradient(to bottom, transparent, rgba(13,13,20,0.97))",
        }}
      />
    </div>
  );
}

export function ProjectCard({
  item,
  mode,
  onClick,
  index,
}: ProjectCardProps) {
  const isDev = mode === "developer";
  const { isLight } = useLightDark();
  const grad = getCardGradient(item, isDev);

  const cardSurface = !isDev
    ? isLight
      ? {
          background: "rgba(255,252,247,0.98)",
          boxShadow:
            "0 2px 20px rgba(62,48,28,0.06), inset 0 0 0 1px rgba(232,93,0,0.12)",
        }
      : {
          background: "#0a0a0a",
          boxShadow: "4px 4px 0px rgba(232,93,0,0.25)",
        }
    : undefined;

  const previewLines = isDev ? getDevPreviewLines(item) : [];

  return (
    <motion.div
      className={cn(
        "relative w-full cursor-pointer overflow-hidden",
        isDev
          ? "vintage-dev-card group rounded-sm"
          : "group rounded-sm border-2 border-[#e85d00]/30",
      )}
      onClick={() => onClick(item)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={isDev ? undefined : { x: -3, y: -3 }}
      style={cardSurface}
    >
      {isDev && (
        <div className="vintage-dev-card__shimmer" aria-hidden />
      )}
      <div className="vintage-dev-card__inner flex flex-col">
      {/* ── Abstract illustration — fixed short height ── */}
      <div
        className="relative w-full"
        style={{
          height: `${isDev ? Math.max(96, getIllustrationHeight(item.id, index) - 28) : getIllustrationHeight(item.id, index)}px`,
        }}
      >
        <AbstractIllustration item={item} isDev={isDev} isLight={isLight} />

        {/* Hover glow — soft gold wash (stronger in light for depth) */}
        <div
          className="absolute inset-0 z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={
            isLight && isDev
              ? {
                  background:
                    "radial-gradient(ellipse 90% 65% at 50% 100%, rgba(201,168,76,0.14) 0%, rgba(232,213,163,0.06) 45%, transparent 72%)",
                }
              : {
                  background: `radial-gradient(ellipse at 50% 100%,
              ${grad.from}14 0%, transparent 70%)`,
                }
          }
        />

        {/* Tags (left) + domain (right) — flex row avoids overlap on long names */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-start justify-between gap-2 px-3 pt-2.5 pointer-events-none">
          <div className="pointer-events-auto flex min-w-0 flex-1 flex-wrap content-start gap-1.5 pr-1">
            {(isDev ? item.tags : item.designTags)
              .slice(0, 2)
              .map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "font-mono px-2 py-0.5 backdrop-blur-sm",
                    isDev && isLight && "skill-pill-dev project-card-hero-tag rounded-full text-[10px]",
                    !(isDev && isLight) && "text-xs",
                  )}
                  style={
                    isDev
                      ? isLight
                        ? undefined
                        : {
                            background: `${grad.from}22`,
                            border: `1px solid ${grad.from}40`,
                            color: grad.from,
                            borderRadius: "999px",
                          }
                      : isLight
                        ? {
                            border: "1px solid rgba(232,93,0,0.35)",
                            color: "#e85d00",
                            background: "rgba(255,252,247,0.95)",
                          }
                        : {
                            border: "1px solid rgba(232,93,0,0.4)",
                            color: "#e85d00",
                            background: "rgba(0,0,0,0.4)",
                          }
                  }
                >
                  {tag}
                </span>
              ))}
          </div>
          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title={getDomain(item.link)}
              className={cn(
                "project-card-domain pointer-events-auto inline-flex min-w-0 max-w-[min(52%,11rem)] shrink-0 items-center justify-end gap-1 rounded-full px-2 py-1 font-mono text-[10px] backdrop-blur-sm transition-all duration-200",
                isDev
                  ? isLight
                    ? "skill-pill-dev project-card-hero-tag"
                    : "border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.06)] text-[#f0ece4]/75 hover:bg-[rgba(201,168,76,0.12)] hover:text-[#f0ece4]"
                  : isLight
                    ? "border border-[#e85d00]/35 bg-[rgba(255,252,247,0.95)] text-[#e85d00] hover:bg-[rgba(232,93,0,0.08)]"
                    : "border border-[#e85d00]/40 text-[#e85d00]/80 hover:bg-[#e85d00]/20 hover:text-[#e85d00]",
              )}
            >
              <span className="min-w-0 truncate text-right leading-tight">
                {getDomain(item.link)}
              </span>
              <ExternalLink className="h-2.5 w-2.5 shrink-0 opacity-70" />
            </a>
          ) : null}
        </div>

        {/* Arrow hint bottom right */}
        <div
          className="absolute bottom-2.5 right-3 w-6 h-6 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0"
          style={
            isDev
              ? {
                  background: `${grad.from}22`,
                  border: `1px solid ${grad.from}45`,
                  borderRadius: "50%",
                  color: grad.from,
                }
              : {
                  border: "1.5px solid #e85d00",
                  color: "#e85d00",
                }
          }
        >
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* ── Card body ── */}
      {isDev ? (
        <div
          className={cn(
            "project-card-dev-body flex flex-col gap-0 px-4 pb-5 pt-3",
            index % 2 === 0 ? "pb-5" : "pb-4",
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <h3 className="vintage-dev-card__title min-w-0 font-grotesk pr-1 text-[1rem] leading-snug sm:text-[1.05rem]">
                {item.title}
              </h3>
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={item.linkLabel ?? "Open link"}
                  title={item.linkLabel ?? "Open link"}
                  className={cn(
                    "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border transition-colors",
                    isLight
                      ? "border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.08)] text-[rgba(28,22,18,0.7)] hover:bg-[rgba(201,168,76,0.14)]"
                      : "border-[rgba(201,168,76,0.22)] bg-[rgba(201,168,76,0.06)] text-[#f0ece4]/75 hover:bg-[rgba(201,168,76,0.12)] hover:text-[#f0ece4]",
                  )}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>
          </div>
          <div className="vintage-dev-card__hairline my-3.5" aria-hidden />
          <p className="vintage-dev-card__meta project-card-dev-meta font-mono">
            {item.duration}
            {item.tags.length > 0
              ? ` · ${item.tags.slice(0, 2).join(" · ")}`
              : ""}
          </p>
          <ul className="mt-3.5 list-none space-y-2.5">
            {previewLines.map((line, i) => (
              <li
                key={`${item.id}-preview-${i}`}
                className="vintage-dev-card__bullet font-poppins line-clamp-2"
              >
                {line}
              </li>
            ))}
          </ul>
          <div className="project-card-tech-row mt-4 flex flex-wrap gap-1.5 border-t border-[rgba(201,168,76,0.14)] pt-3.5">
            {item.devTech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="skill-pill-dev font-mono px-2 py-0.5 text-[10px] transition-all duration-200"
              >
                {tech}
              </span>
            ))}
            {item.devTech.length > 4 && (
              <span className="vintage-dev-card__meta font-mono px-2 py-0.5 text-[10px]">
                +{item.devTech.length - 4}
              </span>
            )}
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col gap-2 px-4 pt-3"
          style={{ paddingBottom: index % 2 === 0 ? "16px" : "12px" }}
        >
          <div className="flex items-baseline justify-between gap-2">
            <h3
              className={cn(
                "text-sm leading-tight",
                "font-bebas text-base uppercase tracking-wider",
                isLight ? "text-[#1a1410]" : "text-white",
              )}
            >
              {item.title}
            </h3>
            <span
              className={cn(
                "flex-shrink-0 font-mono text-xs",
                isLight
                  ? "text-[rgba(232,93,0,0.45)]"
                  : "text-[#e85d00]/25",
              )}
            >
              {item.duration.split("–")[1]?.trim() ?? item.duration}
            </span>
          </div>

          <p
            className={cn(
              "font-mono text-xs leading-relaxed",
              index % 3 === 0 ? "line-clamp-2" : "line-clamp-1",
              isLight ? "text-[rgba(42,36,30,0.5)]" : "text-white/35",
            )}
          >
            {item.shortDesc}
          </p>

          <div className="flex flex-wrap gap-1 pt-0.5">
            {item.designTools.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="skill-pill-design font-mono px-2 py-0.5 text-[10px] transition-all duration-200"
              >
                {tech}
              </span>
            ))}
            {item.designTools.length > 3 && (
              <span
                className={cn(
                  "font-mono px-2 py-0.5 text-[10px]",
                  isLight
                    ? "text-[rgba(232,93,0,0.45)]"
                    : "text-[#e85d00]/30",
                )}
              >
                +{item.designTools.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      </div>

      {/* Bottom accent line on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[4] h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isDev
            ? `linear-gradient(90deg, ${grad.from}90, ${grad.to}45, transparent)`
            : "rgba(232,93,0,0.4)",
        }}
      />
    </motion.div>
  );
}
