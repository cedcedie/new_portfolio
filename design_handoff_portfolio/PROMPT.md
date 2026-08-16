# Paste this prompt into Claude Code

---

Implement the portfolio described in `design_handoff_portfolio/README.md` as a production Next.js site.

Ground rules:
1. The `.dc.html` files in `design_handoff_portfolio/` are the source of truth. Open and READ them — every exact hex, font, size, letter-spacing, easing curve, and the working interaction logic is in their markup, inline styles, and the `<script>` logic class at the bottom of each file. Match them exactly; the `screenshots/` folder is visual ground truth to compare against.
2. Stack: Next.js (latest, App Router) + Tailwind CSS + Framer Motion (route transitions via AnimatePresence, micro-interactions, staggered reveals) + GSAP ScrollTrigger (split-scroll pinning on the home "Selected work" section, scroll reveals, hero parallax) + `cmdk` (or Magic UI equivalent) for the ⌘K palette + Magic UI Marquee for the two marquees + lucide-react for UI icons + `simple-icons` for tech logos (tinted #8b8f9a).
3. Routes: `/` from `Home v2.dc.html`, `/projects` from `Projects v2.dc.html`, `/certificates` from `Certificates v2.dc.html`. Shared persistent nav + footer components. Serve `cv.pdf` from `/public` and wire it to the DOWNLOAD CV button and the palette action.
4. Fonts via `next/font/google`: Archivo (400–700), Instrument Serif (italic 400), Geist Mono (400/500).
5. Recreate ALL interactions listed in the README: masked hero line-reveal, scroll reveals (0.9s cubic-bezier(.16,1,.3,1), staggered, once), sticky split-scroll with swapping preview panel, gallery lightbox with keyboard nav and scroll lock, ⌘K command palette, custom cursor dot+ring (pointer:fine only), magnetic buttons, scroll-progress bar, scroll-spy index, live Asia/Manila clock, film-grain overlay, both marquees, 260ms route transitions.
6. Accessibility/perf are non-negotiable: everything animated must respect `prefers-reduced-motion`; lightbox rows keyboard-operable; no layout-shifting animations; keep Lighthouse strong (transform/opacity only, passive scroll listeners).
7. Content is final — copy all text, dates, tech lists, gallery counts, and links verbatim from the reference files. Do not invent content. Project gallery images are placeholders for now; build the lightbox to accept N real images per project later.
8. Work section by section, and after each one compare against the reference HTML and screenshots before moving on.

Start by reading `design_handoff_portfolio/README.md`, then scaffold the app, then build in this order: layout/nav/footer → home hero → home sections → projects index + lightbox → certificates → palette + cursor + polish.
