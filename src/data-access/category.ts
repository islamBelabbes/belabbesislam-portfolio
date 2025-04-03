import { PAGINATION } from "@/constants/constants";
import { categoryDtoMapper } from "@/dto/categories";
import db from "@/lib/db";
import { categoriesTable, projectCategoriesTable } from "@/lib/db/schema";
import { Id } from "@/lib/schema";
import {
  CreateCategory,
  GetCategories,
  UpdateCategory,
} from "@/schema/category";
import { TQueryWithPagination } from "@/types";
import { count as drizzleCount, eq, exists } from "drizzle-orm";

export const getCategories = async ({
  limit = PAGINATION.LIMIT,
  page = PAGINATION.PAGE,
  showEmpty = false,
}: TQueryWithPagination<GetCategories> = {}) => {
  const categories = await db.query.categoriesTable.findMany({
    limit,
    offset: (page - 1) * limit,
    ...(!showEmpty && {
      where: (categories, { exists }) => {
        return exists(
          db
            .select({ id: projectCategoriesTable.projectId })
            .from(projectCategoriesTable)
            .where(eq(projectCategoriesTable.categoryId, categories.id))
        );
      },
    }),
  });

  return categories.map(categoryDtoMapper);
};

export const getCategoryById = async (id: Id) => {
  const category = await db.query.categoriesTable.findFirst({
    where: (table, { eq }) => eq(table.id, id),
  });

  if (!category) return null;
  return categoryDtoMapper(category);
};

export const createCategory = async (
  data: Omit<CreateCategory, "image"> & { image: string }
) => {
  return db.insert(categoriesTable).values(data);
};

export const updateCategory = async ({
  id,
  ...data
}: Omit<UpdateCategory, "image"> & { image?: string }) => {
  return db.update(categoriesTable).set(data).where(eq(categoriesTable.id, id));
};

export const deleteCategory = async (id: Id) => {
  return db.delete(categoriesTable).where(eq(categoriesTable.id, id));
};

export const countCategories = async ({ showEmpty }: GetCategories = {}) => {
  // Count only categories that have projects
  const countP = db.select({ count: drizzleCount() }).from(categoriesTable);

  if (!showEmpty) {
    countP.where(
      exists(
        db
          .select({ id: projectCategoriesTable.projectId })
          .from(projectCategoriesTable)
          .where(eq(projectCategoriesTable.categoryId, categoriesTable.id))
      )
    );
  }

  const count = await countP;

  return count[0]?.count || 0;
};
