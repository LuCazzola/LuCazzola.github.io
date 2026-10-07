import React from "react";
import { FileText, GraduationCap } from "lucide-react";
import Section from "@/components/Section";
import { asset } from "@/lib/asset";

const education: { title: string; school: string; note?: string; grade?: string; logo?: string; courses?: string[]; text?: string }[] = [
  {
    title: "Master in Artificial Intelligence Systems",
    school: "University of Trento — 2026",
    grade: "110/110 cum laude (with honors)",
    logo: asset("/media/icons/unitn.jpeg"),
    courses: [
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
    ],
  },
  {
    title: "Bachelor in Computer Science",
    school: "University of Trento — 2023",
    grade: "106/110",
    logo: asset("/media/icons/unitn.jpeg"),
    courses: [
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
    ],
  },
  {
    title: "High School diploma",
    school: "ITT G. Chilesotti — 2020",
    grade: "100/100",
    logo: asset("/media/icons/chilesotti.png"),
    text: "The ITT Giacomo Chilesotti is an high school oriented towards IT, Electronics and Logistics. This is where I began to take the first steps that are defining my career in IT.",
  },
];

/** Birthdate (9 July 2001); the age shown in the intro is computed from it at render time */
const BIRTHDATE = new Date(2001, 6, 9);

const getAge = (today = new Date()) => {
  const age = today.getFullYear() - BIRTHDATE.getFullYear();
  const hadBirthday =
    today.getMonth() > BIRTHDATE.getMonth() ||
    (today.getMonth() === BIRTHDATE.getMonth() && today.getDate() >= BIRTHDATE.getDate());
  return hadBirthday ? age : age - 1;
};

const AboutSection: React.FC = () => {
  const age = getAge();

  return (
    <>
      <section id="about" className="pb-2 pt-8 md:pt-12">
        <div className="mx-auto grid w-full max-w-[60rem] items-center gap-6 px-4 sm:px-6 md:grid-cols-[1fr,12rem]">
          <div>
            <h1 className="font-serif text-3xl text-primary md:text-4xl">Hi, I'm Luca</h1>
            <p className="mt-1 text-base font-semibold text-foreground/80">AI engineering student & computer scientist</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              I'm a {age} y.o. based in Vicenza, passionate about AI, computer vision and building practical ML systems. I enjoy turning ideas into working prototypes and learning by doing — research, coding and volleyball keep me busy.
            </p>
            <a
              href={asset("/resources/Luca_Cazzola_Resume.pdf")}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              Resume
            </a>
          </div>
          <img
            src={asset("/media/me/avatar-HI.png")}
            alt="Luca avatar"
            className="mx-auto hidden h-36 w-36 rounded-xl sm:block object-cover shadow-[var(--shadow-card)] md:h-48 md:w-48"
          />
        </div>
      </section>

      <Section id="education" title="Education" icon={GraduationCap}>
        <div className="divide-y divide-border border-t border-border">
          {education.map((e) => (
            <article
              key={e.title}
              className="grid grid-cols-[2.5rem,1fr] items-center gap-x-3 gap-y-2 py-4 sm:grid-cols-[3rem,1fr] sm:items-start sm:gap-x-4 sm:py-5"
            >
              {e.logo ? (
                <img src={e.logo} alt="" className="h-10 w-10 rounded-md bg-white object-contain p-0.5 ring-1 ring-border sm:row-span-2 sm:h-12 sm:w-12" />
              ) : (
                <span className="sm:row-span-2" />
              )}
              <header className="min-w-0">
                <div className="flex flex-col gap-x-4 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-serif text-base leading-snug text-heading sm:text-lg">{e.title}</h3>
                  {e.grade && <span className="hidden whitespace-nowrap text-xs font-bold text-primary sm:inline">Grade: {e.grade}</span>}
                </div>
                <p className="text-sm leading-snug text-muted-foreground">
                  {e.school}
                  {e.note && <> · {e.note}</>}
                </p>
                {e.grade && <p className="mt-0.5 text-xs font-bold text-primary sm:hidden">Grade: {e.grade}</p>}
              </header>
              {/* Body spans the full width on phones, aligned with the header from sm up */}
              <div className="col-span-2 min-w-0 sm:col-span-1 sm:col-start-2">
                {e.text && <p className="text-sm leading-relaxed text-muted-foreground">{e.text}</p>}
                {e.courses && (
                  <>
                    <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">Selected coursework</p>
                    <div className="flex flex-wrap gap-1.5">
                      {e.courses.map((c) => (
                        <span key={c} className="rounded px-1.5 py-0.5 text-xs ring-1 ring-border">{c}</span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
};

export default AboutSection;
