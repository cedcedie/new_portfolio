"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Word-by-word scroll reveal.
 *
 * Magic UI's TextReveal hard-codes `h-[200vh]`, a sticky centre block and its
 * own bold sans type scale — dropping it into a styled pull-quote would force
 * the section to 200vh and override the serif treatment. This keeps the same
 * effect but inherits whatever typography it's placed in.
 */
export default function WordReveal({
  children,
  style,
  className,
}: {
  children: string;
  style?: CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.35"],
  });

  const words = children.split(" ");

  if (reduced) {
    return (
      <p ref={ref} style={style} className={className}>
        {children}
      </p>
    );
  }

  return (
    <p ref={ref} style={style} className={className}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  );
}
