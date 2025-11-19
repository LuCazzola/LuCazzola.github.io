import type { Publication } from "@/data/publications";
import { asset } from "@/lib/asset";

const publication: Publication = {
  title: "Kinetic Mining in Context: Few-Shot Action Synthesis via \n Text-to-Motion Distillation",
  // authors: list of [displayName, optionalLink]
  authors: [
    ["L. Cazzola", "/"],
    ["A. Alboody", "https://scholar.google.com/citations?user=DOoU5dEAAAAJ&hl=it&oi=ao"],
  ],
  affiliations: "University of Trento; CESI Lineact",
  venue: "?",
  year: "2025",
  pdf: asset("/resources/pubs/kinemic.pdf"),
  image: asset("/media/kinemic/panel_full.png"),
  tags: ["Few-Shot", "Motion Generation"],
  abstract: "The high cost of acquiring large-scale annotated motion datasets fundamentally limits skeletal-based Human Activity Recognition (HAR). While text-to-motion generative models offer a promising solution, their development has focused on artistic workflows like avatar animation. Consequently, they are trained on vast datasets that, despite immense variety, lack the kinematic specificity required for HAR tasks, creating a significant domain gap. To bridge this gap, we propose KineMIC (Kinetic Mining In Context), a transfer learning framework for few-shot action synthesis. Our approach is built on the hypothesis that semantic similarity in the text encoding space—comparing sparse action labels to rich captions—can provide \"soft\" guidance towards kinematic similarity in the motion domain. To operationalize this, we introduce a kinetic mining strategy that uses CLIP text embeddings to create \"soft pairings\" between target actions and rich source descriptions. These pairings guide a training process that identifies relevant sub-sequences from the large-scale dataset, transforming the generalist text-to-motion model into a specialized, few-shot action-to-motion generator. Ultimately, our framework generates synthetic motion from as few as 10 samples per class, providing a robust data augmentation strategy that significantly enhances the performance of downstream HAR models.",
  media: [
    { 
      type: "video",
      src: asset("/media/kinemic/renders/window_extraction/014383.mp4"),
      title: "(S) 'a man kicks with his left leg- first up, then to the left, then backwards.' — (T) 'side kick.'",
      caption: "In this example, the man performs multiple variations of kicks in the same source motion. The extracted window corresponds to 'left kicking' which is reasonably much more correlated to 'side kick' than other options." 
    },
    {
      type: "video", 
      src: asset("/media/kinemic/renders/window_extraction/M003354.mp4"),
      title: "(S) 'a person gracefully performs a contemporary dance.' — (T) 'stretch on self.'",
      caption: "In this example, the person performs multiple dance moves in the same source motion. While caption description is arguably far from 'stretch on self', if isolated, some movements can be interpreted as a stretch type of movement. In this case, as most 'stretching movements' are upper body dominant we can see as highlighted section motion focuses on upper body stretch-like movements." 
    },
    { 
      type: "video",
      src: asset("/media/kinemic/renders/window_extraction/004483.mp4"),
      title: "(S) 'a person marches in place, stands, and then runs in place.' — (T) 'run on the spot.'",
      caption: "Here the character begins by marching in place, transitions to standing still, and finally engages in running in place. The extracted window captures the 'running in place' segment, which aligns closely with the target description 'run on the spot', it's clear how the 'fast pacing' of leg movements produces higher correlation with the target action compared to other segments relative to 'marching' especially." 
    },
    { 
      type: "video",
      src: asset("/media/kinemic/renders/window_extraction/M009921.mp4"),
      title: "(S) 'the sim is dancing kicking both legs around.' — (T) 'side kick.'",
      caption: "The character movement is rather chaotic, involving rapid leg kicks in various directions. Despite the overall randomness, there are brief moments where the character executes a kick that closely resembles a 'side kick'. The extracted window captures one of these instances, highlighting the segment where the leg movement aligns most closely with the target action 'side kick'." 
    },
    { 
      type: "video",
      src: asset("/media/kinemic/renders/window_extraction/005554.mp4"),
      title: "(S) 'a person lowers himself into a yoga position.' — (T) 'stretch on self.'",
      caption: "The person is performing a yoga movement, a pike specifically. Within this motion sequence, the section which is considered to be best aligned with 'stretch on self' refers to the segment where the full-pike position is held, emphasizing the stretch aspect of the movement." 
    },
    { 
      type: "video",
      src: asset("/media/kinemic/renders/window_extraction/M012620.mp4"),
      title: "(S) 'a person is running on a treadmill.' — (T) 'run on the spot.'",
      caption: "Some lucky samples might be almost one-to-one correspondences. In this case, the entire source motion is correlated to the target action 'run on the spot', as both describe a running motion without significant spatial displacement." 
    },
    ////////////////////////////////////////////////////////////////////////////////////
    { 
      type: "video",
      src: asset("/media/kinemic/renders/ground_truth/S031C003P097R001A102.mp4"),
      title: "'side kick' (1)",
      caption: "A ground truth example of 'side kick'." 
    },
    { 
      type: "video",
      src: asset("/media/kinemic/renders/ground_truth/S028C003P043R001A104.mp4"),
      title: "'stretch on self' (1)",
      caption: "A ground truth example of 'stretch on self'." 
    },
    { 
      type: "video",
      src: asset("/media/kinemic/renders/ground_truth/S019C002P042R002A099.mp4"),
      title: "'run on the spot' (1)",
      caption: "A ground truth example of 'run on the spot'." 
    },
    { 
      type: "video",
      src: asset("/media/kinemic/renders/ground_truth/S027C001P006R001A102.mp4"),
      title: "'side kick' (2)",
      caption: "A ground truth example of 'side kick'." 
    },
    { 
      type: "video",
      src: asset("/media/kinemic/renders/ground_truth/S028C003P087R001A104.mp4"),
      title: "'stretch on self' (2)",
      caption: "A ground truth example of 'stretch on self'." 
    },
    { 
      type: "video",
      src: asset("/media/kinemic/renders/ground_truth/S025C003P058R001A099.mp4"),
      title: "'run on the spot' (2)",
      caption: "A ground truth example of 'run on the spot'." 
    },
    { 
      type: "video",
      src: asset("/media/kinemic/renders/ground_truth/S028C001P008R002A102.mp4"),
      title: "'side kick' (3)",
      caption: "A ground truth example of 'side kick'." 
    },
    { 
      type: "video",
      src: asset("/media/kinemic/renders/ground_truth/S031C003P043R001A104.mp4"),
      title: "'stretch on self' (3)",
      caption: "A ground truth example of 'stretch on self'." 
    },
    { 
      type: "video",
      src: asset("/media/kinemic/renders/ground_truth/S031C003P043R001A099.mp4"),
      title: "'run on the spot' (3)",
      caption: "A ground truth example of 'run on the spot'." 
    },
    ////////////////////////////////////////////////////////////////////////////////////
    { 
      type: "video",
      src: asset("/media/kinemic/renders/generated/synth_000016_obj_A102.mp4"),
      title: "'side kick' (1)",
      caption: "A generated example of 'side kick'." 
    },
    { 
      type: "video",
      src: asset("/media/kinemic/renders/generated/synth_000002_obj_A104.mp4"),
      title: "'stretch on self' (1)",
      caption: "A generated example of 'stretch on self'." 
    },
    { 
      type: "video",
      src: asset("/media/kinemic/renders/generated/synth_000007_obj_A099.mp4"),
      title: "'run on the spot' (1)",
      caption: "A generated example of 'run on the spot'." 
    },
    { 
      type: "video",
      src: asset("/media/kinemic/renders/generated/synth_000015_obj_A102.mp4"),
      title: "'side kick' (2)",
      caption: "A generated example of 'side kick'." 
    },
    { 
      type: "video",
      src: asset("/media/kinemic/renders/generated/synth_000013_obj_A104.mp4"),
      title: "'stretch on self' (2)",
      caption: "A generated example of 'stretch on self'." 
    },
    { 
      type: "video",
      src: asset("/media/kinemic/renders/generated/synth_000028_obj_A099.mp4"),
      title: "'run on the spot' (2)",
      caption: "A generated example of 'run on the spot'." 
    },{ 
      type: "video",
      src: asset("/media/kinemic/renders/generated/synth_000010_obj_A102.mp4"),
      title: "'side kick' (3)",
      caption: "A generated example of 'side kick'." 
    },
    { 
      type: "video",
      src: asset("/media/kinemic/renders/generated/synth_000019_obj_A104.mp4"),
      title: "'stretch on self' (3)",
      caption: "A generated example of 'stretch on self'." 
    },
    { 
      type: "video",
      src: asset("/media/kinemic/renders/generated/synth_000009_obj_A099.mp4"),
      title: "'run on the spot' (3)",
      caption: "A generated example of 'run on the spot'." 
    },{ 
      type: "video",
      src: asset("/media/kinemic/renders/generated/synth_000000_obj_A102.mp4"),
      title: "'side kick' (4)",
      caption: "A generated example of 'side kick'." 
    },
    { 
      type: "video",
      src: asset("/media/kinemic/renders/generated/synth_000022_obj_A104.mp4"),
      title: "'stretch on self' (4)",
      caption: "A generated example of 'stretch on self'." 
    },
    {
      type: "video",
      src: asset("/media/kinemic/renders/generated/synth_000011_obj_A099.mp4"),
      title: "'run on the spot' (4)",
      caption: "A generated example of 'run on the spot'." 
    },{ 
      type: "video",
      src: asset("/media/kinemic/renders/generated/synth_000017_obj_A102.mp4"),
      title: "'side kick' (5)",
      caption: "A generated example of 'side kick'." 
    },
    { 
        type: "video",
      src: asset("/media/kinemic/renders/generated/synth_000014_obj_A104.mp4"),
      title: "'stretch on self' (5)",
      caption: "A generated example of 'stretch on self'." 
    },
    { 
      type: "video",
      src: asset("/media/kinemic/renders/generated/synth_000021_obj_A099.mp4"),
      title: "'run on the spot' (5)",
      caption: "A generated example of 'run on the spot'." 
    },
    { 
    type: "video",
      src: asset("/media/kinemic/renders/generated/synth_000027_obj_A102.mp4"),
      title: "'stretch on self' (6)",
      caption: "A generated example of 'side kick'." 
    },
    { 
      type: "video",
      src: asset("/media/kinemic/renders/generated/synth_000008_obj_A099.mp4"),
      title: "'run on the spot' (6)",
      caption: "A generated example of 'run on the spot'." 
    },
    ////////////////////////////////////////////////////////////////////////////////////
    { 
      type: "video",
      src: asset("/media/kinemic/renders/composition/composition_02_obj.mp4"),
      title: "'a person is jumping' + 'stretch on self'",
      caption: "The sim starts in a crouched position, then raises both arms overhead while jumping simultaneously. The 'hands overhead' component is specifically highly present in 'stretch on self' motions." 
    },
    { 
    type: "video",
      src: asset("/media/kinemic/renders/composition/composition_04_obj.mp4"),
      title: "'a person throws punches' + 'stretch on self'",
      caption: "The man begins to perform a punch/throw motion, which transitions into torso twists for the stretching component." 
    },
    { 
      type: "video",
      src: asset("/media/kinemic/renders/composition/composition_05_obj.mp4"),
      title: "'a person is jumping' + 'stretch on self'",
      caption: "The avatar explosively raises both arms overhead and proceeds performing a big jump." 
    },
  ],
};

export default publication;