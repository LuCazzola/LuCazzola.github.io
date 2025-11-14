import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";

interface ExperienceCardProps {
  company: string;
  role: string;
  location: string;
  period: string;
  description: string[];
  tags: string[];
  companyImage: string;
  logoImage?: string;
}

const ExperienceCard = ({ 
  company, 
  role, 
  location, 
  period, 
  description, 
  tags, 
  companyImage,
  logoImage 
}: ExperienceCardProps) => {
  return (
    <Card className="border-border hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 bg-card">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Description Side */}
          <div className="p-6 order-2 md:order-1 flex flex-col">
            <div className="flex-1 space-y-4">
              {description.map((paragraph, index) => (
                <p key={index} className="text-sm text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-accent text-accent-foreground text-xs font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Company Info Side */}
          <div className="p-6 border-l-0 md:border-l border-border order-1 md:order-2">
            <div className="relative">
              <img
                src={companyImage}
                alt={company}
                className="w-full h-40 object-cover rounded-lg"
              />

              {logoImage && (
                <div className="absolute right-4 md:right-6 -bottom-6 md:-bottom-8">
                  <img
                    src={logoImage}
                    alt={`${company} logo`}
                    className="h-14 w-14 md:h-16 md:w-16 bg-white p-0.5 rounded-md shadow-2xl ring-2 ring-white object-contain"
                  />
                </div>
              )}
            </div>

            {/* Text block below image. If logo overlaps, add extra top margin so text doesn't collide */}
            <div className={logoImage ? "mt-10" : "mt-6"}>
              <h3 className="font-serif text-lg text-primary mb-2">{company}</h3>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{location}</span>
                </div>

                <h4 className="font-semibold text-foreground">{role}</h4>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{period}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceCard;
