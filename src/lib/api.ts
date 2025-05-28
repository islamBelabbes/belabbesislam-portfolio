import { QueryWithPagination, DataWithPagination } from "@/types";
import { generateSearchParams } from "./utils";
import { Project } from "@/dto/projects";
import { AppError } from "./error";
import { CreateProject, GetProjects, UpdateProject } from "@/schema/project";
import {
  CreateCategory,
  GetCategories,
  UpdateCategory,
} from "@/schema/category";
import { Category } from "@/dto/categories";
import { Id } from "./schema";

// Global
export const deleteEntry = async (route: string) => {
  const response = await fetch(`/api/${route}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new AppError("something went wrong", response.status);
  }

  return true;
};

// Projects
export const getProjects = async ({
  categoryId,
  ...query
}: QueryWithPagination<GetProjects> = {}) => {
  const searchParams = generateSearchParams({
    ...query,
    "category-id": categoryId,
  });

  const response = await fetch(`/api/projects?${searchParams.toString()}`, {
    next: { revalidate: 3600 * 24 },
  });
  if (!response.ok) {
    throw new AppError("something went wrong", response.status);
  }

  const data = await response.json();
  return data?.data as DataWithPagination<Project[]>;
};

export const createProject = async (data: CreateProject) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("image", data.image);
  data.description && formData.append("description", data.description);
  data.url && formData.append("url", data.url);
  data.github && formData.append("github", data.github);
  data.categories.forEach((category) => {
    formData.append("categories[]", category.toString());
  });
  data.gallery &&
    data.gallery.forEach((image) => formData.append("gallery[]", image));

  const response = await fetch("/api/projects", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new AppError("something went wrong", response.status);
  }

  const res = await response.json();
  return res.data as { id: Id };
};
export const updateProject = async (data: UpdateProject) => {
  const formData = new FormData();
  data.title && formData.append("title", data.title);
  data.image && formData.append("image", data.image);
  data.description && formData.append("description", data.description);
  data.url && formData.append("url", data.url);
  data.github && formData.append("github", data.github);
  data.categories.forEach((category) => {
    formData.append("categories[]", category.toString());
  });
  data.gallery?.forEach((image) => formData.append("gallery[]", image));
  data.deletedGalleryImage?.forEach((image) =>
    formData.append("deletedGalleryImage[]", image.toString())
  );

  console.log(data);

  const response = await fetch(`/api/projects/${data.id}`, {
    method: "PATCH",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new AppError("something went wrong", response.status);
  }

  const res = await response.json();
  return res.data as Project;
};

// Categories
export const getCategories = async (
  query: QueryWithPagination<GetCategories> = {}
) => {
  const searchParams = generateSearchParams({
    ...query,
    "show-empty": query.showEmpty,
  });

  const response = await fetch(`/api/categories?${searchParams.toString()}`);
  if (!response.ok) {
    throw new AppError("something went wrong", response.status);
  }

  const data = await response.json();
  return data?.data as DataWithPagination<Category[]>;
};
export const createCategory = async (data: CreateCategory) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("image", data.image);

  const response = await fetch("/api/categories", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new AppError("something went wrong", response.status);
  }

  const res = await response.json();
  return res.data as { id: Id };
};

export const updateCategory = async (data: UpdateCategory) => {
  const formData = new FormData();
  data.name && formData.append("name", data.name);
  data.image && formData.append("image", data.image);

  const response = await fetch(`/api/categories/${data.id}`, {
    method: "PATCH",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new AppError("something went wrong", response.status);
  }

  const res = await response.json();
  return res as { id: Id };
};
