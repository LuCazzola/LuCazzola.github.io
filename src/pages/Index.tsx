import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, BookOpen, Briefcase, ClipboardCheck, ExternalLink, Rocket, Trophy } from "lucide-react";
import Navbar, { scrollToSection } from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import NewsSection from "@/components/NewsSection";
import Section from "@/components/Section";
import PublicationItem from "@/components/PublicationItem";
import ProjectCard from "@/components/ProjectCard";
import ExperienceCard from "@/components/ExperienceCard";
import ValuesSection from "@/components/ValuesSection";
import ToolsSection from "@/components/ToolsSection";
import Footer from "@/components/Footer";
import { getPublications } from "@/data/publications";
import { getExperiences } from "@/data/experiences";
import { getFeaturedProjects, getProjects } from "@/data/projects";
import { getFeaturedAwards } from "@/data/awards";
import { getReviews } from "@/data/reviews";

const HOME_PUBLICATIONS = 3;

const ViewAll = ({ to, label }: { to: string; label: string }) => (
  <Link to={to} className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-primary hover:underline">
    {label}
    <ArrowRight className="h-4 w-4" aria-hidden="true" />
  </Link>
);

const Index = () => {
  const location = useLocation();
  const publications = getPublications();
  const featuredProjects = getFeaturedProjects();
  const experiences = getExperiences();
  const awards = getFeaturedAwards();
  const reviews = getReviews();

  // Arriving from another page via the navbar: scroll to the requested section once rendered
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (target) requestAnimationFrame(() => scrollToSection(target));
  }, [location.state]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <NewsSection />

      <Section
        id="publications"
        title="Publications"
        icon={BookOpen}
        action={publications.length > HOME_PUBLICATIONS && <ViewAll to="/publications" label="All publications" />}
      >
        <div className="divide-y divide-border border-t border-border">
          {publications.slice(0, HOME_PUBLICATIONS).map((p) => (
            <PublicationItem key={p.id} publication={p} />
          ))}
        </div>
      </Section>

      <Section id="peer-review" title="Peer Review" icon={ClipboardCheck}>
        <ul className="divide-y divide-border border-t border-border">
          {reviews.map((r) => (
            <li key={r.id} className="py-4 text-sm">
              <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-black tracking-wide text-primary ring-1 ring-inset ring-primary/20">
                {r.short ?? r.year}
              </span>
              <p className="mt-1.5">
                <span className="font-semibold text-foreground">{r.role}</span>
                <span className="text-muted-foreground">, </span>
                {r.url ? (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary hover:underline"
                  >
                    {r.venue}
                    <ExternalLink className="ml-1 inline h-3.5 w-3.5 align-[-2px]" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="font-semibold text-primary">{r.venue}</span>
                )}
              </p>
              {r.note && <p className="mt-0.5 text-xs text-muted-foreground">{r.note}</p>}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="awards" title="Awards" icon={Trophy}>
        <div className="divide-y divide-border border-t border-border">
          {awards.map((award) => (
            <ExperienceCard
              key={award.id}
              company={award.title}
              role={award.role ?? ''}
              location={award.location ?? ''}
              period={award.period ?? ''}
              description={award.description ?? []}
              tags={award.tags ?? []}
              companyImage={award.image ?? ''}
            />
          ))}
        </div>
      </Section>

      <Section id="experience" title="Working experience" icon={Briefcase}>
        <div className="divide-y divide-border border-t border-border">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id ?? index}
              company={experience.company}
              role={experience.role}
              location={experience.location ?? ''}
              period={experience.period ?? ''}
              description={experience.description}
              tags={experience.tags ?? []}
              companyImage={experience.companyImage ?? ''}
              logoImage={experience.logoImage}
            />
          ))}
        </div>
      </Section>

      <Section
        id="projects"
        title="Selected projects"
        icon={Rocket}
        action={featuredProjects.length < getProjects().length && <ViewAll to="/projects" label="All projects" />}
      >
        <div className="divide-y divide-border border-t border-border">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} projectUrl={`/projects/${project.id}`} />
          ))}
        </div>
      </Section>

      <ValuesSection />
      <ToolsSection />
      <Footer />
    </div>
  );
};

export default Index;
