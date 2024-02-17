"use client";

import { useState } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteModal from "@/components/Modals/DeleteModal";

interface ProjectsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

type TDeleteModal = {
  isOpen: boolean;
  targetId: string | null;
};

export function ProjectsTable<TData, TValue>({
  columns,
  data,
}: ProjectsTableProps<TData, TValue>) {
  const [deleteModal, setDeleteModal] = useState<TDeleteModal>({
    isOpen: false,
    targetId: null,
  });

  const tableMeta = {
    handleDelete: (id: string) =>
      setDeleteModal((prev) => {
        return { isOpen: true, targetId: id };
      }),
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: tableMeta,
  });

  return (
    <div className="rounded-md border">
      <DeleteModal
        isOpen={deleteModal.isOpen}
        setIsOpen={(open) =>
          setDeleteModal((prev) => {
            return { ...prev, isOpen: open };
          })
        }
        onDelete={() => console.log(deleteModal.targetId)}
      />

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
