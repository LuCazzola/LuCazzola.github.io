import React, { useState } from "react";
import { FileText, Archive, Code } from "lucide-react";
import { useParams, Navigate, Link, useNavigate } from "react-router-dom";
import { getPublicationById } from "@/data/publications";
import RenderAsMarkdown from "@/lib/RenderAsMarkdown";
import MediaCarousel from "@/components/MediaCarousel";

const PublicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const pub = id ? getPublicationById(id) : null;
  const [mediaIndex, setMediaIndex] = useState(0);
  const navigate = useNavigate();

  if (!pub) return <Navigate to="/publications" replace />;

  // widen the main container so the content area can be much larger and more readable
  const containerStyle: React.CSSProperties = { maxWidth: 1200, margin: "0 auto", padding: "28px" };
  const titleStyle: React.CSSProperties = { fontSize: 48, lineHeight: 1.05, margin: 0 };
  // make author names more prominent
  const authorsStyle: React.CSSProperties = { marginTop: 12, color: "#333", fontSize: 18, fontWeight: 700 };
  // section box used for summary and content blocks
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

              <div className="mt-4 flex gap-3 justify-center items-center">
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
          {hasMedia && (
            <div style={{ marginTop: 28 }}>
                {media.length === 1 ? (
                media[0].type === "image" ? (
                  <img src={media[0].src} alt={pub.title} style={{ width: "100%", height: 480, objectFit: "cover", borderRadius: 8 }} />
                ) : media[0].type === "video" ? (
                  <video controls style={{ width: "100%", height: 480, background: "#000", borderRadius: 8 }}>
                    <source src={media[0].src} />
                  </video>
                ) : (
                  <div style={{ width: "100%", height: 480 }}>
                    <iframe src={media[0].src} title={pub.title} style={{ width: "100%", height: "100%", border: 0 }} allowFullScreen />
                  </div>
                )
              ) : (
                <div>
                  <div style={{ width: "100%", height: 480, borderRadius: 8, overflow: "hidden" }}>
                    {media[mediaIndex].type === "image" && (
                      <img src={media[mediaIndex].src} alt={pub.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    )}
                    {media[mediaIndex].type === "video" && (
                      <video controls style={{ width: "100%", height: "100%", background: "#000" }}>
                        <source src={media[mediaIndex].src} />
                      </video>
                    )}
                    {media[mediaIndex].type === "embed" && (
                      <iframe src={media[mediaIndex].src} title={pub.title} style={{ width: "100%", height: "100%", border: 0 }} allowFullScreen />
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

              {media[mediaIndex] && media[mediaIndex].caption && (
                <div style={{ marginTop: 8, color: "#555", fontSize: 13 }}>{media[mediaIndex].caption}</div>
              )}
            </div>
          )}

          {/* Summary */}
          {pub.summary && (
            <section style={sectionBox}>
              <h2 style={{ marginTop: 0 }}>Summary</h2>
              <p style={{ marginBottom: 0 }}>{pub.summary}</p>
            </section>
          )}

          {/* Content (markdown) with [CAROUSEL:1-2-3] token support (1-based indices) */}
          {pub.content && (
            // outer wrapper: keep neutral background here; individual text blocks will use the gray `sectionBox`
            <section style={{ marginTop: 20 }}>
              <div style={{ maxWidth: "100%" }}>{RenderAsMarkdown(pub.content, media, { math: true })}</div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default PublicationDetail;
