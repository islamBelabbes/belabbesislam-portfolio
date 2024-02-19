import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";

import { projectFormSchema } from "@/lib/Schema";
import { isInSelectedCategories, urlToBlob } from "@/lib/utils";
import useSupabaseWithAuth from "@/hooks/useSupabaseWithAuth";
import { TCategory, TProject } from "@/types";
import { useRouter } from "next/navigation";

type TUseProjectForm = {
  initialData?: Partial<TProject>;
  isUpdate: boolean;
};

const useProjectForm = ({ initialData, isUpdate }: TUseProjectForm) => {
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

      const { error, data: project } = await supabase
        .from("projects")
        .insert({
          description: data.description,
          image: `${process.env.NEXT_PUBLIC_SUPABASE_MEDIA_URL}/${mediaData.path}`,
          title: data.title,
          url: data.url,
        })
        .select();
      if (error) throw error;

      return project;
    },
  });

  const { mutateAsync: updateAsync, isPending: isUpdating } = useMutation({
    mutationFn: async (data: TProject) => {
      if (!initialData?.id) throw new Error("id not found");

      const supabase = await createSupabaseClient();
      // check if the image have been changed!!
      if (data.image !== initialData?.image) {
        console.log("update the image"); // TODO : update the image
      }

      const { image, categories, ...rest } = data;

      const { error } = await supabase
        .from("projects")
        .update(rest)
        .eq("id", initialData?.id);

      if (error) throw error;
      return true;
    },
  });

  const onCreate = async (data: TProject) => {
    const res = await toast.promise(createAsync(data), {
      error: "something went wrong",
      success: "success",
      pending: "pending",
    });

    router.push(`/dashboard/project/${res[0].id}`);
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
