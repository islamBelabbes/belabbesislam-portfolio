import { categoriesTable } from "@/lib/db/schema";

import { z } from "zod";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { ImageSchema, idSchema } from "@/lib/schema";

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

export type CreateCategory = z.infer<typeof CreateCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;
