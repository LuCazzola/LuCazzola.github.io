import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  title: string;
  icon?: LucideIcon;
  /** Optional element rendered on the right of the heading (e.g. a "View all" link) */
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

/** Shared layout for every section: consistent width, spacing and heading style. */
const Section = ({ id, title, icon: Icon, action, className, children }: SectionProps) => (
  <section id={id} className={cn("py-6 sm:py-7 md:py-9", className)}>
    <div className="mx-auto w-full max-w-[60rem] px-4 sm:px-6">
      <div className="mb-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />}
          <h2 className="font-serif text-xl text-heading md:text-2xl">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </div>
  </section>
);

/** Plain-text tag line ("A · B · C") — lighter than a row of pills */
export const TagLine = ({ tags, className }: { tags?: string[]; className?: string }) =>
  tags && tags.length > 0 ? (
    <p className={cn("text-xs leading-relaxed text-muted-foreground/90", className)}>{tags.join(" · ")}</p>
  ) : null;

export default Section;
