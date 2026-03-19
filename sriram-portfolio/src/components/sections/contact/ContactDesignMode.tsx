"use client";

import { ContactCard } from "./ContactCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerChildren } from "@/components/ui/StaggerChildren";
import type { ContactLink } from "./ContactData";
import type { getMeta } from "@/lib/data";

interface ContactDesignModeProps {
  contactLinks: ContactLink[];
  meta: ReturnType<typeof getMeta>;
}

export function ContactDesignMode({
  contactLinks,
  meta,
}: ContactDesignModeProps) {
  return (
    <section
      id="contact"
      className="relative bg-design py-14 md:py-24 px-4 md:px-6 lg:px-12 overflow-hidden"
      style={{ willChange: "transform" }}
    >
      <div className="absolute inset-0 line-grid opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#39FF14]/30" />

      <div
        className="absolute bottom-0 left-0 right-0 h-32
                    bg-gradient-to-t from-[#0a0a0a] to-transparent
                    pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <ScrollReveal variant="blur-in" className="mb-12 text-center">
          <p className="font-mono text-xs text-[#39FF14]/60 uppercase tracking-widest mb-3">
            05 — Contact
          </p>
          <h2 className="section-heading-design text-white">
            LET&apos;S{" "}
            <span className="text-[#39FF14]">CONNECT</span>
          </h2>
          <div className="w-24 h-1 bg-[#39FF14] mt-4 mx-auto" />
          <p className="font-poppins text-white/40 text-sm mt-4 max-w-md mx-auto">
            Open to senior frontend roles in Bengaluru or remote. Hover a card
            to open or copy.
          </p>
        </ScrollReveal>

        <StaggerChildren
          className="columns-1 md:columns-3 gap-4 md:gap-6 max-w-3xl mx-auto space-y-4 md:space-y-6"
          staggerDelay={0.15}
          childClassName="break-inside-avoid"
        >
          {contactLinks.map((link) => (
            <ContactCard key={link.id} link={link} mode="designer" />
          ))}
        </StaggerChildren>

        <ScrollReveal
          variant="fade-up"
          delay={0.5}
          className="text-center font-mono text-xs text-white/20 mt-16"
        >
          Built with Next.js · Designed & developed by {meta.name}
        </ScrollReveal>
      </div>
    </section>
  );
}
