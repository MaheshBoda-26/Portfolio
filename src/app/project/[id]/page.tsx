import { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, Project, projectLogs, ProjectLogsData } from "@/lib/data";
import ProjectDetailClient from "./ProjectDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

const BASE_URL = "https://maheshboda.dev";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      url: `${BASE_URL}/project/${project.id}`,
      type: "website",
      siteName: "Mahesh Boda Portfolio",
      ...(project.image && { images: [{ url: `${BASE_URL}${project.image}` }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.shortDescription,
      ...(project.image && { images: [`${BASE_URL}${project.image}`] }),
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  const logs = projectLogs[id] || null;

  if (!project) notFound();

  return <ProjectDetailClient project={project} logs={logs} />;
}