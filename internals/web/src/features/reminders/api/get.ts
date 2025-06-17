import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

import type { Reminder } from "@/types"

export const useGetReminders = (date: Date) => {
  return useQuery({
    queryKey: ["reminders", { date }],
    queryFn: async () => {
      const response = await api.get<Reminder[]>("/reminders", {
        params: { date }
      })
      return response.data
    }
  })
}
