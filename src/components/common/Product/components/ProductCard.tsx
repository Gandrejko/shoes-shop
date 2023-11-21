import {MoreHoriz} from '@mui/icons-material';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Paper,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import {useState} from 'react';

import {ProductAttributes} from '@/types';
import ButtonMenu from './ButtonMenu';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {useDelete} from '@/hooks';

const styles: Record<string, SxProps> = {
  card: {
    width: 1,
    borderRadius: 0,
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
  },
  cardActionArea: {
    '&:hover .MuiCardActionArea-focusHighlight': {
      opacity: 0,
    },
    backgroundColor: 'background.paper',
    flex: 1,
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

type Props = {
  product: ProductAttributes;
};

const ProductCard = ({product}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const router = useRouter();
  const showControls = router.pathname === '/products/me';

  const {mutate: deleteProduct} = useDelete('/products');

  return (
    <Card sx={styles.card}>
      <Box sx={styles.imageContainer}>
        {product.images?.data ? (
          <Image
            src={product.images.data[0].attributes.url}
            alt={product.name!}
            fill
            style={{objectFit: 'cover'}}
          />
        ) : (
          <Paper
            sx={{height: 1, backgroundColor: 'grey.A200', borderRadius: 0}}
          />
        )}
        {showControls && (
          <>
            <IconButton
              aria-label="settings"
              sx={styles.moreButton}
              onClick={e => setAnchorEl(e.currentTarget)}
            >
              <MoreHoriz />
            </IconButton>
            <ButtonMenu
              productid={product.id!}
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
              transformOrigin={{vertical: 'top', horizontal: 'right'}}
              onClose={() => setAnchorEl(null)}
              onDeleteProduct={() => deleteProduct(product.id!)}
            />
          </>
        )}
      </Box>
      <CardActionArea
        LinkComponent={Link}
        href={`/products/${product.id}`}
        sx={styles.cardActionArea}
      >
        <CardContent sx={styles.cardContent}>
          <Stack direction="row" sx={styles.productDescription}>
            <Box>
              <Typography variant="h3" fontSize={14}>
                {product.name}
              </Typography>
              {product.gender?.data && (
                <Typography
                  variant="h5"
                  fontSize={14}
                  textTransform="capitalize"
                  color="text.secondary"
                >
                  {`${product.gender.data.attributes.name}'s Shoes`}
                </Typography>
              )}
            </Box>
            <Typography variant="h3" fontSize={14}>
              ${product.price}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default ProductCard;
