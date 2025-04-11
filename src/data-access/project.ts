import { PAGINATION } from "@/constants/constants";
import { projectDtoMapper } from "@/dto/projects";
import db from "@/lib/db";
import { projectCategoriesTable, projectsTable } from "@/lib/db/schema";
import { Id } from "@/lib/schema";
import { CreateProject, GetProjects, UpdateProject } from "@/schema/project";
import { QueryWithPagination } from "@/types";
import { and, eq, exists, count as drizzleCount } from "drizzle-orm";

export const getProjects = async ({
  limit = PAGINATION.LIMIT,
  page = PAGINATION.PAGE,
  categoryId,
}: QueryWithPagination<GetProjects> = {}) => {
  const projects = await db.query.projectsTable.findMany({
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
    orderBy: (fields, { desc }) => desc(fields.createdAt),

    ...(categoryId && {
      where: (project, { eq, exists, and }) =>
        exists(
          db
            .select()
            .from(projectCategoriesTable)
            .where(
              and(
                eq(projectCategoriesTable.projectId, project.id),
                eq(projectCategoriesTable.categoryId, categoryId)
              )
            )
        ),
    }),
  });

  const mapped = projects.map((item) => {
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

  const { projectCategories, ...rest } = post;
  return projectDtoMapper({
    ...rest,
    categories: projectCategories.map((item) => item.category),
  });
};

export const createProject = async (
  data: Omit<CreateProject, "image"> & { image: string }
) => {
  return db.transaction(async (tx) => {
    const [id] = await tx
      .insert(projectsTable)
      .values(data)
      .returning({ id: projectsTable.id });

    await tx.insert(projectCategoriesTable).values(
      data.categories.map((category) => ({
        projectId: id.id,
        categoryId: category,
      }))
    );
  });
};

export const updateProject = async ({
  id,
  ...data
}: Omit<UpdateProject, "image"> & { image?: string }) => {
  return db.transaction(async (tx) => {
    await db
      .delete(projectCategoriesTable)
      .where(eq(projectCategoriesTable.projectId, id));

    await tx.insert(projectCategoriesTable).values(
      data.categories.map((category) => ({
        projectId: id,
        categoryId: category,
      }))
    );
  });
};

export const deleteProject = async (id: Id) => {
  return db.delete(projectsTable).where(eq(projectsTable.id, id));
};

export const countProjects = async ({ categoryId }: GetProjects = {}) => {
  const countP = db.select({ value: drizzleCount() }).from(projectsTable);

  if (categoryId) {
    countP.where(
      exists(
        db
          .select()
          .from(projectCategoriesTable)
          .where(
            and(
              eq(projectCategoriesTable.projectId, projectsTable.id),
              eq(projectCategoriesTable.categoryId, categoryId)
            )
          )
      )
    );
  }

  const count = await countP;
  return count[0]?.value || 0;
};
