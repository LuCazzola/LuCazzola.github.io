import type { Experience } from "../../types";
import { asset } from "@/lib/asset";

const experience: Experience = {
  company: "CESI Lineact",
  role: "Research Assistant",
  location: "Nice - Côte d'Azur - France",
  when: { start: "2025-04", end: "2025-10" },
  description: [
    "I was part of the CESI Lineact research lab, which works closely with French industry partners on applied topics such as industrial digital twins.",
    "During my internship I developed a Few‑Shot generative Human Activity Recognition solution intended to improve classification performance when only a handful of labeled examples are available. I led the end‑to‑end effort — data curation and cleaning, augmentation, model design and implementation (including custom components when needed), and evaluation pipelines — with a focus on producing reproducible, operational results.",
    "I explored and prototyped many approaches during the project, and the final system and experimental results were documented in a rigorous first‑author publication.",
  ],
  tags: ["Motion generation", "Diffusion Models", "Multimodal models", "Few-Shot Learning", "Parameter Efficient Fine-Tuning (PEFT)", "Human Action Recognition", "Knowledge Distillation"],
  companyImage: asset("/media/CESI/HomeSiteWeb_Campus-Nice-2048x1152.jpg"),
  logoImage: asset("/media/CESI/cesi_RVB-1.png"),
};

export default experience;
