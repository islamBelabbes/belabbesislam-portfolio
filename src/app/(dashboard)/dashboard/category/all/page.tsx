import { columns } from "@/components/Dashboard/tables/categoriesTable/columns";
import { CategoriesTable } from "@/components/Dashboard/tables/categoriesTable/data-table";
import { categories } from "@/seed";
import React from "react";

const page = () => {
  return <CategoriesTable columns={columns} data={categories} />;
};

export default page;
