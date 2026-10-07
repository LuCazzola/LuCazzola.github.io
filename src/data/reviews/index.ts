import type { Review } from "./types";

const modules = import.meta.glob('./items/*/index.ts', { eager: true }) as Record<string, any>;

// Build reviews array, infer ids from folder name, newest first
const reviews: Review[] = Object.entries(modules)
  .map(([path, m]) => {
    const r = m.default ?? m.review;
    if (!r) return null;
    const match = String(path).match(/\.\/items\/([^/]+)\/index\.ts$/);
    if (match) r.id = r.id ?? match[1];
    return r;
  })
  .filter(Boolean)
  .sort((a, b) => Number(b.year) - Number(a.year)) as Review[];

export const getReviews = () => reviews;

export type { Review };
export default reviews;
