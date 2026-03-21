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

  const bgBase = isLight ? "#fff" : "#0c0c0c";
  const edgeGlow = hovered
    ? `linear-gradient(180deg, ${PRIMARY}, #ff7a1a)`
    : `linear-gradient(180deg, ${PRIMARY}60, ${PRIMARY}20)`;
  const textBody = isLight ? "#0a0a0a" : "#f0f0f0";
  const textMuted = isLight ? "rgba(10,10,10,0.5)" : "rgba(240,240,240,0.5)";

  async function handleCopy(e: React.MouseEvent) {
    e.stopPropagation();
    await navigator.clipboard.writeText(link.copyValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.div
      className="group relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Glow */}
      <div
        className="absolute -inset-4 rounded-2xl opacity-0 blur-3xl transition-opacity duration-400 ease-out group-hover:opacity-100 pointer-events-none"
        style={{
          zIndex: -1,
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(232,93,0,0.25) 0%, transparent 65%)`,
        }}
        aria-hidden
      />

      <div
        className="relative overflow-hidden rounded-sm transition-all duration-300"
        style={{
          background: bgBase,
          boxShadow: hovered
            ? isLight
              ? "0 20px 50px -15px rgba(232,93,0,0.2), 0 0 0 1px rgba(232,93,0,0.15)"
              : "0 24px 56px -16px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,93,0,0.2)"
            : isLight
              ? "0 8px 32px -8px rgba(0,0,0,0.06)"
              : "0 8px 32px -8px rgba(0,0,0,0.5)",
          transform: hovered ? "translateZ(0)" : undefined,
        }}
      >
        {/* Left edge — gradient bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300"
          style={{ background: edgeGlow }}
        />

        <div className="pl-6 pr-6 py-5 flex flex-col gap-4 min-h-[180px]">
          {/* Top row — icon + label */}
          <div className="flex items-center justify-between gap-4">
            <div
              className="w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                background: hovered
                  ? `linear-gradient(135deg, ${PRIMARY}20, ${PRIMARY}08)`
                  : isLight
                    ? "rgba(232,93,0,0.06)"
                    : "rgba(232,93,0,0.08)",
                border: `1px solid ${hovered ? "rgba(232,93,0,0.5)" : "rgba(232,93,0,0.3)"}`,
              }}
            >
              {renderIcon(link, "w-6 h-6", { color: PRIMARY })}
            </div>
            <span
              className="font-mono text-[10px] uppercase tracking-widest"
              style={{ color: textMuted }}
            >
              {link.sublabel}
            </span>
          </div>

          {/* Label */}
          <p
            className="font-syne font-semibold text-base"
            style={{ color: textBody }}
          >
            {link.label}
          </p>

          {/* Value — hero typography */}
          <p
            className="font-mono text-sm font-medium truncate transition-colors duration-200 -mt-1"
            style={{
              color: hovered ? PRIMARY : textMuted,
              letterSpacing: "0.02em",
            }}
          >
            {link.value}
          </p>

          {/* Actions — slide up on hover */}
          <motion.div
            className="flex gap-2"
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0,
              y: hovered ? 0 : 12,
            }}
            transition={{ duration: 0.2 }}
          >
            {link.canNavigate && (
              <a
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 font-mono text-[10px] uppercase tracking-widest transition-colors duration-150 no-underline rounded-sm"
                style={{
                  background: `${PRIMARY}15`,
                  color: PRIMARY,
                  border: `1px solid ${PRIMARY}40`,
                }}
              >
                <ExternalLink className="w-3 h-3" />
                Open
              </a>
            )}
            {link.canCopy && (
              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 font-mono text-[10px] uppercase tracking-widest transition-all duration-150 rounded-sm"
                style={{
                  background: copied ? PRIMARY : `${PRIMARY}10`,
                  color: copied ? (isLight ? "#fff" : "#0a0a0a") : PRIMARY,
                  border: copied ? `1px solid ${PRIMARY}` : "1px solid rgba(232,93,0,0.4)",
                }}
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copy
                  </>
                )}
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
