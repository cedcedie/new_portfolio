"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { BorderBeam } from "@/components/magicui/border-beam";
import { certificates, type Certificate } from "@/lib/data";
import { useEntranceMotion } from "@/lib/useEntranceMotion";

const mono = "var(--font-geist-mono), monospace";
const hairline = "1px solid rgba(255,255,255,.08)";

/**
 * Same row anatomy as ProjectsIndex's ProjectRow — index chip, a square
 * tile, title + secondary line, meta on the right — so Work and Credentials
 * read as one system rather than a list page and a table page. Certificates
 * have no screenshots, so the tile carries the issuer's initial instead of
 * a cover image; everything else (hover shift, hover BorderBeam, hairline
 * rhythm) matches exactly.
 */
function CertificateRow({
  cert,
  index,
  delay,
  isLast,
}: {
  cert: Certificate;
  index: number;
  delay: number;
  isLast: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal
      delay={delay}
      className="row-shift"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 26,
        borderTop: hairline,
        borderBottom: isLast ? hairline : undefined,
        padding: "36px 0",
      }}
    >
      <span
        style={{
          flex: "0 0 44px",
          fontFamily: mono,
          fontSize: 12,
          color: "#575c6b",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-hidden="true"
        style={{
          position: "relative",
          flex: "0 0 168px",
          aspectRatio: "16/10",
          border: "1px solid rgba(255,255,255,.09)",
          borderRadius: 2,
          overflow: "hidden",
          background: "#0d0e14",
          display: "grid",
          placeItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-instrument-serif), serif",
            fontStyle: "italic",
            fontSize: 34,
            color: "#575c6b",
          }}
        >
          {cert.issuer.charAt(0)}
        </span>
        {hovered && (
          <BorderBeam
            size={60}
            duration={4}
            colorFrom="#4353ff"
            colorTo="#8b95ff"
          />
        )}
      </div>
      <div
        style={{
          flex: "1 1 340px",
          display: "flex",
          flexDirection: "column",
          gap: 7,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontWeight: 600,
            fontSize: "clamp(22px,3vw,38px)",
            letterSpacing: "-.025em",
            lineHeight: 1.08,
          }}
        >
          {cert.title}
        </h3>
        <span
          style={{
            color: "#9296a3",
            fontSize: 14.5,
            fontFamily: "var(--font-instrument-serif), serif",
            fontStyle: "italic",
          }}
        >
          {cert.issuer}
        </span>
      </div>
      <span
        style={{
          marginLeft: "auto",
          fontFamily: mono,
          fontSize: 10.5,
          letterSpacing: ".14em",
          color: "#575c6b",
          alignSelf: "flex-start",
          paddingTop: 4,
        }}
      >
        {cert.year}
      </span>
    </Reveal>
  );
}

export default function CertificatesIndex() {
  const reduced = useEntranceMotion();

  return (
    <main
      style={{ maxWidth: 1360, margin: "0 auto", padding: "160px 40px 60px" }}
    >
      <header style={{ marginBottom: 100 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 24,
            fontFamily: mono,
            fontSize: 11,
            letterSpacing: ".16em",
            color: "#575c6b",
            borderBottom: hairline,
            paddingBottom: 18,
            animation: reduced
              ? undefined
              : "rise .7s cubic-bezier(.16,1,.3,1) both",
          }}
        >
          <span>/CREDENTIALS</span>
          <span>
            <NumberTicker value={7} /> CERTIFICATIONS · 2023 — 2026
          </span>
        </div>
        <h1
          style={{
            margin: "40px 0 0",
            fontWeight: 700,
            fontSize: "clamp(58px,10.5vw,164px)",
            lineHeight: 0.9,
            letterSpacing: "-.045em",
            textTransform: "uppercase",
            animation: reduced
              ? undefined
              : "rise .9s cubic-bezier(.16,1,.3,1) .1s both",
          }}
        >
          Proof of <span className="outline-type">practice</span>
        </h1>
        <p
          style={{
            margin: "30px 0 0",
            maxWidth: 520,
            fontSize: "clamp(17px,1.8vw,21px)",
            lineHeight: 1.55,
            color: "#9296a3",
            textWrap: "pretty",
            animation: reduced
              ? undefined
              : "rise .9s cubic-bezier(.16,1,.3,1) .22s both",
          }}
        >
          Courses, certifications, and competencies —{" "}
          <span
            style={{
              fontFamily: "var(--font-instrument-serif), serif",
              fontStyle: "italic",
              color: "#eaeaf0",
              fontSize: "1.1em",
            }}
          >
            newest first
          </span>
          .
        </p>
      </header>

      <section>
        {certificates.map((c, i) => (
          <CertificateRow
            key={c.idx}
            cert={c}
            index={i}
            delay={(i % 3) * 90}
            isLast={i === certificates.length - 1}
          />
        ))}
      </section>

      <Footer variant="email" marginTop={120} />
    </main>
  );
}
