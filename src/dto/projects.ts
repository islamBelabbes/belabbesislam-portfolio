import { category } from "@/schema/category";
import { Project } from "@/schema/project";

type TProject = Project & {
  categories: category[];
};

export const projectDtoMapper = (project: TProject) => {
  return { ...project };
};
