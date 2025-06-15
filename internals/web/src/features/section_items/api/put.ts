import { api } from "@/lib/api"
import type { UpdateSectionItemPayload } from "@/types"
import { useMutation } from "@tanstack/react-query"

export const useUpdateSectionItemMutation = () => {
  return useMutation({
    mutationFn: async ({ id, payload }: { id: number, payload: UpdateSectionItemPayload }) => {
      await api.put(`/section_items/${id}`, payload)
    }
  })
}
