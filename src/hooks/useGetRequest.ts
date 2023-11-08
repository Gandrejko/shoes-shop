import {UseQueryOptions, useQuery} from '@tanstack/react-query';
import APIClient from '@/services/api-client';

type Props = {
  endpoint: string;
  params?: any; // TODO: add type for query
};

function useGetRequest<Req = any, Res = any>({
  endpoint,
  params,
  ...options
}: Props & Partial<UseQueryOptions<Res, Error>>) {
  const apiClient = new APIClient<Req, Res>(endpoint);
  const key = endpoint.split('/')[1];

  return useQuery<Res, Error>({
    ...options,
    queryKey: [key, params],
    queryFn: () => {
      return apiClient.get({params});
    },
  });
}

export default useGetRequest;
