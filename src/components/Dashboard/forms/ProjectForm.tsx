"use client";
import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "../ImageUploader";
import { Button } from "@/components/ui/button";
import BlockUi from "@/components/BlockUi";
import CategoriesSelect from "../CategoriesSelect";
import { supabase } from "@/lib/supabase";
import { TCategory, TODO, TProject } from "@/types";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectFormSchema } from "@/lib/Schema";
import { cn, isInSelectedCategories } from "@/lib/utils";

type ProjectFormProps = {
  projectImg?: string | null;
};
const ProjectForm = ({ projectImg = null }: ProjectFormProps) => {
  const { register, handleSubmit, formState, control, getValues, watch } =
    useForm<TProject>({
      resolver: zodResolver(projectFormSchema),
      defaultValues: {
        categories: [],
        ...(projectImg && { image: projectImg }),
      },
    });

  const onSubmit = () => {
    console.log("ok");
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
                  onSelect={(selectedValue: TODO) => {
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

          <Button>Create Project</Button>
        </form>
      </BlockUi>
    </div>
  );
};

export default ProjectForm;
