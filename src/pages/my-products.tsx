import EditProduct from '@/components/EditProduct/EditProduct';
import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {ReactElement, useMemo, useState, useEffect} from 'react';

import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import {ProductList} from '@/components/Product';
import {SidebarLayout} from '@/components/SidebarLayout/SidebarLayout';
import {NextPageWithLayout} from '@/pages/_app';
import {useSession} from 'next-auth/react';
import Link from 'next/link';
import {ProfileSkeleton} from '@/components/ProfileSkeleton/ProfileSkeleton';

const styles: Record<string, SxProps> = {
  container: {
    padding: {xs: 0, md: '35px 16px'},
    marginLeft: {xs: 0, md: 3},
  },
  pageHeader: {
    position: 'relative',
    overflow: 'hidden',
    aspectRatio: {
      xs: 630 / 250,
      sm: 630 / 230,
      md: 1480 / 630,
      lg: 1480 / 450,
      xl: 1480 / 360,
    },
    marginBottom: {xs: 3, sm: 5},
  },
  bannerContainer: {
    position: 'relative',
    height: {
      xs: 'calc(100% - 50px)',
      sm: 'calc(100% - 65px)',
      md: 'calc(100% - 90px)',
    },
  },
  profileContainer: {
    position: 'absolute',
    bottom: 0,
    left: {xs: 20, md: 40, xl: 60},
    alignItems: 'flex-end',
  },
  avatarContainer: {
    position: 'relative',
    overflow: 'hidden',
    width: {xs: 64, sm: 90, md: 120},
    height: {xs: 64, sm: 90, md: 120},
    border: '4px solid #fff',
    borderRadius: '50%',
  },
  avatar: {
    bgcolor: 'primary.main',
    fontSize: {xs: 20, sm: 35, md: 45},
    width: 1,
    height: 1,
  },
  profileInfo: {
    marginLeft: {xs: 2, sm: 3},
    marginBottom: {xs: 0, sm: 1, md: 3},
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
  const router = useRouter();
  const {data} = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const sessionUser = data?.user;

  const productId = router.query.productId as string;
  const productParams = useMemo(() => {
    return {
      populate: 'images,gender',
      'filters[userID]': sessionUser?.id,
    };
  }, [sessionUser?.id]);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  return (
    <Container maxWidth="xl" sx={styles.container}>
      {productId && <EditProduct productId={productId} />}
      <Box sx={styles.pageHeader}>
        <Box sx={styles.bannerContainer}>
          <Image
            src="/images/myProductsBanner.png"
            alt="My products"
            fill
            style={{objectFit: 'cover'}}
          />
        </Box>
        {isLoading ? (
          <Box sx={styles.profileContainer}>
            <ProfileSkeleton />
          </Box>
        ) : (
          <Stack sx={styles.profileContainer} direction="row">
            <Box sx={styles.avatarContainer}>
              {sessionUser?.image ? (
                <Image
                  src={sessionUser.image}
                  alt={`${sessionUser?.username}`}
                  fill
                />
              ) : (
                <Avatar
                  sx={styles.avatar}
                  src="/"
                  alt={`${sessionUser?.username}`}
                />
              )}
            </Box>
            <Stack sx={styles.profileInfo}>
              <Typography variant="h4" fontSize={14}>
                {sessionUser?.firstName && sessionUser?.lastName
                  ? `${sessionUser?.firstName} ${sessionUser?.lastName}`
                  : `${sessionUser?.username}`}
              </Typography>
              <Typography fontWeight={300} fontSize={14}>
                1374 bonus points
              </Typography>
            </Stack>
          </Stack>
        )}
      </Box>
      <Box sx={styles.productsContainer}>
        <Stack direction="row" sx={styles.productsHeader}>
          <Typography variant="h1">My Products</Typography>
          <Button
            LinkComponent={Link}
            href="/add-product"
            variant="contained"
            sx={{textTransform: 'none', padding: '8px 24px'}}
          >
            Add product
          </Button>
        </Stack>
        <ProductList params={productParams} />
      </Box>
    </Container>
  );
};

MyProducts.getLayout = function getLayout(page: ReactElement) {
  return (
    <HeaderLayout>
      <SidebarLayout currentTab="products">{page}</SidebarLayout>
    </HeaderLayout>
  );
};

export default MyProducts;
