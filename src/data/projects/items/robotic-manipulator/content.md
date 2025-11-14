## Summary

This project implements a **ROS-based pick-and-place system** for a **UR5 robotic manipulator** that must accurately locate, classify, and grasp scattered Mega Blocks (11 distinct shapes) on a tabletop, then place them in specific target locations according to their class. The system was designed around the principle of **modularity** to ensure each component performs a specific task.

Hardware used:
* **UR5 robotic arm**
* **ZED camera** (RGB-D)
* A set of Mega Blocks with 11 distinct 3D models

[MEDIA:1:0.8]

---

## Goal

Design a reliable pipeline that combines **real-time perception** (detection and classification), **robust 6-DoF pose estimation**, and **collision-aware motion planning** so the robot can operate successfully in non-static workspaces where objects may be displaced or partially occluded. The goal was specifically to implement a functioning system to improve image classification and object manipulation.

---

## System Overview: ROS Architecture

The entire system is built on **ROS (Robot Operating System)** and structured as three main cooperating nodes, primarily implemented in **C++** for better runtime performance. Communication between these nodes is managed via custom **ROS messages** and **topics**.

* **Image Processor Node**: In charge of object detection, classification, and pose estimation. It publishes collected data via the `ImageData` message on the `/imageProcessor/processed_data` topic.
    * **`ImageData` message components**: Object class type (integer), block position (array), and rotation matrix.
* **Task Planner Node**: Receives detection data, decides the sequence of intermediate points and actions (like gripper movement) required to reach and move the blocks, and sends these instructions to the motion processor. The task planner sends six positions for each detected block. It publishes the `RobotInstructions` message on the `/task_planner/robot_instructions` topic.
    * **`RobotInstructions` message components**: Detected object class type (integer), desired end-effector position (array), desired end-effector rotation matrix, a boolean for opening/closing the gripper, and a float for the gripper diameter.
* **Motion Processor Node**: Receives target points from the task planner, chooses the **best joint configuration** via inverse kinematics, computes the trajectory, and handles velocities, joint limits, singularities, and **collision detection**. It then publishes the final joint positions for the real/simulated robot.

[MEDIA:2:0.8]

---

## Synthetic Data and Detection (Perception Technique)

### Dataset Generation
Training an accurate detector requires labeled images. To bypass costly manual labeling, we constructed a **synthetic dataset** using the **Blender** virtual environment, based on the provided Mega Block `.stl` mesh files. A Python script was used to automatically generate scenes by randomizing the quantity, position, and rotation of the 11 blocks, ensuring no self-intersections. Additionally, the script randomized plastic-like materials (7 different colors), artificial light exposure, and the camera's focal length to enhance robustness. The controlled Blender environment made obtaining labels straightforward.

Our final dataset consisted of around **20,000 images**, with approximately **12,000 instances** for each of the 11 classes, ensuring a balanced class distribution. The validation set was composed of 500 synthetic images and approximately 220 manually labeled images from the real **ZED camera**.

### Model Training and Results
We chose a model from the **YOLO family** for fast and accurate real-time detection, specifically selecting **YOLOv5** by Ultralytics due to its compatibility with ROS 1. The model was trained for **11 epochs**, with the best weights selected from epoch 10.

The final detection results for the selected weights were strong:
| **Precision** | **Recall** | **mAP_0.5** | **mAP_0.5:0.95** |
| --- | --- | --- | --- |
| 0.977 | 0.968 | 0.987 | 0.873 |   

[MEDIA:3-4:0.8]

---

## 6-DoF Pose Estimation (Location and Orientation)

### Object Location (Translation)
Once the trained model detects an object in an image, its **location in space** is determined by extracting the point cloud, filtering the points corresponding to the detected image area, and then **averaging** all valid points. **Invalid points** (Nan values or points below the table height of 0.867) are ignored.

### Object Orientation (Rotation)
Estimating object orientation (pose estimation) was done using **point cloud registration techniques**, which is less common for a stationary camera. The method compares the **real point cloud** obtained from the ZED camera with points sampled directly from the corresponding **object's .stl file** (which acts as a "second point cloud").

The registration is executed in three steps:
1.  **Preprocessing**: Both point clouds are **downsampled**. **Normals** and **FPFH features** (descriptors that capture surface curvature and shape variation) are calculated for each point.
2.  **Global Registration**: **RANSAC** is run to find an initial, global estimation of the transformation that best aligns the two point clouds.
3.  **Local Refinement**: **ICP (Iterative Closest Point)** is then applied as a local registration technique to refine the RANSAC result, yielding a precise rotation matrix.

This process provided near-perfect results in the simulated environment, although it was slow, taking at least **~2 seconds per object**. Real-world lab testing revealed that the real point cloud was much **noisier** than the simulated one, adding difficulty to the problem.

[MEDIA:5:0.8]

---

## Motion Planning and Control (Robot Motion Technique)

### Trajectory Planning
We used a **cubic polynomial function** to describe the desired path of the end-effector, using the joint positions and velocities at the start and end of the trajectory as constraints. This provides a **smooth movement** and avoids spikes in velocity and acceleration. The trajectory time is estimated based on the joint that needs to move the most and its maximum velocity. We also implemented checks to correct generated joint angles that might fall outside their specified limits.

* **Alternative Trajectory Attempts**: We explored using a **quintic polynomial** to also control accelerations, but decided against it due to the lack of an effective way to use the additional parameters and to maintain lower computational complexity. We also attempted trajectories with **via points** to gain more control over end-effector rotations but faced issues determining appropriate velocities for the intermediate points.

### Differential Kinematics
**Differential kinematics** was implemented to make fine **adjustments to the trajectory**. This involves calculating the position and rotation error between the desired end-effector pose and the one obtained via direct kinematics. These errors, along with the desired end-effector velocity, are used with the **inverse of the Jacobian matrix** to compute the necessary **joint velocities**, which are then integrated to get the adjusted joint angles.

### Collision Detection
Collision checking is done by representing objects as **CollisionBoxes** (defined by a translation vector, rotation matrix, and size). To check for a collision, a point on the robot is transformed into the CollisionBox frame, and a simple check is performed to see if its coordinates fall within the box limits. Instead of checking every configuration of the trajectory (which would slow the process), collision detection is run only **every 10 configurations**, which was sufficient to avoid collisions.

### Key Performance Indicators (KPIs) in Gazebo
The system was validated in simulation (Gazebo), measuring the following KPIs:

| KPI | Description | Assignment 1 (Measured) | Assignment 2 (Measured) |
| :--- | :--- | :--- | :--- |
| **KPI 1-1** | Time to detect object position | ~0.165 sec | - |
| **KPI 1-2** | Time to move one object (pick and place) | ~22 sec | - |
| **KPI 2-1** | Total time to move all objects | - | ~1.32 min |