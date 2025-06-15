import { api } from "@/lib/api";
import type { Section, SectionWithItems } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetAllSectionsWithItems = () => {
  return useQuery<SectionWithItems[], Error>({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const response = await api.get("/sections", {
        params: { include_items: true },
      });

      return response.data;
    }
  })
}


export const useGetAllSections = () => {
  return useQuery<Section[], Error>({
    queryKey: ["sections"],
    queryFn: async () => {
      const response = await api.get("/sections");
      return response.data;
    }
  })
}

export const useGetSectionById = (id?: number) => {
  return useQuery<Section, Error>({
    queryKey: ["section", { id }],
    queryFn: async () => {
      const response = await api.get(`/sections/${id}`);
      return response.data;
    },
    enabled: !!id
  })
}
