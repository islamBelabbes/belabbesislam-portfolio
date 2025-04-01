import { categoryDtoMapper } from "@/dto/categories";
import db from "@/lib/db";
import { categoriesTable } from "@/lib/db/schema";
import { Id } from "@/lib/schema";
import { CreateCategory, UpdateCategory } from "@/schema/category";
import { eq } from "drizzle-orm";

export const getCategories = async () => {
  const categories = await db.query.categoriesTable.findMany();
  return categories.map(categoryDtoMapper);
};

export const getCategoryById = async (id: Id) => {
  const category = await db.query.categoriesTable.findFirst({
    where: (table, { eq }) => eq(table.id, id),
  });

  if (!category) return null;
  return categoryDtoMapper(category);
};

export const createCategory = async (data: CreateCategory) => {
  return db.insert(categoriesTable).values(data);
};

export const updateCategory = async ({ id, ...data }: UpdateCategory) => {
  return db.update(categoriesTable).set(data).where(eq(categoriesTable.id, id));
};

export const deleteCategory = async (id: Id) => {
  return db.delete(categoriesTable).where(eq(categoriesTable.id, id));
};
