export interface Experience {
  /** Optional at source; loader will infer from parent folder name when missing. */
  id?: string;
  company: string;
  role: string;
  location?: string;
  /** Human-friendly period (e.g. "Oct 2025 - Present"). The loader will synthesize this from `when` if absent. */
  period?: string;
  /** Structured when: start/end in YYYY-MM format; end can be '?' for ongoing. */
  when?: { start?: string; end?: string };
  description: string[];
  tags?: string[];
  companyImage?: string;
  logoImage?: string;
  featured?: boolean;
  content?: string;
}

export default Experience;
