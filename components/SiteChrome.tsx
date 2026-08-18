"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Nav from "./Nav";
import ScrollProgress from "./ScrollProgress";
import CommandPalette from "./CommandPalette";

/**
 * Persistent chrome. No page-level route-transition fade any more — every
 * page already plays its own entrance (Hero's GSAP name/portrait/CTA
 * reveal, IndexHeader's GSAP eyebrow/headline/lede reveal), and this
 * wrapper's own Framer Motion fade/rise used to run at the same time on
 * client-side navigation: `AnimatePresence` keeps the outgoing page's exit
 * animation mounted while the incoming page is already mounting underneath
 * it, so the old page's fade-out and the new page's GSAP fade-in visibly
 * overlapped — two different opacity animations on overlapping content,
 * read as everything animating twice. `key={pathname}` still forces a full
 * remount on navigation (so each page's own entrance replays correctly);
 * it just doesn't wrap that remount in a second, competing transition.
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <ScrollProgress />
      <Nav />
      <CommandPalette />
      <div key={pathname}>{children}</div>
    </>
  );
}
