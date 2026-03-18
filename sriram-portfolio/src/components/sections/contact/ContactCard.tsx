"use client";

import {
  Linkedin,
  Mail,
  Globe,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { ContactLink } from "./ContactData";

interface ContactCardProps {
  link: ContactLink;
  mode: "developer" | "designer";
}

export function ContactCard({ link, mode }: ContactCardProps) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  async function handleCopy(e: React.MouseEvent) {
    e.stopPropagation();
    await navigator.clipboard.writeText(link.copyValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleNavigate(e: React.MouseEvent) {
    e.stopPropagation();
    window.open(link.href, "_blank", "noopener noreferrer");
  }

  const IconComponent =
    link.icon === "Linkedin" ? Linkedin : link.icon === "Mail" ? Mail : Globe;

  if (mode === "developer") {
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
                <IconComponent
                  className="w-4 h-4"
                  style={{ color: link.devAccent }}
                />
              </div>
              <div>
                <p className="font-grotesk font-semibold text-white text-sm">
                  {link.label}
                </p>
                <p className="font-mono text-xs text-white/30 mt-0.5">
                  {link.sublabel}
                </p>
              </div>
            </div>
          </div>
          <p
            className="font-mono text-sm mb-5 truncate transition-colors duration-300"
            style={{
              color: hovered ? link.devAccent : "rgba(255,255,255,0.5)",
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
              <button
                onClick={handleNavigate}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg font-mono text-xs transition-all duration-200"
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
              </button>
            )}
            {link.canCopy && (
              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg font-mono text-xs transition-all duration-200"
                style={{
                  background: copied
                    ? `${link.devAccent}30`
                    : "rgba(255,255,255,0.05)",
                  border: `1px solid ${
                    copied ? link.devAccent + "50" : "rgba(255,255,255,0.08)"
                  }`,
                  color: copied ? link.devAccent : "rgba(255,255,255,0.4)",
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

  return (
    <motion.div
      className="brutal-card p-6 cursor-pointer relative overflow-hidden group h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ x: -3, y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      style={{
        maxHeight: "240px",
        boxShadow: hovered
          ? "6px 6px 0px #39FF14"
          : "4px 4px 0px #39FF14",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 transition-all duration-200"
        style={{
          height: hovered ? "3px" : "2px",
          background: "#39FF14",
        }}
      />
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center flex-shrink-0 border-2 transition-all duration-150"
              style={{
                borderColor: hovered ? "#39FF14" : "rgba(57,255,20,0.3)",
                background: hovered ? "rgba(57,255,20,0.1)" : "transparent",
              }}
            >
              <IconComponent className="w-4 h-4 text-[#39FF14]" />
            </div>
            <div>
              <p className="font-bebas text-white text-sm">
                {link.label}
              </p>
              <p className="font-mono text-xs text-white/30 mt-0.5">
                {link.sublabel}
              </p>
            </div>
          </div>
        </div>
        <p
          className="font-mono text-sm mb-5 truncate transition-colors duration-150"
          style={{
            color: hovered ? "#39FF14" : "rgba(255,255,255,0.4)",
          }}
        >
          {link.value}
        </p>
        <div
          className="flex gap-0 transition-all duration-150"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
          }}
        >
          {link.canNavigate && (
            <button
              onClick={handleNavigate}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 border-2 border-[#39FF14]/40 font-mono text-xs text-[#39FF14] hover:bg-[#39FF14] hover:text-black transition-all duration-150 uppercase"
            >
              <ExternalLink className="w-3 h-3" />
              Open
            </button>
          )}
          {link.canCopy && (
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 border-2 border-l-0 font-mono text-xs uppercase transition-all duration-150"
              style={{
                borderColor: copied ? "#39FF14" : "rgba(57,255,20,0.4)",
                color: copied ? "#000" : "#39FF14",
                background: copied ? "#39FF14" : "transparent",
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
