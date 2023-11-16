import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import useGet from '@/hooks/useGet';
import {ProductResponse} from '@/types/product';
import React, {useEffect, useState} from 'react';
import {Box, Container, Typography, SxProps, Button} from '@mui/material';
import ImageSlider from '@/components/ImageSlider/ImageSlider';
import {useRouter} from 'next/router';
import {useMutation} from '@tanstack/react-query';
import {toast} from 'react-toastify';

const styles: Record<string, SxProps> = {
  container: {
    padding: {xs: '16px', md: '35px'},
    display: 'flex',
    flexDirection: {xs: 'column', md: 'row'},
    gap: '3vw',
  },
  productContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  productImage: {
    width: '100%',
    maxWidth: '400px',
  },
  productLabel: {
    textAlign: 'left',
    fontSize: '18px',
    fontWeight: 400,
  },
  productPrice: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    fontSize: '18px',
    fontWeight: 500,
  },
  btnContainer: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row',
    },
    gap: '10px',
    width: '100%',
  },
  addToCartButton: {
    flexBasis: '50%',
    padding: {
      xs: '10px 15px',
      sm: '16px 20px',
    },
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  textContainer: {
    position: 'relative',
    width: '100%',
    justifyContent: 'space-between',
    display: 'flex',
  },
  subheader: {
    display: 'flex',
    width: '100%',
    gap: '10px',
  },
  categories: {
    display: 'flex',
    gap: '10px',
  },
  category: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  buttonSize: {
    padding: '12px 16px',
    minWidth: '85px',
    height: '55px',
    textTransform: 'none',
  },
  sizesContainer: {
    marginTop: '10px',
    width: '100%',
  },
  description: {
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
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

const Product = () => {
  const router = useRouter();
  const productId = router.query.productid as string;
  const [choosedSize, setChoosedSize] = useState<number>(0);

  const {data, error} = useGet<ProductResponse>(
    `products/${productId}`,
    {
      enabled: productId !== undefined,
    },
    {
      populate: '*',
    },
  );
  useEffect(() => {
    if (error) {
      router.push('/404');
    }
  }, [error]);
  const product = {id: data?.data.id, ...data?.data.attributes};

  const {mutate} = useMutation({
    mutationKey: ['cart'],
    mutationFn: async () => {
      const existingData = JSON.parse(localStorage.getItem('cart') || '{}');
      if (productId in existingData) {
        toast.error('This item is already in your cart');
        return;
      }
      toast.success('You have successfully added an item to your cart');
      localStorage.setItem(
        'cart',
        JSON.stringify({...existingData, [productId]: 1}),
      );
    },
  });

  const gender = product?.gender?.data?.attributes.name;
  const color = product?.color?.data?.attributes.name;
  const sizes = product?.sizes?.data;
  const categories = product?.categories?.data;

  return (
    <HeaderLayout>
      <Container maxWidth="xl" sx={styles.container}>
        <Box sx={styles.productContainer}>
          <ImageSlider
            images={
              product?.images?.data?.map(({attributes: {url}}) => url) || []
            }
          />
        </Box>
        <Box sx={styles.productContainer}>
          <Box sx={styles.textContainer}>
            <Typography variant="h1">{product?.name}</Typography>
            <Typography variant="h4" sx={styles.productPrice}>
              ${product?.price}
            </Typography>
          </Box>
          <Box sx={styles.subheader}>
            {gender && (
              <Typography variant="h4" sx={styles.productGender}>
                {gender}&apos;s Shoes
              </Typography>
            )}
            {color && (
              <Typography variant="h4" sx={styles.productGender}>
                | {color}
              </Typography>
            )}
          </Box>
          <Box sx={styles.categories}>
            <Typography variant="h4">Categories: </Typography>
            {categories?.map(({id, attributes: {name}}) => (
              <Typography key={id} component="span" sx={styles.category}>
                {name}
              </Typography>
            ))}
          </Box>
          {sizes && (
            <Box sx={styles.sizesContainer}>
              <Typography variant="h4" sx={styles.productLabel}>
                Select Size
              </Typography>
              <Box sx={styles.buttonsList}>
                {sizes
                  .sort((a, b) => a.attributes.value - b.attributes.value)
                  .map(({id, attributes: {value}}) => {
                    const isChecked = id === choosedSize;
                    return (
                      <Button
                        key={id}
                        sx={{
                          ...styles.button,
                          color: isChecked ? 'white' : 'text.secondary',
                        }}
                        variant={isChecked ? 'contained' : 'outlined'}
                        onClick={() => setChoosedSize(id)}
                      >
                        EU-{value}
                      </Button>
                    );
                  })}
              </Box>
            </Box>
          )}
          <Box sx={styles.btnContainer}>
            <Button variant="contained" sx={styles.addToCartButton}>
              Favorite
            </Button>
            <Button
              onClick={() => mutate()}
              variant="contained"
              sx={styles.addToCartButton}
            >
              Add to Bag
            </Button>
          </Box>
          <Box sx={styles.description}>
            <Typography variant="h4">Description</Typography>
            <Typography variant="h4" sx={styles.productLabel}>
              {product?.description}
            </Typography>
          </Box>
        </Box>
      </Container>
    </HeaderLayout>
  );
};

export default Product;
