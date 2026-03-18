"use client";

import { useCallback } from "react";
import { useModeStore } from "@/store";
import { ModeToggle } from "@/components/mode-toggle";
import { navLinks } from "@/lib/data/nav";
import { cn } from "@/lib/utils";

export function Navbar() {
  const mode = useModeStore((s) => s.mode);

  const scrollToSection = useCallback((href: string) => {
    const id = href.startsWith("#") ? href.slice(1) : href;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const isDev = mode === "developer";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[9999] isolate h-16",
        isDev
          ? "backdrop-blur-[16px] bg-[rgba(10,10,15,0.9)] border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
          : "backdrop-blur-[12px] bg-[rgba(10,10,10,0.95)] border-b border-[rgba(57,255,20,0.3)] shadow-[0_4px_24px_rgba(0,0,0,0.4)]",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <button
          type="button"
          onClick={() => scrollToSection("#hero")}
          className={cn(
            "font-grotesk text-sm font-semibold transition-colors",
            isDev
              ? "text-white hover:text-[#06b6d4]"
              : "text-white hover:text-[#39FF14]",
          )}
        >
          Sriram V
        </button>
        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isDev
                      ? "text-white/80 hover:text-white"
                      : "text-white/80 hover:text-[#39FF14]",
                  )}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
