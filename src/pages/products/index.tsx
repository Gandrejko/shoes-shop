import {
  Box,
  Button,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import {ReactElement, useEffect, useState} from 'react';

import Header from '@/components/Header';
import ProductList from '@/components/Product/ProductList';
import {FilterSidebar} from '@/layouts/FilterSidebar/FilterSidebar';
import {NextPageWithLayout} from '@/pages/_app';
import theme from '@/styles/theme/commonTheme';
import {Filters} from '@/types/data';

const styles: Record<string, SxProps> = {
  container: {
    padding: {xs: 0, md: '35px'},
    marginTop: 3,
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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [filters, setFilters] = useState({} as Filters);
  const [showFilters, setShowFilters] = useState(!isMobile);

  useEffect(() => {
    setShowFilters(!isMobile);
  }, [isMobile]);

  return (
    <Stack direction="row" justifyContent="center">
      <FilterSidebar
        open={showFilters}
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
          <ProductList params={filters} fullWidth={!showFilters} />
        </Box>
      </Box>
    </Stack>
  );
};

MyProducts.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header />
      {page}
    </>
  );
};

export default MyProducts;
