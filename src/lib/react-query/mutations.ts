import { useMutation } from "@tanstack/react-query";
import { deleteEntry } from "../api";

export const useDeleteEntryMutation = () => {
  return useMutation({
    mutationFn: (route: string) => {
      return deleteEntry(route);
    },
    mutationKey: ["delete-entry"],
  });
};
