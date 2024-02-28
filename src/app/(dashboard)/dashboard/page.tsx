import React from "react";

import { Users2Icon } from "lucide-react";

import DashboardStatus from "@/components/Dashboard/DashboardStatus";
import { Badge } from "@/components/ui/badge";
import { createSupabaseClient } from "@/lib/supabase";
import { columns } from "@/components/Dashboard/tables/categoriesTable/columns";
import { columns as projectsColumns } from "@/components/Dashboard/tables/projectsTable/columns";
import { ProjectsTable } from "@/components/Dashboard/tables/projectsTable/data-table";
import { CategoriesTable } from "@/components/Dashboard/tables/categoriesTable/data-table";
import { fetchTableData } from "@/lib/api";

export const revalidate = 0;

async function page() {
  const supabase = createSupabaseClient();
  const projectsPromise = supabase
    .from("projects")
    .select(`* , categories (*)`)
    .limit(3);
  const categoriesPromise = fetchTableData({
    index: 0,
    limit: 3,
  });

  const totalProjectsPromise = supabase
    .from("projects")
    .select("*", { count: "exact", head: true });

  const totalCategoriesPromise = supabase
    .from("categories")
    .select("*", { count: "exact", head: true });

  const [projects, categories, totalProjects, totalCategories] =
    await Promise.all([
      projectsPromise,
      categoriesPromise,
      totalProjectsPromise,
      totalCategoriesPromise,
    ]);

  return (
    <div>
      <div className="flex gap-2 px-5">
        <DashboardStatus
          Icon={<Users2Icon color="#EC3263" />}
          iconBackground="bg-[#FFF5F7]"
          status={totalProjects?.count || 0}
          title="Total Projects"
        />
        <DashboardStatus
          Icon={<Users2Icon color="#EC3263" />}
          iconBackground="bg-[#FFF5F7]"
          status={totalCategories?.count || 0}
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
          <ProjectsTable columns={projectsColumns} data={projects.data || []} />
        </div>
        <div className="flex flex-col gap-2">
          <Badge className="w-fit font-semibold text-sm">last Categories</Badge>
          <CategoriesTable initialData={categories} />
        </div>
      </div>
    </div>
  );
}

export default page;
