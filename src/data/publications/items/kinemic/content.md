### 💡 Motivations

The creation of vast, annotated motion datasets is a significant challenge in **Skeletal-based Human Activity Recognition (HAR)**. While powerful text-to-motion models exist, they are often trained for general artistic applications like avatar animation, resulting in a *domain gap* when applied to the kinematic specificity required for HAR tasks.

We introduce **KineMIC (Kinetic Mining In Context)**, a novel transfer learning framework designed for **few-shot action synthesis**. Our core intuition is that the semantic similarity found in the text domain (comparing sparse action labels to rich captions) can be leveraged to guide the search for kinematic similarity in the motion domain, enabling us to unlock the potential of generalist models for specialist tasks.

### 🔍 Kinetic Mining in Context

Our approach addresses the need for specific, relevant data by implementing a kinetic mining strategy:

1.  **Soft Pairing:** We utilize **CLIP text embeddings** to create "soft pairings" between a *target action* (the action we want to synthesize) and the *rich descriptions* associated with a large-scale, generalist motion dataset.
2.  **Contextual Guidance:** These soft pairings guide a training process that efficiently identifies and extracts the most relevant sub-sequences (or "prior windows") from the vast, generalist motion data. This mechanism transforms the generalist model into a specialist, focusing only on kinematically relevant segments for the target HAR action.

[MEDIA:1-3-2-4-5-6:0.8]{Visualizing the Mining Strategy: Our Mining in Context (MIC) module, trained through contrastive learning, is able to identify the most kinematically relevant "prior window" (orange) from the general source motion (S) with respect to the target action (T).}

### 🤸 Action Synthesis via Text-to-Motion Distillation

By distilling knowledge from large, general datasets into a task-specific model, KineMIC synthesizes motion in a few-shot setting. This process allows us to generate synthetic motions that possess the necessary kinematic specificity for robust Human Activity Recognition, while preventing mode collapse.

[MEDIA:7-8-9-10-11-12-13-14-15:0.7]{Real Motion Samples: The model is trained with few-shots (10) of real motion samples per action class.}

[MEDIA:16-17-18-19-20-21-22-23-24-25-26-27:0.7]{Generated Motion Samples: Diverse actions synthesized by the KineMIC model.}

### 🎭 Motion Composition via Dual Conditioning

KineMIC exhibits an emergent capability for motion composition. Such behavior derives from design choices: while the model is always fine-tuned using corresponding action labels and general descriptive text captions (e.g., 'stretch on self' action label + 'a person is doing stretching' text), at inference, switching to unrelated text captions preserves underlying pre-training knowledge, producing synthesized motions that exhibit characteristics derived from both conditions simultaneously.

[MEDIA:33-34-35:0.8]{Prompt composition: actiong and text conditioning are set to be 'unrelated' at inference. The model tries to satisfy both conditionings, resulting in blending of charatteristics.}

## 💜 Cite us

```bash
Work In Progress
```

