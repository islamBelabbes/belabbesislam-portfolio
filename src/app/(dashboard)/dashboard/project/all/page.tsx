import { columns } from "@/components/Dashboard/tables/projectsTable/columns";
import { ProjectsTable } from "@/components/Dashboard/tables/projectsTable/data-table";
import { createSupabaseServerClient } from "@/lib/supabase";
import React from "react";

export const revalidate = 0;

async function page() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from("projects").select("*");

  const mapped = data?.map((project) => ({ ...project, categories: [] }));

  return <ProjectsTable columns={columns} data={mapped || []} />;
}

export default page;
