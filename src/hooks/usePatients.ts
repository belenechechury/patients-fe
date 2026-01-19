import { useQuery, useMutation, useQueryClient, type UseQueryResult, type UseMutationResult } from '@tanstack/react-query';
import patients from '@/api/patients';
import type { IPaginatedResponse, IPatient } from '@/features/patients/types';

export const usePatients = (page = 1) => {
   const query = useQuery({
    queryKey: ['patients', page] as const,
    queryFn: async (): Promise<IPaginatedResponse<IPatient>> => {
      return patients.list(page);
    },
    staleTime: 5000,
  });

  return {
    patients: query.data?.data ?? [],
    meta: query.data?.meta,
    links: query.data?.links,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

export const usePatient = (id?: number) => {
  const query: UseQueryResult<IPatient, Error> = useQuery({
    queryKey: ['patient', id],
    queryFn: () => {
      if (!id) throw new Error('Patient ID is required');
      return patients.getPatient(id);
    },
    enabled: !!id,
  });

  return {
    patient: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useCreatePatient = (): {
  createPatient: (payload: Partial<IPatient>) => void;
  mutation: UseMutationResult<IPatient, Error, Partial<IPatient>>;
} => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: Partial<IPatient>) => patients.createPatient(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['patients'] }),
  });

  return {
    createPatient: mutation.mutate,
    mutation,
  };
};

export const useUpdatePatient = (): {
  updatePatient: (args: { id: number; payload: Partial<IPatient> }) => void;
  mutation: UseMutationResult<IPatient, Error, { id: number; payload: Partial<IPatient> }>;
} => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<IPatient> }) => patients.updatePatient(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({ queryKey: ['patient', id] });
    },
  });

  return {
    updatePatient: mutation.mutate,
    mutation,
  };
};

export const useDeletePatient = (): {
  deletePatient: (id: number) => void;
  mutation: UseMutationResult<void, Error, number>;
} => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number) => patients.deletePatient(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['patients'] }),
  });

  return {
    deletePatient: mutation.mutate,
    mutation,
  };
};
