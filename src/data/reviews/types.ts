export interface Review {
  /** Optional at source; loader will infer from parent folder name when missing. */
  id?: string;
  /** Reviewing role (e.g. "Reviewer", "Program Committee") */
  role: string;
  /** Full name of the reviewed venue (workshop, conference, journal) */
  venue: string;
  /** Short tag shown as a badge (e.g. "IROS'26") */
  short?: string;
  /** Extra context shown after the venue name (e.g. "2nd edition workshop") */
  note?: string;
  year: string;
  url?: string;
}

export default Review;
