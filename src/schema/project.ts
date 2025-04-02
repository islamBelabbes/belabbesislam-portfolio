import { projectsTable } from "@/lib/db/schema";

import { z } from "zod";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { ImageSchema, idSchema } from "@/lib/schema";

const createProjectSchema = createInsertSchema(projectsTable, {
  url: z.string().url().optional(),
  description: z.string().optional(),
  image: ImageSchema,
}).omit({
  createdAt: true,
  id: true,
});

const updateProjectSchema = createUpdateSchema(projectsTable, {
  id: idSchema,
  url: z.string().url().optional(),
  description: z.string().optional(),
  image: ImageSchema.optional(),
}).omit({
  createdAt: true,
});

export type CreateProject = z.infer<typeof createProjectSchema>;
export type UpdateProject = z.infer<typeof updateProjectSchema>;
