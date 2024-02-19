import React from "react";
import { notFound } from "next/navigation";

import CategoryForm from "@/components/Dashboard/forms/CategoryForm/CategoryForm";
import { createSupabaseServerClient } from "@/lib/supabase";

export const revalidate = 0;

async function page({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient();

  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("*")
    .eq("id", params.id);

  if (!categories || categories.length === 0) notFound();
  if (categoriesError) throw "something went wrong";

  return <CategoryForm initialData={categories[0]} isUpdate />;
}

export default page;
