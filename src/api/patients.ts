import type { IPaginatedResponse, IPatient } from '@/features/patients/types';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL}/patients`;

const patients = {
    list: async (page = 1): Promise<IPaginatedResponse<IPatient>> => {
        const response = await axios.get<IPaginatedResponse<IPatient>>(BASE_URL, {
            params: { page },
        });
        return response.data;
    },
    getPatient: async (id: number): Promise<IPatient> => {
        const response = await axios.get<IPatient>(`${BASE_URL}/${id}`);
        return response.data;
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

        return response.data;
    },
    updatePatient: async (
        id: number,
        payload: Partial<IPatient>
    ): Promise<IPatient> => {
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

        return response.data;
    },
    deletePatient: async (id: number): Promise<void> => {
        await axios.delete(`${BASE_URL}/${id}`);
    }
};

export default patients;
