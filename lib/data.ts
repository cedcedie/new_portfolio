// Content ported verbatim from the .dc.html reference logic classes.

export const EMAIL = "cedricjamesbulan@gmail.com";
export const PHONE = "+63 961 622 5451";
export const GITHUB_URL = "https://github.com/cedcedie";
export const LINKEDIN_URL = "https://linkedin.com/in/cydricjames";
export const CV_URL = "/cv.pdf";

export type Shot = { src: string; type: "image" | "video" };

export type Project = {
  slug: string;
  title: string;
  meta: string;
  desc: string;
  tech: string[];
  /** Number of gallery shots. 0 = repo only (no captures). */
  gallery: number;
  /** Real captures, in display order. Empty = repo only. */
  shots: Shot[];
  /** Cover thumbnail for the index row. */
  cover?: string;
  github?: string;
};

/** Build `/projects/<dir>/<dir>-<n>.<ext>` for n = 1..count. */
const gal = (dir: string, count: number, ext = "png"): Shot[] =>
  Array.from({ length: count }, (_, i) => ({
    src: `/projects/${dir}/${dir}-${i + 1}.${ext}`,
    type: "image" as const,
  }));

const vid = (src: string): Shot => ({ src, type: "video" });

export const academic: Project[] = [
  {
    slug: "case-no-zero",
    title: "Case No. Zero: A Philippine Legal Crime Narrative",
    meta: "CAPSTONE · TEAM LEAD & LEAD DEV · DEC 2025",
    desc: "Built all three core systems — investigation, dialogue, courtroom — simulating Philippine legal investigation and trial procedure.",
    tech: ["GODOT", "GDSCRIPT"],
    gallery: 8,
    shots: gal("case-zero", 8),
    cover: "/projects/case-zero/case-zero-3.png",
    github: "https://github.com/cedcedie/capstone-game-case-no-zero",
  },
  {
    slug: "library-monitoring",
    title: "Library Attendance & Circulation Monitoring",
    meta: "TEAM LEAD · 2024",
    desc: "Led a 4-person team building a web library system: dashboards, auth, attendance logs, circulation tracking.",
    tech: ["PHP", "JAVASCRIPT", "HTML/CSS"],
    gallery: 1,
    shots: gal("library", 1),
    cover: "/projects/library/library-1.png",
    github:
      "https://github.com/cedcedie/Library-Attendance-And-Circulation-Monitoring",
  },
];

export const freelance: Project[] = [
  {
    slug: "lms-science-ar",
    title: "LMS: Science with AR",
    meta: "SOLO DEVELOPER · MAR 2026",
    desc: "AR-integrated LMS for Grade 7 Science (MATATAG curriculum) — 24 interactive 3D models across atoms, cells, and states of matter.",
    tech: ["UNITY", "VUFORIA", "BLENDER", "REACT", "FIREBASE"],
    gallery: 11,
    shots: gal("ar-lms", 11),
    cover: "/projects/ar-lms/ar-lms-10.png",
  },
  {
    slug: "hydrolar-dashboard",
    title: "Hydrolar — Energy Storage Dashboard",
    meta: "SOLO DEVELOPER · 2026",
    desc: "Mobile-first battery and energy monitoring dashboard with interactive charts and a weather-aware install-safety view.",
    tech: ["REACT", "VITE", "TAILWIND", "RECHARTS"],
    gallery: 7,
    shots: gal("hydrolar", 7),
    cover: "/projects/hydrolar/hydrolar-1.png",
  },
  {
    slug: "cafe-web",
    title: "Cafe Management System (Web)",
    meta: "WEB DEVELOPER · 2026",
    desc: "Web-based cafe management for a client: orders, deliveries, printable receipts, PostgreSQL-backed admin dashboard.",
    tech: ["JAVASCRIPT", "HTML/CSS", "POSTGRESQL"],
    gallery: 6,
    shots: gal("cafe-web", 6),
    cover: "/projects/cafe-web/cafe-web-5.png",
  },
  {
    slug: "heri-threads",
    title: "Heri-Threads",
    meta: "WEB DEVELOPER · 2026",
    desc: "Cultural showcase of Ifugao dances and traditional attire, built on the TALL stack.",
    tech: ["LARAVEL", "LIVEWIRE", "ALPINE.JS", "TAILWIND"],
    gallery: 9,
    shots: gal("heri-threads", 9),
    cover: "/projects/heri-threads/heri-threads-1.png",
  },
  {
    slug: "cafe-web-mobile",
    title: "Cafe Management System (Web & Mobile)",
    meta: "FULL-STACK DEVELOPER · 2026",
    desc: "Native Android ordering app + real-time web admin dashboard — Node/Express REST API, Socket.IO live updates, MongoDB storage.",
    tech: ["KOTLIN", "NODE.JS", "EXPRESS", "MONGODB", "SOCKET.IO"],
    gallery: 11,
    shots: gal("cafe-mobile", 11, "jpg"),
    cover: "/projects/cafe-mobile/cafe-mobile-2.jpg",
  },
  {
    slug: "disaster-ranger",
    title: "Disaster Ranger",
    meta: "GAME DEVELOPER · 2025",
    desc: "2D disaster-preparedness game for elementary schools, in hand-drawn pixel art.",
    tech: ["GODOT", "GDSCRIPT", "ASEPRITE"],
    gallery: 9,
    shots: gal("disaster-ranger", 9),
    cover: "/projects/disaster-ranger/disaster-ranger-1.png",
  },
  {
    slug: "brick-breaker",
    title: "Brick Breaker",
    meta: "GAME DEVELOPER · 2025",
    desc: "Polished arcade brick-breaker with hand-designed levels and responsive paddle physics.",
    tech: ["GODOT", "GDSCRIPT"],
    gallery: 3,
    shots: [
      ...gal("brick-breaker", 1),
      vid("/projects/brick-breaker/brick-breaker-vid-1.mp4"),
      vid("/projects/brick-breaker/brick-breaker-vid-2.mp4"),
    ],
    cover: "/projects/brick-breaker/brick-breaker-1.png",
  },
  {
    slug: "germ-buster",
    title: "Germ Buster",
    meta: "GAME DEVELOPER · 2026",
    desc: "Educational game teaching hygiene and germ awareness.",
    tech: ["GODOT", "GDSCRIPT", "ASEPRITE"],
    gallery: 3,
    shots: gal("germ-buster", 3),
    cover: "/projects/germ-buster/germ-buster-1.png",
  },
  {
    slug: "rock-paper-scissors",
    title: "Rock Paper Scissors",
    meta: "GAME DEVELOPER · 2025",
    desc: "Fast-paced RPS with animated showdowns and score tracking.",
    tech: ["GODOT", "GDSCRIPT"],
    gallery: 4,
    shots: [
      { src: "/projects/rps/rps-1.png", type: "image" },
      { src: "/projects/rps/rps-2.jpg", type: "image" },
      { src: "/projects/rps/rps-3.jpg", type: "image" },
      vid("/projects/rps/rps-vid-1.mp4"),
    ],
    cover: "/projects/rps/rps-1.png",
  },
];

export const allProjects: Project[] = [...academic, ...freelance];

/** Home "Selected work" split-scroll chapters. */
export const featured = [
  {
    slug: "case-no-zero",
    shots: "08 SHOTS",
    tech: "GODOT / GDSCRIPT",
    meta: "01 — CAPSTONE · TEAM LEAD · DEC 2025",
    title: "Case No. Zero",
    desc: "A Philippine legal crime narrative — built all three core systems: investigation, dialogue, courtroom.",
    techLine: "GODOT / GDSCRIPT",
  },
  {
    slug: "lms-science-ar",
    shots: "11 SHOTS",
    tech: "UNITY / VUFORIA / REACT",
    meta: "02 — SOLO DEVELOPER · MAR 2026",
    title: "LMS: Science with AR",
    desc: "AR-integrated Grade 7 Science LMS — 24 interactive 3D models across atoms, cells, and states of matter.",
    techLine: "UNITY / VUFORIA / BLENDER / REACT / FIREBASE",
  },
  {
    slug: "hydrolar-dashboard",
    shots: "07 SHOTS",
    tech: "REACT / VITE / RECHARTS",
    meta: "03 — SOLO DEVELOPER · 2026",
    title: "Hydrolar",
    desc: "Mobile-first energy storage dashboard — interactive charts and a weather-aware install-safety view.",
    techLine: "REACT / VITE / TAILWIND / RECHARTS",
  },
  {
    slug: "cafe-web-mobile",
    shots: "11 SHOTS",
    tech: "KOTLIN / NODE / MONGODB",
    meta: "04 — FULL-STACK · 2026",
    title: "Cafe System — Web & Mobile",
    desc: "Native Android ordering app + real-time web admin dashboard over Socket.IO live updates.",
    techLine: "KOTLIN / NODE.JS / EXPRESS / MONGODB",
  },
];

/** Logo marquee — Simple Icons slugs, tinted #8b8f9a. */
export const stackList = [
  { n: "JAVASCRIPT", s: "javascript" },
  { n: "TYPESCRIPT", s: "typescript" },
  { n: "PYTHON", s: "python" },
  { n: "PHP", s: "php" },
  { n: "DART", s: "dart" },
  { n: "KOTLIN", s: "kotlin" },
  { n: "REACT", s: "react" },
  { n: "NEXT.JS", s: "nextdotjs" },
  { n: "FLUTTER", s: "flutter" },
  { n: "TAILWIND", s: "tailwindcss" },
  { n: "UNITY", s: "unity" },
  { n: "GODOT", s: "godotengine" },
  { n: "BLENDER", s: "blender" },
  { n: "POSTGRESQL", s: "postgresql" },
  { n: "MONGODB", s: "mongodb" },
  { n: "FIREBASE", s: "firebase" },
  { n: "SOCKET.IO", s: "socketdotio" },
  { n: "GIT", s: "git" },
];

export const certificates = [
  {
    idx: "01",
    title: "Azure AI Fundamentals Crash Course",
    issuer: "ULAP.org / Jonah Andersson Tech",
    year: "2026",
  },
  {
    idx: "02",
    title: "Java Fundamentals",
    issuer: "Oracle Academy",
    year: "JAN 2023",
  },
  {
    idx: "03",
    title: "Java Fundamentals 2",
    issuer: "Oracle Academy",
    year: "JUN 2023",
  },
  {
    idx: "04",
    title: "Systems Administration",
    issuer: "STI Balagtas / Linux Professional Institute",
    year: "JUN 2023",
  },
  {
    idx: "05",
    title: "11th TOPCIT Certificate",
    issuer: "Test of Practical Competency in IT",
    year: "NOV 2024",
  },
  {
    idx: "06",
    title: "13th TOPCIT Certificate",
    issuer: "Test of Practical Competency in IT",
    year: "NOV 2025",
  },
];
