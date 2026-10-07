import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ChevronDown, Megaphone } from "lucide-react";
import Section from "@/components/Section";
import { getNews } from "@/data/news";
import { cn } from "@/lib/utils";

/** Number of entries shown before the "Show older" toggle */
const VISIBLE = 5;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-06" -> "Jun 2026", "2026-06-15" -> "15 Jun 2026" */
const formatDate = (date: string) => {
  const [y, m, d] = date.split("-");
  const month = MONTHS[Math.max(0, Math.min(11, parseInt(m, 10) - 1))];
  return [d && String(parseInt(d, 10)), month, y].filter(Boolean).join(" ");
};

/** Inline markdown only: links, bold, italic — rendered without wrapping <p> */
const InlineMarkdown = ({ children }: { children: string }) => (
  <ReactMarkdown
    allowedElements={["p", "a", "strong", "em", "code"]}
    unwrapDisallowed
    components={{
      p: ({ children }) => <>{children}</>,
      a: ({ href, children }) => (
        <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
          {children}
        </a>
      ),
      strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
    }}
  >
    {children}
  </ReactMarkdown>
);

const NewsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const news = getNews();
  if (news.length === 0) return null;

  const visible = showAll ? news : news.slice(0, VISIBLE);

  return (
    <Section id="news" title="News" icon={Megaphone}>
      <ul className="divide-y divide-border/70 border-t border-border sm:space-y-2.5 sm:divide-y-0 sm:pt-4">
        {visible.map((item, i) => (
          <li key={`${item.date}-${i}`} className="py-4 text-sm leading-relaxed sm:grid sm:grid-cols-[6.5rem,1fr] sm:gap-3 sm:py-0">
            <time dateTime={item.date} className="mb-1 block text-xs font-bold uppercase tracking-wide text-primary sm:mb-0 sm:pt-px">
              {formatDate(item.date)}
            </time>
            <p className="text-foreground/80">
              <InlineMarkdown>{item.text}</InlineMarkdown>
            </p>
          </li>
        ))}
      </ul>

      {news.length > VISIBLE && (
        <button
          type="button"
          onClick={() => setShowAll((s) => !s)}
          aria-expanded={showAll}
          className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
        >
          {showAll ? "Show less" : `Show older (${news.length - VISIBLE})`}
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", showAll && "rotate-180")} aria-hidden="true" />
        </button>
      )}
    </Section>
  );
};

export default NewsSection;
