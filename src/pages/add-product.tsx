import ProductForm from '@/components/ProductForm/ProductForm';
import {SidebarLayout} from '@/components/SidebarLayout/SidebarLayout';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import React from 'react';
import {toast} from 'react-toastify';

const AddProduct = () => {
  const router = useRouter();
  const session = useSession();
  const token = session.data?.user.accessToken;

  const {mutate} = useMutation({
    mutationFn: (data: any) => {
      return axios.post(
        `https://shoes-shop-strapi.herokuapp.com/api/products`,
        {data},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
    },
    onSuccess: () => {
      toast.success('Product added successfully');
      router.push('/my-products');
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });
  return (
    <SidebarLayout>
      <ProductForm onSubmit={mutate} />
    </SidebarLayout>
  );
};
export default AddProduct;
