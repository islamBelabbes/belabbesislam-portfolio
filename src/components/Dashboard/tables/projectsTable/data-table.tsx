"use client";

import { use, useState } from "react";

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

import useDeleteEntry from "@/hooks/useDeleteEntry";

interface ProjectsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ProjectsTable<TData, TValue>({
  columns,
  data,
}: ProjectsTableProps<TData, TValue>) {
  const [paddingColumns, setPaddingColumns] = useState<number[]>([]);

  const { deleteModal, onDelete, setDeleteModal } = useDeleteEntry({
    endpoint: "delete_project",
    onMutate: ({ id }: { id: number }) => {
      return setPaddingColumns((prev) => {
        return [...prev, id];
      });
    },
    onSettled: ({ id }: { id: number }) => {
      return setPaddingColumns((prev) => {
        return prev.filter((col) => col !== id);
      });
    },
  });

  const tableMeta = {
    handleDelete: (id: number) => {
      return setDeleteModal({ isOpen: true, targetId: id });
    },
    paddingColumns,
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: tableMeta,
    initialState: {
      columnVisibility: { id: false },
    },
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
        onDelete={onDelete}
      />

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    data-is={header.index}
                    key={header.id}
                    style={{ width: header.getSize() }}
                  >
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
