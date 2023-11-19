import HeaderLayout from '@/components/layouts/HeaderLayout/HeaderLayout';
import ProductForm from '@/components/common/ProductForm/ProductForm';
import {SidebarLayout} from '@/components/layouts/SidebarLayout/SidebarLayout';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {useSession} from 'next-auth/react';
import Head from 'next/head';
import {useRouter} from 'next/navigation';
import React from 'react';
import {toast} from 'react-toastify';

const Add = () => {
  const router = useRouter();
  const session = useSession();
  const token = session.data?.user.accessToken;

  const {mutate, isPending} = useMutation({
    mutationFn: (data: any) => {
      return axios.post(
        `${process.env.API_URL}/products`,
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
    <>
      <Head>
        <title>Add product</title>
      </Head>
      <HeaderLayout>
        <SidebarLayout>
          <ProductForm onSubmit={mutate} isLoading={isPending} />
        </SidebarLayout>
      </HeaderLayout>
    </>
  );
};
export default Add;
