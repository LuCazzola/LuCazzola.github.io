import type { Publication } from "@/data/publications";
import { asset } from "@/lib/asset";

const publication: Publication = {
  title: "Kinetic Mining in Context: Few-Shot Action Synthesis via \n Text-to-Motion Distillation",
  // authors: list of [displayName, optionalLink]
  authors: [
    ["L. Cazzola", "/"],
    ["A. Alboody", "https://scholar.google.com/citations?user=DOoU5dEAAAAJ&hl=it&oi=ao"],
  ],
  affiliations: "University of Trento; CESI Lineact",
  venue: "?",
  year: "2025",
  pdf: asset("/resources/pubs/kinemic.pdf"),
  image: asset("/media/kinemic/sidekick_2.png"),
  tags: ["Few-Shot", "Motion Generation"],
  summary: "KineMIC introduces a transfer-learning framework for few-shot action synthesis that adapts a large text-to-motion model to specialize on target actions with very few labeled examples. We use CLIP-based soft positive mining to identify semantically relevant sequences from a large source dataset and distill them into a compact student model. The approach can generate realistic synthetic motion from as few as 10 examples per class and improves downstream human action recognition when used for data augmentation.",
  media: [
  { type: "image", src: asset("/media/kinemic/sidekick_2.png"), caption: "Main figure / slide" },
  ],
};

export default publication;
