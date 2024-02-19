"use client";
import React from "react";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/Dashboard/ImageUploader";
import { Button } from "@/components/ui/button";
import BlockUi from "@/components/BlockUi";
import CategoriesSelect from "@/components/Dashboard/CategoriesSelect";
import { TCategory, TProject } from "@/types";
import { projectFormSchema } from "@/lib/Schema";
import { cn, isInSelectedCategories, urlToBlob } from "@/lib/utils";
import useSupabaseWithAuth from "@/hooks/useSupabaseWithAuth";

type ProjectFormProps = Partial<TProject>;

const ProjectForm = ({
  categories,
  description,
  image,
  title,
  url,
}: ProjectFormProps) => {
  const createSupabaseClient = useSupabaseWithAuth();
  const { register, handleSubmit, formState, control, reset } =
    useForm<TProject>({
      resolver: zodResolver(projectFormSchema),
      defaultValues: {
        categories: [],
        description,
        image,
        title,
        url,
      },
    });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: TProject) => {
      const supabase = await createSupabaseClient;

      const imageToUpload = await urlToBlob(data.image);
      if (!imageToUpload) throw new Error("image not found");

      const { data: mediaData, error: mediaError } = await supabase.storage
        .from("media")
        .upload(`projects/${uuidv4()}.jpg`, imageToUpload);

      if (mediaError) throw mediaError;

      const { error } = await supabase.from("projects").insert({
        description: data.description,
        image: `${process.env.NEXT_PUBLIC_SUPABASE_MEDIA_URL}/${mediaData.path}`,
        title: data.title,
        url: data.url,
      });
      if (error) throw error;

      return true;
    },
  });

  const onSubmit = async (data: TProject) => {
    await toast.promise(mutateAsync(data), {
      error: "something went wrong",
      success: "success",
      pending: "pending",
    });
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

  return (
    <div>
      <h2>Create Project</h2>
      <BlockUi isBlock={false}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-3">
            <Label htmlFor="title">Project title</Label>
            <Input
              className={cn("focus-visible:ring-0", {
                " border-red-700": formState.errors.title,
              })}
              placeholder="project Title"
              {...register("title")}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="desc">Project Description</Label>
            <Textarea
              className={cn("focus-visible:ring-0", {
                " border-red-700": formState.errors.description,
              })}
              id="desc"
              placeholder="project description"
              {...register("description")}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="url">Project url</Label>
            <Input
              className={cn("focus-visible:ring-0", {
                "border-red-700": formState.errors.url,
              })}
              id="url"
              placeholder="project Url"
              {...register("url")}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="url">Project Categories</Label>
            <Controller
              name="categories"
              control={control}
              render={({ field: { onChange, value } }) => (
                <CategoriesSelect
                  onSelect={(selectedValue: TCategory) => {
                    return onSelect(selectedValue, onChange, value);
                  }}
                  selectedCategories={value}
                  className={{
                    PopoverTrigger:
                      formState?.errors.categories && "border-red-700",
                  }}
                />
              )}
            ></Controller>
          </div>

          <div className="flex flex-col gap-3 w-[450px]">
            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Project Image
            </span>
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange, value } }) => (
                <ImageUploader
                  image={value}
                  setImage={onChange}
                  className={cn({
                    "border-red-700": formState.errors.image,
                  })}
                />
              )}
            ></Controller>
          </div>

          <Button disabled={isPending}>Create Project</Button>
        </form>
      </BlockUi>
    </div>
  );
};

export default ProjectForm;
