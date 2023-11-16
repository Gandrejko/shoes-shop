import Dropdown from '@/components/Dropdown/Dropdown';
import {Input} from '@/components/Inputs/Input';
import ButtonsList from '@/components/ProductForm/components/ButtonsList';
import Textarea from '@/components/Textarea/Textarea';
import useGet from '@/hooks/useGet';
import theme from '@/styles/theme/commonTheme';
import {CategoriesResponse} from '@/types/category';
import {ProductFormContext} from '../ProductForm';
import {BrandsResponse} from '@/types/brand';
import {ColorsResponse} from '@/types/color';
import {GendersResponse} from '@/types/gender';
import {SizesResponse} from '@/types/size';

import {Box, Grid, SelectChangeEvent, SxProps} from '@mui/material';
import React, {useContext} from 'react';

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
    width: 540,
    [theme.breakpoints.down('md')]: {
      width: 'auto',
    },
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    flexShrink: 1,
  },
};

const FormContainer = () => {
  const {
    gender,
    setGender,
    brand,
    setBrand,
    chosenSizes,
    setChosenSizes,
    register,
    errors,
    setValue,
    trigger,
    color,
    setColor,
    chosenCategories,
    setChosenCategories,
    isLoading,
  } = useContext(ProductFormContext);
  const {data: genders, isLoading: isGendersLoading} =
    useGet<GendersResponse>('/genders');
  const {data: colors, isLoading: isColorsLoading} =
    useGet<ColorsResponse>('/colors');
  const {data: brands, isLoading: isBrandsLoading} =
    useGet<BrandsResponse>('/brands');
  const {data: sizes, isLoading: isSizesLoading} =
    useGet<SizesResponse>('/sizes');
  const {data: categories, isLoading: isCategoriesLoading} =
    useGet<CategoriesResponse>('/categories');

  return (
    <Grid sx={styles.formContainer}>
      <Input
        labelText="Product name"
        register={register}
        validationSchema={{required: 'Product name is required'}}
        name="name"
        placeholder="Nike Air Max 90"
        errorMessage={errors.name?.message}
        disabled={isLoading}
      />
      <Input
        name="price"
        labelText="Price"
        register={register}
        errorMessage={errors.price?.message}
        disabled={isLoading}
        validationSchema={{
          required: 'Price is required',
          min: {
            value: 1,
            message: 'Price must be greater than 0',
          },
          onChange: e => setValue('price', e.target.value.replace(/\D/g, '')),
        }}
      />
      <Box sx={styles.dropdowns}>
        <Dropdown
          labelText="Gender"
          options={genders?.data.map(({id, attributes}) => ({
            value: id,
            name: attributes.name!,
          }))}
          value={gender}
          onChange={e => {
            setGender(e.target.value as number);
          }}
          disabled={isLoading || isGendersLoading}
        />
        <Dropdown
          labelText="Brand"
          options={brands?.data.map(({id, attributes}) => ({
            value: id,
            name: attributes.name!,
          }))}
          value={brand}
          onChange={e => {
            setBrand(e.target.value as number);
          }}
          disabled={isLoading || isBrandsLoading}
        />
      </Box>
      <Dropdown
        labelText="Color"
        options={colors?.data.map(({id, attributes}) => ({
          value: id,
          name: attributes.name!,
        }))}
        value={color}
        onChange={e => {
          setColor(e.target.value as number);
        }}
        disabled={isLoading || isColorsLoading}
      />
      <Textarea
        labelText="Description"
        register={register}
        errorMessage={errors.description?.message}
        disabled={isLoading}
        validationSchema={{
          required: 'Description is required',
          maxLength: {
            value: 1000,
            message: 'Description must not exceed 1000 characters',
          },
          onChange: e => {
            if (e.target.value.length > 1000) trigger('description');
            return e.target.value;
          },
        }}
        name="description"
        minRows={8}
        placeholder="Do not exceed 3000 characters."
      />
      <ButtonsList
        header="Categories"
        data={
          categories?.data.map(({id, attributes: {name}}) => ({
            id,
            name: name!,
          })) || []
        }
        choosedData={chosenCategories}
        setChoosedData={setChosenCategories}
        disabled={isLoading || isCategoriesLoading}
      />
      <ButtonsList
        header="Sizes"
        data={
          sizes?.data.map(({id, attributes: {value}}) => ({
            id,
            name: value!.toString(),
          })) || []
        }
        choosedData={chosenSizes}
        setChoosedData={setChosenSizes}
        disabled={isLoading || isSizesLoading}
        namePrefix="EU-"
      />
    </Grid>
  );
};

export default FormContainer;
