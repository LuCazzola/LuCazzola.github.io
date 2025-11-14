import type { Project } from "../../types";
import { asset } from "@/lib/asset";

const project: Project = {
  title: "Test-Time Adaptation of Vision-Language Models for Robust Classification",
  description:
    "An experimental framework for adapting pre-trained Vision-Language Models (CLIP) at inference time using Test-Time Prompt Tuning (TPT), focused on improving robustness and accuracy on unseen, noisy data (ImageNet-A).",
  when: { start: "2024-04", end: "2024-08" },
  collaborators: ["Alessandro Lorenzi"],
  tags: [
    "Test Time Adaptation",
    "Vision Language Models",
    "CLIP",
    "Deep Learning",
    "Prompt Tuning",
    "Image Augmentation",
  ],
  imageUrl: asset("/media/DeepLearning/CLIP-openAI.png"),
  repoLinks: [
    { label: "GitHub Repository", url: "https://github.com/LuCazzola/TTA_DL-Project" }
  ],
  overview: {
    problems: [
      "Traditional fine-tuning is computationally expensive and complex for large models, motivating the need for efficient, post-training performance improvements.",
      "Implementation of Test-Time Adaptation (TTA), a novel method to enhance model performance dynamically during the inference phase.",
      "Exploration of various image and prompt augmentation strategies to maximize TTA effectiveness."
    ],
    methods: [
      "Test-Time Prompt Tuning (TPT) baseline using CLIP.",
      "Comparison of various data augmentation techniques (AugMix, AutoAugment) for TPT.",
      "Integration with Prompt Learning methods (CoOp).",
      "Development of a custom, content-aware prompt augmentation method using a ViT-GPT2 captioning model."
    ],
    tools: [
      "Python",
      "PyTorch",
      "ViT-GPT2 (Image Captioning)",
      "KeyBERT (Keyword Extraction)"
    ],
    goal: [
      "Implement and experimentally validate a Test-Time Adaptation solution (TPT) for image classification on challenging datasets (ImageNet-A).",
      "Identify the most effective combination of TTA techniques (e.g., AutoAugment) to surpass the TPT + CoOp baseline."
    ],
    context:
      "This was a project for the Deep Learning course at the University of Trento (a.y. 2023/2024), during the first year of the Master's degree in AI Systems. This experience provided significant hands-on exposure to advanced deep learning architectures and methods for extending their generalization capacity.",
  },
  media: [
    {
      type: "image",
      src: asset("/media/DeepLearning/CLIP-openAI.png"),
      alt: "CLIP architecture",
      caption: "The architecture of the CLIP vision-language model."
    },
    {
      type: "image",
      src: asset("/media/DeepLearning/TPT.png"),
      alt: "TPT method schema",
      caption: "The Test-Time Prompt Tuning (TPT) adaptation pipeline."
    },
    {
      type: "image",
      src: asset("/media/DeepLearning/image_captioning_schema.png"),
      alt: "Custom prompt augmentation schema",
      caption: "Schema of the custom prompt augmentation method using ViT-GPT2 and KeyBERT."
    },
  ],

  featured: true,
};

export default project;