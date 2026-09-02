"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { navItems } from "@/lib/data";
import { useMobile } from "@/hooks/use-mobile";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 dark:bg-neutral-950/95 backdrop-blur-sm shadow-sm border-b border-neutral-200 dark:border-neutral-800"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="#hero" className="text-xl font-bold text-neutral-900 dark:text-white">
              MB
            </Link>
          </div>

          <div className={cn("hidden md:flex items-center space-x-8", isMobile && "absolute")}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Link href="#contact" className="flex items-center gap-1">
                Contact
                <ChevronDown className="h-3 w-3" />
              </Link>
            </Button>
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isMobile && isMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200 dark:border-neutral-800 animate-slide-down">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-base font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button variant="outline" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                <Link href="#contact" className="flex items-center gap-1 w-full">
                  Contact
                  <ChevronDown className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}