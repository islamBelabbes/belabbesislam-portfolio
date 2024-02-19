import React from "react";
import { notFound } from "next/navigation";

import CategoryForm from "@/components/Dashboard/forms/CategoryForm";
import { createSupabaseServerClient } from "@/lib/supabase";

async function page({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient();

  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("*")
    .eq("id", params.id);

  if (!categories || categories.length === 0) notFound();
  if (categoriesError) throw "something went wrong";

  return <CategoryForm initialData={categories[0]} />;
}

export default page;
