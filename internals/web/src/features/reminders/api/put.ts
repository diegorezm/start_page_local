import { api } from "@/lib/api"
import type { UpdateReminderPayload } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateRemindersMutation = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: UpdateReminderPayload) => {
      await api.put(`/reminders/${id}`, payload)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["reminders"]
      })
    }
  })
}
