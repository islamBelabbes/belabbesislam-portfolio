import React from "react";

import { Users2Icon } from "lucide-react";

import DashboardStatus from "@/components/Dashboard/DashboardStatus";
import { Badge } from "@/components/ui/badge";
import { ProjectsTable } from "@/components/Dashboard/tables/projectsTable/data-table";
import { CategoriesTable } from "@/components/Dashboard/tables/categoriesTable/data-table";
import { fetchCategoriesTableData, fetchProjectsTableData } from "@/lib/api";

export const revalidate = 0;

const limit = 3;
async function page() {
  const projectsPromise = fetchProjectsTableData({
    index: 0,
    limit: limit,
  });
  const categoriesPromise = fetchCategoriesTableData({
    index: 0,
    limit: limit,
  });

  const [projects, categories] = await Promise.all([
    projectsPromise,
    categoriesPromise,
  ]);

  return (
    <div>
      <div className="flex gap-2 px-5">
        <DashboardStatus
          Icon={<Users2Icon color="#EC3263" />}
          iconBackground="bg-[#FFF5F7]"
          status={projects?.total || 0}
          title="Total Projects"
        />
        <DashboardStatus
          Icon={<Users2Icon color="#EC3263" />}
          iconBackground="bg-[#FFF5F7]"
          status={categories?.total || 0}
          title="Total Categories"
        />
        <DashboardStatus
          Icon={<Users2Icon color="#EC3263" />}
          iconBackground="bg-[#FFF5F7]"
          status={200}
          title="Total Users"
        />
        <DashboardStatus
          Icon={<Users2Icon color="#EC3263" />}
          iconBackground="bg-[#FFF5F7]"
          status={200}
          title="Total Users"
        />
      </div>
      <div className="mt-4 flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Badge className="w-fit font-semibold text-sm">last Projects</Badge>
          <ProjectsTable
            initialData={projects}
            limit={limit}
            queryKey="main_projects"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Badge className="w-fit font-semibold text-sm">last Categories</Badge>
          <CategoriesTable
            initialData={categories}
            limit={limit}
            queryKey="main_categories"
          />
        </div>
      </div>
    </div>
  );
}

export default page;
