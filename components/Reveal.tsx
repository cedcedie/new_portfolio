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
 * Above-fold content is never hidden (reference skips elements already
 * above 85% of the viewport on mount).
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
  // useEntranceMotion(), not useReducedMotion() directly: the latter starts
  // as a placeholder (`true`) before the real preference is known, and once
  // it flips to the real value this effect re-runs — for content that was
  // already showing (the placeholder skipped the animation entirely), that
  // re-run calls gsap.set(el,{opacity:0,y:30}) and replays the reveal from
  // scratch, a visible flicker. The frozen value settles once and doesn't
  // retrigger this effect a second time.
  const reduced = useEntranceMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    // Above-the-fold content stays visible — never animate it in.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return;

    gsap.set(el, { opacity: 0, y: 30 });
    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      delay: delay / 1000,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
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
