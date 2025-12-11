// Per-publication item aggregator
// Loads `items/*/index.ts` modules (which default-export a publication metadata object)
// and attaches `content.md` (raw) into the `content` field when present.

export type Publication = {
  /** Optional at source; loader will infer the id from the parent folder name when missing. */
  id?: string;
  title: string;
  // List of author tuples: [displayName, optionalLink]
  // Example: [["L. Cazzola", "https://scholar.google.com/"], ["A. Alboody"]]
  authors: Array<[string, string?]>;
  // Optional affiliation text shown below the authors (e.g. "University X; Company Y")
  affiliations?: string;
  venue?: string;
  year?: string;
  pdf?: string;
  arxiv?: string;
  code?: string;
  image?: string;
  media?: Array<{ type: "image" | "video" | "embed"; src: string; caption?: string }>;
  supplementary?: string;
  tags?: string[];
  abstract?: string;
  content?: string;
};

// Import all item modules (each should export default Publication)
const modules = import.meta.glob('./items/*/index.ts', { eager: true }) as Record<string, any>;

// Build publications array while keeping the import path so we can infer ids from folder names
const publications: Publication[] = Object.entries(modules)
  .map(([path, m]) => {
    const p = m.default ?? m.publication;
    if (!p) return null;
    const match = String(path).match(/\.\/items\/([^/]+)\/index\.ts$/);
    if (match) p.id = p.id ?? match[1];
    return p;
  })
  .filter(Boolean) as Publication[];

// Load raw markdown content files and map by id
const contentModules = import.meta.glob('./items/*/content.md', { eager: true, as: 'raw' }) as Record<string, string>;
const contentById: Record<string, string> = {};
for (const path in contentModules) {
  const match = path.match(/\.\/items\/([^/]+)\/content\.md$/);
  if (match) contentById[match[1]] = contentModules[path];
}

for (const p of publications) {
  if (!p.content && p.id && contentById[p.id]) {
    p.content = contentById[p.id];
  }
}

export function getPublications() {
  return publications;
}

export function getPublicationById(id: string) {
  return publications.find((p) => p.id === id) ?? null;
}

// backward-compatible default export
export default publications;

