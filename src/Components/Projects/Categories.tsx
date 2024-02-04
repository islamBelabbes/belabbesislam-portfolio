"use client";
import { cn } from "@/libs/utility";
import Image from "next/image";
import React, { useState } from "react";

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  return (
    <div className="flex justify-center ">
      <ul className="flex flex-wrap justify-center w-full gap-6">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <button onClick={() => setSelectedCategory(index)}>
              <li
                key={index}
                className={cn(
                  "w-10 h-10 cursor-pointer transition-all relative",
                  {
                    "opacity-20": selectedCategory === index,
                  }
                )}
              >
                <Image
                  fill
                  className="object-contain"
                  alt="category"
                  src={`/icon-postgresql.png`}
                />
              </li>
            </button>
          ))}
      </ul>
    </div>
  );
}

export default Categories;
