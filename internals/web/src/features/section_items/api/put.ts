import { api } from "@/lib/api"
import type { UpdateSectionItemPayload } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateSectionItemMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, payload }: { id: number, payload: UpdateSectionItemPayload }) => {
      await api.put(`/section_items/${id}`, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarks"]
      })
    }

  })
}
