import { columns } from "@/components/Dashboard/tables/projectsTable/columns";
import { ProjectsTable } from "@/components/Dashboard/tables/projectsTable/data-table";
import { createSupabaseServerClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs";
import React from "react";

async function page() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from("projects").select("*");

  return <ProjectsTable columns={columns} data={data || []} />;
}

export default page;
