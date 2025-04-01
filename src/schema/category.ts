import { categoriesTable } from "@/lib/db/schema";

import { z } from "zod";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";

const CreateCategorySchema = createInsertSchema(categoriesTable, {
  name: z.string(),
  image: z.string(),
}).omit({
  id: true,
  createdAt: true,
});
const updateCategorySchema = createUpdateSchema(categoriesTable, {
  id: z.number(),
}).omit({
  createdAt: true,
});

export type CreateCategory = z.infer<typeof CreateCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;
