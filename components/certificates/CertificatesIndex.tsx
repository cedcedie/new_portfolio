"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import IndexHeader from "@/components/IndexHeader";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { BorderBeam } from "@/components/magicui/border-beam";
import { certificates, type Certificate } from "@/lib/data";

const mono = "var(--font-geist-mono), monospace";
const hairline = "1px solid rgba(255,255,255,.08)";

/**
 * Same row anatomy as ProjectsIndex's ProjectRow — index chip, a square
 * tile, title + secondary line, meta on the right — so Work and Credentials
 * read as one system rather than a list page and a table page.
 *
 * The tile used to show the issuer's first letter as a monogram regardless
 * of whether a real file existed — every row looked identically clickable,
 * so there was no way to tell a cert with an actual scan behind it from one
 * with nothing at all. The tile now shows what's actually true: a real
 * thumbnail when there's an image to show, a plain "PDF" label when only a
 * PDF exists (opens a document, not a preview — say so), and "NO FILE YET"
 * on a row that isn't even a link when there's nothing to open.
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
  // PNG/JPG opens straight in the browser tab; PDF is the fallback for the
  // certs that only have a scan in that format. A cert with neither has no
  // file yet and the row just isn't a link.
  const viewUrl = cert.imageUrl ?? cert.fileUrl;
  const Tag = viewUrl ? "a" : "div";

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
      <Tag
        {...(viewUrl
          ? {
              href: viewUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": `View ${cert.title} certificate`,
            }
          : {})}
        style={{
          cursor: viewUrl ? "pointer" : "default",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 26,
          width: "100%",
        }}
      >
        <span
          style={{
            flex: "0 0 44px",
            fontFamily: mono,
            fontSize: 12,
            color: "#767c8f",
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
          {cert.imageUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={cert.imageUrl}
              alt=""
              loading="lazy"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          ) : (
            <span
              style={{
                fontFamily: mono,
                fontSize: 10,
                letterSpacing: ".1em",
                color: "#767c8f",
              }}
            >
              {cert.fileUrl ? "PDF" : "NO FILE YET"}
            </span>
          )}
          {viewUrl && hovered && (
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
            color: "#767c8f",
            alignSelf: "flex-start",
            paddingTop: 4,
          }}
        >
          {cert.year}
        </span>
      </Tag>
    </Reveal>
  );
}

export default function CertificatesIndex() {
  return (
    <main
      style={{
        maxWidth: 1360,
        margin: "0 auto",
        // Matches .pz's (Hero) top and side padding — see ProjectsIndex for
        // why both needed to change.
        padding: "clamp(104px, 13vh, 154px) clamp(24px, 4vw, 40px) 60px",
      }}
    >
      <IndexHeader
        eyebrowLeft="/CREDENTIALS"
        eyebrowRight={
          <>
            <NumberTicker value={7} /> CERTIFICATIONS · 2023 — 2026
          </>
        }
        headline={
          <>
            Proof of{" "}
            <span
              style={{
                fontFamily: "var(--font-instrument-serif), serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#6672ff",
              }}
            >
              practice
            </span>
          </>
        }
        lede={
          <>
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
          </>
        }
      />

      <section>
        {certificates.map((c, i) => (
          <CertificateRow
            key={c.idx}
            cert={c}
            index={i}
            // Monotonic and capped, not `(i % 3) * 90` — see ProjectsIndex
            // for why the modulo pattern let rows reveal out of order under
            // a fast scroll.
            delay={Math.min(i * 40, 200)}
            isLast={i === certificates.length - 1}
          />
        ))}
      </section>

      <Footer variant="email" marginTop={120} />
    </main>
  );
}
