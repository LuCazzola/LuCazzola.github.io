import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectCard from "@/components/ProjectCard";
import ExperienceCard from "@/components/ExperienceCard";
import ValuesSection from "@/components/ValuesSection";
import ToolsSection from "@/components/ToolsSection";
import Footer from "@/components/Footer";
import { Rocket, Briefcase, Trophy, ArrowRight, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPublications } from "@/data/publications";
import { getExperiences } from "@/data/experiences";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getFeaturedProjects, getProjects } from "@/data/projects";
import { getFeaturedAwards } from "@/data/awards";

const Index = () => {
  const featuredProjects = getFeaturedProjects();

  const experiences = getExperiences();

  const publications = getPublications();

  const featuredAwards = getFeaturedAwards();
  const award = featuredAwards.length > 0 ? featuredAwards[0] : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
  <HeroSection />

      {/* Experience Section */}
      <section id="experience" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-12">
            <Briefcase className="h-8 w-8 text-primary" />
            <h2 className="font-serif text-3xl md:text-4xl text-primary">
              Working experience
            </h2>
          </div>
          
          <div className="space-y-8 max-w-6xl mx-auto">
            {experiences.map((experience, index) => (
              <div key={experience.id ?? index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ExperienceCard
                  company={experience.company}
                  role={experience.role}
                  location={experience.location ?? ''}
                  period={experience.period ?? ''}
                  description={experience.description}
                  tags={experience.tags ?? []}
                  companyImage={experience.companyImage ?? ''}
                  logoImage={experience.logoImage}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-12">
            <BookOpen className="h-8 w-8 text-primary" />
            <h2 className="font-serif text-3xl md:text-4xl text-primary">Publications</h2>
          </div>

          <div className="space-y-6 max-w-6xl mx-auto">
            {publications.slice(0, 3).map((p, idx) => (
              <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
                <Card className="border-border bg-card">
                  <CardContent className="p-4 grid md:grid-cols-5 gap-4 items-center">
                    <div className="md:col-span-3">
                      <h3 className="font-semibold text-lg">
                        <Link to={`/publications/${p.id}`} className="hover:underline">
                          {p.title}
                        </Link>
                      </h3>

                      {/* Authors: render array of [name, link?] with larger font */}
                      <div className="text-base font-medium text-muted-foreground mt-1">
                        {Array.isArray(p.authors) ? (
                          p.authors.map((a, i) => (
                            <span key={i} className="mr-1">
                              {a[1] ? (
                                <a href={a[1]} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                  {a[0]}
                                </a>
                              ) : (
                                <span>{a[0]}</span>
                              )}
                              {i < p.authors.length - 1 && <span className="text-muted-foreground">, </span>}
                            </span>
                          ))
                        ) : (
                          <span className="text-base font-medium">{String(p.authors)}</span>
                        )}
                      </div>

                      {p.affiliations && <div className="text-sm text-muted-foreground mt-1">{p.affiliations}</div>}

                      <div className="text-sm text-muted-foreground mt-1">
                        {p.venue && p.venue !== '?' ? (
                          <>— {p.venue}, {p.year ?? ''}</>
                        ) : (
                          <>{p.year ?? ''}</>
                        )}
                      </div>

                      {/* Abstract shown on the landing card below venue/year */}
                      {p.abstract && (
                        <>
                          <hr className="border-t border-sky-100 my-3" />
                          <p className="mt-2 text-sm text-muted-foreground">{p.abstract}</p>
                        </>
                      )}

                      {p.tags && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {p.tags.map((t: string) => (
                            <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2 flex items-stretch">
                      {p.image && (
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover rounded-md shadow-sm" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-12">
            <Trophy className="h-8 w-8 text-primary" />
            <h2 className="font-serif text-3xl md:text-4xl text-primary">
              Awards
            </h2>
          </div>
          
          <div className="max-w-6xl mx-auto animate-fade-in">
            {award && (
              <ExperienceCard
                company={award.title}
                role={award.role ?? ''}
                location={award.location ?? ''}
                period={award.period ?? ''}
                description={award.description ?? []}
                tags={award.tags ?? []}
                companyImage={award.image ?? ''}
              />
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-12">
            <Rocket className="h-8 w-8 text-primary" />
            <h2 className="font-serif text-3xl md:text-4xl text-primary">
              Selected projects
            </h2>
          </div>
          
          <div className="space-y-8 max-w-6xl mx-auto">
            {featuredProjects.map((project, index) => (
              <div key={project.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProjectCard {...project} projectUrl={`/projects/${project.id}`} />
              </div>
            ))}
          </div>

          {getFeaturedProjects().length < getProjects().length && (
            <div className="max-w-6xl mx-auto mt-12 text-center">
              <Button 
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary-hover font-semibold"
              >
                <Link to="/projects">
                  View all projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <ValuesSection />
      
      <ToolsSection />

      <Footer />
    </div>
  );
};

export default Index;
