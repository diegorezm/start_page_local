import { api } from "@/lib/api"
import type { CreateReminderPayload } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateRemindersMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: CreateReminderPayload) => {
      await api.post("/reminders", payload)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["reminders"]
      })
    }
  })
}
