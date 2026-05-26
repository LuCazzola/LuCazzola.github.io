export type Publication = {
  id?: string;
  /** Display order — lower numbers appear first */
  order?: number;
  title: string;
  authors: Array<[string, string?]>;
  affiliations?: string;
  venue?: string;
  year?: string;
  arxiv?: string;
  code?: string;
  image?: string;
  tags?: string[];
  abstract?: string;
  /** External page URL — links the card to a dedicated publication website */
  pageUrl?: string;
};

const modules = import.meta.glob('./items/*/index.ts', { eager: true }) as Record<string, any>;

const publications: Publication[] = Object.entries(modules)
  .map(([path, m]) => {
    const p = m.default ?? m.publication;
    if (!p) return null;
    const match = String(path).match(/\.\/items\/([^/]+)\/index\.ts$/);
    if (match) p.id = p.id ?? match[1];
    return p;
  })
  .filter(Boolean)
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999)) as Publication[];

export function getPublications() {
  return publications;
}

export function getPublicationById(id: string) {
  return publications.find((p) => p.id === id) ?? null;
}

export default publications;
