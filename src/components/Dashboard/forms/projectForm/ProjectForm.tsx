"use client";
import React from "react";

import { Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/Dashboard/ImageUploader";
import { Button } from "@/components/ui/button";
import BlockUi from "@/components/BlockUi";
import CategoriesSelect from "@/components/Dashboard/CategoriesSelect";
import { TCategory, TPostForm } from "@/types";
import { cn } from "@/lib/utils";
import useProjectForm from "./useProjectForm";

const ProjectForm = ({ initialData, isUpdate = false }: TPostForm) => {
  const {
    register,
    handleSubmit,
    formState,
    control,
    onSubmit,
    onSelect,
    isLoading,
  } = useProjectForm({
    initialData,
    isUpdate,
  });

  return (
    <div>
      <h2> {isUpdate ? "Update" : "Create"} Project</h2>
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
                  disabled={isLoading}
                />
              )}
            ></Controller>
          </div>

          <Button disabled={isLoading}>
            {isUpdate ? "Update" : "Create"} Project
          </Button>
        </form>
      </BlockUi>
    </div>
  );
};

export default ProjectForm;
