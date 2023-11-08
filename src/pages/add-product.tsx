import ProductForm from '@/components/ProductForm/ProductForm';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {useSession} from 'next-auth/react';
import React from 'react';

const AddProduct = () => {
  const session = useSession();
  const token = session.data?.user.accessToken;
  const {mutate} = useMutation({
    mutationFn: (data: any) => {
      return axios.post(
        `${process.env.API_URL}/products`,
        {
          data: {
            ...data,
            teamName: 'team-3',
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
    },
    onSuccess: (data: any) => {
      console.log(data);
    },
  });
  return <ProductForm onSubmit={mutate} />;
};

export default AddProduct;
