import type { Project } from "../../types";
import { asset } from "@/lib/asset";

const project: Project = {
  title: "GPU Parallelism: CUDA, Matrix Transposition & 2D Convolution",
  description:
    "An exploration of high-performance parallel computation on GPU using CUDA. Case studies include optimizing matrix transposition and 2D image convolution by leveraging shared memory, coalesced access, and cache-aware strategies to achieve significant speedup over optimized CPU implementations.",
  collaborators: ["Christian Dalvit"],
  when: { start: "2024-04", end: "2024-08" },
  tags: [
    "CUDA",
    "GPU programming",
    "Parallel Computing",
    "High Performance Computing",
    "Matrix Transpose",
    "2D Convolution",
    "C/C++",
    "Benchmarking",
  ],
  imageUrl: asset("/media/GPUcomputing/CUDA_Cube.jpg"),
  repoLinks: [
    { label: "Matrix Transpose repo", url: "https://github.com/LuCazzola/cudaMatrixTranspose" },
    { label: "2D Convolution repo", url: "https://github.com/LuCazzola/cuda2dConvolution" },
  ],
  docLinks: [
    { label: "Full Report (Matrix Transpose)", url: "https://lucazzola.github.io/resources/report_cudaMatrixTranspose.pdf" },
    { label: "Full Report (2D Convolution)", url: "https://lucazzola.github.io/resources/report_cuda2dConvolution.pdf" },
  ],
  overview: {
    problems: [
      "Modern workloads (especially machine learning) require massive parallelization for matrix and image operations. GPUs and CUDA provide the necessary throughput.",
      "Matrix Transposition and Image Convolution are fundamental operations that, when naively implemented, suffer severely from poor memory access patterns and cache behavior on both CPU and GPU.",
      "The key challenge is redesigning these algorithms to exploit the GPU's memory hierarchy (registers, shared memory, global memory) to ensure coalesced memory access."
    ],
    methods: [
      "CPU Optimizations: Transition from naive implementation to block-based algorithms to improve data locality and cache hit rates.",
      "GPU Transposition: CUDA implementation using Shared Memory to perform transposition locally (on blocks) and enable coalesced writes to global memory.",
      "GPU Convolution: Incremental optimization stages, culminating in a cache-aware design utilizing both Shared Memory for image patches and Constant Memory for the filter kernel.",
      "Performance Analysis: Benchmarking various implementations to quantify performance gains and memory utilization trade-offs."
    ],
    tools: [
      "CUDA",
      "C/C++",
      "CMake",
      "nvcc",
    ],
    goal: [
      "Implement and rigorously compare optimized CPU and GPU solutions for matrix transposition and 2D convolution.",
      "Analyze memory access patterns to implement block-based algorithms that maximize shared memory locality and coalescing on the GPU.",
      "Produce a robust benchmark and detailed report documenting the performance trade-offs between different levels of optimization."
    ],
    context:
      "This project was developed for the GPU Computing course at the University of Trento (a.y. 2023/2024), during the first year of the Master's degree in AI Systems. This experience provided significant hands-on exposure to parallel programming principles under the guidance of Professor Flavio Vella.",
  },
  media: [
    // Matrix Transpose
    {
      type: "image",
      src: asset("/media/GPUcomputing/matrix_transposition.png"),
      alt: "Matrix Transposition",
      caption: "Basic principle of matrix transposition."
    },
    {
      type: "image",
      src: asset("/media/GPUcomputing/the-cache-perspective.png"),
      alt: "The cache perspective",
      caption: "Illustration of non-local memory access during naive column-wise writing, causing cache misses."
    },
    {
      type: "image",
      src: asset("/media/GPUcomputing/swaps-displace.png"),
      alt: "Swaps and displacement",
      caption: "Concept of block-based transposition used to improve cache locality on the CPU."
    },
    {
      type: "image",
      src: asset("/media/GPUcomputing/transpose_blocks_gpu-schema.png"),
      alt: "Transpose blocks GPU schema",
      caption: "CUDA implementation schema using shared memory to transpose symmetrical blocks, enabling fast, coalesced memory access."
    }
    // 2D Convolution images should be added here if available in the final asset set.
    // Assuming the user's provided media list should be preserved/augmented for context.
  ],

  featured: true,
};

export default project;