import React, { useEffect, useRef, useState, useCallback } from "react";

type MediaItem =
  | { type: "image"; src: string; caption?: string }
  | { type: "video"; src: string; poster?: string; caption?: string }
  | { type: "embed"; src: string; caption?: string };

interface MediaCarouselProps {
  items: MediaItem[];
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({ items }) => {
  // (removed previous `index` state; we use slideIndex and compute currentIndex)
  const [maxHeight, setMaxHeight] = useState<number | null>(null);
  const DEFAULT_HEIGHT = 320; // fallback height while we measure
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [disableTransition, setDisableTransition] = useState(false);

  // For continuous sliding we clone first and last slides when there are multiple items
  const slides = items.length > 1 ? [items[items.length - 1], ...items, items[0]] : items;

  // internal slide index into `slides` (starts at 1 when there are clones)
  const [slideIndex, setSlideIndex] = useState(items.length > 1 ? 1 : 0);

  // logical current index in original items
  const currentIndex = items.length > 0 ? ((slideIndex - 1 + items.length) % items.length) : 0;
  const current = items[currentIndex];

  const next = useCallback(() => setSlideIndex((s) => s + 1), []);
  const prev = useCallback(() => setSlideIndex((s) => s - 1), []);

  const measure = useCallback(() => {
    // measure each slide's height and set the max
    const heights = slideRefs.current.map((el) => {
      if (!el) return 0;
      // use scrollHeight to capture intrinsic content height
      return el.scrollHeight || el.getBoundingClientRect().height || 0;
    });
    const max = Math.max(...heights, 0);
    if (max > 0) setMaxHeight(max);
  }, []);

  // Re-measure when items change
  useEffect(() => {
    measure();
    // also re-measure after a short delay to let images load in some cases
    const t = setTimeout(measure, 250);
    // re-measure on window resize
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [items, measure]);

  // handlers to re-measure when media loads
  const onMediaLoad = () => {
    measure();
  };

  // ensure refs array length matches items
  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, slides.length);
  }, [slides.length]);

  // keep slideIndex in valid range if items change
  useEffect(() => {
    if (items.length <= 1) {
      setSlideIndex(0);
    } else if (slideIndex < 0) {
      setSlideIndex(slides.length - 2);
    } else if (slideIndex > slides.length - 1) {
      setSlideIndex(1);
    }
  }, [items.length, slideIndex, slides.length]);

  // transition end handler to snap when we hit cloned slides
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onEnd = () => {
      if (items.length <= 1) return;
      if (slideIndex === slides.length - 1) {
        // moved to cloned first slide at end -> jump to real first (index 1)
        setDisableTransition(true);
        setSlideIndex(1);
        requestAnimationFrame(() => requestAnimationFrame(() => setDisableTransition(false)));
      } else if (slideIndex === 0) {
        // moved to cloned last slide at start -> jump to real last
        setDisableTransition(true);
        setSlideIndex(slides.length - 2);
        requestAnimationFrame(() => requestAnimationFrame(() => setDisableTransition(false)));
      }
    };

    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, [slideIndex, slides.length, items.length]);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="relative w-full rounded-md overflow-hidden bg-gray-50"
        style={{ height: maxHeight ? `${maxHeight}px` : `${DEFAULT_HEIGHT}px` }}
      >
        {/* track */}
        <div
          ref={trackRef}
          className="w-full h-full"
          style={{
            width: `${slides.length * 100}%`,
            display: "flex",
            transition: disableTransition ? "none" : "transform 420ms ease",
            transform: `translateX(-${slideIndex * (100 / Math.max(slides.length, 1))}%)`,
            willChange: "transform",
            height: "100%",
          }}
        >
          {slides.map((it, i) => (
            <div
              key={i}
              ref={(el) => (slideRefs.current[i] = el)}
              className="w-full flex-shrink-0"
              style={{ width: `${100 / Math.max(slides.length, 1)}%`, height: "100%" }}
            >
              {it.type === "image" && (
                <img
                  src={it.src}
                  alt={it.caption ?? "media"}
                  className="w-full h-full object-cover"
                  onLoad={onMediaLoad}
                  style={{ display: "block", height: "100%", width: "100%", objectFit: "cover" }}
                />
              )}

              {it.type === "video" && (
                <video
                  controls
                  poster={it.poster}
                  className="w-full h-full bg-black"
                  onLoadedMetadata={onMediaLoad}
                  style={{ height: "100%", width: "100%" }}
                >
                  <source src={it.src} />
                  Your browser does not support the video tag.
                </video>
              )}

              {it.type === "embed" && (
                <iframe
                  src={it.src}
                  title={it.caption ?? "embed"}
                  className="w-full h-full"
                  onLoad={onMediaLoad}
                  style={{ border: 0, height: "100%", width: "100%" }}
                  allowFullScreen
                />
              )}
            </div>
          ))}
        </div>
        {items.length > 1 && (
          <>
            <button onClick={prev} aria-label="Previous" className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2">
              ‹
            </button>
            <button onClick={next} aria-label="Next" className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2">
              ›
            </button>
          </>
        )}
      </div>

      {/* caption for current */}
      {current?.caption && <div className="text-sm text-muted-foreground mt-2">{current.caption}</div>}

      {/* indicators */}
      {items.length > 1 && (
        <div className="mt-3 flex items-center gap-2 justify-center">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i + 1)}
              className={`w-2 h-2 rounded-full ${i === currentIndex ? "bg-primary" : "bg-gray-300"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaCarousel;
