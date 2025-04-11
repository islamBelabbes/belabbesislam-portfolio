import React from "react";

import { DataTable } from "@/components/Dashboard/tables/data-table";
import { PageSchema } from "@/lib/schema";
import { getCategoriesUseCase } from "@/use-cases/category";
import { columns } from "@/components/Dashboard/tables/category-columns";

export const revalidate = 0;

const LIMIT = 10;
async function page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const _page = (await searchParams).page;
  const page = PageSchema.parse(_page);
  const categories = await getCategoriesUseCase({ limit: LIMIT, page });

  return (
    <DataTable
      data={categories.data}
      columns={columns}
      withPagination
      total={categories.total}
      limit={LIMIT}
    />
  );
}

export default page;
