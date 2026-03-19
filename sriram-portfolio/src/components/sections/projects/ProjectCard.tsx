"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { ProjectItem } from "./ProjectsData";
import { getCardGradient } from "./projectGradients";
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
}: {
  item: ProjectItem;
  isDev: boolean;
}) {
  const id = item.id;
  const g = getCardGradient(item, isDev);
  const from = g.from;
  const via = g.via;
  const to = g.to;
  // Designer mode: illustration uses Spiderman palette; dev uses pearl/gold via getCardGradient
  const cardFrom = isDev ? from : "#e63946";
  const cardVia = isDev ? via : "#1d3557";
  const cardTo = isDev ? to : "#457b9d";

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
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg,
            ${cardFrom}18 0%, ${cardVia}10 50%, ${cardTo}08 100%)`,
        }}
      />
      <div className="absolute inset-0">
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
                stroke="#e63946"
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
              stroke="#e63946"
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
            stroke="#e63946"
            strokeWidth="0.8"
            opacity="0.2"
          />
          <line
            x1="16"
            y1="104"
            x2="16"
            y2="112"
            stroke="#e63946"
            strokeWidth="0.8"
            opacity="0.2"
          />
          {/* Navy slash bottom-left */}
          <line
            x1="0"
            y1="120"
            x2="50"
            y2="60"
            stroke="#1d3557"
            strokeWidth="12"
            opacity="0.08"
          />
        </svg>
      )}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: isDev
            ? "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,11,0.65) 100%)"
            : "radial-gradient(ellipse at center, transparent 40%, rgba(13,13,20,0.75) 100%)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
        style={{
          background: isDev
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
  const grad = getCardGradient(item, isDev);

  return (
    <motion.div
      className={cn(
        "relative cursor-pointer overflow-hidden group w-full",
        isDev
          ? "rounded-xl border border-[rgba(201,168,76,0.22)]"
          : "border-2 border-[#e63946]/30",
      )}
      onClick={() => onClick(item)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={isDev ? { y: -4 } : { x: -3, y: -3 }}
      style={
        isDev
          ? { background: "rgba(17,17,20,0.92)" }
          : {
              background: "#0a0a0a",
              boxShadow: "4px 4px 0px rgba(230,57,70,0.25)",
            }
      }
    >
      {/* ── Abstract illustration — fixed short height ── */}
      <div
        className="relative w-full"
        style={{ height: `${getIllustrationHeight(item.id, index)}px` }}
      >
        <AbstractIllustration item={item} isDev={isDev} />

        {/* Hover glow overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 100%,
              ${grad.from}14 0%, transparent 70%)`,
          }}
        />

        {/* Domain badge — top right (when link exists) */}
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "absolute top-2.5 right-3 flex items-center gap-1 font-mono text-[10px] px-2 py-1 rounded-full backdrop-blur-sm z-10 transition-all duration-200",
              isDev
                ? "bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.2)] text-[#f0ece4]/75 hover:bg-[rgba(201,168,76,0.12)] hover:text-[#f0ece4]"
                : "border border-[#e63946]/40 text-[#e63946]/80 hover:bg-[#e63946]/20 hover:text-[#e63946]",
            )}
          >
            {getDomain(item.link)}
            <ExternalLink className="w-2.5 h-2.5 opacity-70" />
          </a>
        )}

        {/* Tags top left */}
        <div className="absolute top-2.5 left-3 flex flex-wrap gap-1.5 z-10">
          {(isDev ? item.tags : item.designTags)
            .slice(0, 2)
            .map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-2 py-0.5 backdrop-blur-sm"
                style={
                  isDev
                    ? {
                        background: `${grad.from}22`,
                        border: `1px solid ${grad.from}40`,
                        color: grad.from,
                        borderRadius: "999px",
                      }
                    : {
                        border: "1px solid rgba(230,57,70,0.4)",
                        color: "#e63946",
                        background: "rgba(0,0,0,0.4)",
                      }
                }
              >
                {tag}
              </span>
            ))}
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
                  border: "1.5px solid #e63946",
                  color: "#e63946",
                }
          }
        >
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* ── Card body — tight and dense ─────────────── */}
      <div
        className="px-4 pt-3 flex flex-col gap-2"
        style={{ paddingBottom: index % 2 === 0 ? "16px" : "12px" }}
      >
        <div className="flex items-baseline justify-between gap-2">
          <h3
            className={cn(
              "text-sm leading-tight",
              isDev ? "font-grotesk font-bold text-[#f0ece4]" : "text-white font-bebas tracking-wider uppercase text-base",
            )}
          >
            {item.title}
          </h3>
          <span
            className={cn(
              "font-mono text-xs flex-shrink-0",
              isDev ? "text-[#f0ece4]/30" : "text-[#e63946]/25",
            )}
          >
            {item.duration.split("–")[1]?.trim() ?? item.duration}
          </span>
        </div>

        <p
          className={cn(
            "text-xs leading-relaxed",
            index % 3 === 0 ? "line-clamp-2" : "line-clamp-1",
            isDev ? "font-poppins text-[#f0ece4]/50" : "font-mono text-white/35",
          )}
        >
          {item.shortDesc}
        </p>

        <div className="flex flex-wrap gap-1 pt-0.5">
          {(isDev ? item.devTech : item.designTools)
            .slice(0, 3)
            .map((tech) => (
              <span
                key={tech}
                className={cn(
                  "font-mono px-2 py-0.5 transition-all duration-200 text-[10px]",
                  isDev ? "skill-pill-dev" : "skill-pill-design",
                )}
              >
                {tech}
              </span>
            ))}
          {(isDev ? item.devTech : item.designTools).length > 3 && (
            <span
              className={cn(
                "font-mono px-2 py-0.5 text-[10px]",
                isDev ? "text-[#f0ece4]/35" : "text-[#e63946]/30",
              )}
            >
              +{(isDev ? item.devTech : item.designTools).length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Bottom accent line on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isDev
            ? `linear-gradient(90deg, ${grad.from}90, ${grad.to}45, transparent)`
            : "rgba(230,57,70,0.4)",
        }}
      />
    </motion.div>
  );
}
