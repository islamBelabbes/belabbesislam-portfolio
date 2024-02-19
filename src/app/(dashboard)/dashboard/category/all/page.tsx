import { columns } from "@/components/Dashboard/tables/categoriesTable/columns";
import { CategoriesTable } from "@/components/Dashboard/tables/categoriesTable/data-table";
import { createSupabaseServerClient } from "@/lib/supabase";
import { categories } from "@/seed";
import React from "react";

async function page() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from("categories").select("*");

  return <CategoriesTable columns={columns} data={data || []} />;
}

export default page;
