import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

/** Menu entries: `section` scrolls to an id on the home page, `route` navigates to a page. */
const navLinks: { name: string; section?: string; route?: string }[] = [
  { name: "News", section: "news" },
  { name: "Publications", section: "publications" },
  { name: "Peer Review", section: "peer-review" },
  { name: "Awards", section: "awards" },
  { name: "Experience", section: "experience" },
  { name: "Projects", section: "projects" },
  { name: "About", route: "/about" },
  { name: "Contact", section: "contact" },
];

/** Smooth-scroll to a section id (used by the navbar and by the home page on arrival) */
export const scrollToSection = (id: string) => {
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const onHome = location.pathname === "/";

  // Highlight the section currently under the navbar while scrolling the home page
  useEffect(() => {
    if (!onHome) {
      setActive(null);
      return;
    }
    const ids = navLinks.map((l) => l.section).filter(Boolean) as string[];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-64px 0px -60% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome]);

  const handleClick = (link: (typeof navLinks)[number] | { section: string; route?: undefined }) => {
    setIsOpen(false);
    if (link.route) {
      navigate(link.route);
      return;
    }
    if (!link.section) return;
    if (onHome) {
      scrollToSection(link.section);
    } else {
      // The home page reads this state and scrolls once it has rendered
      navigate("/", { state: { scrollTo: link.section } });
    }
  };

  const isActive = (link: (typeof navLinks)[number]) =>
    link.route ? location.pathname.startsWith(link.route) : onHome && active === link.section;

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-card/85 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-[60rem] items-center justify-between px-4 sm:px-6">
        <button
          onClick={() => handleClick({ section: "home" })}
          className="font-serif text-lg text-primary transition-colors hover:text-primary-hover"
        >
          Luca Cazzola
        </button>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleClick(link)}
              aria-current={isActive(link) ? "true" : undefined}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-[0.8rem] font-semibold uppercase tracking-wide transition-colors",
                isActive(link)
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground/75 hover:bg-secondary hover:text-primary",
              )}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="-mr-2 rounded-md p-2 text-foreground hover:bg-secondary lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <div className="animate-fade-in border-t border-border bg-card lg:hidden">
          <div className="mx-auto grid max-w-[60rem] grid-cols-2 gap-1 px-4 py-3 sm:px-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleClick(link)}
                className={cn(
                  "rounded-md px-3 py-2 text-left text-sm font-semibold uppercase tracking-wide",
                  isActive(link) ? "bg-accent text-accent-foreground" : "text-foreground/80 hover:bg-secondary",
                )}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
