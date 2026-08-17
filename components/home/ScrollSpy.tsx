"use client";

import { useEffect, useState } from "react";

const mono = "var(--font-geist-mono), monospace";
const sections = [
  { id: "about", n: "01" },
  { id: "stack", n: "02" },
  { id: "stack-3d", n: "03" },
  { id: "github", n: "04" },
  { id: "experience", n: "05" },
  { id: "work", n: "06" },
  { id: "contact", n: "07" },
];

/** Fixed right-edge 01–05 anchors; active one goes accent. ≥1200px only. */
export default function ScrollSpy() {
  const [wide, setWide] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const setter = () => setWide(innerWidth >= 1200);
    setter();
    addEventListener("resize", setter);
    return () => removeEventListener("resize", setter);
  }, []);

  useEffect(() => {
    if (!wide) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id);
        }),
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [wide]);

  if (!wide) return null;

  return (
    <div
      style={{
        position: "fixed",
        right: 26,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 55,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "flex-end",
      }}
    >
      {sections.map((s) => {
        const on = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={(e) => {
              // No global smooth-scroll (it fights SelectedWork's pinned
              // scrub — see globals.css); animate this one jump instead.
              e.preventDefault();
              document
                .getElementById(s.id)
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            style={{
              fontFamily: mono,
              fontSize: 10,
              letterSpacing: ".12em",
              color: on ? "#6672ff" : "#575c6b",
              fontWeight: on ? 500 : 400,
            }}
          >
            {s.n}
          </a>
        );
      })}
    </div>
  );
}
