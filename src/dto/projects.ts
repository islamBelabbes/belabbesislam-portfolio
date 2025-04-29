import {
  CategoryTable,
  ProjectTable,
  ProjectGalleryTable,
} from "@/lib/db/schema";

type TProject = ProjectTable["$inferSelect"] & {
  categories: CategoryTable["$inferSelect"][];
  projectGallery: Omit<ProjectGalleryTable["$inferSelect"], "projectId">[];
};

export const projectDtoMapper = (project: TProject) => {
  const { projectGallery, ...rest } = project;
  // TODO : design DTO
  return {
    ...rest,
    categories: rest.categories,
    gallery: projectGallery,
  };
};

export type Project = ReturnType<typeof projectDtoMapper>;
