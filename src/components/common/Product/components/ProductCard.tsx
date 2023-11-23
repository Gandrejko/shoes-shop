import { MoreHoriz } from '@mui/icons-material';
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
import { useState } from 'react';
import { ProductAttributes } from '@/types';
import ButtonMenu from './ButtonMenu';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDelete } from '@/hooks';

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
    zIndex: '1',
    padding: '10px',
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
  imagePriority: boolean;
};

const ProductCard = ({product, imagePriority}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const router = useRouter();
  const showControls = router.pathname === '/products/me';

  const { mutate: deleteProduct } = useDelete('/products');

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Link href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
        <Card sx={styles.card}>
          <Box sx={styles.imageContainer}>
            {product.images?.data ? (
              <Image
                src={product.images.data[0].attributes.url}
                alt={product.name!}
                fill
                style={{objectFit: 'cover'}}
                priority={imagePriority}
              />
            ) : (

              <Paper sx={{ height: 1, backgroundColor: 'grey.A100', borderRadius: 0 }}>
                <Image
                  fill
                  src="/icons/galleryIcon.svg"
                  alt="icon"
                />
              </Paper>
            )}
          </Box>
          <CardActionArea LinkComponent={Link} sx={styles.cardActionArea}>
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
      </Link>

      {showControls && (
        <Box>
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
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={() => setAnchorEl(null)}
            onDeleteProduct={() => deleteProduct(product.id!)}
          />
        </Box>
      )}
    </Box>
  );
};
export default ProductCard;
