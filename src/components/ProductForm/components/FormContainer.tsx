import Dropdown from '@/components/Dropdown/Dropdown';
import {Input} from '@/components/Inputs/Input';
import Textarea from '@/components/Textarea/Textarea';
import useGet from '@/hooks/useGet';
import theme from '@/styles/theme/commonTheme';
import {CategoriesResponse} from '@/types/category';
import {ProductFormContext} from '../ProductForm';
import {BrandsResponse} from '@/types/brand';
import {ColorsResponse} from '@/types/color';
import {GendersResponse} from '@/types/gender';
import {SizesResponse} from '@/types/size';

import {Box, Button, Grid, SxProps, Typography} from '@mui/material';
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
  buttonsList: {
    paddingTop: '1rem',
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  button: {
    fontWeight: 'fontWeighRegular',
    fontSize: {xs: 10, sm: 15},
    textTransform: 'uppercase',
    borderColor: 'grey.A700',
    color: 'text.secondary',
    padding: {xs: '8px 15px', sm: '10px 20px'},
    '&:hover': {
      borderColor: 'grey.A700',
      backgroundColor: 'grey.A100',
    },
  },
};

const FormContainer = () => {
  const {
    gender,
    setGender,
    brand,
    setBrand,
    choosedSizes,
    setChoosedSizes,
    register,
    errors,
    setValue,
    color,
    setColor,
    choosedCategories,
    setChoosedCategories,
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

  const checkSize = (id: number) => {
    setChoosedSizes((prevState: any) => {
      const isSizeAlreadyChoosed = prevState.find(
        (sizeId: number) => sizeId === id,
      );
      if (!isSizeAlreadyChoosed) {
        return [...prevState, id];
      } else {
        return prevState.filter((sizeId: number) => sizeId !== id);
      }
    });
  };

  const checkCategory = (id: number) => {
    setChoosedCategories((prevState: any) => {
      const isCategoryAlreadyChoosed = prevState.find(
        (categoryId: number) => categoryId === id,
      );
      if (!isCategoryAlreadyChoosed) {
        return [...prevState, id];
      } else {
        return prevState.filter((categoryId: number) => categoryId !== id);
      }
    });
  };

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
          onChange: e =>
            setValue('price', Number(e.target.value.replace(/\D/g, ''))),
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
            setGender(e.target.value);
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
            setBrand(e.target.value);
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
          setColor(e.target.value);
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
          onChange: e =>
            setValue(
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
      <Box>
        <Typography>Categories</Typography>
        <Box sx={styles.buttonsList}>
          {categories?.data.map(({id, attributes: {name}}) => {
            const isChecked = Boolean(
              choosedCategories.find((categoryId: number) => categoryId === id),
            );
            return (
              <Button
                key={id}
                sx={{
                  ...styles.button,
                  color: isChecked ? 'white' : 'text.secondary',
                }}
                variant={isChecked ? 'contained' : 'outlined'}
                onClick={() => checkCategory(id)}
                disabled={isLoading || isCategoriesLoading}
              >
                {name}
              </Button>
            );
          })}
        </Box>
      </Box>
      <Box>
        <Typography>Sizes</Typography>
        <Box sx={styles.buttonsList}>
          {sizes?.data.map(({id, attributes: {value}}) => {
            const isChecked = Boolean(
              choosedSizes.find((sizeId: number) => sizeId === id),
            );
            return (
              <Button
                key={id}
                sx={{
                  ...styles.button,
                  color: isChecked ? 'white' : 'text.secondary',
                }}
                disabled={isLoading || isSizesLoading}
                variant={isChecked ? 'contained' : 'outlined'}
                onClick={() => checkSize(id)}
              >
                EU-{value}
              </Button>
            );
          })}
        </Box>
      </Box>
    </Grid>
  );
};

export default FormContainer;
