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
import Dropdown from '@/components/ui/Dropdown/Dropdown';

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

const options = [
  {value: 'createdAt:desc', name: 'new first'},
  {value: 'createdAt:asc', name: 'old first'},
  {value: 'price:desc', name: 'high to low'},
  {value: 'price:asc', name: 'low to high'},
];

const MyProducts: NextPageWithLayout<Props> = ({
  initialPages,
  initialProducts,
}) => {
  const router = useRouter();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showFilters, setShowFilters] = useState(!isMobile);
  const [productsCount, setProductsCount] = useState(0);
  const [sortType, setSortType] = useState(options[0].value);

  useEffect(() => {
    const {sort} = router.query;
    if (sort) {
      setSortType(typeof sort === 'string' ? sort : sort[0]);
    }
  }, []);

  const params = useMemo(() => {
    return buildParams(router.query, {
      populate: '*',
    });
  }, [router.query]);

  useEffect(() => {
    setShowFilters(!isMobile);
  }, [isMobile]);

  const handleChooseSort = (value: string) => {
    let updatedQuery: {sort?: string} = {
      ...router.query,
      sort: value,
    };
    if (value === options[0].value) {
      delete updatedQuery['sort'];
    }
    let updatedQueryString = '';
    for (const [key, value] of Object.entries(updatedQuery)) {
      updatedQueryString += `&${key}=${value}`;
    }
    router.push(
      {
        pathname: router.pathname,
        query: updatedQueryString.replace('&', ''),
      },
      undefined,
      {shallow: true},
    );
    setSortType(value);
  };

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
              <Dropdown
                value={sortType}
                options={options}
                onChange={e => handleChooseSort(e.target.value as string)}
                withoutNone
              />
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
