"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Like useReducedMotion(), but frozen after its first real reading.
 *
 * useReducedMotion() starts `true` as an SSR-safe placeholder, then flips to
 * the real value once the media query resolves on the client. Consumers that
 * derive a CSS `animation` string straight from that boolean (entrance
 * "rise"/fade keyframes gated by `reduced ? undefined : "rise .9s ... both"`)
 * read `true` on the very first render — the placeholder — and skip the
 * animation, showing final content immediately; then the real value lands,
 * `reduced` flips to `false`, and the `animation` property gets freshly
 * assigned, which restarts the keyframe from scratch. The content visibly
 * flashes in, then plays its intro a second time.
 *
 * This hook returns the placeholder's `true` on the first render (so SSR and
 * the client's first paint still agree — no hydration mismatch). From the
 * render where useReducedMotion()'s value first *changes* — the real
 * preference landing — it locks that value in for good; an entrance plays
 * once, it doesn't need to keep reacting to the OS preference afterwards.
 */
export function useEntranceMotion(): boolean {
  const live = useReducedMotion();
  const [frozen, setFrozen] = useState<boolean | null>(null);
  const prevLive = useRef(live);

  useEffect(() => {
    if (frozen === null && live !== prevLive.current) {
      setFrozen(live);
    }
    prevLive.current = live;
  }, [live, frozen]);

  return frozen ?? live;
}
