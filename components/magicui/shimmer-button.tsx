import React, {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
} from "react";

import { cn } from "@/lib/utils";

/**
 * Magic UI's Shimmer Button (see magicui.design/docs/components/shimmer-button),
 * with one addition: an `as` prop so it can render as Next's `Link` — the
 * upstream version is `<button>`-only, but the hero CTA needs real navigation.
 * Replaces the hero's flat-hover CTA — a light travels the border on a loop
 * instead of a hover-only colour swap, so the button reads as alive even at rest.
 */
export type ShimmerButtonProps<C extends ElementType = "button"> = {
  as?: C;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
} & Omit<
  ComponentPropsWithoutRef<C>,
  | "as"
  | "shimmerColor"
  | "shimmerSize"
  | "borderRadius"
  | "shimmerDuration"
  | "background"
  | "className"
  | "children"
>;

export function ShimmerButton<C extends ElementType = "button">({
  as,
  shimmerColor = "#ffffff",
  shimmerSize = "0.05em",
  shimmerDuration = "3s",
  borderRadius = "100px",
  background = "rgba(0, 0, 0, 1)",
  className,
  children,
  ...props
}: ShimmerButtonProps<C>) {
  const Comp = (as ?? "button") as ElementType;

  return (
    <Comp
      style={
        {
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
        } as CSSProperties
      }
      className={cn(
        "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)] border border-white/10 px-6 py-3 whitespace-nowrap text-white [background:var(--bg)]",
        "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
        className,
      )}
      {...props}
    >
      {/* spark container */}
      <div
        className={cn(
          "-z-30 blur-[2px]",
          "@container-[size] absolute inset-0 overflow-visible",
        )}
      >
        {/* spark */}
        <div className="animate-shimmer-slide absolute inset-0 aspect-[1] h-[100cqh] rounded-none [mask:none]">
          {/* spark before */}
          <div className="animate-spin-around absolute -inset-full w-auto [translate:0_0] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
        </div>
      </div>
      {children}

      {/* Highlight */}
      <div
        className={cn(
          "absolute inset-0 size-full",
          "rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]",
          "transform-gpu transition-all duration-300 ease-in-out",
          "group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",
          "group-active:shadow-[inset_0_-10px_10px_#ffffff3f]",
        )}
      />

      {/* backdrop */}
      <div
        className={cn(
          "absolute inset-(--cut) -z-20 [border-radius:var(--radius)] [background:var(--bg)]",
        )}
      />
    </Comp>
  );
}
