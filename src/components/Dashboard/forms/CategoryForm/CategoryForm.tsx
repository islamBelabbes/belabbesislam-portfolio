"use client";
import React, { useMemo } from "react";

import { Controller } from "react-hook-form";

import BlockUi from "@/components/BlockUi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUploader from "../../ImageUploader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useCategoryForm from "./useCategoryForm";
import { Category } from "@/dto/categories";
import { MEDIA_URL } from "@/constants/constants";

function CategoryForm({ initial }: { initial?: Category }) {
  const { register, control, formState, handleSubmit } = useCategoryForm({
    initial,
  });

  const cover = initial?.image ? `${MEDIA_URL}/${initial.image}` : null;
  console.log(formState.errors);

  return (
    <div>
      <BlockUi isBlock={formState.isSubmitting}>
        <form
          className="flex justify-between gap-2 lg:flex-row flex-col"
          onSubmit={handleSubmit}
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

            <Button
              disabled={formState.isSubmitting}
              className="w-full mt-3"
              type="submit"
            >
              {initial ? "Update" : "Create"}
            </Button>
          </div>

          <Controller
            name="image"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ImageUploader
                image={value ?? cover}
                setImage={onChange}
                className={cn("basis-1/3", {
                  "border-red-700": formState.errors.image,
                })}
              />
            )}
          />
        </form>
      </BlockUi>
    </div>
  );
}

export default CategoryForm;
