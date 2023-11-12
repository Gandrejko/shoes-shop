import ImageCard from '@/components/ProductForm/components/ImageCard';
import {
  ProductFormContext,
  ProductFormData,
} from '@/components/ProductForm/ProductForm';
import theme from '@/styles/theme/commonTheme';
import {ProductRequest} from '@/types/product';
import {Box, Grid, InputBase, SxProps, Typography} from '@mui/material';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {useSession} from 'next-auth/react';
import Image from 'next/image';
import React, {useContext, useRef} from 'react';
import {Controller, UseFormReturn} from 'react-hook-form';

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
    padding: '20px',
    textAlign: 'center',
  },
  uploadImage: {
    color: 'primary.main',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

type ImagesContainerProps = {
  formProps: Pick<
    UseFormReturn<ProductFormData>,
    'register' | 'control' | 'getValues' | 'setValue'
  >;
};

const ImagesContainer = ({formProps}: ImagesContainerProps) => {
  const {images, setImages} = useContext(ProductFormContext);
  const session = useSession();
  const token = session.data?.user.accessToken;
  const inputRef = useRef<HTMLInputElement>();

  const {mutate} = useMutation({
    mutationFn: (file: FormData) =>
      axios.post(`https://shoes-shop-strapi.herokuapp.com/api/upload`, file),
    onSuccess: (data: any) => {
      setImages((prevImages: any) => [...prevImages, ...data.data]);
    },
  });

  const {mutate: deleteImage} = useMutation({
    mutationFn: (id: number) =>
      axios.delete(
        `https://shoes-shop-strapi.herokuapp.com/api/upload/files/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      ),
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
    setImages((prevImages: any) =>
      prevImages.filter((image: any) => image.id !== id),
    );
  };

  return (
    <Box sx={styles.imagesContainer}>
      <Typography>Product images</Typography>
      <Grid container spacing={{sm: 2, md: 2, xs: 1}}>
        {images.map((image: {url: string; id: number}) => (
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
      </Grid>
    </Box>
  );
};

export default ImagesContainer;
