import { CategoryTable, ProjectTable } from "@/lib/db/schema";

type TProject = ProjectTable["$inferSelect"] & {
  categories: CategoryTable["$inferSelect"][];
};

export const projectDtoMapper = (project: TProject) => {
  // TODO : design DTO
  return {
    ...project,
    categories: project.categories,
  };
};

export type Project = ReturnType<typeof projectDtoMapper>;
