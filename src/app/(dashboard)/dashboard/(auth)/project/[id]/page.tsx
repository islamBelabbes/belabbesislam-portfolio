import ProjectForm from "@/components/Dashboard/forms/projectForm/ProjectForm";
import { getProjectByIdUseCase } from "@/use-cases/project";
import React from "react";
export const revalidate = 0;

async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const projects = await getProjectByIdUseCase(+params.id);
  return <ProjectForm initial={projects} />;
}

export default page;
