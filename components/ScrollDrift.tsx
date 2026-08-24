"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps content in a subtle velocity-reactive drift: scroll fast and the
 * content lags a few pixels behind before easing back to rest, like it has
 * a little weight to it. Purely a `transform: translateY()` on this
 * wrapper's own div — never touches scroll position, `scrollTo`, or
 * `scroll-behavior`, so it can't race the browser's native scroll timing
 * the way an actual smooth-scroll library would (see globals.css's "No
 * global smooth-scroll" note for why that specifically broke before).
 *
 * Deliberately NOT wrapped around SelectedWork's pinned section (or any
 * ancestor of it): GSAP ScrollTrigger's pin measures the DOM at pin-creation
 * time and, without an explicit `pinType`, auto-detects `fixed` vs.
 * `transform` pinning partly based on whether an ancestor is transformed.
 * Adding a transform to an ancestor of a `position: fixed`-pinned element
 * also just breaks fixed positioning outright per the CSS spec (it becomes
 * relative to the nearest transformed ancestor instead of the viewport).
 * So this wraps each drift-eligible section individually, and Selected
 * Work is never one of them.
 *
 * Also goes fully inert (skips the rAF loop entirely) while
 * `document.body.dataset.swPinned === "true"` — belt-and-suspenders in case
 * a future caller ever wraps something closer to the pin — and respects
 * prefers-reduced-motion by never applying an offset at all.
 */
export default function ScrollDrift({
  children,
  strength = 1,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    let lastY = window.scrollY;
    let lastT = performance.now();
    let velocity = 0; // px/frame, smoothed
    let offset = 0; // current applied drift, eases toward 0
    let raf = 0;

    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      const y = window.scrollY;
      const instant = ((y - lastY) / dt) * 16.67; // normalize to px/frame@60fps
      // Smooth the raw velocity so a single jumpy wheel event doesn't spike.
      velocity += (instant - velocity) * 0.35;
      lastY = y;
      lastT = now;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (document.body.dataset.swPinned === "true") {
        if (offset !== 0 || velocity !== 0) {
          offset = 0;
          velocity = 0;
          el.style.transform = "";
        }
        return;
      }
      // Velocity decays toward 0 on its own (no new scroll events keep
      // feeding it); offset chases a small multiple of velocity and eases
      // back to rest — the "drags slightly, settles" feel.
      velocity *= 0.9;
      const target = Math.max(-14, Math.min(14, -velocity * 0.6 * strength));
      offset += (target - offset) * 0.12;
      if (Math.abs(offset) < 0.05 && Math.abs(velocity) < 0.05) {
        if (offset !== 0) {
          offset = 0;
          el.style.transform = "";
        }
        return;
      }
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [strength]);

  return <div ref={ref}>{children}</div>;
}
