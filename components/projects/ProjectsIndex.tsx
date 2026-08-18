"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import IndexHeader from "@/components/IndexHeader";
import Lightbox from "./Lightbox";
import {
  academic,
  allProjects,
  freelance,
  personal,
  type Project,
} from "@/lib/data";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { BorderBeam } from "@/components/magicui/border-beam";

const mono = "var(--font-geist-mono), monospace";
const hairline = "1px solid rgba(255,255,255,.08)";

function SectionHead({
  letter,
  title,
  count,
  marginBottom,
}: {
  letter: string;
  title: string;
  count: string;
  marginBottom: number;
}) {
  return (
    // No rule above the heading — redundant under the page header's own
    // closing rule, and the section spacing already reads as a new section.
    <Reveal
      delay={0}
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 22,
        marginBottom,
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
        ({letter})
      </span>
      <h2
        style={{
          margin: 0,
          fontWeight: 600,
          fontSize: "clamp(30px,3.8vw,48px)",
          letterSpacing: "-.03em",
        }}
      >
        {title}
      </h2>
      <span
        style={{
          marginLeft: "auto",
          fontFamily: mono,
          fontSize: 11,
          letterSpacing: ".16em",
          color: "#767c8f",
        }}
      >
        {count}
      </span>
    </Reveal>
  );
}

function ProjectRow({
  project,
  index,
  delay,
  onOpen,
}: {
  project: Project;
  index: number;
  delay: number;
  onOpen: (p: Project) => void;
}) {
  const openable = project.shots.length > 0;
  const videos = project.shots.filter((s) => s.type === "video").length;
  const shots = project.upcoming
    ? "UPCOMING"
    : !openable
      ? "REPO ONLY"
      : videos > 0
        ? `${String(project.shots.length).padStart(2, "0")} · ${videos} VIDEO`
        : `${String(project.shots.length).padStart(2, "0")} SHOTS`;
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
        padding: "36px 0",
      }}
    >
      <div
        role={openable ? "button" : undefined}
        tabIndex={openable ? 0 : undefined}
        aria-label={openable ? `Open ${project.title} gallery` : undefined}
        onClick={openable ? () => onOpen(project) : undefined}
        onKeyDown={
          openable
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpen(project);
                }
              }
            : undefined
        }
        style={{
          cursor: openable ? "pointer" : "default",
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
          {project.cover && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={project.cover}
              alt=""
              loading="lazy"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
          <span
            style={{
              position: "relative",
              fontFamily: mono,
              fontSize: 9,
              letterSpacing: ".08em",
              color: "#eaeaf0",
              background: "rgba(10,11,16,.72)",
              padding: "3px 7px",
              borderRadius: 2,
            }}
          >
            {shots}
          </span>
          {/* Mounted only on hover — an always-on beam per row would mean 14+
              simultaneous infinite loops running the whole time you're on
              this page for no one to see. */}
          {hovered && (
            <BorderBeam size={60} duration={4} colorFrom="#4353ff" colorTo="#8b95ff" />
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
            {project.title}
          </h3>
          <span
            style={{
              color: "#9296a3",
              fontSize: 15,
              lineHeight: 1.55,
              maxWidth: 640,
            }}
          >
            {project.desc}
          </span>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px 20px",
              marginTop: 6,
            }}
          >
            <span
              style={{
                fontFamily: mono,
                fontSize: 10.5,
                letterSpacing: ".14em",
                color: "#767c8f",
              }}
            >
              {project.meta}
            </span>
            <span
              style={{
                fontFamily: mono,
                fontSize: 10.5,
                letterSpacing: ".14em",
                color: "#6672ff",
              }}
            >
              {project.tech.join(" / ")}
            </span>
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="github-link"
              style={{
                fontFamily: mono,
                fontSize: 10.5,
                letterSpacing: ".14em",
                color: "#6672ff",
                marginTop: 4,
                alignSelf: "flex-start",
              }}
            >
              GITHUB ↗
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function ProjectsIndex() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [shot, setShot] = useState(0);

  const current = openSlug
    ? (allProjects.find((p) => p.slug === openSlug) ?? null)
    : null;

  const open = (p: Project) => {
    if (p.shots.length > 0) {
      setOpenSlug(p.slug);
      setShot(0);
    }
  };

  return (
    <>
      <main
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          // Matches .pz's (Hero) padding so top spacing and mobile side
          // margins don't jump between this page, /certificates, and home.
          padding: "clamp(104px, 13vh, 154px) clamp(24px, 4vw, 40px) 60px",
        }}
      >
        <IndexHeader
          eyebrowLeft="/WORK — FULL INDEX"
          eyebrowRight={
            <>
              <NumberTicker value={14} /> PROJECTS · 2023 — 2026
            </>
          }
          headline={
            <>
              All{" "}
              <span
                style={{
                  fontFamily: "var(--font-instrument-serif), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#6672ff",
                }}
              >
                work
              </span>
            </>
          }
          lede={
            <>
              Academic, freelance, and game work —{" "}
              <span
                style={{
                  fontFamily: "var(--font-instrument-serif), serif",
                  fontStyle: "italic",
                  color: "#eaeaf0",
                  fontSize: "1.1em",
                }}
              >
                open any row
              </span>{" "}
              to flip through its gallery.
            </>
          }
        />

        <section id="personal" style={{ marginBottom: 130 }}>
          <SectionHead
            letter="A"
            title="Personal"
            count="01 PROJECT"
            marginBottom={8}
          />
          {personal.map((p, i) => (
            <ProjectRow
              key={p.slug}
              project={p}
              index={i}
              // Monotonic and capped, not `(i % 3) * 90` — that pattern let a
              // later row finish revealing before an earlier one under fast scroll.
              delay={Math.min(i * 40, 200)}
              onOpen={open}
            />
          ))}
        </section>

        <section id="freelance" style={{ marginBottom: 130 }}>
          <SectionHead
            letter="B"
            title="Freelance"
            count="11 PROJECTS"
            marginBottom={8}
          />
          {freelance.map((p, i) => (
            <ProjectRow
              key={p.slug}
              project={p}
              index={i}
              // Monotonic and capped, not `(i % 3) * 90` — that pattern let a
              // later row finish revealing before an earlier one under fast scroll.
              delay={Math.min(i * 40, 200)}
              onOpen={open}
            />
          ))}
        </section>

        <section id="academic" style={{ marginBottom: 130 }}>
          <SectionHead
            letter="C"
            title="Academic"
            count="02 PROJECTS"
            marginBottom={8}
          />
          {academic.map((p, i) => (
            <ProjectRow
              key={p.slug}
              project={p}
              index={i}
              // Monotonic and capped, not `(i % 3) * 90` — that pattern let a
              // later row finish revealing before an earlier one under fast scroll.
              delay={Math.min(i * 40, 200)}
              onOpen={open}
            />
          ))}
        </section>

        <Footer variant="email" />
      </main>

      {current && (
        <Lightbox
          project={current}
          shot={shot}
          onClose={() => {
            setOpenSlug(null);
            setShot(0);
          }}
          onPrev={() =>
            setShot(
              (s) => (s - 1 + current.shots.length) % current.shots.length,
            )
          }
          onNext={() => setShot((s) => (s + 1) % current.shots.length)}
        />
      )}
    </>
  );
}
