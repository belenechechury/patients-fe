import type { IPaginatedResponse, IPatient } from '@/features/patients/types';
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

const BASE_URL = `${import.meta.env.VITE_API_URL}/patients`;

const patients = {
  list: async ({
    page = 1,
    pageSize = 10,
    search = "",
    sortBy = "firstName"
  }): Promise<IPaginatedResponse<IPatient>> => {
    const response = await axios.get<IPaginatedResponse<any>>(BASE_URL, {
      params: { page, pageSize, search, sortBy },
    });

    return camelcaseKeys(response.data, { deep: true });
  },

  getPatient: async (id: number): Promise<IPatient> => {
    const response = await axios.get<IPatient>(`${BASE_URL}/${id}`);
    return camelcaseKeys(response.data, { deep: true });
  },

  createPatient: async (payload: Partial<IPatient>): Promise<IPatient> => {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as string | Blob);
      }
    });

    const response = await axios.post<IPatient>(BASE_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return camelcaseKeys(response.data, { deep: true });
  },

  updatePatient: async (id: number, payload: Partial<IPatient>): Promise<IPatient> => {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as string | Blob);
      }
    });

    const response = await axios.post<IPatient>(`${BASE_URL}/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      method: 'PUT',
    });

    return camelcaseKeys(response.data, { deep: true });
  },

  deletePatient: async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};

export default patients;
