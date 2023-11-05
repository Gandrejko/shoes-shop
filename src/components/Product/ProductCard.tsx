import {useState} from 'react';
import Image from 'next/image';
// @ts-ignore
import {MoreHoriz} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import ButtonMenu from './ButtonMenu';

const styles = {
  card: {
    maxWidth: 320,
    borderRadius: 0,
    boxShadow: 'none',
  },
  cardContent: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  imageContainer: {
    position: 'relative',
  },
  moreButton: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
  productDescription: {
    justifyContent: 'space-between',
    gap: '1rem',
    padding: 0,
  },
};

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  gender: string;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({product}: ProductCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Card sx={styles.card}>
      <Box sx={styles.imageContainer}>
        <IconButton
          aria-label="settings"
          sx={styles.moreButton}
          onClick={e => setAnchorEl(e.currentTarget)}
        >
          <MoreHoriz fontSize="large" />
        </IconButton>
        <Image
          src={product.image}
          width={320}
          height={380}
          alt={product.name}
          style={{
            width: '100%',
            objectFit: 'cover',
          }}
        />
        <ButtonMenu
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          anchorEl={anchorEl}
          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
          transformOrigin={{vertical: 'top', horizontal: 'right'}}
        />
      </Box>
      <CardContent sx={styles.cardContent}>
        <Stack direction="row" sx={styles.productDescription}>
          <Box>
            <Typography variant="h5" fontWeight="600">
              {product.name}
            </Typography>
            <Typography
              variant="h6"
              textTransform="capitalize"
            >{`${product.gender}'s Shoes`}</Typography>
          </Box>
          <Typography variant="h5" fontWeight="600">
            ${product.price}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default ProductCard;
