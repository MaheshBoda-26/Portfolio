"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GitBranch, ExternalLink, Code, Zap, Brain, Server, Smartphone, Layers, Star } from "lucide-react";
import { projects, Project } from "@/lib/data";

const categoryLabels: Record<Project["category"], string> = {
  web: "Web App",
  mobile: "Mobile",
  ai: "AI/ML",
  fullstack: "Full Stack",
  other: "Other",
};

const categoryIcons: Record<Project["category"], typeof Code> = {
  web: Code,
  mobile: Smartphone,
  ai: Brain,
  fullstack: Layers,
  other: Server,
};

export function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  const renderProjectCard = (project: Project) => {
    const CategoryIcon = categoryIcons[project.category];
    return (
      <Card key={project.id} className={cn("group overflow-hidden transition-all hover:shadow-xl", project.featured && "ring-2 ring-primary/20")}>
        <div className="relative aspect-video bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <CategoryIcon className="h-12 w-12 text-neutral-400 dark:text-neutral-500" aria-hidden="true" />
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className={cn("gap-1", project.featured && "bg-primary/10 text-primary border-primary/20")}>
              <Zap className="h-3 w-3" aria-hidden="true" />
              {categoryLabels[project.category]}
            </Badge>
          </div>
          {project.featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="gap-1">
                <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                Featured
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-300 mb-4 line-clamp-3">{project.shortDescription}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 6).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 6 && (
              <Badge variant="outline" className="text-xs">
                +{project.techStack.length - 6} more
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 dark:text-neutral-400 hover:text-primary transition-colors"
                aria-label={`View ${project.title} on GitHub`}
              >
                <GitBranch className="h-5 w-5" aria-hidden="true" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 dark:text-neutral-400 hover:text-primary transition-colors"
                aria-label={`View ${project.title} live demo`}
              >
                <ExternalLink className="h-5 w-5" aria-hidden="true" />
              </a>
            )}
          </div>
        </CardFooter>
      </Card>
    );
  };

  return (
    <section id="projects" className="py-20 sm:py-28 lg:py-32 bg-neutral-50 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            Projects
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
            Selected <span className="text-primary">Work</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300">
            A collection of projects showcasing my experience in full-stack development, AI/ML, and cloud architecture.
          </p>
        </div>

        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <Star className="h-6 w-6 text-amber-500 fill-current" aria-hidden="true" />
                Featured Projects
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map(renderProjectCard)}
            </div>
          </div>
        )}

        <Separator className="mb-8" />

        <div>
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">All Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map(renderProjectCard)}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/MaheshBoda-26" target="_blank" rel="noopener noreferrer">
              View All on GitHub
              <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}