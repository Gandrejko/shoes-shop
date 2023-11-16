import React from 'react';
import { Box, Typography } from '@mui/material';
import ProductItem from '@/components/Cart/CartItem';
import SummarySection from '@/components/Cart/SummarySection';
import EmptyCartPage from '@/components/Cart/EmptyCartPage';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Header from '@/components/Header';
import theme from '@/styles/theme/commonTheme';
import useGet from '@/hooks/useGet';
import { ProductsResponse } from '@/types/product';
import ProductItemSkeleton from '@/components/Cart/ProductItemSkeleton';
import SummarySectionSkeleton from '@/components/Cart/SummarySectionSkeleton';
import { SxProps } from '@mui/system';

const styles: Record<string, SxProps> = {
  container: {
    display: 'flex',
    gap: '5%',
    margin: {
      xl: '100px 10% 50px 10%',
      lg: '50px 8% 50px 8%',
      sm: '50px 5% 50px 5%',
      xs: '30px 5% 50px 5%',
    },
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
    },
  },
  emptyCartContainer: {
    fontSize: {
      xl: '155px 305px 0 196px',
      lg: '155px 13% 0 10%',
      sm: '180px 9% 0 6%',
      xs: '125px 20px 0',
    },
    width: '100%',
    textAlign: 'center',
  },
  cartItem: {
    width: {
      xl: '62%',
      lg: '100%',
      sm: '100%',
      xs: '100%',
    },
  },
  summarySection: {
    flexShrink: 2,
    width: {
      xl: '38%',
      lg: '100%',
      sm: '100%',
      xs: '100%',
    },
  },
  containerSkeleton: {
    gap: '10%',
    display: 'flex',
    flexDirection: {
      [theme.breakpoints.down('lg')]: {
        flexDirection: 'column',
      },
    },
    width: '100%'
  },
  containerSkeletonCartItems: {
    width: {
      xl: '62%',
      lg: '100%',
      sm: '100%',
      xs: '100%',
    },
    display: 'flex',
    flexDirection: "column"
  },
  containerSkeletonSummer: {
    width: {
      xl: '38%',
      lg: '100%',
      sm: '100%',
      xs: '100%',
    },
  }
};

const txtAddFields = (ids: string[]) => ids.map(id => `filters[id]=${id}`).join('&');

const CartPage = () => {
  const queryClient = useQueryClient();

  const { data: cartIds } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => JSON.parse(localStorage.getItem('cart') || '{}'),
  });
  const params = cartIds && txtAddFields(Object.keys(cartIds));

  const isNotEmpty = params !== undefined && params.length !== 0;

  const { data: products, isLoading } = useGet<ProductsResponse>(
    `/products?${params}`,
    {
      enabled: isNotEmpty,
    },
    {
      populate: '*',
    },
  );

  return (
    <>
      <Header />
      <Box sx={styles.container}>
        {isLoading ? (
          <Box sx={styles.containerSkeleton}>
            <Box sx={styles.containerSkeletonCartItems}>
              {[...Array(3)].map((_, index) => (
                <ProductItemSkeleton key={index} />
              ))}
            </Box>
            <Box sx={styles.containerSkeletonSummer}>
              <SummarySectionSkeleton />
            </Box>
          </Box>
        ) : params !== undefined && params.length === 0 ? (
          <Box sx={styles.emptyCartContainer}>
            <EmptyCartPage />
          </Box>
        ) : isNotEmpty ? (
          <>
            <Box sx={styles.cartItem}>
              <Typography variant="h1">Cart</Typography>
              {products &&
                products.data.map(({ id, attributes }) => (
                  <ProductItem
                    productID={id}
                    cartIds={cartIds}
                    key={id}
                    product={attributes}
                  />
                ))}
            </Box>
            <Box sx={styles.summarySection}>
              <SummarySection
                products={Object.entries(cartIds).map(([id, quantity]) => ({
                  id,
                  quantity,
                  price:
                    products?.data.find(
                      ({ id: productID }) => productID.toString() === id,
                    )?.attributes.price || 0,
                }))}
              />
            </Box>
          </>
        ) : null}
      </Box>
    </>
  );
};

export default CartPage;
