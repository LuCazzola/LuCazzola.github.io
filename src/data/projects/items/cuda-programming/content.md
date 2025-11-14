## High-Performance Parallel Computing: Optimizing Matrix Transposition and 2D Convolution

This project explores advanced techniques to optimize two fundamental linear algebra operations—[Matrix Transposition](https://en.wikipedia.org/wiki/Transpose) and 2D Convolution—by exploiting memory hierarchy and parallelism on both CPU and GPU (CUDA).

## 🔁 The First Problem: Matrix Transposition

Matrix transposition involves transforming a matrix $X^{n,m}$ into $Y^{m,n}$ such that the rows of $X$ become the columns of $Y$. While simple, optimizing this operation is crucial for algorithms relying on linear algebra.

[MEDIA:1:0.8]

### CPU Optimization: The Cache Challenge

A straightforward (naive) CPU implementation performs an in-place swap along the main diagonal, requiring $O(n^2)$ time. However, this implementation is severely bottlenecked by **poor cache behavior** because most modern CPUs store matrices in **row-major order** (row-by-row).

* **Reading $X$**: Initial reads are sequential and cache-friendly.
* **Writing $Y$**: When attempting to write the transposed matrix $Y$ column-by-column, the writes are non-local (non-sequential), causing frequent **cache misses** that flush the fast cache and force slow accesses to main memory.

[MEDIA:2:0.8]

### CPU Solution: Blocking for Locality

To overcome cache misses, we apply the principle of **spatial and temporal locality** through **blocking**. The matrix is divided into smaller, square blocks. Transposition (swapping) is then performed only on elements belonging to symmetrical blocks with respect to the main diagonal. This localizes the computation, allowing the CPU to perform all necessary swaps within a block pair before the data leaves the fast cache.

[MEDIA:3:0.3]

### GPU Solution: CUDA and Shared Memory

The block-based strategy is translated to a high-performance **CUDA** implementation for the GPU. The core optimization leverages **Shared Memory**, which is approximately 100x faster than global memory.

* Each thread block is assigned to handle two symmetrical blocks from the input matrix $X$.
* Threads copy these blocks into fast Shared Memory.
* The transposition is performed within Shared Memory, and the result is written back to the output matrix using a swapped access pattern.
* This approach ensures **coalesced writes** to the slow global memory, the single most critical factor for high-throughput GPU performance.

[MEDIA:4:0.8]

## 🖼️ The Second Problem: Convolution on Images (2D)

**2D Convolution** is a fundamental operation where a small filter (kernel) is applied to every pixel of an image. This operation is essential for tasks like blurring, sharpening, and edge detection, and forms the core of many deep learning architectures.

### Incremental GPU Optimization Strategies

Our design process followed a **Divide-and-Conquer** strategy [https://en.wikipedia.org/wiki/Divide-and-conquer_algorithm], moving through five stages of incremental optimization to maximize parallel performance and memory efficiency.

1.  **CPU Naive**: The direct, sequential implementation of the mathematical definition.
2.  **GPU Naive**: Parallelizes the operation by assigning one thread to compute the convolution for each pixel.
3.  **GPU Shared Memory**: The convolution requires repeated access to the kernel and the image patch. This optimization loads the image patch into fast **Shared Memory** to drastically reduce repeated access times to slower Global Memory.
4.  **GPU Shared Memory using Constant Memory**: Since the convolution kernel is small and its values do not change, it is moved to the highly cached **Constant Memory**. This provides fast, simultaneous access to the kernel for all threads.
5.  **Cached GPU Shared Memory using Constant Memory**: This is the most refined optimization. It avoids explicitly copying the **padding** of an image patch into Shared Memory. Instead, it relies on the high probability that this overlapping padding data is already present in the fast **L2 Cache** from a neighboring thread block's previous computation, leveraging the GPU's memory hierarchy to the fullest.