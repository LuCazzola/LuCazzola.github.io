import { Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/data/projects";

const Projects = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-14">
      <Section title="All projects" icon={Rocket}>
        <div className="divide-y divide-border border-t border-border">
          {getProjects().map((project) => (
            <ProjectCard key={project.id} {...project} projectUrl={`/projects/${project.id}`} />
          ))}
        </div>
      </Section>
    </main>
    <Footer />
  </div>
);

export default Projects;
