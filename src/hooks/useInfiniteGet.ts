import axios, {AxiosError} from '@/config/axios';
import {ResponseData} from '@/types/data';
import {UseInfiniteQueryOptions, useInfiniteQuery} from '@tanstack/react-query';

/**
 * @description useInfiniteGet is a custom hook that wraps around react-query's useInfiniteQuery hook. It is used to make a **GET** request to the backend.
 * @param endpoint - the endpoint to make the request to
 * @param options - the options to be passed to the useInfiniteQuery hook
 * @param params - the query params to be sent with the request
 */
function useInfiniteGet<Res extends ResponseData<any> = any>(
  endpoint: string,
  options: Partial<UseInfiniteQueryOptions<Res, AxiosError>> | null = null,
  params: any = null,
) {
  const key = endpoint.split('/')[1];

  return useInfiniteQuery({
    ...options,
    queryKey: [key, params],
    initialPageParam: 1,
    queryFn: async ({pageParam}) => {
      const res = await axios.get<Res>(endpoint, {
        params: {
          ...params,
          'pagination[page]': pageParam,
        },
      });

      return res.data;
    },
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const pageCount = lastPage.meta.pagination?.pageCount;
      if (pageCount && (lastPageParam as number) < pageCount) {
        return (lastPageParam as number) + 1;
      }
      return null;
    },
    select: data => data.pages,
  });
}

export default useInfiniteGet;
