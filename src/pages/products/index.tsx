import {
  Box,
  Button,
  Container,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {ReactElement, useState} from 'react';

import Header from '@/components/Header';
import ProductList from '@/components/Product/ProductList';
import {FilterSidebar} from '@/layouts/FilterSidebar/FilterSidebar';
import {NextPageWithLayout} from '@/pages/_app';
import {Filters} from '@/types';

const styles: Record<string, SxProps> = {
  container: {
    padding: {xs: 0, md: '35px 16px'},
    marginLeft: {xs: 0, md: 3},
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
  const [filters, setFilters] = useState({} as Filters);

  return (
    <Stack direction="row">
      <FilterSidebar setFilters={setFilters} />
      <Container maxWidth="xl" sx={styles.container}>
        <Box sx={styles.productsContainer}>
          <Stack direction="row" sx={styles.productsHeader}>
            <Typography variant="h1">Search Results</Typography>
            <Button
              variant="text"
              sx={{color: 'text.secondary'}}
              endIcon={
                <Image
                  src="/icons/filtersHide.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              }
            >
              Hide Filters
            </Button>
          </Stack>
          <ProductList params={filters} />
        </Box>
      </Container>
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
