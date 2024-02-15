"use client";
import BlockUi from "@/components/BlockUi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import ImageUploader from "../ImageUploader";
import { Button } from "@/components/ui/button";
import { TCategory } from "@/types";

type TCategoryFormProps = {
  initialData?: TCategory;
  isUpdate?: boolean;
};

function CategoryForm({ initialData, isUpdate = false }: TCategoryFormProps) {
  const [image, setImage] = useState<null | string>(null);

  const customSetImage = (IMAGE: typeof image) => {
    setImage(IMAGE);
  };
  return (
    <div>
      <h2>Create Category</h2>
      <BlockUi isBlock={false}>
        <form className="flex justify-between gap-2 lg:flex-row flex-col">
          <div className="flex-grow">
            <div>
              <Label htmlFor="name">category name</Label>
              <Input id="name" placeholder="category name" />
            </div>

            <Button className="w-full mt-3">Create</Button>
          </div>

          <ImageUploader
            image={image}
            setImage={customSetImage}
            className="basis-1/3"
          />
        </form>
      </BlockUi>
    </div>
  );
}

export default CategoryForm;
