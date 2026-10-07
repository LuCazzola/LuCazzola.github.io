import { BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import PublicationItem from "@/components/PublicationItem";
import { getPublications } from "@/data/publications";

const Publications = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-14">
      <Section title="Publications" icon={BookOpen}>
        <div className="divide-y divide-border border-t border-border">
          {getPublications().map((p) => (
            <PublicationItem key={p.id} publication={p} detailed />
          ))}
        </div>
      </Section>
    </main>
    <Footer />
  </div>
);

export default Publications;
