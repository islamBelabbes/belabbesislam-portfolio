"use client";
import BlockUi from "@/components/BlockUi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import ImageUploader from "../ImageUploader";
import { Button } from "@/components/ui/button";
import { TCategory } from "@/types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryFormSchema } from "@/lib/Schema";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import Image from "next/image";

type TCategoryFormProps = {
  initialData?: TCategory;
  isUpdate?: boolean;
};

function CategoryForm({ initialData, isUpdate = false }: TCategoryFormProps) {
  const { register, control, formState, handleSubmit, getValues } = useForm<
    Omit<TCategory, "id">
  >({
    resolver: zodResolver(categoryFormSchema),
  });

  const onSubmit = () => {
    toast.success("nice");
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

            <Button className="w-full mt-3">Create</Button>
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
