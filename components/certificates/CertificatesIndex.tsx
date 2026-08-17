"use client";

import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import { certificates } from "@/lib/data";
import { useReducedMotion } from "@/lib/useReducedMotion";

const mono = "var(--font-geist-mono), monospace";
const hairline = "1px solid rgba(255,255,255,.08)";

export default function CertificatesIndex() {
  const reduced = useReducedMotion();

  return (
    <main
      style={{ maxWidth: 1160, margin: "0 auto", padding: "160px 40px 60px" }}
    >
      <header style={{ marginBottom: 96 }}>
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
          <span>07 CERTIFICATIONS · 2023 — 2026</span>
        </div>
        <h1
          style={{
            margin: "40px 0 0",
            fontWeight: 700,
            fontSize: "clamp(54px,10vw,150px)",
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
      </header>

      <section>
        {certificates.map((c, i) => (
          <Reveal
            key={c.idx}
            delay={i * 60}
            className="row-shift"
            style={{
              display: "grid",
              gridTemplateColumns: "44px minmax(0,1fr) auto",
              alignItems: "baseline",
              gap: 26,
              borderTop: hairline,
              borderBottom:
                i === certificates.length - 1 ? hairline : undefined,
              padding: "36px 0",
            }}
          >
            <span
              style={{
                fontFamily: mono,
                fontSize: 12,
                color: "#6672ff",
              }}
            >
              {c.idx}
            </span>
            <div
              style={{ display: "flex", flexDirection: "column", gap: 6 }}
            >
              <h3
                style={{
                  margin: 0,
                  fontWeight: 600,
                  fontSize: "clamp(21px,2.8vw,32px)",
                  letterSpacing: "-.02em",
                }}
              >
                {c.title}
              </h3>
              <span
                style={{
                  color: "#9296a3",
                  fontSize: 14.5,
                  fontFamily: "var(--font-instrument-serif), serif",
                  fontStyle: "italic",
                }}
              >
                {c.issuer}
              </span>
            </div>
            <span
              style={{
                marginLeft: "auto",
                fontFamily: mono,
                fontSize: 11.5,
                letterSpacing: ".14em",
                color: "#575c6b",
              }}
            >
              {c.year}
            </span>
          </Reveal>
        ))}
      </section>

      <Footer variant="email" marginTop={120} />
    </main>
  );
}
