"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code2, Server, Database, Wrench, Terminal, Briefcase, Zap } from "lucide-react";

const experienceTabs = [
  {
    id: "tech-company",
    label: "Tech Company",
    period: "2022 - Present",
    role: "Senior Software Engineer",
    description: [
      "Led development of AI-powered customer support platform serving 10K+ users",
      "Architected microservices infrastructure reducing latency by 40%",
      "Mentored 5 engineers and established code review practices",
    ],
    techStack: ["Next.js", "Python", "PostgreSQL", "Kubernetes", "AWS"],
  },
  {
    id: "startup-inc",
    label: "Startup Inc",
    period: "2020 - 2022",
    role: "Full Stack Developer",
    description: [
      "Built and maintained multiple client projects using React/Node.js",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
      "Designed RESTful APIs and GraphQL schemas for mobile apps",
    ],
    techStack: ["React", "Node.js", "MongoDB", "Docker", "GraphQL"],
  },
  {
    id: "big-tech-co",
    label: "Big Tech Co",
    period: "2019 - 2020",
    role: "Software Engineer Intern",
    description: [
      "Contributed to internal developer tools and automation scripts",
      "Optimized database queries improving dashboard load times by 35%",
      "Wrote unit and integration tests achieving 85% coverage",
    ],
    techStack: ["Java", "Spring Boot", "MySQL", "Kafka", "JUnit"],
  },
];

export function Experience() {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  // Update indicator position
  useEffect(() => {
    if (indicatorRef.current && tabRefs.current[activeTab]) {
      const tab = tabRefs.current[activeTab];
      indicatorRef.current.style.top = `${tab.offsetTop}px`;
      indicatorRef.current.style.height = `${tab.offsetHeight}px`;
    }
  }, [activeTab]);

  // Initialize indicator
  useEffect(() => {
    if (indicatorRef.current && tabRefs.current[0]) {
      const tab = tabRefs.current[0];
      indicatorRef.current.style.top = `${tab.offsetTop}px`;
      indicatorRef.current.style.height = `${tab.offsetHeight}px`;
    }
  }, []);

  return (
    <section id="experience" className="py-20 sm:py-28 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border mb-4 animate-fade-in-up">
            <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-muted-foreground">Experience</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Where I've <span className="text-primary">worked</span>
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            My journey building scalable systems and intelligent applications
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Vertical Tabs */}
          <div className="relative">
            <div className="relative">
              {/* Animated Indicator */}
              <span
                ref={indicatorRef}
                className="tab-indicator absolute left-0 rounded-r-full"
              />
              <div className="relative z-10 flex flex-col" role="tablist" aria-label="Experience companies">
                {experienceTabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    ref={(el) => (tabRefs.current[index] = el)}
                    role="tab"
                    aria-selected={activeTab === index}
                    aria-controls={`${tab.id}-panel`}
                    id={`${tab.id}-tab`}
                    className={cn(
                      "tab-button group",
                      activeTab === index && "active"
                    )}
                    onClick={() => setActiveTab(index)}
                    tabIndex={activeTab === index ? 0 : -1}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown" && index < experienceTabs.length - 1) {
                        e.preventDefault();
                        setActiveTab(index + 1);
                      } else if (e.key === "ArrowUp" && index > 0) {
                        e.preventDefault();
                        setActiveTab(index - 1);
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Briefcase className="h-5 w-5 text-primary" aria-hidden="true" />
                      </div>
                      <span className="font-medium">{tab.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Panels */}
          <div className="lg:col-span-3">
            {experienceTabs.map((tab, index) => (
              <div
                key={tab.id}
                role="tabpanel"
                id={`${tab.id}-panel`}
                aria-labelledby={`${tab.id}-tab`}
                hidden={activeTab !== index}
                className={cn(
                  "animate-fade-in-left",
                  activeTab === index ? "block" : "hidden"
                )}
                style={{ animationDelay: "100ms" }}
              >
                <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">{tab.role}</h3>
                      <p className="text-primary font-medium">{tab.company}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="tech-badge">
                        <Zap className="h-3 w-3 mr-1" aria-hidden="true" />
                        {tab.period}
                      </Badge>
                    </div>
                  </div>

                  <ul className="space-y-3 text-muted-foreground mb-6" role="list">
                    {tab.description.map((desc, i) => (
                      <li key={i} className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                        <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {tab.techStack.map((tech) => (
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
      </div>
    </section>
  );
}