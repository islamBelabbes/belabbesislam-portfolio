import { GetCategories } from "@/schema/category";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api";

export const useCategoriesQuery = (
  params: GetCategories,
  options: {
    enabled?: boolean;
  }
) => {
  return useQuery({
    queryKey: ["categories", params.name],
    queryFn: () => getCategories({ ...params, showEmpty: true }),
    ...options,
  });
};
