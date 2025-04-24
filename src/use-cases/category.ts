import {
  countCategories,
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "@/data-access/category";
import { User } from "@/dto/users";
import { AppError, AuthError, NotFoundError } from "@/lib/error";
import { Id } from "@/lib/schema";
import { utapi } from "@/lib/upload-thing";
import {
  CreateCategory,
  GetCategories,
  UpdateCategory,
} from "@/schema/category";
import { QueryWithPagination } from "@/types";
import generatePagination from "@/lib/generate-pagination";

export const getCategoriesUseCase = async (
  query: QueryWithPagination<GetCategories> = {}
) => {
  const categoriesP = getCategories(query);
  const countCategoriesP = countCategories(query);
  const [count, categories] = await Promise.all([
    countCategoriesP,
    categoriesP,
  ]);

  return {
    data: categories,
    ...generatePagination({
      limit: query.limit,
      page: query.page,
      total: count,
    }),
  };
};

export const getCategoryByIdUseCase = async (id: Id) => {
  const category = await getCategoryById(id);
  if (!category) throw new NotFoundError();
  return category;
};

export const createCategoryUseCase = async (
  data: CreateCategory,
  user?: User
) => {
  if (!user?.isAdmin) throw new AuthError();

  const { image, ...rest } = data;
  const { data: udata, error } = await utapi.uploadFiles(image);
  if (error) throw new AppError("Error uploading image");

  const [created] = await createCategory({
    ...rest,
    image: udata.key,
  });
  return created;
};
export const updateCategoryUseCase = async (
  data: UpdateCategory,
  user?: User
) => {
  if (!user?.isAdmin) throw new AuthError();

  const category = await getCategoryByIdUseCase(data.id); // this will throw if not found
  const { image, ...rest } = data;

  let _image: string | undefined;
  if (image) {
    const [_, newImage] = await Promise.all([
      utapi.deleteFiles(category.image),
      utapi.uploadFiles(image),
    ]);

    if (newImage.error) throw new AppError("Error uploading image");
    _image = newImage.data.key;
  }

  const [updated] = await updateCategory({
    ...rest,
    image: _image,
  });
  return updated;
};

export const deleteCategoryUseCase = async (id: Id, user?: User) => {
  if (!user?.isAdmin) throw new AuthError();
  const category = await getCategoryByIdUseCase(id);

  await Promise.all([utapi.deleteFiles(category.image), deleteCategory(id)]);
  return true;
};
