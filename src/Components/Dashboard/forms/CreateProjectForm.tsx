"use client";
import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "../ImageUploader";
import { Button } from "@/components/ui/button";
import BlockUi from "@/components/BlockUi";
import CategoriesSelect from "../CategoriesSelect";

type CreateProjectFormProps = {
  projectImg?: string | null;
};
const CreateProjectForm = ({ projectImg = null }: CreateProjectFormProps) => {
  const [image, setImage] = useState<null | string>(projectImg);

  const customSetImage = (image: string | null) => {
    return setImage(image);
  };

  return (
    <div>
      <h2>Create Project</h2>
      <BlockUi isBlock={false}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-5 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-3">
            <Label htmlFor="title">Project title</Label>
            <Input id="title" placeholder="project Title" />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="desc">Project Description</Label>
            <Textarea id="desc" />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="url">Project url</Label>
            <Input id="url" placeholder="project Url" />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="url">Project url</Label>
            <CategoriesSelect />
          </div>

          <div className="flex flex-col gap-3 w-[450px]">
            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Project Image
            </span>
            <ImageUploader image={image} setImage={customSetImage} />
          </div>

          <Button>Create Project</Button>
        </form>
      </BlockUi>
    </div>
  );
};

export default CreateProjectForm;
