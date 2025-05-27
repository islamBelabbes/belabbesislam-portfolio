import { projectsTable } from "@/lib/db/schema";

import { z } from "zod";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { ImageSchema, idSchema } from "@/lib/schema";

export const createProjectSchema = createInsertSchema(projectsTable, {
  title: z.string().min(1),
  url: z.coerce.string().url().optional(),
  github: z.coerce.string().url().optional(),
  description: z.string().optional(),
  image: ImageSchema,
})
  .omit({
    createdAt: true,
    id: true,
  })
  .extend({
    categories: z
      .array(idSchema)
      .min(1, { message: "Please select at least one category" }),
    gallery: z.array(ImageSchema).optional(),
  });

export const updateProjectSchema = createUpdateSchema(projectsTable, {
  id: idSchema,
  url: z.string().url().optional(),
  github: z.string().url().optional(),
  description: z.string().optional(),
  image: ImageSchema.optional(),
})
  .omit({
    createdAt: true,
  })
  .extend({
    categories: z.array(idSchema).min(1),
    gallery: z.array(ImageSchema).optional(),
    deletedGalleryImage: z.array(idSchema).optional(),
  });

export const getProjectsSchema = z.object({
  categoryId: idSchema.optional(),
});

export type CreateProject = z.infer<typeof createProjectSchema>;
export type UpdateProject = z.infer<typeof updateProjectSchema>;
export type GetProjects = z.infer<typeof getProjectsSchema>;
