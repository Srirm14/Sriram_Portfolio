"use client";

import { Mail, Globe, ExternalLink, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLightDark } from "@/context/LightDarkContext";
import { LinkedInIcon } from "./LinkedInIcon";
import type { ContactLink } from "./ContactData";

interface ContactCardDesignProps {
  readonly link: ContactLink;
}

const PRIMARY = "#e85d00";
const PRIMARY_50 = "#e85d0050";
const PRIMARY_60 = "#e85d0060";

function renderIcon(
  link: ContactLink,
  className: string,
  style?: React.CSSProperties
) {
  if (link.icon === "Linkedin") return <LinkedInIcon className={className} style={style} />;
  if (link.icon === "Mail") return <Mail className={className} style={style} />;
  return <Globe className={className} style={style} />;
}

export function ContactCardDesign({ link }: ContactCardDesignProps) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { isLight } = useLightDark();
  const isExternal = link.href.startsWith("http");

  const textMuted = isLight ? "rgba(15,15,15,0.5)" : "rgba(245,245,245,0.5)";
  const textBody = isLight ? "#0f0f0f" : "#f5f5f5";
  const cardBg = isLight ? "rgba(255,255,255,0.85)" : "rgba(18,18,18,0.9)";
  const borderColor = hovered ? PRIMARY : isLight ? "rgba(232,93,0,0.25)" : "rgba(232,93,0,0.3)";

  async function handleCopy(e: React.MouseEvent) {
    e.stopPropagation();
    await navigator.clipboard.writeText(link.copyValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.div
      className="group relative overflow-visible cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {/* Orange blur glow on hover */}
      <div
        className="absolute -inset-3 rounded-sm opacity-0 blur-2xl transition-opacity duration-300 ease-out group-hover:opacity-100 pointer-events-none"
        style={{
          zIndex: -1,
          background: `radial-gradient(ellipse 75% 55% at 50% 50%, rgba(232,93,0,0.35) 0%, rgba(232,93,0,0.12) 45%, transparent 70%)`,
        }}
        aria-hidden
      />

      <div
        className="relative overflow-hidden rounded-sm p-6 h-full transition-all duration-300"
        style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          boxShadow: hovered
            ? `0 12px 40px -12px rgba(232,93,0,0.25), 0 0 0 1px ${PRIMARY}40`
            : isLight
              ? "0 4px 20px -4px rgba(0,0,0,0.08)"
              : "0 4px 20px -4px rgba(0,0,0,0.4)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Slow shimmer sweep */}
        <div className="exp-card-shimmer absolute inset-0 rounded-sm pointer-events-none" aria-hidden />
        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-200"
          style={{
            background: hovered
              ? `linear-gradient(90deg, ${PRIMARY}, #ff7a1a)`
              : `${PRIMARY}40`,
          }}
        />

        <div className="relative z-10 flex flex-col justify-between h-full min-h-[200px]">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 flex items-center justify-center flex-shrink-0 rounded-sm transition-all duration-200"
                style={{
                  border: `1px solid ${hovered ? PRIMARY : PRIMARY_50}`,
                  background: hovered ? "rgba(232,93,0,0.08)" : "rgba(232,93,0,0.03)",
                }}
              >
                {renderIcon(link, "w-5 h-5", { color: PRIMARY })}
              </div>
              <div>
                <p className="font-syne font-semibold text-lg tracking-tight" style={{ color: textBody }}>
                  {link.label}
                </p>
                <p className="font-mono text-xs mt-0.5" style={{ color: textMuted }}>
                  {link.sublabel}
                </p>
              </div>
            </div>
          </div>

          <p
            className="font-mono text-sm mb-5 truncate transition-colors duration-150"
            style={{
              color: hovered ? PRIMARY : textMuted,
            }}
          >
            {link.value}
          </p>

          <div
            className="flex gap-0 transition-all duration-200"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(8px)",
            }}
          >
            {link.canNavigate && (
              <a
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 font-mono text-xs uppercase transition-all duration-150 no-underline"
                style={{
                  border: `1px solid ${PRIMARY_60}`,
                  color: PRIMARY,
                  background: "transparent",
                }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open
              </a>
            )}
            {link.canCopy && (
              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 font-mono text-xs uppercase transition-all duration-150"
                style={{
                  border: `1px solid ${copied ? PRIMARY : PRIMARY_50}`,
                  borderLeftWidth: link.canNavigate ? 0 : 1,
                  color: copied ? (isLight ? "#fff" : "#0a0a0a") : PRIMARY,
                  background: copied ? PRIMARY : "transparent",
                }}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
