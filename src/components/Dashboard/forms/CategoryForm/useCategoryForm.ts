import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { categoryFormSchema } from "@/lib/Schema";
import { urlToBlob } from "@/lib/utils";
import useSupabaseWithAuth from "@/hooks/useSupabaseWithAuth";
import { TCategory } from "@/types";
import { useRouter } from "next/navigation";

type TUseCategoryForm = {
  initialData?: TCategory;
  isUpdate: boolean;
};

const useCategoryForm = ({ initialData, isUpdate }: TUseCategoryForm) => {
  const router = useRouter();
  const { createSupabaseClient } = useSupabaseWithAuth();
  const { register, control, formState, handleSubmit } = useForm<TCategory>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: initialData,
  });

  const { mutateAsync: createAsync, isPending: isCreating } = useMutation({
    mutationFn: async (data: TCategory) => {
      const supabase = await createSupabaseClient();

      const imageToUpload = await urlToBlob(data.image);
      if (!imageToUpload) throw new Error("image not found");

      const { data: mediaData, error: mediaError } = await supabase.storage
        .from("media")
        .upload(`category/${uuidv4()}.jpg`, imageToUpload);

      if (mediaError) throw mediaError;

      const { error, data: category } = await supabase
        .from("categories")
        .insert({
          name: data.name,
          image: `${process.env.NEXT_PUBLIC_SUPABASE_MEDIA_URL}/${mediaData.path}`,
        })
        .select();

      if (error) throw error;
      return category;
    },
  });

  const { mutateAsync: updateAsync, isPending: isUpdating } = useMutation({
    mutationFn: async (data: TCategory) => {
      if (!initialData?.id) throw new Error("id not found");

      const supabase = await createSupabaseClient();
      // check if the image have been changed!!
      if (data.image !== initialData?.image) {
        console.log("update the image"); // TODO : update the image
      }

      const { error } = await supabase
        .from("categories")
        .update({
          name: data.name,
        })
        .eq("id", initialData?.id);

      if (error) throw error;
      return true;
    },
  });

  const onCreate = async (data: TCategory) => {
    const res = await toast.promise(createAsync(data), {
      error: "something went wrong",
      success: "success",
      pending: "pending",
    });

    router.push(`/dashboard/category/${res[0]?.id}`);
  };

  const onUpdate = async (data: TCategory) => {
    await toast.promise(updateAsync(data), {
      error: "something went wrong",
      success: "success",
      pending: "pending",
    });

    router.refresh();
  };

  const isLoading = isCreating || isUpdating;
  const onSubmit = isUpdate ? onUpdate : onCreate;

  return {
    register,
    control,
    formState,
    handleSubmit,
    onSubmit,
    isLoading,
  };
};

export default useCategoryForm;