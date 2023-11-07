import {CustomButton} from '@/components/Button/Button';
import Dropdown from '@/components/Dropdown/Dropdown';
import Textarea from '@/components/Textarea/Textarea';
import theme from '@/styles/theme/commonTheme';
import {Box, Grid, InputBase, SxProps, Typography} from '@mui/material';
import React, {useRef} from 'react';
import {Input} from '@/components/Inputs/Input';
import {Controller, useForm} from 'react-hook-form';
import Image from 'next/image';

const styles: Record<string, SxProps> = {
  mainContainer: {
    padding: '50px 40px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
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
  imagesContainer: {
    flexShrink: 2.5,
  },
  uploadImageCard: {
    border: `2px dashed ${theme.palette.grey['A400']}`,
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 320,
    height: 380,
  },
  uploadImage: {
    color: 'primary.main',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

type ProductData = {
  name: string;
  price: number;
  gender: string;
  brand: string;
  description: string;
  size: number;
  images: string[];
};

type ProductFormProps = {
  onSubmit: () => void;
  product?: any;
};

const ProductForm = ({onSubmit, product}: ProductFormProps) => {
  const inputRef = useRef<HTMLInputElement>();
  const {register, handleSubmit, control} = useForm<ProductData>({
    defaultValues: {
      name: '',
      price: 0,
      gender: '',
      brand: '',
      description: '',
      size: 36,
      images: [
        'https://media.finishline.com/i/finishline/AH6789_604_P1?$default$&w=671&&h=671&bg=rgb(237,237,237)',
        'https://media.finishline.com/i/finishline/AH6789_604_P1?$default$&w=671&&h=671&bg=rgb(237,237,237)',
        'https://media.finishline.com/i/finishline/AH6789_604_P1?$default$&w=671&&h=671&bg=rgb(237,237,237)',
      ],
    },
  });

  return (
    <Box
      sx={styles.mainContainer}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box sx={styles.header}>
        <Typography variant="h1">Add a product</Typography>
        <CustomButton>Save</CustomButton>
      </Box>
      <Typography sx={styles.description}>
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
        laying out print, graphic or web designs. The passage is attributed to
        an unknown typesetter in the 15th century who is thought to have
        scrambled parts of Cicero&apos;s De Finibus Bonorum et Malorum for use
        in a type specimen book. It usually begins with:
      </Typography>
      <Box sx={styles.form}>
        <Box sx={styles.formContainer}>
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
        </Box>
        <Box sx={styles.imagesContainer}>
          <Typography>Product images</Typography>
          <Grid container spacing={{sm: 1, md: 2}}>
            <Controller
              name="images"
              control={control}
              render={({field}) => (
                <>
                  {field.value.map(url => (
                    <Grid item key={url}>
                      <Image width={320} height={380} src={url} alt="product" />
                    </Grid>
                  ))}
                  <Grid item>
                    <Box sx={styles.uploadImageCard}>
                      <Image
                        width={30}
                        height={30}
                        src="/icons/imageUpload.svg"
                        alt="image upload"
                      />
                      <Typography>
                        Drop your image here, <br /> or select{' '}
                        <Typography
                          component="span"
                          onClick={() => inputRef.current?.click()}
                          sx={styles.uploadImage}
                        >
                          click to browse
                        </Typography>
                      </Typography>
                      <InputBase
                        inputProps={{ref: inputRef}}
                        type="file"
                        sx={{display: 'none'}}
                      />
                    </Box>
                  </Grid>
                </>
              )}
            />
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductForm;
