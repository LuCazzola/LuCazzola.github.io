import { Linkedin, Mail, Phone } from "lucide-react";

const contacts = [
  { label: "Organization mail", value: "lcazzola@fbk.eu", href: "mailto:lcazzola@fbk.eu", icon: Mail },
  { label: "Personal mail", value: "luca.cazzola.2001@gmail.com", href: "mailto:luca.cazzola.2001@gmail.com", icon: Mail },
  { label: "Mobile", value: "+39 350 032 3641", href: "tel:+393500323641", icon: Phone },
  { label: "LinkedIn", value: "luca-cazzola-5699a92a9", href: "https://linkedin.com/in/luca-cazzola-5699a92a9", icon: Linkedin, external: true },
];

const Footer = () => {
  return (
    <footer id="contact" className="scroll-mt-16 bg-gradient-to-br from-primary to-primary-hover py-8 text-primary-foreground md:py-10">
      <div className="mx-auto w-full max-w-[60rem] px-4 sm:px-6">
        <h2 className="mb-5 font-serif text-xl text-white md:text-2xl">Contact me!</h2>

        <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {contacts.map(({ label, value, href, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex items-center gap-3"
            >
              <Icon className="h-5 w-5 shrink-0 text-white/80" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wide text-white/70">{label}</span>
                <span className="block truncate text-sm text-white group-hover:underline">{value}</span>
              </span>
            </a>
          ))}
        </div>

        <p className="mt-6 border-t border-white/20 pt-4 text-xs text-white/60">
          © {new Date().getFullYear()} Luca Cazzola. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
