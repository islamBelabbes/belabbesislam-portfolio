"use client";

import { use, useEffect, useState } from "react";

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
import { type TProject } from "@/types";
import { columns } from "./columns";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProjectsTableData } from "@/lib/api";
import ReactPaginate from "react-paginate";
import { buttonVariants } from "@/components/ui/button";
import { projectsTableDataLimit } from "@/constants/constants";
import { ClipLoader } from "react-spinners";

type TCategoriesTableProps = {
  initialData: {
    data: TProject[];
    total: number;
    hasNext: boolean;
  };
  withPaginate?: boolean;
};

export function ProjectsTable({
  initialData,
  withPaginate = false,
}: TCategoriesTableProps) {
  const [paddingColumns, setPaddingColumns] = useState<number[]>([]);

  const [isMounted, setIsMounted] = useState(false);

  const [page, setPage] = useState(0);

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

  const { data, isPlaceholderData, isLoading } = useQuery({
    queryKey: ["projects_table_data", page],
    queryFn: () =>
      fetchProjectsTableData({ index: page, limit: projectsTableDataLimit }),
    placeholderData: keepPreviousData,
  });
  const tableData = data;

  const tableMeta = {
    handleDelete: (id: number) => {
      return setDeleteModal({ isOpen: true, targetId: id });
    },
    paddingColumns,
  };

  const table = useReactTable({
    data: tableData?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: tableMeta,
    initialState: {
      columnVisibility: { id: false },
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center">
        <ClipLoader />
      </div>
    );

  return (
    <div>
      <DeleteModal
        isOpen={deleteModal.isOpen}
        setIsOpen={(open) =>
          setDeleteModal((prev) => {
            return { ...prev, isOpen: open };
          })
        }
        onDelete={onDelete}
      />

      <Table className="rounded-md border">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="relative">
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

              {isMounted && isPlaceholderData && (
                <div className="right-8 absolute top-[50%] translate-y-[-50%]">
                  <ClipLoader size={24} />
                </div>
              )}
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
                  <TableCell
                    key={cell.id}
                    className={cell.id.replace("0_", "")}
                  >
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
      {withPaginate && tableData?.total && (
        <ReactPaginate
          className="flex gap-4 items-center justify-end py-2"
          nextLinkClassName={buttonVariants({ variant: "default" })}
          previousLinkClassName={buttonVariants({ variant: "default" })}
          activeClassName="text-secondary"
          breakLabel="..."
          nextLabel="next >"
          onPageChange={(param) => setPage(param.selected)}
          pageRangeDisplayed={5}
          pageCount={Math.round(tableData?.total / projectsTableDataLimit)}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          disabledClassName="cursor-not-allowed opacity-40"
        />
      )}
    </div>
  );
}
