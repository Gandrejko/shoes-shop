import Dropdown from '@/components/Dropdown/Dropdown';
import {Input} from '@/components/Inputs/Input';
import ProductSizeList from '@/components/ProductSize/ProductSizeList';
import Textarea from '@/components/Textarea/Textarea';
import useGet from '@/hooks/useGet';
import theme from '@/styles/theme/commonTheme';
import {ProductFormContext, ProductFormData} from '../ProductForm';
import {BrandsResponse} from '@/types/brand';
import {ColorsResponse} from '@/types/color';
import {GendersResponse} from '@/types/gender';
import {ProductRequest} from '@/types/product';
import {SizesResponse} from '@/types/size';

import {Box, Grid, SxProps} from '@mui/material';
import React, {useContext} from 'react';
import {Controller, UseFormReturn} from 'react-hook-form';

const styles: Record<string, SxProps> = {
  dropdowns: {
    display: 'flex',
    gap: '1rem',
  },
  form: {
    display: 'flex',
    columnGap: '5rem',
    rowGap: '3rem',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  formContainer: {
    width: 440,
    [theme.breakpoints.down('md')]: {
      width: 'auto',
    },
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    flexShrink: 1,
  },
};

type FormContainerProps = {
  formProps: Pick<
    UseFormReturn<ProductFormData>,
    'register' | 'control' | 'getValues' | 'setValue'
  >;
};

const FormContainer = ({formProps}: FormContainerProps) => {
  const {gender, setGender, brand, setBrand, choosedSizes, setChoosedSizes} =
    useContext(ProductFormContext);
  const {data: genders} = useGet<GendersResponse>('/genders');
  const {data: colors} = useGet<ColorsResponse>('/colors');
  const {data: brands} = useGet<BrandsResponse>('/brands');
  const {data: sizes} = useGet<SizesResponse>('/sizes');

  const sizesMapped =
    sizes?.data.map(({id, attributes}) => ({
      id,
      value: attributes.value!,
    })) ?? [];

  const checkSize = (id: number) => {
    setChoosedSizes((prevState: any) => {
      const newSize = sizesMapped.find(size => size.id === id);
      const isSizeAlreadyChoosed = prevState.find(
        (size: any) => size.id === id,
      );
      if (!newSize) {
        return prevState;
      }
      if (!isSizeAlreadyChoosed) {
        console.log(newSize);
        return [...prevState, newSize];
      } else {
        return prevState.filter((size: any) => size.id !== id);
      }
    });
  };

  return (
    <Grid sx={styles.formContainer}>
      <Input
        labelText="Product name"
        register={formProps.register}
        validationSchema={{required: 'Product name is required'}}
        name="name"
        placeholder="Nike Air Max 90"
      />
      <Input
        name="price"
        labelText="Price"
        register={formProps.register}
        validationSchema={{
          required: 'Price is required',
          min: {
            value: 1,
            message: 'Price must be greater than 0',
          },
          onChange: e =>
            formProps.setValue(
              'price',
              Number(e.target.value.replace(/\D/g, '')),
            ),
        }}
      />
      <Box sx={styles.dropdowns}>
        <Dropdown
          name="gender"
          labelText="Gender"
          options={genders?.data.map(({id, attributes}) => ({
            value: id,
            name: attributes.name!,
          }))}
          value={gender.id}
          onChange={e => {
            setGender({id: e.target.value, name: e.target.name});
          }}
        />
        <Dropdown
          name="brand"
          labelText="Brand"
          options={brands?.data.map(({id, attributes}) => ({
            value: id,
            name: attributes.name!,
          }))}
          value={brand.id}
          onChange={e => {
            setBrand({id: e.target.value, name: e.target.name});
          }}
        />
      </Box>
      <Textarea
        labelText="Description"
        register={formProps.register}
        validationSchema={{
          required: 'Description is required',
          onChange: e =>
            formProps.setValue(
              'description',
              e.target.value.length > 300
                ? e.target.value.slice(0, 300)
                : e.target.value,
            ),
        }}
        name="description"
        minRows={8}
        placeholder="Do not exceed 300 characters."
      />
      <ProductSizeList
        header="Add size"
        sizes={sizesMapped}
        choosedSizes={choosedSizes}
        onClick={checkSize}
      />
    </Grid>
  );
};

export default FormContainer;
