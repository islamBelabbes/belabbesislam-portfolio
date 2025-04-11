import React from "react";

import { getProjectsUseCase } from "@/use-cases/project";
import { DataTable } from "@/components/Dashboard/tables/data-table";
import { columns } from "@/components/Dashboard/tables/project-columns";
import { PageSchema } from "@/lib/schema";

export const revalidate = 0;

const LIMIT = 10;
async function page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const _page = (await searchParams).page;
  const page = PageSchema.parse(_page);
  const projects = await getProjectsUseCase({ limit: LIMIT, page });

  return (
    <DataTable
      data={projects.data}
      columns={columns}
      withPagination
      total={projects.total}
      limit={LIMIT}
    />
  );
}

export default page;
