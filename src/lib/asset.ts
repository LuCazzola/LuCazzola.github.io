export function asset(path: string | undefined) {
  if (!path) return path;
  if (path.startsWith("http")) return path; // URLs should stay unchanged
  
  const base = import.meta.env.BASE_URL ?? "/";
  
  // Normalize input (remove leading slashes, add assets/ prefix)
  let p = path.replace(/^\/+/, "assets/");
  // Remove trailing slash from base if present
  const baseClean = base === "/" ? "" : base.replace(/\/$/, "");
  // Concatenate base and normalized path
  return `${baseClean}/${p}`;
}
