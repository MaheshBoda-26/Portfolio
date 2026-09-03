"use client";

import { ExternalLink, Mail } from "lucide-react";
import { GithubIcon, LinkedInIcon, TwitterIcon } from "@/components/common/social-icons";
import { personalInfo, socialLinks } from "@/lib/data";

export function Hero() {
  const firstName = personalInfo.name.split(" ")[0].toLowerCase();

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-16 px-4 overflow-hidden">
      {/* Terminal-style greeting */}
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-primary font-mono text-sm mb-6 animate-fade-in-up">
          / hi, {firstName} here.
          <span className="animate-cursor-blink text-primary ml-1" aria-hidden="true">|</span>
        </p>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          {personalInfo.name}
        </h1>

        <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          {personalInfo.tagline}
        </p>

        {/* CTA Buttons - simplified */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <a href="#projects" className="text-primary hover:underline font-medium flex items-center gap-2">
            / software
            <ExternalLink className="h-4 w-4" />
          </a>
          <a href="mailto:{personalInfo.email}" className="text-muted-foreground hover:text-primary transition-colors font-medium flex items-center gap-2">
            / contact
            <Mail className="h-4 w-4" />
          </a>
        </div>

        {/* Social links - minimal */}
        <div className="flex items-center justify-center gap-8 mt-12 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          {socialLinks.slice(0, 3).map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={link.name}
            >
              {link.name === "GitHub" && <GithubIcon className="h-6 w-6" />}
              {link.name === "LinkedIn" && <LinkedInIcon className="h-6 w-6" />}
              {link.name === "Twitter" && <TwitterIcon className="h-6 w-6" />}
              {link.name === "Email" && <Mail className="h-6 w-6" />}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 animate-bounce text-muted-foreground">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}