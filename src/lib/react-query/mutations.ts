import { useMutation } from "@tanstack/react-query";
import { createCategory, deleteEntry, updateCategory } from "../api";
import { CreateCategory, UpdateCategory } from "@/schema/category";

export const useDeleteEntryMutation = () => {
  return useMutation({
    mutationFn: (route: string) => {
      return deleteEntry(route);
    },
    mutationKey: ["delete-entry"],
  });
};

export const useCreateCategoryMutation = () => {
  return useMutation({
    mutationFn: (data: CreateCategory) => createCategory(data),
  });
};

export const useUpdateCategoryMutation = () => {
  return useMutation({
    mutationFn: (data: UpdateCategory) => updateCategory(data),
  });
};
