"use client";

import {
  ColumnDef,
  RowData,
  TableMeta,
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
import useDeleteEntry from "@/hooks/useDeleteEntry";
import DeleteModal from "@/components/Modals/DeleteModal";
import { useState } from "react";

interface CategoriesTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function CategoriesTable<TData, TValue>({
  columns,
  data,
}: CategoriesTableProps<TData, TValue>) {
  const [paddingColumns, setPaddingColumns] = useState<number[]>([]);

  const { deleteModal, onDelete, setDeleteModal } = useDeleteEntry({
    endpoint: "delete_category",
    onMutate: ({ id }) => {
      return setPaddingColumns((prev) => {
        return [...prev, id];
      });
    },
    onSettled: ({ id }) => {
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
    initialState: {
      columnVisibility: { id: false },
    },
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
        onDelete={onDelete}
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
