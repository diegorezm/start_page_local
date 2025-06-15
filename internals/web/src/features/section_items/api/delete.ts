import { api } from "@/lib/api"
import { useMutation } from "@tanstack/react-query"

export const useDeleteSectionItemMutation = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/section_items/${id}`)
    }
  })
}
