import ProductForm from '@/components/common/ProductForm/ProductForm';
import theme from '@/config/theme';
import {FiltersData} from '@/types';
import {Box, SxProps, Modal} from '@mui/material';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios, {AxiosError} from 'axios';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {toast} from 'react-toastify';

const styles: Record<string, SxProps> = {
  modal: {
    '& .MuiModal-backdrop': {
      backgroundColor: 'grey.A100',
      opacity: '0.9 !important',
      backdropFilter: 'blur(100px)',
    },
  },
  modalContent: {
    maxWidth: 1500,
    marginX: 'auto',
    backgroundColor: 'background.paper',
    position: 'absolute',
    top: 120,
    left: 180,
    bottom: 120,
    right: 180,
    [theme.breakpoints.down('lg')]: {
      top: 70,
      left: 90,
      bottom: 70,
      right: 90,
    },
    [theme.breakpoints.down('md')]: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    overflow: 'hidden',
    overflowY: 'scroll',
  },
};

type EditProductProps = {
  productId: string;
  filtersData: FiltersData;
};

const EditProduct = ({productId, filtersData}: EditProductProps) => {
  const router = useRouter();
  const session = useSession();
  const token = session.data?.user.accessToken;
  const queryClient = useQueryClient();

  const {data, error, isLoading} = useQuery({
    queryKey: ['product', productId],
    queryFn: () =>
      axios.get(`${process.env.API_URL}/products/${productId}`, {
        params: {
          populate: '*',
        },
      }),
  });

  useEffect(() => {
    if (error) {
      router.push('/products/me');
      toast.error(error.message);
    }
  }, [error, router]);

  const {mutate, isPending} = useMutation({
    mutationFn: (data: any) => {
      return axios.put(
        `${process.env.API_URL}/products/${productId}`,
        {data},
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
    },
    onError: (error: AxiosError) => {
      console.log(error);
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['products']});
      toast.success('Product updated successfully');
      router.push('/products/me');
    },
  });

  const product = data?.data.data.attributes;

  return (
    <Modal
      sx={styles.modal}
      open={true}
      onClose={() => router.push('/products/me')}
    >
      <Box sx={styles.modalContent}>
        {product && (
          <ProductForm
            filtersData={filtersData}
            isLoading={isPending || isLoading}
            onSubmit={mutate}
            product={product}
          />
        )}
      </Box>
    </Modal>
  );
};

export default EditProduct;
