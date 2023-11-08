import {Box, Typography} from '@mui/material';
import {Button} from '@/components/Button/Button';
import Image from 'next/image';

type Product = {
  id: number;
  name: string;
  image: string;
  gender: string;
  available: string;
  price: number;
};

const ProductItem = ({product}: {product: Product}) => {
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
          src={product.image}
          alt={product.name}
          width={220}
          height={220}
        />
        <Box>
          <Typography sx={{fontWeight: '500', fontSize: 30, marginLeft: 2}}>
            {product.name}
          </Typography>
          <Typography sx={{color: '#5C5C5C', fontSize: 18, marginLeft: 2}}>
            {product.gender}'s shoes
          </Typography>
          <Typography
            sx={{
              color: '#FE645E',
              fontWeight: '600',
              fontSize: 18,
              marginLeft: 2,
            }}
          >
            {product.available}
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
              ${product.price}
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
              >
                -
              </Button>
              <Typography sx={{fontWeight: '400', fontSize: 24, marginLeft: 2}}>
                Quantity
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
              >
                +
              </Button>
              <Typography
                sx={{
                  fontWeight: '400',
                  fontSize: 24,
                  marginLeft: 2,
                  marginRight: 2,
                }}
              >
                |
              </Typography>
              <Image
                style={{cursor: 'pointer'}}
                src="/icons/deleteFromChart.svg" // Use a leading slash for relative paths
                width={32}
                height={32}
                alt="delete"
              />
              <Typography
                sx={{
                  cursor: 'pointer',
                  fontWeight: '400',
                  fontSize: 24,
                  marginLeft: 1,
                  color: '#6E7278',
                }}
              >
                Delete
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductItem;
