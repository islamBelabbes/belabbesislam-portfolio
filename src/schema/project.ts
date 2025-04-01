import { projectsTable } from "@/lib/db/schema";

import { z } from "zod";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";

const createProjectSchema = createInsertSchema(projectsTable, {
  url: z.string().url().optional(),
  description: z.string().optional(),
}).omit({
  createdAt: true,
  id: true,
});

const updateProjectSchema = createUpdateSchema(projectsTable, {
  id: z.number(),
  url: z.string().url().optional(),
  description: z.string().optional(),
}).omit({
  createdAt: true,
});

export type CreateProject = z.infer<typeof createProjectSchema>;
export type UpdateProject = z.infer<typeof updateProjectSchema>;
