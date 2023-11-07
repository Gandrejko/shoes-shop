import React from 'react';
import { Box, Container, Typography, SxProps, Card, CardMedia, Grid } from '@mui/material';
import products from '@/temp/data';
import ImageSlider from '@/components/ImageSlider/ImageSlider';
import Header from '@/components/Header';
import { Button } from '@/components/Button/Button';
const sizes = ['EU-36', 'EU-37', 'EU-38', 'EU-39', 'EU-40', 'EU-41', 'EU-42', 'EU-43', 'EU-44', 'EU-45'];



const styles: Record<string, SxProps> = {
  container: {
    padding: { xs: '16px', md: '35px', display: 'flex', gap: '50px' },
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
  picturesContainer: {
    marginBottom: '20px',
    width: '100%',
  },
  buttonSize: {
    backgroundColor:'blue',
    padding: '12px 16px',
    minWidth: '85px',
    height: '55px',
    textTransform: 'none',
  },
  sizesContainer: {
    marginTop: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '26px',
    width: '100%',
  },
  btnContainer: {
    marginTop: '10px',
    display: 'flex',
    gap: '26px',
    width: '100%',
  },


  description:{
    marginTop:'40px',
    display:'flex',
    flexDirection:'column',
    gap:'30px'
  }
};


const SingleProductPage = () => {
  const product = products[0];

  return (
    <Container maxWidth="xl" sx={styles.container}>
      <Box sx={styles.productContainer}>
        <ImageSlider />
      </Box>

      <Box sx={styles.productContainer}>
        <Box sx={styles.textContainer}>
          <Typography variant="h1" sx={styles.productName}>
            {product.name}
          </Typography>
          <Typography variant="h4" sx={styles.productPrice}>
            ${product.price}
          </Typography>
        </Box>

        <Box sx={styles.picturesContainer}>
          <Typography variant="h4" sx={styles.productGender}>
            {product.gender}'s Shoes
          </Typography>
          <Grid container spacing={2}>
            {products.map((p) => (
              <Grid item key={p.id} xs={4} sm={3} md={2}>
                <Card sx={styles.productImageCard}>
                  <CardMedia component="img" alt={p.name} image={p.image} sx={{ height: '4%' }} />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={styles.sizesContainer}>
          <Typography variant="h4" sx={styles.productLabel}>
            Select Size
          </Typography>

          <Box sx={styles.sizesContainer}>
            {sizes.map((size, index) => (
              <Button
                key={index}
                variant='outlined'
                sx={styles.buttonSize}
              >
                {size}
              </Button>
            ))}
          </Box>
        </Box>


        <Box sx={styles.btnContainer}>
          <Button isTransparent sx={styles.addToCartButton}>Favorite</Button>
          <Button isTransparent sx={styles.addToCartButton}>Add to Bag</Button>
        </Box>


        <Box sx={styles.description}>
          <Typography variant="h4">
            Description
          </Typography>
          <Typography variant="h4" sx={styles.productLabel}>
            Boasting the first-ever Max Air unit created specifically for Nike Sportswear, the Nike Air Max 270 delivers an Air unit that absorbs and gives back energy with every springy step. Updated for modern comfort, it nods to the original, 1991 Air Max 180 with its exaggerated tongue top and heritage tongue logo.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SingleProductPage;
