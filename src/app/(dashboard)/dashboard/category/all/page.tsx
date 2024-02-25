import { columns } from "@/components/Dashboard/tables/categoriesTable/columns";
import { CategoriesTable } from "@/components/Dashboard/tables/categoriesTable/data-table";
import { createSupabaseClient } from "@/lib/supabase";
import React from "react";

export const revalidate = 0;

async function page() {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("categories").select("*");

  if (error) throw new Error("something went wrong");
  return <CategoriesTable columns={columns} data={data || []} />;
}

export default page;
