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

export interface ProjectLogEntry {
  type: "text" | "image" | "list" | "tip";
  value?: string;
  title?: string;
  items?: string[];
}

export interface ProjectLog {
  title: string;
  content: ProjectLogEntry[];
}

export interface ProjectLogsData {
  date: string;
  logs: ProjectLog[];
}

export const projectLogs: Record<string, ProjectLogsData> = {
  resolvex: {
    date: "March 2024",
    logs: [
      {
        title: "0. Project Genesis",
        content: [
          { type: "text", value: "ResolveX started as a response to a common pain point: customer support teams drowning in repetitive tickets while customers wait hours for simple answers. The goal was to build an AI-first support platform that could handle 80% of queries automatically while seamlessly escalating complex issues to humans." },
          { type: "text", value: "I chose a hybrid architecture: Next.js for the frontend (real-time chat, dashboard), FastAPI for the ML backend (intent classification, response generation), and PostgreSQL with pgvector for semantic search over knowledge bases." },
        ],
      },
      {
        title: "1. Real-time Chat Infrastructure",
        content: [
          { type: "text", value: "WebSocket connections proved trickier than expected. The challenge wasn't just connection management—it was handling reconnection gracefully, message ordering, and presence indicators across multiple tabs." },
          { type: "list", title: "Key technical decisions:", items: [
            "Socket.io for automatic fallback and room management",
            "Redis pub/sub for horizontal scaling across workers",
            "Optimistic UI updates for instant message appearance",
            "Message deduplication via client-generated UUIDs",
          ]},
        ],
      },
      {
        title: "2. Intent Classification Pipeline",
        content: [
          { type: "text", value: "The core ML component classifies incoming messages into 50+ intent categories. Started with a fine-tuned DistilBERT, but latency was too high for real-time chat." },
          { type: "tip", value: "Switched to a two-stage approach: fast keyword/rule-based router for common intents (80% of traffic), then DistilBERT only for ambiguous cases. Cut p99 latency from 450ms to 80ms." },
        ],
      },
      {
        title: "3. RAG-Powered Response Generation",
        content: [
          { type: "text", value: "For generating responses, I implemented a Retrieval-Augmented Generation pipeline over company knowledge bases. Documents are chunked, embedded with text-embedding-3-small, and stored in pgvector." },
          { type: "text", value: "The retrieval uses hybrid search: dense vector similarity (cosine) + sparse BM25 keyword matching, combined with reciprocal rank fusion. Reranking with cross-encoder improved relevance by ~23%." },
        ],
      },
      {
        title: "4. Human-in-the-Loop Escalation",
        content: [
          { type: "text", value: "When confidence drops below threshold, the system creates a ticket with full context: conversation history, classified intent, retrieved docs, and suggested response. Agents can accept, edit, or reject—each action feeds back into model retraining." },
        ],
      },
    ],
  },
  "rag-pipeline": {
    date: "January 2024",
    logs: [
      {
        title: "0. Why Build Another RAG?",
        content: [
          { type: "text", value: "Existing RAG frameworks (LangChain, LlamaIndex) are great for prototyping but opaque in production. I needed full control over chunking strategies, embedding models, retrieval algorithms, and observability." },
        ],
      },
      {
        title: "1. Hybrid Search Architecture",
        content: [
          { type: "text", value: "Pure dense retrieval misses exact keyword matches. Pure sparse retrieval misses semantic similarity. The solution: run both in parallel and fuse results." },
          { type: "list", title: "Pipeline stages:", items: [
            "Document ingestion → semantic chunking (overlap-aware)",
            "Embedding generation → batch processed, cached",
            "Dual indexing → pgvector (dense) + PostgreSQL tsvector (sparse)",
            "Query time → parallel dense + sparse retrieval",
            "Reciprocal Rank Fusion → combined ranking",
            "Cross-encoder reranking → top-k refinement",
            "Answer generation → constrained to retrieved context",
          ]},
        ],
      },
      {
        title: "2. Evaluation Framework",
        content: [
          { type: "text", value: "Built automated evaluation using synthetic QA pairs generated from documents. Metrics: retrieval@k, answer faithfulness (via LLM judge), latency percentiles, and cost per query." },
        ],
      },
    ],
  },
  "rag-trace-debugger": {
    date: "February 2024",
    logs: [
      {
        title: "0. The Debugging Gap",
        content: [
          { type: "text", value: "RAG pipelines are black boxes. When answer quality drops, you need to know: was it retrieval? reranking? generation? Existing tools show logs, not the semantic flow." },
        ],
      },
      {
        title: "1. Trace Visualization",
        content: [
          { type: "text", value: "Each query generates a trace: query embedding → retrieved chunks (with scores) → reranked chunks → generated answer. The UI shows this as an interactive waterfall with expandable chunks, similarity scores, and latency breakdowns." },
        ],
      },
      {
        title: "2. OpenTelemetry Integration",
        content: [
          { type: "text", value: "Instrumented the entire pipeline with OTel spans. Exporters to Jaeger, Grafana Tempo, and console. Custom attributes for chunk IDs, model names, token counts." },
        ],
      },
    ],
  },
  "resume-forge": {
    date: "December 2023",
    logs: [
      {
        title: "0. Problem Space",
        content: [
          { type: "text", value: "Job seekers struggle to tailor resumes for each application. ATS systems filter by keyword matching, but most candidates don't know which keywords matter." },
        ],
      },
      {
        title: "1. LLM-Powered Tailoring",
        content: [
          { type: "text", value: "Two-pass approach: first pass extracts required skills/keywords from JD using structured output. Second pass rewrites resume sections to naturally incorporate keywords while preserving truthfulness." },
        ],
      },
      {
        title: "2. ATS Scoring",
        content: [
          { type: "text", value: "Simulated ATS parsing by extracting text from rendered PDF, running keyword overlap analysis, and scoring format compatibility. Provides actionable feedback: 'Add Python to skills', 'Remove columns layout'." },
        ],
      },
    ],
  },
  truthlens: {
    date: "November 2023",
    logs: [
      {
        title: "0. Browser Extension Architecture",
        content: [
          { type: "text", value: "Manifest V3 Service Worker background script handles fact-check requests. Content script extracts selected text, sends to background, which calls FastAPI backend with vector search over fact-check databases." },
        ],
      },
      {
        title: "1. Credibility Scoring",
        content: [
          { type: "text", value: "Multi-source verification: Snopes, PolitiFact, FactCheck.org, Wikipedia, and custom claim database. Weighted consensus algorithm produces 0-100 credibility score with source citations." },
        ],
      },
    ],
  },
};

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