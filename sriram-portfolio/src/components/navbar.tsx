"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useModeStore } from "@/store";
import { ModeToggle } from "@/components/mode-toggle";
import { navLinks } from "@/lib/data/nav";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 50;

export function Navbar() {
  const mode = useModeStore((s) => s.mode);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDev = mode === "developer";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? isDev
            ? "backdrop-blur-[16px] bg-[rgba(10,10,15,0.7)] border-b border-white/[0.08]"
            : "backdrop-blur-[12px] bg-[rgba(10,10,10,0.8)] border-b border-[rgba(57,255,20,0.3)]"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="#hero"
          className={cn(
            "font-grotesk text-sm font-semibold transition-colors",
            isDev
              ? "text-white hover:text-[#06b6d4]"
              : "text-white hover:text-[#39FF14]",
          )}
        >
          Sriram V
        </Link>
        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isDev
                      ? "text-white/80 hover:text-white"
                      : "text-white/80 hover:text-[#39FF14]",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
