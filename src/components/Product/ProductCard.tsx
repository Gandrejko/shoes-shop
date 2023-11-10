import {useState} from 'react';
import Image from 'next/image';
import {MoreHoriz} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';

import ButtonMenu from './ButtonMenu';

const styles: Record<string, SxProps> = {
  card: {
    width: 1,
    borderRadius: 0,
    boxShadow: 'none',
  },
  cardContent: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 320 / 380,
  },
  moreButton: {
    position: 'absolute',
    top: 5,
    right: 5,
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
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{objectFit: 'cover'}}
        />
        <IconButton
          aria-label="settings"
          sx={styles.moreButton}
          onClick={e => setAnchorEl(e.currentTarget)}
        >
          <MoreHoriz />
        </IconButton>
        <ButtonMenu
          productid={product.id}
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
            <Typography variant="h3" fontSize={14}>
              {product.name}
            </Typography>
            <Typography
              variant="h5"
              fontSize={14}
              textTransform="capitalize"
              color={theme => theme.palette.text.secondary}
            >{`${product.gender}'s Shoes`}</Typography>
          </Box>
          <Typography variant="h3" fontSize={14}>
            ${product.price}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default ProductCard;
