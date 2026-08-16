"use client";

import { useEffect, useRef } from "react";

/** 2px accent bar fixed at the very top, scaleX driven by scroll position. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let busy = false;
    const onScroll = () => {
      if (busy) return;
      busy = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        if (ref.current) {
          ref.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
        }
        busy = false;
      });
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 60,
        background: "#4353ff",
        transform: "scaleX(0)",
        transformOrigin: "left",
        pointerEvents: "none",
      }}
    />
  );
}
