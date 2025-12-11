### 🔍 Kinetic Mining in Context

KineMIC addresses data scarcity through a two-stage mining strategy:

1. **Soft Positive Search**: CLIP text embeddings match sparse HAR labels to HumanML3D captions, identifying candidate motions.

2. **Mining in Context (MIC)**: Contrastive learning aligns and extracts kinematically relevant sub-windows from long source motions to match short NTU actions, bridging the domain gap.

[MEDIA:1-3-2-4-5-6:0.8]{Visualizing the Kinetic Mining: Our Mining in Context (MIC) module, trained through contrastive learning, is able to identify the most kinematically relevant motion segment (orange) from the general source motion (S) with respect to the target action (T).}

### 🤸 Few-Shot Action Synthesis

KineMIC distills T2M priors from HumanML3D into a task-specific [Motion Diffusion Model](https://guytevet.github.io/mdm-page/) via few-shot fine-tuning. This generates kinematically precise synthetic motions that augment sparse support sets for robust HAR training, while preserving motion diversity.

[MEDIA:7-8-9-10-11-12-13-14-15:0.7]{Real Motion Samples: The model is trained with few-shots (10) of real NTU RGB+D 120 motion samples per action class.}

[MEDIA:16-17-18-19-20-21-22-23-24-25-26-27-28-29-30:0.7]{Generated Motion Samples: Diverse actions synthesized by the KineMIC model.}

### 🎭 Motion Composition

KineMIC exhibits emergent motion composition. Trained with aligned action labels + text captions, inference with unrelated prompts preserves pre-training knowledge, blending characteristics from both conditions.

[MEDIA:31-32-33:0.8]{Prompt composition: action and text conditioning are set to be 'unrelated' at inference. The model tries to satisfy both conditionings, resulting in blending of charatteristics.}

## 💜 Cite us

```bash
Work In Progress
```

