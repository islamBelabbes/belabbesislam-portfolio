"use client";
import Image from "next/image";

import { ColumnDef } from "@tanstack/react-table";
import { Link as LinkIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import CategoriesTag from "@/components/CategoriesTag";
import { MEDIA_URL } from "@/constants/constants";
import { Category } from "@/dto/categories";
import { Project } from "@/dto/projects";
import Actions from "./actions";

export const columns: ColumnDef<Project>[] = [
  {
    id: "id",
  },
  {
    accessorKey: "image",
    header: "Image",
    size: 300,
    cell({ getValue }) {
      return (
        <div className="w-full h-[200px] relative rounded">
          <Image
            src={`${MEDIA_URL}/${getValue<string>()}`}
            alt="image"
            fill
            className="object-cover rounded"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    size: 200,
  },

  {
    accessorKey: "categories",
    header: "Categories",
    cell({ getValue }) {
      let categories = getValue<Category[]>();

      const take = 4;
      let Remaining = 0;

      if (categories.length > take) {
        Remaining = categories.length - take;
        categories = categories.slice(0, take);
      }

      return (
        <div className="flex gap-2">
          {categories
            .filter((__, index) => (Remaining ? index !== 0 : true))
            .map((category) => (
              <CategoriesTag key={category.id} item={category} />
            ))}

          {Remaining ? (
            <div className="relative">
              <span className="absolute w-full h-full bg-white opacity-[0.9] font-bold flex justify-center items-center ">
                + {Remaining}
              </span>
              <CategoriesTag key={categories[0].id} item={categories[0]} />
            </div>
          ) : null}
        </div>
      );
    },
  },
  {
    accessorKey: "url",
    header: "Url",
    size: 100,
    cell({ getValue }) {
      return (
        <a
          className={cn({
            "opacity-30 cursor-not-allowed": !getValue<string>(),
          })}
          href={!getValue<string>() ? undefined : getValue<string>()}
          target="_blank"
        >
          <LinkIcon />
        </a>
      );
    },
  },
  {
    id: "actions",
    size: 100,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Actions
          deleteRoute={`projects/${data.id}`}
          updateRoute={`/dashboard/project/${data.id}`}
        />
      );
    },
  },
];
