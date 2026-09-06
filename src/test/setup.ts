import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const { createElement } = require("react");
    return createElement("img", { src, alt, ...props });
  },
}));

// Mock lucide-react icons
vi.mock("lucide-react", () => {
  const icons = [
    "ArrowLeft",
    "GitBranch",
    "ExternalLink",
    "Star",
    "Zap",
    "FileText",
    "Search",
    "Filter",
    "X",
    "ChevronDown",
    "Code2",
    "Server",
    "Database",
    "Mail",
    "Globe",
    "Mail",
    "GithubIcon",
    "LinkedInIcon",
    "TwitterIcon",
  ];
  const mockIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} {...props} data-testid="icon" />
  );
  return icons.reduce(
    (acc, icon) => ({
      ...acc,
      [icon]: mockIcon,
    }),
    {}
  );
});

// Mock @base-ui components
vi.mock("@base-ui/react/button", () => ({
  Button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>{children}</button>
  ),
}));

vi.mock("@base-ui/react/input", () => ({
  Input: ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />,
}));

vi.mock("@base-ui/react/merge-props", () => ({
  mergeProps: <T extends string>(...props: React.ComponentProps<T>[]) =>
    Object.assign({}, ...props),
}));

vi.mock("@base-ui/react/use-render", () => ({
  useRender: ({
    defaultTagName,
    props,
    render,
    state,
  }: {
    defaultTagName: string;
    props: Record<string, unknown>;
    render?: React.ReactNode;
    state: Record<string, unknown>;
  }) => {
    const Component = defaultTagName as keyof JSX.IntrinsicElements;
    return <Component {...props} {...state} />;
  },
}));

// Mock class-variance-authority
vi.mock("class-variance-authority", () => ({
  cva: (base: string, config: Record<string, unknown>) => {
    const variants = config.variants || {};
    const defaultVariants = config.defaultVariants || {};

    return (props: Record<string, unknown> = {}) => {
      let className = base;
      Object.entries(props).forEach(([key, value]) => {
        if (variants[key] && variants[key][value as string]) {
          className += ` ${variants[key][value as string]}`;
        }
      });
      Object.entries(defaultVariants).forEach(([key, value]) => {
        if (!props[key] && variants[key] && variants[key][value as string]) {
          className += ` ${variants[key][value as string]}`;
        }
      });
      return className;
    };
  },
}));

// Mock tailwind-merge
vi.mock("tailwind-merge", () => ({
  twMerge: (...args: string[]) => args.filter(Boolean).join(" "),
}));

// Mock cn utility
vi.mock("@/lib/utils", () => ({
  cn: (...args: (string | undefined | null | false)[]) =>
    args.filter(Boolean).join(" "),
}));

// Global test utilities
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));