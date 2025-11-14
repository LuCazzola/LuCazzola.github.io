import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPublications } from "@/data/publications";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Publications = () => {
  const pubs = getPublications();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-3 mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-primary">Publications</h2>
          </div>

          <div className="space-y-6">
            {pubs.map((p) => (
              <Card key={p.id} className="bg-card border-border">
                <CardContent className="p-4 md:p-6 grid md:grid-cols-5 gap-4 items-center">
                  <div className="md:col-span-3">
                      <h3 className="font-semibold text-lg">
                        <Link to={`/publications/${p.id}`} className="hover:underline">
                          {p.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {/* Authors: array of [name, link?] */}
                        <span className="text-base font-medium">
                          {Array.isArray(p.authors) && p.authors.map((a, i) => (
                            <span key={i}>
                              {a[1] ? (
                                <a href={a[1]} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                  {a[0]}
                                </a>
                              ) : (
                                <span>{a[0]}</span>
                              )}
                              {i < (p.authors as any[]).length - 1 && <span className="text-muted-foreground">, </span>}
                            </span>
                          ))}
                        </span>
                        {p.affiliations && <div className="text-sm text-muted-foreground mt-1">{p.affiliations}</div>}
                        <span className="block text-sm text-muted-foreground mt-1">
                          {p.venue && p.venue !== '?' ? (
                            <>— {p.venue}, {p.year ?? ''}</>
                          ) : (
                            <>{p.year ?? ''}</>
                          )}
                        </span>
                      </p>
                      {p.summary && <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(p.tags || []).map((t) => (
                        <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2 flex items-stretch">
                    {p.image && (
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover rounded-md shadow-sm" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Publications;
