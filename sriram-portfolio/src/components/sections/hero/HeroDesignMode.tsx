"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLightDark } from "@/context/LightDarkContext";
import { KtmBg } from "@/components/ui/backgrounds/KtmBg";
import { HeroStats } from "./HeroStats";

const KTM_WORDS = [
  "Product Designer",
  "UI/UX Engineer",
  "Design Systems",
  "Visual Thinker",
];

function useTypewriterName(text: string, delay: number = 350) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let i = 0;
    const resetId = setTimeout(() => {
      setDisplayed("");
      setDone(false);
    }, 0);
    const t = setTimeout(() => {
      interval.current = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval.current!);
          setDone(true);
        }
      }, 52);
    }, delay);
    return () => {
      clearTimeout(resetId);
      clearTimeout(t);
      if (interval.current) clearInterval(interval.current);
    };
  }, [text, delay]);

  return { displayed, done };
}

interface HeroDesignModeProps {
  meta: ReturnType<typeof import("@/lib/data").getMeta>;
}

export function HeroDesignMode({ meta }: HeroDesignModeProps) {
  const { isLight } = useLightDark();

  const { displayed, done } = useTypewriterName(meta.name, 350);

  /* ── Tokens ── */
  const t = {
    bg: isLight ? "#fff8f2" : "#080808",
    text: isLight ? "#0f0f0f" : "#f5f5f5",
    textMuted: isLight
      ? "rgba(15,15,15,0.62)"
      : "rgba(245,245,245,0.58)",
    primary: "#e85d00",
    secondary: isLight ? "#1a1a1a" : "#b0b8c1",
    accent: isLight ? "#ff7a1a" : "#b0b8c1",
    badgeBorder: isLight
      ? "rgba(232,93,0,0.42)"
      : "rgba(232,93,0,0.5)",
    badgeBg: isLight
      ? "rgba(232,93,0,0.06)"
      : "rgba(232,93,0,0.07)",
    badgeColor: "#e85d00",
    divider: isLight
      ? "linear-gradient(90deg,#e85d00,#ff7a1a)"
      : "linear-gradient(90deg,#e85d00,#b0b8c1)",
    roleFrom: "#e85d00",
    roleTo: isLight ? "#ff7a1a" : "#b0b8c1",
    cursor: "#e85d00",
    metalClass: isLight ? "text-metallic-ktm" : "text-metallic-ktm-dark",
    nameShadow: isLight
      ? "0 0 80px rgba(232,93,0,0.1)"
      : "0 0 80px rgba(232,93,0,0.1), 0 0 160px rgba(176,184,193,0.03)",
    words: KTM_WORDS,
    roleLabel: "Product Designer",
  };

  const easeOut = {
    duration: 0.55,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-end
                 overflow-hidden pt-20 md:pt-28 pb-16 md:pb-24"
      style={{ backgroundColor: t.bg }}
    >
      {/* Background */}
      <KtmBg isLight={isLight} />

      {/* KTM glow — orange (light) or orange+silver (dark) */}
      {isLight ? (
        <div
          className="pointer-events-none absolute
                     top-0 right-0 w-[420px] h-[420px] z-0"
          style={{
            background:
              "radial-gradient(circle,rgba(232,93,0,0.07) 0%,transparent 65%)",
            filter: "blur(28px)",
          }}
          aria-hidden
        />
      ) : (
        <div
          className="pointer-events-none absolute
                     top-0 right-0 w-[420px] h-[420px] z-0"
          style={{
            background:
              "radial-gradient(circle,rgba(232,93,0,0.04) 0%,rgba(176,184,193,0.02) 40%,transparent 70%)",
            filter: "blur(28px)",
          }}
          aria-hidden
        />
      )}

      {/* ── Main layout — left aligned, bottom anchored ── */}
      <div
        className="relative z-10 w-full max-w-7xl mx-auto
                   px-6 md:px-12 lg:px-20 -mt-8 md:-mt-12"
      >
        {/* Massive name — fills left column */}
        <div className="mb-2">
          <h1
            className={done ? t.metalClass : ""}
            style={{
              fontFamily: "var(--font-big-shoulders)",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              ...(done ? {} : { color: t.primary }),
              textShadow: done ? t.nameShadow : "none",
            }}
          >
            {/* First name */}
            <span style={{ display: "block" }}>
              {displayed.split(" ")[0] ?? ""}
              {!done && displayed.split(" ").length <= 1 && (
                <span
                  style={{
                    display: "inline-block",
                    width: "4px",
                    height: "0.8em",
                    background: t.cursor,
                    marginLeft: "6px",
                    verticalAlign: "middle",
                    animation: "cursor-blink 0.8s step-end infinite",
                  }}
                />
              )}
            </span>
            {/* Last name */}
            <span
              style={{
                display: "block",
                color: done ? undefined : t.text,
                WebkitTextFillColor: done ? undefined : t.text,
              }}
            >
              {displayed.split(" ").slice(1).join(" ") ?? ""}
              {!done && displayed.split(" ").length > 1 && (
                <span
                  style={{
                    display: "inline-block",
                    width: "4px",
                    height: "0.8em",
                    background: t.cursor,
                    marginLeft: "6px",
                    verticalAlign: "middle",
                    animation: "cursor-blink 0.8s step-end infinite",
                  }}
                />
              )}
            </span>
          </h1>
        </div>

        {/* Role line */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...easeOut, delay: 0.15 }}
          className="mb-6 flex items-center gap-4"
        >
          <div
            style={{
              width: "40px",
              height: "2px",
              background: t.divider,
              flexShrink: 0,
            }}
          />
          <p
            key={`role-${isLight}`}
            style={{
              fontFamily: "var(--font-big-shoulders)",
              fontWeight: 700,
              fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: t.primary,
            }}
          >
            {t.roleLabel}
          </p>
        </motion.div>

        {/* Bottom row — badge + subline + CTAs + stats */}
        <div className="flex flex-col lg:flex-row
                        lg:items-end gap-8 lg:gap-16">
          {/* Left — badge + subline + CTAs */}
          <div className="flex flex-col gap-5 max-w-lg">
            {/* Badge — blink + glow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...easeOut, delay: 0.22 }}
              className="badge-collab-glow flex min-w-0 max-w-full shrink-0 items-center gap-2 px-3 py-1.5 w-fit relative sm:gap-2.5 sm:px-4"
              style={{
                border: `1.5px solid ${t.badgeBorder}`,
                background: t.badgeBg,
                color: t.badgeColor,
                boxShadow: `0 0 20px rgba(232,93,0,0.25), 0 0 40px rgba(232,93,0,0.12)`,
              }}
            >
              <span
                className="badge-dot-blink"
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: t.primary,
                  flexShrink: 0,
                  display: "inline-block",
                }}
              />
              <span
                className="break-words"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "clamp(9px, 2.2vw, 10px)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {meta.availabilityDesign ?? meta.availability}
              </span>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...easeOut, delay: 0.28 }}
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                color: t.textMuted,
                maxWidth: "380px",
              }}
            >
              Crafting interfaces that feel as good as they look
            </motion.p>

            {/* CTAs — CSS-only hover for smooth, lag-free transitions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...easeOut, delay: 0.34 }}
              className={`hero-design-ctas flex flex-nowrap gap-2 sm:flex-wrap sm:gap-3 overflow-x-auto -mx-1 px-1 sm:overflow-visible sm:mx-0 sm:px-0 ${isLight ? "" : "ktm-dark"}`}
              style={
                {
                  "--ktm-primary": t.primary,
                  "--ktm-secondary": t.secondary,
                  "--ktm-text-on": isLight ? "#ffffff" : "#080808",
                } as React.CSSProperties
              }
            >
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("experience")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="hero-design-cta-filled shrink-0"
                style={{
                  fontFamily: "var(--font-big-shoulders)",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  fontSize: "clamp(0.7rem, 2.5vw, 0.95rem)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "clamp(8px, 2vw, 10px) clamp(16px, 4vw, 24px)",
                  background: t.primary,
                  color: isLight ? "#ffffff" : "#080808",
                  border: `2px solid ${t.primary}`,
                  boxShadow: `4px 4px 0px ${t.secondary}`,
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
              >
                <ArrowDown className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                VIEW WORK
              </button>

              <Link
                href={meta.resume}
                download
                className="hero-design-cta-outline shrink-0"
                style={{
                  fontFamily: "var(--font-big-shoulders)",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  fontSize: "clamp(0.7rem, 2.5vw, 0.95rem)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "clamp(8px, 2vw, 10px) clamp(16px, 4vw, 24px)",
                  background: "transparent",
                  color: t.primary,
                  border: `2px solid ${t.primary}`,
                  boxShadow: `4px 4px 0px ${t.secondary}`,
                  textTransform: "uppercase",
                }}
              >
                <Download className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                RESUME
              </Link>
            </motion.div>
          </div>

          {/* Right — stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.44 }}
            className="lg:ml-auto"
          >
            <HeroStats mode="designer" />
          </motion.div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px
                   pointer-events-none z-10"
        style={{ background: t.divider, opacity: 0.4 }}
      />
    </section>
  );
}
