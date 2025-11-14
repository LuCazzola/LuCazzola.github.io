import type { Experience } from "../../types";
import { asset } from "@/lib/asset";

const experience: Experience = {
  company: "University of Trento",
  role: "Research Assistant",
  location: "Trento, Italy",
  when: { start: "2025-10", end: '?' },
  description: [
    "Developing the Master's thesis, centered on Personalized Human Motion Synthesis using deep generative models.",
    "The core focus is to shift from averaged 'canonical skeleton' motion generation to stylized movement conditioned on individual attributes.",
    "Designing a pipeline to encode and condition motion based on detailed subject-specific traits, including body shape, joint kinematics, inferred athleticism metrics, and observed behavioral signatures.",
    "Aiming to create realistic and unique digital human motion that faithfully represents the target individual's style, a foundational component for advanced Digital Twin and personalized VR/AR applications.",
    "The primary research goal is to develop a novel methodology and share the results in a first-author publication."
  ],
  tags: ["Digital Twin", "Motion Stylization", "Human Motion Synthesis", "Deep Generative Models"],
  companyImage: asset("/media/uni/uni_povo.jpg"),
  logoImage: asset("/media/icons/unitn.jpeg"),
};

export default experience;