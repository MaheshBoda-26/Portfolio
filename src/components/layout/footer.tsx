import Link from "next/link";
import { cn } from "@/lib/utils";
import { GitBranch, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import { socialLinks } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="#hero" className="text-xl font-bold text-neutral-900 dark:text-white">
              MB
            </Link>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-xs">
              Building intelligent, scalable applications with modern tech.
              Passionate about AI, full-stack development, and clean code.
            </p>
            <div className="mt-6 flex space-x-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  aria-label={link.name}
                >
                  {link.name === "GitHub" && <GitBranch className="h-5 w-5" />}
                  {link.name === "LinkedIn" && <Linkedin className="h-5 w-5" />}
                  {link.name === "Twitter" && <Twitter className="h-5 w-5" />}
                  {link.name === "Email" && <Mail className="h-5 w-5" />}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3" role="list">
              <li>
                <Link href="#about" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">
              Projects
            </h3>
            <ul className="mt-4 space-y-3" role="list">
              <li>
                <Link href="https://github.com/MaheshBoda-26/ResolveX" target="_blank" rel="noopener noreferrer" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                  ResolveX
                </Link>
              </li>
              <li>
                <Link href="https://github.com/MaheshBoda-26/RAG-Pipeline" target="_blank" rel="noopener noreferrer" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                  RAG Pipeline
                </Link>
              </li>
              <li>
                <Link href="https://github.com/MaheshBoda-26/ResumeForge" target="_blank" rel="noopener noreferrer" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                  ResumeForge
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              © {currentYear} Mahesh Boda. All rights reserved.
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
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