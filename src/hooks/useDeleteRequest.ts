import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from '@/services/axios';

type Props = {
  endpoint: string;
  params?: any; // TODO: add type for query
};

/**
 * @description useDeleteRequest is a custom hook that wraps around react-query's useMutation hook. It is used to make a **DELETE** request to the backend.
 * @param endpoint - the endpoint to make the request to
 * @param params - the query params to be sent with the request
 * @param options - the options to be passed to the useMutation hook
 */
function useDeleteRequest<Req = any, Res = any>({
  endpoint,
  params,
  ...options
}: Props & UseMutationOptions<Res, Error, Req>) {
  const queryClient = useQueryClient();
  const key = endpoint.split('/')[1];

  return useMutation<Res, Error, Req>({
    ...options,
    mutationFn: async () => {
      const res = await axios.delete<Res>(endpoint, {
        params,
      });
      return res.data;
    },
    onSuccess: (...props) => {
      options.onSuccess && options.onSuccess(...props);
      queryClient.invalidateQueries({queryKey: [key]});
    },
  });
}

export default useDeleteRequest;
