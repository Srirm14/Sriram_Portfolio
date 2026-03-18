"use client";

import { motion } from "framer-motion";
import { ContactCard } from "./ContactCard";
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
      className="relative bg-dev py-24 px-6 lg:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      <div
        className="absolute bottom-0 left-0 right-0 h-32
                    bg-gradient-to-t from-[#0a0a0f] to-transparent
                    pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto items-stretch">
          {contactLinks.map((link, index) => (
            <motion.div
              key={link.id}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ContactCard link={link} mode="developer" />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center font-mono text-xs text-white/15 mt-16"
        >
          Built with Next.js · Designed & developed by {meta.name}
        </motion.p>
      </div>
    </section>
  );
}
