import type { Experience } from "../../types";
import { asset } from "@/lib/asset";

const experience: Experience = {
  company: "Fondazione Bruno Kessler - FBK",
  role: "Research Assistant",
  location: "Trento, Italy",
  when: { start: "2023-03", end: "2023-07" },
  description: [
    "During my time at Fondazione Bruno Kessler, I collaborated with the 'Data Science for Health Care' unit on a research project centered on dimension reduction techniques applied to biomedical datasets, particularly gene expression data. The ultimate goal was to support early disease detection, including complex conditions like lung cancer.",
    "I conducted a thorough benchmarking of both classical and state-of-the-art dimension reduction methods, paying special attention to their ability to preserve meaningful information in high-dimensional, low-sample-size settings (a.k.a. the Big-p, Little-n dilemma). The project also involved evaluating the interpretability of these methods through visual exploration and analysis.",
    "This experience helped me build solid foundations in the field of dimension reduction, and more broadly taught me how to critically approach scientific literature and technical documentation.",
  ],
  tags: ["Machine learning", "Dimensionality reduction", "Scientific documentation", "Python"],
  companyImage: asset("/media/fbk/FBK-workplace.jpg"),
  logoImage: asset("/media/fbk/FBK-logo.png"),
};

export default experience;
