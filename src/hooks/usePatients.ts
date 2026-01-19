import patients from '@/api/patients';
import type { IPaginatedResponse, IPatient } from '@/features/patients/types';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface UsePatientsParams {
  search?: string;
  sortBy?: keyof IPatient;
  pageSize?: number;
}

export const usePatients = ({
  search = '',
  sortBy = 'firstName',
  pageSize = 10,
}: UsePatientsParams) => {
    const query = useInfiniteQuery({
      queryKey: ['patients', search, sortBy],
      queryFn: async ({ pageParam = 1 }: {pageParam: number}) => {
        return patients.list({ page: pageParam, pageSize, search, sortBy });
      },
      getNextPageParam: (lastPage) =>
        lastPage.meta.currentPage < lastPage.meta.lastPage
          ? lastPage.meta.currentPage + 1
          : undefined,
      staleTime: 5000,
      initialPageParam: 1
    });

  const data = query.data;

  const patientsList: IPatient[] =
    data?.pages.flatMap((page) => page.data) ?? [];

  const lastPage = data?.pages[data.pages.length - 1];

  return {
    patients: patientsList,
    meta: lastPage?.meta,
    links: lastPage?.links,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    refetch: query.refetch,
  };
};

export const usePatient = (id?: number) => {
  const query = useQuery({
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

export const useCreatePatient = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: Partial<IPatient>) => patients.createPatient(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['patients'] }),
  });

  return mutation;
};

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<IPatient> }) =>
      patients.updatePatient(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({ queryKey: ['patient', id] });
    },
  });

  return mutation;
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number) => patients.deletePatient(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['patients'] }),
  });

  return mutation;
};
