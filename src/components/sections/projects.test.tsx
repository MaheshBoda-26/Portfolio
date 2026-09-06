import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Projects } from "@/components/sections/projects";
import { projects } from "@/lib/data";

// Mock next/navigation hooks
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({
    replace: vi.fn(),
    push: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock lucide-react icons
vi.mock("lucide-react", () => {
  const mockIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} {...props} data-testid="icon" />
  );
  return {
    GitBranch: mockIcon,
    ExternalLink: mockIcon,
    Star: mockIcon,
    Zap: mockIcon,
    FileText: mockIcon,
    Search: mockIcon,
    Filter: mockIcon,
    X: mockIcon,
    ChevronDown: mockIcon,
    Code2: mockIcon,
    Server: mockIcon,
    Database: mockIcon,
    Mail: mockIcon,
    Globe: mockIcon,
  };
});

// Mock SectionHeader
vi.mock("@/components/ui/section-header", () => ({
  SectionHeader: ({ slash, title, subtitle, action }: {
    slash: string;
    title: React.ReactNode;
    subtitle?: string;
    action?: React.ReactNode;
  }) => (
    <div data-testid="section-header">
      <p>{slash}</p>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      {action && <div>{action}</div>}
    </div>
  ),
}));

describe("Projects Section", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all projects", () => {
    render(<Projects />);

    projects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it("renders section header with correct title", () => {
    render(<Projects />);

    expect(screen.getByText("Selected")).toBeInTheDocument();
    expect(screen.getByText("Work")).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(<Projects />);

    expect(screen.getByPlaceholderText("Search projects...")).toBeInTheDocument();
  });

  it("renders category filter buttons", () => {
    render(<Projects />);

    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Featured" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Web App" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "AI/ML" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Full Stack" })).toBeInTheDocument();
  });

  it("filters projects by search query", async () => {
    render(<Projects />);

    const searchInput = screen.getByPlaceholderText("Search projects...");
    fireEvent.change(searchInput, { target: { value: "RAG" } });

    // Wait for debounce (300ms) + filter
    await waitFor(() => {
      expect(screen.getByText("RAG Pipeline with Hybrid Search")).toBeInTheDocument();
      expect(screen.getByText("RAG Trace Debugger")).toBeInTheDocument();
    }, { timeout: 1000 });

    // Wait a bit more for debounce to complete
    await new Promise(resolve => setTimeout(resolve, 400));

    // Other projects should not be visible (or filtered out)
    expect(screen.queryAllByText("ResolveX")).toHaveLength(0);
    expect(screen.queryAllByText("ResumeForge")).toHaveLength(0);
    expect(screen.queryAllByText("TruthLens")).toHaveLength(0);
  });

  it("filters projects by category", async () => {
    render(<Projects />);

    const aiMlButton = screen.getByRole("button", { name: "AI/ML" });
    fireEvent.click(aiMlButton);

    await waitFor(() => {
      expect(screen.getByText("RAG Pipeline with Hybrid Search")).toBeInTheDocument();
      expect(screen.getByText("RAG Trace Debugger")).toBeInTheDocument();
    });

    expect(screen.queryByText("ResolveX")).not.toBeInTheDocument();
    expect(screen.queryByText("ResumeForge")).not.toBeInTheDocument();
    expect(screen.queryByText("TruthLens")).not.toBeInTheDocument();
  });

  it("shows featured projects when Featured filter is selected", async () => {
    render(<Projects />);

    const featuredButton = screen.getByRole("button", { name: "Featured" });
    fireEvent.click(featuredButton);

    await waitFor(() => {
      const featuredProjects = projects.filter(p => p.featured);
      featuredProjects.forEach(project => {
        expect(screen.getByText(project.title)).toBeInTheDocument();
      });
    });

    const nonFeatured = projects.filter(p => !p.featured);
    nonFeatured.forEach(project => {
      expect(screen.queryByText(project.title)).not.toBeInTheDocument();
    });
  });

  it("renders tech stack badges for each project", () => {
    render(<Projects />);

    projects.forEach((project) => {
      project.techStack.slice(0, 8).forEach((tech) => {
        expect(screen.getAllByText(tech)).toHaveLength(
          projects.filter(p => p.techStack.includes(tech)).length
        );
      });
    });
  });

  it("renders action links for projects", () => {
    render(<Projects />);

    // Check that each project has its action links
    expect(screen.getAllByText("View Details")).toHaveLength(projects.length);

    projects.forEach((project) => {
      if (project.githubUrl) {
        expect(screen.getAllByText("Code")).toHaveLength(
          projects.filter(p => p.githubUrl).length
        );
      }
      if (project.liveUrl) {
        expect(screen.getAllByText("Live")).toHaveLength(
          projects.filter(p => p.liveUrl).length
        );
      }
    });
  });

  it("shows results count", () => {
    render(<Projects />);

    expect(screen.getByText(`Showing ${projects.length} of ${projects.length} projects`)).toBeInTheDocument();
  });

  it("shows no results message when filters match nothing", async () => {
    render(<Projects />);

    const searchInput = screen.getByPlaceholderText("Search projects...");
    fireEvent.change(searchInput, { target: { value: "nonexistentproject" } });

    await waitFor(() => {
      expect(screen.getByText("No projects match your filters")).toBeInTheDocument();
    });
  });
});