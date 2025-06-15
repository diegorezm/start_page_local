import { api } from "@/lib/api"
import type { CreateSectionItemPayload } from "@/types"
import { useMutation } from "@tanstack/react-query"

export const useCreateSectionItemMutation = () => {
  return useMutation({
    mutationFn: async (payload: CreateSectionItemPayload) => {
      await api.post("/section_items", payload)
    }
  })
}
