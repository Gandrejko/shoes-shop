import React from 'react';
import {Box, Typography, Button} from '@mui/material';
import Image from 'next/image';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    marginTop: {
      xl: '200px',
      lg: '200px',
      sm: '250px',
      xs: '200px',
    },
  },
  imageWrapper: {
    padding: '24px',
    background: '#F9FAFB',
    borderRadius: '50%',
  },
  title: {
    fontWeight: 700,
    fontSize: 20,
    marginBottom: 2,
  },
  description: {
    color: '#5C5C5C',
    fontWeight: 300,
    fontSize: 15,
    marginBottom: 6,
  },
  button: {
    width: {
      xl: '20%',
      lg: '20%',
      sm: '30%',
      xs: '50%',
    },
    height: '8%',
  },
};

const EmptyCartPage = () => {
  return (
    <Box sx={styles.container}>
      <Image
        src="/icons/cart.svg"
        alt="cart"
        width={32}
        height={32}
        style={styles.imageWrapper}
      />
      <Typography component="p" sx={styles.title}>
        You don't have any products yet.
      </Typography>
      <Typography component="p" sx={styles.description}>
        Post can contain video, images and text.
      </Typography>
      <Button variant="contained" sx={styles.button}>
        Add product
      </Button>
    </Box>
  );
};

export default EmptyCartPage;
