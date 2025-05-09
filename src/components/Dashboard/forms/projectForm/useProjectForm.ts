import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next13-progressbar";
import { Category } from "@/dto/categories";
import {
  CreateProject,
  UpdateProject,
  createProjectSchema,
  updateProjectSchema,
} from "@/schema/project";
import { Project } from "@/dto/projects";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "@/lib/react-query/mutations";
import { getDirtyFields } from "@/lib/utils";
import { safeAsync } from "@/lib/safe";
import { toast } from "react-toastify";
import { useState } from "react";

type ProjectFormValues = CreateProject | UpdateProject;

export const isInSelectedCategories = (
  selectedCategories: Category[],
  category: Category
) => {
  return selectedCategories?.some((item) => item.id === category?.id);
};

const useProjectForm = ({ initial }: { initial?: Project }) => {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    initial ? [...initial.categories] : []
  );
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(
      (initial ? updateProjectSchema : createProjectSchema) as any
    ),
    defaultValues: {
      id: initial?.id,
      title: initial?.title,
      categories: initial?.categories.map((cat) => cat.id),
      description: initial?.description ?? undefined,
      url: initial?.url ?? undefined,
    },
  });

  const createMutation = useCreateProjectMutation();
  const updateMutation = useUpdateProjectMutation();

  const onSubmit = async (data: ProjectFormValues) => {
    if ("id" in data && initial) {
      const dirtyFields = form.formState.dirtyFields;
      const dirtyData = {
        ...(getDirtyFields(dirtyFields, data) as UpdateProject),
        id: data.id,
        categories: form.getValues("categories"), //this should be included both in post and patch,
      };

      const project = await safeAsync(updateMutation.mutateAsync(dirtyData));
      if (!project.success) {
        console.log(project.error);

        return toast.error("there was an error updating the project");
      }

      toast.success("project updated successfully");
      return router.refresh();
    }

    const project = await safeAsync(
      createMutation.mutateAsync(data as CreateProject)
    );
    if (!project.success) return toast.error("an error occurred");

    toast.success("project created successfully");
    router.push(`/dashboard/project/${project.data.id}`);
    return router.refresh();
  };

  const onSelect = (value: Category, onChange: (...event: any[]) => void) => {
    // make sure the value in not already selected
    if (isInSelectedCategories(selectedCategories, value)) {
      const filtered = selectedCategories.filter((cat) => cat.id !== value.id);
      setSelectedCategories(filtered);
      return onChange([...filtered.map((item) => item.id)]);
    }

    const selected = [...selectedCategories, value];
    setSelectedCategories(selected);
    return onChange([...selected.map((item) => item.id)]);
  };

  return {
    form: {
      ...form,
      handleSubmit: form.handleSubmit(onSubmit),
    },
    onSelect,
    setSelectedCategories,
    selectedCategories,
  };
};

export default useProjectForm;
