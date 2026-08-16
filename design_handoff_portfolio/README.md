# Handoff: Cydric Bulan — Developer Portfolio (Multi-page)

## Overview
A 3-page developer portfolio for Cydric James Bulan (software developer, Bulacan, PH): Home (`/`), Work index (`/projects`), Credentials (`/certificates`). Modern-SaaS editorial aesthetic — dark, cobalt accent, oversized type, hairline-rule grid — where motion design is itself a portfolio piece.

## About the Design Files
The `.dc.html` files in this bundle are **design references created in HTML** — working prototypes showing intended look and behavior, NOT production code to copy. The task is to **recreate these designs in a Next.js App Router codebase** using the stack below. Open each file in a browser to inspect live behavior.

## Target Stack (per original brief)
- Next.js (latest, App Router): `app/page.tsx`, `app/projects/page.tsx`, `app/certificates/page.tsx`
- Tailwind CSS
- Framer Motion — page transitions between routes, micro-interactions, staggered reveals
- GSAP + ScrollTrigger — scroll choreography (split-scroll pinning, reveals, parallax)
- Magic UI components where they map (noted per feature below)
- lucide-react for any iconography; simpleicons.org CDN for brand/tech logos
- Dark-only (no theme toggle designed)

## Fidelity
**High-fidelity.** Recreate pixel-perfectly: exact hex values, font stacks, letter-spacing, and easing below.

## Design Tokens
Colors:
- Background: `#0a0b10` · Surface: `#0c0d13` / `#0e0f15` (palette panel)
- Text: `#eaeaf0` · Muted: `#9296a3` · Faint: `#575c6b` · Nav-inactive: `#575c6b`
- Accent: `#4353ff` (fills/buttons) · Accent-bright: `#6672ff` (small text/hovers) · Hover fill: `#5a68ff`
- Hairline: `rgba(255,255,255,.07–.09)` · Selection: bg `#4353ff` / text `#eaeaf0`
- Tech logo tint (Simple Icons): `8b8f9a`

Typography (Google Fonts):
- Display/body: **Archivo** (400/500/600/700). H1/hero: 700, `clamp(64px, 11.5vw, 182px)`, line-height .9, letter-spacing -.045em, uppercase. Section H2: 600, `clamp(36px, 4.8vw, 62px)`, -.03em.
- Accent words: **Instrument Serif** italic 400 (inline inside headings/pull-quote; never for body).
- Labels/meta/data: **Geist Mono** 400/500, 10–12px, letter-spacing .1–.16em, uppercase.
- Outline type: `-webkit-text-stroke: 1.5px rgba(234,234,240,.9)` + transparent fill (hero "BULAN", page-header second word, marquee at .25 alpha, preview index at rgba(102,114,255,.55)).

Layout / spacing:
- Container: max-width 1360px (1160px on Credentials), 40px side padding.
- Shared grid rail: 210px mono label column on all list sections (flex: `0 0 210px` + `1 1 400px`, wraps on mobile).
- Section rhythm: 160px top padding; section headers = hairline top rule + `(0N)` index in accent mono + H2 + right-aligned mono label.
- Radius: 2px on everything except ⌘K palette (8px) and pills (999px). Border: 1px hairline.
- Grain: fixed full-viewport SVG fractalNoise overlay, opacity .05, z-90, pointer-events none.

Easing: `cubic-bezier(.16, 1, .3, 1)` ("expo-out"), 0.9s for reveals; stagger via 60–240ms delays.

## Screens

### 1. Home (`Home v2.dc.html` → `app/page.tsx`)
Sections top→bottom:
1. **Nav** (fixed, blur backdrop `rgba(10,11,16,.78)` + 18px blur, bottom hairline): logo "Cydric Bulan." (accent period) · center mono links INDEX/WORK/CREDENTIALS (active = accent bottom border) · right ⌘K button + CONTACT ↗ bordered button. 2px scroll-progress bar fixed at very top (accent, scaleX by scroll).
2. **Hero**: meta row (pulsing-dot "AVAILABLE FOR WORK" left; "BULACAN, PH — {live Manila clock} UTC+8" right) above hairline. H1 "CYDRIC / JAMES BULAN" — masked line reveal (each line wrapped in `overflow:hidden`, inner translateY(115%)→0, 0.95s expo-out, 50/180ms delays); "BULAN" outlined. Below: 2-col grid — left: lede with serif-italic phrases + 2 CTAs (filled accent "Selected work →", bordered "Get in touch"; both magnetic); right: **`#hero-3d-mount`** — isolated 4:3 container (hairline border, radial accent glow, placeholder orbit rings) reserved for a future react-three-fiber scene; drop-in without restructuring. Hero has scroll parallax (title +0.07 × scrollY, mount −0.05).
3. **Logo marquee**: full-bleed hairline band; 18 tech logos (Simple Icons, `/8b8f9a` tint, 19px) + mono names, infinite translateX loop 44s, duplicated content. → Magic UI Marquee.
4. **(01) About**: statement paragraph (muted, key phrases white) + "WHY I BUILD" pull-quote (2px accent left border, Instrument Serif italic, `clamp(19px,2vw,25px)`) · right column: education rows + "Based in" row (hairline-separated).
5. **(02) What I do**: three numbered discipline rows on the 210px rail (01 — WEB / 02 — MOBILE / 03 — GAMES & AR): H3 `clamp(26px,3.4vw,44px)`, one-line description with serif-italic accent, mono tech line. Hover: row padding-left 0→22px (.35s). Closing compact "FULL TOOLBOX" mono row.
6. **(04→numbered 03 in code if you renumber) Selected work — split scroll**: 2-col grid. Left column `position:sticky; top:110px`: 4:3 preview panel (striped placeholder bg whose gradient angle shifts per active item, slug top-left, shot-count top-right in accent, giant outlined index number bottom-right, tech line bottom-left) + "PREVIEW — SWAPS AS YOU SCROLL / 0N / 04" caption. Right column: 4 chapters, each `min-height:58vh`, hairline-separated (index+meta mono line, H3 `clamp(30px,4vw,52px)`, description, tech line). Active chapter = the one crossing viewport center (IntersectionObserver rootMargin -42%/-42% in prototype) → GSAP ScrollTrigger or Magic UI sticky-scroll-reveal. Featured: Case No. Zero (08 shots), LMS: Science with AR (11), Hydrolar (07), Cafe System Web & Mobile (11).
7. **Giant CTA marquee**: outlined uppercase `clamp(60px,9vw,136px)` "LET'S BUILD SOMETHING ✳ AVAILABLE FOR WORK ✳" loop, 26s.
8. **(05) Contact**: header rule, H2 "LET'S BUILD / *something.*" (serif italic accent second line) `clamp(56px,10.5vw,168px)`; email link with accent underline; COPY EMAIL button (→ "COPIED ✓" for 1.6s); DOWNLOAD CV ↓ button (`cv.pdf` in bundle); phone + GITHUB ↗ + LINKEDIN ↗ mono row.
9. **Footer**: © / location / TOP ↑ mono row.

Right-edge **scroll-spy**: fixed vertical 01–05 mono anchors (≥1200px viewports only), active = accent.

### 2. Work index (`Projects v2.dc.html` → `app/projects/page.tsx`)
Header: mono breadcrumb row "/WORK — FULL INDEX · 11 PROJECTS · 2023—2026", H1 "ALL WORK" (second word outlined), lede. Three category sections — **(A) Academic (2)**, **(B) Freelance (9)**, **(C) Personal (0)** — as hairline rows: index · 168px 16:10 striped thumbnail (shot-count or "REPO ONLY" label) · title H3 + description + meta/tech mono lines (+ GITHUB ↗ external link on academic items). Row hover: padding-left 22px. Rows are buttons (Enter/Space too) opening the **gallery lightbox**: fixed overlay (`rgba(10,11,16,.94)` + 14px blur), title + ESC ✕, 16:9 placeholder frame (angle shifts per shot), tech line, `0N / 0M` counter, ← PREV / NEXT → buttons; keyboard ← → Esc; body scroll locked. Galleries are placeholders — real screenshots drop in per project (counts in data). Personal = empty state card: "More *coming soon*" + mono line, radial accent glow.
Project data (titles, roles, dates, descriptions, tech, gallery counts, GitHub URLs) lives in the logic class of `Projects v2.dc.html` — port verbatim.

### 3. Credentials (`Certificates v2.dc.html` → `app/certificates/page.tsx`)
Header: "/CREDENTIALS · 06 CERTIFICATIONS · 2023—2026", H1 "PROOF OF PRACTICE" (outlined second word). Six rows, grid `44px 1fr auto`: accent index · title H3 `clamp(21px,2.8vw,32px)` + issuer in Instrument Serif italic · year mono right. Hover padding-left shift. Data: Azure AI Fundamentals (ULAP.org/Jonah Andersson Tech, 2026), Java Fundamentals (Oracle, Jan 2023), Java Fundamentals 2 (Oracle, Jun 2023), Systems Administration (STI Balagtas/LPI, Jun 2023), 11th TOPCIT (Nov 2024), 13th TOPCIT (Nov 2025).

## Interactions & Behavior (site-wide)
- **Route transitions**: prototype fades page out (opacity 0, translateY -12px, 260ms) before navigation; in Next.js use Framer Motion `AnimatePresence` around route children (exit 260ms, enter with rise).
- **Scroll reveals**: elements fade/rise 30px, 0.9s expo-out, staggered 60–240ms, triggered ~12% into viewport, once. Above-fold content never hidden.
- **Custom cursor**: 6px accent dot (instant) + 34px ring (lerp 0.16 follow); ring grows to 54px + solid accent over links/buttons. Desktop pointer:fine only.
- **Magnetic buttons** (`data-magnet` in prototype): translate toward cursor ×0.18/×0.3, spring back on leave.
- **⌘K command palette** (all pages): ⌘K/Ctrl+K or nav button; fuzzy filter input; actions = page nav, section jumps, copy email, download CV, GitHub, LinkedIn; ↑↓/Enter/Esc; hover selects. → build with cmdk or Magic UI equivalent.
- **Live clock**: Asia/Manila HH:mm, 30s interval.
- **Accessibility/perf**: ALL motion (reveals, cursor, magnetic, parallax, marquees) disabled under `prefers-reduced-motion`; lightbox rows keyboard-operable (`role="button"`, tabIndex, Enter/Space); marquees use transform loops only; animations must not block interaction.

## State Management
- Home: `ws` (active split-scroll index), `copied`, palette `{open, query, selectedIndex}`.
- Projects: lightbox `{openSlug, shotIndex}` + palette state; body overflow lock while open.
- No data fetching — all content static.

## Assets
- Fonts: Google Fonts (Archivo, Instrument Serif, Geist Mono).
- Tech logos: `https://cdn.simpleicons.org/<slug>/8b8f9a` (slugs in the HTML; self-host or use `simple-icons` npm in production).
- Grain: inline SVG feTurbulence data-URI (in each file's `<style>`).
- `cv.pdf` — real resume; wire to DOWNLOAD CV button + palette action.
- Project gallery images: NOT included — placeholders with per-project counts; request real captures.

## Files
- `PROMPT.md` — paste-ready prompt for Claude Code
- `Home v2.dc.html` — home page reference
- `Projects v2.dc.html` — work index + lightbox reference
- `Certificates v2.dc.html` — credentials reference
- `cv.pdf` — resume for the download action
- `screenshots/` — visual ground truth: home (hero, what-i-do, split-scroll active state, ⌘K palette open, contact), projects (header, freelance rows, lightbox open, personal empty state), certificates (header, rows). Note: the film-grain overlay doesn't render in these exports — it IS in the reference HTML/CSS.
