import React, { useEffect, useRef, useState, useCallback } from "react";

type Item =
  | { type: "image"; src: string; caption?: string; title?: string }
  | { type: "video"; src: string; poster?: string; caption?: string; title?: string }
  | { type: "embed"; src: string; caption?: string; title?: string };

const mimeFor = (src?: string) => {
  const ext = src?.split("?")[0].split(".").pop()?.toLowerCase();
  if (ext === "mp4") return "video/mp4";
  if (ext === "webm") return "video/webm";
  if (ext === "ogv" || ext === "ogg") return "video/ogg";
};

const videoSources = (s?: string) => {
  if (!s) return [] as string[];
  const [path, query] = s.split("?");
  const ext = path.split(".").pop()?.toLowerCase() ?? "";
  const base = path.replace(/\.[^.]+$/, "");
  const q = query ? `?${query}` : "";
  const c = [s];
  if (ext === "mp4") c.push(`${base}.webm${q}`);
  else if (ext === "webm") c.push(`${base}.mp4${q}`);
  else { c.push(`${base}.mp4${q}`); c.push(`${base}.webm${q}`); }
  return [...new Set(c)];
};

const DEFAULT_H = 320;

const MediaCarousel: React.FC<{ items: Item[] }> = ({ items }) => {
  const hasClones = items.length > 1;
  const slides = hasClones ? [items[items.length - 1], ...items, items[0]] : items;
  const [si, setSi] = useState(hasClones ? 1 : 0);
  const [noTransition, setNoTransition] = useState(false);
  const [height, setHeight] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth <= 640);
  const refs = useRef<Array<HTMLDivElement | null>>([]);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const ci = items.length > 0 ? ((si - 1 + items.length) % items.length) : 0;

  const measure = useCallback(() => {
    if (isMobile) { setHeight(null); return; }
    const cur = refs.current[si];
    const h = cur ? (cur.scrollHeight || cur.getBoundingClientRect().height) : 0;
    const limit = Math.floor((window.innerHeight || 800) * 0.8);
    const final = Math.min(Math.max(h, DEFAULT_H), limit);
    if (final > 0) setHeight(final);
  }, [isMobile, si]);

  useEffect(() => { measure(); const t = setTimeout(measure, 250); window.addEventListener("resize", measure); return () => { clearTimeout(t); window.removeEventListener("resize", measure); }; }, [items, measure]);
  useEffect(() => { const t = setTimeout(measure, 120); return () => clearTimeout(t); }, [si, measure]);
  useEffect(() => { const h = () => { setIsMobile(window.innerWidth <= 640); measure(); }; window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, [measure]);
  useEffect(() => { refs.current = refs.current.slice(0, slides.length); }, [slides.length]);
  useEffect(() => {
    if (!hasClones) { setSi(0); return; }
    if (si < 0) setSi(slides.length - 2);
    else if (si > slides.length - 1) setSi(1);
  }, [hasClones, si, slides.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onEnd = () => {
      if (!hasClones) return;
      if (si === slides.length - 1) { setNoTransition(true); setSi(1); requestAnimationFrame(() => requestAnimationFrame(() => setNoTransition(false))); }
      else if (si === 0) { setNoTransition(true); setSi(slides.length - 2); requestAnimationFrame(() => requestAnimationFrame(() => setNoTransition(false))); }
    };
    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, [si, slides.length, hasClones]);

  useEffect(() => {
    refs.current.forEach((el, idx) => {
      const v = el?.querySelector("video") as HTMLVideoElement | null;
      if (!v) return;
      try { if (idx === si) { v.currentTime = 0; v.play()?.catch(() => {}); } else { v.pause(); if (!isNaN(v.duration)) v.currentTime = 0; } } catch {}
    });
  }, [si, slides.length]);

  const W = slides.length;
  const pct = (n: number) => `${(100 / Math.max(W, 1)) * n}%`;
  const heightPx = height ? `${height}px` : `${DEFAULT_H}px`;

  return (
    <div className="w-full">
      <div className="relative w-full rounded-md overflow-hidden bg-white" style={{ height: heightPx }}>
        <div ref={trackRef} style={{ width: `${W * 100}%`, display: "flex", height: height ? "100%" : "auto", transition: noTransition ? "none" : "transform 420ms ease", transform: `translateX(-${si * parseFloat(pct(1))}%)` }}>
          {slides.map((it, i) => {
            const ri = hasClones ? ((i - 1 + items.length) % items.length) : i;
            const dist = Math.min(Math.abs(ri - ci), Math.max(items.length, 1) - Math.abs(ri - ci));
            const heavy = dist <= 1;
            const colStyle: React.CSSProperties = { width: pct(1), flexShrink: 0, height: height ? "100%" : "auto", display: "flex", flexDirection: "column", background: "white" };
            const innerStyle: React.CSSProperties = { marginTop: "auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" };
            const Title = it.title ? <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6, textAlign: "center" }}>{it.title}</div> : null;

            return (
              <div key={i} ref={(el) => (refs.current[i] = el)} style={colStyle}>
                <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={innerStyle}>
                    {it.type === "image" && <>{Title}<img src={it.src} alt={it.caption ?? "media"} loading="lazy" onLoad={measure} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block", width: "100%", height: "auto" }} /></>}
                    {it.type === "video" && (
                      <>{Title}
                        {heavy
                          ? <video controls loop muted playsInline preload="metadata" poster={(it as any).poster} onLoadedMetadata={measure} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", background: "black" }}>
                              {videoSources(it.src).map((s, j) => <source key={j} src={s} {...(mimeFor(s) ? { type: mimeFor(s) } : {})} />)}
                            </video>
                          : <div style={{ width: "100%", height: 180, background: "#000", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", opacity: 0.7 }}>Video</div>}
                      </>
                    )}
                    {it.type === "embed" && (
                      <>{Title}
                        {heavy
                          ? <iframe src={it.src} title={it.caption ?? "embed"} allowFullScreen onLoad={measure} style={{ border: 0, width: "100%", height: "auto", maxWidth: "100%" }} />
                          : <div style={{ width: "100%", height: 180, background: "#eee", display: "flex", alignItems: "center", justifyContent: "center", color: "#666" }}>Embed</div>}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {hasClones && (
          <>
            <button onClick={() => setSi((s) => s - 1)} aria-label="Previous" style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(200,200,200,0.85)", borderRadius: "50%", width: 32, height: 32, border: "none", cursor: "pointer", zIndex: 5, fontSize: 20, lineHeight: 1 }}>‹</button>
            <button onClick={() => setSi((s) => s + 1)} aria-label="Next" style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(200,200,200,0.85)", borderRadius: "50%", width: 32, height: 32, border: "none", cursor: "pointer", zIndex: 5, fontSize: 20, lineHeight: 1 }}>›</button>
          </>
        )}
      </div>

      {items[ci]?.caption && <div style={{ fontSize: 13, color: "#666", marginTop: 8 }}>{items[ci].caption}</div>}

      {hasClones && (
        <div style={{ marginTop: 12, display: "flex", gap: 8, justifyContent: "center" }}>
          {items.map((_, i) => (
            <button key={i} onClick={() => setSi(i + 1)} aria-label={`Slide ${i + 1}`}
              style={{ width: 8, height: 8, borderRadius: "50%", background: i === ci ? "hsl(var(--primary))" : "#ccc", border: "none", cursor: "pointer", padding: 0 }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaCarousel;
