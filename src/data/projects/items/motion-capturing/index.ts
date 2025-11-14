import type { Project } from "../../types";
import { asset } from "@/lib/asset";

const project: Project = {
  title: "MoCap Filtering, Data Correction, and UE5 Integration",
  description:
    "A project focused on processing and correcting noisy optical motion-capture data to reduce jitter and fill gaps caused by marker occlusion. It integrates classical predictive filtering (Kalman & Particle Filters) and utilizes a custom Unreal Engine 5 simulation for animation and 3D to 2D reprojection analysis.",
  when: { start: "2024-04", end: "2024-07" },
  collaborators: ["Alessandro Lorenzi"],
  tags: [
    "MoCap",
    "Optical Tracking",
    "Kalman Filter",
    "Particle Filter",
    "Unreal Engine 5",
    "Python",
    "OpenCV",
    "3D Animation",
    "Computer Vision",
  ],
  imageUrl: asset("/media/Optitrack/Optitrack.svg"),
  repoLinks: [
    { label: "Repository", url: "https://github.com/lorenzialessandro/CV-project" },
  ],
  overview: {
    problems: [
      "Optical motion-capture data frequently suffers from gaps and jitter caused by marker occlusion (flickering), leading to non-smooth, unrealistic animations and complicating analysis.",
      "Requires a robust method for predicting lost marker positions to produce smooth, physically plausible trajectories.",
      "Need to generate a pipeline for 3D to 2D reprojection to validate the corrected 3D pose data against a camera image plane, requiring coordinate system transformation (UE5 to OpenCV)."
    ],
    methods: [
      "Jitter and Gap Correction using two comparative Naive Filters.",
      "State estimation and smoothing using Kalman Filters (linear prediction).",
      "Stochastic tracking comparison using Particle Filters.",
      "Ground Truth Simulation and data extraction in Unreal Engine 5 (via Blueprints).",
      "Coordinate System Transformation (Left-Handed to Right-Handed) using homogeneous matrices.",
      "3D to 2D Projection of joint positions using OpenCV's `cv.projectPoints()`."
    ],
    tools: [
      "Python",
      "OpenCV",
      "NumPy",
      "Unreal Engine 5.4 (Blueprints)",
      "Adobe Mixamo (Retargeting)",
      "Blender (Bonus Visualization)",
    ],
    goal: [
      "Detect and correct tracking losses and noisy measurements to produce smooth, physically plausible marker trajectories.",
      "Compare the effectiveness and suitability of the Kalman vs. Particle filtering approaches for rigid body tracking.",
      "Utilize the corrected motion data to drive an animated character in an Unreal Engine 5 scene.",
      "Implement a 3D to 2D projection utility to visualize the corrected skeleton on a virtual camera image plane."
    ],
    context:
      "Work developed for the Computer Vision course at University of Trento (2023/2024). The project focuses on practical techniques for cleaning and reusing optical motion-capture datasets, combining classical filtering methods with engine integration and reprojection for comprehensive data validation.",
  },
  media: [
    {
      type: "gif",
      src: asset("/media/Optitrack/skeleton-cropped.gif"),
      alt: "clean-skeleton",
      caption: "Example of clean, smooth skeleton tracking data."
    },
    {
      type: "gif",
      src: asset("/media/Optitrack/ragnetto-basic-cropped.gif"),
      alt: "Noisy tracking data",
      caption: "Raw data showing frequent data loss and abrupt jumps (flickering) due to marker occlusion."
    },
    {
      type: "gif",
      src: asset("/media/Optitrack/ragnetto-KF.gif"),
      alt: "Kalman Filter result",
      caption: "Application of the Kalman Filter results in a significantly smoother and more realistic reconstructed trajectory."
    },
    {
      type: "gif",
      src: asset("/media/Optitrack/ragnetto-PF.gif"),
      alt: "Particle Filter result",
      caption: "The Particle Filter proved less effective for this rigid body tracking task without explicit body structure constraints."
    },
    {
      type: "image",
      src: asset("/media/Optitrack/scene.png"),
      alt: "Unreal Engine 5 animated scene",
      caption: "A screenshot of the Unreal Engine 5 scene where a virtual character is animated using the retargeted motion capture data."
    },
    {
      type: "embed",
      src: "https://www.youtube.com/embed/o15dF4TyqWo?si=WMWaUY_UT2sW1Vpg",
      caption: "Demonstration of the 3D to 2D projection of skeleton joints onto the camera image plane using OpenCV."
    },
    {
      type: "embed",
      src: "https://www.youtube.com/embed/D_EZb1E4K_M?si=QW-rhccGgU2Z-sOY",
      alt: "Blender visualization bonus",
      caption: "Bonus: Porting the animated character and data for visualization and analysis in Blender."
    }
  ],

  featured: true,
};

export default project;