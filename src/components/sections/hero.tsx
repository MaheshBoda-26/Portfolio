"use client";

import { ExternalLink, Mail } from "lucide-react";
import { GithubIcon, LinkedInIcon, TwitterIcon } from "@/components/common/social-icons";
import { personalInfo, socialLinks } from "@/lib/data";
import { TypeAnimation } from "react-type-animation";
import { AsciiPortrait } from "@/components/common/ascii-portrait";

export function Hero() {
  const firstName = personalInfo.name.split(" ")[0].toLowerCase();

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-16 px-4 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-4">
        {/* Left side - Text content */}
        <div className="text-center lg:text-left max-w-2xl flex-1">
          <p className="text-primary font-mono text-sm mb-6 animate-fade-in-up">
            <TypeAnimation
              sequence={[
                "/ hi, ",
                100,
                firstName,
                100,
                " here.",
              ]}
              wrapper="span"
              className="inline"
              repeat={0}
            />
            <span className="animate-cursor-blink text-primary ml-1" aria-hidden="true">|</span>
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 animate-fade-in-up" style={{ animationDelay: "800ms" }}>
            {personalInfo.name}
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-2xl lg:mx-0 animate-fade-in-up" style={{ animationDelay: "1000ms" }}>
            {personalInfo.tagline}
          </p>

          {/* CTA Buttons - simplified */}
          <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 animate-fade-in-up" style={{ animationDelay: "1200ms" }}>
            <a href="#projects" className="text-primary hover:underline font-medium flex items-center gap-2">
              / software
              <ExternalLink className="h-4 w-4" />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="text-muted-foreground hover:text-primary transition-colors font-medium flex items-center gap-2">
              / contact
              <Mail className="h-4 w-4" />
            </a>
          </div>

          {/* Social links - minimal */}
          <div className="flex items-center justify-center lg:justify-start gap-8 mt-12 animate-fade-in-up" style={{ animationDelay: "1400ms" }}>
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

        {/* Right side - ASCII Portrait */}
        <div className="flex items-center justify-center lg:justify-end w-full lg:w-auto animate-fade-in-up" style={{ animationDelay: "600ms" }}>
          <AsciiPortrait text="MAHESH\nBODA" size={320} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}