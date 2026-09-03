"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Github, ExternalLink, Code2, Server, Database, Zap, FileText } from "lucide-react";
import { projects, Project, projectLogs, ProjectLogsData } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const categoryLabels: Record<Project["category"], string> = {
  web: "Web App",
  mobile: "Mobile",
  ai: "AI/ML",
  fullstack: "Full Stack",
  other: "Other",
};

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [logs, setLogs] = useState(projectLogs[params.id] || null);

  useEffect(() => {
    const found = projects.find((p) => p.id === params.id);
    if (!found) {
      router.push("/404");
      return;
    }
    setProject(found);
  }, [params.id, router]);

  if (!project) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-mono text-sm">/ back</span>
            </Link>
            <div className="flex items-center gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <Github className="h-5 w-5" />
                  Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="h-5 w-5" />
                  Live
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <article className="mb-16 animate-fade-in-up">
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="outline" className="tech-badge">
              {categoryLabels[project.category]}
            </Badge>
            {project.featured && (
              <Badge variant="secondary" className="gap-1">
                <span className="h-3 w-3">★</span>
                Featured
              </Badge>
            )}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">{project.title}</h1>
          <p className="text-xl text-muted-foreground mb-8">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="outline" className="tech-badge">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{logs?.date || "2024"}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>{project.category}</span>
          </div>
        </article>

        {/* Build Logs */}
        {logs && (
          <section className="space-y-12 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Code2 className="h-7 w-7 text-primary" />
              Build Log
            </h2>

            {logs.logs.map((log, logIndex) => (
              <article key={log.title} className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                  {log.title}
                </h3>
                <div className="space-y-4 pl-4 border-l-2 border-border/50">
                  {log.content.map((entry, entryIndex) => (
                    <div key={entryIndex} className={cn("animate-fade-in-up", entry.type === "list" && "ml-4")} style={{ animationDelay: `${(entryIndex + 1) * 50}ms` }}>
                      {entry.type === "text" && (
                        <p className="text-muted-foreground leading-relaxed">{entry.value}</p>
                      )}
                      {entry.type === "tip" && (
                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
                          <Zap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-primary-foreground text-sm leading-relaxed"><strong>💡 Tip: </strong>{entry.value}</p>
                        </div>
                      )}
                      {entry.type === "list" && entry.items && (
                        <div className="space-y-2">
                          {entry.title && <p className="text-sm font-medium text-foreground">{entry.title}</p>}
                          <ul className="space-y-1 list-disc list-inside text-muted-foreground text-sm">
                            {entry.items.map((item, i) => (
                              <li key={i} className="leading-relaxed">{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {entry.type === "image" && (
                        <div className="rounded-lg overflow-hidden border border-border">
                          <Image
                            src={entry.value}
                            alt={entry.title || "Project screenshot"}
                            width={800}
                            height={450}
                            className="w-full h-auto"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </section>
        )}

        {/* Related Projects */}
        <section className="mt-16 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <h2 className="text-2xl font-bold text-foreground mb-6">Related Projects</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {projects
              .filter((p) => p.id !== project.id && (p.category === project.category || p.featured))
              .slice(0, 4)
              .map((related) => (
                <Link key={related.id} href={`/project/${related.id}`} className="group">
                  <Card className="hover:border-primary/50 transition-colors h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {related.title}
                        </h3>
                        <Badge variant="outline" className="tech-badge flex-shrink-0">
                          {categoryLabels[related.category]}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {related.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {related.techStack.slice(0, 5).map((tech) => (
                          <Badge key={tech} variant="outline" className="tech-badge text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          Built and designed by Mahesh Boda. All rights reserved. © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}