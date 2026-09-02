"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Code2, Server, Database, Wrench, Terminal, Globe, Briefcase, Mail, Zap, Brain } from "lucide-react";
import { personalInfo, skills, experience, navItems } from "@/lib/data";

const skillCategories = [
  { key: "frontend", label: "Frontend", icon: Code2, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  { key: "backend", label: "Backend", icon: Server, color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" },
  { key: "devops", label: "DevOps", icon: Wrench, color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" },
  { key: "tools", label: "AI/ML Tools", icon: Database, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
  { key: "languages", label: "Languages", icon: Terminal, color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
];

const categoryIcons = {
  frontend: Code2,
  backend: Server,
  devops: Wrench,
  tools: Database,
  languages: Terminal,
};

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28 lg:py-32 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            About Me
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
            Get to know me <span className="text-primary">better</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300">
            {personalInfo.bio}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
                <Code2 className="h-6 w-6 text-primary" aria-hidden="true" />
                Technical Skills
              </h3>
              <div className="space-y-6">
                {skillCategories.map((cat) => {
                  const Icon = categoryIcons[cat.key as keyof typeof categoryIcons];
                  const catSkills = skills.filter((s) => s.category === cat.key);
                  return (
                    <div key={cat.key}>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="h-5 w-5" style={{ color: cat.color.split(" ")[2] }} aria-hidden="true" />
                        <h4 className="font-semibold text-neutral-900 dark:text-white capitalize">{cat.label}</h4>
                        <span className="text-sm text-neutral-500 dark:text-neutral-400">({catSkills.length})</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {catSkills.map((skill) => (
                          <Badge
                            key={skill.name}
                            variant="outline"
                            className={cn(
                              "text-xs px-3 py-1.5",
                              cat.color
                            )}
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

            <Separator />

            <div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-primary" aria-hidden="true" />
                Experience
              </h3>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-neutral-200 dark:border-neutral-700">
                    <div className="absolute -left-3 top-1 w-5 h-5 rounded-full bg-primary border-4 border-white dark:border-neutral-950" />
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">{exp.role}</h4>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm text-neutral-500 dark:text-neutral-400 whitespace-nowrap">{exp.period}</span>
                    </div>
                    <ul className="space-y-1 text-neutral-600 dark:text-neutral-300 text-sm mb-3" role="list">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-1.5">•</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1">
                      {exp.techStack.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">Location</p>
                      <p className="font-medium text-neutral-900 dark:text-white">{personalInfo.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">Email</p>
                      <p className="font-medium text-neutral-900 dark:text-white">{personalInfo.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Code2 className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">Focus</p>
                      <p className="font-medium text-neutral-900 dark:text-white">Full Stack & AI</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">Availability</p>
                      <p className="font-medium text-neutral-900 dark:text-white">Open to work</p>
                    </div>
                  </div>
                </div>
                <Button className="mt-6 w-full" asChild>
                  <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
                    Download Resume
                    <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}