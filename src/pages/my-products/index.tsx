import Image from 'next/image';
import {ReactElement} from 'react';
import {
  Avatar,
  Box,
  Container,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';

import products from '@/temp/data';
import {NextPageWithLayout} from '../_app';
import {SidebarLayout} from '@/components/SidebarLayout/SidebarLayout';
import ProductList from '@/components/Product/ProductList';
import {Button} from '@/components/Button/Button';

const styles: Record<string, SxProps> = {
  container: {
    padding: {xs: 0, md: '35px 16px'},
    marginLeft: {xs: 0, md: 3},
  },
  pageHeader: {
    position: 'relative',
    overflow: 'hidden',
    aspectRatio: {
      xs: 630 / 300,
      sm: 630 / 250,
      md: 1480 / 630,
      lg: 1480 / 450,
      xl: 1480 / 360,
    },
    marginBottom: 5,
  },
  bannerContainer: {
    position: 'relative',
    height: 'calc(100% - 90px)',
  },
  profileContainer: {
    position: 'absolute',
    bottom: 0,
    left: {xs: 20, md: 40, xl: 60},
    alignItems: 'flex-end',
  },
  avatarContainer: {
    width: '120px',
    height: '120px',
    border: '4px solid #fff',
    borderRadius: '50%',
  },
  avatar: {
    bgcolor: 'primary.main',
    fontSize: 45,
    width: 1,
    height: 1,
  },
  profileInfo: {
    marginLeft: 3,
    marginBottom: 2,
  },
  productsContainer: {
    padding: {xs: '0 24px', md: 0},
  },
  productsHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
};

const MyProducts: NextPageWithLayout = () => {
  const userImage = null; // TODO: temporary

  return (
    <Container maxWidth="xl" sx={styles.container}>
      <Box sx={styles.pageHeader}>
        <Box sx={styles.bannerContainer}>
          <Image src="/images/myProductsBanner.png" alt="My products" fill />
        </Box>
        <Stack sx={styles.profileContainer} direction="row">
          <Box sx={styles.avatarContainer}>
            {userImage && <Image src={userImage} alt="Jane Meldrum" fill />}
            {!userImage && (
              <Avatar sx={styles.avatar} src="/" alt="Jane Meldrum" />
            )}
          </Box>
          <Stack sx={styles.profileInfo}>
            <Typography variant="h4">Jane Meldrum</Typography>
            <Typography fontWeight={300}>1374 bonus points</Typography>
          </Stack>
        </Stack>
      </Box>
      <Box sx={styles.productsContainer}>
        <Stack direction="row" sx={styles.productsHeader}>
          <Typography variant="h1">My Products</Typography>
          <Button sx={{textTransform: 'none', padding: '8px 24px'}}>
            Add product
          </Button>
        </Stack>
        <ProductList products={products} />
      </Box>
    </Container>
  );
};

MyProducts.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout currentTab="products">{page}</SidebarLayout>;
};

export default MyProducts;
