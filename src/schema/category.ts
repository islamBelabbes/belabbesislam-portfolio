import { categoriesTable } from "@/lib/db/schema";

import { z } from "zod";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { idSchema } from "@/lib/schema";

const CreateCategorySchema = createInsertSchema(categoriesTable, {
  name: z.string(),
  image: z.string(),
}).omit({
  id: true,
  createdAt: true,
});
const updateCategorySchema = createUpdateSchema(categoriesTable, {
  id: idSchema,
}).omit({
  createdAt: true,
});

export type CreateCategory = z.infer<typeof CreateCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;
