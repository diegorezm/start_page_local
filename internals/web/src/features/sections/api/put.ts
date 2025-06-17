import { api } from "@/lib/api";

import type { Section, UpdateSectionPayload } from "@/types"

import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateSectionMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, payload }: { id: number, payload: UpdateSectionPayload }) => {
      const response = await api.put<Section>(`/sections/${id}`, { ...payload, id });
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
      await queryClient.invalidateQueries({ queryKey: ['sections'] })
    },
    onError: (e: Error) => {
      console.error("Failed to update section")
      return e
    },
  })
}
