import {Brand} from '@/types/brand';
import {Category} from '@/types/category';
import {Color} from '@/types/color';
import {Gender} from '@/types/gender';
import {Image} from '@/types/image';
import {Size} from '@/types/size';
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
};

const createDefaultProduct = (
  product?: ProductAttributes,
): ProductFormData => ({
  name: product?.name || '',
  price: product?.price || 0,
  description: product?.description || '',
});

const ProductForm = ({onSubmit, product}: ProductFormProps) => {
  const [gender, setGender] = useState<Gender>({
    id: 0,
    name: 'None',
  });
  const [brand, setBrand] = useState<Brand>({
    id: 0,
    name: 'None',
  });
  const [color, setColor] = useState<Color>({
    id: 0,
    name: 'None',
  });
  const [choosedSizes, setChoosedSizes] = useState<Size[]>([]);
  const [choosedCategories, setChoosedCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<Pick<Image, 'id' | 'url'>[]>([]);

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    setValue,
    formState: {errors},
  } = useForm<ProductFormData>({
    defaultValues: useMemo(() => createDefaultProduct(product), [product]),
  });

  useEffect(() => {
    const productGender = product?.gender?.data;
    const productBrand = product?.brand?.data;
    const productColor = product?.color?.data;
    reset(createDefaultProduct(product));
    productGender &&
      setGender({id: productGender.id, name: productGender.attributes.name});
    productBrand &&
      setBrand({
        id: productBrand.id,
        name: productBrand.attributes.name,
      });
    productColor &&
      setColor({id: productColor.id, name: productColor.attributes.name});
    setChoosedSizes(
      product?.sizes?.data?.map(({id, attributes}) => ({
        id,
        value: attributes.value,
      })) || [],
    );
    setChoosedCategories(
      product?.categories?.data?.map(({id, attributes}) => ({
        id,
        name: attributes.name,
      })) || [],
    );
    setImages(
      product?.images?.data?.map(({id, attributes}) => ({
        id,
        url: attributes.url,
      })) || [],
    );
  }, [product]);

  const handleOnSubmit = () => {
    const values = {
      ...getValues(),
      gender: gender.id !== 0 ? gender : undefined,
      brand: brand.id !== 0 ? brand : undefined,
      color: color.id !== 0 ? color : undefined,
      sizes: choosedSizes,
      categories: choosedCategories,
      images,
    };
    const data = Object.keys(values).reduce(
      (acc, key) => {
        const value = (values as any)[key];
        if (Boolean(value)) {
          (acc as any)[key] = value;
        }
        return acc;
      },
      {teamName: 'team-3'},
    );
    onSubmit(data);
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
          <Button variant="contained" type="submit">
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
