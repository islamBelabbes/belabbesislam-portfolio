import React from "react";

import CategoryForm from "@/components/Dashboard/forms/CategoryForm/CategoryForm";
import { getCategoryByIdUseCase } from "@/use-cases/category";

export const revalidate = 0;

async function page({ params }: { params: { id: string } }) {
  const category = await getCategoryByIdUseCase(+params.id);
  return <CategoryForm initial={category} />;
}

export default page;
