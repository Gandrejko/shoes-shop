import theme from '@/styles/theme/commonTheme';
import {ProductData} from '../ProductForm';
import {GendersResponse} from '@/types';
import {Box, Grid, InputBase, SxProps, Typography} from '@mui/material';
import {useMutation, useQuery} from '@tanstack/react-query';
import axios, {AxiosResponse} from 'axios';
import Image from 'next/image';
import React, {useRef} from 'react';
import {Controller, UseFormReturn} from 'react-hook-form';

const styles: Record<string, SxProps> = {
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

type ImagesContainerProps = {
  formProps: Partial<UseFormReturn<ProductData>>;
};

const ImagesContainer = ({formProps}: ImagesContainerProps) => {
  const inputRef = useRef<HTMLInputElement>();

  const {data: genders} = useQuery<AxiosResponse<GendersResponse>>({
    queryKey: ['genders'],
    queryFn: () => axios.get(`${process.env.API_URL}/genders`),
  });

  const {mutate} = useMutation({
    mutationFn: (file: FormData) =>
      axios.post(`${process.env.API_URL}/upload`, file),
    onSuccess: (data: any) => {
      const currentImages = formProps.getValues?.('images') || [];
      const newImages = data.data.map((image: any) => image.url);
      formProps.setValue?.('images', [...currentImages, ...newImages]);
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let formData = new FormData();

    if (!e.target.files) {
      return;
    }

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('files', e.target.files[i]);
    }

    mutate(formData);
  };

  return (
    <Box sx={styles.imagesContainer}>
      <Typography>Product images</Typography>
      <Grid container spacing={{sm: 1, md: 2}}>
        <Controller
          name="images"
          control={formProps.control}
          render={({field}) => (
            <>
              {field.value.map((url: string, index: number) => (
                <Grid item key={index}>
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
                    inputProps={{ref: inputRef, multiple: true}}
                    type="file"
                    sx={{display: 'none'}}
                    onChange={handleFileChange}
                  />
                </Box>
              </Grid>
            </>
          )}
        />
      </Grid>
    </Box>
  );
};

export default ImagesContainer;
