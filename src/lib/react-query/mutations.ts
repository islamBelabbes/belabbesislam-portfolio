import { useMutation } from "@tanstack/react-query";
import {
  createCategory,
  createProject,
  deleteEntry,
  updateCategory,
  updateProject,
} from "../api";
import { CreateCategory, UpdateCategory } from "@/schema/category";
import { CreateProject, UpdateProject } from "@/schema/project";

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

export const useCreateProjectMutation = () => {
  return useMutation({
    mutationFn: (data: CreateProject) => createProject(data),
  });
};

export const useUpdateProjectMutation = () => {
  return useMutation({
    mutationFn: (data: UpdateProject) => updateProject(data),
  });
};
