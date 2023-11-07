import {useMutation} from '@tanstack/react-query';
import {ProductRequest} from '@/types/requests';
import APIClient from '@/services/api-client';

const apiClient = new APIClient<ProductRequest>('/products');

const useAddProduct = (
  successFn: (message: string) => void,
  errorFn: (message: string) => void,
) => {
  return useMutation({
    mutationFn: apiClient.post,
    onSuccess: () => {
      successFn('Product added successfully');
    },
    onError: error => {
      errorFn(error.message);
    },
  });
};

export default useAddProduct;
