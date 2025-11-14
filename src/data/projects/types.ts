export type MediaType = "image" | "video" | "embed";

export interface ProjectMediaItem {
  type: MediaType;
  src: string;
  poster?: string;
  caption?: string;
  alt?: string;
}

export interface ProjectLink {
  /** Optional user-friendly label (e.g. "Repo A", "Backend repo"). If omitted a short fallback will be used. */
  label?: string;
  url: string;
}

export interface Project {
  /**
   * Optional at source; if omitted the loader will infer the id from the parent folder name.
   * Example: items/test-time-adaptation/index.ts -> id = 'test-time-adaptation'
   */
  id?: string;
  title: string;
  description: string;
  when?: { start?: string; end?: string };
  tags: string[];
  imageUrl?: string; // image URL for the project card
  repoLinks?: ProjectLink[];
  docLinks?: ProjectLink[];
  overview?: {
    problems?: string | string[];
    methods?: string | string[];
    tools?: string[];
    goal?: string | string[];
    context?: string;
  };
  media?: ProjectMediaItem[];
  content?: string;
  /** List of collaborator names. Rendered as: "Developed in collaboration with A & B (start — end)" when present. */
  collaborators?: string[];
  featured?: boolean;
}

export default Project;
