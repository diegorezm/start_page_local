import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query"

export const useDeleteSectionMutation = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const url = `/sections/${id}`;
      await api.delete(url);
    }
  })
}
