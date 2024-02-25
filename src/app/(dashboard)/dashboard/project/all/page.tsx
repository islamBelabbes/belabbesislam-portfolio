import { columns } from "@/components/Dashboard/tables/projectsTable/columns";
import { ProjectsTable } from "@/components/Dashboard/tables/projectsTable/data-table";
import { createSupabaseClient } from "@/lib/supabase";
import React from "react";

export const revalidate = 0;

async function page() {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select(`* , categories (*)`);

  return <ProjectsTable columns={columns} data={data || []} />;
}

export default page;
