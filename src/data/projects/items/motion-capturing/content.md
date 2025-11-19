## 📏 Fixing Flicker: Predictive Tracking for Optical Motion Data

### The Problem with High-Speed Optical Tracking

Optical tracking systems are incredibly fast, capturing data like marker positions, rotations, and joint lengths at speeds up to **360 frames per second (fps)** in our labs. This speed is impressive, but these systems frequently suffer from a critical flaw: **data dropout**.

The system requires a minimum number of cameras (usually three) to accurately triangulate a marker's position. When markers are momentarily blocked from view—say, by the body itself—the data stream experiences a **flickering or complete loss of information**, making the resulting animation choppy and unreliable.

We can visualize the raw, unprocessed data easily enough in a tool like Python's Matplotlib, but the defect is clear:

[MEDIA:1:0.4]

The issue becomes more pronounced in complex, fast-moving scenarios, leading to noticeable **flickering**, which is what we need to solve:

[MEDIA:2:0.4]

---

## 🧠 Addressing Data Loss with Naive Filters

To fix the lost information, we apply **external tracking**—specifically, predictive filters—to estimate the marker poses when sensor data is unavailable. We tested two common, "naive" filters for this task: the **Kalman filter** and a **Particle filter**.

1.  **Kalman Filter:** This is the most popular choice for tracking motion, especially for rigid bodies, as it effectively handles noise and predicts future states based on a linear model. The application resulted in a much smoother sequence, successfully filling the gaps. While some minor shaking is visible due to the motion's unpredictability, the result is quite good without any further processing:

[MEDIA:3:0.4]

2.  **Particle Filter:** This filter models movement stochastically, using a set of weighted particles. Its inherent nature makes it less suited for tracking rigid bodies, as it struggles to retain the fixed, correlated structure of a skeleton. Without a complex objective function to enforce the rigid body constraints between particles tracking different markers, the result was less stable:

[MEDIA:4:0.4]

---

## 🎮 Generating Ground Truth: Unreal Engine 5 Simulation

To test our projection methods and generate reliable ground truth data, we created a virtual environment in **Unreal Engine 5.4 (UE)**. Our goal here was to extract precise 3D pose information (skeleton joints, camera intrinsics) necessary for the subsequent **3D to 2D projection**.

This was our first venture into UE, so we leveraged **Blueprints (BP)**—UE's visual node-graph scripting system—instead of C++. We modeled the scene, positioned the actors (skeleton and camera), and used UE5's animation retargeting feature to easily map a provided animation onto a free skeleton from **Adobe Mixamo**.

[MEDIA:5:0.8]

A **Level Sequencer** component was then used to capture the virtual camera's video feed. Crucially, we implemented a custom BP script using the JSON utility plugin to systematically extract all necessary data into a JSON format for every frame:
* **Bones:** Position ($\{x,y,z\}$) and Quaternion Rotation ($\{x, y, z, w \}$) for every bone in the skeleton.
* **Skeleton Base Frame:** Position and rotation of the skeleton's root.
* **Camera:** Position, rotation (quaternion), **Field of View (FOV)**, and aspect ratio (since the camera is fixed).

You can rapidly inspect the core data-gathering Blueprint [Here](https://blueprintue.com/blueprint/_qn_vgvc/), or download it from our repo.

---

## 📷 The Final Step: 3D to 2D Projection

We used **OpenCV** as our image processing framework to perform the final **3D to 2D projection**—displacing the 3D joint points onto the camera's 2D image plane.

The first major hurdle was the **coordinate system mismatch** between the two frameworks:
* **UE5 (Left-Handed):** $+X$ = forward, $+Y$ = right, $+Z$ = up.
* **OpenCV (Right-Handed):** $+X$ = right, $+Y$ = down, $+Z$ = forward (depth).

All the pose data extracted from UE had to be converted via a **change of basis**, a task easily handled using **homogeneous transformation matrices**.

Once the joint and camera world coordinates were consistent, we extracted the camera's **intrinsic parameters**. Since our virtual environment is controlled and has no lens distortion, we were able to compute these directly via algebra instead of using traditional camera calibration. Finally, applying the transformation with OpenCV's built-in `cv.projectPoints()` function successfully displaced the skeletal structure onto the image plane.

[MEDIA:6:0.8]

---

## 🎁 Bonus: Better Visualization in Blender

While Matplotlib helped us visualize the raw data, for more suitable and sophisticated result evaluation, we forwarded the processed data to **Blender**. We based this work on the [deep-motion-editing](https://github.com/DeepMotionEditing/deep-motion-editing) repository, which provides a framework for interacting with Blender's Python APIs to build custom, skeleton-aware neural network applications.

[MEDIA:7:0.8]