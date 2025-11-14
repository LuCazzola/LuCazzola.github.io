import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  projectUrl?: string;
  when?: { start?: string; end?: string };
}

const ProjectCard = ({ title, description, tags, imageUrl, projectUrl, when }: ProjectCardProps) => {
  const joinBase = (p: string) => {
    const base = import.meta.env.BASE_URL ?? "/";
    if (p.startsWith("http") || p.startsWith("data:")) return p;
    const baseClean = base === "/" ? "" : base.replace(/\/$/, "");
    const pathClean = p.replace(/^\/+/, "");
    return baseClean ? `${baseClean}/${pathClean}` : `/${pathClean}`;
  };
  const formatWhen = (w?: { start?: string; end?: string }) => {
    if (!w) return null;
    const fmt = (s?: string) => {
      if (!s) return '';
      const m = s.match(/^(\d{4})-(\d{2})/);
      if (m) {
        const y = m[1];
        const mm = parseInt(m[2], 10);
        const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return `${monthNames[Math.max(0, Math.min(11, mm - 1))]} ${y}`;
      }
      return s;
    };

    if (w.end === '?') return `${fmt(w.start)} — ongoing`;
    return `${fmt(w.start)} — ${fmt(w.end)}`;
  };
  return (
    <Card className="group overflow-hidden border-border hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 bg-card">
      <div className="grid md:grid-cols-[2fr,1fr] gap-6 items-stretch">
  <div className="relative overflow-hidden h-64 md:h-80 bg-muted">
          {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover object-left transition-transform duration-500 group-hover:scale-105"
              />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">No image</div>
          )}
        </div>
        
  <CardContent className="p-6 flex flex-col justify-between h-full">
          <div>
            <h3 className="font-serif text-xl md:text-2xl text-primary mb-1">{title}</h3>
            {when && (
              <div className="text-sm text-muted-foreground mb-2">{formatWhen(when)}</div>
            )}
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{description}</p>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-accent text-accent-foreground text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-3">
            {projectUrl && (
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                asChild
              >
                <a href={projectUrl && !projectUrl.startsWith('http') ? joinBase(projectUrl) : projectUrl} target="_blank" rel="noopener noreferrer">
                  View project
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default ProjectCard;
