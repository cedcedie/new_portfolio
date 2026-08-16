"use client";

import Reveal from "@/components/Reveal";
import StackMarquee3D from "@/components/home/StackMarquee3D";

const mono = "var(--font-geist-mono), monospace";
const serif: React.CSSProperties = {
  fontFamily: "var(--font-instrument-serif), serif",
  fontStyle: "italic",
  fontWeight: 400,
};

/**
 * Tech stack — the Magic UI 3D marquee as the section's subject rather than
 * background. Full-bleed band so the tilted grid has room to read.
 */
export default function TechStack() {
  return (
    <section id="stack-3d" style={{ padding: "160px 0 0" }}>
      <Reveal
        delay={0}
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 22,
          paddingTop: 22,
          marginBottom: 44,
        }}
      >
        <span
          style={{
            fontFamily: mono,
            fontSize: 11,
            letterSpacing: ".1em",
            color: "#6672ff",
          }}
        >
          (03)
        </span>
        <h2
          style={{
            margin: 0,
            fontWeight: 600,
            fontSize: "clamp(36px,4.8vw,62px)",
            letterSpacing: "-.03em",
          }}
        >
          Tech <span style={serif}>stack</span>
        </h2>
        <span
          style={{
            marginLeft: "auto",
            fontFamily: mono,
            fontSize: 11,
            letterSpacing: ".16em",
            color: "#575c6b",
          }}
        >
          18 TOOLS
        </span>
      </Reveal>

      {/* Full-bleed: escape the 40px container padding. */}
      <Reveal
        delay={80}
        style={{
          position: "relative",
          height: "clamp(380px,52vw,560px)",
          margin: "0 calc(50% - 50vw)",
          overflow: "hidden",
        }}
      >
        <StackMarquee3D />
      </Reveal>
    </section>
  );
}
