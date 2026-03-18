"use client";

import { motion } from "framer-motion";
import { ContactCard } from "./ContactCard";
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
      className="relative bg-design py-24 px-6 lg:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 line-grid opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#39FF14]/30" />

      <div
        className="absolute bottom-0 left-0 right-0 h-32
                    bg-gradient-to-t from-[#0a0a0a] to-transparent
                    pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="mb-12 text-center"
        >
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
        </motion.div>

        <div className="columns-1 md:columns-3 gap-6 max-w-3xl mx-auto space-y-6">
          {contactLinks.map((link, index) => (
            <div key={link.id} className="break-inside-avoid">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
              >
                <ContactCard link={link} mode="designer" />
              </motion.div>
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center font-mono text-xs text-white/20 mt-16"
        >
          Built with Next.js · Designed & developed by {meta.name}
        </motion.p>
      </div>
    </section>
  );
}
