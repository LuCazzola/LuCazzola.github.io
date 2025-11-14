import React from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { asset } from "@/lib/asset";

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-12">
          <div className="md:col-span-7">
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">Hi, I'm Luca</h2>
            <h3 className="text-lg text-muted-foreground mb-4">AI engineering student & computer scientist</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              I'm a 24 y.o. based in Vicenza, passionate about AI, computer vision and building practical ML systems. I enjoy turning ideas into working prototypes and learning by doing — research, coding and volleyball keep me busy.
            </p>

            <div className="flex items-center gap-4">
              <a href={asset("/resources/Luca_Cazzola_CV.pdf")} target="_blank" rel="noreferrer">
                <Button className="bg-primary text-primary-foreground">📄 Resume</Button>
              </a>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center md:justify-end">
            <img src={asset("/media/me/avatar-HI.png")} alt="Luca avatar" className="w-44 h-44 md:w-56 md:h-56 rounded-lg object-cover shadow-[var(--shadow-card)]" />
          </div>
        </div>

        {/* Education */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h3 className="font-semibold text-2xl text-primary">Education</h3>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6 grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4 text-center md:text-right">
                <img src={asset("/media/icons/unitn.jpeg")} alt="University of Trento" className="mx-auto md:mx-0 md:ml-auto w-28 h-28 md:w-32 md:h-32 object-contain rounded bg-white/5 p-2" />
                <h4 className="mt-3 font-semibold">Master in Artificial Intelligence Systems</h4>
                <p className="text-sm text-muted-foreground">University of Trento — Trento, Italy</p>
                <p className="text-sm text-muted-foreground">Currently on my fourth semester</p>
              </div>
              <div className="md:col-span-8 md:border-l md:border-border md:pl-6">
                <p className="text-sm mb-2">Selected coursework:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Fundamentals of AI",
                    "Machine Learning",
                    "Deep Learning",
                    "Ethics and Laws of AI",
                    "Signal, Image and Video",
                    "Computer Vision",
                    "Natural Language Understanding",
                    "Artificial and Biological Neural systems",
                    "GPU computing",
                    "Advanced Computer Vision",
                    "Trends & Applications of Computer Vision",
                  ].map((c) => (
                    <span key={c} className="text-sm px-3 py-1 bg-secondary rounded-full">{c}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4 text-center md:text-right">
                  <img src={asset("/media/icons/unitn.jpeg")} alt="University of Trento" className="mx-auto md:mx-0 md:ml-auto w-28 h-28 md:w-32 md:h-32 object-contain rounded bg-white/5 p-2" />
                <h4 className="mt-3 font-semibold">Bachelor in Computer Science</h4>
                <p className="text-sm text-muted-foreground">University of Trento — 2023</p>
              </div>
              <div className="md:col-span-8 md:border-l md:border-border md:pl-6">
                <p className="text-sm mb-2">Selected coursework:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Calculus 1",
                    "Geometry and Linear Algebra",
                    "Computer Architectures",
                    "Probability and Statistics",
                    "Mathematical Foundations of Computer Science",
                    "Computer Programming 1",
                    "Programming Languages",
                    "Software Engineering",
                    "Information Systems",
                    "Databases",
                    "Networks",
                    "Operating Systems",
                    "Algorithms and Data Structures",
                    "Physics",
                    "Formal Languages and Compilers",
                    "Computational Logic",
                    "English B2",
                    "Fundamentals of Robotics",
                    "Introduction to Machine Learning",
                  ].map((c) => (
                    <span key={c} className="text-sm px-3 py-1 bg-secondary rounded-full">{c}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4 text-center md:text-right">
                  <img src={asset("/media/icons/chilesotti.png")} alt="High school" className="mx-auto md:mx-0 md:ml-auto w-28 h-28 md:w-32 md:h-32 object-contain rounded bg-white/5 p-2" />
                <h4 className="mt-3 font-semibold">High School diploma</h4>
                <p className="text-sm text-muted-foreground">ITT G. Chilesotti — 2020</p>
              </div>
              <div className="md:col-span-8 md:border-l md:border-border md:pl-6">
                <p className="text-sm">The ITT Giacomo Chilesotti is an high school oriented towards IT, Electronics and Logistics. This is where I began to take the first steps that are defining my career in IT.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
