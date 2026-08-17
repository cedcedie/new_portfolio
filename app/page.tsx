import Hero from "@/components/home/Hero";
import SelectedWork from "@/components/home/SelectedWork";
import TechStack from "@/components/home/TechStack";
import GithubActivity from "@/components/home/GithubActivity";
import Contact from "@/components/home/Contact";
import ScrollSpy from "@/components/home/ScrollSpy";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/magicui/scroll-based-velocity";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import { Highlighter } from "@/components/magicui/highlighter";
import WordReveal from "@/components/WordReveal";

const mono = "var(--font-geist-mono), monospace";

/* Sized up now that it's a single row rather than a stacked pair. */
const marqueeLine: React.CSSProperties = {
  fontWeight: 700,
  fontSize: "clamp(34px,5.6vw,86px)",
  letterSpacing: "-.035em",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
  paddingRight: ".5em",
  WebkitTextStroke: "1px rgba(234,234,240,.25)",
  color: "transparent",
};

const asterisk: React.CSSProperties = {
  WebkitTextStroke: "0px",
  color: "#4353ff",
};
const serif: React.CSSProperties = {
  fontFamily: "var(--font-instrument-serif), serif",
  fontStyle: "italic",
  fontWeight: 400,
};
const serifInline: React.CSSProperties = { ...serif, color: "#eaeaf0" };

/* Two weights only: section headers get the structural rule, rows get a
   fainter one. Everything at the same weight read as noise. */
const hairline = "1px solid rgba(255,255,255,.09)";
const rowRule = "1px solid rgba(255,255,255,.045)";

function SectionHeader({
  index,
  children,
  label,
  marginBottom,
}: {
  index: string;
  children: React.ReactNode;
  label: string;
  marginBottom: number;
}) {
  return (
    <Reveal
      delay={0}
      className="sec-head"
      style={{
        // No rule above the heading: the (0N) index, the heading itself and
        // the generous section padding already signal a new section, so the
        // line was redundant weight.
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
        {index}
      </span>
      <h2
        style={{
          margin: 0,
          fontWeight: 600,
          fontSize: "clamp(36px,4.8vw,62px)",
          letterSpacing: "-.03em",
        }}
      >
        {children}
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
        {label}
      </span>
    </Reveal>
  );
}

/** One row on the shared 210px mono rail. */
function RailRow({
  rail,
  railColor = "#6672ff",
  railPadTop = 10,
  delay,
  padding,
  hover = false,
  children,
}: {
  rail: string;
  railColor?: string;
  railPadTop?: number;
  delay: number;
  padding: string;
  hover?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Reveal
      delay={delay}
      className={hover ? "row-shift" : undefined}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 20,
        // Rows use a fainter rule than section headers so the eye can tell
        // "new section" from "next row"; the closing rule is dropped because
        // the next section header already draws one.
        borderTop: rowRule,
        padding,
      }}
    >
      <span
        style={{
          flex: "0 0 210px",
          fontFamily: mono,
          fontSize: 11,
          letterSpacing: ".14em",
          color: railColor,
          paddingTop: railPadTop,
        }}
      >
        {rail}
      </span>
      <div
        style={{
          flex: "1 1 400px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {children}
      </div>
    </Reveal>
  );
}

const disciplineH3: React.CSSProperties = {
  margin: 0,
  fontWeight: 600,
  fontSize: "clamp(26px,3.4vw,44px)",
  letterSpacing: "-.025em",
  lineHeight: 1.05,
};

const bodyP: React.CSSProperties = {
  margin: 0,
  color: "#9296a3",
  fontSize: 16,
  lineHeight: 1.65,
  maxWidth: 620,
  textWrap: "pretty",
};

const techLine: React.CSSProperties = {
  fontFamily: mono,
  fontSize: 10.5,
  letterSpacing: ".14em",
  color: "#575c6b",
};

export default function HomePage() {
  return (
    <>
      <ScrollSpy />
      <Hero />

      {/* Outlined marquee directly under the hero — gives the eye a rest after
          the portrait and states the disciplines in one pass. */}
      <div
        style={{
          // Single row now, so the flex column + gap from the two-row version
          // are gone — they were reserving space for a second line that no
          // longer exists and made the band look double-spaced.
          borderTop: hairline,
          borderBottom: hairline,
          padding: "clamp(14px,2vw,22px) 0",
        }}
      >
        {/* Scroll-velocity rows: speed and direction react to how you scroll. */}
        <ScrollVelocityContainer>
          <ScrollVelocityRow baseVelocity={3} direction={1}>
            <span style={marqueeLine}>
              Web apps{" "}
              <span style={asterisk}>✳</span> Mobile products{" "}
              <span style={asterisk}>✳</span> 2D games{" "}
              <span style={asterisk}>✳</span>{" "}
            </span>
          </ScrollVelocityRow>

        </ScrollVelocityContainer>
      </div>

      <main
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          // A flat 40px on both sides left less breathing room on mobile
          // than Hero's own 24px, and than every other page's since-fixed
          // side padding — About, Tech Stack, GitHub, Experience, Selected
          // Work, and Contact all sat closer to the screen edge than the
          // sections before/after them.
          padding: "0 clamp(24px, 4vw, 40px)",
        }}
      >
        {/* (01) About */}
        <section id="about" style={{ padding: "160px 0 0" }}>
          <SectionHeader index="(01)" label="ABOUT" marginBottom={70}>
            The short <span style={serif}>version</span>
          </SectionHeader>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
              gap: 64,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 36,
                maxWidth: 700,
              }}
            >
              <Reveal delay={80}>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(22px,2.4vw,30px)",
                    lineHeight: 1.5,
                    letterSpacing: "-.015em",
                    color: "#9296a3",
                    textWrap: "pretty",
                  }}
                >
                  I build software end to end — scoping, writing, and
                  shipping it myself, across{" "}
                  <Highlighter action="highlight" color="#4353ff">
                    <span style={{ color: "#eaeaf0" }}>freelance work</span>
                  </Highlighter>{" "}
                  and a{" "}
                  <Highlighter action="underline" color="#6672ff">
                    <span style={{ color: "#eaeaf0" }}>
                      university internship
                    </span>
                  </Highlighter>
                  . Strong OOP foundations, fluent Git, modern web tech.
                </p>
              </Reveal>
              {/* Not wrapped in Reveal — WordReveal already animates itself
                  in (word-by-word, tied to scroll progress), so an outer
                  mount-triggered opacity fade on top of that was two
                  systems animating the same text: it fully faded in once,
                  then scrolling further dimmed trailing words again as
                  WordReveal's own progress caught up — read as the reveal
                  playing twice. */}
              <div
                style={{
                  borderLeft: "2px solid #4353ff",
                  padding: "6px 0 6px 26px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 10.5,
                    letterSpacing: ".16em",
                    color: "#6672ff",
                  }}
                >
                  WHY I BUILD
                </span>
                <WordReveal
                  style={{
                    margin: 0,
                    ...serif,
                    fontSize: "clamp(19px,2vw,25px)",
                    lineHeight: 1.55,
                    color: "#eaeaf0",
                    textWrap: "pretty",
                  }}
                >
                  {`Started out just trying to make games. That curiosity turned into freelance client work, then into shipping software for people who actually depend on it — a courtroom simulation, a cafe's order system, a kids' game about disaster prep.`}
                </WordReveal>
              </div>
            </div>

            <Reveal
              delay={160}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                maxWidth: 460,
                justifySelf: "end",
                width: "100%",
              }}
            >
              {[
                {
                  title: "BS Information Technology",
                  sub: "STI College Balagtas, Bulacan",
                  right: "2022—2026",
                },
                {
                  title: "General Academic Strand",
                  sub: "Bulacan Montessori School Inc.",
                  right: "2020—2022",
                },
              ].map((row) => (
                <div
                  key={row.title}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 18,
                    borderTop: rowRule,
                    padding: "20px 0",
                  }}
                >
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 3 }}
                  >
                    <span style={{ fontWeight: 500, fontSize: 16 }}>
                      {row.title}
                    </span>
                    <span style={{ color: "#9296a3", fontSize: 14 }}>
                      {row.sub}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: mono,
                      fontSize: 11,
                      letterSpacing: ".1em",
                      color: "#575c6b",
                      paddingTop: 4,
                    }}
                  >
                    {row.right}
                  </span>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 18,
                  borderTop: rowRule,
                  borderBottom: rowRule,
                  padding: "20px 0",
                }}
              >
                <span style={{ fontWeight: 500, fontSize: 16 }}>
                  Based in Bulacan, PH
                </span>
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 11,
                    letterSpacing: ".1em",
                    color: "#575c6b",
                    paddingTop: 4,
                  }}
                >
                  REMOTE-READY
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* (02) What I do */}
        <section id="stack" style={{ padding: "160px 0 0" }}>
          <SectionHeader index="(02)" label="CAPABILITIES" marginBottom={54}>
            What I <span style={serif}>do</span>
          </SectionHeader>

          <RailRow rail="01 — WEB" delay={60} padding="48px 0" hover>
            <h3 style={disciplineH3}>Web applications</h3>
            <p style={bodyP}>
              Full-stack products end to end — admin dashboards, management
              systems, cultural showcases.{" "}
              <span style={serifInline}>Typed, componentized, deployed.</span>
            </p>
            <span style={techLine}>
              REACT / NEXT.JS / TYPESCRIPT / TAILWIND / PHP / LARAVEL / JAVA /
              POSTGRESQL / MYSQL
            </span>
          </RailRow>

          <RailRow rail="02 — MOBILE" delay={120} padding="48px 0" hover>
            <h3 style={disciplineH3}>Mobile development</h3>
            <p style={bodyP}>
              Cross-platform and native Android apps wired to{" "}
              <span style={serifInline}>real-time backends</span> — live orders,
              live sync, live dashboards.
            </p>
            <span style={techLine}>
              FLUTTER / DART / KOTLIN / NODE.JS / SOCKET.IO / MONGODB / FIREBASE
            </span>
          </RailRow>

          <RailRow rail="03 — GAMES & AR" delay={180} padding="48px 0" hover>
            <h3 style={disciplineH3}>Games &amp; AR experiences</h3>
            <p style={bodyP}>
              2D games and AR learning tools for schools and clients — from{" "}
              <span style={serifInline}>hand-drawn pixel art</span> to 24-model
              AR curricula.
            </p>
            <span style={techLine}>
              GODOT / GDSCRIPT / UNITY / VUFORIA / BLENDER / ASEPRITE
            </span>
          </RailRow>

          {/* The "FULL TOOLBOX" list lived here; section (03) below *is* the
              full toolbox and shows it far better, so listing ~13 more names
              one screen earlier was pure repetition. */}
        </section>

        {/* (03) Tech stack — 3D marquee */}
        <TechStack />

        {/* (04) GitHub activity — evidence behind the stack above */}
        <GithubActivity />

        {/* (05) Where I've worked */}
        <section id="experience" style={{ padding: "160px 0 0" }}>
          <SectionHeader index="(05)" label="2023 — NOW" marginBottom={54}>
            Where I&rsquo;ve <span style={serif}>worked</span>
          </SectionHeader>

          <RailRow rail="2023 — PRESENT" delay={80} padding="44px 0" railPadTop={8}>
            <h3
              style={{
                margin: 0,
                fontWeight: 600,
                fontSize: "clamp(24px,2.8vw,34px)",
                letterSpacing: "-.02em",
              }}
            >
              Freelance Developer{" "}
              <span style={{ ...serif, color: "#9296a3" }}>— remote</span>
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                maxWidth: 660,
              }}
            >
              <span
                style={{ color: "#9296a3", fontSize: 15.5, lineHeight: 1.65 }}
              >
                Cross-platform cafe ordering system — Flutter customer app +
                React admin panel, real-time sync over Socket.IO and MongoDB.
              </span>
              <span
                style={{ color: "#9296a3", fontSize: 15.5, lineHeight: 1.65 }}
              >
                &ldquo;Disaster Ranger,&rdquo; a 2D Godot game teaching kids
                disaster preparedness.
              </span>
              <span
                style={{ color: "#9296a3", fontSize: 15.5, lineHeight: 1.65 }}
              >
                Full-cycle delivery on web and game projects — scoping through
                deployment.
              </span>
            </div>
            <span style={techLine}>
              REACT / FLUTTER / MONGODB / SOCKET.IO / GODOT / FIREBASE
            </span>
          </RailRow>

          <RailRow
            rail="FEB — MAY 2025"
            delay={160}
            padding="44px 0"
            railPadTop={8}
          >
            <h3
              style={{
                margin: 0,
                fontWeight: 600,
                fontSize: "clamp(24px,2.8vw,34px)",
                letterSpacing: "-.02em",
              }}
            >
              Frontend Developer Intern{" "}
              <span style={{ ...serif, color: "#9296a3" }}>
                — Bulacan State University
              </span>
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                maxWidth: 660,
              }}
            >
              <span
                style={{ color: "#9296a3", fontSize: 15.5, lineHeight: 1.65 }}
              >
                Built UI components for Document Tracking, Record Management,
                and Vehicle Trip Ticket systems.
              </span>
              <span
                style={{ color: "#9296a3", fontSize: 15.5, lineHeight: 1.65 }}
              >
                Integrated REST APIs alongside backend developers.
              </span>
            </div>
            <span style={techLine}>REACT / REST APIS</span>
          </RailRow>
        </section>

        {/* (05) Selected work — split scroll */}
        <SelectedWork />

        {/* The CTA marquee that sat here restated "Available for work" (hero
            eyebrow) and "Let's build something" (the Contact headline directly
            below) — three marquees also read as a tic. Contact now lands
            straight after the work. */}
        <Contact />
        <Footer variant="home" />
      </main>
    </>
  );
}
