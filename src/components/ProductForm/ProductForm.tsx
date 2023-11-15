import {Brand} from '@/types/brand';
import {Category} from '@/types/category';
import {Color} from '@/types/color';
import {Gender} from '@/types/gender';
import {Image} from '@/types/image';
import {Size} from '@/types/size';
import {useSession} from 'next-auth/react';
import FormContainer from './components/FormContainer';
import ImagesContainer from './components/ImagesContainer';
import theme from '@/styles/theme/commonTheme';
import {Box, Button, SxProps, Typography} from '@mui/material';
import React, {createContext, useEffect, useMemo, useState} from 'react';
import {FieldErrors, useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {Product, ProductAttributes, ProductRequest} from '@/types/product';

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

export const ProductFormContext = createContext<any>({});

export type ProductFormData = Pick<Product, 'name' | 'description' | 'price'>;

type ProductFormProps = {
  onSubmit: (data: any) => void;
  product?: ProductAttributes;
  isLoading?: boolean;
};

const ProductForm = ({onSubmit, product, isLoading}: ProductFormProps) => {
  const session = useSession();
  const [gender, setGender] = useState<number>(product?.gender?.data?.id || 0);
  const [brand, setBrand] = useState<number>(product?.brand?.data?.id || 0);
  const [color, setColor] = useState<number>(product?.color?.data?.id || 0);
  const [choosedSizes, setChoosedSizes] = useState<number[]>(
    product?.sizes?.data.map(({id}) => id) || [],
  );
  const [choosedCategories, setChoosedCategories] = useState<number[]>(
    product?.categories?.data.map(({id}) => id) || [],
  );
  const [images, setImages] = useState<Pick<Image, 'id' | 'url'>[]>(
    product?.images?.data?.map(({id, attributes: {url}}) => ({id, url})) || [],
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
    trigger,
  } = useForm<ProductFormData>({
    defaultValues: {
      name: product?.name || '',
      price: product?.price || 0,
      description: product?.description || '',
    },
  });

  const handleOnSubmit = (data: ProductRequest) => {
    const values = {
      ...data,
      gender,
      brand,
      color,
      sizes: choosedSizes,
      categories: choosedCategories,
      images,
      teamName: 'team-3',
      userID: session.data?.user.id,
    };
    const filteredValues = Object.entries(values).filter(
      ([key, value]) =>
        !(Array.isArray(value) && value.length === 0) && Boolean(value),
    );
    const body = Object.fromEntries(filteredValues);
    onSubmit(body);
  };

  return (
    <ProductFormContext.Provider
      value={{
        gender,
        setGender,
        brand,
        setBrand,
        choosedSizes,
        setChoosedSizes,
        images,
        setImages,
        register,
        errors,
        setValue,
        color,
        setColor,
        choosedCategories,
        setChoosedCategories,
        isLoading,
        trigger,
      }}
    >
      <Box
        sx={styles.mainContainer}
        component="form"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <Box sx={styles.header}>
          <Typography variant="h1">
            {product ? 'Edit product' : 'Add a product'}
          </Typography>
          <Button variant="contained" type="submit" disabled={isLoading}>
            Save
          </Button>
        </Box>
        <Typography sx={styles.description}>
          Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
          laying out print, graphic or web designs. The passage is attributed to
          an unknown typesetter in the 15th century who is thought to have
          scrambled parts of Cicero&apos;s De Finibus Bonorum et Malorum for use
          in a type specimen book. It usually begins with:
        </Typography>
        <Box sx={styles.form}>
          <FormContainer />
          <ImagesContainer />
        </Box>
      </Box>
    </ProductFormContext.Provider>
  );
};

export default ProductForm;
