"use client";
import React from "react";

import { Controller } from "react-hook-form";

import BlockUi from "@/components/BlockUi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUploader from "../../ImageUploader";
import { Button } from "@/components/ui/button";
import { TCategory } from "@/types";
import { cn } from "@/lib/utils";
import useCategoryForm from "./useCategoryForm";

type TCategoryFormProps = {
  initialData?: TCategory;
  isUpdate?: boolean;
};

function CategoryForm({ initialData, isUpdate = false }: TCategoryFormProps) {
  const { register, control, formState, handleSubmit, onSubmit, isLoading } =
    useCategoryForm({
      initialData,
      isUpdate,
    });
  return (
    <div>
      <h2> {isUpdate ? "Update" : "Create"} Category</h2>
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

            <Button disabled={isLoading} className="w-full mt-3">
              {isUpdate ? "Update" : "Create"}
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
                disabled={isLoading}
              />
            )}
          ></Controller>
        </form>
      </BlockUi>
    </div>
  );
}

export default CategoryForm;
