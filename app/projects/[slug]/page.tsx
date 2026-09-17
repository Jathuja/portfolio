import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import { siteConfig } from "@/lib/config";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project case study could not be located.",
    };
  }

  const description = project.tagline || project.description || "";
  const ogImageUrl = `/og?title=${encodeURIComponent(project.title)}&description=${encodeURIComponent(description)}&type=project`;


  return {
    title: `${project.title} — Case Study`,
    description,
    openGraph: {
      title: `${project.title} — Case Study | ${siteConfig.name}`,
      description,
      type: "article",
      url: `${siteConfig.url}/projects/${project.slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} case study`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study | ${siteConfig.name}`,
      description,
      images: [ogImageUrl],
    },
  };
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const projectIndex = projects.findIndex((p) => p.slug === params.slug);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : undefined;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : undefined;

  return (
    <main className="w-full px-8 sm:px-12 lg:px-16 xl:px-20 py-16 md:py-24">
      <ProjectCaseStudy
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </main>
  );
}
