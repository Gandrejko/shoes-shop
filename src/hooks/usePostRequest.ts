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
 * @description usePostRequest is a custom hook that wraps around react-query's useMutation hook. It is used to make a **POST** request to the backend.
 * @param endpoint - the endpoint to make the request to
 * @param params - the query params to be sent with the request
 * @param options - the options to be passed to the useMutation hook
 */
function usePostRequest<Req = any, Res = any>({
  endpoint,
  params,
  ...options
}: Props & UseMutationOptions<Res, Error, Req>) {
  const queryClient = useQueryClient();
  const key = endpoint.split('/')[1];

  return useMutation<Res, Error, Req>({
    ...options,
    mutationFn: async (newData: Req) => {
      const res = await axios.postForm<Res>(
        endpoint,
        {data: JSON.stringify(newData)},
        {params},
      );
      return res.data;
    },
    onSuccess: (...props) => {
      options.onSuccess && options.onSuccess(...props);
      queryClient.invalidateQueries({queryKey: [key]});
    },
  });
}

export default usePostRequest;
