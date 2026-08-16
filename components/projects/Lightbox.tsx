"use client";

import { useEffect } from "react";
import type { Project } from "@/lib/data";

const mono = "var(--font-geist-mono), monospace";

/**
 * Gallery lightbox. Placeholder frames for now — the shot count per project
 * comes from data, so real captures drop in without changing this component.
 */
export default function Lightbox({
  project,
  shot,
  onClose,
  onPrev,
  onNext,
}: {
  project: Project;
  shot: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  // Body scroll lock while open.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNext, onPrev]);

  const pad = (n: number) => String(n).padStart(2, "0");
  const total = project.shots.length;
  const current = project.shots[shot];

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} gallery`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(10,11,16,.94)",
        backdropFilter: "blur(14px)",
        display: "grid",
        placeItems: "center",
        padding: 28,
        animation: "fadein .25s ease both",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(960px,100%)",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 16,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontWeight: 600,
              fontSize: "clamp(20px,3vw,32px)",
              letterSpacing: "-.02em",
            }}
          >
            {project.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="btn-hair"
            style={{
              cursor: "pointer",
              background: "none",
              border: "1px solid rgba(255,255,255,.18)",
              color: "#9296a3",
              fontFamily: mono,
              fontSize: 11,
              letterSpacing: ".14em",
              padding: "10px 16px",
              borderRadius: 2,
              transition: "border-color .25s,color .25s",
              whiteSpace: "nowrap",
            }}
          >
            ESC ✕
          </button>
        </div>

        <div
          style={{
            position: "relative",
            aspectRatio: "16/9",
            border: "1px solid rgba(255,255,255,.12)",
            borderRadius: 2,
            overflow: "hidden",
            background: "#0d0e14",
            display: "grid",
            placeItems: "center",
          }}
        >
          {current?.type === "video" ? (
            <video
              key={current.src}
              src={current.src}
              controls
              autoPlay
              loop
              muted
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          ) : current ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={current.src}
              src={current.src}
              alt={`${project.title} — shot ${shot + 1} of ${project.shots.length}`}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 14,
          }}
        >
          <span
            style={{
              fontFamily: mono,
              fontSize: 10.5,
              letterSpacing: ".14em",
              color: "#575c6b",
            }}
          >
            {project.tech.join(" / ")}
          </span>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span
              style={{
                fontFamily: mono,
                fontSize: 12,
                letterSpacing: ".12em",
                color: "#6672ff",
              }}
            >
              {pad(shot + 1)} / {pad(total)}
            </span>
            <button
              type="button"
              onClick={onPrev}
              className="btn-hair"
              style={{
                cursor: "pointer",
                background: "none",
                border: "1px solid rgba(255,255,255,.18)",
                color: "#eaeaf0",
                fontFamily: mono,
                fontSize: 11,
                letterSpacing: ".14em",
                padding: "10px 18px",
                borderRadius: 2,
                transition: "border-color .25s",
              }}
            >
              ← PREV
            </button>
            <button
              type="button"
              onClick={onNext}
              className="btn-accent"
              style={{
                cursor: "pointer",
                background: "#4353ff",
                border: "1px solid #4353ff",
                color: "#eaeaf0",
                fontFamily: mono,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: ".14em",
                padding: "10px 18px",
                borderRadius: 2,
                transition: "background .25s",
              }}
            >
              NEXT →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
