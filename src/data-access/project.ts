import { PAGINATION } from "@/constants/constants";
import { projectDtoMapper } from "@/dto/projects";
import db from "@/lib/db";
import { projectsTable } from "@/lib/db/schema";
import { Id } from "@/lib/schema";
import { CreateProject, UpdateProject } from "@/schema/project";
import { TQueryWithPagination } from "@/types";
import { eq } from "drizzle-orm";

export const getProjects = async ({
  limit = PAGINATION.LIMIT,
  page = PAGINATION.PAGE,
}: TQueryWithPagination<{}> = {}) => {
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
    limit,
    offset: (page - 1) * limit,
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

export const getProjectById = async (id: Id) => {
  const post = await db.query.projectsTable.findFirst({
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
    where: (post, { eq }) => eq(post.id, id),
  });

  if (!post) return null;
  return projectDtoMapper({
    ...post,
    categories: post.projectCategories.map((item) => item.category),
  });
};

export const createProject = async (
  data: Omit<CreateProject, "image"> & { image: string }
) => {
  return db.insert(projectsTable).values(data);
};

export const updateProject = async ({
  id,
  ...data
}: Omit<UpdateProject, "image"> & { image?: string }) => {
  return db.update(projectsTable).set(data).where(eq(projectsTable.id, id));
};

export const deleteProject = async (id: Id) => {
  return db.delete(projectsTable).where(eq(projectsTable.id, id));
};

export const countProjects = async () => {
  const count = await db.$count(projectsTable);
  return count;
};
