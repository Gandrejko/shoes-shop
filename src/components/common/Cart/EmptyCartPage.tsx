import {useRouter} from 'next/navigation';
import React from 'react';
import {Box, Typography, Button} from '@mui/material';
import Image from 'next/image';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: {
      xl: '60vh',
      lg: '65vh',
      md: '70vh',
      sm: '80vh',
      xs: '80vh',
    },
  },
  imageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#b5bdcb',
    borderRadius: '50%',
    marginBottom: 4,
  },
  title: {
    fontWeight: 700,
    fontSize: 20,
    marginBottom: 2,
  },
  description: {
    color: '#text.secondary',
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
  const router = useRouter();
  return (
    <Box sx={styles.container}>
      <Box sx={styles.imageWrapper}>
        <Image src="/icons/emptyCart.svg" alt="cart" width={32} height={32} />
      </Box>
      <Typography component="p" sx={styles.title}>
        You don&apos;t have any products yet.
      </Typography>
      <Typography component="p" sx={styles.description}>
        You can add products to your store by clicking the button below.
      </Typography>
      <Button
        variant="contained"
        sx={styles.button}
        onClick={() => router.push('/products')}
      >
        Add product
      </Button>
    </Box>
  );
};

export default EmptyCartPage;
