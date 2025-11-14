import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { asset } from "@/lib/asset";

const HeroSection = () => {
  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-visible">
      {/* Decorative full-width horizontal gradient behind the hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        // Start the gradient from the site's card background (same as navbar bg-card/80) and fade to the lighter primary
        style={{ background: 'linear-gradient(180deg, hsl(var(--card) / 0.8) 0%, hsl(var(--primary-light)) 100%)', zIndex: 0 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-[2fr,1fr] gap-8 md:gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-6 animate-fade-in">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary">
              Hi, I'm Luca 👋🏻
            </h1>
            <h2 className="text-xl md:text-2xl text-muted-foreground font-light">
              Master's student in AI Systems focused on Deep Learning solutions for Computer Graphics and 3D data.
              <span className="block h-2" aria-hidden="true" />
              Passionate about the intersection of Deep Learning with virtual environments, VR/AR, 3D modelling and animation.
            </h2>
            
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-md"
              asChild
            >
              <a href={asset("/resources/Luca_Cazzola_CV.pdf")} target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-5 w-5" />
                Resume
              </a>
            </Button>
          </div>
          
          <div className="relative animate-slide-up">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-[var(--shadow-card-hover)]">
              <img
                src={asset("/media/me/profile-pic.jpeg")}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
