import { FileText, Github, GraduationCap, Linkedin } from "lucide-react";
import { asset } from "@/lib/asset";

const links = [
  { label: "CV", href: asset("/resources/Luca_Cazzola_Resume.pdf"), icon: FileText, primary: true },
  { label: "Scholar", href: "https://scholar.google.com/citations?user=fsnsqoYAAAAJ&hl=en", icon: GraduationCap },
  { label: "GitHub", href: "https://github.com/LuCazzola", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/luca-cazzola-5699a92a9", icon: Linkedin },
];

const HeroSection = () => {
  const photo = asset("/media/me/profile-pic.jpeg");

  return (
    <section
      id="home"
      // Phones: light blue fading into the page (no hard edge). Desktop: the original white -> light blue band.
      className="relative bg-[linear-gradient(180deg,hsl(var(--primary-light))_0%,hsl(var(--background))_100%)] pb-6 pt-20 md:bg-[linear-gradient(180deg,hsl(var(--card))_0%,hsl(var(--primary-light))_100%)] md:pb-12 md:pt-24"
    >
      <div className="mx-auto grid w-full max-w-[60rem] items-center gap-6 px-4 sm:px-6 md:grid-cols-[1fr,13rem] md:gap-10">
        {/* Phones: centered profile layout. From md up: text on the left, portrait on the right. */}
        <div className="flex animate-fade-in flex-col items-center text-center md:items-start md:text-left">
          {/* Round head-and-shoulders crop of the portrait, phones only */}
          <div className="mb-4 h-28 w-28 overflow-hidden rounded-full shadow-[var(--shadow-card-hover)] ring-4 ring-card md:hidden">
            <img
              src={photo}
              alt="Luca Cazzola"
              className="h-full w-full origin-[53%_39%] scale-[1.6] object-cover object-[53%_30%]"
            />
          </div>

          <h1 className="font-serif text-[2rem] leading-tight text-primary sm:text-4xl md:text-[2.75rem]">Hi, I'm Luca 👋🏻</h1>

          <div className="mt-3 max-w-md space-y-2 text-[0.95rem] leading-relaxed text-foreground/80 md:mt-4 md:max-w-none md:text-lg">
            <p>
              Applied Scientist in <strong className="font-semibold text-primary">Robot Learning</strong> &amp;{" "}
              <strong className="font-semibold text-primary">Computer Vision</strong> at{" "}
              <a href="https://tev.fbk.eu/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                Fondazione Bruno Kessler
              </a>
              .
            </p>
            <p>
              Passionate about <strong className="font-semibold text-primary">Motion</strong>: whether it's on a virtual character
              or the fanciest humanoid.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:justify-start">
            {links.map(({ label, href, icon: Icon, primary }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  primary
                    ? "inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover"
                    : "inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                }
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden animate-slide-up md:block">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-[var(--shadow-card-hover)]">
            <img src={photo} alt="Luca Cazzola" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
