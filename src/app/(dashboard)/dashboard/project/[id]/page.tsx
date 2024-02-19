import ProjectForm from "@/components/Dashboard/forms/ProjectForm";
import { createSupabaseServerClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import React from "react";

async function page({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient();

  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.id);

  if (projectsError || !projects) throw "something went wrong";
  if (projects.length === 0) notFound();

  return <ProjectForm {...projects[0]} />;
}

export default page;
