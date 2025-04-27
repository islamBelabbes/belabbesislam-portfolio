import React from "react";

import { Users2Icon } from "lucide-react";

import DashboardStatus from "@/components/Dashboard/DashboardStatus";
import { Badge } from "@/components/ui/badge";

import { getProjectsUseCase } from "@/use-cases/project";
import { getCategoriesUseCase } from "@/use-cases/category";
import { DataTable } from "@/components/Dashboard/tables/data-table";
import { columns as projectColumns } from "@/components/Dashboard/tables/project-columns";
import { columns as categoryColumns } from "@/components/Dashboard/tables/category-columns";
import Link from "next/link";

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
        <RenderTable title="last Projects" viewAllLink="/dashboard/project/all">
          <DataTable
            columns={projectColumns}
            data={projects.data}
            withPagination={false}
          />
        </RenderTable>

        <RenderTable
          title="last Categories"
          viewAllLink="/dashboard/category/all"
        >
          <DataTable
            columns={categoryColumns}
            data={categories.data}
            withPagination={false}
          />
        </RenderTable>
      </div>
    </div>
  );
}

const RenderTable = ({
  viewAllLink,
  title,
  children,
}: {
  viewAllLink: string;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center text-sm px-3">
        <Badge className="w-fit font-semibold text-sm">{title}</Badge>
        <Link href={viewAllLink}>View All</Link>
      </div>
      {children}
    </div>
  );
};

export default page;
