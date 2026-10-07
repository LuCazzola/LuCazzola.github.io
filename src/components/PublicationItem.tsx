import { Code, FileText, Globe } from "lucide-react";
import type { Publication } from "@/data/publications";
import { TagLine } from "@/components/Section";

/** Author name highlighted in bold in every author list */
const SELF = "L. Cazzola";

interface PublicationItemProps {
  publication: Publication;
  /** Show abstract + tags (used on the full Publications page) */
  detailed?: boolean;
}

/**
 * Split "SIGGRAPH (Poster) • Special Interest Group on ..." into the venue acronym ("SIGGRAPH"),
 * the paper type ("Poster") and the full venue name.
 */
const splitVenue = (venue?: string) => {
  if (!venue || venue === "?") return {};
  const [short, ...rest] = venue.split("•").map((s) => s.trim());
  const m = short.match(/^(.*?)\s*\((.+)\)$/);
  return { name: m ? m[1] : short, kind: m?.[2], full: rest.join(" • ") || undefined };
};

const TextLink = ({ href, icon: Icon, label }: { href: string; icon: typeof Globe; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
  >
    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
    {label}
  </a>
);

/** One publication row: thumbnail beside the text at every width, no card frame. */
const PublicationItem = ({ publication: p, detailed }: PublicationItemProps) => {
  const { name, kind, full } = splitVenue(p.venue);

  return (
    <article className="grid grid-cols-[5rem,1fr] gap-3 py-4 sm:py-5 sm:grid-cols-[11rem,1fr] sm:gap-5">
      <div className="aspect-[4/3] overflow-hidden rounded-md bg-white ring-1 ring-border sm:aspect-[16/10]">
        {p.image && (
          <a href={p.pageUrl} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
            <img src={p.image} alt="" loading="lazy" className="h-full w-full object-contain p-1" />
          </a>
        )}
      </div>

      <div className="min-w-0">
        {(name || p.year) && (
          <p className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-black tracking-wide text-primary ring-1 ring-inset ring-primary/20">
              {[name, p.year].filter(Boolean).join(" ")}
            </span>
            {kind && <span className="text-xs font-semibold text-muted-foreground">{kind}</span>}
          </p>
        )}

        <h3 className="mt-0.5 font-sans text-[0.95rem] font-bold leading-snug text-heading sm:text-base">
          {p.pageUrl ? (
            <a href={p.pageUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">
              {p.title}
            </a>
          ) : (
            p.title
          )}
        </h3>

        <p className="mt-1 text-[0.8rem] text-foreground/80 sm:text-sm">
          {p.authors.map(([name, link], i) => (
            <span key={name}>
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={name === SELF ? "font-bold text-foreground hover:underline" : "hover:underline"}
                >
                  {name}
                </a>
              ) : (
                <span className={name === SELF ? "font-bold text-foreground" : undefined}>{name}</span>
              )}
              {i < p.authors.length - 1 && ", "}
            </span>
          ))}
        </p>

        {full && <p className="mt-0.5 hidden text-xs italic text-muted-foreground sm:block">{full}</p>}

        {detailed && p.abstract && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.abstract}</p>}

        {(p.pageUrl || p.paper || p.code) && (
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {p.pageUrl && <TextLink href={p.pageUrl} icon={Globe} label="Project page" />}
            {p.paper && <TextLink href={p.paper} icon={FileText} label="Paper" />}
            {p.code && <TextLink href={p.code} icon={Code} label="Code" />}
          </div>
        )}

        {detailed && <TagLine tags={p.tags} className="mt-2" />}
      </div>
    </article>
  );
};

export default PublicationItem;
