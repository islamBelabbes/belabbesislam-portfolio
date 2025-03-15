import { Category, Project } from "@/lib/db/schema";

type TProject = Project & {
  categories: Category[];
};

export const postsDtoMapper = (Project: TProject) => {
  return { ...Project };
};

export type TPost = ReturnType<typeof postsDtoMapper>;
