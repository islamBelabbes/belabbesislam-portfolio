import { createSupabaseClient } from "./supabase";
import {
  TProjectsTableData,
  type TCategoryTableData,
  QueryWithPagination,
  DataWithPagination,
} from "@/types";
import { generateSearchParams } from "./utils";
import { Project } from "@/dto/projects";
import { AppError } from "./error";
import { GetProjects } from "@/schema/project";
type TFetchCategoriesTableData = (params: {
  limit: number;
  index: number;
}) => Promise<TCategoryTableData>;

export const fetchCategoriesTableData: TFetchCategoriesTableData =
  async function ({ index, limit }) {
    const supabase = createSupabaseClient();
    const { error, data, count } = await supabase
      .from("categories")
      .select("*", { count: "exact" })
      .range(index * limit, (index + 1) * limit - 1)
      .order("created_at", { ascending: false });

    if (error) throw error;

    const total = count || 0;

    return {
      data: data || [],
      total: total,
      hasNext: (index + 1) * limit < total,
    };
  };

type TFetchProjectsTableData = (params: {
  limit: number;
  index: number;
}) => Promise<TProjectsTableData>;

export const fetchProjectsTableData: TFetchProjectsTableData = async function ({
  index,
  limit,
}) {
  const supabase = createSupabaseClient();
  const { error, data, count } = await supabase
    .from("projects")
    .select(`* ,categories (*)`, { count: "exact" })
    .range(index * limit, (index + 1) * limit - 1)
    .order("created_at", { ascending: false });

  if (error) throw error;

  const total = count || 0;

  return {
    data: data || [],
    total: total,
    hasNext: (index + 1) * limit < total,
  };
};

export const getProjects = async (
  query: QueryWithPagination<GetProjects> = {}
) => {
  const searchParams = generateSearchParams({
    ...query,
    "category-id": query.categoryId,
  });

  const response = await fetch(`/api/projects?${searchParams.toString()}`);
  if (!response.ok) {
    throw new AppError("something went wrong", response.status);
  }

  const data = await response.json();
  return data?.data as DataWithPagination<Project[]>;
};
