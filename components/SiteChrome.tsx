"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Nav from "./Nav";
import ScrollProgress from "./ScrollProgress";
import CommandPalette from "./CommandPalette";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Persistent chrome + 260ms route transitions (exit: fade out, rise -12px;
 * enter: fade in from below), matching the prototype's navigation fade.
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <>
      <ScrollProgress />
      <Nav />
      <CommandPalette />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 1 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.26, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
