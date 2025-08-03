import projectData from "@/constant/projectData";
import ProjectPageClient from "@/app/project/ProjectClient";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const projectId = parseInt(id);
  const project = projectData[projectId];

  if (!project) {
    return <div className="text-center p-20">Project not found</div>;
  }

  return <ProjectPageClient project={project} />;
}
