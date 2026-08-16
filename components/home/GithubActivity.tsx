"use client";

import Reveal from "@/components/Reveal";
import { GITHUB_URL } from "@/lib/data";

const mono = "var(--font-geist-mono), monospace";
const serif: React.CSSProperties = {
  fontFamily: "var(--font-instrument-serif), serif",
  fontStyle: "italic",
  fontWeight: 400,
};

const USER = "cedcedie";

/**
 * GitHub contribution graph.
 *
 * Rendered via ghchart, which returns a static SVG of the real contribution
 * calendar — no API token, no client fetch, no rate limit. Tinted to the site
 * accent rather than GitHub green so it reads as part of the page.
 */
export default function GithubActivity() {
  return (
    <section id="github" style={{ padding: "160px 0 0" }}>
      <Reveal
        delay={0}
        className="gh-head"
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 22,
          borderTop: "1px solid rgba(255,255,255,.09)",
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
          (04)
        </span>
        <h2
          style={{
            margin: 0,
            fontWeight: 600,
            fontSize: "clamp(36px,4.8vw,62px)",
            letterSpacing: "-.03em",
          }}
        >
          Always <span style={serif}>building</span>
        </h2>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="link-muted"
          style={{
            marginLeft: "auto",
            fontFamily: mono,
            fontSize: 11,
            letterSpacing: ".16em",
            color: "#9296a3",
          }}
        >
          @{USER} ↗
        </a>
      </Reveal>

      <Reveal delay={80} className="gh-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://ghchart.rshah.org/4353ff/${USER}`}
          alt={`GitHub contribution graph for @${USER}`}
          loading="lazy"
          className="gh-chart"
        />
        <div className="gh-legend">
          <span>CONTRIBUTIONS — LAST 12 MONTHS</span>
          <span className="gh-scale">
            LESS
            <i style={{ background: "rgba(67,83,255,.14)" }} />
            <i style={{ background: "rgba(67,83,255,.38)" }} />
            <i style={{ background: "rgba(67,83,255,.64)" }} />
            <i style={{ background: "#4353ff" }} />
            MORE
          </span>
        </div>
      </Reveal>
    </section>
  );
}
