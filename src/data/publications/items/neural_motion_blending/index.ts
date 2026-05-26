import type { Publication } from "@/data/publications";

const publication: Publication = {
  title: "Neural Motion Blending Across Arbitrary Character Topologies",
  authors: [
    ["L. Cazzola",    "https://scholar.google.com/citations?user=fsnsqoYAAAAJ&hl=en"],
    ["G. Martinelli", "https://scholar.google.com/citations?user=WG3OkQ4AAAAJ&hl=en"],
    ["N. Conci",      "https://scholar.google.com/citations?user=mR1GK28AAAAJ&hl=en"],
  ],
  affiliations: "University of Trento; CNIT",
  venue: "CGI • Computer Graphics International",
  year: "2026",
  tags: ["Motion Blending", "Character Animation", "Cross-Topology", "Diffusion Model", "Latent Space"],
  abstract: "A novel framework for blending motions across characters with heterogeneous skeletal topologies, combining a semantic encoder with a diffusion-based decoder to interpolate in a shared latent space — no manual rig correspondence required.",
  pageUrl: "https://lucazzola.github.io/neural_motion_blending-page/",
};

export default publication;
