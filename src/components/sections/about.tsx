"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/section-header";
import { ChevronRight, Code2, Server, Database, Wrench, Terminal, Globe, Mail, Zap } from "lucide-react";
import { personalInfo, skills } from "@/lib/data";

const skillCategories = [
  { key: "frontend", label: "Frontend", icon: Code2 },
  { key: "backend", label: "Backend", icon: Server },
  { key: "devops", label: "DevOps", icon: Wrench },
  { key: "tools", label: "AI/ML Tools", icon: Database },
  { key: "languages", label: "Languages", icon: Terminal },
];

const categoryIcons = {
  frontend: Code2,
  backend: Server,
  devops: Wrench,
  tools: Database,
  languages: Terminal,
};

export function About() {
  const [visibleCategories, setVisibleCategories] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleCategories((prev) => {
              if (prev.has(index)) return prev;
              return new Set([...prev, index]);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observerRef.current = observer;

    const timeout = setTimeout(() => {
      document.querySelectorAll("[data-index]").forEach((el) => observer.observe(el));
    }, 0);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
      observerRef.current = null;
    };
  }, []);

  return (
    <section id="about" className="py-20 sm:py-28 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          slash="about me"
          title={<>Get to know me <span className="text-primary">better</span></>}
          subtitle={personalInfo.bio}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Bio & Skills */}
          <div className="lg:col-span-2 space-y-12">
            {/* Tech Stack */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2 animate-fade-in-up">
                <Code2 className="h-6 w-6 text-primary" aria-hidden="true" />
                Technical Stack
              </h3>
              <div className="space-y-6">
                {skillCategories.map((cat, catIndex) => {
                  const Icon = categoryIcons[cat.key as keyof typeof categoryIcons];
                  const catSkills = skills.filter((s) => s.category === cat.key);
                  const isVisible = visibleCategories.has(catIndex);
                  return (
                    <div
                      key={cat.key}
                      className={cn(
                        "fade-in-section transition-all duration-700",
                        isVisible ? "is-visible" : ""
                      )}
                      style={{ transitionDelay: `${(catIndex + 1) * 100}ms` }}
                      data-index={catIndex}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                        <h4 className="font-semibold text-foreground capitalize">{cat.label}</h4>
                        <span className="text-sm text-muted-foreground">({catSkills.length})</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {catSkills.map((skill, skillIndex) => (
                          <Badge
                            key={skill.name}
                            variant="outline"
                            className="tech-badge"
                            style={{ animationDelay: `${(catIndex + 1) * 100 + skillIndex * 50}ms` }}
                          >
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            </div>

          {/* Right Column - Resume */}
          <div className="space-y-6">
            <Card className="sticky top-24 animate-fade-in-left" style={{ animationDelay: "600ms" }}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Availability</p>
                    <p className="font-medium text-foreground">Open to work</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Globe className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium text-foreground">{personalInfo.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{personalInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Code2 className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Focus</p>
                    <p className="font-medium text-foreground">Full Stack & AI</p>
                  </div>
                </div>
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center p-4 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors font-medium text-primary flex items-center justify-center gap-2"
                >
                  Download Resume
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}