"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TProject } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Link as LinkIcon, MoreHorizontal } from "lucide-react";
import Image from "next/image";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ClipLoader } from "react-spinners";

export const columns: ColumnDef<TProject>[] = [
  {
    id: "id",
    enableHiding: true,
  },
  {
    accessorKey: "image",
    header: "Image",
    size: 300,
    cell({ getValue }) {
      return (
        <div className="w-full h-[200px] relative rounded">
          <Image
            src={`${
              process.env.NEXT_PUBLIC_SUPABASE_MEDIA_URL
            }/projects/${getValue<string>()}`}
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
    size: 300,
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
    size: 500,
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
                <Link href={`/dashboard/project/${data.id}`}>Edit Project</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => meta?.handleDelete?.(data.id)}>
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {meta?.paddingColumns?.includes(data.id) && <ClipLoader size={14} />}
        </div>
      );
    },
  },
];
