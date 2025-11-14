import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import { Rocket } from "lucide-react";
import { getProjects } from "@/data/projects";

const Projects = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-12">
            <Rocket className="h-8 w-8 text-primary" />
            <h1 className="font-serif text-3xl md:text-4xl text-primary">
              All Projects
            </h1>
          </div>
          
          <div className="space-y-8 max-w-6xl mx-auto">
            {getProjects().map((project, index) => (
              <div key={project.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProjectCard {...project} projectUrl={`/projects/${project.id}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Projects;
