import { useParams, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProjectById, ProjectMediaItem } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, FileText, ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import RenderAsMarkdown from "@/lib/RenderAsMarkdown";
import ThreeBallSeparator from "@/components/ThreeBallSeparator";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? getProjectById(id) : null;

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  // local state to manage open menus on small screens
  const [codeMenuOpen, setCodeMenuOpen] = useState(false);
  const [reportMenuOpen, setReportMenuOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement | null>(null);

  // click-away to close menus
  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (resourcesRef.current && !resourcesRef.current.contains(target)) {
        setCodeMenuOpen(false);
        setReportMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  // Use unified markdown + media renderer
  // NOTE: RenderAsMarkdown will enable math support; pass project.media as the media array

  // Prefer a grouped overview object when available; otherwise fall back to top-level fields
  const overview = project.overview ?? {};

  const formatWhen = (w?: { start?: string; end?: string }) => {
    if (!w) return '';
    const fmt = (s?: string) => {
      if (!s) return '';
      const m = String(s).match(/^(\d{4})-(\d{2})/);
      if (m) {
        const y = m[1];
        const mm = parseInt(m[2], 10);
        const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return `${monthNames[Math.max(0, Math.min(11, mm - 1))]} ${y}`;
      }
      return String(s);
    };
    if (w.end === '?') return `${fmt(w.start)} — ongoing`;
    return `${fmt(w.start)} — ${fmt(w.end)}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-16 flex-1">
  <div className="container mx-auto px-4 max-w-6xl">
    {/* main content column: constrain main text to a consistent readable width */}
    <div className="mx-auto max-w-5xl">
    <div className="mb-8">
            <h1 className="font-serif text-4xl md:text-5xl text-primary mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {project.description}
            </p>
            <div>
              <div className="mt-2">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-accent text-accent-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Project overview box (Problems / Methods / Tools / Goals) */}
          <div className="mb-8">
      {/* overview box slightly narrower than the main column; reduce the gap to half of previous
        by using a custom max-width between 4xl and 5xl (60rem). */}
      <div className="mx-auto max-w-[60rem]">
              <div className="bg-sky-50 border border-sky-100 rounded-lg p-6">
              <h2 className="text-sm font-semibold text-sky-700 mb-2">Project Overview</h2>
              <hr className="border-t border-sky-100 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Problems */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Problems</h3>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {overview?.problems ? (
                      Array.isArray(overview.problems) ? (
                        <div className="space-y-2">
                          {overview.problems.map((p, i) => (
                            <p key={i} className="m-0">{p}</p>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {String(overview.problems).split(/\n{2,}/).map((para, i) => (
                            <p key={i} className="m-0">{para}</p>
                          ))}
                        </div>
                      )
                    ) : (
                      <div className="text-sm text-muted-foreground">Not specified.</div>
                    )}
                  </div>
                </div>

                {/* Methods */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Methods</h3>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {overview?.methods ? (
                      Array.isArray(overview.methods) ? (
                        <ul className="list-disc pl-5 space-y-2">
                          {overview.methods.map((m, i) => (
                            <li key={i}><p className="m-0">{m}</p></li>
                          ))}
                        </ul>
                      ) : (
                        <ul className="list-disc pl-5 space-y-2">
                          {String(overview.methods).split(/[.;]\s*/).filter(Boolean).map((m, i) => (
                            <li key={i}><p className="m-0">{m.trim()}{m.trim().endsWith('.') ? '' : '.'}</p></li>
                          ))}
                        </ul>
                      )
                    ) : (
                      <div className="text-sm text-muted-foreground">Not specified.</div>
                    )}
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Tools</h3>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {overview?.tools && overview.tools.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-2">
                        {overview.tools.map((t, i) => (
                          <li key={i}><p className="m-0">{t}</p></li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-muted-foreground">Not specified.</div>
                    )}
                  </div>
                </div>

                {/* Goals */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Goals</h3>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {overview?.goal ? (
                      Array.isArray(overview.goal) ? (
                        <div className="space-y-2">
                          {overview.goal.map((g, i) => (
                            <p key={i} className="m-0">{g}</p>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {String(overview.goal).split(/\n{2,}/).map((para, i) => (
                            <p key={i} className="m-0">{para}</p>
                          ))}
                        </div>
                      )
                    ) : (
                      <span className="text-sm text-muted-foreground">Not specified.</span>
                    )}
                  </div>
                </div>
              </div>
              {/* collaborators / credit separator */}
              {project.collaborators && (
                <div className="mt-6 pt-4 border-t border-sky-100 text-sm text-sky-700">
                  {Array.isArray(project.collaborators) ? (
                    `Developed in collaboration with ${project.collaborators.join(" & ")}${project.when ? ` (${formatWhen(project.when)})` : ""}`
                  ) : (
                    // fallback if a string is present
                    <>{project.collaborators}{project.when ? ` (${formatWhen(project.when)})` : ''}</>
                  )}
                </div>
              )}
              </div>
            </div>
          </div>

          {/* resources placeholder - moved below Context */}

          <div className="prose prose-lg mx-auto max-w-5xl">
            {/* Context */}
            {/* Small Context section (compact) */}
            {overview?.context && (
              <section className="mb-8">
                <h3 className="text-base font-semibold text-primary mb-2">Context</h3>
                <p className="text-sm text-muted-foreground">{overview.context}</p>
              </section>
            )}

            {/* Centered resources (Code / Reports) BELOW Context */}
            <div className="mb-8">
              <div className="mx-auto max-w-3xl">
                <div ref={resourcesRef} className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  {(() => {
                    const codeLinks = project.repoLinks && project.repoLinks.length > 0
                      ? project.repoLinks
                      : [];

                    const docLinks = project.docLinks && project.docLinks.length > 0
                      ? project.docLinks
                      : [];

                    const renderLinkGroup = (label: string, icon: React.ReactNode, links: { label?: string; url: string }[]) => {
                      if (links.length === 0) return null;

                      if (links.length === 1) {
                        return (
                          <Button
                            asChild
                            size="sm"
                            className="bg-black text-white border-black hover:bg-[#111] transform transition-transform duration-150 hover:scale-105 hover:shadow-lg inline-flex items-center gap-2 px-3 py-2"
                          >
                            <a href={links[0].url} target="_blank" rel="noopener noreferrer">
                              {label}
                              {icon}
                            </a>
                          </Button>
                        );
                      }

                      const isCode = label === "Code";
                      const open = isCode ? codeMenuOpen : reportMenuOpen;
                      const setOpen = isCode ? setCodeMenuOpen : setReportMenuOpen;

                      return (
                        <div className="relative inline-flex items-center rounded-md overflow-visible group w-full sm:w-auto">
                          <button
                            type="button"
                            aria-haspopup="menu"
                            aria-expanded={open}
                            onClick={() => setOpen((s: boolean) => !s)}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-black text-white rounded-md border border-black w-full sm:w-auto justify-center"
                          >
                            <span className="inline-flex items-center gap-2">
                              <span>{label}</span>
                              {icon}
                            </span>
                          </button>

                          <div
                            className={
                              "absolute right-0 top-full mt-1 w-56 rounded-md border bg-popover text-popover-foreground shadow-md transform transition-all duration-200 z-50 " +
                              (open
                                ? "opacity-100 translate-y-0 pointer-events-auto"
                                : "opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto")
                            }
                          >
                            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground">{label} links</div>
                            <div className="divide-y">
                              {links.map((l, idx) => (
                                <a
                                  key={idx}
                                  href={l.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block px-3 py-2 text-sm hover:bg-accent/10"
                                  onClick={() => setOpen(false)}
                                >
                                  {l.label ?? l.url}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    };

                    return (
                      <>
                        {renderLinkGroup("Code", <Code className="ml-2 h-4 w-4" />, codeLinks)}
                        {renderLinkGroup("Docs (PDF)", <FileText className="ml-2 h-4 w-4" />, docLinks)}
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Three-ball separator then parsed content (uses site's primary color) */}
            {project.content && (
              <>
                <ThreeBallSeparator />
                <section className="mb-12">{RenderAsMarkdown(project.content, project.media, { math: true })}</section>
              </>
            )}

          </div>
          </div>{/* end main content column */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
