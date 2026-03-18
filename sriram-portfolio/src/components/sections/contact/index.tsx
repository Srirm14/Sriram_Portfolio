"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useModeStore } from "@/store";
import { ContactDevMode } from "./ContactDevMode";
import { ContactDesignMode } from "./ContactDesignMode";
import type { ContactLink } from "./ContactData";
import type { getMeta } from "@/lib/data";

interface ContactProps {
  contactLinks: ContactLink[];
  meta: ReturnType<typeof getMeta>;
}

export default function Contact({ contactLinks, meta }: ContactProps) {
  const mode = useModeStore((s) => s.mode);

  return (
    <AnimatePresence mode="wait">
      {mode === "developer" ? (
        <motion.div
          key="dev-contact"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ContactDevMode contactLinks={contactLinks} meta={meta} />
        </motion.div>
      ) : (
        <motion.div
          key="design-contact"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ContactDesignMode contactLinks={contactLinks} meta={meta} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
