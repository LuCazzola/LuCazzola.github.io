import type { Publication } from "@/data/publications";
import { asset } from "@/lib/asset";

const publication: Publication = {
  order: 1,
  title: "BlendAnything: A Blender Plugin for Cross-Topology Motion Blending",
  authors: [
    ["L. Cazzola",    "https://scholar.google.com/citations?user=fsnsqoYAAAAJ&hl=en"],
    ["G. Martinelli", "https://scholar.google.com/citations?user=WG3OkQ4AAAAJ&hl=en"],
    ["N. Conci",      "https://scholar.google.com/citations?user=mR1GK28AAAAJ&hl=en"],
  ],
  affiliations: "University of Trento; CNIT",
  venue: "SIGGRAPH (Poster) • Special Interest Group on Computer Graphics and Interactive Techniques",
  year: "2026",
  image: asset("/media/ba/teaser.png"),
  tags: ["Blender Plugin", "Motion Blending", "Cross-Topology", "Character Animation", "NLA Editor"],
  abstract: "A Blender plugin that brings neural cross-topology motion blending directly into the artist's workflow, enabling seamless motion interpolation between characters with heterogeneous skeletal rigs via an intuitive NLA editor interface.",
  pageUrl: "https://lucazzola.github.io/blend_anything-page/",
};

export default publication;
