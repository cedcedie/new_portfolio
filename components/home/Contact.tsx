"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { CV_URL, EMAIL, GITHUB_URL, LINKEDIN_URL, PHONE } from "@/lib/data";

const mono = "var(--font-geist-mono), monospace";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

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
          borderTop: "1px solid rgba(255,255,255,.09)",
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
            color: "#575c6b",
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
            color: "#575c6b",
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
        Let&rsquo;s build
        <br />
        <span
          style={{
            fontFamily: "var(--font-instrument-serif), serif",
            fontStyle: "italic",
            fontWeight: 400,
            textTransform: "none",
            color: "#6672ff",
          }}
        >
          something.
        </span>
      </Reveal>

      <Reveal delay={120} as="div" style={{ display: "block" }}>
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
            transition: "border-color .25s,color .25s",
          }}
        >
          {EMAIL}
        </a>
        <button
          type="button"
          onClick={copy}
          className="btn-hair"
          style={{
            cursor: "pointer",
            marginLeft: 20,
            verticalAlign: "middle",
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
            marginLeft: 12,
            verticalAlign: "middle",
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
    </section>
  );
}
