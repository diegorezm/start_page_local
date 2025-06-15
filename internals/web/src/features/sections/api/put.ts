import { api } from "@/lib/api";

import type { Section, UpdateSectionPayload } from "@/types"

import { useMutation } from "@tanstack/react-query"

export const useUpdateSectionMutation = () => {
  return useMutation({
    mutationFn: async ({ id, payload }: { id: number, payload: UpdateSectionPayload }) => {
      const response = await api.put<Section>(`/sections/${id}`, { ...payload, id });
      return response.data;
    },
    onSuccess: () => {
      console.log("Section updated successfully")
    },
    onError: (e: Error) => {
      console.error("Failed to update section")
      return e
    },
  })
}
