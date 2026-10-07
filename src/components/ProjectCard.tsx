import { Link } from "react-router-dom";
import { TagLine } from "@/components/Section";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  projectUrl?: string;
  when?: { start?: string; end?: string };
}

const MAX_TAGS = 4;

const formatWhen = (w?: { start?: string; end?: string }) => {
  if (!w) return null;
  const fmt = (s?: string) => {
    if (!s) return '';
    const m = s.match(/^(\d{4})-(\d{2})/);
    if (m) {
      const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return `${monthNames[Math.max(0, Math.min(11, parseInt(m[2], 10) - 1))]} ${m[1]}`;
    }
    return s;
  };
  if (w.end === '?') return `${fmt(w.start)} — ongoing`;
  return `${fmt(w.start)} — ${fmt(w.end)}`;
};

/** Project row without a card frame: thumbnail beside the text, the whole row links to the project page. */
const ProjectCard = ({ title, description, tags, imageUrl, projectUrl, when }: ProjectCardProps) => {
  const body = (
    <>
      <div className="aspect-[4/3] overflow-hidden rounded-md bg-muted ring-1 ring-border sm:aspect-[16/10]">
        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="min-w-0">
        {when && <p className="text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground">{formatWhen(when)}</p>}
        <h3 className="mt-0.5 font-serif text-base leading-snug text-heading group-hover:text-primary group-hover:underline sm:text-lg">{title}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <TagLine
          tags={tags.length > MAX_TAGS ? [...tags.slice(0, MAX_TAGS), `+${tags.length - MAX_TAGS}`] : tags}
          className="mt-1.5 hidden sm:block"
        />
      </div>
    </>
  );

  const className = "group grid grid-cols-[5rem,1fr] gap-3 py-4 sm:py-5 sm:grid-cols-[11rem,1fr] sm:gap-5";

  return projectUrl ? (
    <Link to={projectUrl} className={className}>
      {body}
    </Link>
  ) : (
    <article className={className}>{body}</article>
  );
};

export default ProjectCard;
