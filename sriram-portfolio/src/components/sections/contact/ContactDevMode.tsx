"use client";

import { ContactCard } from "./ContactCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerChildren } from "@/components/ui/StaggerChildren";
import type { ContactLink } from "./ContactData";
import type { getMeta } from "@/lib/data";

interface ContactDevModeProps {
  contactLinks: ContactLink[];
  meta: ReturnType<typeof getMeta>;
}

export function ContactDevMode({ contactLinks, meta }: ContactDevModeProps) {
  return (
    <section
      id="contact"
      className="relative bg-dev py-14 md:py-24 px-4 md:px-6 lg:px-12 overflow-hidden"
      style={{ willChange: "transform" }}
    >
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      <div
        className="absolute bottom-0 left-0 right-0 h-32
                    bg-gradient-to-t from-[#0a0a0f] to-transparent
                    pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <ScrollReveal variant="blur-in" className="mb-8 md:mb-12 text-center">
          <p className="font-mono text-xs text-[#7c3aed] uppercase tracking-widest mb-3">
            05 — Contact
          </p>
          <h2 className="section-heading-dev">
            Let&apos;s <span className="text-gradient-dev">Connect</span>
          </h2>
          <p className="font-poppins text-white/40 text-sm mt-3 max-w-md mx-auto">
            Open to senior frontend roles in Bengaluru or remote. Hover a card
            to open or copy.
          </p>
        </ScrollReveal>

        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-3xl mx-auto items-stretch"
          staggerDelay={0.15}
          childClassName="h-full"
        >
          {contactLinks.map((link) => (
            <ContactCard key={link.id} link={link} mode="developer" />
          ))}
        </StaggerChildren>

        <ScrollReveal
          variant="fade-up"
          delay={0.5}
          className="text-center font-mono text-xs text-white/15 mt-16"
        >
          Built with Next.js · Designed & developed by {meta.name}
        </ScrollReveal>
      </div>
    </section>
  );
}
