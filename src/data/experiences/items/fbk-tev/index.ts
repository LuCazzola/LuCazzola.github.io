import type { Experience } from "../../types";
import { asset } from "@/lib/asset";

const experience: Experience = {
  company: "Fondazione Bruno Kessler - FBK (TeV)",
  role: "Applied Scientist",
  location: "Trento, Italy",
  when: { start: "2026-06", end: "?" },
  description: [
    "Back at Fondazione Bruno Kessler, this time as part of the Technologies of Vision (TeV) unit of the Digital Industry Center, working on robot learning with Vision-Language-Action models (VLAs) and computer vision for industrial applications.",
  ],
  tags: ["Robot Learning", "Vision-Language-Action Models", "Computer Vision", "Industrial AI"],
  companyImage: asset("/media/fbk/FBK-workplace.jpg"),
  logoImage: asset("/media/fbk/FBK-logo.png"),
};

export default experience;
