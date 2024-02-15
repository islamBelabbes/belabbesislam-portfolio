"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

type CategoryProps = {
  selectedCategory: number | null;
  id: number;
  setSelectedCategory: React.Dispatch<React.SetStateAction<number | null>>;
};
function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  return (
    <div className="flex justify-center ">
      <ul className="flex flex-wrap justify-center w-full gap-6">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <Category
              key={index}
              id={index}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          ))}
      </ul>
    </div>
  );
}

function Category({
  setSelectedCategory,
  selectedCategory,
  id,
}: CategoryProps) {
  return (
    <button onClick={() => setSelectedCategory(id)}>
      <li
        className={cn("w-10 h-10 cursor-pointer transition-all relative", {
          "opacity-20": selectedCategory === id,
        })}
      >
        <Image
          fill
          className="object-contain"
          alt="category"
          src={`/icon-postgresql.png`}
        />
      </li>
    </button>
  );
}

export default Categories;
