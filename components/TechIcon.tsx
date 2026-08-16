import * as si from "simple-icons";

/** Simple Icons slug -> exported icon name, e.g. "nextdotjs" -> siNextdotjs. */
function iconFor(slug: string) {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  return (si as unknown as Record<string, { path: string; title: string }>)[key];
}

/** Tech logo, self-hosted (no CDN). Defaults to the #8b8f9a spec tint. */
export default function TechIcon({
  slug,
  size = 19,
  tint = "#8b8f9a",
}: {
  slug: string;
  size?: number;
  tint?: string;
}) {
  const icon = iconFor(slug);
  if (!icon) return null;

  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={tint}
      style={{ display: "block", flex: "none" }}
    >
      <path d={icon.path} />
    </svg>
  );
}
