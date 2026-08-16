"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Translates its child toward the cursor (x ×0.18, y ×0.3) and springs back
 * on leave. Desktop pointer:fine only, disabled under reduced motion.
 */
export default function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const wrap = ref.current;
    const el = wrap?.firstElementChild as HTMLElement | undefined;
    if (!el || reduced || !window.matchMedia("(pointer:fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${
        (e.clientX - r.left - r.width / 2) * 0.18
      }px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.style.transform = "";
    };
  }, [reduced]);

  return (
    <span ref={ref} style={{ display: "contents" }}>
      {children}
    </span>
  );
}
