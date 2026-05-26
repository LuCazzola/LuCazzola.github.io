import type { Publication } from "@/data/publications";
import { asset } from "@/lib/asset";

const publication: Publication = {
  order: 3,
  title: "Kinetic Mining in Context: Few-Shot Action Synthesis via Text-to-Motion Distillation",
  authors: [
    ["L. Cazzola", "https://scholar.google.com/citations?user=fsnsqoYAAAAJ&hl=en"],
    ["A. Alboody", "https://scholar.google.com/citations?user=DOoU5dEAAAAJ&hl=en"],
  ],
  affiliations: "University of Trento; CESI LINEACT",
  venue: "ICPR • 28th International Conference on Pattern Recognition",
  year: "2026",
  arxiv: "https://arxiv.org/abs/2512.11654",
  image: asset("/media/kinemic/panel_full.png"),
  tags: ["Human Motion Synthesis", "Few-Shot Learning", "Action-to-Motion", "Text-to-Motion", "Human Activity Recognition"],
  abstract: "KineMIC adapts a Text-to-Motion diffusion model to Human Activity Recognition via a kinetic mining strategy that leverages CLIP embeddings to bridge the domain gap between generalist T2M data and sparse HAR labels, delivering a +23.1% accuracy improvement.",
  pageUrl: "https://lucazzola.github.io/kinemic-page/",
};

export default publication;
