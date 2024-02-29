"use client";

import { TCategory } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import Actions from "../Actions";

export const columns: ColumnDef<TCategory>[] = [
  {
    id: "id",
    accessorKey: "id",
    enableHiding: true,
  },
  {
    header: "Image",
    accessorKey: "image",
    cell({ getValue }) {
      const url = `${
        process.env.NEXT_PUBLIC_SUPABASE_MEDIA_URL
      }/categories/${getValue<string>()}`;

      return (
        <div className="w-[50px] h-[50px] relative">
          <Image src={url} alt="image" fill className="object-contain" />
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
    cell: ({ row, table }) => {
      const data = row.original;
      const meta = table.options.meta;
      const isLoading = meta?.paddingColumns?.includes(data.id) || false;
      return (
        <Actions
          id={data.id}
          isLoading={isLoading}
          onDelete={(id) => meta?.handleDelete?.(id)}
          editPath="dashboard/category"
          label="category"
        />
      );
    },
  },
];
