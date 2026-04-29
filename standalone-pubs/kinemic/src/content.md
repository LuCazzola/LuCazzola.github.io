### 🔍 Kinetic Mining in Context

KineMIC addresses data scarcity through a two-stage mining strategy:

1. **Soft Positive Search**: CLIP text embeddings match sparse HAR labels to HumanML3D captions, identifying candidate motions.

2. **Mining in Context (MIC)**: Contrastive learning aligns and extracts kinematically relevant sub-windows from long source motions to match short NTU actions, bridging the domain gap.

[MEDIA:1-3-2-4-5-6:0.8]{**Visualizing the Kinetic Mining.** Our Mining in Context (MIC) module, trained through contrastive learning, is able to identify the most kinematically relevant motion segment (orange) from the general source motion (S) with respect to the target action (T).}

### 🤸 Few-Shot Action Synthesis

KineMIC distills T2M priors from HumanML3D into a task-specific [Motion Diffusion Model](https://guytevet.github.io/mdm-page/) via few-shot fine-tuning. This generates kinematically precise synthetic motions that augment sparse support sets for robust HAR training, while preserving motion diversity.

[MEDIA:7-8-9-10-11-12-13-14-15:0.7]{**Real Motion Samples.** The model is trained with few-shots (10) of real NTU RGB+D 120 motion samples per action class.}

[MEDIA:16-17-18-19-20-21-22-23-24-25-26-27-28-29-30:0.7]{**Generated Motion Samples.** Diverse actions synthesized by the KineMIC model.}

### 🎭 Motion Composition

An emergent property is the model's ability to perform motion composition. While the model is trained with aligned action labels + text captions, by combining learned action labels with novel text prompts at inference the model preserves its pre-training knowledge while adhering to target domain constraints.

[MEDIA:31-32-33:0.8]{**Prompt composition.** action and text conditioning are set to be 'unrelated' at inference. The model tries to satisfy both conditionings, resulting in blending of characteristics.}

### 👀 Pre-trained MDM vs. KineMIC

KineMIC significantly improves motion relatedness to the target domain compared to the base pre-trained model. While pre-trained MDM often struggles to adhere to expected high-level kinematics—even for seemingly simple actions—KineMIC facilitates a crucial specialization process that bridges the domain gap.

[MEDIA-MULTICOL:1.35]
[MEDIA:34-35-36-37-38-39]{<u>**Pre-Trained MDM.**</u> While the generalist MDM can generate motion from text, it lacks domain-specific guidance, leading to frequent **artifacts**. Most noticeably, *'side kicks'* are often **truncated** mid-animation, substituted with front kicks, or some other form of **caothic kicking** motion. Action *'stretch on self'* instead **exhibits excessive, sometimes erratic variety**, diverging from target kinematic distribution.}
[MEDIA:40-41-42-43-44-45]{<u>**KineMIC.**</u> Generated samples stay **more faithful** to high level kinematics of the few-shot target set. By localizing variety to the necessary motion windows, KineMIC produces **more stable and representative samples**—a critical factor for training reliable HAR classifiers.}
[/MEDIA-MULTICOL]

## 💜 Cite us

```bibtex
@misc{cazzola2025kineticminingcontextfewshot,
      title={Kinetic Mining in Context: Few-Shot Action Synthesis via Text-to-Motion Distillation},
      author={Luca Cazzola and Ahed Alboody},
      year={2025},
      eprint={2512.11654},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2512.11654},
}
```
