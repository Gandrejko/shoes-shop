import EditProduct from '@/components/common/EditProduct/EditProduct';
import {FiltersData} from '@/types';
import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {ReactElement, useMemo, useState} from 'react';

import ProductList from '@/components/common/Product/ProductList';
import HeaderLayout from '@/components/layouts/HeaderLayout/HeaderLayout';
import {SidebarLayout} from '@/components/layouts/SidebarLayout/SidebarLayout';
import {NextPageWithLayout} from '@/pages/_app';
import {ProductsResponse} from '@/types';
import axios from 'axios';
import {GetServerSidePropsContext} from 'next';
import {getServerSession} from 'next-auth';
import Link from 'next/link';
import {authOptions} from '../api/auth/[...nextauth]';

const styles: Record<string, SxProps> = {
  container: {
    padding: {xs: 0, md: '35px 16px'},
    paddingLeft: {xs: 0, md: 4},
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
    color: '#fff',
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

type Props = {
  sessionUser: any;
  initialProducts: ProductsResponse;
  initialPages: number[];
  filtersData: FiltersData;
};

const Me: NextPageWithLayout<Props> = ({
  sessionUser,
  initialProducts,
  initialPages,
  filtersData,
}) => {
  const [productsCount, setProductsCount] = useState(0);

  const router = useRouter();
  const productId = router.query.productId as string;

  const productParams = useMemo(() => {
    return {
      populate: 'images,gender',
      'filters[userID]': sessionUser?.id,
    };
  }, [sessionUser?.id]);

  return (
    <Container maxWidth="xl" sx={styles.container}>
      {productId && (
        <EditProduct filtersData={filtersData} productId={productId} />
      )}
      <Box sx={styles.pageHeader}>
        <Box sx={styles.bannerContainer}>
          <Image
            src="/images/myProductsBanner.png"
            alt="My products"
            fill
            style={{objectFit: 'cover'}}
          />
        </Box>
        <Stack sx={styles.profileContainer} direction="row">
          <Box sx={styles.avatarContainer}>
            {sessionUser?.image ? (
              <Image
                src={sessionUser.image}
                alt={`${sessionUser.username}`}
                fill
                style={{objectFit: 'cover'}}
              />
            ) : (
              <Avatar
                sx={styles.avatar}
                src="/"
                alt={`${sessionUser.username}`}
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
      </Box>
      <Box sx={styles.productsContainer}>
        <Stack direction="row" sx={styles.productsHeader}>
          <Typography variant="h1">My Products</Typography>
          {productsCount > 0 && (
            <Button
              LinkComponent={Link}
              href="/products/add"
              variant="contained"
              sx={{textTransform: 'none', padding: '8px 24px'}}
            >
              Add product
            </Button>
          )}
        </Stack>
        <ProductList
          params={productParams}
          initialProducts={initialProducts}
          initialPages={initialPages}
          setProductsCount={count => setProductsCount(count)}
        >
          <Stack gap={4}>
            <Stack gap={1}>
              <Avatar
                sx={{
                  width: 72,
                  height: 72,
                  marginX: 'auto',
                  bgcolor: 'grey.300',
                }}
              >
                <Image
                  src="/icons/emptyCart.svg"
                  alt="Empty cart"
                  width={20}
                  height={20}
                />
              </Avatar>
              <Typography variant="h4">
                {"You don't have any products yet"}
              </Typography>
              <Typography fontWeight={300}>
                {'Post can contain video, images and text'}
              </Typography>
            </Stack>
            <Button
              LinkComponent={Link}
              href="/products/add"
              variant="contained"
              sx={{
                textTransform: 'none',
                width: 150,
                marginX: 'auto',
                padding: '8px 24px',
              }}
            >
              Add product
            </Button>
          </Stack>
        </ProductList>
      </Box>
    </Container>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const user = session?.user;

  const response = await axios.get<ProductsResponse>(
    `${process.env.API_URL}/products`,
    {
      params: {
        'pagination[page]': 1,
        'pagination[pageSize]': 15,
        'filters[userID]': user?.id,
        populate: 'images,gender',
      },
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    },
  );

  if (!response.data) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  const {data: genders} = await axios.get(`${process.env.API_URL}/genders`);
  const {data: colors} = await axios.get(`${process.env.API_URL}/colors`);
  const {data: categories} = await axios.get(
    `${process.env.API_URL}/categories`,
  );
  const {data: brands} = await axios.get(`${process.env.API_URL}/brands`);
  const {data: sizes} = await axios.get(`${process.env.API_URL}/sizes`);

  return {
    props: {
      sessionUser: {...user, name: null},
      initialProducts: response.data,
      initialPages: [1],
      filtersData: {
        genders,
        colors,
        categories,
        brands,
        sizes,
      },
    },
  };
};

Me.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>My products</title>
      </Head>
      <HeaderLayout>
        <SidebarLayout currentTab="products">{page}</SidebarLayout>
      </HeaderLayout>
    </>
  );
};

export default Me;
