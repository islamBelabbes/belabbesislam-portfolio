import { columns } from "@/components/Dashboard/tables/categoriesTable/columns";
import { CategoriesTable } from "@/components/Dashboard/tables/categoriesTable/data-table";
import { fetchCategoriesTableData } from "@/lib/api";
import { createSupabaseClient } from "@/lib/supabase";
import { tryCatch } from "@/lib/utils";
import React from "react";

export const revalidate = 0;

async function page() {
  const { data, error } = await tryCatch(
    fetchCategoriesTableData({
      index: 0,
      limit: 3,
    })
  );

  if (error || !data) throw new Error("something went wrong");

  return <CategoriesTable initialData={data} />;
}

export default page;
