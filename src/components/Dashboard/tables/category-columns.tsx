"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Category } from "@/dto/categories";
import Actions from "./actions";
import { MEDIA_URL } from "@/constants/constants";

export const columns: ColumnDef<Category>[] = [
  {
    id: "id",
  },
  {
    size: 300,
    header: "Image",
    accessorKey: "image",
    cell({ getValue }) {
      return (
        <div className="w-[50px] h-[50px] relative">
          <Image
            src={`${MEDIA_URL}/${getValue<string>()}`}
            alt="image"
            fill
            className="object-contain"
          />
        </div>
      );
    },
  },
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
  },
  {
    id: "actions",
    size: 100,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Actions
          deleteRoute={`categories/${data.id}`}
          updateRoute={`/dashboard/category/${data.id}`}
        />
      );
    },
  },
];
