"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";
import { EMAIL } from "@/lib/data";

const links = [
  { href: "/", label: "INDEX" },
  { href: "/projects", label: "WORK" },
  { href: "/certificates", label: "CREDENTIALS" },
];

/**
 * Floating nav — no bar, no backdrop, no border. Items sit directly on the
 * page. On scroll everything fades out except the wordmark, which stays as a
 * persistent home affordance; it all returns at the top or on scroll up.
 */
export default function Nav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  // Below 900px, .nv-links (INDEX/WORK/CREDENTIALS) is hidden by CSS with
  // nothing replacing it — mobile had no way to move between pages short of
  // the browser's back button. This panel is the replacement, mobile-only.
  const [menuOpen, setMenuOpen] = useState(false);
  // Reset during render (React's documented pattern for "state that should
  // reset when a prop changes"), not in an effect — an effect's setState
  // would commit the stale-open state for one frame, then force a second
  // render to close it.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    let lastY = window.scrollY;
    let busy = false;

    const onScroll = () => {
      if (busy) return;
      busy = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        // Always show near the top; otherwise hide going down, show going up.
        if (y < 90) setHidden(false);
        else if (y > lastY + 6) setHidden(true);
        else if (y < lastY - 6) setHidden(false);
        lastY = y;
        busy = false;
      });
    };

    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="nv" data-hidden={hidden ? "true" : undefined}>
      <Link href="/" className="nv-mark">
        Cydric Bulan<span>.</span>
      </Link>

      <div className="nv-group nv-links">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            data-active={pathname === l.href ? "true" : undefined}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <div className="nv-group nv-actions">
        <button
          type="button"
          className="nv-burger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span data-open={menuOpen ? "true" : undefined} />
          <span data-open={menuOpen ? "true" : undefined} />
        </button>
        <Magnetic>
          {pathname === "/" ? (
            <a
              href="#contact"
              className="nv-contact"
              onClick={(e) => {
                // No global smooth-scroll (it fights SelectedWork's pinned
                // scrub — see globals.css); animate this one jump instead.
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              CONTACT ↗
            </a>
          ) : (
            <a href={`mailto:${EMAIL}`} className="nv-contact">
              CONTACT ↗
            </a>
          )}
        </Magnetic>
      </div>

      {/* Mobile-only dropdown — CSS hides this whole block above 900px, same
          breakpoint .nv-links disappears at, so exactly one of the two is
          ever the way to reach another page. */}
      <div className="nv-mobile-menu" data-open={menuOpen ? "true" : undefined}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            data-active={pathname === l.href ? "true" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
