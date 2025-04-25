import { PAGINATION } from "@/constants/constants";
import { categoryDtoMapper } from "@/dto/categories";
import db from "@/lib/db";
import {
  CategoryTable,
  categoriesTable,
  projectCategoriesTable,
} from "@/lib/db/schema";
import { Id } from "@/lib/schema";
import {
  CreateCategory,
  GetCategories,
  UpdateCategory,
} from "@/schema/category";
import { QueryWithPagination } from "@/types";
import { and, count as drizzleCount, eq, exists, like } from "drizzle-orm";

export const getCategories = async ({
  limit = PAGINATION.LIMIT,
  page = PAGINATION.PAGE,
  showEmpty = false,
  name,
}: QueryWithPagination<GetCategories> = {}) => {
  const whereClause = (
    categories: (typeof db.query.categoriesTable)["table"],
    { and, like, exists, eq }: any
  ) => {
    const conditions = [];

    if (!showEmpty) {
      conditions.push(
        exists(
          db
            .select({ id: projectCategoriesTable.projectId })
            .from(projectCategoriesTable)
            .where(eq(projectCategoriesTable.categoryId, categories.id))
            .limit(1)
        )
      );
    }

    if (name) {
      conditions.push(like(categories.name, `%${name}%`));
    }

    return and(...conditions);
  };
  const categories = await db.query.categoriesTable.findMany({
    limit,
    offset: (page - 1) * limit,
    orderBy: (fields, { desc }) => desc(fields.createdAt),
    ...(name || !showEmpty ? { where: whereClause } : {}),
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

export const getCategoriesByIds = async (ids: Id[]) => {
  const categories = await db.query.categoriesTable.findMany({
    where: (table, { inArray }) => inArray(table.id, ids),
  });

  return categories.map(categoryDtoMapper);
};

export const createCategory = async (
  data: Omit<CreateCategory, "image"> & { image: string }
) => {
  return db
    .insert(categoriesTable)
    .values(data)
    .returning({ id: categoriesTable.id });
};

export const updateCategory = async ({
  id,
  ...data
}: Omit<UpdateCategory, "image"> & { image?: string }) => {
  return db
    .update(categoriesTable)
    .set(data)
    .where(eq(categoriesTable.id, id))
    .returning({ id: categoriesTable.id });
};

export const deleteCategory = async (id: Id) => {
  return db.delete(categoriesTable).where(eq(categoriesTable.id, id));
};

export const countCategories = async ({
  showEmpty,
  name,
}: GetCategories = {}) => {
  const whereClause = () => {
    const conditions = [];

    if (!showEmpty) {
      conditions.push(
        exists(
          db
            .select({ id: projectCategoriesTable.projectId })
            .from(projectCategoriesTable)
            .where(eq(projectCategoriesTable.categoryId, categoriesTable.id))
            .limit(1)
        )
      );
    }

    if (name) {
      conditions.push(like(categoriesTable.name, `%${name}%`));
    }

    return and(...conditions);
  };

  const countP = db
    .select({ count: drizzleCount() })
    .from(categoriesTable)
    .where(whereClause);

  const count = await countP;

  return count[0]?.count || 0;
};
