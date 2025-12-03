import type { Publication } from "@/data/publications";
import { asset } from "@/lib/asset";

const publication: Publication = {
  title: "Kinetic Mining in Context: Few-Shot Action Synthesis via \n Text-to-Motion priors",
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
  abstract: "The acquisition cost for large, annotated motion datasets is a critical bottleneck for skeletal-based Human Activity Recognition (HAR). Although powerful Text-to-Motion (T2M) generative models offer a compelling, scalable source of data, their training goals, which focus on general, artistic motion, and their dataset structure fundamentally differ from the requirements of HAR. This disparity results in a significant domain gap, making these models ill-equipped for generating kinematically precise actions. To address this challenge, we propose KineMIC (Kinetic Mining In Context), a transfer learning framework for few-shot action synthesis. KineMIC adapts a general T2M diffusion model for the HAR domain by hypothesizing that semantic correspondence in the pretrained text encoding space can provide the soft supervision needed for kinematic distillation. We operationalize this via a kinetic mining strategy that leverages CLIP text embeddings to establish semantic pairings between sparse HAR labels and the T2M source data. This specialized process guides the fine-tuning of the diffusion model, transforming the generalist T2M backbone into a few-shot Action-to-Motion generator. KineMIC generates synthetic data from as little as 10 real samples per class, validating the framework by enhancing the accuracy of a downstream HAR classifier",
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