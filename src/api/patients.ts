import type { IPaginatedResponse, IPatient } from '@/features/patients/types';
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import { snakeCase } from 'snake-case';

const BASE_URL = `${import.meta.env.VITE_API_URL}/patients`;

const patients = {
  list: async ({
    page = 1,
    pageSize = 10,
    search,
    sortBy,
    createdFrom,
    createdTo
  }: {
    page?: number;
    pageSize?: number;
    search?: string;
    sortBy?: string;
    createdFrom?: string;
    createdTo?: string;
  }): Promise<IPaginatedResponse<IPatient>> => {
    const params: Record<string, any> = {
      page,
      page_size: pageSize,
      ...(search ? { search } : {}),
      ...(sortBy ? { sort_by: snakeCase(sortBy) } : {}),
      ...(createdFrom ? { created_from: createdFrom } : {}),
      ...(createdTo ? { created_to: createdTo } : {}),
    };

    const response = await axios.get<IPaginatedResponse<IPatient>>(BASE_URL, { params });
    return camelcaseKeys(response.data, { deep: true });
  },

  getPatient: async (id: number): Promise<IPatient> => {
    const response = await axios.get<IPatient>(`${BASE_URL}/${id}`);
    return camelcaseKeys(response.data, { deep: true });
  },

  createPatient: async (payload: Partial<IPatient>, imageFile: File): Promise<IPatient> => {
    const formData = new FormData();
    const snakePayload = snakecaseKeys(payload, { deep: true });

    Object.entries(snakePayload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    if (imageFile) formData.append('document_image', imageFile)

    const response = await axios.post<IPatient>(BASE_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return camelcaseKeys(response.data, { deep: true });
  },

  updatePatient: async (id: number, payload: Partial<IPatient>, imageFile?: File): Promise<IPatient> => {
    const formData = new FormData();
    const snakePayload = snakecaseKeys(payload, { deep: true });

    Object.entries(snakePayload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    if (imageFile) formData.append('document_image', imageFile)

    const response = await axios.put<IPatient>(`${BASE_URL}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return camelcaseKeys(response.data, { deep: true });
  },

  deletePatient: async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};

export default patients;
