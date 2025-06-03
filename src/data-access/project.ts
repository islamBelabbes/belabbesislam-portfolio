import { PAGINATION } from "@/constants/constants";
import { Project, projectDtoMapper } from "@/dto/projects";
import db from "@/lib/db";
import {
  projectCategoriesTable,
  projectGalleryTable,
  projectsTable,
} from "@/lib/db/schema";
import { Id } from "@/lib/schema";
import { CreateProject, GetProjects, UpdateProject } from "@/schema/project";
import { QueryWithPagination } from "@/types";
import { and, eq, exists, count as drizzleCount, inArray } from "drizzle-orm";

export const getProjects = async ({
  limit = PAGINATION.LIMIT,
  page = PAGINATION.PAGE,
  categoryId,
}: QueryWithPagination<GetProjects> = {}) => {
  const projects = await db.query.projectsTable.findMany({
    with: {
      projectGallery: {
        columns: {
          projectId: false,
          createdAt: true,
          image: true,
          id: true,
        },
        orderBy: (fields, { asc }) => asc(fields.createdAt),
      },
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
      projectGallery: {
        columns: {
          projectId: false,
          createdAt: true,
          image: true,
          id: true,
        },
      },
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

export const createProject = async ({
  gallery,
  ...data
}: Omit<CreateProject, "image" | "gallery"> & {
  image: string;
  gallery?: string[];
}) => {
  return db.transaction(async (tx) => {
    const [inserted] = await tx
      .insert(projectsTable)
      .values(data)
      .returning({ id: projectsTable.id });

    await tx.insert(projectCategoriesTable).values(
      data.categories.map((category) => ({
        projectId: inserted.id,
        categoryId: category,
      }))
    );

    if (gallery) {
      const preparedGallery = gallery.map((image) => ({
        image,
        projectId: inserted.id,
      }));
      await tx.insert(projectGalleryTable).values(preparedGallery);
    }

    return inserted;
  });
};

export const updateProject = async ({
  id,
  categories,
  gallery,
  deletedGalleryImage,
  ...data
}: Omit<UpdateProject, "image" | "gallery"> & {
  image?: string;
  gallery?: string[];
}) => {
  const hasData = Boolean(
    Object.values(data).filter((item) => item !== undefined).length
  );

  await db.transaction(async (tx) => {
    await tx
      .delete(projectCategoriesTable)
      .where(eq(projectCategoriesTable.projectId, id));

    await tx.insert(projectCategoriesTable).values(
      categories.map((category) => ({
        projectId: id,
        categoryId: category,
      }))
    );

    if (deletedGalleryImage?.length) {
      await tx
        .delete(projectGalleryTable)
        .where(inArray(projectGalleryTable.id, deletedGalleryImage));
    }

    if (gallery?.length) {
      await tx.insert(projectGalleryTable).values(
        gallery.map((image) => ({
          image,
          projectId: id,
        }))
      );
    }

    // if there is no data to update, we don't need to do anything
    if (!hasData) {
      const project = (await getProjectById(id)) as Project;
      return new Promise<Project>((resolve) => {
        resolve(project);
      });
    }

    await tx
      .update(projectsTable)
      .set(data)
      .where(eq(projectsTable.id, id))
      .returning({ id: projectsTable.id });
  });
  return getProjectById(id);
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

export const getGallery = async (ids: Id[]) => {
  const gallery = await db.query.projectGalleryTable.findMany({
    where: (projectGalleryTable, { inArray }) =>
      inArray(projectGalleryTable.id, ids),
  });

  return gallery.map((item) => item.image);
};
