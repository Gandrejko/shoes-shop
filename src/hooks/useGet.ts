import {UseQueryOptions, useQuery} from '@tanstack/react-query';
import axios from '@/config/axios';

/**
 * @description useGet is a custom hook that wraps around react-query's useQuery hook. It is used to make a **GET** request to the backend.
 * @param endpoint - the endpoint to make the request to
 * @param options - the options to be passed to the useQuery hook
 * @param params - the query params to be sent with the request
 */
function useGet<Res = any>(
  endpoint: string,
  options: Partial<UseQueryOptions<Res>> | null = null,
  params: any = null,
) {
  const key = endpoint.split('/')[1];

  return useQuery({
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

export default useGet;
