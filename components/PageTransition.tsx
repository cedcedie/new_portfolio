"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

type TransitionState = "idle" | "covering" | "covered" | "revealing";

interface TransitionContextValue {
  navigate: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

/**
 * Curtain wipe between routes: a near-black panel covers the screen, the
 * route swaps underneath it (out of view), then it lifts to reveal the new
 * page — instead of the instant cut plain client-side navigation gives you.
 *
 * Deliberately not a whole-page opacity fade on the content itself (that
 * was tried once already — see SiteChrome's history — and it visibly raced
 * each page's own GSAP entrance animation, since both animated the same
 * visible content's opacity at once). The curtain is a separate, opaque,
 * full-screen layer: the new page's own entrance can start and even finish
 * underneath it while it's still covering the screen, so there's nothing
 * for it to race — by the time the curtain lifts, the content underneath
 * is just... there, already settled or settling on its own schedule.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<TransitionState>("idle");
  // The pathname a `navigate()` call is targeting — compared against the
  // real pathname once it updates, so the curtain only starts lifting once
  // the route has genuinely changed under it, not on a fixed timer that
  // could reveal the old page if navigation was slower than expected.
  const targetPathname = useRef<string | null>(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const navigate = useCallback(
    (href: string) => {
      if (reducedRef.current || href === pathname) {
        router.push(href);
        return;
      }
      targetPathname.current = href;
      setState("covering");
    },
    [pathname, router],
  );

  // Cover animation's own onAnimationEnd (below) flips state to "covered"
  // and pushes the route at that moment — full opaque cover, then swap,
  // exactly like a stage curtain closing before the set changes.
  const onCoverEnd = useCallback(() => {
    setState("covered");
    if (targetPathname.current) router.push(targetPathname.current);
  }, [router]);

  // Once the real route has caught up to the target, start lifting.
  useEffect(() => {
    if (state === "covered" && pathname === targetPathname.current) {
      targetPathname.current = null;
      // One frame so the new page's first paint (and the start of its own
      // entrance animation) happens while still fully covered, not exposed
      // mid-lift.
      const raf = requestAnimationFrame(() => setState("revealing"));
      return () => cancelAnimationFrame(raf);
    }
  }, [state, pathname]);

  const onRevealEnd = useCallback(() => {
    setState("idle");
  }, []);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        aria-hidden="true"
        className="pt-curtain"
        data-state={state}
        onAnimationEnd={(e) => {
          if (e.animationName === "pt-cover") onCoverEnd();
          if (e.animationName === "pt-reveal") onRevealEnd();
        }}
      />
    </TransitionContext.Provider>
  );
}

/** Falls back to a plain push if used outside the provider (shouldn't
 *  happen — SiteChrome always wraps the tree — but keeps callers safe). */
export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  const router = useRouter();
  if (!ctx) return { navigate: (href: string) => router.push(href) };
  return ctx;
}
