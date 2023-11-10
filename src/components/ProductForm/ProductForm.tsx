import {Button} from '@/components/Button/Button';
import {
  BrandsResponse,
  ColorsResponse,
  GendersResponse,
  SizesResponse,
} from '@/types';
import {ProductAttributes} from '@/types/attributes';
import {useMutation, useQuery} from '@tanstack/react-query';
import axios, {AxiosResponse} from 'axios';
import FormContainer from './components/FormContainer';
import ImagesContainer from './components/ImagesContainer';
import theme from '@/styles/theme/commonTheme';
import {Box, SxProps, Typography} from '@mui/material';
import React, {createContext, useEffect, useMemo, useState} from 'react';
import {FieldErrors, useForm} from 'react-hook-form';
import {toast} from 'react-toastify';

const styles: Record<string, SxProps> = {
  mainContainer: {
    padding: '50px 40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
    [theme.breakpoints.down('md')]: {
      padding: '0',
    },
    [theme.breakpoints.down('md')]: {
      padding: '30px 20px',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    fontWeight: 300,
    lineHeight: 1.2,
    width: '80%',
  },
  dropdowns: {
    display: 'flex',
    gap: '1rem',
  },
  form: {
    display: 'flex',
    gap: '5rem',
    [theme.breakpoints.down('lg')]: {
      gap: '3rem',
      flexDirection: 'column',
    },
  },
};

export type ProductData = {
  name: string;
  price: number;
  gender?: number;
  brand?: number;
  description: string;
  sizes: {
    id: number;
    value: number;
  }[];
  images: {
    id: number;
    url: string;
  }[];
};

export const ProductFormContext = createContext<any>({});

type ProductFormProps = {
  onSubmit: (data: any) => void;
  product?: ProductAttributes;
};

const createDefaultProduct = (product?: ProductAttributes) => ({
  name: product?.name || '',
  price: product?.price || 0,
  gender: product?.gender?.data?.id,
  brand: product?.gender?.data?.id,
  description: product?.description || '',
  sizes:
    product?.sizes?.data?.map(({id, attributes}) => ({
      id,
      value: attributes.value,
    })) || [],
  images:
    product?.images?.data?.map(({id, attributes}) => ({
      id,
      url: attributes.url,
    })) || [],
});

const ProductForm = ({onSubmit, product}: ProductFormProps) => {
  const [gender, setGender] = useState<number>(0);
  const [brand, setBrand] = useState<number>(0);

  const {register, reset, handleSubmit, control, getValues, setValue} =
    useForm<ProductData>({
      defaultValues: useMemo(() => createDefaultProduct(product), [product]),
    });

  useEffect(() => {
    reset(createDefaultProduct(product));
    setGender(product?.gender?.data?.id || 0);
    setBrand(product?.brand?.data?.id || 0);
  }, [product]);

  const handleOnSubmit = () => {
    const values = {
      ...getValues(),
      gender,
      brand,
    };
    const data = Object.keys(values).reduce(
      (acc, key) => {
        const value = (values as any)[key];
        if (Boolean(value)) {
          (acc as any)[key] = value;
        }
        return acc;
      },
      {
        teamName: 'team-3',
      },
    );
    onSubmit(data);
  };

  const onError = (errors: FieldErrors<ProductData>) => {
    Object.entries(errors).forEach(([key, value]) => {
      if (value && value.message) {
        toast.error(value.message);
      }
    });
  };

  return (
    <ProductFormContext.Provider value={{gender, setGender, brand, setBrand}}>
      <Box
        sx={styles.mainContainer}
        component="form"
        onSubmit={handleSubmit(handleOnSubmit, onError)}
      >
        <Box sx={styles.header}>
          <Typography variant="h1">
            {product ? 'Edit product' : 'Add a product'}
          </Typography>
          <Button type="submit">Save</Button>
        </Box>
        <Typography sx={styles.description}>
          Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
          laying out print, graphic or web designs. The passage is attributed to
          an unknown typesetter in the 15th century who is thought to have
          scrambled parts of Cicero&apos;s De Finibus Bonorum et Malorum for use
          in a type specimen book. It usually begins with:
        </Typography>
        <Box sx={styles.form}>
          <FormContainer formProps={{register, control, getValues, setValue}} />
          <ImagesContainer
            formProps={{register, control, getValues, setValue}}
          />
        </Box>
      </Box>
    </ProductFormContext.Provider>
  );
};

export default ProductForm;
