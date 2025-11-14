import type { Award } from "./types";

const modules = import.meta.glob('./items/*/index.ts', { eager: true }) as Record<string, any>;
const contentModules = import.meta.glob('./items/*/content.md', { eager: true, as: 'raw' }) as Record<string, string>;
const contentById: Record<string, string> = {};
for (const path in contentModules) {
  const match = path.match(/\.\/items\/([^/]+)\/content\.md$/);
  if (match) contentById[match[1]] = contentModules[path];
}

const extractYear = (s?: string) => {
  if (!s) return 0;
  const m = String(s).match(/(\d{4})/);
  return m ? parseInt(m[1], 10) : 0;
};

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

const parseWhenSortValue = (p?: { when?: { start?: string; end?: string } }) => {
  if (!p?.when) return 0;
  if (p.when.end === '?') return Number.MAX_SAFE_INTEGER;
  const y = extractYear(p.when.end) || extractYear(p.when.start);
  return y;
};

// Build awards array and infer ids from folder name when missing
const awards: Award[] = Object.entries(modules)
  .map(([path, m]) => {
    const a = m.default ?? m.award;
    if (!a) return null;
    const match = String(path).match(/\.\/items\/([^/]+)\/index\.ts$/);
    if (match) a.id = a.id ?? match[1];
    if (!a.period && a.when) {
      a.period = formatWhen(a.when);
    }
    return a;
  })
  .filter(Boolean) as Award[];

export const getAwards = () => [...awards].sort((a, b) => parseWhenSortValue(b) - parseWhenSortValue(a));
export const getFeaturedAwards = () => awards.filter((a) => a.featured).slice().sort((a, b) => parseWhenSortValue(b) - parseWhenSortValue(a));
export const getAwardById = (id: string) => awards.find((a) => a.id === id) ?? null;

for (const a of awards) {
  if (!a.content && a.id && contentById[a.id]) a.content = contentById[a.id];
}

export type { Award };
export default awards;
