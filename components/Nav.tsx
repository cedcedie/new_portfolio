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
          title="Command menu"
          aria-label="Open command menu"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("open-command-palette"))
          }
          className="nv-cmd"
        >
          ⌘K
        </button>
        <Magnetic>
          <a
            href={pathname === "/" ? "#contact" : `mailto:${EMAIL}`}
            className="nv-contact"
          >
            CONTACT ↗
          </a>
        </Magnetic>
      </div>
    </nav>
  );
}
