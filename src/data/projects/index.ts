import type { Project } from "./types";

// Use Vite's glob to eagerly import all project files under items/
// Each item should default-export a Project
// Import each project's exported module from its folder `items/<id>/index.ts`
const modules = import.meta.glob('./items/*/index.ts', { eager: true }) as Record<string, any>;

// Build projects array while preserving the import path so we can infer ids from folder names
const projects: Project[] = Object.entries(modules)
  .map(([path, m]) => {
    const p = m.default ?? m.project;
    if (!p) return null;
    // infer id from import path if not provided in the project object
    const match = String(path).match(/\.\/items\/([^/]+)\/index\.ts$/);
    if (match) {
      p.id = p.id ?? match[1];
    }
    return p;
  })
  .filter(Boolean) as Project[];

// Load markdown content files (raw) and attach to matching project by id
// Use Vite's supported `as: 'raw'` option to get the file contents as strings.
const contentModules = import.meta.glob('./items/*/content.md', { eager: true, as: 'raw' }) as Record<string, string>;
const contentById: Record<string, string> = {};
for (const path in contentModules) {
  // path example: './items/lr-few-shot/content.md'
  const match = path.match(/\.\/items\/([^/]+)\/content\.md$/);
  if (match) {
    contentById[match[1]] = contentModules[path];
  }
}

for (const p of projects) {
  if (!p.content && p.id && contentById[p.id]) {
    p.content = contentById[p.id];
  }
}

// Compute a sortable year value from the new `when` field.
// Rules:
// - If when.end === '?' treat as ongoing -> return a very large value so it sorts first.
// - Otherwise try to extract a 4-digit year from when.end; if missing, fall back to when.start.
// - For backwards compatibility, if no `when` is present, fall back to the old `year` field.
const parseWhenSortValue = (p?: { when?: { start?: string; end?: string }; year?: string | number }) => {
  const when = p?.when;
  const extractYear = (s?: string) => {
    if (!s) return 0;
    const m = String(s).match(/(\d{4})/);
    if (m) return parseInt(m[1], 10);
    return 0;
  };

  if (!when) {
    // backwards compatibility: try old year field
    const year = p?.year;
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

export const getProjects = () =>
  // Return a copy sorted by most-recent end year (ongoing first).
  [...projects].sort((a, b) => parseWhenSortValue(b) - parseWhenSortValue(a));

export const getFeaturedProjects = () =>
  projects
    .filter((p) => p.featured)
    .slice()
    .sort((a, b) => parseWhenSortValue(b) - parseWhenSortValue(a));
export const getProjectById = (id: string) => projects.find((p) => p.id === id);

// Named export for backwards compatibility
export { projects };

export type { Project, ProjectMediaItem } from './types';
export default projects;
