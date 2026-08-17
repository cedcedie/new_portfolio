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
  // StrictMode (dev only) mounts, cleans up, and remounts every effect once;
  // gsap.context's cleanup reverts the timeline mid-flight, so without this
  // guard the intro replays from the top on the second mount — the whole
  // hero appears to animate in twice on a single load. The timeline should
  // only ever run for the mount that sticks.
  const played = useRef(false);

  useEffect(() => {
    const el = root.current;
    if (!el || played.current) return;
    played.current = true;

    // Read the media query directly, once, instead of through
    // useReducedMotion() — that hook starts `true` as a safe placeholder
    // until the real value resolves (every *other* consumer wants that: skip
    // motion rather than flash it), but here it meant this effect ran once
    // for the placeholder `true` — releasing the CSS-hidden state and
    // revealing the hero — and again moments later for the real value,
    // which built the GSAP timeline and yanked everything back to hidden
    // before animating it in. One real replay per load, not a StrictMode
    // artifact. Reading the query directly skips the placeholder entirely.
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      // No motion at all: release the CSS-hidden state straight away, since
      // no tween is coming to take over from it.
      el.classList.add("is-ready");
      return;
    }

    // Order matters: build the timeline (its `fromTo` calls set every
    // element's "from" values synchronously) before releasing the CSS
    // `.pz:not(.is-ready)` hidden rule — releasing it first left a one-frame
    // (longer under dev-mode's slower JS execution) window where everything
    // sat at its natural, fully-visible resting state before GSAP yanked it
    // back to hidden and animated it in, reading as a double reveal.
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
          { yPercent: 118 },
          { yPercent: 0, duration: 1.15, stagger: 0.03 },
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
    // Runs once (guarded by `played`) — no reactive dependency on the
    // reduced-motion preference, which is read directly above instead.
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
