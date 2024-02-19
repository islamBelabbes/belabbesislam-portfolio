import ProjectForm from "@/components/Dashboard/forms/projectForm/ProjectForm";
import { createSupabaseServerClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import React from "react";
export const revalidate = 0;

async function page({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient();

  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.id);

  if (projectsError || !projects) throw "something went wrong";
  if (projects.length === 0) notFound();

  return <ProjectForm initialData={projects[0]} isUpdate />;
}

export default page;
