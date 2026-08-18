"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

/**
 * Shared intro for the Work and Credentials index pages: an eyebrow row, a
 * big two-word headline, and a lede paragraph, revealed as one choreographed
 * gesture instead of three independently-timed CSS animations.
 *
 * The previous version gave each of the three elements its own `animation:
 * rise …` with a hand-picked duration and delay — 0.7s/0s, 0.9s/0.1s,
 * 0.9s/0.22s — so they finished at three different moments (0.7s, 1.0s,
 * 1.12s) and read as separate pops rather than one reveal. One GSAP
 * timeline with a tight, overlapping stagger reads as a single wave, the
 * same pattern the homepage Hero already uses successfully.
 *
 * No hairline under the eyebrow row — the big headline right below it
 * already reads as "new page" on its own; the rule was excess weight
 * competing with it for attention (see the equivalent fix already made to
 * the section headers below this one).
 */
export default function IndexHeader({
  eyebrowLeft,
  eyebrowRight,
  headline,
  lede,
}: {
  eyebrowLeft: ReactNode;
  eyebrowRight: ReactNode;
  headline: ReactNode;
  lede: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    // No `played` guard: gsap.context's own mount/cleanup contract is what
    // StrictMode's dev-only double-invoke (mount, cleanup, remount) is
    // designed to exercise safely — the phantom mount's ctx.revert() puts
    // every element back at its tween's "from" state, and the real mount
    // then builds a fresh context and plays it again from there, cleanly,
    // because the timeline build and the is-ready release happen inside the
    // same synchronous pass every time. A `played` guard (as Hero's own
    // version had, before this exact fix) defeats that contract: it trips
    // on the phantom mount, so when the phantom's cleanup reverts the
    // timeline the real mount finds the guard already set and never
    // rebuilds it — elements are left stuck mid-reveal instead of settled.
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      el.classList.add("is-ready");
      return;
    }

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(
          ".idx-eyebrow",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          0,
        )
        .fromTo(
          ".idx-headline",
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75 },
          0.08,
        )
        .fromTo(
          ".idx-lede",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65 },
          0.2,
        );
    }, root);

    el.classList.add("is-ready");

    return () => ctx.revert();
  }, []);

  return (
    <header ref={root} className="idx-header" style={{ marginBottom: 100 }}>
      <div className="idx-eyebrow">
        <span>{eyebrowLeft}</span>
        <span>{eyebrowRight}</span>
      </div>
      <h1 className="idx-headline">{headline}</h1>
      <p className="idx-lede">{lede}</p>
    </header>
  );
}
