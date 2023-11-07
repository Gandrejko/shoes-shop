import ProductForm from '@/components/ProductForm/ProductForm';
import {Modal} from '@mui/material';
import {Box, SxProps} from '@mui/material';
import {useMutation, useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import React from 'react';

const styles: Record<string, SxProps> = {
  modal: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 120,
    left: 180,
    bottom: 120,
    right: 180,
    overflow: 'hidden',
    overflowY: 'scroll',
  },
};

type EditProductProps = {
  productId: string;
};

const EditProduct = ({productId}: EditProductProps) => {
  const router = useRouter();
  const session = useSession();
  const token = session.data?.user.accessToken;
  const {mutate} = useMutation({
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
  });
  const {data} = useQuery({
    queryKey: ['products', productId],
    queryFn: () => axios.get(`${process.env.API_URL}/products/${productId}`),
  });

  return (
    <Modal
      sx={styles.modal}
      open={true}
      onClose={() => router.push('/my-products')}
    >
      <Box sx={styles.modalContent}>
        <ProductForm onSubmit={mutate} />
      </Box>
    </Modal>
  );
};

export default EditProduct;