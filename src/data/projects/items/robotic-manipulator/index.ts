import type { Project } from "../../types";
import { asset } from "@/lib/asset";

const project: Project = {
  title: "Robotic Manipulator: Perception, Control, and ROS Integration",
  description:
    "A modular ROS-based pick-and-place pipeline for a UR5 arm, designed to handle randomly displaced objects. The system uses a synthetic-data-trained YOLOv5 detector and geometric 6-DoF pose estimation (FPFH + RANSAC + ICP) for robust, real-time operation.",
  when: { start: "2023-02", end: "2023-07" },
  collaborators: ["Sergio Brodesco", "Dennis Cattoni"],
  tags: [
    "ROS",
    "UR5",
    "ZED2",
    "Computer Vision",
    "YOLOv5",
    "Blender",
    "Point Cloud",
    "Kinematics",
    "Motion Planning",
    "Gazebo",
    "C++",
    "Python",
  ],
  imageUrl: asset("/media/robotica/roboticManipulator-arm.jpeg"),
  repoLinks: [
    { label: "GitHub Repository (Code)", url: "https://github.com/SergioBrodesco/FdR-groupW" }
  ],
  docLinks: [
    { label: "Complete Report", url: "https://github.com/SergioBrodesco/FdR-groupW/blob/master/Project-1_Robot-Robotic_Manipulator.pdf" }
  ],
  overview: {
    problems: [
      "Develop a reliable robotic manipulator system capable of adapting to non-static workspaces where target objects (Mega Blocks) are randomly positioned.",
      "Integrate complex sensing (real-time detection and 6-DoF pose estimation) and motion control (inverse kinematics, trajectory planning) components into a fluent, modular ROS environment.",
      "Achieve high performance and efficiency despite the computational complexity of geometric pose estimation."
    ],
    methods: [
      "Modular ROS Architecture (3 C++ Nodes)",
      "Synthetic Dataset Generation (Blender)",
      "Real-time Detection & Classification (YOLOv5)",
      "Geometry-based 6-DoF Pose Estimation (FPFH + RANSAC + ICP)",
      "Trajectory Planning (Cubic Polynomials)",
      "Motion Control (Differential Kinematics)",
      "Collision Detection (CollisionBoxes)"
    ],
    tools: [
      "Python",
      "C++",
      "ROS (Robot Operating System)",
      "Blender",
      "YOLOv5",
      "ZED2 (RGB-D Camera)",
      "PCL (Point Cloud Library)",
      "Gazebo (Simulation)",
      "PyTorch"
    ],
    goal: [
      "Enable a UR5 robotic arm to grasp randomly displaced Mega Blocks (11 classes) and place them in class-specific target locations.",
      "Design a robust, integrated pipeline where the sensorial (Perception) and dynamic (Motion) components communicate effectively within the ROS environment.",
      "Demonstrate system feasibility in simulation, meeting Key Performance Indicators (KPIs) like a total time to move all objects of approximately 1.32 minutes."
    ],
    context:
      'Part of the "Fondamenti di Robotica" (Fundamentals of Robotics) course at the University of Trento (a.y. 2022/2023). The assignment required designing and implementing a complete robotic pipeline from scratch, including custom re-implementation of kinematic functions for learning purposes.',
  },
  media: [
    {
      type: "embed",
      src: "https://www.youtube.com/embed/KMwLXcuJvw0?si=UT9QE46Y6_CFvpVf",
      alt: "robotic-manipulator-video",
      caption: "Our full system in action, demonstrating the integrated pipeline of perception, motion planning, and control in a ROS & Gazebo simulated environment."
    },
    {
      type: "image",
      src: asset("/media/robotica/ROS-architecture.png"),
      alt: "ROS architecture diagram",
      caption: "The modular ROS architecture we designed, structured around three core cooperating nodes (Image Processor, Task Planner, Motion Processor)."
    },
    {
      type: "image",
      src: asset("/media/robotica/syn_data_1.png"),
      alt: "Synthetic data example",
      caption: "An example of the synthetic data generated in Blender, which included randomization of position, rotation, materials, and lighting to train the YOLO model."
    },
    {
      type: "image",
      src: asset("/media/robotica/detection_all.png"),
      alt: "Real world detection example",
      caption: "Real-world detection example. Our YOLOv5 model, trained predominantly on synthetic data, demonstrated strong generalization to the real environment."
    },
    {
      type: "image",
      src: asset("/media/robotica/rots.png"),
      alt: "6-DoF pose estimation example",
      caption: "Visualization of the 6-DoF pose estimation result, showing the aligned coordinate frame used for accurate grasping."
    },
    {
      type: "image",
      src: asset("/media/robotica/differential_kinematic_control_scheme.svg"),
      alt: "Differential kinematic control scheme",
      caption: "Diagram illustrating the differential kinematic control scheme used to make fine adjustments to the robot's trajectory."
    }
  ],

  featured: true,
};

export default project;