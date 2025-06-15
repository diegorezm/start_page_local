import { api } from "@/lib/api"
import type { CreateSectionPayload } from "@/types"
import { useMutation } from "@tanstack/react-query"

export const useCreateSectionMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateSectionPayload) => {
      await api.post("/sections", data)
    },
    onError: (e: Error) => {
      console.error(`Error creating section: ${e}`)
      return e
    },
  })
}
