"use client";

import { useEffect, useRef, useState } from "react";
import { Marquee } from "@/components/magicui/marquee";
import { stackList } from "@/lib/data";
import * as si from "simple-icons";

/**
 * Magic UI 3D Marquee as a full-bleed hero backdrop: columns of tech logos
 * tilted in perspective, running in alternating directions, faded to the page
 * colour on all four edges so it dissolves behind the headline.
 *
 * The column count is derived from the container width so the grid always
 * fills the hero at the same visual density, rather than simply revealing more
 * columns on wider screens. Nothing is scaled up — the tilted layer is sized
 * to overflow instead, which keeps the logos crisp.
 */

/** Target on-screen width of one column, including its gap. Wider columns =
 *  fewer, larger tiles, so the grid reads as logos rather than texture. */
const COLUMN_WIDTH = 300;
/** Same idea, sized for the mobile tile (see MOBILE_BREAKPOINT below). */
const COLUMN_WIDTH_MOBILE = 150;
/** Extra columns beyond the viewport, so the rotation never exposes an edge. */
const OVERSCAN = 2;
/** Matches the site's other `max-width: 900px` mobile rules. Below this, the
 * desktop tile (248px, w-62) barely fits one and a half columns on a phone
 * — the tilt then crops the grid down to a near-empty diagonal sliver
 * instead of a readable field of logos. */
const MOBILE_BREAKPOINT = 900;

function brand(slug: string) {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  return (si as unknown as Record<string, { path: string; hex: string }>)[key];
}

function LogoTile({
  slug,
  name,
  mobile,
}: {
  slug: string;
  name: string;
  mobile: boolean;
}) {
  const icon = brand(slug);
  if (!icon) return null;

  return (
    <figure
      className={
        mobile
          ? "bg-panel/90 relative flex w-31 flex-col items-center gap-2 rounded-xs border border-white/10 px-3 py-4"
          : "bg-panel/90 relative flex w-62 flex-col items-center gap-4 rounded-xs border border-white/10 px-7 py-9"
      }
    >
      <svg
        role="img"
        aria-hidden="true"
        viewBox="0 0 24 24"
        width={mobile ? 28 : 54}
        height={mobile ? 28 : 54}
        fill={`#${icon.hex}`}
        className="block shrink-0"
      >
        <path d={icon.path} />
      </svg>
      <figcaption
        className={
          mobile
            ? "text-muted font-mono text-[9px] tracking-[.1em] whitespace-nowrap"
            : "text-muted font-mono text-[11px] tracking-[.14em] whitespace-nowrap"
        }
      >
        {name}
      </figcaption>
    </figure>
  );
}

/** How far the tilt swings from the base angle as the cursor crosses the
 *  band, in degrees. Kept small — this is a tilt responding to you, not a
 *  3D toy flipping around. */
const TILT_RANGE = 5;

export default function StackMarquee3D() {
  // Start at a sensible desktop count; corrected on mount before paint.
  const [columnCount, setColumnCount] = useState(8);
  const [mobile, setMobile] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setMobile(isMobile);
      const colWidth = isMobile ? COLUMN_WIDTH_MOBILE : COLUMN_WIDTH;
      setColumnCount(Math.max(4, Math.ceil(window.innerWidth / colWidth) + OVERSCAN));
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Cursor-driven tilt, desktop only — a fixed 3D angle read as unearned
  // decoration; nudging rotateX/Y toward the pointer gives it something to
  // respond to. Mobile keeps its own static angle (no cursor to track).
  useEffect(() => {
    if (mobile) return;
    const root = rootRef.current;
    const tilt = tiltRef.current;
    if (!root || !tilt) return;

    const onMove = (e: MouseEvent) => {
      const r = root.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 .. 0.5
      const py = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.setProperty("--tilt-x", `${12 - py * TILT_RANGE * 2}deg`);
      tilt.style.setProperty("--tilt-y", `${-12 + px * TILT_RANGE * 2}deg`);
    };
    const onLeave = () => {
      tilt.style.setProperty("--tilt-x", "12deg");
      tilt.style.setProperty("--tilt-y", "-12deg");
    };

    root.addEventListener("mousemove", onMove, { passive: true });
    root.addEventListener("mouseleave", onLeave);
    return () => {
      root.removeEventListener("mousemove", onMove);
      root.removeEventListener("mouseleave", onLeave);
    };
  }, [mobile]);

  // Offset stride shares no factor with the list length, so neighbouring
  // columns land on different logos without starving columns past 18.
  const columns = Array.from({ length: columnCount }, (_, col) => {
    const start = (col * 7) % stackList.length;
    return [...stackList.slice(start), ...stackList.slice(0, start)];
  });

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 overflow-hidden [perspective:900px]"
    >
      {/* Sized larger than the container (not scaled) so the tilt never shows
          an edge — upscaling a rasterised 3D layer is what made this blurry.
          The full desktop tilt on a phone-width column set cropped the grid
          down to a near-empty diagonal sliver, so mobile gets a flatter
          angle — still reads as a tilted field, but leaves the columns
          actually visible instead of rotated mostly out of frame.
          Desktop's rotateX/Y read from --tilt-x/--tilt-y, nudged by the
          cursor-tracking effect above; the transition here is what turns
          those per-pixel updates into a smooth follow instead of a snap. */}
      <div
        ref={tiltRef}
        className={
          mobile
            ? "absolute -inset-[6%] flex origin-center flex-row items-center justify-center gap-4"
            : "absolute -inset-[18%] flex origin-center flex-row items-center justify-center gap-4 transition-transform duration-500 ease-out"
        }
        style={
          mobile
            ? { transform: "rotateX(8deg) rotateY(-8deg) rotateZ(6deg)" }
            : ({
                "--tilt-x": "12deg",
                "--tilt-y": "-12deg",
                transform:
                  "rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) rotateZ(12deg)",
              } as React.CSSProperties)
        }
      >
        {columns.map((col, i) => (
          <Marquee
            key={i}
            vertical
            reverse={i % 2 === 1}
            className="[--gap:1rem] p-0 [&>div]:[animation-duration:38s]"
          >
            {col.map((t) => (
              <LogoTile key={t.s} slug={t.s} name={t.n} mobile={mobile} />
            ))}
          </Marquee>
        ))}
      </div>

      {/* Symmetric edge fades — the grid dissolves into the page on all sides
          so the band has no hard boundary. w-1/5 per side (40% of the
          width) was tuned for desktop's wider column count; on a mobile
          viewport with fewer, smaller columns that same proportion ate most
          of the visible tiles, leaving what read as a mostly-empty box with
          logos only in the dead centre. A narrower fixed fade keeps more of
          the small columns sharp and visible on mobile specifically.

          Top/bottom fade is a different story: tiles scroll through
          continuously, so a tile is always mid-cut somewhere near the top
          and bottom edges at any given moment — that's true on desktop too,
          it's just hidden behind the taller h-1/4 fade against a taller
          section. Mobile's section is much shorter (380px vs 560px) while
          the fade stayed the same 25% share, so cropped tiles sat past the
          fade's edge and were visible mid-cut instead of hidden by it. A
          taller mobile fade covers the same amount of tile-height the
          desktop fade does, so no tile is ever visibly cropped either way. */}
      {/* z-10: the tilted layer above carries a 3D transform (rotateX/Y under
          a perspective parent), and a 3D-transformed element can render in
          front of later, untransformed siblings regardless of DOM order —
          the fades were painting behind the tiles instead of over them, so
          edge tiles showed a hard, unfaded crop instead of dissolving. An
          explicit stacking order makes the paint order match the DOM order
          again. */}
      <div
        className={
          mobile
            ? "from-bg pointer-events-none absolute inset-x-0 top-0 z-10 h-2/5 bg-linear-to-b to-transparent"
            : "from-bg pointer-events-none absolute inset-x-0 top-0 z-10 h-1/4 bg-linear-to-b to-transparent"
        }
      />
      <div
        className={
          mobile
            ? "from-bg pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/5 bg-linear-to-t to-transparent"
            : "from-bg pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/4 bg-linear-to-t to-transparent"
        }
      />
      <div
        className={
          mobile
            ? "from-bg pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r to-transparent"
            : "from-bg pointer-events-none absolute inset-y-0 left-0 z-10 w-1/5 bg-linear-to-r to-transparent"
        }
      />
      <div
        className={
          mobile
            ? "from-bg pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l to-transparent"
            : "from-bg pointer-events-none absolute inset-y-0 right-0 z-10 w-1/5 bg-linear-to-l to-transparent"
        }
      />
    </div>
  );
}
