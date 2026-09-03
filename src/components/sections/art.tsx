"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/section-header";
import { ExternalLink, Image as ImageIcon, Palette, Camera, Layers, Zap } from "lucide-react";

const artProjects = [
  {
    id: "digital-1",
    title: "Neural Landscape",
    description: "Digital art exploring the intersection of AI and creativity",
    category: "Digital",
    image: "/art/neural-landscape.jpg",
  },
  {
    id: "digital-2",
    title: "Code Poetry",
    description: "Generative art created with Processing and p5.js",
    category: "Generative",
    image: "/art/code-poetry.jpg",
  },
  {
    id: "traditional-1",
    title: "Midnight Sketch",
    description: "Charcoal on paper - late night coding session inspiration",
    category: "Traditional",
    image: "/art/midnight-sketch.jpg",
  },
  {
    id: "digital-3",
    title: "Data Visualization",
    description: "Abstract representation of network traffic patterns",
    category: "Data Art",
    image: "/art/data-viz.jpg",
  },
  {
    id: "photography-1",
    title: "Urban Geometry",
    description: "Architectural photography focusing on patterns and symmetry",
    category: "Photography",
    image: "/art/urban-geometry.jpg",
  },
  {
    id: "digital-4",
    title: "Algorithm Dreams",
    description: "AI-assisted digital painting exploring algorithmic aesthetics",
    category: "AI Art",
    image: "/art/algo-dreams.jpg",
  },
];

const categoryIcons: Record<string, typeof ImageIcon> = {
  Digital: ImageIcon,
  Generative: Layers,
  Traditional: Palette,
  "Data Art": Zap,
  Photography: Camera,
  "AI Art": ImageIcon,
};

export function Art() {
  return (
    <section id="art" className="py-20 sm:py-28 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          slash="art"
          title={<>Art <span className="text-primary">Collection</span></>}
          subtitle="A collection of digital and traditional artwork exploring different styles and mediums."
          action={
            <a href="#" className="text-primary hover:underline font-medium flex items-center gap-1">
              Explore collection
              <ExternalLink className="h-4 w-4" />
            </a>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artProjects.map((art, index) => (
            <article
              key={art.id}
              className={cn(
                "bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-colors group animate-fade-in-up"
              )}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="relative aspect-square overflow-hidden">
                {art.image ? (
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <ImageIcon className="h-16 w-16 text-muted-foreground" aria-hidden="true" />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <Badge variant="outline" className="tech-badge text-xs mb-2">
                  {art.category}
                </Badge>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {art.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{art.description}</p>
              </CardContent>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}