import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";

import { projectFormSchema } from "@/lib/Schema";
import { isInSelectedCategories, urlToBlob } from "@/lib/utils";
import useSupabaseWithAuth from "@/hooks/useSupabaseWithAuth";
import { TCategory, TPostForm, TProject } from "@/types";
import { useRouter } from "next/navigation";

const useProjectForm = ({ initialData, isUpdate }: TPostForm) => {
  const router = useRouter();
  const { createSupabaseClient } = useSupabaseWithAuth();
  const { register, handleSubmit, formState, control } = useForm<TProject>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: { ...initialData, categories: [] },
  });

  const { mutateAsync: createAsync, isPending: isCreating } = useMutation({
    mutationFn: async (data: TProject) => {
      const supabase = await createSupabaseClient();

      const imageToUpload = await urlToBlob(data.image);
      if (!imageToUpload) throw new Error("image not found");

      const { data: mediaData, error: mediaError } = await supabase.storage
        .from("media")
        .upload(`projects/${uuidv4()}.jpg`, imageToUpload);

      if (mediaError) throw mediaError;

      const { error, data: project } = await supabase.rpc(
        "insert_project_with_categories",
        {
          description: data.description!,
          image: mediaData.path.split("projects/")[1],
          title: data.title,
          url: data.url!,
          categories: [],
        }
      );

      if (error) throw error;

      return { id: project };
    },
  });

  const { mutateAsync: updateAsync, isPending: isUpdating } = useMutation({
    mutationFn: async (data: TProject) => {
      let newImage: string | null = null;
      if (!initialData?.id) throw new Error("id not found");

      const supabase = await createSupabaseClient();
      // check if the image have been changed!!
      if (data.image !== initialData?.image) {
      }

      const { error } = await supabase.rpc("update_project", {
        categories: [],
        description: data?.description || "",
        id: initialData?.id,
        title: data.title,
        url: data?.url || "",
        image: initialData?.image.split("/projects/")[1],
      });

      if (error) throw error;
      return true;
    },
  });

  const onCreate = async (data: TProject) => {
    const { id } = await toast.promise(createAsync(data), {
      error: "something went wrong",
      success: "success",
      pending: "pending",
    });

    router.push(`/dashboard/project/${id}`);
  };
  const onUpdate = async (data: TProject) => {
    await toast.promise(updateAsync(data), {
      error: "something went wrong",
      success: "success",
      pending: "pending",
    });

    router.refresh();
  };

  const onSelect = (
    value: TCategory,
    onChange: (...event: any[]) => void,
    selectedValues: TCategory[]
  ) => {
    // make sure the value in not already selected
    if (isInSelectedCategories(selectedValues, value)) {
      onChange &&
        onChange(selectedValues.filter((item) => item.id !== value.id));
      return;
    }
    onChange && onChange([...selectedValues, value]);
  };

  const isLoading = isCreating || isUpdating;
  const onSubmit = isUpdate ? onUpdate : onCreate;

  return {
    register,
    handleSubmit,
    formState,
    control,
    onSubmit,
    onSelect,
    isLoading,
  };
};

export default useProjectForm;
