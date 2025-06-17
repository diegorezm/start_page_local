import { api } from "@/lib/api"
import type { CreateSectionItemPayload } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateSectionItemMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: CreateSectionItemPayload) => {
      await api.post("/section_items", payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarks"]
      })
    }
  })
}
