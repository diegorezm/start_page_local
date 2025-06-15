import { api } from '@/lib/api';

import type {
  Section,
  SectionWithItems,
  CreateSectionPayload,
  UpdateSectionPayload,
} from '@/types';

export const sectionService = {
  getAllSectionsWithItems: async (): Promise<SectionWithItems[]> => {
    try {
      const response = await api.get("/sections", {
        params: { include_items: true },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching sections:', error);
      throw error;
    }
  },

  getAllSections: async (): Promise<Section[]> => {
    try {
      const response = await api.get("/sections");
      return response.data;
    } catch (error) {
      console.error('Error fetching sections:', error);
      throw error;
    }
  },

  getSectionById: async (id: number): Promise<Section> => {
    try {
      const response = await api.get<Section>(`/sections/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching section ${id}:`, error);
      throw error;
    }
  },

  createSection: async (payload: CreateSectionPayload): Promise<Section> => {
    try {
      const response = await api.post<Section>("/sections", payload);
      return response.data;
    } catch (error) {
      console.error('Error creating section:', error);
      throw error;
    }
  },

  updateSection: async (id: number, payload: UpdateSectionPayload): Promise<Section> => {
    try {
      const response = await api.put<Section>(`/sections/${id}`, { ...payload, id });
      return response.data;
    } catch (error) {
      console.error(`Error updating section ${id}:`, error);
      throw error;
    }
  },

  deleteSection: async (id: number): Promise<void> => {
    try {
      const url = `/sections/${id}`;
      await api.delete(url);
    } catch (error) {
      console.error(`Error deleting section ${id}:`, error);
      throw error;
    }
  },
};
