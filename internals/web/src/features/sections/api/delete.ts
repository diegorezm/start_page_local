import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteSectionMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      const url = `/sections/${id}`;
      await api.delete(url);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
      await queryClient.invalidateQueries({ queryKey: ['sections'] })
    },
  })
}
