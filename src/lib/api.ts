import { QueryWithPagination, DataWithPagination } from "@/types";
import { generateSearchParams } from "./utils";
import { Project } from "@/dto/projects";
import { AppError } from "./error";
import { GetProjects } from "@/schema/project";

// Global
export const deleteEntry = async (route: string) => {
  const response = await fetch(`/api/${route}`, {
    method: "DELETE",
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
