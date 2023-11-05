import {Box, Typography} from '@mui/material';
import ProductItem from '@/components/Cart/CartItem';
import SummarySection from '@/components/Cart/SummarySection';
import EmptyCartPage from '@/components/Cart/EmptyCartPage';
import products from '@/temp/data';

const CartPage = () => {
  //to check emptyPage write:      const isEmpty = products.length === 6;

  const isEmpty = products.length == 0;

  return (
    <Box sx={{display: 'flex', gap: '10%'}}>
      {isEmpty ? (
        <Box sx={{width: '100%', textAlign: 'center'}}>
          <EmptyCartPage />
        </Box>
      ) : (
        <>
          <Box sx={{width: '62%'}}>
            <Typography
              component="h1"
              sx={{fontWeight: 500, fontSize: 45, marginBottom: 2}}
            >
              Cart
            </Typography>
            {products.map(product => (
              <ProductItem product={product} key={product.id} />
            ))}
          </Box>
          <Box sx={{width: '38%'}}>
            <SummarySection products={products} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartPage;
