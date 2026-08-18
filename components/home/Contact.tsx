"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Reveal from "@/components/Reveal";
import { AuroraText } from "@/components/magicui/aurora-text";
import { KineticText } from "@/components/magicui/kinetic-text";
import { CV_URL, EMAIL, GITHUB_URL, LINKEDIN_URL, PHONE } from "@/lib/data";
import { useReducedMotion } from "@/lib/useReducedMotion";

const mono = "var(--font-geist-mono), monospace";

// lottie-react touches the DOM on import — load it client-only, and only
// once it's actually needed (this section is well below the fold).
const Lottie = dynamic(
  () => import("lottie-react").then((mod) => mod.Lottie),
  { ssr: false },
);

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const reduced = useReducedMotion();

  const copy = () => {
    navigator.clipboard?.writeText(EMAIL);
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  // The palette's "Copy email address" action drives the same label.
  useEffect(() => {
    const onCopied = () => {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    };
    window.addEventListener("email-copied", onCopied);
    return () => {
      window.removeEventListener("email-copied", onCopied);
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <section id="contact" style={{ padding: "110px 0 70px" }}>
      <Reveal
        delay={0}
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 22,
          paddingTop: 22,
          marginBottom: 56,
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
          (07)
        </span>
        <span
          style={{
            fontFamily: mono,
            fontSize: 11,
            letterSpacing: ".16em",
            color: "#767c8f",
          }}
        >
          CONTACT
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontFamily: mono,
            fontSize: 11,
            letterSpacing: ".16em",
            color: "#767c8f",
          }}
        >
          REPLIES FAST
        </span>
      </Reveal>

      <Reveal
        as="h2"
        delay={60}
        style={{
          margin: "0 0 56px",
          fontWeight: 700,
          fontSize: "clamp(56px,10.5vw,168px)",
          lineHeight: 0.9,
          letterSpacing: "-.045em",
          textTransform: "uppercase",
        }}
      >
        {/* Kinetic on the first line only: letters thicken under the cursor.
            Paired with the Aurora word below, one effect per line. */}
        <KineticText as="span" text="Let’s build" className="contact-kinetic" />
        <br />
        {/* The single Aurora heading on the site — kept to the closing word so
            it reads as a flourish, not a template effect. Colours stay inside
            the cobalt range rather than the default rainbow. */}
        <span
          style={{
            fontFamily: "var(--font-instrument-serif), serif",
            fontStyle: "italic",
            fontWeight: 400,
            textTransform: "none",
          }}
        >
          <AuroraText colors={["#4353ff", "#6672ff", "#8b95ff", "#4353ff"]}>
            something.
          </AuroraText>
        </span>
      </Reveal>

      {/* Content left, Kiki right — the delivery-service loop is a closing
          flourish, not competing with the headline, so it sits beside the
          details rather than above or below them. */}
      <div className="contact-grid">
        <div>
          <Reveal delay={120} as="div" style={{ display: "block" }}>
            {/* Email on its own row, buttons on the next — the two used to
                be inline siblings relying on the email text being short
                enough to wrap the buttons onto a new line by themselves.
                That held together on desktop but on mobile the email wraps
                to two lines and its own underline (padding-bottom + border)
                sat directly above the buttons row with almost no gap,
                crowding into them. A real block break with margin keeps the
                two rows apart at every width, not just when the wrap
                happens to land right. */}
            <a
              href={`mailto:${EMAIL}`}
              className="contact-email"
              style={{
                display: "inline-block",
                fontWeight: 500,
                fontSize: "clamp(19px,3vw,34px)",
                letterSpacing: "-.015em",
                color: "#eaeaf0",
                borderBottom: "1px solid rgba(102,114,255,.55)",
                paddingBottom: 8,
                marginBottom: 20,
                transition: "border-color .25s,color .25s",
              }}
            >
              {EMAIL}
            </a>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <button
                type="button"
                onClick={copy}
                className="btn-hair"
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "1px solid rgba(255,255,255,.16)",
                  color: "#9296a3",
                  fontFamily: mono,
                  fontSize: 10,
                  letterSpacing: ".14em",
                  padding: "10px 16px",
                  borderRadius: 2,
                  transition: "border-color .25s,color .25s",
                }}
              >
                {copied ? "COPIED ✓" : "COPY EMAIL"}
              </button>
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hair"
                style={{
                  display: "inline-block",
                  border: "1px solid rgba(255,255,255,.16)",
                  color: "#9296a3",
                  fontFamily: mono,
                  fontSize: 10,
                  letterSpacing: ".14em",
                  padding: "10px 16px",
                  borderRadius: 2,
                  transition: "border-color .25s,color .25s",
                }}
              >
                DOWNLOAD CV ↓
              </a>
            </div>
          </Reveal>

          <Reveal
            delay={180}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 32,
              marginTop: 48,
              fontFamily: mono,
              fontSize: 11.5,
              letterSpacing: ".14em",
            }}
          >
            <span style={{ color: "#9296a3" }}>{PHONE}</span>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-muted"
              style={{ color: "#9296a3" }}
            >
              GITHUB ↗
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-muted"
              style={{ color: "#9296a3" }}
            >
              LINKEDIN ↗
            </a>
          </Reveal>
        </div>

        {!reduced && (
          <Reveal delay={140} className="contact-kiki">
            {/* Fetched from /public rather than bundled — keeps a 200KB
                animation file out of the JS bundle entirely. */}
            <Lottie
              src="/kiki.json"
              loop
              autoplay
              aria-hidden="true"
              style={{ width: "100%", height: "100%" }}
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
