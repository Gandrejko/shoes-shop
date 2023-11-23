import {
  Avatar,
  Box,
  Button,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import {ReactElement, useEffect, useMemo, useState} from 'react';

import ProductList from '@/components/common/Product/ProductList';
import {FilterSidebar} from '@/components/layouts/FilterSidebar/FilterSidebar';
import HeaderLayout from '@/components/layouts/HeaderLayout/HeaderLayout';
import {SignInLayout} from '@/components/layouts/SignInLayout/SignInLayout';
import {SortDropdown} from '@/components/ui/SortDropdown/SortDropdown';
import {NextPageWithLayout} from '@/pages/_app';
import {FiltersData, ProductsResponse} from '@/types';
import buildParams from '@/utils/buildParams';
import axios from 'axios';
import {GetServerSidePropsContext} from 'next';
import Head from 'next/head';
import {useRouter} from 'next/router';

const styles: Record<string, SxProps> = {
  container: {
    maxWidth: 1850,
    marginX: 'auto',
  },
  pageContainer: {
    padding: {xs: 0, md: 4},
    marginTop: 3,
    width: 1,
  },
  productsContainer: {
    padding: {xs: '0 24px', md: 0},
  },
  productsHeader: {
    flexDirection: {lg: 'row'},
    alignItems: {xs: 'start', lg: 'center'},
    justifyContent: {lg: 'space-between'},
    marginBottom: 3,
  },
  filterButtons: {
    marginTop: '15px',
    display: 'flex',
    gap: '10px',
  },
  buttonStyles: {
    color: 'text.secondary',
    outline: '2px solid #bdbdbd',
    minWidth: {xs: '140px', lg: '200px'},
  },
};

type Props = {
  initialProducts: ProductsResponse;
  initialPages: number[];
  filtersData: FiltersData;
};

const MyProducts: NextPageWithLayout<Props> = ({
  initialPages,
  initialProducts,
  filtersData,
}) => {
  const theme = useTheme();
  const router = useRouter();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showFilters, setShowFilters] = useState(!isMobile);
  const [productsCount, setProductsCount] = useState(0);

  const params = useMemo(() => {
    return buildParams(router.query, {
      populate: 'images,gender',
    });
  }, [router.query]);

  useEffect(() => {
    setShowFilters(!isMobile);
  }, [isMobile]);

  return (
    <Stack direction="row" justifyContent="center" sx={styles.container}>
      <FilterSidebar
        open={showFilters}
        searchingString={params['filters[name][$containsi]'] as string}
        productsCount={productsCount}
        onClose={() => setShowFilters(false)}
        filtersData={filtersData}
      />
      <Box sx={styles.pageContainer}>
        <Box sx={styles.productsContainer}>
          <Stack sx={styles.productsHeader}>
            <Typography variant="h1">Search Results</Typography>
            <Box sx={styles.filterButtons}>
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
                    style={{
                      filter:
                        theme.palette.mode === 'dark'
                          ? 'brightness(2)'
                          : 'brightness(1)',
                    }}
                  />
                }
              >
                {showFilters && 'Hide'} Filters
              </Button>
              <SortDropdown />
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

  const {data: genders} = await axios.get(`${process.env.API_URL}/genders`);
  const {data: colors} = await axios.get(`${process.env.API_URL}/colors`);
  const {data: categories} = await axios.get(
    `${process.env.API_URL}/categories`,
  );
  const {data: brands} = await axios.get(`${process.env.API_URL}/brands`);
  const {data: sizes} = await axios.get(`${process.env.API_URL}/sizes`);

  return {
    props: {
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
