"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { Zap } from "lucide-react";
import { experience } from "@/lib/data";

export function Experience() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="py-20 sm:py-28 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          slash="experience"
          title="Where I've <span className='text-primary'>worked</span>"
          subtitle="My journey building scalable systems and intelligent applications"
        />

        {/* Horizontal Tabs */}
        <div className="flex flex-wrap gap-2 mb-12" role="tablist" aria-label="Experience companies">
          {experience.map((exp, index) => (
            <button
              key={exp.id}
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={`${exp.id}-panel`}
              id={`${exp.id}-tab`}
              onClick={() => setActiveTab(index)}
              tabIndex={activeTab === index ? 0 : -1}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                activeTab === index
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground bg-muted"
              )}
            >
              {exp.company}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        <div className="animate-fade-in-left">
          {experience.map((exp, index) => (
            <div
              key={exp.id}
              role="tabpanel"
              id={`${exp.id}-panel`}
              aria-labelledby={`${exp.id}-tab`}
              hidden={activeTab !== index}
              className={activeTab === index ? "block" : "hidden"}
            >
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">{exp.role}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </div>
                  <Badge variant="outline" className="tech-badge">
                    {exp.period}
                  </Badge>
                </div>

                <ul className="space-y-3 text-muted-foreground mb-6" role="list">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                      <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="tech-badge text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}