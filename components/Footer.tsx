"use client";

import { EMAIL } from "@/lib/data";

const mono = "var(--font-geist-mono), monospace";

/**
 * Home shows the location line; Work/Credentials show the email link.
 */
export default function Footer({
  variant = "home",
  marginTop,
}: {
  variant?: "home" | "email";
  marginTop?: number;
}) {
  return (
    <footer
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
        justifyContent: "space-between",
        marginTop,
        borderTop: "1px solid rgba(255,255,255,.07)",
        padding: "26px 0 36px",
        fontFamily: mono,
        fontSize: 10.5,
        letterSpacing: ".14em",
        color: "#767c8f",
      }}
    >
      <span>© 2026 CYDRIC JAMES BULAN</span>
      {variant === "home" ? (
        <span>BULACAN, PHILIPPINES</span>
      ) : (
        <a href={`mailto:${EMAIL}`} className="link-muted" style={{ color: "#767c8f" }}>
          CEDRICJAMESBULAN@GMAIL.COM
        </a>
      )}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="link-muted"
        style={{
          cursor: "pointer",
          background: "none",
          border: "none",
          padding: 0,
          fontFamily: mono,
          fontSize: 10.5,
          letterSpacing: ".14em",
          color: "#767c8f",
        }}
      >
        TOP ↑
      </button>
    </footer>
  );
}
