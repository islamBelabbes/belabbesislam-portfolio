import { categoriesTable } from "@/lib/db/schema";

import { z } from "zod";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { ImageSchema, PaginationSchema, idSchema } from "@/lib/schema";

const CreateCategorySchema = createInsertSchema(categoriesTable, {
  name: z.string(),
  image: ImageSchema,
}).omit({
  id: true,
  createdAt: true,
});
const updateCategorySchema = createUpdateSchema(categoriesTable, {
  id: idSchema,
  image: ImageSchema.optional(),
}).omit({
  createdAt: true,
});

export const getCategoriesSchema = z.object({
  showEmpty: z.boolean().optional(),
});

export type CreateCategory = z.infer<typeof CreateCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;
export type GetCategories = z.infer<typeof getCategoriesSchema>;
