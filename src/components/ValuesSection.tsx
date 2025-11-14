import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

const ValuesSection = () => {
  const values = ["trust", "commitment", "respect", "transparency", "support"];

  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="h-8 w-8 text-primary" />
            <h2 className="font-serif text-3xl md:text-4xl text-primary">
              My work values & ethics
            </h2>
          </div>
          
          <div className="space-y-4 mb-8 text-muted-foreground leading-relaxed">
            <p>
              When the "ChatGPT revolution" arrived, it was only a few months before the end of my bachelor's degree. A random YouTube video from a creator whose name I can't even remember popped up about ChatGPT; it grabbed my attention, I tried it, and I was speechless. It was the first week after release, and 1–2 weeks later the whole world went into absolute chaos. I told myself: I want to be part of that, even if it's a bit scary.
            </p>
            <p>
              As a very wise philosopher (whose nephew really should have listened sooner) once pointed out: "With great power comes great responsibility." 🕷️🕷️🕷️
              I genuinely believe that. As engineers, we have a profound and often-underestimated responsibility to think through the human impact of our work. My goal is to dive into this field and help build the good parts, consciously.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {values.map((value) => (
              <Badge 
                key={value} 
                variant="secondary" 
                className="bg-primary-light text-primary text-base px-6 py-2 font-normal capitalize hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
              >
                {value}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
