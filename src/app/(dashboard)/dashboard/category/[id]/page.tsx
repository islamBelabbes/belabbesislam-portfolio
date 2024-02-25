import React from "react";
import { notFound } from "next/navigation";

import CategoryForm from "@/components/Dashboard/forms/CategoryForm/CategoryForm";
import { createSupabaseClient } from "@/lib/supabase";

export const revalidate = 0;

async function page({ params }: { params: { id: string } }) {
  const supabase = createSupabaseClient();

  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("*")
    .eq("id", params.id)
    .single();

  if (categoryError) notFound();

  const mappedCategory = {
    ...category,
    image: `${process.env.NEXT_PUBLIC_SUPABASE_MEDIA_URL}/categories/${category.image}`,
  };

  return <CategoryForm initialData={mappedCategory} isUpdate />;
}

export default page;
