import ProductItem from '@/components/Cart/CartItem';
import EmptyCartPage from '@/components/Cart/EmptyCartPage';
import SummarySection from '@/components/Cart/SummarySection';
import {Box, Typography} from '@mui/material';
import {useQuery, useQueryClient} from '@tanstack/react-query';

// Import your mock product data
import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import products from '@/temp/data';

type Product = {
  id: number;
  name: string;
  image: string;
  gender: string;
  available: string;
  price: number;
  quantity: number;
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
  console.log(cartProducts);
  return (
    <HeaderLayout>
      <Box
        sx={{
          display: 'flex',
          gap: '10%',
          marginLeft: '10%',
          marginRight: '10%',
        }}
      >
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

              {cartProducts.map(product => (
                <ProductItem
                  cartIds={cartIds}
                  key={product?.id}
                  product={product}
                />
              ))}
            </Box>
            <Box sx={{width: '38%'}}>
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
    </HeaderLayout>
  );
};

export default CartPage;
