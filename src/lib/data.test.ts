import { describe, it, expect } from "vitest";
import { projects, skills, personalInfo, socialLinks, projectLogs } from "@/lib/data";

describe("Data Layer", () => {
  describe("projects", () => {
    it("should have at least one project", () => {
      expect(projects.length).toBeGreaterThan(0);
    });

    it("should have required fields for each project", () => {
      projects.forEach((project) => {
        expect(project).toHaveProperty("id");
        expect(project).toHaveProperty("title");
        expect(project).toHaveProperty("description");
        expect(project).toHaveProperty("shortDescription");
        expect(project).toHaveProperty("techStack");
        expect(project).toHaveProperty("featured");
        expect(project).toHaveProperty("category");
        expect(Array.isArray(project.techStack)).toBe(true);
        expect(typeof project.featured).toBe("boolean");
      });
    });

    it("should have valid category values", () => {
      const validCategories = ["web", "mobile", "ai", "fullstack", "other"];
      projects.forEach((project) => {
        expect(validCategories).toContain(project.category);
      });
    });

    it("should have featured projects", () => {
      const featured = projects.filter((p) => p.featured);
      expect(featured.length).toBeGreaterThan(0);
    });
  });

  describe("skills", () => {
    it("should have skills in all categories", () => {
      const categories = skills.map((s) => s.category);
      expect(categories).toContain("frontend");
      expect(categories).toContain("backend");
      expect(categories).toContain("devops");
      expect(categories).toContain("tools");
      expect(categories).toContain("languages");
    });

    it("should have name and category for each skill", () => {
      skills.forEach((skill) => {
        expect(skill).toHaveProperty("name");
        expect(skill).toHaveProperty("category");
        expect(typeof skill.name).toBe("string");
        expect(skill.name.length).toBeGreaterThan(0);
      });
    });
  });

  describe("personalInfo", () => {
    it("should have required fields", () => {
      expect(personalInfo).toHaveProperty("name");
      expect(personalInfo).toHaveProperty("title");
      expect(personalInfo).toHaveProperty("tagline");
      expect(personalInfo).toHaveProperty("bio");
      expect(personalInfo).toHaveProperty("email");
      expect(personalInfo).toHaveProperty("location");
      expect(personalInfo).toHaveProperty("resumeUrl");
    });

    it("should have valid email format", () => {
      expect(personalInfo.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });
  });

  describe("socialLinks", () => {
    it("should have at least GitHub, LinkedIn, Twitter, Email", () => {
      const names = socialLinks.map((s) => s.name);
      expect(names).toContain("GitHub");
      expect(names).toContain("LinkedIn");
      expect(names).toContain("Twitter");
      expect(names).toContain("Email");
    });

    it("should have valid URLs", () => {
      socialLinks.forEach((link) => {
        expect(link).toHaveProperty("name");
        expect(link).toHaveProperty("url");
        expect(typeof link.url).toBe("string");
        expect(link.url.length).toBeGreaterThan(0);
      });
    });
  });

  describe("projectLogs", () => {
    it("should have logs for each featured project", () => {
      const featuredProjects = projects.filter((p) => p.featured);
      featuredProjects.forEach((project) => {
        expect(projectLogs).toHaveProperty(project.id);
      });
    });

    it("should have proper log structure", () => {
      Object.values(projectLogs).forEach((logData) => {
        expect(logData).toHaveProperty("date");
        expect(logData).toHaveProperty("logs");
        expect(Array.isArray(logData.logs)).toBe(true);

        logData.logs.forEach((log) => {
          expect(log).toHaveProperty("title");
          expect(log).toHaveProperty("content");
          expect(Array.isArray(log.content)).toBe(true);

          log.content.forEach((entry) => {
            expect(entry).toHaveProperty("type");
            expect(["text", "image", "list", "tip"]).toContain(entry.type);
          });
        });
      });
    });
  });
});