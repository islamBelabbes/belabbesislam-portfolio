import { QueryWithPagination, DataWithPagination } from "@/types";
import { generateSearchParams } from "./utils";
import { Project } from "@/dto/projects";
import { AppError } from "./error";
import { GetProjects } from "@/schema/project";
import { CreateCategory, UpdateCategory } from "@/schema/category";
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

export const getProjects = async (
  query: QueryWithPagination<GetProjects> = {}
) => {
  const searchParams = generateSearchParams({
    ...query,
    "category-id": query.categoryId,
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
  console.log(data);

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
