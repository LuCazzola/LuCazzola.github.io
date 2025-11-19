import React, { useEffect, useRef, useState, useCallback } from "react";

type MediaItem =
  | { type: "image"; src: string; caption?: string; title?: string }
  | { type: "video"; src: string; poster?: string; caption?: string; title?: string }
  | { type: "embed"; src: string; caption?: string; title?: string };

interface MediaCarouselProps {
  items: MediaItem[];
}

const mimeFor = (src?: string) => {
  if (!src) return undefined;
  const ext = String(src).split('?')[0].split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'mp4': return 'video/mp4';
    case 'webm': return 'video/webm';
    case 'ogv': case 'ogg': return 'video/ogg';
    case 'mkv': return 'video/x-matroska';
    default: return undefined;
  }
};

const buildVideoSources = (s?: string) => {
  if (!s) return [] as string[];
  const url = String(s);
  const [path, query] = url.split('?');
  const ext = path.split('.').pop()?.toLowerCase() ?? '';
  const base = path.replace(/\.[^.]+$/, '');
  const candidates: string[] = [url];
  if (ext === 'mp4') {
    candidates.push(`${base}.webm${query ? `?${query}` : ''}`);
  } else if (ext === 'webm') {
    candidates.push(`${base}.mp4${query ? `?${query}` : ''}`);
  } else {
    candidates.push(`${base}.mp4${query ? `?${query}` : ''}`);
    candidates.push(`${base}.webm${query ? `?${query}` : ''}`);
  }
  return Array.from(new Set(candidates));
};

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

  // Ensure only the currently visible slide's video plays. Pause and reset others.
  useEffect(() => {
    slideRefs.current.forEach((slideEl, idx) => {
      if (!slideEl) return;
      const video = slideEl.querySelector('video') as HTMLVideoElement | null;
      if (!video) return;
      try {
        if (idx === slideIndex) {
          // start playback from the beginning for visible video
          video.currentTime = 0;
          const p = video.play();
          if (p && typeof p.then === 'function') p.catch(() => {});
        } else {
          video.pause();
          if (!isNaN(video.duration)) video.currentTime = 0;
        }
      } catch (e) {
        // ignore playback errors
      }
    });
  }, [slideIndex, slides.length, items.length]);

  return (
    <div className="w-full">
      {/* Title for the current slide (rendered separately above the media) */}
      {current?.title && (
        <div style={{ textAlign: 'center', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{current.title}</div>
      )}

      <div
        ref={containerRef}
        className="relative w-full rounded-md overflow-hidden bg-white"
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
              style={{ width: `${100 / Math.max(slides.length, 1)}%`, height: "100%", display: 'flex', flexDirection: 'column', background: 'white' }}
            >
              {it.type === "image" && (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* title intentionally rendered above the carousel as a separate element */}
                  <div style={{ marginTop: 'auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                      src={it.src}
                      alt={it.caption ?? 'media'}
                      className="w-full h-auto"
                      onLoad={onMediaLoad}
                      style={{ display: 'block', maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', position: 'relative', zIndex: 2, pointerEvents: 'auto' }}
                    />
                  </div>
                </div>
              )}

              {it.type === "video" && (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* title intentionally rendered above the carousel as a separate element */}
                  <div style={{ marginTop: 'auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <video
                      controls
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      poster={it.poster}
                      className="w-auto h-auto"
                      onLoadedMetadata={onMediaLoad}
                      style={{ maxHeight: '100%', maxWidth: '100%', background: 'black', position: 'relative', zIndex: 2, pointerEvents: 'auto', objectFit: 'contain' }}
                    >
                      {buildVideoSources(it.src).map((src, idx) => (
                        <source key={idx} src={src} {...(mimeFor(src) ? { type: mimeFor(src) } : {})} />
                      ))}
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}

              {it.type === "embed" && (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* title intentionally rendered above the carousel as a separate element */}
                  <div style={{ marginTop: 'auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <iframe
                      src={it.src}
                      title={it.caption ?? 'embed'}
                      className="w-full h-auto"
                      onLoad={onMediaLoad}
                      style={{ border: 0, maxHeight: '100%', maxWidth: '100%', position: 'relative', zIndex: 2, pointerEvents: 'auto' }}
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {items.length > 1 && (
          <>
            <button onClick={prev} aria-label="Previous" className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-300/80 rounded-full p-2" style={{ zIndex: 5 }}>
              ‹
            </button>
            <button onClick={next} aria-label="Next" className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-300/80 rounded-full p-2" style={{ zIndex: 5 }}>
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
