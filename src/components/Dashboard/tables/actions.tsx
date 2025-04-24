"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteEntryMutation } from "@/lib/react-query/mutations";
import { safeAsync } from "@/lib/safe";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type TTableActionsProps = {
  updateRoute: string;
  deleteRoute: string;
};

function TableActions({ deleteRoute, updateRoute }: TTableActionsProps) {
  const router = useRouter();

  const mutation = useDeleteEntryMutation();

  const handleEdit = () => {
    router.push(updateRoute);
  };

  const handleDelete = async () => {
    if (confirm("are you sure?")) {
      const deleted = await safeAsync(mutation.mutateAsync(deleteRoute));
      if (!deleted.success) return toast.error("something went wrong");

      toast.success("resource deleted successfully");
      return router.refresh();
    }
  };

  return (
    <div className="flex w-full items-center justify-between">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild disabled={mutation.isPending}>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">فتح</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer" onClick={handleEdit}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={handleDelete}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default TableActions;
