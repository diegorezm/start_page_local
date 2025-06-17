import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteSectionItemMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/section_items/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarks"]
      })
    }
  })
}
