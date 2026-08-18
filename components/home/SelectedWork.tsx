"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { allProjects, featured } from "@/lib/data";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const mono = "var(--font-geist-mono), monospace";

const covers = featured.map(
  (f) => allProjects.find((p) => p.slug === f.slug)?.cover ?? "",
);

/**
 * Pinned showcase: the laptop holds the viewport while scrolling advances
 * through the featured projects. Each project gets one screen-height of
 * scroll, so the swap reads as a deliberate step rather than a crossfade you
 * scroll past.
 */
export default function SelectedWork() {
  const [ws, setWs] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    // Must match the CSS breakpoint exactly: portrait-ish screens use the
    // stacked, unpinned layout. A width-only test also caught zoomed-in
    // desktops, which are landscape and should stay pinned.
    const stacked = window.matchMedia(
      "(max-width: 900px) and (max-aspect-ratio: 1/1)",
    ).matches;
    if (reduced || stacked) {
      // Each .sw-step is a short fixed-height (32vh, see globals.css)
      // scroll-runway — just enough distance for its ScrollTrigger to
      // reliably cross the 60%-viewport line once, not tied to the sticky
      // card's own (much taller) rendered size. Tying it to the card's
      // height read as a long, mostly-empty "endless" scroll before Contact.
      const els = gsap.utils.toArray<HTMLElement>(".sw-step", section);
      const ts = els.map((el, i) =>
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          onEnter: () => setWs(i),
          onEnterBack: () => setWs(i),
        }),
      );
      return () => ts.forEach((t) => t.kill());
    }

    const steps = featured.length;

    // One pin, one scrubbed timeline. The first fifth zooms the machine up
    // and fades the heading out; the rest holds full-size and steps through
    // the projects. Two separate pins on the same element would fight.
    const ZOOM = 0.9; // viewports of scroll spent on the zoom
    const total = ZOOM + steps;

    const ctx = gsap.context(() => {
      // The pin engages the instant #work's top hits the viewport top — a
      // deterministic lock, not a gradual cross-fade, which is how every
      // pinned-scroll section works. That's correct, but arriving at it
      // with Experience's own text still fully legible (it only leaves the
      // viewport naturally, at whatever pace the scroll happens to be
      // going) made the handoff read as an abrupt cut once the pin locked
      // and the zoom took over mid-scroll. Fading Experience out over the
      // approach — scrubbed to the same scroll distance, so it's tied to
      // position, not time — means it's already gone by the moment the pin
      // engages, softening the handoff without changing the pin itself.
      const experience = document.getElementById("experience");
      if (experience) {
        gsap.fromTo(
          experience,
          { opacity: 1 },
          {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          },
        );
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * total}`,
          scrub: 0.6,
          pin,
          pinSpacing: true,
          onUpdate: (self) => {
            // Project index only advances after the zoom completes.
            const p = (self.progress * total - ZOOM) / steps;
            if (p < 0) return setWs(0);
            const i = Math.min(steps - 1, Math.floor(p * steps));
            setWs((prev) => (prev === i ? prev : i));
          },
        },
      });

      const zoomShare = ZOOM / total;

      // Opens from a small but readable card rather than a speck: at near-zero
      // the machine spent the first stretch as an unrecognisable dark rectangle
      // in empty space. `power2.out` front-loads the growth so it reaches a
      // legible size fast, then eases into place.
      tl.fromTo(
        ".sw-lap .lap",
        { scale: 0.34, y: "4%", opacity: 0.55 },
        {
          scale: 1,
          y: "0%",
          opacity: 1,
          ease: "power2.out",
          duration: zoomShare,
        },
        0,
      )
        // Holds while the machine is still small, then clears out of its way.
        .fromTo(
          ".sw-head",
          { opacity: 1, y: 0 },
          { opacity: 0, y: -28, ease: "none", duration: zoomShare * 0.55 },
          zoomShare * 0.3,
        )
        .fromTo(
          ".sw-info",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: "none", duration: zoomShare * 0.45 },
          zoomShare * 0.55,
        )
        // Hold the finished state for the stepping phase.
        .to({}, { duration: 1 - zoomShare });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  const active = featured[ws] ?? featured[0];
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    /* No top padding here: it would sit inside the pinned stage and push the
       description past the bottom of the viewport. */
    <section id="work" ref={sectionRef}>
      {/* Everything lives inside the pin: the heading stays put while the
          machine and its description swap beneath it. */}
      <div ref={pinRef} className="sw-stage">
        <div className="sec-head sw-head">
          <span
            style={{
              fontFamily: mono,
              fontSize: 11,
              letterSpacing: ".1em",
              color: "#6672ff",
            }}
          >
            (06)
          </span>
          <h2
            style={{
              margin: 0,
              fontWeight: 600,
              fontSize: "clamp(28px,3.6vw,48px)",
              letterSpacing: "-.03em",
            }}
          >
            Selected{" "}
            <span
              style={{
                fontFamily: "var(--font-instrument-serif), serif",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              work
            </span>
          </h2>
          <Link
            href="/projects"
            className="link-muted"
            style={{
              marginLeft: "auto",
              fontFamily: mono,
              fontSize: 11,
              letterSpacing: ".16em",
              color: "#9296a3",
            }}
          >
            FULL INDEX — 14 ↗
          </Link>
        </div>

        <div className="sw-lap">
          <div className="lap">
            <div className="lap-lid">
              <span className="lap-cam" aria-hidden="true" />
              <div className="lap-screen">
                {covers.map((src, i) =>
                  src ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      key={src}
                      src={src}
                      alt={
                        i === ws ? `${featured[i].title} preview` : ""
                      }
                      aria-hidden={i === ws ? undefined : true}
                      data-on={i === ws ? "true" : undefined}
                      // First screen is what the section opens on, so it must
                      // be decoded before the pin engages.
                      loading={i === 0 ? "eager" : "lazy"}
                      fetchPriority={i === 0 ? "high" : "low"}
                      decoding={i === 0 ? "sync" : "async"}
                    />
                  ) : (
                    // No cover yet (e.g. an upcoming project) — an explicit
                    // placeholder reads as "not shipped yet", not a broken
                    // image.
                    <div
                      key={featured[i].slug}
                      className="lap-screen-empty"
                      aria-hidden={i === ws ? undefined : true}
                      data-on={i === ws ? "true" : undefined}
                    >
                      <span>COMING SOON</span>
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="lap-base" aria-hidden="true">
              <span className="lap-notch" />
            </div>
          </div>
        </div>

        {/* Copy below the machine, swapping with it. */}
        <div className="sw-info">
          <div className="sw-info-rail" aria-hidden="true">
            {featured.map((f, i) => (
              <span key={f.slug} data-on={i === ws ? "true" : undefined}>
                {pad(i + 1)}
              </span>
            ))}
          </div>

          <div className="sw-info-body">
            {featured.map((f, i) => (
              <article key={f.slug} data-on={i === ws ? "true" : undefined}>
                <span className="sw-info-meta">{f.meta}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <span className="sw-info-tech">{f.techLine}</span>
              </article>
            ))}
          </div>

          <div className="sw-info-count">
            <span>{active.shots}</span>
            <span style={{ color: "#6672ff" }}>
              {pad(ws + 1)} / {pad(featured.length)}
            </span>
          </div>
        </div>
      </div>

      {/* Scroll steps for the non-pinned path (mobile / reduced motion), which
          advances the active project as they pass. Harmless when pinned. */}
      <div className="sw-steps" aria-hidden="true">
        {featured.map((f) => (
          <div key={f.slug} className="sw-step" />
        ))}
      </div>
    </section>
  );
}
