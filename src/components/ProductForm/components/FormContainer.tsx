import Dropdown from '@/components/Dropdown/Dropdown';
import {Input} from '@/components/Inputs/Input';
import theme from '@/styles/theme/commonTheme';
import {ProductData} from '../ProductForm';
import {Box, Grid, SxProps} from '@mui/material';
import React from 'react';
import {UseFormRegister} from 'react-hook-form';
import Textarea from '@/components/Textarea/Textarea';

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
  register: UseFormRegister<ProductData>;
};

const FormContainer = ({register}: FormContainerProps) => {
  return (
    <Grid sx={styles.formContainer}>
      <Input
        labelText="Product name"
        register={register}
        validationSchema={{required: 'Product name is required'}}
        name="name"
        placeholder="Nike Air Max 90"
      />
      <Input
        labelText="Price"
        register={register}
        validationSchema={{required: 'Price is required'}}
        name="price"
      />
      <Box sx={styles.dropdowns}>
        <Dropdown
          name="gender"
          labelText="Gender"
          register={register}
          validationSchema={undefined}
          options={[
            {value: 'Men', text: 'Men'},
            {value: 'Women', text: 'Women'},
          ]}
        />
        <Dropdown
          name="brand"
          labelText="Brand"
          register={register}
          validationSchema={undefined}
          options={[
            {value: 'Men', text: 'Men'},
            {value: 'Women', text: 'Women'},
          ]}
        />
      </Box>
      <Textarea
        labelText="Description"
        register={register}
        validationSchema={{required: 'Description is required'}}
        name="description"
        minRows={8}
        placeholder="Do not exceed 300 chaeacters."
      />
    </Grid>
  );
};

export default FormContainer;
