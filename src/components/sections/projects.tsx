"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { Input } from "@/components/ui/input";
import { GitBranch, ExternalLink, Star, Zap, FileText, Search, Filter, X, ChevronDown } from "lucide-react";
import { projects, Project } from "@/lib/data";

const categoryLabels: Record<Project["category"], string> = {
  web: "Web App",
  mobile: "Mobile",
  ai: "AI/ML",
  fullstack: "Full Stack",
  other: "Other",
};

const categoryOptions = [
  { value: "all", label: "All" },
  { value: "featured", label: "Featured" },
  { value: "web", label: "Web App" },
  { value: "ai", label: "AI/ML" },
  { value: "fullstack", label: "Full Stack" },
  { value: "mobile", label: "Mobile" },
  { value: "other", label: "Other" },
] as const;

export function Projects() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize state from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    (searchParams.get("category") as typeof categoryOptions[number]["value"]) || "all"
  );
  const [selectedTech, setSelectedTech] = useState<string[]>(
    searchParams.get("tech")?.split(",").filter(Boolean) || []
  );
  const [isTechOpen, setIsTechOpen] = useState(false);

  // Collect all unique tech stacks
  const allTechStacks = Array.from(
    new Set(projects.flatMap((p) => p.techStack))
  ).sort();

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Sync URL with filters
  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("q", debouncedSearch);
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (selectedTech.length > 0) params.set("tech", selectedTech.join(","));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, selectedCategory, selectedTech, router, pathname]);

  useEffect(() => {
    updateURL();
  }, [updateURL]);

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      !debouncedSearch ||
      project.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      project.techStack.some((tech) =>
        tech.toLowerCase().includes(debouncedSearch.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "featured" ? project.featured : project.category === selectedCategory);

    const matchesTech =
      selectedTech.length === 0 || selectedTech.every((tech) => project.techStack.includes(tech));

    return matchesSearch && matchesCategory && matchesTech;
  });

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  const hasActiveFilters =
    debouncedSearch || selectedCategory !== "all" || selectedTech.length > 0;

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedTech([]);
  };

  const toggleTech = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const renderProjectCard = (project: Project) => (
    <article
      key={project.id}
      className={cn(
        "bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-colors group animate-fade-in-up"
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <Link
          href={`/project/${project.id}`}
          className="flex-1 block"
        >
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
        </Link>
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
      <div className="flex flex-wrap gap-4">
        <Link
          href={`/project/${project.id}`}
          className="text-primary hover:underline font-medium text-sm flex items-center gap-1"
        >
          <FileText className="h-4 w-4" />
          View Details
        </Link>
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

  const BASE_URL = "https://maheshboda.dev";

function generateProjectsSchema(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.shortDescription,
        url: `${BASE_URL}/project/${project.id}`,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Cloud",
        keywords: project.techStack.join(", "),
        author: {
          "@type": "Person",
          name: "Mahesh Boda",
          url: BASE_URL,
        },
        ...(project.githubUrl && { codeRepository: project.githubUrl }),
        ...(project.liveUrl && { downloadUrl: project.liveUrl }),
      },
    })),
  };
}

const projectsSchema = generateProjectsSchema(projects);

return (
    <section id="projects" className="py-20 sm:py-28 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
        />
        <SectionHeader
          slash="software"
          title={<span>Selected <span className="text-primary">Work</span></span>}
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

        {/* Filters */}
        <div className="space-y-6 mb-12 animate-fade-in-up">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <Input
              type="search"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
              aria-label="Search projects by title, description, or technology"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {categoryOptions.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all focus-visible-ring",
                  selectedCategory === cat.value
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-background text-foreground border border-border hover:border-primary/50"
                )}
                aria-pressed={selectedCategory === cat.value}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Tech Stack Filter */}
          <div className="relative">
            <button
              onClick={() => setIsTechOpen(!isTechOpen)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors focus-visible-ring",
                selectedTech.length > 0
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-background border-border text-foreground hover:border-primary/50"
              )}
              aria-expanded={isTechOpen}
              aria-haspopup="listbox"
              aria-label="Filter by technology"
            >
              <Filter className="h-4 w-4" />
              {selectedTech.length > 0 ? (
                <>
                  {selectedTech.length === 1 ? selectedTech[0] : `${selectedTech.length} technologies`}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isTechOpen && "rotate-180")} />
                </>
              ) : (
                <>
                  Filter by Tech
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isTechOpen && "rotate-180")} />
                </>
              )}
            </button>

            {isTechOpen && (
              <div className="absolute z-50 mt-2 w-64 max-h-60 overflow-auto bg-popover border border-border rounded-lg shadow-lg p-2">
                <div className="flex items-center justify-between px-2 py-1 mb-2">
                  <span className="text-xs font-medium text-muted-foreground">Technologies</span>
                  {selectedTech.length > 0 && (
                    <button
                      onClick={() => setSelectedTech([])}
                      className="text-xs text-primary hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className="space-y-1 max-h-48 overflow-auto" role="listbox">
                  {allTechStacks.map((tech) => (
                    <label
                      key={tech}
                      className={cn(
                        "flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer transition-colors",
                        selectedTech.includes(tech)
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                      role="option"
                      aria-selected={selectedTech.includes(tech)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedTech.includes(tech)}
                        onChange={() => toggleTech(tech)}
                        className="h-4 w-4 text-primary border-border rounded focus-visible-ring"
                        aria-label={tech}
                      />
                      <span>{tech}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Active Filters Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 animate-fade-in-up">
              {debouncedSearch && (
                <Badge variant="secondary" className="gap-1">
                  <Search className="h-3 w-3" />
                  "{debouncedSearch}"
                  <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-primary">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  <Filter className="h-3 w-3" />
                  {categoryOptions.find((c) => c.value === selectedCategory)?.label}
                  <button onClick={() => setSelectedCategory("all")} className="ml-1 hover:text-primary">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedTech.map((tech) => (
                <Badge key={tech} variant="secondary" className="gap-1">
                  {tech}
                  <button onClick={() => toggleTech(tech)} className="ml-1 hover:text-primary">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <button
                onClick={clearFilters}
                className="text-sm text-muted-foreground hover:text-primary font-medium"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 animate-fade-in-up">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>

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
          <h3 className="text-2xl font-bold text-foreground mb-8 animate-fade-in-up">
            {selectedCategory === "featured" ? "Featured Projects" : "All Projects"}
          </h3>
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground animate-fade-in-up">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No projects match your filters</p>
              <button onClick={clearFilters} className="mt-4 text-primary hover:underline">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {otherProjects.map((project, index) => (
                <div key={project.id} style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                  {renderProjectCard(project)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}