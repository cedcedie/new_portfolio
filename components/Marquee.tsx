"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Infinite transform-only translateX loop with duplicated content.
 * Under reduced motion the track simply sits still.
 */
export default function Marquee({
  duration,
  children,
  className,
  style,
}: {
  duration: number;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduced = useReducedMotion();

  return (
    <div style={{ overflow: "hidden", ...style }} className={className}>
      <div
        className="marquee-track"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationPlayState: reduced ? "paused" : "running",
          } as React.CSSProperties
        }
      >
        <div style={{ display: "flex", alignItems: "center" }}>{children}</div>
        <div style={{ display: "flex", alignItems: "center" }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
