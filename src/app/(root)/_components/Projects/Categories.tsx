"use client";
import { Input } from "@/components/ui/input";
import { MEDIA_URL } from "@/constants/constants";
import { Category } from "@/dto/categories";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type CategoriesProps = {
  selectedCategory: Category | undefined;
  setSelectedCategory: (category: Category) => void;
  categories: Category[];
};

{
}

function Categories({
  selectedCategory,
  setSelectedCategory,
  categories,
}: CategoriesProps) {
  return (
    <div className="flex justify-center">
      <ul className="flex flex-wrap justify-center w-full gap-6">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              className={cn(
                "w-10 h-10 cursor-pointer transition-all relative",
                {
                  "opacity-20": selectedCategory?.id === category.id,
                }
              )}
              onClick={() => {
                setSelectedCategory(category);
              }}
            >
              <Image
                fill
                className="object-contain"
                alt="category"
                src={`${MEDIA_URL}/${category.image}`}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
