"use client";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  slash: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SectionHeader({ slash, title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-16">
      <div className="text-center sm:text-left mb-8 sm:mb-0">
        <p className="section-slash animate-fade-in-up">/ {slash}</p>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          {action}
        </div>
      )}
    </div>
  );
}