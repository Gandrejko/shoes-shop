import {
  Box,
  Button,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import {ReactElement, useEffect, useMemo, useState} from 'react';

import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import ProductList from '@/components/Product/ProductList';
import {FilterSidebar} from '@/layouts/FilterSidebar/FilterSidebar';
import {NextPageWithLayout} from '@/pages/_app';
import theme from '@/styles/theme/commonTheme';
import {useRouter} from 'next/router';
import Head from 'next/head';
import {SignInLayout} from '@/layouts/SignInLayout/SignInLayout';

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
};

const MyProducts: NextPageWithLayout = () => {
  const router = useRouter();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showFilters, setShowFilters] = useState(!isMobile);

  const params = useMemo(() => {
    const query = router.query;
    const newParams: Record<string, string | number> = {};

    const genders = query.gender ? (query.gender as string).split(',') : [];
    const brands = query.brand ? (query.brand as string).split(',') : [];
    const colors = query.color ? (query.color as string).split(',') : [];
    const sizes = query.sizes ? (query.sizes as string).split(',') : [];
    const categories = query.categories
      ? (query.categories as string).split(',')
      : [];

    const searchString = query.searchingString || '';
    const minPrice = query.minPrice || 0;
    const maxPrice = query.maxPrice || 1000;

    genders.forEach((value, index) => {
      newParams[`filters[gender][name][${index}]`] = value;
    });

    brands.forEach((value, index) => {
      newParams[`filters[brand][name][${index}]`] = value;
    });

    colors.forEach((value, index) => {
      newParams[`filters[color][name][${index}]`] = value;
    });

    categories.forEach((value, index) => {
      newParams[`filters[categories][name][${index}]`] = value;
    });

    sizes.forEach((value, index) => {
      newParams[`filters[sizes][value][${index}]`] = value;
    });

    newParams['filters[name][$containsi]'] = searchString as string;
    newParams['filters[price][$gte]'] = minPrice as string;
    newParams['filters[price][$lte]'] = maxPrice as string;
    newParams['populate'] = '*';

    return newParams;
  }, [router.query]);

  useEffect(() => {
    setShowFilters(!isMobile);
  }, [isMobile]);

  return (
    <Stack direction="row" justifyContent="center">
      <FilterSidebar
        open={showFilters}
        searchingString={params['filters[name][$containsi]'] as string}
        productCount={100}
        onClose={() => setShowFilters(false)}
      />
      <Box sx={styles.container} marginLeft={showFilters && !isMobile ? 2 : 0}>
        <Box sx={styles.productsContainer}>
          <Stack direction="row" sx={styles.productsHeader}>
            <Typography variant="h1">Search Results</Typography>
            <Button
              variant="text"
              sx={{color: 'text.secondary'}}
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
          </Stack>
          <ProductList params={params} fullWidth={!showFilters} />
        </Box>
      </Box>
    </Stack>
  );
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
