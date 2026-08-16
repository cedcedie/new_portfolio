import type { Metadata } from "next";
import ProjectsIndex from "@/components/projects/ProjectsIndex";

export const metadata: Metadata = {
  title: "Work — Cydric James Bulan",
  description:
    "Academic, freelance, and game work — 11 projects, 2023—2026.",
};

export default function ProjectsPage() {
  return <ProjectsIndex />;
}
