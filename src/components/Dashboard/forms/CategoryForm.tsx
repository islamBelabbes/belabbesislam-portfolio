"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import BlockUi from "@/components/BlockUi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUploader from "../ImageUploader";
import { Button } from "@/components/ui/button";
import { TCategory } from "@/types";
import { categoryFormSchema } from "@/lib/Schema";
import { cn, urlToBlob } from "@/lib/utils";
import useSupabaseWithAuth from "@/hooks/useSupabaseWithAuth";

type TCategoryFormProps = {
  initialData?: TCategory;
  isUpdate?: boolean;
};

type TForm = Omit<TCategory, "id">;

function CategoryForm({ initialData, isUpdate = false }: TCategoryFormProps) {
  const createSupabaseClient = useSupabaseWithAuth();
  const { register, control, formState, handleSubmit, getValues } =
    useForm<TForm>({
      resolver: zodResolver(categoryFormSchema),
      defaultValues: initialData,
    });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: TForm) => {
      const supabase = await createSupabaseClient;

      const imageToUpload = await urlToBlob(data.image);
      if (!imageToUpload) throw new Error("image not found");

      const { data: mediaData, error: mediaError } = await supabase.storage
        .from("media")
        .upload(`category/${uuidv4()}.jpg`, imageToUpload);

      if (mediaError) throw mediaError;

      const { error } = await supabase.from("categories").insert({
        name: data.name,
        image: `${process.env.NEXT_PUBLIC_SUPABASE_MEDIA_URL}/${mediaData.path}`,
      });

      if (error) throw error;
      return true;
    },
  });

  const onSubmit = async (data: TForm) => {
    await toast.promise(mutateAsync(data), {
      error: "something went wrong",
      success: "success",
      pending: "pending",
    });
  };

  return (
    <div>
      <h2>Create Category</h2>
      <BlockUi isBlock={false}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-between gap-2 lg:flex-row flex-col"
        >
          <div className="flex-grow">
            <div>
              <Label htmlFor="name">category name</Label>
              <Input
                className={cn("focus-visible:ring-0", {
                  " border-red-700": formState.errors.name,
                })}
                placeholder="category name"
                {...register("name")}
              />
            </div>

            <Button disabled={isPending} className="w-full mt-3">
              Create
            </Button>
          </div>

          <Controller
            name="image"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ImageUploader
                image={value}
                setImage={onChange}
                className={cn("basis-1/3", {
                  "border-red-700": formState.errors.image,
                })}
              />
            )}
          ></Controller>
        </form>
      </BlockUi>
    </div>
  );
}

export default CategoryForm;
