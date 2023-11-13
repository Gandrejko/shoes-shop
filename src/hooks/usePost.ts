import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from '@/config/axios';

/**
 * @description usePost is a custom hook that wraps around react-query's useMutation hook. It is used to make a **POST** request to the backend.
 * @param endpoint - the endpoint to make the request to
 * @param options - the options to be passed to the useMutation hook
 * @param params - the query params to be sent with the request
 */
function usePost<Req = any, Res = any>(
  endpoint: string,
  options: UseMutationOptions<Res, Error, Req> | null = null,
  params: any = null,
) {
  const queryClient = useQueryClient();
  const key = endpoint.split('/')[1];

  return useMutation<Res, Error, Req>({
    ...options,
    mutationFn: async newData => {
      const res = await axios.post<Res>(endpoint, newData, {params});
      return res.data;
    },
    onSuccess: (...props) => {
      queryClient.invalidateQueries({queryKey: [key]});
      options?.onSuccess && options.onSuccess(...props);
    },
  });
}

export default usePost;
