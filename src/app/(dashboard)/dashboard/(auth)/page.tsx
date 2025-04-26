import React from "react";

import { Users2Icon } from "lucide-react";

import DashboardStatus from "@/components/Dashboard/DashboardStatus";
import { Badge } from "@/components/ui/badge";

import { getProjectsUseCase } from "@/use-cases/project";
import { getCategoriesUseCase } from "@/use-cases/category";
import { DataTable } from "@/components/Dashboard/tables/data-table";
import { columns as projectColumns } from "@/components/Dashboard/tables/project-columns";
import { columns as categoryColumns } from "@/components/Dashboard/tables/category-columns";

export const revalidate = 0;

const limit = 3;
async function page() {
  const projectsPromise = getProjectsUseCase({
    limit: limit,
  });
  const categoriesPromise = getCategoriesUseCase({
    limit: limit,
    showEmpty: true,
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
      </div>
      <div className="mt-4 flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Badge className="w-fit font-semibold text-sm">last Projects</Badge>
          <DataTable
            columns={projectColumns}
            data={projects.data}
            withPagination={false}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Badge className="w-fit font-semibold text-sm">last Categories</Badge>
          <DataTable
            columns={categoryColumns}
            data={categories.data}
            withPagination={false}
          />
        </div>
      </div>
    </div>
  );
}

export default page;
