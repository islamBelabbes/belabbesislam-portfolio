import ProjectForm from "@/components/Dashboard/forms/projectForm/ProjectForm";
import { createSupabaseClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import React from "react";
export const revalidate = 0;

async function page({ params }: { params: { id: string } }) {
  const supabase = createSupabaseClient();

  const { data: project, error: projectsError } = await supabase
    .from("projects")
    .select(
      `
    *,
    categories (
      *
    )
  `
    )
    .eq("id", params.id)
    .single();

  if (projectsError) throw "something went wrong";

  const mappedProject = {
    ...project,
    image: `${process.env.NEXT_PUBLIC_SUPABASE_MEDIA_URL}/projects/${project.image}`,
  };
  return <ProjectForm initialData={mappedProject} isUpdate />;
}

export default page;
