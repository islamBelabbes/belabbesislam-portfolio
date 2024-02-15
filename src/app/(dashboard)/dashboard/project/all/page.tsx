import { columns } from "@/components/Dashboard/tables/projectsTable/categoriesTable/columns";
import { ProjectsTable } from "@/components/Dashboard/tables/projectsTable/categoriesTable/data-table";
import { projects } from "@/seed";
import React from "react";

function page() {
  return <ProjectsTable columns={columns} data={projects} />;
}

export default page;
