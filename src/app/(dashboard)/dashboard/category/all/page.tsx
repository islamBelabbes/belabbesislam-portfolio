import React from "react";

import { CategoriesTable } from "@/components/Dashboard/tables/categoriesTable/data-table";
import { categoriesTableDataLimit } from "@/constants/constants";
import { fetchCategoriesTableData } from "@/lib/api";
import { tryCatch } from "@/lib/utils";

export const revalidate = 0;

async function page() {
  const { data, error } = await tryCatch(
    fetchCategoriesTableData({
      index: 0,
      limit: categoriesTableDataLimit,
    })
  );

  if (error || !data) throw new Error("something went wrong");

  return <CategoriesTable initialData={data} withPaginate />;
}

export default page;
