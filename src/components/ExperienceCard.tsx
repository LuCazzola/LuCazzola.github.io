import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { TagLine } from "@/components/Section";

interface ExperienceCardProps {
  company: string;
  role: string;
  location: string;
  period: string;
  description: string[];
  tags: string[];
  companyImage: string;
  logoImage?: string;
}

/** Lead paragraphs longer than this get clamped on phones even when there is nothing else to expand */
const LONG_LEAD = 140;

/**
 * Compact list entry used for both experiences and awards.
 * Phones: logo sits next to the header only, and the body uses the full width (clamped until expanded).
 * From `sm` up: logo column on the left, body aligned with the header.
 */
const ExperienceCard = ({ company, role, location, period, description, tags, companyImage, logoImage }: ExperienceCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [lead, ...rest] = description;
  const thumb = logoImage ?? companyImage;
  const canExpand = rest.length > 0 || (lead?.length ?? 0) > LONG_LEAD;

  return (
    <article className="grid grid-cols-[2.5rem,1fr] items-center gap-x-3 gap-y-2 py-4 sm:grid-cols-[3rem,1fr] sm:items-start sm:gap-x-4 sm:py-5">
      {thumb ? (
        <img
          src={thumb}
          alt=""
          loading="lazy"
          className={cn(
            "h-10 w-10 rounded-md bg-white ring-1 ring-border sm:row-span-2 sm:h-12 sm:w-12",
            logoImage ? "object-contain p-0.5" : "object-cover",
          )}
        />
      ) : (
        <span className="sm:row-span-2" />
      )}

      <header className="min-w-0">
        <div className="flex items-baseline justify-between gap-x-4">
          <h3 className="font-serif text-base leading-snug text-heading sm:text-lg">{company}</h3>
          {period && <span className="hidden whitespace-nowrap text-xs font-semibold text-muted-foreground sm:inline">{period}</span>}
        </div>
        <p className="text-sm leading-snug">
          {role && <span className="font-semibold text-foreground">{role}</span>}
          {role && location && <span className="text-muted-foreground"> · </span>}
          {location && <span className="text-muted-foreground">{location}</span>}
        </p>
        {period && <p className="mt-0.5 text-xs font-semibold text-muted-foreground sm:hidden">{period}</p>}
      </header>

      <div className="col-span-2 min-w-0 sm:col-span-1 sm:col-start-2">
        {lead && (
          <p className={cn("text-sm leading-relaxed text-muted-foreground", !expanded && "line-clamp-3 sm:line-clamp-none")}>
            {lead}
          </p>
        )}

        {expanded && rest.length > 0 && (
          <div className="mt-2 space-y-2">
            {rest.map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {canExpand && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            className={cn(
              "mt-1 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline",
              // a long single paragraph is only clamped on phones, so the toggle is only needed there
              rest.length === 0 && "sm:hidden",
            )}
          >
            {expanded ? "Show less" : "Read more"}
            <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")} aria-hidden="true" />
          </button>
        )}

        {/* Tags are hidden on phones until the entry is expanded */}
        <TagLine tags={tags} className={cn("mt-2", !expanded && "hidden sm:block")} />
      </div>
    </article>
  );
};

export default ExperienceCard;
