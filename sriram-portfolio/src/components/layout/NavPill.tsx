"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useModeStore } from "@/store";
import { ModeToggle } from "@/components/mode-toggle";
import { navLinks } from "@/lib/data/nav";
import { cn } from "@/lib/utils";

const scrollToSection = (href: string) => {
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

interface NavLinkPillProps {
  readonly link: { href: string; label: string };
  readonly isActive: boolean;
  readonly isDev: boolean;
  readonly onNavigate: (href: string) => void;
}

function MobileNavLink({
  link,
  isDev,
  onNavigate,
}: Readonly<{
  link: { href: string; label: string };
  isDev: boolean;
  onNavigate: (href: string) => void;
}>) {
  return (
    <button
      type="button"
      onClick={() => onNavigate(link.href)}
      className={cn(
        "font-grotesk text-2xl font-semibold transition-colors",
        isDev ? "text-white hover:text-[#06b6d4]" : "text-white hover:text-[#39FF14]",
      )}
    >
      {link.label}
    </button>
  );
}

function AnchoredNavLink({
  link,
  isDev,
  onNavigate,
}: Readonly<{
  link: { href: string; label: string };
  isDev: boolean;
  onNavigate: (href: string) => void;
}>) {
  return (
    <li key={link.href}>
      <button
        type="button"
        onClick={() => onNavigate(link.href)}
        className={cn(
          "text-sm font-medium transition-colors",
          isDev ? "text-white/80 hover:text-white" : "text-white/80 hover:text-[#39FF14]",
        )}
      >
        {link.label}
      </button>
    </li>
  );
}

function NavLinkPill({ link, isActive, isDev, onNavigate }: NavLinkPillProps) {
  return isDev ? (
    <button
      type="button"
      onClick={() => onNavigate(link.href)}
      className={cn(
        "relative px-3 py-1 rounded-full font-mono text-xs transition-all duration-200",
        isActive ? "text-white" : "text-white/40 hover:text-white/80",
      )}
    >
      {isActive && (
        <motion.div
          layoutId="nav-active-dev"
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7c3aed]/30 to-[#06b6d4]/30 border border-[#7c3aed]/30"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10">{link.label}</span>
    </button>
  ) : (
    <button
      type="button"
      onClick={() => onNavigate(link.href)}
      className={cn(
        "relative px-3 py-1 font-mono text-xs uppercase transition-all duration-150",
        isActive ? "text-[#39FF14]" : "text-white/40 hover:text-[#39FF14]/70",
      )}
    >
      {isActive && (
        <motion.div
          layoutId="nav-active-design"
          className="absolute inset-0 bg-[rgba(57,255,20,0.08)] border border-[#39FF14]/40"
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      )}
      <span className="relative z-10">{link.label}</span>
    </button>
  );
}

export function NavPill() {
  const mode = useModeStore((s) => s.mode);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDev = mode === "developer";

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => {
        if (y > 100) return true;
        if (y < 50) return false;
        return prev; // hysteresis: prevent flicker at threshold
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (id: string) => (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry?.isIntersecting) setActiveSection(id);
    };

    const createObserver = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(handleIntersect(id), { threshold: 0.4 });
      obs.observe(el);
      observers.push(obs);
    };

    const setupObservers = () => {
      observers.forEach((o) => o.disconnect());
      observers.length = 0;
      ids.forEach(createObserver);
    };

    const t1 = setTimeout(setupObservers, 0);
    const t2 = setTimeout(setupObservers, 450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      observers.forEach((o) => o.disconnect());
    };
  }, [mode]);

  const handleNavClick = useCallback((href: string) => {
    scrollToSection(href);
    setMobileOpen(false);
  }, []);

  const anchoredHeader = (
    <motion.header
      key="anchored"
      className="fixed top-0 left-0 right-0 z-[9999] isolate"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: -100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div
        className={cn(
          "flex h-16 w-full items-center justify-between px-6 md:px-12",
          "transition-all duration-300",
          isDev
            ? "backdrop-blur-[16px] bg-[rgba(10,10,15,0.85)] border-b border-white/[0.06]"
            : "backdrop-blur-[12px] bg-[rgba(10,10,10,0.9)] border-b border-[rgba(57,255,20,0.15)]",
        )}
      >
        <button
          type="button"
          onClick={() => scrollToSection("#hero")}
          className={cn(
            "font-grotesk text-sm font-semibold transition-colors",
            isDev ? "text-white hover:text-[#06b6d4]" : "text-white hover:text-[#39FF14]",
          )}
        >
          Sriram Venkatachalam
        </button>
        <div className="flex items-center gap-4 md:gap-8">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <ul className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <AnchoredNavLink
                key={link.href}
                link={link}
                isDev={isDev}
                onNavigate={scrollToSection}
              />
            ))}
          </ul>
          <ModeToggle />
        </div>
      </div>
    </motion.header>
  );

  const floatingPill = (
    <motion.div
      key="floating"
      className="fixed top-5 left-1/2 z-[9999] isolate w-fit"
      initial={{ x: "-50%", y: -100, opacity: 0 }}
      animate={{ x: "-50%", y: 0, opacity: 1 }}
      exit={{ x: "-50%", y: -100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
    >
      <div
        className={cn(
          "relative flex items-center gap-1 px-2 py-2 rounded-full",
          isDev
            ? "backdrop-blur-[20px] bg-[rgba(10,10,15,0.85)] border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(124,58,237,0.15)]"
            : "backdrop-blur-[16px] bg-[rgba(10,10,10,0.9)] border-2 border-[rgba(57,255,20,0.3)] shadow-[0_8px_32px_rgba(0,0,0,0.5),4px_4px_0px_rgba(57,255,20,0.15)]",
        )}
      >
        {isDev && (
          <div
            className="absolute inset-0 rounded-full pointer-events-none animate-glow-pulse"
            style={{
              boxShadow: "0 0 0 1px rgba(124,58,237,0.2)",
              borderRadius: "inherit",
            }}
          />
        )}
        <button
          type="button"
          onClick={() => scrollToSection("#hero")}
          className={cn(
            "w-7 h-7 flex items-center justify-center font-mono text-xs font-bold flex-shrink-0",
            isDev
              ? "rounded-full bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] text-white hover:scale-110 transition-transform duration-200"
              : "border-2 border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14] hover:text-black transition-all duration-150",
          )}
        >
          S
        </button>
        <div
          className={cn(
            "w-px h-4 mx-1 flex-shrink-0",
            isDev ? "bg-white/10" : "bg-[#39FF14]/20",
          )}
        />
        <div className="hidden items-center gap-0 md:flex">
          {navLinks.map((link) => (
            <NavLinkPill
              key={link.href}
              link={link}
              isActive={activeSection === link.href.replace("#", "")}
              isDev={isDev}
              onNavigate={scrollToSection}
            />
          ))}
        </div>
        <div
          className={cn(
            "w-px h-4 mx-1 flex-shrink-0",
            isDev ? "bg-white/10" : "bg-[#39FF14]/20",
          )}
        />
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-1.5 text-white/60 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="scale-90 origin-center flex-shrink-0">
          <ModeToggle />
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {scrolled ? floatingPill : anchoredHeader}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9998] bg-[#0a0a0f]/95 backdrop-blur-xl"
          >
            <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-6">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
              {navLinks.map((link) => (
                <MobileNavLink
                  key={link.href}
                  link={link}
                  isDev={isDev}
                  onNavigate={handleNavClick}
                />
              ))}
              <div className="mt-4">
                <ModeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
