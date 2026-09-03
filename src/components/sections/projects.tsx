"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { GitBranch, ExternalLink, Star, Zap } from "lucide-react";
import { projects, Project } from "@/lib/data";

const categoryLabels: Record<Project["category"], string> = {
  web: "Web App",
  mobile: "Mobile",
  ai: "AI/ML",
  fullstack: "Full Stack",
  other: "Other",
};

export function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  const renderProjectCard = (project: Project) => (
    <article
      key={project.id}
      className={cn(
        "bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-colors group animate-fade-in-up"
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors flex-1">
          {project.title}
        </h3>
        <Badge variant="outline" className="tech-badge flex-shrink-0">
          {categoryLabels[project.category]}
        </Badge>
      </div>
      <p className="text-muted-foreground mb-4 line-clamp-2">{project.shortDescription}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.slice(0, 8).map((tech) => (
          <Badge key={tech} variant="outline" className="tech-badge text-xs">
            {tech}
          </Badge>
        ))}
        {project.techStack.length > 8 && (
          <Badge variant="outline" className="tech-badge text-xs">
            +{project.techStack.length - 8} more
          </Badge>
        )}
      </div>
      <div className="flex gap-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium flex items-center gap-1"
          >
            <GitBranch className="h-4 w-4" />
            Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium flex items-center gap-1"
          >
            <ExternalLink className="h-4 w-4" />
            Live
          </a>
        )}
      </div>
    </article>
  );

  return (
    <section id="projects" className="py-20 sm:py-28 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          slash="software"
          title={<>Selected <span className="text-primary">Work</span></>}
          subtitle="A collection of projects showcasing my experience in full-stack development, AI/ML, and cloud architecture."
          action={
            <a
              href="https://github.com/MaheshBoda-26"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium flex items-center gap-1"
            >
              View all projects
              <ExternalLink className="h-4 w-4" />
            </a>
          }
        />

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2 animate-fade-in-up">
              <Star className="h-6 w-6 text-amber-500 fill-current" aria-hidden="true" />
              Featured Projects
            </h3>
            <div className="space-y-6">
              {featuredProjects.map((project, index) => (
                <div key={project.id} style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                  {renderProjectCard(project)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Projects */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-8 animate-fade-in-up">All Projects</h3>
          <div className="space-y-6">
            {otherProjects.map((project, index) => (
              <div key={project.id} style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                {renderProjectCard(project)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}