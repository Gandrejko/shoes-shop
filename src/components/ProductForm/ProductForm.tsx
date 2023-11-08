import {Button} from '@/components/Button/Button';
import {
  BrandsResponse,
  ColorsResponse,
  GendersResponse,
  SizesResponse,
} from '@/types';
import {useQuery} from '@tanstack/react-query';
import axios, {AxiosResponse} from 'axios';
import FormContainer from './components/FormContainer';
import ImagesContainer from './components/ImagesContainer';
import theme from '@/styles/theme/commonTheme';
import {Box, SxProps, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';

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
  gender: number;
  brand: number;
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

type ProductFormProps = {
  onSubmit: (data: any) => void;
  product?: any;
};

const ProductForm = ({onSubmit, product}: ProductFormProps) => {
  const {register, handleSubmit, control, getValues, setValue} =
    useForm<ProductData>({
      defaultValues: {
        name: '',
        price: 0,
        gender: 3,
        brand: 13,
        description: '',
        sizes: [],
        images: [],
      },
    });

  const handleOnSubmit = () => {
    const values = getValues();
    const data = {
      ...values,
      sizes: values.sizes.map(({id}) => id),
      images: values.images.map(({id}) => id),
      teamName: 'team-3',
    };
    console.log(data);
    // onSubmit(data);
  };

  const onError = (errors: any) => {
    console.log(errors);
  };

  return (
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
        <ImagesContainer formProps={{register, control, getValues, setValue}} />
      </Box>
    </Box>
  );
};

export default ProductForm;
