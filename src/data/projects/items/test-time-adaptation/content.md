## 💡 Test-Time Adaptation (TTA) Explained: Improving Models During Evaluation

Test-Time Adaptation (TTA) is an advanced technique that aims to boost a machine learning model's performance **at the moment of testing** (inference) rather than through the conventional, upfront process of fine-tuning or re-training. This approach is highly effective and helpful, primarily because standard fine-tuning can be technically complex, varying significantly with the model's architecture, and the financial and computational requirements for fine-tuning large models (like those with billions of parameters) are often prohibitive.

### 🤖 Leveraging CLIP for Zero-Shot Classification

Our objective is to apply TTA to an image classification task, and for this, we selected **Contrastive Language–Image Pre-training (CLIP)** by **OpenAI** as the core model, or backbone. CLIP is a well-regarded model trained using the **contrastive learning paradigm**, which means it learns to deeply associate images with their corresponding text descriptions (captions). This training results in image and text representations (embeddings) that are structured so that an image is numerically "close" to its accurate caption in a shared embedding space. This powerful alignment enables a capability known as **zero-shot classification**: running inference on a task the model was not explicitly trained for.

For a classification task, CLIP uses the following procedure:
1.  A set of potential class names (e.g., "cat", "dog", "chair") is chosen.
2.  A text prompt is defined for each class, typically structured as "a photo of a {class}" (e.g., "a photo of a cat").
3.  The query image is input alongside all these class-specific captions, and CLIP determines which caption's embedding is closest to the image's embedding, thereby performing the classification.

[MEDIA:1:0.8]

### ⚙️ Test-Time Prompt Tuning (TPT): Our TTA Baseline

A concrete TTA solution built upon the CLIP architecture is **Test-Time Prompt Tuning (TPT)**. TPT operates on a single image at a time to refine its prediction without changing the core model weights.

[MEDIA:2:0.8]

The TPT process involves four key steps:
1.  **Augmentation**: The single test image is augmented (slightly modified) $N$ times to create a diverse set of inputs.
2.  **Inference**: These augmented images, along with the original image, are passed through the CLIP image encoder. The resulting image features are combined with a set of text prompts (either manually created or learned via a **prompt learner** like CoOp).
3.  **Selection**: The prediction distributions from all these augmented images are computed. To find the most reliable predictions, the **10%** of results that exhibit the **lowest entropy** (meaning the model is most confident and least uncertain) are kept.
4.  **Averaging**: The top 10% of distributions are averaged together to form a more stable **marginal distribution**, and the entropy of this final distribution is calculated. Using a prompt learner (like CoOp) in this process also allows the resulting marginal entropy to serve as a loss function for further adaptation.

The experimental results (on ImageNet-A) confirm TPT's effectiveness: the zero-shot baseline of CLIP-RN50 had an average accuracy of 21.88%, while TPT with learned prompts (**TPT + CoOp**) achieved a notably higher accuracy of **29.41%** with a lower loss (entropy).

| **Model** | **Avg Accuracy (%)** | **Avg Loss (entropy)** |
| --- | --- | --- |
| CLIP-RN50 (zero-shot) | 21.88 | 2.329 |
| TPT (handcrafted prompts) | 28.80 | 1.919 |
| **TPT + CoOp** | **29.41** | **1.899** |

### 🔬 Exploring Alternatives: Image and Prompt Augmentations

To improve upon the TPT baseline, we investigated different image augmentation techniques: **PreAugment** (simple random cropping), **AugMix** (the original TPT method, mixing random augmentations), **AutoAugment** (a reinforcement learning-based method that finds accuracy-maximizing augmentations), and **DiffusionAugment** (using a diffusion model to generate augmentations). The results show that **AutoAugment** provided the best performance, reaching **30.36%** accuracy and outperforming the TPT + CoOp baseline by about 1% without requiring any prompt tuning.

| **Augmentation Technique** | **Avg Accuracy (%)** | **Avg Loss (entropy)** |
| --- | --- | --- |
| PreAugment | 27.51 | 3.02041 |
| AugMix | 28.80 | 1.919 |
| **AutoAugment** | **30.36** | **1.894** |
| DiffusionAugment | *read ahead* | *read ahead* |

While **DiffusionAugment** appeared promising, it was discovered to be excessively time-consuming for online generation on our hardware (taking around 12 seconds for 25 diffusion steps per image). Even reducing the number of augmentations still resulted in an estimated 250 hours of runtime for the entire ImageNet-A dataset. Although others have addressed this by generating and storing augmentations offline, we found this approach fundamentally inconsistent with the principle of TTA, which necessitates improvement *during* inference. Consequently, we discontinued experimentation with this solution.

We also tested a custom **prompt augmentation** method, based on the hypothesis that captions specifically tailored to the image content, rather than generic descriptions like "a photo of a [label]," would improve the alignment between the image and the class labels.

[MEDIA:3:0.8]

This custom method involved a three-step process:
1.  **Image Captioning**: Using the VisionEncoderDecoderModel (ViT-GPT2) to generate a detailed, descriptive caption of the image.
2.  **Keyword Extraction**: Utilizing KeyBERT to identify the most relevant keywords or phrases from the generated caption.
3.  **Personalized Prompts**: Replacing the key keyword in the caption with each class label from the dataset to create a set of content-specific prompts.

| Method | Avg Accuracy (%) : CLIP-RN50 | Avg Accuracy (%) : CLIP-ViT-B/16 |
| --- | --- | --- |
| Baseline | 21.83 | 47.87 |
| **Our Method** | **19.41** | **42.13** |

Despite our initial hopes, the results demonstrated that the personalized, context-aware prompts actually led to **worse** performance across both tested CLIP backbones. This counter-intuitive outcome can be attributed to several factors: the performance becomes dependent on a secondary, detached supervising model (the ViT-GPT2 chain); noise in the input image likely produces a noisy, inaccurate caption, making inference harder; and most importantly, as OpenAI itself noted, CLIP is highly sensitive to the exact wording of prompts, suggesting that generic, well-chosen prompts like "a photo of a {label}" are often more robust than complex, automatically generated ones, especially when evaluating on noisy datasets like ImageNet-A.