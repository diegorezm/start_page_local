
import axios from 'axios';
import type {
  Section,
  SectionWithItems,
  CreateSectionPayload,
  UpdateSectionPayload,
} from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

export const sectionService = {
  getAllSectionsWithItems: async (): Promise<SectionWithItems[]> => {
    try {
      const url = `${API_BASE_URL}/sections`;
      const response = await axios.get(url, {
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
      const url = `${API_BASE_URL}/sections`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching sections:', error);
      throw error;
    }
  },

  getSectionById: async (id: number): Promise<Section> => {
    try {
      const url = `${API_BASE_URL}/sections/${id}`;
      const response = await axios.get<Section>(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching section ${id}:`, error);
      throw error;
    }
  },

  createSection: async (payload: CreateSectionPayload): Promise<Section> => {
    try {
      const url = `${API_BASE_URL}/sections`;
      const response = await axios.post<Section>(url, payload);
      return response.data;
    } catch (error) {
      console.error('Error creating section:', error);
      throw error;
    }
  },

  updateSection: async (id: number, payload: UpdateSectionPayload): Promise<Section> => {
    try {
      const url = `${API_BASE_URL}/sections/${id}`;
      const response = await axios.put<Section>(url, { ...payload, id });
      return response.data;
    } catch (error) {
      console.error(`Error updating section ${id}:`, error);
      throw error;
    }
  },

  deleteSection: async (id: number): Promise<void> => {
    try {
      const url = `${API_BASE_URL}/sections/${id}`;
      await axios.delete(url);
    } catch (error) {
      console.error(`Error deleting section ${id}:`, error);
      throw error;
    }
  },
};
