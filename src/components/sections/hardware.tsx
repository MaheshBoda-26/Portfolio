"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/section-header";
import { ExternalLink, Star, Cpu } from "lucide-react";

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
        <SectionHeader
          slash="hardware"
          title={<>Hardware <span className="text-primary">Projects</span></>}
          subtitle="Custom builds, mechanical keyboards, and home lab infrastructure"
          action={
            <a
              href="https://github.com/MaheshBoda-26"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium flex items-center gap-1"
            >
              Explore collection
              <ExternalLink className="h-4 w-4" />
            </a>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hardwareProjects.map((project, index) => (
            <article
              key={project.id}
              className={cn(
                "bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-colors group animate-fade-in-up",
                project.featured && "ring-2 ring-primary/20"
              )}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="relative aspect-video overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="tech-badge text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <a
                  href={`https://github.com/MaheshBoda-26/${project.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium text-sm flex items-center gap-1"
                >
                  Full project log
                  <ExternalLink className="h-3 w-3" />
                </a>
              </CardContent>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}