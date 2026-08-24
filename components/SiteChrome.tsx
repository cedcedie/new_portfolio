"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Nav from "./Nav";
import ScrollProgress from "./ScrollProgress";
import CommandPalette from "./CommandPalette";
import { PageTransitionProvider } from "./PageTransition";
import LenisProvider from "./LenisProvider";

/**
 * Persistent chrome. No page-level opacity fade on route change — every
 * page already plays its own entrance (Hero's GSAP name/portrait/CTA
 * reveal, IndexHeader's GSAP eyebrow/headline/lede reveal), and a whole-page
 * Framer Motion fade/rise here used to run at the same time on client-side
 * navigation: `AnimatePresence` kept the outgoing page's exit animation
 * mounted while the incoming page was already mounting underneath it, so
 * the old page's fade-out and the new page's GSAP fade-in visibly
 * overlapped — two different opacity animations on overlapping content,
 * read as everything animating twice.
 *
 * The curtain wipe (PageTransitionProvider) doesn't have that problem: it's
 * a separate, opaque, full-screen layer, not an opacity change on the page
 * content itself, so the new page's own entrance can play (and even
 * finish) underneath it without anything racing. `key={pathname}` still
 * forces a full remount on navigation, so each page's own entrance replays
 * correctly every time.
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <LenisProvider>
      <PageTransitionProvider>
        <ScrollProgress />
        <Nav />
        <CommandPalette />
        <div key={pathname}>{children}</div>
      </PageTransitionProvider>
    </LenisProvider>
  );
}
