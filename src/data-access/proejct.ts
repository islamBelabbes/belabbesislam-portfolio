import { projectDtoMapper } from "@/dto/projects";
import db from "@/lib/db";

export const getProjects = async () => {
  const posts = await db.query.projectsTable.findMany({
    with: {
      projectCategories: {
        columns: {
          categoryId: false,
          projectId: false,
        },
        with: {
          category: true,
        },
      },
    },
  });

  const mapped = posts.map((item) => {
    const { projectCategories, ...rest } = item;
    return {
      ...rest,
      categories: [...projectCategories.map((i) => i.category)],
    };
  });

  return mapped.map(projectDtoMapper);
};
export const getProjectById = async () => {};
export const createProject = async () => {};
export const updateProject = async () => {};
export const deleteProject = async () => {};
