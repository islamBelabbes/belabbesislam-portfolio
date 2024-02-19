import React from "react";

import { Users2Icon } from "lucide-react";

import DashboardStatus from "@/components/Dashboard/Dashboard";
import { Badge } from "@/components/ui/badge";
import { createSupabaseServerClient } from "@/lib/supabase";
import { columns } from "@/components/Dashboard/tables/categoriesTable/columns";
import { columns as projectsColumns } from "@/components/Dashboard/tables/projectsTable/columns";
import { ProjectsTable } from "@/components/Dashboard/tables/projectsTable/data-table";
import { CategoriesTable } from "@/components/Dashboard/tables/categoriesTable/data-table";

export const revalidate = 0;

async function page() {
  const supabase = createSupabaseServerClient();
  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("*");
  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("*");

  return (
    <div>
      <div className="flex gap-2 px-5">
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
          <ProjectsTable columns={projectsColumns} data={projects || []} />
        </div>
        <div className="flex flex-col gap-2">
          <Badge className="w-fit font-semibold text-sm">last Categories</Badge>
          <CategoriesTable columns={columns} data={categories || []} />
        </div>
      </div>
    </div>
  );
}

export default page;
