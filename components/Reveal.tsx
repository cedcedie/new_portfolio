"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEntranceMotion } from "@/lib/useEntranceMotion";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  /** Stagger delay in ms — 60–240 across a section, matching the reference. */
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
  id?: string;
};

/**
 * Fade/rise 30px, 0.9s expo-out, once, triggered ~12% into the viewport.
 * Content already on screen at mount plays the same reveal immediately
 * (no ScrollTrigger needed — there's nothing to scroll to), staggered by
 * `delay` same as everything else; content below the fold waits for its
 * ScrollTrigger to fire as you scroll to it.
 */
export default function Reveal({
  delay = 0,
  as: Tag = "div",
  className,
  style,
  children,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  // useEntranceMotion(), not useReducedMotion() directly: the latter's
  // placeholder-then-real flip would re-run this effect and replay an
  // already-shown reveal from scratch — a visible flicker.
  const reduced = useEntranceMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const aboveFold = el.getBoundingClientRect().top < window.innerHeight * 0.85;

    gsap.set(el, { opacity: 0, y: 30 });
    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      delay: delay / 1000,
      ease: "expo.out",
      // Already-visible content plays immediately — its `top` never
      // crosses the 88% trigger line, so a ScrollTrigger would never fire.
      scrollTrigger: aboveFold
        ? undefined
        : { trigger: el, start: "top 88%", once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(el, { clearProps: "opacity,transform" });
    };
  }, [delay, reduced]);

  return (
    <Tag ref={ref} className={className} style={style} id={id}>
      {children}
    </Tag>
  );
}
