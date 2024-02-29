import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { ClipLoader } from "react-spinners";

type TActions = {
  isLoading: boolean;
  id: number;
  onDelete: (id: number) => void;
  editPath: string;
  label: string;
};
function Actions({ id, isLoading, onDelete, editPath, label }: TActions) {
  return (
    <div className="w-full flex justify-between items-center">
      <DropdownMenu modal>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" disabled={isLoading}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href={`/${editPath}/${id}`}>Edit {label}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(id)}>
            Delete {label}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isLoading && <ClipLoader size={14} />}
    </div>
  );
}

export default Actions;
