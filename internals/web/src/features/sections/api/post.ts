import { api } from "@/lib/api"
import type { CreateSectionPayload } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateSectionMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CreateSectionPayload) => {
      await api.post("/sections", data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['bookmarks', 'sections'] })
    },
  })
}
