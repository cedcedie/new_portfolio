"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Magnetic from "@/components/Magnetic";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { EMAIL } from "@/lib/data";

const serif: React.CSSProperties = {
  fontFamily: "var(--font-instrument-serif), serif",
  fontStyle: "italic",
  fontWeight: 400,
};

/** Asia/Manila HH:mm, refreshed every 30s. */
function useManilaClock() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Manila",
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/**
 * Editorial poster hero: the portrait sits centre-column and the name is set
 * in stacked lines that interlock with it — CYDRIC above the head, JAMES
 * behind it, BULAN cutting across the chest as an outline. Type and image are
 * one composition rather than two panels side by side.
 */
export default function Hero() {
  const clock = useManilaClock();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    // Read the media query directly, once, instead of through
    // useReducedMotion() — that hook starts `true` as a safe placeholder
    // until the real value resolves (every *other* consumer wants that: skip
    // motion rather than flash it), but here it meant this effect ran once
    // for the placeholder `true` — releasing the CSS-hidden state and
    // revealing the hero — and again moments later for the real value,
    // which built the GSAP timeline and yanked everything back to hidden
    // before animating it in, reading as a double reveal on every load.
    // Reading the query directly skips the placeholder entirely.
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      // No motion at all: release the CSS-hidden state straight away, since
      // no tween is coming to take over from it.
      el.classList.add("is-ready");
      return;
    }

    // gsap.context's own mount/cleanup contract is what StrictMode's dev-only
    // double-invoke (mount, cleanup, remount) is designed to exercise safely:
    // the phantom mount's ctx.revert() puts every element back at its tween's
    // "from" state, and the real mount then builds a fresh context and plays
    // it again from there — cleanly, because both the build and the release
    // of the CSS-hidden gate happen inside the same synchronous pass every
    // time. A `played` guard here defeats that contract: with the timeline
    // build ever deferred (e.g. behind requestAnimationFrame), the guard
    // trips on the phantom mount before its deferred work has a chance to
    // run, so when cleanup cancels that work the real mount finds the guard
    // already set and never tries again — the name never reveals at all.
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        ".pz-eyebrow > *",
        { yPercent: 130, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.06 },
        0,
      )
        // The portrait scales up from slightly small as the type lands.
        .fromTo(
          ".pz-portrait",
          { scale: 1.08, opacity: 0, filter: "blur(14px)" },
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.4 },
          "-=0.7",
        )
        .fromTo(
          ".pz-char",
          // yPercent on elements that only just mounted this same tick is
          // unreliable — GSAP occasionally caches the percent-to-pixel
          // conversion against stale (pre-layout) geometry and never
          // reconciles it, so the tween reports finishing at yPercent 0 while
          // the DOM is still sitting at its yPercent 118 "from" pixel value:
          // the name silently fails to reveal. A function value forces GSAP
          // to read each char's real, post-layout height itself and animate
          // in pixels instead, which carries no such cache.
          { y: (_i, target) => target.getBoundingClientRect().height * 1.18 },
          { y: 0, duration: 1.15, stagger: 0.03 },
          "-=1.15",
        )
        .fromTo(
          ".pz-fade",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, stagger: 0.08 },
          "-=0.8",
        );
    }, root);

    el.classList.add("is-ready");

    return () => ctx.revert();
  }, []);

  const chars = (word: string) =>
    word.split("").map((c, i) => (
      <span key={`${word}-${i}`} className="pz-char">
        {c}
      </span>
    ));

  return (
    <header ref={root} className="pz" aria-label="Cydric James Bulan">
      {/* One status item left, one place/time right. The role is already
          stated by the lede below, so it isn't repeated here. */}
      <div className="pz-eyebrow">
        <span>
          <span className="pz-dot" />
          Available for work
        </span>
        <span>
          Bulacan, PH — <span suppressHydrationWarning>{clock}</span>
        </span>
      </div>

      {/* Poster block: type and portrait share one stacking context. */}
      <div className="pz-stage">
        <h1 className="pz-name">
          <span className="pz-row pz-row-1" aria-hidden="true">
            {chars("Cydric")}
          </span>
          <span className="pz-row pz-row-2" aria-hidden="true">
            {chars("James")}
          </span>
          <span className="pz-row pz-row-3" aria-hidden="true">
            {chars("Bulan")}
          </span>
          <span className="sr-only">Cydric James Bulan</span>
        </h1>

        <div className="pz-portrait">
          <Image
            src="/profile-cutout.png"
            alt="Cydric James Bulan"
            width={500}
            height={500}
            priority
            sizes="(max-width: 900px) 74vw, 460px"
          />
        </div>
      </div>

      <div className="pz-foot">
        <p className="pz-lede pz-fade">
          Full-stack web apps, mobile products and{" "}
          <span style={{ ...serif, color: "#eaeaf0" }}>2D games</span> — built
          for classrooms, courtrooms and cafes.
        </p>

        {/* Two actions, no more. GitHub lives in its own section further down;
            the resume is in the command palette and the contact block. The
            primary action carries the motion (Magic UI's shimmer runs on a
            loop, not just on hover); the secondary stays quiet on purpose. */}
        <div className="pz-actions pz-fade">
          <ShimmerButton
            as={Link}
            href="/projects"
            background="#4353ff"
            shimmerColor="#eaeaf0"
            shimmerDuration="2.6s"
            borderRadius="999px"
            className="pz-cta-shimmer"
          >
            See projects <span aria-hidden="true">→</span>
          </ShimmerButton>
          <Magnetic>
            <a href={`mailto:${EMAIL}`} className="pz-cta pz-cta-ghost">
              Get in touch
            </a>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}
