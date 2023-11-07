import {useQuery} from '@tanstack/react-query';
import {ProductsResponse} from '@/types/responses';
import APIClient from '@/services/api-client';

const apiClient = new APIClient<ProductsResponse>('/products');

// TODO: Add type for product query
type ProductQuery = {};

const useProducts = (productQuery?: any) => {
  return useQuery<ProductsResponse, Error>({
    queryKey: ['products', productQuery],
    queryFn: () => {
      return apiClient.getAll({
        params: productQuery,
      });
    },
  });
};

export default useProducts;
