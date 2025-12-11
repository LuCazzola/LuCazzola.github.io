import React, { useState, useEffect } from "react";
import { FileText, Archive, Code, Download } from "lucide-react";
import { useParams, Navigate, Link, useNavigate } from "react-router-dom";
import { getPublicationById } from "@/data/publications";
import RenderAsMarkdown from "@/lib/RenderAsMarkdown";
import MediaCarousel from "@/components/MediaCarousel";
import ThreeBallSeparator from "@/components/ThreeBallSeparator";

const PublicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const pub = id ? getPublicationById(id) : null;
  const [mediaIndex, setMediaIndex] = useState(0);
  const navigate = useNavigate();

  // Ensure the publication detail always opens scrolled to top
  useEffect(() => {
    try {
      // standard
      window.scrollTo({ top: 0, left: 0 });
      // fallback for some browsers
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } catch (e) {
      // ignore in non-browser env
    }
  }, []);

  if (!pub) return <Navigate to="/publications" replace />;

  // widen the main container so the content area can be much larger and more readable
  const containerStyle: React.CSSProperties = { maxWidth: 1200, margin: "0 auto", padding: "28px" };
  // Responsive title size: scales between 28px and 48px based on viewport width
  const titleStyle: React.CSSProperties = { fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: 1.05, margin: 0 };
  // make author names more prominent
  const authorsStyle: React.CSSProperties = { marginTop: 12, color: "#333", fontSize: 18, fontWeight: 700 };
  // section box used for abstract and content blocks
  const sectionBox: React.CSSProperties = { background: "#f7f7f7", padding: 20, borderRadius: 8, marginTop: 20 };

  const hasMedia = Array.isArray(pub.media) && pub.media.length > 0;
  // Small inline disabled tooltip component to show instant tooltips on hover/focus
  const DisabledTooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => {
    const [show, setShow] = useState(false);
    return (
      <span
        style={{ position: 'relative', display: 'inline-block' }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
      >
        {children}
        {show && (
          <span
            role="tooltip"
            style={{
              position: 'absolute',
              top: -36,
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#111',
              color: '#fff',
              padding: '6px 8px',
              borderRadius: 6,
              fontSize: 12,
              whiteSpace: 'nowrap',
              zIndex: 1000,
            }}
          >
            {text}
          </span>
        )}
      </span>
    );
  };
  const media = hasMedia ? (pub.media as any) : [];

  // Build an ordered list of candidate video sources for broad compatibility.
  // If the provided URL has an extension like .mp4 or .webm, include the alternate
  // container with the same basename so the browser can pick a playable one.
  const buildVideoSources = (s?: string) => {
    if (!s) return [] as string[];
    const url = String(s);
    // strip query to detect extension, but preserve it for alternatives
    const [path, query] = url.split("?");
    const ext = path.split('.').pop()?.toLowerCase() ?? '';
    const base = path.replace(/\.[^.]+$/, '');
    const candidates: string[] = [url];
    if (ext === 'mp4') {
      candidates.push(`${base}.webm${query ? `?${query}` : ''}`);
    } else if (ext === 'webm') {
      candidates.push(`${base}.mp4${query ? `?${query}` : ''}`);
    } else {
      // unknown extension -> also try common alternatives
      candidates.push(`${base}.mp4${query ? `?${query}` : ''}`);
      candidates.push(`${base}.webm${query ? `?${query}` : ''}`);
    }
    // dedupe keeping order
    return Array.from(new Set(candidates));
  };

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

  // Use unified RenderAsMarkdown helper (handles [MEDIA:...] and spacing tokens)

  return (
    <div style={{ background: "#fff", color: "#111", minHeight: "100vh" }}>
      {/* Minimal top utility row */}
      <div style={{ borderBottom: "1px solid #e6e6e6", background: "#fff" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "10px 28px", display: "flex", justifyContent: "space-between", fontSize: 13, color: "#666" }}>
              <a
                href={import.meta.env.BASE_URL}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/", { replace: true });
                }}
                style={{ color: "#666", textDecoration: "none" }}
              >
                Back to site
              </a>
              <div>
                {pub.venue && pub.venue !== '?' ? (
                  <>{pub.venue} • {pub.year}</>
                ) : (
                  <>{pub.year}</>
                )}
              </div>
            </div>
      </div>

      <main style={{ paddingTop: 28, paddingBottom: 60 }}>
        <div style={containerStyle}>
          <header>
            <div style={{ textAlign: "center", margin: "0 auto" }}>
              {/* Title should use the full available container width */}
              <h1 style={{ ...titleStyle, maxWidth: '100%' }}>{pub.title}</h1>

              {/* Authors: list of [name, optionalLink] */}
              <div style={{ ...authorsStyle, textAlign: "center", display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
                {Array.isArray(pub.authors) && pub.authors.map((a, i) => (
                  <span key={i}>
                    {a[1] ? (
                      <a href={a[1]} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                        {a[0]}
                      </a>
                    ) : (
                      <span>{a[0]}</span>
                    )}
                    {i < (pub.authors as any[]).length - 1 && <span style={{ color: '#666' }}>, </span>}
                  </span>
                ))}
              </div>

              {/* Affiliations (optional) - bigger font */}
              {pub.affiliations && (
                <div style={{ marginTop: 8, color: "#666", fontSize: 16 }}>{pub.affiliations}</div>
              )}

              <div style={{ marginTop: 8, color: "#666", fontSize: 14 }}>
                {pub.venue && pub.venue !== '?' ? (
                  <>{pub.venue} • {pub.year}</>
                ) : (
                  <>{pub.year}</>
                )}
              </div>

              <div className="mt-4 flex gap-3 justify-center items-center" style={{ flexWrap: 'wrap' }}>
                {/* Paper (PDF) */}
                {pub.pdf ? (
                  <a
                    href={pub.pdf}
                    download
                    className="inline-flex items-center gap-2 rounded-md px-3 py-2 bg-[#0b69ff] text-white border border-[#0b69ff] transform transition-transform duration-150 hover:scale-105 hover:shadow-lg"
                  >
                    <FileText size={16} />
                    <span>Paper (PDF)</span>
                  </a>
                ) : (
                  <DisabledTooltip text="Coming soon">
                    <button disabled aria-label="Paper coming soon" className="inline-flex items-center gap-2 rounded-md px-3 py-2 border border-gray-200 text-gray-700 opacity-50 cursor-not-allowed">
                      <FileText size={16} />
                      <span>Paper (PDF)</span>
                    </button>
                  </DisabledTooltip>
                )}
                {/* Supplementary materials (zip, additional files) - placed after PDF */}
                {pub.supplementary ? (
                  <a
                    href={pub.supplementary}
                    download
                    className="inline-flex items-center gap-2 rounded-md px-3 py-2 bg-gray-700 text-white border border-gray-700 transform transition-transform duration-150 hover:scale-105 hover:shadow-lg"
                  >
                    <Download size={16} />
                    <span>Supplementary</span>
                  </a>
                ) : (
                  <DisabledTooltip text="No supplementary material">
                    <button disabled aria-label="Supplementary not available" className="inline-flex items-center gap-2 rounded-md px-3 py-2 border border-gray-200 text-gray-700 opacity-50 cursor-not-allowed">
                      <Download size={16} />
                      <span>Supplementary</span>
                    </button>
                  </DisabledTooltip>
                )}

                {/* ArXiv */}
                {pub.arxiv ? (
                  <a
                    href={pub.arxiv}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md px-3 py-2 bg-[#b31b1b] text-white border border-[#b31b1b] transform transition-transform duration-150 hover:scale-105 hover:shadow-lg"
                  >
                    <Archive size={16} />
                    <span>ArXiv</span>
                  </a>
                ) : (
                  <DisabledTooltip text="Coming soon">
                    <button disabled aria-label="ArXiv coming soon" className="inline-flex items-center gap-2 rounded-md px-3 py-2 border border-gray-200 text-gray-700 opacity-50 cursor-not-allowed">
                      <Archive size={16} />
                      <span>ArXiv</span>
                    </button>
                  </DisabledTooltip>
                )}

                {/* Code */}
                {pub.code ? (
                  <a
                    href={pub.code}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md px-3 py-2 bg-black text-white border border-black transform transition-transform duration-150 hover:scale-105 hover:shadow-lg"
                  >
                    <Code size={16} />
                    <span>Code</span>
                  </a>
                ) : (
                  <DisabledTooltip text="Coming soon">
                    <button disabled aria-label="Code coming soon" className="inline-flex items-center gap-2 rounded-md px-3 py-2 border border-gray-200 text-gray-700 opacity-50 cursor-not-allowed">
                      <Code size={16} />
                      <span>Code</span>
                    </button>
                  </DisabledTooltip>
                )}
              </div>
            </div>
          </header>

          {/* Main media below the buttons */}
          {(pub.image || hasMedia) && (
            <div style={{ marginTop: 56 }}>
              {pub.image ? (
                // Prefer the dedicated `image` field as the main media
                (() => {
                  const match = media.find((m: any) => m.type === "image" && m.src === pub.image);
                  return (
                    <div>
                      {match?.title && <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{match.title}</div>}
                      <img src={pub.image} alt={pub.title} style={{ width: "100%", objectFit: "cover", borderRadius: 8 }} />
                    </div>
                  );
                })()
              ) : media.length === 1 ? (
                media[0].type === "image" ? (
                  <div>
                    {media[0].title && <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{media[0].title}</div>}
                    <img src={media[0].src} alt={pub.title} style={{ width: "100%", objectFit: "cover", borderRadius: 8 }} />
                  </div>
                ) : media[0].type === "video" ? (
                  <div>
                    {media[0].title && <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{media[0].title}</div>}
                    <video controls loop autoPlay muted playsInline style={{ width: "100%", background: "transparent", borderRadius: 8 }}>
                      {buildVideoSources(media[0].src).map((src, idx) => (
                        <source key={idx} src={src} {...(mimeFor(src) ? { type: mimeFor(src) } : {})} />
                      ))}
                    </video>
                  </div>
                ) : (
                  <div>
                    {media[0].title && <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{media[0].title}</div>}
                    <div style={{ width: "100%"}}>
                      <iframe src={media[0].src} title={pub.title} style={{ width: "100%", height: "100%", border: 0 }} allowFullScreen />
                    </div>
                  </div>
                )
              ) : (
                <div>
                  <div style={{ width: "100%", borderRadius: 8, overflow: "hidden" }}>
                    {media[mediaIndex].type === "image" && (
                      <div style={{ height: '100%' }}>
                        {media[mediaIndex].title && <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{media[mediaIndex].title}</div>}
                        <img src={media[mediaIndex].src} alt={pub.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    )}
                    {media[mediaIndex].type === "video" && (
                      <div style={{ height: '100%' }}>
                        {media[mediaIndex].title && <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{media[mediaIndex].title}</div>}
                        <video controls loop autoPlay muted playsInline style={{ width: "100%", height: "100%", background: "transparent" }}>
                          {buildVideoSources(media[mediaIndex].src).map((src, idx) => (
                            <source key={idx} src={src} {...(mimeFor(src) ? { type: mimeFor(src) } : {})} />
                          ))}
                        </video>
                      </div>
                    )}
                    {media[mediaIndex].type === "embed" && (
                      <div style={{ height: '100%' }}>
                        {media[mediaIndex].title && <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{media[mediaIndex].title}</div>}
                        <iframe src={media[mediaIndex].src} title={pub.title} style={{ width: "100%", height: "100%", border: 0 }} allowFullScreen />
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 8 }}>
                    <button onClick={() => setMediaIndex((i) => (i - 1 + media.length) % media.length)} style={{ padding: "6px 10px" }}>Prev</button>
                    {media.map((_m: any, i: number) => (
                      <button key={i} onClick={() => setMediaIndex(i)} style={{ width: 10, height: 10, borderRadius: 5, background: i === mediaIndex ? "#111" : "#ccc", border: "none" }} />
                    ))}
                    <button onClick={() => setMediaIndex((i) => (i + 1) % media.length)} style={{ padding: "6px 10px" }}>Next</button>
                  </div>
                </div>
              )}

              {/* caption: show caption only when the displayed media has one */}
              {pub.image ? (
                // try to find a matching caption in the media array for this image
                (() => {
                  const match = media.find((m: any) => m.type === "image" && m.src === pub.image);
                  return match && match.caption ? <div style={{ marginTop: 8, color: "#555", fontSize: 13 }}>{match.caption}</div> : null;
                })()
              ) : (
                media[mediaIndex] && media[mediaIndex].caption && (
                  <div style={{ marginTop: 8, color: "#555", fontSize: 13 }}>{media[mediaIndex].caption}</div>
                )
              )}
            </div>
          )}

          {/* Abstract */}
          {pub.abstract && (
            <section style={sectionBox}>
              <h2 style={{ marginTop: 0 }}>Abstract</h2>
              <p style={{ marginBottom: 0 }}>{pub.abstract}</p>
            </section>
          )}

          {/* Content (markdown) with [CAROUSEL:1-2-3] token support (1-based indices) */}
          {pub.content && (
            <>
              <ThreeBallSeparator />

              <section style={{ marginBottom: 48 }}>{RenderAsMarkdown(pub.content, media, { math: true })}</section>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default PublicationDetail;
