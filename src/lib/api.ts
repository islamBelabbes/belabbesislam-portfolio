import { createSupabaseClient } from "./supabase";
import { type TCategoryTableData } from "@/types";
type TFetchTableData = (params: {
  limit: number;
  index: number;
}) => Promise<TCategoryTableData>;

export const fetchTableData: TFetchTableData = async function ({
  index,
  limit,
}) {
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
