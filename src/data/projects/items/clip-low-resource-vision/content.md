## 📉 The Challenge: Dealing with Long-Tailed Data

The core problem addressed here is the **long-tailed distribution** common in real-world datasets. This means a few "head" classes have abundant examples, while the vast majority of "tail" classes are rare. Machine learning models, including powerful Vision-Language Models (VLMs) like **CLIP**, struggle in this unbalanced scenario. They often develop a strong bias toward the common head classes, failing to generalize to the low-resource tail classes, especially when collecting more data isn't feasible.

## 🛠️ Adaptive Methodology

This project systematically explored lightweight adaptation techniques to make VLMs fair and effective across all classes in long-tailed settings.

After a thorough literature review, existing solutions were grouped into four main categories:

[MEDIA:1:0.5]

From these categories, four advanced, efficient techniques were selected for implementation and comparative study:
1.  **Low-Rank Adaptation (LoRA)**: A technique that injects small, trainable matrices into the model's weight layers, significantly reducing the number of parameters needing updates. [https://arxiv.org/abs/2106.09685]
2.  **Bias-terms Fine-tuning (BitFit)**: An extremely parameter-efficient method that only trains the bias vectors in the model's layers. [https://arxiv.org/abs/2106.10199]
3.  **Meta-Adapter**: A specialized adapter trained using a meta-learning strategy, designed to quickly adapt to new classes or tasks. [https://arxiv.org/abs/2311.03774]
4.  **Label Preserving and Breaking Data Augmentation**: Augmentation techniques designed to either stabilize (preserve) or challenge (break) the relationship between an image and its label. [https://arxiv.org/abs/2401.04716]

These methods were tested individually and in combination on two challenging, long-tailed datasets: **EuroSAT** and **Circuit-Diagrams**. Evaluation focused on accuracy, **cluster separability** (using Silhouette Score), **confusion matrices**, and **attention map** visualizations to understand failure modes.

[MEDIA:2]

## 🛰️ Case Study 1: EuroSAT (Satellite Imagery)

The **EuroSAT** dataset involves classifying satellite land-use images. The baseline zero-shot CLIP struggled with subtle differences, often misclassifying based on simple geometric features (e.g., mistaking "striped" Annual Crop Land for Highway or Road) or struggling to identify the primary subject due to mixed sub-regions.

[MEDIA:3]

The core issue was identified as a lack of focused **attention**.

* **LoRA's Impact:** Applying LoRA significantly improved performance. Because LoRA was applied to the Residual attention blocks, the resulting **attention maps** became much richer and more semantically detailed, helping the model focus correctly. The **UMAP projections** showed much more separable and semantically meaningful clusters (e.g., grouping different types of water bodies together).

[MEDIA:4]

[MEDIA:5:0.75]

* **BitFit's Impact:** BitFit also provided a substantial improvement, especially for classes like "Sea or Lake" and "River." We hypothesized this is because BitFit, by tuning biases across the entire model, provides a more **comprehensive, global understanding** of the image, whereas LoRA excelled at recognizing fine-grained local details (due to its placement in the attention blocks).

[MEDIA:6:0.75]

* **Best Result:** The combination of **LoRA, BitFit, and Meta-Adapter** achieved the project's best result on EuroSAT, reaching **90.95% accuracy**. Meta-Adapter alone was underwhelming (around 68%) but proved essential as an ensemble component.

## ⚡ Case Study 2: Circuit Diagrams (Novel Visual Language)

The **Circuit Diagrams** dataset, featuring electrical schematics, presented a unique challenge because CLIP lacks significant prior knowledge of this highly structured, visually diverse domain.

* **Baseline Failure:** The base CLIP model performed poorly, achieving only **12.4% accuracy**. Its primary focus was consistently on **textual information** present in the diagrams, a known bias of the VLM.

[MEDIA:7]

* **LoRA's Collapse:** Surprisingly, applying LoRA caused the model to **collapse** and consistently predict only the single majority class ("converter/power supply/charger/inverter"), resulting in a low 18% accuracy. This was unexpected in a few-shot setting and suggests the majority class's visual features were too dominant.

* **BitFit's Focus:** BitFit avoided the collapse seen with LoRA. Instead, it **enhanced CLIP's existing bias** to focus intensely on text elements in the images, demonstrating its ability to leverage the VLM's original pre-trained knowledge rather than forcing it toward a new visual pattern.

* **Best Result:** The best configuration for this difficult dataset—a combination of **BitFit, Meta-Adapter, and label preserving/breaking augmentations**—achieved **17.25% accuracy**. The attention maps for this best-performing model revealed a tendency to ignore the circuit structure, focusing instead on blank areas of the images.

[MEDIA:8]

## 🖼️ Analysis: The CLIP Modality Gap

During experiments involving the Meta-Adapter, we observed that the **similarity scores** between the vision and text modalities of CLIP were consistently much higher than usual.

This led to a key question: Does the **Meta-Learning strategy** employed by Meta-Adapter also help **reduce the gap** between the image and text representations?

[MEDIA:9]

The results suggest this is **possibly** the case, as similarity scores rose significantly. However, a simultaneous increase in the standard deviation suggests that this behavior requires further investigation using more datasets to confirm if the Meta-Adapter provides a robust reduction in the modality gap.