import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import useGet from '@/hooks/useGet';
import {ProductResponse, ProductsResponse} from '@/types/product';
import React, {useState} from 'react';
import {Box, Container, Typography, SxProps, Button} from '@mui/material';
import ImageSlider from '@/components/ImageSlider/ImageSlider';
import {useRouter} from 'next/router';
import {useMutation} from '@tanstack/react-query';
import {toast} from 'react-toastify';

const styles: Record<string, SxProps> = {
  container: {
    padding: {xs: '16px', md: '35px', display: 'flex', gap: '50px'},
  },
  productContainer: {
    width: '100%',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  productImage: {
    width: '100%',
    maxWidth: '400px',
  },
  productName: {
    fontSize: '45px',
    fontWeight: 500,
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
  addToCartButton: {
    minWidth: '48%',
    padding: '16px 70px',
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
  btnContainer: {
    marginTop: '10px',
    display: 'flex',
    gap: '26px',
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

  const {data} = useGet<ProductResponse>(
    `products/${productId}`,
    {
      enabled: productId !== undefined,
    },
    {
      populate: '*',
    },
  );
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

  return (
    <HeaderLayout>
      <Container maxWidth="xl" sx={styles.container}>
        <Box sx={styles.productContainer}>
          <ImageSlider />
        </Box>
        <Box sx={styles.productContainer}>
          <Box sx={styles.textContainer}>
            <Typography variant="h1" sx={styles.productName}>
              {product?.name}
            </Typography>
            <Typography variant="h4" sx={styles.productPrice}>
              ${product?.price}
            </Typography>
          </Box>
          <Box sx={styles.subheader}>
            <Typography variant="h4" sx={styles.productGender}>
              {product?.gender?.data?.attributes.name}&apos;s Shoes
            </Typography>
            |
            <Typography variant="h4" sx={styles.productGender}>
              {product?.color?.data?.attributes.name}
            </Typography>
          </Box>
          <Box sx={styles.sizesContainer}>
            <Typography variant="h4" sx={styles.productLabel}>
              Select Size
            </Typography>
            <Box sx={styles.buttonsList}>
              {product.sizes?.data
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
              Boasting the first-ever Max Air unit created specifically for Nike
              Sportswear, the Nike Air Max 270 delivers an Air unit that absorbs
              and gives back energy with every springy step. Updated for modern
              comfort, it nods to the original, 1991 Air Max 180 with its
              exaggerated tongue top and heritage tongue logo.
            </Typography>
          </Box>
        </Box>
      </Container>
    </HeaderLayout>
  );
};

export default Product;
