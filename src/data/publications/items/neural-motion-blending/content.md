## 🎬 BlendAnything — Blender Plugin

**BlendAnything** is a companion Blender plugin that brings the paper's cross-topology motion blending capabilities directly into Blender's Non-Linear Animation (NLA) editor. It exposes the model as a first-class Blender operator, letting artists blend motions across arbitrary character topologies without leaving their standard workflow.

[MEDIA:1]

[SPACING:medium]

## 🦴 In-Skeleton Blending

Given two motions defined on an identical skeleton, we blend their latent representations to produce temporally smooth transitions while preserving motion semantics. We compare against *AnyTop* and *Blender's Non-Linear Animation* blending, highlighting improved continuity, reduced artifacts, and more plausible intermediate poses.

[MEDIA:5 4 3]

[SPACING:medium]

## 🔀 Cross-Skeleton Blending

Our primary setting: blending across characters with *different* skeletal topologies. By learning a shared latent representation across heterogeneous rigs, the model interpolates between source motions from morphologically distinct characters while maintaining temporal coherence and semantic alignment.

[MEDIA:8 6 7]

[MEDIA:9]

[SPACING:medium]

## 🎯 Retargeting

Although retargeting is not the primary training objective, the learned representation applies directly to this task. We compare against *Motion2Motion*, a dedicated retargeting baseline. Our method better preserves characteristic motion traits while remaining structurally plausible and semantically meaningful.

[MEDIA:10 11]

[MEDIA:12]

[SPACING:medium]

## 🌐 Zero-Shot Transfer from Unseen Topologies

Without any human examples during training, the model transfers Mixamo motions to multiple Truebones characters with different skeletal structures, demonstrating extrapolation beyond the observed topology distribution.

[MEDIA:13]
