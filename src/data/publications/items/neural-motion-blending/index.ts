import type { Publication } from "@/data/publications";
import { asset } from "@/lib/asset";

const publication: Publication = {
  title: "Neural Motion Blending Across Arbitrary Character Topologies",
  authors: [
    ["L. Cazzola", "https://scholar.google.com/citations?user=fsnsqoYAAAAJ&hl=en"],
    ["G. Martinelli", "https://scholar.google.com/citations?user=WG3OkQ4AAAAJ&hl=en"],
    ["N. Conci", "https://scholar.google.com/citations?user=mR1GK28AAAAJ&hl=en"]
  ],
  affiliations: "University of Trento",
  venue: "?",
  year: "2026",
  image: asset("/media/neural-motion-blending/teaser_poster.png"),
  teaserIndex: 2,
  tags: ["Character Animation", "Motion Blending", "Motion Retargeting", "Skeletal Animation", "Cross-Topology Transfer"],
  abstract: "Motion blending in character animation enables the synthesis of new motions by interpolating between existing examples. Current methods are typically restricted to fixed skeleton topologies, requiring identical or near-identical skeletal structures across characters. We present a novel framework for motion blending across heterogeneous skeletons. The proposed architecture combines a semantic encoder, which extracts a compact per-frame latent representation of the global motion state, with a diffusion-based decoder, which reconstructs characterspecific motion conditioned on this latent code. At inference time, blended motions are obtained by interpolating the latent representations of two input motions. We train and evaluate the method on the Truebones Zoo dataset using motions defined on both same and distinct skeleton topologies, demonstrating the ability to achieve smooth and plausible blending in a variety of different scenarios.",
  media: [
    // 1 — plugin demo (audio on)
    {
      type: "video",
      src: asset("/media/neural-motion-blending/plugin_demo.mp4"),
      title: "BlendAnything — Blender Plugin Demo",
      caption: "BlendAnything is a Blender plugin that extends the Non-Linear Animation (NLA) editor to support topology-aware motion blending directly in Blender. The plugin exposes the model's capabilities as a first-class Blender operator, enabling artists to blend motions across arbitrary character topologies without leaving their standard workflow.",
      audio: true,
    },
    // 2 — teaser
    {
      type: "video",
      src: asset("/media/neural-motion-blending/teaser.mp4"),
      caption: "Our approach enables, for the first time, motion blending across arbitrary character topologies.",
    },
    // 3-5 — in-skeleton blending
    {
      type: "video",
      src: asset("/media/neural-motion-blending/inSkel_comparison1.mp4"),
      title: "Triceratops (Walking → Running)",
      caption: "AnyTop struggles to maintain fidelity to the reference and target motions. Blender produces a rotation artifact on the front left leg at the transition. Our method is faithful to both inputs and yields a cleaner blending region.",
    },
    {
      type: "video",
      src: asset("/media/neural-motion-blending/inSkel_comparison2.mp4"),
      title: "King Cobra (Circle → Bite)",
      caption: "AnyTop struggles to maintain fidelity to the reference and target motions. Blender fails to preserve reasonable root joint rotation at the transition. Our method is superior on both counts.",
    },
    {
      type: "video",
      src: asset("/media/neural-motion-blending/inSkel_comparison3.mp4"),
      title: "Dragon (Attack → Attack)",
      caption: "AnyTop struggles to maintain fidelity to the reference and target motions. Blender introduces a rotation error in the right wing. Our method is superior on both counts.",
    },
    // 6-9 — cross-skeleton blending
    {
      type: "video",
      src: asset("/media/neural-motion-blending/xSkel_comparison1.mp4"),
      title: "Crab (Stride) → Polar Bear (Run)",
      caption: "The crab begins with its normal striding motion; upon transition it acquires meaningful quadrupedal coordination while maintaining temporal alignment with the polar bear's motion.",
    },
    {
      type: "video",
      src: asset("/media/neural-motion-blending/xSkel_comparison2.mp4"),
      title: "Leopard (Walking) → Puppy (Running)",
      caption: "The leopard begins with a walking motion; upon transition, it adapts to a running gait while maintaining temporal coherence and semantic alignment.",
    },
    {
      type: "video",
      src: asset("/media/neural-motion-blending/xSkel_comparison3.mp4"),
      title: "Raptor (Slow Walking) → Skunk (Running)",
      caption: "The raptor begins with a slow walking motion; upon transition, it adapts to a quadrupedal running gait. Notice how the raptor's legs synchronize with the skunk's hind legs.",
    },
    {
      type: "video",
      src: asset("/media/neural-motion-blending/xSkel_extra.mp4"),
      title: "Crab (Attack) → Raptor (Roar)",
      caption: "This crab means business. Don't mess with it!",
    },
    // 10-12 — retargeting
    {
      type: "video",
      src: asset("/media/neural-motion-blending/transfer_comparison2.mp4"),
      title: "Bird → Bat (Fly loop)",
      caption: "Motion2Motion produces a flying motion that stays within the bird's domain and struggles to adapt to the bat's faster tempo. Our method automatically adjusts the bird's posture to a more bat-like stance and synchronizes wing movement.",
    },
    {
      type: "video",
      src: asset("/media/neural-motion-blending/transfer_comparison3.mp4"),
      title: "Ostrich → Flamingo (Flap wings, one leg bent)",
      caption: "Motion2Motion only partially reproduces the 'one leg bent' trait. Our method reproduces both the wing-flapping motion and correctly bends the right leg in a flamingo-like manner.",
    },
    {
      type: "video",
      src: asset("/media/neural-motion-blending/transfer_comparison_many.mp4"),
      title: "One Motion, Many Characters",
      caption: "A single source motion retargeted to a diverse set of character topologies, demonstrating consistency of style and timing across large structural variation.",
    },
    // 13 — zero-shot
    {
      type: "video",
      src: asset("/media/neural-motion-blending/human2animal.mp4"),
      title: "Zero-Shot Transfer from Unseen Topologies",
      caption: "Without any human examples during training, the model transfers Mixamo motions to multiple Truebones characters with different skeletal structures, demonstrating extrapolation beyond the observed topology distribution.",
    },
  ],
};

export default publication;
