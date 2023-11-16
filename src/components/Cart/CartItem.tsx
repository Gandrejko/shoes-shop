import {useState} from 'react';
import {Box, Typography, Button, useTheme, SxProps} from '@mui/material';
import Image from 'next/image';
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';
import {ProductAttributes} from '@/types/product';

const styles: Record<string, SxProps> = {
  container: {
    display: 'flex',
    position: 'relative',
    borderBottom: '1px solid #EAECF0',
    marginTop: '40px',
  },
  productDetails: {
    display: 'flex',
    marginBottom: 4,
  },
  productImage: {
    maxWidth: 220,
    position: 'relative',
    width: {
      xl: '200px',
      lg: '200px',
      sm: '150px',
      xs: '130px',
    },
    height: {
      xl: '200px',
      lg: '200px',
      sm: '150px',
      xs: '130px',
    },
    marginRight: '20px',
  },
  productName: {
    fontSize: {
      xl: 30,
      lg: 30,
      sm: 24,
      xs: 16,
    },
  },
  productSubtitle: {
    color: '#5C5C5C',
    fontSize: {
      xl: 20,
      lg: 20,
      sm: 15,
      xs: 12,
    },
  },
  quantityAndDelete: {
    display: 'flex',
    gap: {
      xl: 5,
      lg: 5,
      sm: 4,
      xs: 2,
    },
  },
  priceAndButtons: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    right: 0,
    top: 0,
    justifyContent: 'space-between',
    height: '80%',
  },
  productPrice: {
    lineHeight: 1.2,
    textAlign: 'right',
    fontWeight: '700',
    fontSize: {
      xl: 28,
      lg: 26,
      sm: 28,
      xs: 16,
    },
  },
  quantityButtons: {
    gap: '10px',
    fontWeight: '700',
    fontSize: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  quantityButton: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: '70%',
    borderRadius: '50%',
    border: 'none',
    fontSize: {
      xl: '18px',
      lg: '16px',
      sm: '18px',
      xs: '12px',
    },
    width: {
      xl: '32px',
      lg: '32px',
      sm: '34px',
      xs: '24px',
    },
    height: {
      xl: '32px',
      lg: '32px',
      sm: '34px',
      xs: '24px',
    },
    '&:hover': {
      opacity: '100%',
    },
  },
  deleteButton: {
    width: {
      xl: '120px',
      lg: '90px',
      sm: '120px',
      xs: '80px',
    },
    height: {
      xl: '40px',
      lg: '40px',
      sm: '40px',
      xs: '26px',
    },
  },
};

type ProductItemProps = {
  product: ProductAttributes;
  cartIds: Record<string, number>;
  productID: number;
};

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  cartIds,
  productID,
}) => {
  const queryClient = useQueryClient();
  const theme = useTheme();

  const {mutate: deleteProduct} = useMutation({
    mutationKey: ['cart'],
    mutationFn: async () => {
      const updatedCart = Object.keys(cartIds).filter(
        productId => productId !== productID.toString(),
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
          [productID]:
            type === 'inc' ? cartIds[productID] + 1 : cartIds[productID] - 1,
        }),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['cart']});
    },
  });

  return (
    <Box sx={styles.container}>
      <Box sx={styles.productDetails}>
        <Box sx={styles.productImage}>
          {!product.images?.data?.[0].attributes.url && (
            <Image
              style={{objectFit: 'cover'}}
              fill
              src="/icons/emptyPhoto2.svg"
              alt={product.name || ' '}
            />
          )}

          {product.images?.data?.[0].attributes.url && (
            <Image
              style={{objectFit: 'cover'}}
              fill
              src={product.images?.data?.[0].attributes.url}
              alt={product.name || ' '}
            />
          )}
        </Box>
        <Box>
          <Typography variant="h2" sx={styles.productName}>
            {product?.name}
          </Typography>

          {product.gender?.data?.attributes.name && (
            <Typography sx={styles.productSubtitle}>
              {product.gender?.data?.attributes.name}&apos;s shoes
            </Typography>
          )}

          <Box sx={styles.priceAndButtons}>
            <Typography sx={styles.productPrice}>${product?.price}</Typography>

            <Box sx={styles.quantityAndDelete}>
              <Box sx={styles.quantityButtons}>
                <Box
                  sx={{
                    ...styles.quantityButton,
                    backgroundColor: 'grey.A100',
                    color: 'grey.A200',
                  }}
                  onClick={() => editProduct('dec')}
                >
                  -
                </Box>
                <Typography>{cartIds[productID]}</Typography>
                <Box
                  sx={{
                    ...styles.quantityButton,
                    backgroundColor: 'primary.main',
                    color: 'background.default',
                  }}
                  onClick={() => editProduct('inc')}
                >
                  +
                </Box>
              </Box>
              <Button
                variant="outlined"
                onClick={() => deleteProduct()}
                sx={styles.deleteButton}
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
