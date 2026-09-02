"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Zap, Image as ImageIcon, Palette, Camera, Layers } from "lucide-react";

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
  "AI Art": Brain,
};

import { Brain } from "lucide-react";

export function Art() {
  return (
    <section id="art" className="py-20 sm:py-28 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-16">
          <div className="text-center sm:text-left mb-8 sm:mb-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border mb-4 animate-fade-in-up">
              <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-muted-foreground">Art Gallery</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              Art <span className="text-primary">Collection</span>
            </h2>
            <p className="text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              A collection of digital and traditional artwork exploring different styles and mediums.
            </p>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <a href="#" className="text-primary font-medium hover:underline flex items-center gap-1">
              Explore collection
              <ImageIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Art Grid */}
        <div className="art-container">
          <div className="art-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artProjects.map((art, index) => (
              <div key={art.id} className="animate-fade-in-up" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
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
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="tech-badge text-xs">
                        {art.category}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{art.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{art.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}