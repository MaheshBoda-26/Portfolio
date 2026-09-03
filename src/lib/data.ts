export interface Skill {
  name: string;
  category: "frontend" | "backend" | "devops" | "tools" | "languages";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  techStack: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  category: "web" | "mobile" | "ai" | "fullstack" | "other";
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  techStack: string[];
}

export interface SocialLink {
  name: string;
  url: string;
}

export const personalInfo = {
  name: "Mahesh Boda",
  title: "Full Stack Developer & AI Engineer",
  tagline: "Building intelligent, scalable applications with modern tech",
  bio: "I'm a passionate developer with expertise in building full-stack applications, AI/ML systems, and cloud-native solutions. I love turning complex problems into elegant, user-friendly products.",
  email: "maheshboda@example.com",
  location: "San Francisco, CA",
  resumeUrl: "/resume.pdf",
};

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/MaheshBoda-26",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/maheshboda",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/maheshboda",
  },
  {
    name: "Email",
    url: "mailto:maheshboda@example.com",
  },
];

export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Vue.js", category: "frontend" },
  { name: "Redux/Zustand", category: "frontend" },

  // Backend
  { name: "Node.js", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "FastAPI", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "MongoDB", category: "backend" },
  { name: "Redis", category: "backend" },

  // DevOps
  { name: "Docker", category: "devops" },
  { name: "Kubernetes", category: "devops" },
  { name: "AWS", category: "devops" },
  { name: "Vercel", category: "devops" },
  { name: "GitHub Actions", category: "devops" },
  { name: "Terraform", category: "devops" },

  // AI/ML
  { name: "LangChain", category: "tools" },
  { name: "OpenAI API", category: "tools" },
  { name: "Vector DBs", category: "tools" },
  { name: "RAG Systems", category: "tools" },
  { name: "Prompt Engineering", category: "tools" },

  // Languages
  { name: "JavaScript", category: "languages" },
  { name: "TypeScript", category: "languages" },
  { name: "Python", category: "languages" },
  { name: "Go", category: "languages" },
  { name: "Rust", category: "languages" },
];

export const projects: Project[] = [
  {
    id: "resolvex",
    title: "ResolveX",
    description: "A full-stack AI-powered customer support platform with real-time chat, automated ticket triage, and intelligent response suggestions. Built with Next.js, FastAPI, PostgreSQL, and WebSocket connections for real-time updates.",
    shortDescription: "AI-powered customer support platform with real-time chat and automated triage",
    techStack: ["Next.js", "FastAPI", "PostgreSQL", "WebSockets", "Redis", "OpenAI"],
    image: "/projects/resolvex.png",
    githubUrl: "https://github.com/MaheshBoda-26/ResolveX",
    liveUrl: "https://resolvex.demo.com",
    featured: true,
    category: "fullstack",
  },
  {
    id: "rag-pipeline",
    title: "RAG Pipeline with Hybrid Search",
    description: "Production-ready Retrieval-Augmented Generation pipeline combining dense vector search with sparse keyword search (BM25). Features document chunking, embedding generation, reranking, and evaluation metrics.",
    shortDescription: "Hybrid search RAG pipeline with dense + sparse retrieval and reranking",
    techStack: ["Python", "FastAPI", "PostgreSQL", "pgvector", "LangChain", "LangGraph"],
    image: "/projects/rag-pipeline.png",
    githubUrl: "https://github.com/MaheshBoda-26/RAG-Pipeline",
    liveUrl: undefined,
    featured: true,
    category: "ai",
  },
  {
    id: "rag-trace-debugger",
    title: "RAG Trace Debugger",
    description: "Observability tool for debugging RAG pipelines with trace visualization, latency analysis, and retrieval quality metrics. Helps identify bottlenecks in retrieval and generation stages.",
    shortDescription: "Observability and debugging tool for RAG pipeline traces",
    techStack: ["React", "TypeScript", "FastAPI", "PostgreSQL", "OpenTelemetry"],
    image: "/projects/rag-trace.png",
    githubUrl: "https://github.com/MaheshBoda-26/RAG-Trace-Debugger",
    liveUrl: undefined,
    featured: true,
    category: "ai",
  },
  {
    id: "resume-forge",
    title: "ResumeForge",
    description: "AI-powered resume builder and optimizer that tailors resumes to job descriptions using LLMs. Features ATS scoring, keyword optimization, and multiple template options.",
    shortDescription: "AI resume builder with ATS optimization and job matching",
    techStack: ["Next.js", "Python", "OpenAI", "Tailwind CSS", "PostgreSQL"],
    image: "/projects/resumeforge.png",
    githubUrl: "https://github.com/MaheshBoda-26/ResumeForge",
    liveUrl: "https://resumeforge.demo.com",
    featured: false,
    category: "web",
  },
  {
    id: "truthlens",
    title: "TruthLens",
    description: "Fact-checking browser extension that analyzes claims in real-time using multiple verification sources. Provides credibility scores and source citations for any selected text.",
    shortDescription: "Real-time fact-checking browser extension with credibility scoring",
    techStack: ["TypeScript", "Chrome Extension API", "FastAPI", "Vector Search"],
    image: "/projects/truthlens.png",
    githubUrl: "https://github.com/MaheshBoda-26/TruthLens",
    liveUrl: undefined,
    featured: false,
    category: "web",
  },
];

export const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
];