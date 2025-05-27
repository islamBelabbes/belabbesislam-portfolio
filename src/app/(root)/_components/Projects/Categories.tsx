"use client";
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

// if our categories get large we should use a scrollable list

function Categories({
  selectedCategory,
  setSelectedCategory,
  categories,
}: CategoriesProps) {
  return (
    <ul className="flex justify-center w-full gap-6">
      {categories.map((category) => (
        <li key={category.id}>
          <button
            className={cn("w-10 h-10 cursor-pointer transition-all relative", {
              "opacity-20": selectedCategory?.id === category.id,
            })}
            onClick={() => {
              setSelectedCategory(category);
            }}
          >
            <Image
              fill
              className="object-contain"
              alt={`category-${category.name
                .split(" ")
                .join("-")
                .toLocaleLowerCase()}`}
              src={`${MEDIA_URL}/${category.image}`}
            />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Categories;
