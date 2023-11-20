import {AddProductProps} from '@/pages/products/add';
import {Image} from '@/types';
import {useSession} from 'next-auth/react';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';
import FormContainer from './components/FormContainer';
import ImagesContainer from './components/ImagesContainer';
import theme from '@/config/theme';
import {Box, Button, SxProps, Typography} from '@mui/material';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {FieldErrors, useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {Product, ProductAttributes, ProductRequest} from '@/types';
import {ProductsResponse} from '@/types';

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

type ProductFormContextType = AddProductProps & {
  gender: number;
  setGender: Dispatch<SetStateAction<number>>;
  brand: number;
  setBrand: Dispatch<SetStateAction<number>>;
  chosenSizes: number[];
  setChosenSizes: Dispatch<SetStateAction<number[]>>;
  images: Pick<Image, 'id' | 'url'>[];
  setImages: Dispatch<SetStateAction<Pick<Image, 'id' | 'url'>[]>>;
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  setValue: UseFormSetValue<ProductFormData>;
  color: number;
  setColor: Dispatch<SetStateAction<number>>;
  chosenCategories: number[];
  setChosenCategories: Dispatch<SetStateAction<number[]>>;
  isLoading: boolean;
  trigger: UseFormTrigger<ProductFormData>;
};

export const ProductFormContext = createContext<ProductFormContextType>(
  {} as ProductFormContextType,
);

export type ProductFormData = Pick<Product, 'name' | 'description' | 'price'>;

type ProductFormProps = {
  onSubmit: (data: any) => void;
  product?: ProductAttributes;
  isLoading?: boolean;
  pageData: AddProductProps;
};

const ProductForm = ({
  onSubmit,
  product,
  isLoading,
  pageData,
}: ProductFormProps) => {
  const session = useSession();
  const [gender, setGender] = useState<number>(product?.gender?.data?.id || 0);
  const [brand, setBrand] = useState<number>(product?.brand?.data?.id || 0);
  const [color, setColor] = useState<number>(product?.color?.data?.id || 0);
  const [chosenSizes, setChosenSizes] = useState<number[]>(
    product?.sizes?.data.map(({id}) => id) || [],
  );
  const [chosenCategories, setChosenCategories] = useState<number[]>(
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
      sizes: chosenSizes,
      categories: chosenCategories,
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
        chosenSizes,
        setChosenSizes,
        images,
        setImages,
        register,
        errors,
        setValue,
        color,
        setColor,
        chosenCategories,
        setChosenCategories,
        isLoading: isLoading || false,
        trigger,
        ...pageData,
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
