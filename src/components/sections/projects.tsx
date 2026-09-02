"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { GitBranch, ExternalLink, Code, Zap, Brain, Server, Smartphone, Layers, Star, ChevronLeft, ChevronRight, FolderOpen } from "lucide-react";
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  const renderProjectCard = (project: Project, isCarousel = false) => {
    const CategoryIcon = categoryIcons[project.category];
    return (
      <Card
        key={project.id}
        className={cn(
          "group overflow-hidden transition-all hover:shadow-xl project-card",
          project.featured && "ring-2 ring-primary/20",
          isCarousel && "h-full"
        )}
      >
        <div className="relative aspect-video bg-muted overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className={cn("project-card-image", isCarousel ? "" : "group-hover:scale-105")}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <CategoryIcon className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
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
          <div className="flex items-center gap-2 mb-3">
            <FolderOpen className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
          </div>
          <p className="text-muted-foreground mb-4 line-clamp-3">{project.shortDescription}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 6).map((tech) => (
              <Badge key={tech} variant="outline" className="tech-badge text-xs">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 6 && (
              <Badge variant="outline" className="tech-badge text-xs">
                +{project.techStack.length - 6} more
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0 border-t border-border">
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
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
                className="text-muted-foreground hover:text-primary transition-colors"
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

  const renderDesktopCarousel = () => (
    <div className="relative">
      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {featuredProjects.map((project) => (
          <div
            key={project.id}
            className="flex-shrink-0 w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] snap-start"
          >
            {renderProjectCard(project, true)}
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          aria-label="Previous project"
          disabled={currentSlide === 0}
          className="opacity-50 disabled:pointer-events-none"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </Button>
        <div className="flex items-center gap-2" role="tablist" aria-label="Project slides">
          {featuredProjects.map((_, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={currentSlide === index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "carousel-indicator",
                currentSlide === index && "active"
              )}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          aria-label="Next project"
          disabled={currentSlide === featuredProjects.length - 1}
          className="opacity-50 disabled:pointer-events-none"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );

  const renderMobileStack = () => (
    <div className="space-y-6">
      {featuredProjects.map((project, index) => (
        <div key={project.id} className="animate-fade-in-up" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
          {renderProjectCard(project)}
        </div>
      ))}
    </div>
  );

  return (
    <section id="projects" className="py-20 sm:py-28 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-16">
          <div className="text-center sm:text-left mb-8 sm:mb-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border mb-4 animate-fade-in-up">
              <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-muted-foreground">Software</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              Selected <span className="text-primary">Work</span>
            </h2>
            <p className="text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              A collection of projects showcasing my experience in full-stack development, AI/ML, and cloud architecture.
            </p>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <Button variant="outline" size="lg" onClick={() => window.open("https://github.com/MaheshBoda-26", "_blank", "noopener,noreferrer")}>
              View all projects
              <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Featured Projects - Carousel on Desktop, Stack on Mobile */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2 animate-fade-in-up">
              <Star className="h-6 w-6 text-amber-500 fill-current" aria-hidden="true" />
              Featured Projects
            </h3>

            {isMobile ? renderMobileStack() : renderDesktopCarousel()}
          </div>
        )}

        {/* All Projects Grid */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-8 animate-fade-in-up">All Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <div key={project.id} className="animate-fade-in-up" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                {renderProjectCard(project)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}