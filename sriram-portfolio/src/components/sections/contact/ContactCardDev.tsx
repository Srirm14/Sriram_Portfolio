"use client";

import { Mail, Globe, ExternalLink, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { LinkedInIcon } from "./LinkedInIcon";
import type { ContactLink } from "./ContactData";

interface ContactCardDevProps {
  readonly link: ContactLink;
}

function renderIcon(
  link: ContactLink,
  className: string,
  style?: React.CSSProperties
) {
  if (link.icon === "Linkedin") return <LinkedInIcon className={className} style={style} />;
  if (link.icon === "Mail") return <Mail className={className} style={style} />;
  return <Globe className={className} style={style} />;
}

export function ContactCardDev({ link }: ContactCardDevProps) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isExternal = link.href.startsWith("http");

  async function handleCopy(e: React.MouseEvent) {
    e.stopPropagation();
    await navigator.clipboard.writeText(link.copyValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.div
      className="glass-card rounded-xl p-6 cursor-pointer relative overflow-hidden group transition-all duration-300 h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
      style={{
        boxShadow: hovered
          ? `0 8px 32px ${link.devAccent}25, inset 0 0 0 1px ${link.devAccent}30`
          : undefined,
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-300"
        style={{
          background: `linear-gradient(90deg, ${link.devAccent}, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />
      <div
        className="absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${link.devAccent}08 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
              style={{
                background: `${link.devAccent}15`,
                border: `1px solid ${link.devAccent}30`,
                boxShadow: hovered ? `0 0 12px ${link.devAccent}30` : "none",
              }}
            >
              {renderIcon(link, "w-4 h-4", { color: link.devAccent })}
            </div>
            <div>
              <p className="font-grotesk font-semibold text-[#f0ece4] text-sm">
                {link.label}
              </p>
              <p className="font-mono text-xs text-[#f0ece4]/40 mt-0.5">
                {link.sublabel}
              </p>
            </div>
          </div>
        </div>
        <p
          className="font-mono text-sm mb-5 truncate transition-colors duration-300"
          style={{
            color: hovered ? link.devAccent : "rgba(240,236,228,0.55)",
          }}
        >
          {link.value}
        </p>
        <div
          className="flex gap-2 transition-all duration-300"
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
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg font-mono text-xs transition-all duration-200 no-underline"
              style={{
                background: `${link.devAccent}20`,
                border: `1px solid ${link.devAccent}30`,
                color: link.devAccent,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = `${link.devAccent}30`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = `${link.devAccent}20`;
              }}
            >
              <ExternalLink className="w-3 h-3" />
              Open
            </a>
          )}
          {link.canCopy && (
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg font-mono text-xs transition-all duration-200"
              style={{
                background: copied
                  ? `${link.devAccent}30`
                  : "rgba(201,168,76,0.08)",
                border: `1px solid ${
                  copied ? link.devAccent + "50" : "rgba(201,168,76,0.2)"
                }`,
                color: copied ? link.devAccent : "rgba(240,236,228,0.45)",
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
        </div>
      </div>
    </motion.div>
  );
}
