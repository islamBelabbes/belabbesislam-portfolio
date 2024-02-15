"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TCategory, TProject } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Link as LinkIcon, MoreHorizontal } from "lucide-react";
import Image from "next/image";

import CategoriesTag from "@/components/CategoriesTag";
type TTProjects = Partial<TProject>;
export const columns: ColumnDef<TTProjects>[] = [
  {
    accessorKey: "title",
    header: "Title",
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
    accessorKey: "categories",
    header: "Categories",
    cell({ getValue }) {
      const categories = getValue<TCategory[]>();
      return (
        <div className="flex gap-3">
          {categories.map((category) => (
            <CategoriesTag key={category.id} item={category} />
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "url",
    header: "Url",
    cell({ getValue }) {
      return (
        <a href={getValue<string>()} target="_blank">
          <LinkIcon />
        </a>
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
              <DropdownMenuItem>Edit Project</DropdownMenuItem>
              <DropdownMenuItem>Delete Project</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <ClipLoader size={14} /> */}
        </div>
      );
    },
  },
];
