import Link from "next/link";
import { Mail, Heart, Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="#hero" className="text-xl font-bold text-foreground">
              Mahesh Boda
           </Link>
            <p className="mt-4 text-muted-foreground max-w-xs">
              Building intelligent, scalable applications with modern tech.
              Passionate about AI, full-stack development, and clean code.
           </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="mailto:maheshboda@example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
             </a>
              <a
                href="https://github.com/MaheshBoda-26"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
             </a>
              <a
                href="https://linkedin.com/in/maheshboda"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
             </a>
              <a
                href="https://twitter.com/maheshboda"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
             </a>
           </div>
         </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Navigation
           </h3>
            <ul className="mt-4 space-y-3" role="list">
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
               </Link>
             </li>
              <li>
                <Link href="#experience" className="text-muted-foreground hover:text-primary transition-colors">
                  Experience
               </Link>
             </li>
              <li>
                <Link href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
               </Link>
             </li>
              <li>
                <Link href="#hardware" className="text-muted-foreground hover:text-primary transition-colors">
                  Hardware
               </Link>
             </li>
              <li>
                <Link href="#art" className="text-muted-foreground hover:text-primary transition-colors">
                  Art
               </Link>
             </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
               </Link>
             </li>
           </ul>
         </div>

          {/* Projects */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Projects
           </h3>
            <ul className="mt-4 space-y-3" role="list">
              <li>
                <Link href="https://github.com/MaheshBoda-26/ResolveX" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  ResolveX
               </Link>
             </li>
              <li>
                <Link href="https://github.com/MaheshBoda-26/RAG-Pipeline" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  RAG Pipeline
               </Link>
             </li>
              <li>
                <Link href="https://github.com/MaheshBoda-26/ResumeForge" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  ResumeForge
               </Link>
             </li>
           </ul>
         </div>
       </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Mahesh Boda. All rights reserved.
           </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Built with
              <Heart className="h-3.5 w-3.5 text-red-500" aria-hidden="true" />
              Next.js, Tailwind, and Shadcn/ui
           </p>
         </div>
       </div>
     </div>
   </footer>
  );
}