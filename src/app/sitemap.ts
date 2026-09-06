import { MetadataRoute } from "next";
import { projects } from "@/lib/data";

const BASE_URL = "https://maheshboda.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  ];

  const projectRoutes = projects.map((project) => ({
    url: `${BASE_URL}/project/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: project.featured ? 0.8 : 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}