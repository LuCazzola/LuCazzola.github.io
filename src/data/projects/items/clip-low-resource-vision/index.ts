import type { Project } from "../../types";
import { asset } from "@/lib/asset";

const project: Project = {
  title: "CLIP on low-resource vision",
  description:
    "A focused study on adapting Vision–Language Models (CLIP) to low‑resource, long‑tailed classification tasks. The work explores parameter‑efficient adaptation methods, targeted data augmentation, and combined strategies to improve few‑shot generalization on challenging datasets.",
  collaborators: ["Alessandro Lorenzi", "Omar Facchini"],
  when: { start: "2024-10", end: "2024-12" },
  tags: [
    "Vision-Language Models",
    "Few-Shot Learning",
    "Low-Resource Learning",
    "LoRA",
    "BitFit",
    "Meta-Learning",
    "Data Augmentation",
    "PyTorch",
  ],
  imageUrl: asset("/media/lr_fsl/cover.png"),
  repoLinks: [
    { label: "Repository", url: "https://github.com/OmarFacchini/LowResourcesFewShot-CLIP" },
  ],
  overview: {
    problems: [
      "Machine learning models, particularly VLMs like CLIP, exhibit poor generalization when faced with long-tailed data distributions (many rare classes) and low-resource scenarios.",
      "The challenge lies in making models robust and fair across all classes without extensive fine-tuning, requiring parameter-efficient adaptation.",
      "Identifying and mitigating inherent biases and failure cases in CLIP when applied to niche domains (e.g., satellite imagery, circuit diagrams)."
    ],
    tools: [
      "Python",
      "PyTorch",
      "NumPy",
      "UMAP (Visualization)",
    ],
    methods: [
      "Comprehensive Literature Review on Long-Tailed Learning techniques.",
      "Parameter-Efficient Fine-Tuning (PEFT): LoRA and BitFit.",
      "Meta-Learning Adaptation: Meta-Adapter.",
      "Targeted Data Augmentation (Label Preserving/Breaking).",
      "Few-Shot Classification using the CLIP framework.",
      "Analysis via Attention Maps and UMAP Projections.",
    ],
    goal: [
      "Evaluate the effectiveness of multiple few-shot learning and PEFT methods in improving CLIP's performance on long-tailed datasets (EuroSAT and Circuit Diagrams).",
      "Compare methods like LoRA and BitFit to understand their unique impact on model attention (fine-grained vs. global focus).",
      "Achieve significant accuracy improvements over the zero-shot baseline by leveraging combined strategies (e.g., LoRA + BitFit + Meta-Adapter)."
    ],
    context:
      "This project was developed for the 'Trends and Applications of Computer Vision' course at the University of Trento (a.y. 2023/2024), representing advanced research in few-shot and low-resource adaptation of state-of-the-art Vision-Language Models.",
  },
  media: [
    {
      type: "image",
      src: asset("/media/lr_fsl/categories.png"),
      alt: "lt-categories",
      caption: "Categorization of techniques to address long-tailed data distributions derived from literature review.",
    },
    {
      type: "image",
      src: asset("/media/lr_fsl/zero_vs_lora_bitfit_eurosat.png"),
      alt: "zero_vs_lora_bitfit_eurosat",
      caption: "Comparison of attention maps: Zero-Shot CLIP vs. the combined LoRA + BitFit adapted model on EuroSAT, showing significantly more relevant focus in the adapted model.",
    },
    {
      type: "image",
      src: asset("/media/lr_fsl/eurosat_base_failures.png"),
      alt: "eurosat-failures",
      caption: "Failure case analysis on the EuroSAT dataset, highlighting misclassifications due to geometric patterns (stripes) and subtle class similarities.",
    },
    {
      type: "image",
      src: asset("/media/lr_fsl/zero_vs_lora_eurosat.png"),
      alt: "lora-vs-zero-eurosat",
      caption: "Performance improvement of LoRA adaptation over zero-shot CLIP on the EuroSAT dataset.",
    },
    {
      type: "image",
      src: asset("/media/lr_fsl/umap_plot_lora_eurosat.png"),
      alt: "eurosat_umap",
      caption: "UMAP 2D projection of EuroSAT features after LoRA adaptation, revealing clearer, semantically coherent cluster separation.",
    },
    {
      type: "image",
      src: asset("/media/lr_fsl/eurosat_class_acc_table_lora_bitfit.png"),
      alt: "eurosat_class_acc",
      caption: "Class-wise accuracy table for LoRA and BitFit adaptation on EuroSAT, showing where each method excels (e.g., BitFit improves global classes like 'River').",
    },
    {
      type: "image",
      src: asset("/media/lr_fsl/circuits_failures.png"),
      alt: "circuits_failures",
      caption: "Failure case analysis on the Circuit-Diagrams dataset, demonstrating the base model's tendency to focus on text or blank space rather than circuit structure.",
    },
    {
      type: "image",
      src: asset("/media/lr_fsl/circuits_best_example.png"),
      alt: "circuits_best_example",
      caption: "Performance example on Circuit-Diagrams using the best-performing configuration (BitFit + Meta-Adapter + Augmentation).",
    },
    {
      type: "image",
      src: asset("/media/lr_fsl/modality_gap_metapng.png"),
      alt: "modality_gap_metapng",
      caption: "Analysis of the CLIP Modality Gap, suggesting that Meta-Adapter may increase similarity scores between vision and text embeddings.",
    },
  ],
  featured: true,
};

export default project;