import {UseQueryOptions, useQuery} from '@tanstack/react-query';
import axios from '@/services/axios';

type Props = {
  endpoint: string;
  params?: any; // TODO: add type for query
};

/**
 * @description useGetRequest is a custom hook that wraps around react-query's useQuery hook. It is used to make a **GET** request to the backend.
 * @param endpoint - the endpoint to make the request to
 * @param params - the query params to be sent with the request
 * @param options - the options to be passed to the useQuery hook
 */
function useGetRequest<Req = any, Res = any>({
  endpoint,
  params,
  ...options
}: Props & Partial<UseQueryOptions<Res, Error>>) {
  const key = endpoint.split('/')[1];

  return useQuery<Res, Error>({
    ...options,
    queryKey: [key, params],
    queryFn: async () => {
      const res = await axios.get<Res>(endpoint, {
        params,
      });
      return res.data;
    },
  });
}

export default useGetRequest;
