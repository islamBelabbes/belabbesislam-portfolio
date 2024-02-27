"use client";
import { createSupabaseClient } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { TCategory } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useMemo } from "react";

type CategoriesProps = {
  selectedCategory: TCategory | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<TCategory | null>>;
};

type CategoryProps = CategoriesProps & { category: TCategory };
function Categories({
  selectedCategory,
  setSelectedCategory,
}: CategoriesProps) {
  const supabase = useMemo(() => createSupabaseClient(), []);

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*,projects!inner(*)");

      if (error) throw new Error("Something went wrong");
      return data.map((item) => ({
        ...item,
        image: `${process.env.NEXT_PUBLIC_SUPABASE_MEDIA_URL}/categories/${item.image}`,
      }));
    },
  });

  if (!data) return;

  return (
    <div className="flex justify-center ">
      <ul className="flex flex-wrap justify-center w-full gap-6">
        {data.map((category) => (
          <Category
            key={category.id}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
            category={category}
          />
        ))}
      </ul>
    </div>
  );
}

function Category({
  setSelectedCategory,
  selectedCategory,
  category,
}: CategoryProps) {
  return (
    <button
      onClick={() => {
        if (selectedCategory?.id === category.id) {
          return setSelectedCategory(null);
        }
        setSelectedCategory(category);
      }}
    >
      <li
        className={cn("w-10 h-10 cursor-pointer transition-all relative", {
          "opacity-20": selectedCategory?.id === category.id,
        })}
      >
        <Image
          fill
          className="object-contain"
          alt="category"
          src={category.image}
        />
      </li>
    </button>
  );
}

export default Categories;
