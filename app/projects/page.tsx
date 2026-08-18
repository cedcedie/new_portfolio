import type { Metadata } from "next";
import ProjectsIndex from "@/components/projects/ProjectsIndex";
import { allProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work — Cydric James Bulan",
  description: `Academic, freelance, and game work — ${allProjects.length} projects, 2023—2026.`,
};

export default function ProjectsPage() {
  return <ProjectsIndex />;
}
