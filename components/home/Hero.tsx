"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Magnetic from "@/components/Magnetic";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { EMAIL } from "@/lib/data";
import { usePageTransition } from "@/components/PageTransition";

const serif: React.CSSProperties = {
  fontFamily: "var(--font-instrument-serif), serif",
  fontStyle: "italic",
  fontWeight: 400,
};

/**
 * Editorial poster hero: the portrait sits centre-column and the name is set
 * in stacked lines that interlock with it — CYDRIC above the head, JAMES
 * behind it, BULAN cutting across the chest as an outline. Type and image are
 * one composition rather than two panels side by side.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { navigate } = usePageTransition();

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    // Read directly rather than via useReducedMotion(): that hook's
    // placeholder-then-real-value flip caused a double reveal here.
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      // No motion at all: release the CSS-hidden state straight away, since
      // no tween is coming to take over from it.
      el.classList.add("is-ready");
      return;
    }

    // No `played` guard: it would trip on StrictMode's phantom mount and
    // block the real mount from ever rebuilding the timeline. gsap.context's
    // own revert()-then-rebuild cycle already handles the double-invoke safely.
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
          // Pixel value from a function, not yPercent: on elements that just
          // mounted, GSAP can cache yPercent against stale pre-layout geometry
          // and the tween silently never resolves.
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
        <span>Available for work</span>
        <span>Bulacan, PH</span>
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
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              navigate("/projects");
            }}
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
