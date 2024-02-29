import React from "react";

import { ProjectsTable } from "@/components/Dashboard/tables/projectsTable/data-table";
import { projectsTableDataLimit } from "@/constants/constants";
import { fetchProjectsTableData } from "@/lib/api";
import { tryCatch } from "@/lib/utils";

export const revalidate = 0;

async function page() {
  const { data, error } = await tryCatch(
    fetchProjectsTableData({ index: 0, limit: projectsTableDataLimit })
  );

  if (error || !data) throw new Error("something went wrong");

  return <ProjectsTable initialData={data} withPaginate />;
}

export default page;
