import {
  Avatar,
  Box,
  Button,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import {ReactElement, useEffect, useMemo, useState} from 'react';

import ProductList from '@/components/common/Product/ProductList';
import {FilterSidebar} from '@/components/layouts/FilterSidebar/FilterSidebar';
import HeaderLayout from '@/components/layouts/HeaderLayout/HeaderLayout';
import {SignInLayout} from '@/components/layouts/SignInLayout/SignInLayout';
import theme from '@/config/theme';
import {NextPageWithLayout} from '@/pages/_app';
import {ProductsResponse} from '@/types';
import buildParams from '@/utils/buildParams';
import axios from 'axios';
import {GetServerSidePropsContext} from 'next';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {SortDropdown} from '@/components/ui/SortDropdown/SortDropdown';

const styles: Record<string, SxProps> = {
  container: {
    padding: {xs: 0, md: '35px'},
    marginTop: 3,
    width: 1,
  },
  productsContainer: {
    padding: {xs: '0 24px', md: 0},
  },
  productsHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  filterButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  buttonStyles: {
    color: 'text.secondary',
    minWidth: {sm: '100px', md: '160px', lg: '200px'},
  },
};

type Props = {
  initialProducts: ProductsResponse;
  initialPages: number[];
};

const MyProducts: NextPageWithLayout<Props> = ({
  initialPages,
  initialProducts,
}) => {
  const router = useRouter();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showFilters, setShowFilters] = useState(!isMobile);
  const [productsCount, setProductsCount] = useState(0);

  const params = useMemo(() => {
    return buildParams(router.query, {
      populate: '*',
    });
  }, [router.query]);

  useEffect(() => {
    setShowFilters(!isMobile);
  }, [isMobile]);

  return (
    <Stack direction="row" justifyContent="center">
      <FilterSidebar
        open={showFilters}
        searchingString={params['filters[name][$containsi]'] as string}
        productsCount={productsCount}
        onClose={() => setShowFilters(false)}
      />
      <Box sx={styles.container} marginLeft={showFilters && !isMobile ? 2 : 0}>
        <Box sx={styles.productsContainer}>
          <Stack direction="row" sx={styles.productsHeader}>
            <Typography variant="h1">Search Results</Typography>
            <Box sx={styles.filterButtons}>
              <SortDropdown />
              <Button
                variant="text"
                sx={styles.buttonStyles}
                onClick={() => setShowFilters(!showFilters)}
                endIcon={
                  <Image
                    src={`/icons/filters${showFilters ? 'Hide' : 'Show'}.svg`}
                    alt=""
                    width={24}
                    height={24}
                  />
                }
              >
                {showFilters && 'Hide'} Filters
              </Button>
            </Box>
          </Stack>
          <ProductList
            params={params}
            fullWidth={!showFilters}
            initialPages={initialPages}
            initialProducts={initialProducts}
            setProductsCount={count => setProductsCount(count)}
          >
            <Stack gap={1} marginY={2}>
              <Avatar
                sx={{
                  width: 72,
                  height: 72,
                  marginX: 'auto',
                  bgcolor: 'grey.A100',
                }}
              >
                <Image
                  src="/icons/emptyCart.svg"
                  alt="Empty cart"
                  width={20}
                  height={20}
                />
              </Avatar>
              <Typography variant="h4" textAlign="center">
                {"We couldn't find any products"}
              </Typography>
              <Typography fontWeight={300} textAlign="center">
                {'Try adjusting your search or filter to find what you want'}
              </Typography>
            </Stack>
          </ProductList>
        </Box>
      </Box>
    </Stack>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const params = buildParams(context.query, {
    'pagination[page]': 1,
    'pagination[pageSize]': 15,
    'filters[teamName]': 'team-3',
    populate: '*',
  });

  const response = await axios.get<ProductsResponse>(
    `${process.env.API_URL}/products`,
    {params},
  );

  if (!response.data) {
    return {
      redirect: {
        destination: '/products',
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialProducts: response.data,
      initialPages: [1],
    },
  };
};

MyProducts.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>Catalog</title>
      </Head>
      <SignInLayout>
        <HeaderLayout>{page}</HeaderLayout>
      </SignInLayout>
    </>
  );
};

export default MyProducts;
