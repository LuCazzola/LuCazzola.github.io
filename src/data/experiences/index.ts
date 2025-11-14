import type { Experience } from "./types";

// Load each experience item under items/*/index.ts
const modules = import.meta.glob('./items/*/index.ts', { eager: true }) as Record<string, any>;

// Load raw markdown content files and map by id
const contentModules = import.meta.glob('./items/*/content.md', { eager: true, as: 'raw' }) as Record<string, string>;
const contentById: Record<string, string> = {};
for (const path in contentModules) {
  const match = path.match(/\.\/items\/([^/]+)\/content\.md$/);
  if (match) contentById[match[1]] = contentModules[path];
}

// Helper: format a when object into a human-friendly period string
const formatWhen = (w?: { start?: string; end?: string }) => {
  if (!w) return '';
  const fmt = (s?: string) => {
    if (!s) return '';
    const m = String(s).match(/^(\d{4})-(\d{2})/);
    if (m) {
      const y = m[1];
      const mm = parseInt(m[2], 10);
      const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return `${monthNames[Math.max(0, Math.min(11, mm - 1))]} ${y}`;
    }
    return String(s);
  };
  if (w.end === '?') return `${fmt(w.start)} - Present`;
  return `${fmt(w.start)} - ${fmt(w.end)}`;
};

// Compute a sortable value from when similar to projects (ongoing => very large)
const parseWhenSortValue = (p?: { when?: { start?: string; end?: string }; year?: string | number }) => {
  const when = p?.when;
  const extractYear = (s?: string) => {
    if (!s) return 0;
    const m = String(s).match(/(\d{4})/);
    if (m) return parseInt(m[1], 10);
    return 0;
  };

  if (!when) {
    const year = (p as any)?.year;
    if (!year) return 0;
    if (typeof year === 'number') return Math.floor(year);
    const y = parseInt(String(year).slice(0, 4), 10);
    return Number.isFinite(y) ? y : 0;
  }
  if (when.end === '?') return Number.MAX_SAFE_INTEGER;
  const endYear = extractYear(when.end);
  if (endYear) return endYear;
  return extractYear(when.start);
};

// Build experiences array from modules and infer id from folder when missing
const experiences: Experience[] = Object.entries(modules)
  .map(([path, m]) => {
    const e = m.default ?? m.experience;
    if (!e) return null;
    const match = String(path).match(/\.\/items\/([^/]+)\/index\.ts$/);
    if (match) e.id = e.id ?? match[1];
    // synthesize a period string from when if missing
    if (!e.period && e.when) {
      e.period = formatWhen(e.when);
    }
    return e;
  })
  .filter(Boolean) as Experience[];

export const getExperiences = () =>
  [...experiences].sort((a, b) => parseWhenSortValue(b) - parseWhenSortValue(a));

export const getExperienceById = (id: string) => experiences.find((e) => e.id === id) ?? null;

// attach content if present
for (const e of experiences) {
  if (!e.content && e.id && contentById[e.id]) {
    e.content = contentById[e.id];
  }
}

export type { Experience };
export default experiences;
