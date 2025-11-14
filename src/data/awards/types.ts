export interface Award {
  /** Optional at source; loader will infer id from parent folder name when missing. */
  id?: string;
  title: string;
  role?: string;
  location?: string;
  period?: string;
  when?: { start?: string; end?: string };
  description?: string[];
  tags?: string[];
  image?: string;
  featured?: boolean;
  content?: string;
}

export default Award;
