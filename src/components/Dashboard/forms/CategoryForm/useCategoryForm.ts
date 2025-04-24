import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next13-progressbar";

import { getDirtyFields } from "@/lib/utils";
import { Category } from "@/dto/categories";
import {
  CreateCategory,
  createCategorySchema,
  UpdateCategory,
  updateCategorySchema,
} from "@/schema/category";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/lib/react-query/mutations";
import { safeAsync } from "@/lib/safe";

type CategoryFormValues = CreateCategory | UpdateCategory;

const useCategoryForm = ({ initial }: { initial?: Category }) => {
  const router = useRouter();
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(
      initial ? updateCategorySchema : createCategorySchema
    ),
    defaultValues: {
      id: initial?.id,
      name: initial?.name,
    },
  });

  const createMutation = useCreateCategoryMutation();
  const updateMutation = useUpdateCategoryMutation();

  const onSubmit = async (data: CategoryFormValues) => {
    if ("id" in data && initial) {
      const dirtyFields = form.formState.dirtyFields;
      const dirtyData = {
        ...(getDirtyFields(dirtyFields, data) as UpdateCategory),
        id: data.id,
      };

      const category = await safeAsync(updateMutation.mutateAsync(dirtyData));
      if (!category.success)
        return toast.error("there was an error updating the category");

      toast.success("category updated successfully");
      return router.refresh();
    }

    const category = await safeAsync(
      createMutation.mutateAsync(data as CreateCategory)
    );
    if (!category.success) return toast.error("");

    toast.success("category created successfully");
    router.push(`/dashboard/category/${category.data.id}`);
    return router.refresh();
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};

export default useCategoryForm;
