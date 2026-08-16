"use client";

import { useEffect, useState } from "react";
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
/** Extra columns beyond the viewport, so the rotation never exposes an edge. */
const OVERSCAN = 2;

function brand(slug: string) {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  return (si as unknown as Record<string, { path: string; hex: string }>)[key];
}

function LogoTile({ slug, name }: { slug: string; name: string }) {
  const icon = brand(slug);
  if (!icon) return null;

  return (
    <figure className="bg-panel/90 relative flex w-62 flex-col items-center gap-4 rounded-xs border border-white/10 px-7 py-9">
      <svg
        role="img"
        aria-hidden="true"
        viewBox="0 0 24 24"
        width={54}
        height={54}
        fill={`#${icon.hex}`}
        className="block shrink-0"
      >
        <path d={icon.path} />
      </svg>
      <figcaption className="text-muted font-mono text-[11px] tracking-[.14em] whitespace-nowrap">
        {name}
      </figcaption>
    </figure>
  );
}

export default function StackMarquee3D() {
  // Start at a sensible desktop count; corrected on mount before paint.
  const [columnCount, setColumnCount] = useState(8);

  useEffect(() => {
    const measure = () =>
      setColumnCount(
        Math.max(4, Math.ceil(window.innerWidth / COLUMN_WIDTH) + OVERSCAN),
      );
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Each column gets a rotated copy of the full stack, offset by a stride that
  // shares no factor with the list length. That keeps every column the same
  // height while making neighbours (and vertical repeats) land on different
  // logos — slicing by modulo instead starves columns once columnCount > 18.
  const columns = Array.from({ length: columnCount }, (_, col) => {
    const start = (col * 7) % stackList.length;
    return [...stackList.slice(start), ...stackList.slice(0, start)];
  });

  return (
    <div className="absolute inset-0 overflow-hidden [perspective:900px]">
      {/* Sized larger than the container (not scaled) so the tilt never shows
          an edge — upscaling a rasterised 3D layer is what made this blurry. */}
      <div
        className="absolute -inset-[18%] flex origin-center flex-row items-center justify-center gap-4"
        style={{
          transform: "rotateX(12deg) rotateY(-12deg) rotateZ(12deg)",
        }}
      >
        {columns.map((col, i) => (
          <Marquee
            key={i}
            vertical
            reverse={i % 2 === 1}
            className="[--gap:1rem] p-0 [&>div]:[animation-duration:38s]"
          >
            {col.map((t) => (
              <LogoTile key={t.s} slug={t.s} name={t.n} />
            ))}
          </Marquee>
        ))}
      </div>

      {/* Symmetric edge fades — the grid dissolves into the page on all sides
          so the band has no hard boundary. */}
      <div className="from-bg pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b to-transparent" />
      <div className="from-bg pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t to-transparent" />
      <div className="from-bg pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-linear-to-r to-transparent" />
      <div className="from-bg pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-linear-to-l to-transparent" />
    </div>
  );
}
