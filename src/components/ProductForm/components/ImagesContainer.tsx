import ImageCard from '@/components/ProductForm/components/ImageCard';
import theme from '@/styles/theme/commonTheme';
import {Box, Grid, InputBase, SxProps, Typography} from '@mui/material';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {useSession} from 'next-auth/react';
import Image from 'next/image';
import React, {useRef} from 'react';
import {Controller, UseFormReturn} from 'react-hook-form';
import {ProductData} from '../ProductForm';

const styles: Record<string, SxProps> = {
  imagesContainer: {
    flexShrink: 2.5,
    width: '100%',
  },
  uploadImageCard: {
    border: `2px dashed ${theme.palette.grey['A400']}`,
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 320 / 380,
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
  const session = useSession();
  const token = session.data?.user.accessToken;
  const inputRef = useRef<HTMLInputElement>();

  const {mutate} = useMutation({
    mutationFn: (file: FormData) =>
      axios.post(`${process.env.API_URL}/upload`, file),
    onSuccess: (data: any) => {
      const currentImages = formProps.getValues?.('images') || [];
      const newImages = data.data.map((image: any) => ({
        url: image.url,
        id: image.id,
      }));
      formProps.setValue?.('images', [...currentImages, ...newImages]);
    },
  });

  const {mutate: deleteImage} = useMutation({
    mutationFn: (id: number) =>
      axios.delete(`${process.env.API_URL}/upload/files/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }),
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

  const handleDeleteImage = (id: number) => {
    const currentImages = formProps.getValues?.('images') || [];
    formProps.setValue?.(
      'images',
      currentImages.filter((image: any) => image.id !== id),
    );
    deleteImage(id);
  };

  return (
    <Box sx={styles.imagesContainer}>
      <Typography>Product images</Typography>
      <Grid container spacing={{sm: 2, md: 2, xs: 1}}>
        <Controller
          name="images"
          control={formProps.control}
          render={({field}) => (
            <>
              {field.value.map((image: {url: string; id: number}) => (
                <Grid item key={image.id} xs={12} sm={6} md={6} lg={8} xl={5}>
                  <ImageCard
                    image={image}
                    onDelete={() => handleDeleteImage(image.id)}
                  />
                </Grid>
              ))}
              <Grid item xs={12} sm={6} md={6} lg={8} xl={5}>
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
