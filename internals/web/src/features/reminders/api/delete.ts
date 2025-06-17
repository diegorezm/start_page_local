import { api } from "@/lib/api"

import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteReminderMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/reminders/${id}`)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["reminders"]
      })
    },
    onError: (e) => console.error(e)
  })
}
