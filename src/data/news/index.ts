export interface NewsItem {
  /** "YYYY-MM" or "YYYY-MM-DD" */
  date: string;
  /** Short message; supports inline markdown: [links](https://...), **bold**, *italic* */
  text: string;
}

/**
 * Add new entries anywhere in this list — they are sorted newest first on the page.
 * Example: { date: "2026-07-15", text: "Paper accepted at **ICPR 2026**! [Project page](https://...)" },
 */
const news: NewsItem[] = [
  { date: "2026-07-15", text: "Graduated **with honors** (110/110 cum laude) from the **Master's in Artificial Intelligence Systems** at the [University of Trento](https://www.unitn.it/)! 🎓" },
  { date: "2026-05-30", text: "*[BlendAnything: A Blender Plugin for Cross-Topology Motion Blending](https://mmlab-cv.github.io/BlendAnything/)* got into **SIGGRAPH Posters 2026**! 🎉" },
  { date: "2026-05-20", text: "*[Neural Motion Blending Across Arbitrary Character Topologies](https://mmlab-cv.github.io/neural_motion_blending/)* got into **Computer Graphics International (CGI 2026)**! We fly to London in July! ✈️" },
  { date: "2026-03-31", text: "*[Kinetic Mining in Context: Few-Shot Action Synthesis via Text-to-Motion Distillation](https://lucazzola.github.io/kinemic-page/)* got accepted to **ICPR 2026**! 🎉 My very first paper, so proud of this one!" },
  { date: "2026-06-12", text: "Started as **Applied Scientist** at [FBK – Technologies of Vision](https://tev.fbk.eu/), working on robot learning and computer vision for industry." },
];

export const getNews = () => [...news].sort((a, b) => b.date.localeCompare(a.date));

export default news;
