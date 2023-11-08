import Dropdown from '@/components/Dropdown/Dropdown';
import {Input} from '@/components/Inputs/Input';
import theme from '@/styles/theme/commonTheme';
import {ProductData} from '../ProductForm';
import {Box, SxProps} from '@mui/material';
import React from 'react';
import {UseFormReturn} from 'react-hook-form';
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
  formProps: Partial<UseFormReturn<ProductData>>;
};

const FormContainer = ({formProps}: FormContainerProps) => {
  return (
    <Box sx={styles.formContainer}>
      <Input
        labelText="Product name"
        register={formProps.register}
        validationSchema={{required: 'Product name is required'}}
        name="name"
        placeholder="Nike Air Max 90"
      />
      <Input
        labelText="Price"
        register={formProps.register}
        validationSchema={{required: 'Price is required'}}
        name="price"
      />
      <Box sx={styles.dropdowns}>
        <Dropdown
          name="gender"
          labelText="Gender"
          register={formProps.register}
          validationSchema={undefined}
          options={[
            {value: 'Men', text: 'Men'},
            {value: 'Women', text: 'Women'},
          ]}
        />
        <Dropdown
          name="brand"
          labelText="Brand"
          register={formProps.register}
          validationSchema={undefined}
          options={[
            {value: 'Men', text: 'Men'},
            {value: 'Women', text: 'Women'},
          ]}
        />
      </Box>
      <Textarea
        labelText="Description"
        register={formProps.register}
        validationSchema={{required: 'Description is required'}}
        name="description"
        minRows={8}
        placeholder="Do not exceed 300 chaeacters."
      />
    </Box>
  );
};

export default FormContainer;
