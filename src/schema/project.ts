import { projectsTable, ProjectTable } from "@/lib/db/schema";

import generateZodSchema from "@/lib/generate-zod-schema";
import { z } from "zod";

const { insert, select, update } = new generateZodSchema<ProjectTable>(
  projectsTable
);

const ProjectSchema = select.required();
const createProjectSchema = insert.omit({
  id: true,
  createdAt: true,
});
const updateProjectSchema = update.omit({
  id: true,
  createdAt: true,
});

export type CreateProject = z.infer<typeof createProjectSchema>;
export type UpdateProject = z.infer<typeof updateProjectSchema>;
export type Project = z.infer<typeof ProjectSchema>;
