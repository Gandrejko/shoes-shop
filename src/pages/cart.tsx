import React from 'react';
import {Box, Typography} from '@mui/material';
import ProductItem from '@/components/Cart/CartItem';
import SummarySection from '@/components/Cart/SummarySection';
import EmptyCartPage from '@/components/Cart/EmptyCartPage';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import Header from '@/components/Header';
import theme from '@/styles/theme/commonTheme';
import products from '@/temp/data';

const cartPageStyles = {
  container: {
    display: 'flex',
    gap: '10%',
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
};

const CartPage = () => {
  const queryClient = useQueryClient();

  const {data: cartIds} = useQuery({
    queryKey: ['cart'],
    queryFn: async () => JSON.parse(localStorage.getItem('cart') || '{}'),
  });

  const cartProducts = cartIds
    ? Object.keys(cartIds)
        .map(id => products.find(product => product.id === +id))
        .filter(item => item != undefined)
    : [];
  const isEmpty = !cartIds || cartIds.length === 0;

  return (
    <>
      <Header />
      <Box sx={cartPageStyles.container}>
        {isEmpty && (
          <Box sx={cartPageStyles.emptyCartContainer}>
            <EmptyCartPage />
          </Box>
        )}

        {!isEmpty && (
          <>
            <Box
              sx={{width: '62%', '@media (max-width: 1230px)': {width: '100%'}}}
            >
              <Typography variant="h1">Cart</Typography>
              {cartProducts.map(product => (
                <ProductItem
                  cartIds={cartIds}
                  key={product?.id}
                  product={product}
                />
              ))}
            </Box>
            <Box
              sx={{
                flexShrink: 2,
                width: '38%',
                '@media (max-width: 1230px)': {width: '100%'},
              }}
            >
              <SummarySection
                products={Object.entries(cartIds).map(([id, quantity]) => ({
                  id,
                  quantity,
                  price: products.find(product => product.id.toString() === id)
                    ?.price,
                }))}
              />
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default CartPage;
