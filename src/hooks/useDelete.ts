import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from '@/config/axios';

/**
 * @description useDelete is a custom hook that wraps around react-query's useMutation hook. It is used to make a **DELETE** request to the backend.
 * @param endpoint - the endpoint to make the request to
 * @param options - the options to be passed to the useMutation hook
 * @param params - the query params to be sent with the request
 */
function useDelete<Res = any>(
  endpoint: string,
  options: UseMutationOptions<Res, Error, number> | null = null,
  params: any = null,
) {
  const queryClient = useQueryClient();
  const key = endpoint.split('/')[1];

  return useMutation({
    ...options,
    mutationFn: async (id?: number) => {
      const requestEndpoint = id ? `${endpoint}/${id}` : endpoint;
      const res = await axios.delete<Res>(requestEndpoint, {params});
      return res.data;
    },
    onSuccess: (...props) => {
      queryClient.invalidateQueries({queryKey: [key]});
      options?.onSuccess && options.onSuccess(...props);
    },
  });
}

export default useDelete;
