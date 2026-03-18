"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Pen, X, Menu } from "lucide-react";
import { useModeStore } from "@/store";
import type { Mode } from "@/types";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 50;
const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { mode, setMode } = useModeStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const isDev = mode === "developer";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
            break;
          }
        }
      },
      { rootMargin: "-40% 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
  }, []);

  const handleNavClick = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300",
          scrolled
            ? isDev
              ? "border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
              : "border-b border-[rgba(57,255,20,0.2)] shadow-[0_4px_24px_rgba(57,255,20,0.08)]"
            : "border-b border-transparent",
        )}
        style={
          scrolled
            ? isDev
              ? {
                  backdropFilter: "blur(16px)",
                  background: "rgba(10, 10, 15, 0.8)",
                }
              : {
                  backdropFilter: "blur(12px)",
                  background: "rgba(10, 10, 10, 0.85)",
                }
            : undefined
        }
      >
        <nav className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
          {/* Left — Logo */}
          <button
            type="button"
            onClick={scrollToTop}
            className={cn(
              "flex items-center gap-2 transition-all",
              isDev
                ? "rounded-lg px-3 py-1.5 glass hover:border-[#7c3aed]/50 hover:shadow-glow-purple"
                : "border-2 border-[#39FF14] px-3 py-1 hover:shadow-brutal-sm",
            )}
          >
            <span
              className={cn(
                "font-mono text-sm font-bold",
                isDev ? "text-white" : "text-[#39FF14]",
              )}
            >
              SV
            </span>
            <span
              className={cn(
                "text-sm",
                isDev
                  ? "font-grotesk font-semibold text-white"
                  : "font-syne font-bold uppercase text-white",
              )}
            >
              Sriram V.
            </span>
          </button>

          {/* Center — Nav links (desktop) */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={handleNavClick}
                    className={cn(
                      "group relative font-mono text-sm transition-colors",
                      isDev
                        ? isActive
                          ? "text-white"
                          : "text-white/50 hover:text-white"
                        : isActive
                          ? "font-bold text-[#39FF14]"
                          : "text-white/50 hover:text-[#39FF14]",
                    )}
                  >
                    {link.label}
                    {isDev && (
                      <span
                        className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] transition-transform duration-300 group-hover:scale-x-100"
                        style={{
                          transform: isActive ? "scaleX(1)" : "scaleX(0)",
                        }}
                      />
                    )}
                    {!isDev && isActive && (
                      <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-[#39FF14]" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right — Mode toggle + CTA */}
          <div className="flex items-center gap-4">
            {/* Mode toggle pill */}
            <div
              className={cn(
                "relative flex items-center transition-all",
                isDev
                  ? "rounded-full p-1 backdrop-blur-glass border border-white/10 bg-white/5 hover:border-[#7c3aed]/40 toggle-border-shimmer"
                  : "border-2 border-[#39FF14] p-0.5",
              )}
            >
              <div className="relative flex">
                {(
                  [
                    {
                      value: "developer" as Mode,
                      label: "Dev",
                      Icon: Code2,
                    },
                    {
                      value: "designer" as Mode,
                      label: "Design",
                      Icon: Pen,
                    },
                  ]
                ).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setMode(opt.value)}
                    className={cn(
                      "relative z-10 flex min-w-[80px] items-center justify-center gap-1.5 px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors",
                      mode === opt.value
                        ? isDev
                          ? "font-semibold text-white"
                          : "font-bold text-black"
                        : isDev
                          ? "text-white/40 hover:text-white/70"
                          : "text-[#39FF14]/50 hover:text-[#39FF14]",
                    )}
                  >
                    <opt.Icon className="h-3 w-3" />
                    {opt.label}
                  </button>
                ))}
                {mode === "developer" ? (
                  <motion.div
                    layoutId="toggle-indicator"
                    className="absolute inset-y-1 left-1 z-0 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4]"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 28,
                    }}
                  />
                ) : (
                  <motion.div
                    layoutId="toggle-indicator"
                    className="absolute inset-y-0.5 left-[calc(50%+2px)] z-0 w-[calc(50%-4px)] bg-[#39FF14]"
                    style={{ borderRadius: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 28,
                    }}
                  />
                )}
              </div>
            </div>

            {/* Hire me CTA (desktop) */}
            <a
              href="#contact"
              className={cn(
                "hidden md:flex items-center gap-1.5 px-4 py-1.5 text-sm font-mono transition-all",
                isDev
                  ? "rounded-lg glass text-white/70 hover:border-[#7c3aed]/50 hover:text-white hover:shadow-glow-purple"
                  : "border-2 border-[#39FF14] font-bold uppercase text-[#39FF14] shadow-brutal-sm hover:bg-[#39FF14] hover:text-black hover:shadow-brutal",
              )}
            >
              Hire me
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <motion.div
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={isDev ? { duration: 0.2 } : { duration: 0.1 }}
                >
                  <X
                    className={cn(
                      "h-6 w-6",
                      isDev ? "text-white" : "text-[#39FF14]",
                    )}
                    strokeWidth={isDev ? 2 : 2.5}
                  />
                </motion.div>
              ) : (
                <Menu
                  className={cn(
                    "h-6 w-6",
                    isDev ? "text-white" : "text-[#39FF14]",
                  )}
                  strokeWidth={isDev ? 2 : 2.5}
                />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={
              isDev ? { duration: 0.3 } : { duration: 0.15, ease: "linear" }
            }
            className={cn(
              "fixed inset-0 z-40 md:hidden",
              isDev
                ? "backdrop-blur-heavy bg-[#0a0a0f]/95"
                : "border-x-4 border-[#39FF14] bg-[#0a0a0a]",
            )}
          >
            <ul className="flex flex-col items-center justify-center gap-8 pt-24">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: isDev ? i * 0.08 : 0,
                    duration: isDev ? 0.3 : 0.1,
                    ease: isDev ? "easeOut" : "linear",
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={handleNavClick}
                    className={cn(
                      "text-4xl transition-colors",
                      isDev
                        ? "font-grotesk text-white hover:text-[#06b6d4]"
                        : "font-syne font-bold uppercase text-white hover:text-[#39FF14]",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: isDev ? NAV_LINKS.length * 0.08 : 0,
                  duration: 0.3,
                }}
              >
                <Link
                  href="#contact"
                  onClick={handleNavClick}
                  className={cn(
                    "text-4xl transition-colors",
                    isDev
                      ? "font-grotesk text-white hover:text-[#06b6d4]"
                      : "font-syne font-bold uppercase text-white hover:text-[#39FF14]",
                  )}
                >
                  Hire me
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
