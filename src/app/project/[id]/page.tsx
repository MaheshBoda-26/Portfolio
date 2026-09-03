import { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, Project, projectLogs, ProjectLogsData } from "@/lib/data";
import ProjectDetailClient from "./ProjectDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  const logs = projectLogs[id] || null;

  if (!project) notFound();

  return <ProjectDetailClient project={project} logs={logs} />;
}