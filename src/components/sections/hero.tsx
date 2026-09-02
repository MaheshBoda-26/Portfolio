"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, GitBranch, Mail, Code, Brain, Server, Zap } from "lucide-react";
import { LinkedInIcon, TwitterIcon } from "@/components/common/social-icons";
import { personalInfo, socialLinks } from "@/lib/data";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-100/50 via-transparent to-transparent dark:from-neutral-900/50 dark:via-transparent" />
      <div className="absolute inset-0 bg-grid-pattern neutral-200/50 dark:neutral-800/50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100/80 dark:bg-neutral-900/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 mb-8 animate-fade-in-up">
            <Zap className="h-4 w-4 text-amber-500" aria-hidden="true" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Open to opportunities & freelance projects
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Hi, I&apos;m <span className="text-primary">Mahesh Boda</span>
          </h1>

          <p className="text-xl sm:text-2xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            {personalInfo.tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <Button size="lg" className="group w-full sm:w-auto" onClick={() => window.location.href = "#projects"}>
              View My Work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={() => window.location.href = "#contact"}>
              Get In Touch
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 dark:text-neutral-400 hover:text-primary transition-colors"
                aria-label={link.name}
              >
                {link.name === "GitHub" && <GitBranch className="h-6 w-6" />}
                {link.name === "LinkedIn" && <LinkedInIcon className="h-6 w-6" />}
                {link.name === "Twitter" && <TwitterIcon className="h-6 w-6" />}
                {link.name === "Email" && <Mail className="h-6 w-6" />}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
          <div className="text-center p-6 rounded-xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 hover:border-primary/50 transition-colors">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary mb-4">
              <Code className="h-7 w-7" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Full Stack Development</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              Building scalable web applications with modern frameworks and best practices
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 hover:border-primary/50 transition-colors">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary mb-4">
              <Brain className="h-7 w-7" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">AI & Machine Learning</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              Developing intelligent systems with LLMs, RAG pipelines, and ML models
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 hover:border-primary/50 transition-colors">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary mb-4">
              <Server className="h-7 w-7" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Cloud & DevOps</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              Deploying and managing infrastructure on AWS, Vercel, and Kubernetes
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}