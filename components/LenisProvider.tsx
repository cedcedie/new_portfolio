"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide eased scroll (the "glide" feel — https://www.seikodesigns.com/
 * was the reference). Previously the codebase deliberately had NO global
 * smooth-scroll (see the old comment this replaces in globals.css) because
 * native `scroll-behavior: smooth` queued 2-3 steps per wheel tick and kept
 * resolving them after ScrollTrigger's pin on Selected Work had already
 * released, reading as the page snapping back up by one step.
 *
 * Lenis avoids that failure mode specifically: it doesn't queue browser
 * "smooth scroll" steps at all — it drives `window.scrollTo` itself, every
 * frame, off GSAP's own ticker, and ScrollTrigger is told to recompute
 * (`ScrollTrigger.update()`) on every one of those frames. So there is
 * exactly one source of truth for scroll position and exactly one
 * animation frame loop (GSAP's), instead of two independent ones (native
 * smooth-scroll's browser-internal interpolation + ScrollTrigger's rAF)
 * racing each other. This is Studio Freight/Lenis's own documented
 * integration pattern for GSAP, not a bespoke workaround.
 *
 * `lagSmoothing(0)` on the GSAP ticker turns off GSAP's own frame-time
 * smoothing, which otherwise very slightly disagrees with Lenis's easing
 * and shows up as a soft judder on fast scrolls.
 */
export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return; // native scroll stays untouched — no eased lag to fight focus/reading.

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // easeOutCubic — quick settle, not floaty
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Named so cleanup removes the exact same function reference — an
    // inline arrow passed to both add() and remove() are two different
    // functions and remove() would silently no-op, leaving this rAF loop
    // running (and lenis.raf'd against a destroyed instance) after unmount.
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
