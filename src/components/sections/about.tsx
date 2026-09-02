"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ChevronRight, Code2, Server, Database, Wrench, Terminal, Globe, Briefcase, Mail, Zap } from "lucide-react";
import { personalInfo, skills } from "@/lib/data";

const skillCategories = [
  { key: "frontend", label: "Frontend", icon: Code2, color: "text-blue-600 dark:text-blue-400 border-blue-500/20 bg-blue-500/10" },
  { key: "backend", label: "Backend", icon: Server, color: "text-green-600 dark:text-green-400 border-green-500/20 bg-green-500/10" },
  { key: "devops", label: "DevOps", icon: Wrench, color: "text-orange-600 dark:text-orange-400 border-orange-500/20 bg-orange-500/10" },
  { key: "tools", label: "AI/ML Tools", icon: Database, color: "text-purple-600 dark:text-purple-400 border-purple-500/20 bg-purple-500/10" },
  { key: "languages", label: "Languages", icon: Terminal, color: "text-red-600 dark:text-red-400 border-red-500/20 bg-red-500/10" },
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

    // Use setTimeout to wait for DOM to be ready
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
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border mb-4 animate-fade-in-up">
            <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-muted-foreground">About Me</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Get to know me <span className="text-primary">better</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            {personalInfo.bio}
          </p>
        </div>

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
                        <Icon className="h-5 w-5" style={{ color: cat.color.split(" ")[2] }} aria-hidden="true" />
                        <h4 className="font-semibold text-foreground capitalize">{cat.label}</h4>
                        <span className="text-sm text-muted-foreground">({catSkills.length})</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {catSkills.map((skill, skillIndex) => (
                          <Badge
                            key={skill.name}
                            variant="outline"
                            className={cn(
                              "tech-badge",
                              cat.color
                            )}
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

            <Separator className="animate-fade-in-up" />

            {/* Experience */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2 animate-fade-in-up">
                <Briefcase className="h-6 w-6 text-primary" aria-hidden="true" />
                Experience
              </h3>
              <div className="space-y-6">
                {[
                  {
                    id: "exp-1",
                    role: "Senior Software Engineer",
                    company: "Tech Company",
                    period: "2022 - Present",
                    description: [
                      "Led development of AI-powered customer support platform serving 10K+ users",
                      "Architected microservices infrastructure reducing latency by 40%",
                      "Mentored 5 engineers and established code review practices",
                    ],
                    techStack: ["Next.js", "Python", "PostgreSQL", "Kubernetes", "AWS"],
                  },
                  {
                    id: "exp-2",
                    role: "Full Stack Developer",
                    company: "Startup Inc",
                    period: "2020 - 2022",
                    description: [
                      "Built and maintained multiple client projects using React/Node.js",
                      "Implemented CI/CD pipelines reducing deployment time by 60%",
                      "Designed RESTful APIs and GraphQL schemas for mobile apps",
                    ],
                    techStack: ["React", "Node.js", "MongoDB", "Docker", "GraphQL"],
                  },
                  {
                    id: "exp-3",
                    role: "Software Engineer Intern",
                    company: "Big Tech Co",
                    period: "2019 - 2020",
                    description: [
                      "Contributed to internal developer tools and automation scripts",
                      "Optimized database queries improving dashboard load times by 35%",
                      "Wrote unit and integration tests achieving 85% coverage",
                    ],
                    techStack: ["Java", "Spring Boot", "MySQL", "Kafka", "JUnit"],
                  },
                ].map((exp, expIndex) => (
                  <div
                    key={exp.id}
                    className="relative pl-6 border-l-2 border-border animate-fade-in-up"
                    style={{ animationDelay: `${(expIndex + 1) * 100}ms` }}
                  >
                    <div className="absolute -left-3 top-1 w-5 h-5 rounded-full bg-primary border-4 border-background" />
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-foreground">{exp.role}</h4>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">{exp.period}</span>
                    </div>
                    <ul className="space-y-1 text-muted-foreground text-sm mb-3" role="list">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-1.5">•</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1">
                      {exp.techStack.map((tech) => (
                        <Badge key={tech} variant="outline" className="tech-badge text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Facts Card */}
          <div className="space-y-6">
            <Card className="sticky top-24 animate-fade-in-left" style={{ animationDelay: "600ms" }}>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">{personalInfo.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">{personalInfo.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Code2 className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Focus</p>
                      <p className="font-medium text-foreground">Full Stack & AI</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Availability</p>
                      <p className="font-medium text-foreground">Open to work</p>
                    </div>
                  </div>
                </div>
                <Button className="mt-6 w-full" onClick={() => window.open(personalInfo.resumeUrl, "_blank", "noopener,noreferrer")}>
                  Download Resume
                  <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}