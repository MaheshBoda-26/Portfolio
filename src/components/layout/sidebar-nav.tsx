"use client";

import { useEffect, useRef, useState } from "react";
import { navItems } from "@/lib/data";
import "./SidebarNav.css";

const SidebarNav = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 800);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    observerRef.current = observer;

    navItems.forEach((item) => {
      const element = document.getElementById(item.href.replace("#", ""));
      if (element) observer.observe(element);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isMobile]);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isMobile) return null;

  return (
    <nav
      className="sidebar-nav"
      role="navigation"
      aria-label="Section navigation"
    >
      <ul className="sidebar-nav-list">
        {navItems.map((item, index) => {
          const isActive = activeSection === item.href.replace("#", "");
          return (
            <li key={item.label} className="sidebar-nav-item">
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`sidebar-nav-link ${isActive ? "active" : ""}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                aria-current={isActive ? "location" : undefined}
              >
                <span className="sidebar-slash">/</span>
                <span className="sidebar-label">{item.label.toLowerCase()}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SidebarNav;