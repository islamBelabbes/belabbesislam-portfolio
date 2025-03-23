import { categoriesTable, CategoryTable } from "@/lib/db/schema";

import generateZodSchema from "@/lib/generate-zod-schema";
import { z } from "zod";

const { insert, select, update } = new generateZodSchema<CategoryTable>(
  categoriesTable
);

const CategorySchema = select.required();
const CreateCategorySchema = insert.omit({
  id: true,
  createdAt: true,
});
const updateCategorySchema = update.omit({
  id: true,
  createdAt: true,
});

export type CreateCategory = z.infer<typeof CreateCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;
export type category = z.infer<typeof CategorySchema>;
