"use client";

import { Mail, Globe, ExternalLink, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { LinkedInIcon } from "./LinkedInIcon";
import type { ContactLink } from "./ContactData";

interface ContactCardDesignProps {
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

export function ContactCardDesign({ link }: ContactCardDesignProps) {
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
              {renderIcon(link, "w-4 h-4 text-[#39FF14]", { color: "#39FF14" })}
            </div>
            <div>
              <p className="font-bebas text-white text-sm">{link.label}</p>
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
            <a
              href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 border-2 border-[#39FF14]/40 font-mono text-xs text-[#39FF14] hover:bg-[#39FF14] hover:text-black transition-all duration-150 uppercase no-underline"
            >
              <ExternalLink className="w-3 h-3" />
              Open
            </a>
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
