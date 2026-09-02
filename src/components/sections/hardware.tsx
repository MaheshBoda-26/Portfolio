"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ExternalLink, Star, Cpu, Zap, Wifi, Monitor, MousePointer, Keyboard, Headphones } from "lucide-react";
import { GithubIcon } from "@/components/common/social-icons";

const hardwareProjects = [
  {
    id: "custom-pc",
    title: "Custom Build PC",
    description: "A high-performance white-themed PC build inspired by Rei Ayanami from Neon Genesis Evangelion. Features custom water cooling loop and synchronized RGB lighting.",
    techStack: ["AMD Ryzen 9 7950X", "RTX 4090", "64GB DDR5", "2TB NVMe"],
    image: "/hardware/pc-cover.jpg",
    featured: true,
  },
  {
    id: "mechanical-keyboard",
    title: "Custom Mechanical Keyboard",
    description: "Hand-built 75% layout keyboard with hot-swappable switches, custom keycaps, and QMK firmware. Designed for both gaming and long coding sessions.",
    techStack: ["QMK/VIA", "Gateron Switches", "PBT Keycaps", "Aluminum Case"],
    image: "/hardware/keyboard-cover.jpg",
    featured: false,
  },
  {
    id: "home-lab",
    title: "Home Lab Server",
    description: "Rack-mounted home server running Proxmox with multiple VMs for self-hosted services, CI/CD runners, and development environments.",
    techStack: ["Proxmox VE", "Docker", "Kubernetes", "TrueNAS"],
    image: "/hardware/lab-cover.jpg",
    featured: false,
  },
];

export function Hardware() {
  return (
    <section id="hardware" className="py-20 sm:py-28 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border mb-4 animate-fade-in-up">
            <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-muted-foreground">Hardware</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Hardware <span className="text-primary">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            Custom builds, mechanical keyboards, and home lab infrastructure
          </p>
        </div>

        <div className="project-container">
          <ul className="projects-grid space-y-6">
            {hardwareProjects.map((project, index) => (
              <li key={project.id} className={cn(
                "projects-card transparent-card animate-fade-in-up",
                project.featured && "ring-2 ring-primary/20"
              )} style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                <div className="project-image-container relative aspect-video overflow-hidden rounded-lg">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="project-image object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <Cpu className="h-16 w-16 text-muted-foreground" aria-hidden="true" />
                    </div>
                  )}
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
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Cpu className="h-5 w-5 text-primary" aria-hidden="true" />
                      </div>
                      <h3 className="card-title text-xl font-bold text-foreground">{project.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <a
                        href={`https://github.com/MaheshBoda-26/${project.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <GithubIcon className="h-5 w-5" aria-hidden="true" />
                      </a>
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`View ${project.title} build log`}
                      >
                        <ExternalLink className="h-5 w-5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                  <p className="card-desc text-muted-foreground mb-4">{project.description}</p>
                  <div className="full-log-link text-sm text-primary font-medium mb-4 hover:underline cursor-pointer">
                    Full project log
                  </div>
                  <div className="card-tech flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="tech-badge text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 text-center animate-fade-in-up">
          <Button variant="outline" size="lg" onClick={() => window.open("https://github.com/MaheshBoda-26", "_blank", "noopener,noreferrer")}>
            View All on GitHub
            <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}