import { Heart } from "lucide-react";
import Section from "@/components/Section";

const ValuesSection = () => {
  const values = ["trust", "commitment", "respect", "transparency", "support"];

  return (
    <Section id="values" title="My work values & ethics" icon={Heart}>
      <div className="space-y-3 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        <p>
          When the "ChatGPT revolution" arrived, it was only a few months before the end of my bachelor's degree. A random YouTube video from a creator whose name I can't even remember popped up about ChatGPT; it grabbed my attention, I tried it, and I was speechless. It was the first week after release, and 1–2 weeks later the whole world went into absolute chaos. I told myself: I want to be part of that, even if it's a bit scary.
        </p>
        <p>
          As a very wise philosopher (whose nephew really should have listened sooner) once pointed out: "With great power comes great responsibility." 🕷️🕷️🕷️
          I genuinely believe that. As engineers, we have a profound and often-underestimated responsibility to think through the human impact of our work. My goal is to dive into this field and help build the good parts, consciously.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {values.map((value) => (
          <span
            key={value}
            className="rounded-full px-3 py-0.5 text-sm font-semibold capitalize text-primary ring-1 ring-primary/30"
          >
            {value}
          </span>
        ))}
      </div>
    </Section>
  );
};

export default ValuesSection;
