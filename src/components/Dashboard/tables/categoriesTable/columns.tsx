"use client";

import BlockUi from "@/components/BlockUi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TCategory } from "@/types";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ClipLoader } from "react-spinners";

export const columns: ColumnDef<TCategory>[] = [
  {
    id: "id",
    enableHiding: true,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell({ getValue }) {
      return (
        <div className="w-[50px] h-[50px] relative">
          <Image
            src={`${
              process.env.NEXT_PUBLIC_SUPABASE_MEDIA_URL
            }/categories/${getValue<string>()}`}
            alt="image"
            fill
            className="object-contain"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    id: "actions",
    cell: ({ row, table }) => {
      const data = row.original;
      const meta = table.options.meta;

      return (
        <div className="w-full flex justify-between items-center">
          <DropdownMenu modal>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href={`/dashboard/category/${data.id}`}>
                  Edit category
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => meta?.handleDelete?.(data.id)}>
                Delete category
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {meta?.paddingColumns?.includes(data.id) && <ClipLoader size={14} />}
        </div>
      );
    },
  },
];
