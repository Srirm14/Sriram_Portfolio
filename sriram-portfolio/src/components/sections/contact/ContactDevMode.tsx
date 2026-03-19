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
      className="ld-section-ambient ld-section-ambient--contact relative overflow-hidden bg-dev px-4 py-14 md:px-6 md:py-24 lg:px-12"
      style={{ willChange: "transform" }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 dot-grid opacity-20" />

      <div
        className="contact-bottom-fade pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-32 bg-gradient-to-t from-[#0a0a0b] to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <ScrollReveal variant="blur-in" className="mb-8 text-center md:mb-12">
          <p className="ld-section-eyebrow mb-3 font-mono text-xs uppercase tracking-widest">
            05 — Contact
          </p>
          <h2 className="section-heading-dev">
            Let&apos;s <span className="text-gradient-dev">Connect</span>
          </h2>
          <p className="ld-section-lede mx-auto mt-3 max-w-md text-sm">
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
          className="ld-section-footer mt-16 text-center font-mono text-xs"
        >
          Built with Next.js · Designed & developed by {meta.name}
        </ScrollReveal>
      </div>
    </section>
  );
}
