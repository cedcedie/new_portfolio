"use client";

import { Command } from "cmdk";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CV_URL, EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/data";

type Action = { label: string; hint: string; go: () => void };

const mono = "var(--font-geist-mono), monospace";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const jump = useCallback((hash: string) => {
    document
      .getElementById(hash)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const copyEmail = useCallback(() => {
    navigator.clipboard?.writeText(EMAIL);
    window.dispatchEvent(new CustomEvent("email-copied"));
  }, []);

  const actions = useMemo<Action[]>(() => {
    const pages: Action[] = [
      { label: "Go to Index", hint: "PAGE", go: () => router.push("/") },
      { label: "Go to Work index", hint: "PAGE", go: () => router.push("/projects") },
      {
        label: "Go to Credentials",
        hint: "PAGE",
        go: () => router.push("/certificates"),
      },
    ].filter((a) => {
      if (pathname === "/") return a.label !== "Go to Index";
      if (pathname === "/projects") return a.label !== "Go to Work index";
      if (pathname === "/certificates") return a.label !== "Go to Credentials";
      return true;
    });

    const sections: Action[] =
      pathname === "/"
        ? [
            { label: "Jump to About", hint: "SECTION", go: () => jump("about") },
            { label: "Jump to What I do", hint: "SECTION", go: () => jump("stack") },
            {
              label: "Jump to Tech stack",
              hint: "SECTION",
              go: () => jump("stack-3d"),
            },
            {
              label: "Jump to GitHub activity",
              hint: "SECTION",
              go: () => jump("github"),
            },
            {
              label: "Jump to Experience",
              hint: "SECTION",
              go: () => jump("experience"),
            },
            {
              label: "Jump to Selected work",
              hint: "SECTION",
              go: () => jump("work"),
            },
            { label: "Jump to Contact", hint: "SECTION", go: () => jump("contact") },
          ]
        : pathname === "/projects"
          ? [
              {
                label: "Jump to Personal",
                hint: "SECTION",
                go: () => jump("personal"),
              },
              {
                label: "Jump to Freelance",
                hint: "SECTION",
                go: () => jump("freelance"),
              },
              {
                label: "Jump to Academic",
                hint: "SECTION",
                go: () => jump("academic"),
              },
            ]
          : [];

    return [
      ...pages,
      ...sections,
      { label: "Copy email address", hint: "ACTION", go: copyEmail },
      {
        label: "Download CV",
        hint: "ACTION",
        go: () => window.open(CV_URL, "_blank"),
      },
      {
        label: "Open GitHub",
        hint: "LINK",
        go: () => window.open(GITHUB_URL, "_blank"),
      },
      {
        label: "Open LinkedIn",
        hint: "LINK",
        go: () => window.open(LINKEDIN_URL, "_blank"),
      },
    ];
  }, [pathname, router, jump, copyEmail]);

  const run = (a: Action) => {
    setOpen(false);
    a.go();
  };

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 120,
        background: "rgba(10,11,16,.8)",
        backdropFilter: "blur(8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "14vh 24px 24px",
        animation: "fadein .2s ease both",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(560px,100%)",
          background: "#0e0f15",
          border: "1px solid rgba(255,255,255,.12)",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 40px 120px rgba(0,0,0,.6)",
        }}
      >
        <Command
          loop
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          <Command.Input
            value={query}
            onValueChange={setQuery}
            autoFocus
            placeholder="Type a command…"
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#eaeaf0",
              fontFamily: mono,
              fontSize: 14,
              letterSpacing: ".04em",
              padding: "18px 20px",
              borderBottom: "1px solid rgba(255,255,255,.08)",
            }}
          />
          <Command.List
            style={{ maxHeight: 320, overflow: "auto", padding: 8 }}
          >
            <Command.Empty
              style={{
                padding: "16px 14px",
                color: "#575c6b",
                fontFamily: mono,
                fontSize: 11,
                letterSpacing: ".1em",
              }}
            >
              NO MATCHES
            </Command.Empty>
            {actions.map((a) => (
              <Command.Item
                key={a.label}
                value={a.label}
                onSelect={() => run(a)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  padding: "12px 14px",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 14 }}>{a.label}</span>
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 9.5,
                    letterSpacing: ".14em",
                    color: "#575c6b",
                  }}
                >
                  {a.hint}
                </span>
              </Command.Item>
            ))}
          </Command.List>
        </Command>
        <div
          style={{
            display: "flex",
            gap: 18,
            padding: "12px 20px",
            borderTop: "1px solid rgba(255,255,255,.08)",
            fontFamily: mono,
            fontSize: 9.5,
            letterSpacing: ".12em",
            color: "#575c6b",
          }}
        >
          <span>↑↓ NAVIGATE</span>
          <span>↵ SELECT</span>
          <span>ESC CLOSE</span>
        </div>
      </div>
    </div>
  );
}
