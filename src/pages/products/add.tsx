import HeaderLayout from '@/components/layouts/HeaderLayout/HeaderLayout';
import ProductForm from '@/components/common/ProductForm/ProductForm';
import {SidebarLayout} from '@/components/layouts/SidebarLayout/SidebarLayout';
import {FiltersData} from '@/types';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {GetStaticPropsContext} from 'next';
import {useSession} from 'next-auth/react';
import Head from 'next/head';
import {useRouter} from 'next/navigation';
import React from 'react';
import {toast} from 'react-toastify';

const AddProduct = (filtersData: FiltersData) => {
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
      router.push('/products/me');
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
          <ProductForm
            filtersData={filtersData}
            onSubmit={mutate}
            isLoading={isPending}
          />
        </SidebarLayout>
      </HeaderLayout>
    </>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const {data: genders} = await axios.get(`${process.env.API_URL}/genders`);
  const {data: colors} = await axios.get(`${process.env.API_URL}/colors`);
  const {data: categories} = await axios.get(
    `${process.env.API_URL}/categories`,
  );
  const {data: brands} = await axios.get(`${process.env.API_URL}/brands`);
  const {data: sizes} = await axios.get(`${process.env.API_URL}/sizes`);

  return {props: {genders, colors, categories, brands, sizes}};
}
export default AddProduct;
