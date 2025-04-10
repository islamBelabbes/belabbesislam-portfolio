import { categoriesTable } from "@/lib/db/schema";

import { z } from "zod";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { ImageSchema, PaginationSchema, idSchema } from "@/lib/schema";

export const CreateCategorySchema = createInsertSchema(categoriesTable, {
  name: z.string(),
  image: ImageSchema,
}).omit({
  id: true,
  createdAt: true,
});
export const updateCategorySchema = createUpdateSchema(categoriesTable, {
  id: idSchema,
  image: ImageSchema.optional(),
}).omit({
  createdAt: true,
});

export const getCategoriesSchema = z.object({
  showEmpty: z
    .union([z.literal("true"), z.literal("false")])
    .transform((val) => val === "true")
    .optional(),
});

export type CreateCategory = z.infer<typeof CreateCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;
export type GetCategories = z.infer<typeof getCategoriesSchema>;
