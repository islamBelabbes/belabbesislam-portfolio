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
import { cn } from "@/lib/utils";
import useProjectForm from "./useProjectForm";
import { Project } from "@/dto/projects";
import { MEDIA_URL } from "@/constants/constants";
import { Category } from "@/dto/categories";

const ProjectForm = ({ initial }: { initial: Project }) => {
  const { form, onSelect, selectedCategories, setSelectedCategories } =
    useProjectForm({
      initial,
    });
  const cover = initial?.image ? `${MEDIA_URL}/${initial.image}` : null;
  const isDirtyAlt = !!Object.keys(form.formState.dirtyFields).length;

  return (
    <div>
      <h2> {initial ? "Update" : "Create"} Project</h2>
      <BlockUi isBlock={false}>
        <form onSubmit={form.handleSubmit} className="mt-5 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Label htmlFor="title">Project title</Label>
            <Input
              className={cn("focus-visible:ring-0", {
                " border-red-700": form.formState.errors.title,
              })}
              placeholder="project Title"
              {...form.register("title")}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="desc">Project Description</Label>
            <Textarea
              className={cn("focus-visible:ring-0", {
                " border-red-700": form.formState.errors.description,
              })}
              id="desc"
              placeholder="project description"
              {...form.register("description")}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="url">Project url</Label>
            <Controller
              name="url"
              control={form.control}
              render={({ field }) => (
                <Input
                  className={cn("focus-visible:ring-0", {
                    "border-red-700": form.formState.errors.url,
                  })}
                  id="url"
                  placeholder="project Url"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value || undefined)}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="url">Project Categories</Label>
            <Controller
              name="categories"
              control={form.control}
              render={({ field: { onChange } }) => (
                <CategoriesSelect
                  onSelect={(selectedValue: Category) => {
                    return onSelect(selectedValue, onChange);
                  }}
                  selectedCategories={selectedCategories}
                  className={{
                    PopoverTrigger:
                      form.formState?.errors.categories && "border-red-700",
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
              control={form.control}
              render={({ field: { onChange, value } }) => (
                <ImageUploader
                  image={value ?? cover}
                  setImage={onChange}
                  className={cn({
                    "border-red-700": form.formState.errors.image,
                  })}
                  disabled={form.formState.isSubmitting}
                />
              )}
            ></Controller>
          </div>

          <Button disabled={form.formState.isSubmitting || !isDirtyAlt}>
            {initial ? "Update" : "Create"} Project
          </Button>
        </form>
      </BlockUi>
    </div>
  );
};

export default ProjectForm;
