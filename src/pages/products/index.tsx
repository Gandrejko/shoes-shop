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
import {ProductList} from '@/components/Product';
import {FilterSidebar} from '@/layouts/FilterSidebar/FilterSidebar';
import {NextPageWithLayout} from '@/pages/_app';
import theme from '@/styles/theme/commonTheme';
import {Filters} from '@/types/data';

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

const Products: NextPageWithLayout = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [showFilters, setShowFilters] = useState(!isMobile);
  const [filters, setFilters] = useState<Filters>({
    brand: [],
    color: [],
    gender: [],
    sizes: [],
    minPrice: 100,
    maxPrice: 300,
  });

  const params = useMemo(() => {
    const newFilters: Record<string, string | number> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          newFilters[`filters[${key}][${index}]`] = item;
        });
      }
    });

    newFilters['filters[price][$gte]'] = filters.minPrice;
    newFilters['filters[price][$lte]'] = filters.maxPrice;
    newFilters['populate'] = '*';
    return newFilters;
  }, [filters]);

  useEffect(() => {
    setShowFilters(!isMobile);
  }, [isMobile]);

  return (
    <Stack direction="row" justifyContent="center">
      <FilterSidebar
        open={showFilters}
        filters={filters}
        searchText="Air Force 1"
        productCount={100}
        onClose={() => setShowFilters(false)}
        setFilters={setFilters}
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

Products.getLayout = function getLayout(page: ReactElement) {
  return <HeaderLayout>{page}</HeaderLayout>;
};

export default Products;
