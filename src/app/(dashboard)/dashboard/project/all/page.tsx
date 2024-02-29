import { columns } from "@/components/Dashboard/tables/projectsTable/columns";
import { ProjectsTable } from "@/components/Dashboard/tables/projectsTable/data-table";
import { fetchProjectsTableData } from "@/lib/api";
import { createSupabaseClient } from "@/lib/supabase";
import { tryCatch } from "@/lib/utils";
import React from "react";

export const revalidate = 0;

async function page() {
  const { data, error } = await tryCatch(
    fetchProjectsTableData({ index: 0, limit: 3 })
  );

  if (error || !data) throw new Error("something went wrong");

  return <ProjectsTable initialData={data} />;
}

export default page;
