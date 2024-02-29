import { createSupabaseClient } from "./supabase";
import { TProjectsTableData, type TCategoryTableData } from "@/types";
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
      .range(index * limit, (index + 1) * limit - 1);

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
    .range(index * limit, (index + 1) * limit - 1);

  if (error) throw error;

  const total = count || 0;

  return {
    data: data || [],
    total: total,
    hasNext: (index + 1) * limit < total,
  };
};
