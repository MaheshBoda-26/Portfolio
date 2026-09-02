"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Code, Brain, Server, Zap } from "lucide-react";
import { GithubIcon, LinkedInIcon, TwitterIcon } from "@/components/common/social-icons";
import { personalInfo } from "@/lib/data";

export function Hero() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const mousePosRef = useRef({ x: 200, y: 200 });
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    life: number;
  }>>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const rectRef = useRef<DOMRect | null>(null);

  // Initialize particles
  useEffect(() => {
    particlesRef.current = Array.from({ length: 50 }, () => ({
      x: Math.random() * 400,
      y: Math.random() * 400,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      color: `hsl(174, 100%, ${Math.random() * 30 + 50}%)`,
      life: 1,
    }));
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;

    // Set canvas size for high DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    rectRef.current = rect;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const animate = () => {
      const ctx = ctxRef.current;
      const rect = rectRef.current;
      if (!ctx || !rect) return;

      ctx.clearRect(0, 0, rect.width, rect.height);

      // Update and draw particles
      const updated = particlesRef.current.map((p) => {
        // Attraction to mouse
        const dx = mousePosRef.current.x - p.x;
        const dy = mousePosRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.min(0.02 / (dist + 1), 0.1);

        return {
          ...p,
          vx: p.vx + dx * force * 0.01 + (Math.random() - 0.5) * 0.01,
          vy: p.vy + dy * force * 0.01 + (Math.random() - 0.5) * 0.01,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vx: p.vx * 0.99,
          vy: p.vy * 0.99,
        };
      });

      particlesRef.current = updated;

      // Draw particles and connections
      updated.forEach((p, i) => {
        // Draw connections to nearby particles
        updated.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(174, 100%, 60%, ${(1 - dist / 80) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Draw mouse attraction point
      ctx.beginPath();
      ctx.arc(mousePosRef.current.x, mousePosRef.current.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = "hsla(174, 100%, 69%, 0.2)";
      ctx.fill();

      const id = requestAnimationFrame(animate);
      animationIdRef.current = id;
    };

    animate();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    mousePosRef.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  };

  const handleMouseLeave = () => {
    mousePosRef.current = { x: 200, y: 200 };
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid-pattern primary/5" />

      {/* Interactive Canvas Simulation */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10">
        <canvas
          ref={canvasRef}
          className="canvas-container simulation-container"
          width={400}
          height={400}
          style={{ width: "400px", height: "400px" }}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseLeave={handleMouseLeave}
          aria-label="Interactive particle simulation"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border mb-8 animate-fade-in-up">
            <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-muted-foreground">
              Open to opportunities & freelance projects
            </span>
          </div>

          {/* Typing Animation Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            hi, <span className="relative">
              <span className="text-primary">Mahesh Boda</span>
              <span className="animate-cursor-blink text-primary ml-1" aria-hidden="true">|</span>
            </span> here.
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            {personalInfo.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <Button size="lg" className="group w-full sm:w-auto animate-pulse-glow" onClick={() => router.push("#projects")}>
              View My Work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={() => router.push("#contact")}>
              Get In Touch
              <Mail className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-8 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <a
              href="mailto:maheshboda@example.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/MaheshBoda-26"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/maheshboda"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com/maheshboda"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <TwitterIcon className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Skill Cards */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
          <div className="text-center p-6 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors group">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
              <Code className="h-7 w-7" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Full Stack Development</h3>
            <p className="text-muted-foreground text-sm">
              Building scalable web applications with modern frameworks and best practices
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors group">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
              <Brain className="h-7 w-7" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">AI & Machine Learning</h3>
            <p className="text-muted-foreground text-sm">
              Developing intelligent systems with LLMs, RAG pipelines, and ML models
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors group">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
              <Server className="h-7 w-7" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Cloud & DevOps</h3>
            <p className="text-muted-foreground text-sm">
              Deploying and managing infrastructure on AWS, Vercel, and Kubernetes
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}