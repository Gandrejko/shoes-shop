import {useState} from 'react';
import {Box, Typography, Button} from '@mui/material';
import Image from 'next/image';
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';

type Product = {
  id: number;
  name: string;
  image: string;
  gender: string;
  available: string;
  price: number;
  quantity: number;
};

type ProductItemProps = {
  product: any;
  cartIds: [id: number];
};

const ProductItem: React.FC<ProductItemProps> = ({product, cartIds}) => {
  const queryClient = useQueryClient();

  const {mutate: deleteProduct} = useMutation({
    mutationKey: ['cart'],
    mutationFn: async () => {
      const updatedCart = Object.keys(cartIds).filter(
        productId => productId !== product.id.toString(),
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['cart']});
    },
  });

  const {mutate: editProduct} = useMutation({
    mutationKey: ['cart'],
    mutationFn: async (type: 'inc' | 'dec') => {
      localStorage.setItem(
        'cart',
        JSON.stringify({
          ...cartIds,
          [product.id]:
            type == 'inc' ? cartIds[product.id] + 1 : cartIds[product.id] - 1,
        }),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['cart']});
    },
  });

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        borderBottom: '1px solid #EAECF0',
        marginTop: '40px',
      }}
    >
      <Box sx={{display: 'flex', marginBottom: 4}}>
        <Image
          src={product?.image}
          alt={product?.name}
          width={220}
          height={220}
        />
        <Box>
          <Typography sx={{fontWeight: '500', fontSize: 30, marginLeft: 2}}>
            {product?.name}
          </Typography>
          <Typography sx={{color: '#5C5C5C', fontSize: 18, marginLeft: 2}}>
            {product?.gender}&apos;s shoes
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              right: '0',
              top: '0',
              justifyContent: 'space-between',
              height: '80%',
            }}
          >
            <Typography
              sx={{
                textAlign: 'right',
                fontWeight: '700',
                fontSize: 18,
                marginLeft: 4,
                marginTop: 1,
              }}
            >
              ${product?.price}
            </Typography>
            <Box
              sx={{
                fontWeight: '700',
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                sx={{
                  color: '#CECECE',
                  backgroundColor: '#E8E8E8',
                  minWidth: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: 'none',
                }}
                onClick={() => editProduct('dec')}
              >
                -
              </Button>
              <Typography sx={{fontWeight: '400', fontSize: 24, marginLeft: 2}}>
                {cartIds[product?.id]}
              </Typography>
              <Button
                sx={{
                  color: '#FE645E',
                  backgroundColor: '#FFD7D6',
                  minWidth: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: 'none',
                  marginLeft: 2,
                }}
                onClick={() => editProduct('inc')}
              >
                +
              </Button>

              <Button
                onClick={() => deleteProduct()}
                variant="outlined"
                sx={{marginLeft: '10px', width: '90px'}}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductItem;
