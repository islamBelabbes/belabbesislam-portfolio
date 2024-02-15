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
import { ClipLoader } from "react-spinners";

type TTCategory = Partial<TCategory>;

export const columns: ColumnDef<TTCategory>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell({ getValue }) {
      return (
        <div className="w-fit h-fit">
          <Image src={getValue<string>()} alt="image" width={50} height={50} />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "actions",
    cell: ({ row, table }) => {
      const data = row.original;
      const meta = table.options.meta;

      return (
        <div className="w-full flex justify-between">
          <DropdownMenu modal>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit Category</DropdownMenuItem>
              <DropdownMenuItem>Delete Category</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <ClipLoader size={14} /> */}
        </div>
      );
    },
  },
];
