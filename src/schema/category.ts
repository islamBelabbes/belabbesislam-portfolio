import { categoriesTable } from "@/lib/db/schema";

import { z } from "zod";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { ImageSchema, PaginationSchema, idSchema } from "@/lib/schema";

export const createCategorySchema = createInsertSchema(categoriesTable, {
  name: z.string().min(1),
  image: ImageSchema,
}).omit({
  id: true,
  createdAt: true,
});
export const updateCategorySchema = createUpdateSchema(categoriesTable, {
  name: z.string().min(1).optional(),
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
  name: z.string().min(1).optional(),
});

export type CreateCategory = z.infer<typeof createCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;
export type GetCategories = z.infer<typeof getCategoriesSchema>;
