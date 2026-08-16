"use client";

import { useEffect } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * 6px accent dot (instant) + 34px ring (lerp .16). Ring grows to 54px and
 * goes solid accent over links/buttons. Desktop pointer:fine only.
 */
export default function CustomCursor() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer:fine)").matches) return;

    const dot = document.createElement("div");
    dot.style.cssText =
      "position:fixed;top:0;left:0;width:6px;height:6px;border-radius:50%;background:#6672ff;z-index:200;pointer-events:none;transform:translate(-50%,-50%)";
    const ring = document.createElement("div");
    ring.style.cssText =
      "position:fixed;top:0;left:0;width:34px;height:34px;border-radius:50%;border:1px solid rgba(102,114,255,.4);z-index:200;pointer-events:none;transform:translate(-50%,-50%);transition:width .25s,height .25s,border-color .25s";
    document.body.append(dot, ring);

    let mx = innerWidth / 2;
    let my = innerHeight / 2;
    let rx = mx;
    let ry = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
      const target = e.target as Element | null;
      const on = !!target?.closest?.("a,button,[role=button]");
      ring.style.width = ring.style.height = on ? "54px" : "34px";
      ring.style.borderColor = on ? "#6672ff" : "rgba(102,114,255,.4)";
    };
    addEventListener("mousemove", onMove);

    let raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      dot.remove();
      ring.remove();
    };
  }, [reduced]);

  return null;
}
