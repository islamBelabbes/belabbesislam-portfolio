import { useState } from "react";
import useSupabaseWithAuth from "./useSupabaseWithAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { tryCatch } from "@/lib/utils";
type TDeleteModal = {
  isOpen: boolean;
  targetId: number | null;
};

type TUseDelete = {
  table: "projects" | "categories";
  onSettled?: (data: mutateData) => void;
  onMutate?: (data: mutateData) => void;
};

type mutateData = {
  id: number;
};
const useDelete = ({ table, onSettled, onMutate }: TUseDelete) => {
  const [deleteModal, setDeleteModal] = useState<TDeleteModal>({
    isOpen: false,
    targetId: null,
  });
  const router = useRouter();

  const { createSupabaseClient } = useSupabaseWithAuth();

  const { mutateAsync } = useMutation({
    async mutationFn(data: mutateData) {
      const supabase = await createSupabaseClient();
      const { error } = await supabase.from(table).delete().eq("id", data.id);

      if (error) throw error;
      return true;
    },

    onMutate(variables) {
      return onMutate?.(variables);
    },

    onSettled(data, error, variables, context) {
      return onSettled?.(variables);
    },
  });

  const onDelete = async () => {
    if (!deleteModal.targetId) return;

    const { error } = await tryCatch(mutateAsync({ id: deleteModal.targetId }));

    if (error) toast.error("something went wrong");
    router.refresh();
  };

  return {
    deleteModal,
    setDeleteModal,
    onDelete,
  };
};

export default useDelete;
