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
import Link from "next/link";
import { cn } from "@/lib/utils";
type TTProjects = Partial<TProject>;
export const columns: ColumnDef<TTProjects>[] = [
  {
    id: "id",
    enableHiding: true,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell({ getValue }) {
      return (
        <div className="w-full h-[150px] relative rounded">
          <Image
            src={getValue<string>()}
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
  },

  // {
  //   accessorKey: "categories",
  //   header: "Categories",
  //   cell({ getValue }) {
  //     const categories = getValue<TCategory[]>();
  //     return (
  //       <div className="flex gap-3">
  //         {categories.map((category) => (
  //           <CategoriesTag key={category.id} item={category} />
  //         ))}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "url",
    header: "Url",
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
    cell: ({ row, table, column }) => {
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
              <DropdownMenuItem>
                <Link href={`/dashboard/project/${data.id}`}>Edit Project</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => meta?.handleDelete?.(row.id)}>
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <ClipLoader size={14} /> */}
        </div>
      );
    },
  },
];
