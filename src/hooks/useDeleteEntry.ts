import { useState } from "react";

import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next13-progressbar";

import useSupabaseWithAuth from "./useSupabaseWithAuth";
import { tryCatch } from "@/lib/utils";
type TDeleteModal = {
  isOpen: boolean;
  targetId: number | null;
};

type TUseDeleteEntry = {
  endpoint: "delete_category" | "delete_project";
  onSettled?: (data: mutateData) => void;
  onMutate?: (data: mutateData) => void;
};

type mutateData = {
  id: number;
};
const useDeleteEntry = ({ endpoint, onSettled, onMutate }: TUseDeleteEntry) => {
  const [deleteModal, setDeleteModal] = useState<TDeleteModal>({
    isOpen: false,
    targetId: null,
  });
  const router = useRouter();

  const { createSupabaseClient } = useSupabaseWithAuth();

  const { mutateAsync } = useMutation({
    async mutationFn(data: mutateData) {
      const supabase = await createSupabaseClient();
      const { error } = await supabase.rpc(endpoint, { id: data.id });

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

export default useDeleteEntry;
