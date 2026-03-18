"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useModeStore } from "@/store";
import { ContactDevMode } from "./ContactDevMode";
import { ContactDesignMode } from "./ContactDesignMode";

export default function Contact() {
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
          <ContactDevMode />
        </motion.div>
      ) : (
        <motion.div
          key="design-contact"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ContactDesignMode />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
